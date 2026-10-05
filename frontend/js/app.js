const KEY='oa_sahayak_records_v1';

function getRecords(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
function saveRecords(records){localStorage.setItem(KEY,JSON.stringify(records))}
function bmi(height,weight){if(!height||!weight)return null;const m=Number(height)/100;return +(Number(weight)/(m*m)).toFixed(1)}

function calculateRisk(data){
  let score=0;
  const age=Number(data.age)||0, pain=Number(data.pain)||0;
  const stiff=Number(data.stiffness)||0, mobility=Number(data.mobility)||0;
  const func=Number(data.function)||0;
  const b=Number(data.bmi)||0;
  if(age>=60)score+=15; else if(age>=50)score+=10; else if(age>=40)score+=5;
  if(b>=30)score+=15; else if(b>=25)score+=8;
  score+=pain*4; score+=stiff*4; score+=mobility*5; score+=func*3;
  if(data.injury==='yes')score+=10;
  score+=Math.max(0,100-(Number(data.gaitScore)||88))*0.12;
  score+=Math.max(0,100-(Number(data.romScore)||86))*0.12;
  score=Math.min(100,Math.round(score));
  let category=score<35?'LOW':score<65?'MODERATE':'HIGH';
  return {score,category};
}

function setupLanguage(){
  const btn=document.getElementById('langBtn'); if(!btn)return;
  const current=localStorage.getItem('oa_lang')||'en';
  function apply(lang){
    document.querySelectorAll('[data-en]').forEach(el=>el.textContent=el.dataset[lang]);
    btn.textContent=lang==='en'?'हिंदी':'English'; localStorage.setItem('oa_lang',lang);
  }
  apply(current);
  btn.onclick=()=>apply((localStorage.getItem('oa_lang')||'en')==='en'?'hi':'en');
}

function setupPatient(){
  const form=document.getElementById('patientForm'); if(!form)return;
   form.onsubmit=e=>{
    e.preventDefault();
    const d=Object.fromEntries(new FormData(form).entries());
    d.bmi=bmi(d.height,d.weight);
    localStorage.setItem('oa_current_patient',JSON.stringify(d));
    location.href='assessment.html';
  };
}

function setupAssessment(){
  const form=document.getElementById('assessmentForm');
  if(!form)return;

  const slider=document.getElementById('pain');
  const out=document.getElementById('painOut');

  slider.oninput=()=>out.textContent=slider.value;

  const camBtn=document.getElementById('cameraBtn');
  const video=document.getElementById('camera');

  camBtn.onclick=async()=>{
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:true});
      video.srcObject=stream;
      video.hidden=false;
      camBtn.textContent='Camera enabled';

      document.getElementById('gait').textContent='88%';
      document.getElementById('rom').textContent='86%';
      document.getElementById('posture').textContent='Captured';

    }catch(err){
      alert('Camera permission was not granted. You can continue with the prototype assessment.');
    }
  };

  form.onsubmit=async e=>{
    e.preventDefault();

    const patient=JSON.parse(
      localStorage.getItem('oa_current_patient')||'{}'
    );

    const d={
      ...patient,
      pain:slider.value,
      stiffness:document.querySelector('[name=stiffness]:checked').value,
      mobility:document.querySelector('[name=mobility]:checked').value,
      function:document.querySelector('[name=function]:checked').value,
      gaitScore:document.getElementById('gait').textContent.replace('%','')||88,
      romScore:document.getElementById('rom').textContent.replace('%','')||86,
      date:new Date().toISOString()
    };

    try{
      const response=await fetch(
        'https://oa-sahayak.onrender.com/api/screen',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(d)
        }
      );

      if(!response.ok){
        throw new Error('API request failed');
      }

      const result=await response.json();

      d.score=result.score;
      d.category=result.category;
      d.patient_id=result.patient_id;
      d.screening_id=result.screening_id;

      localStorage.setItem(
        'oa_current_result',
        JSON.stringify(d)
      );

      location.href='result.html';

    }catch(error){
      console.error(error);

      alert(
        'Online backend se connection nahi ho pa raha. Please try again.'
      );
    }
  };
}

function setupResult(){
  const score=document.getElementById('score'); if(!score)return;
  const d=JSON.parse(localStorage.getItem('oa_current_result')||'{}');
  const r=calculateRisk(d);
  score.textContent=r.score;
  document.getElementById('resultTitle').textContent=`${r.category} risk indication`;
  document.getElementById('resultPatient').textContent=`${d.name||'Patient'} • ${d.id||'No ID'} • ${new Date(d.date||Date.now()).toLocaleDateString()}`;
  const badge=document.getElementById('riskBadge'); badge.textContent=r.category+' RISK'; badge.className='risk-badge risk-'+r.category.toLowerCase();
  document.getElementById('resultMessage').textContent=r.category==='HIGH'?'Clinical evaluation is recommended based on the screening indicators.':r.category==='MODERATE'?'Consider clinical review and preventive joint-care guidance.':'No high-risk screening pattern was detected; continue routine monitoring and preventive care.';
  document.getElementById('rPain').textContent=(d.pain||0)+'/10';
  document.getElementById('rMobility').textContent=['None','Mild','Moderate','Severe'][Number(d.mobility)||0];
  document.getElementById('rGait').textContent=(d.gaitScore||88)+'%';
  document.getElementById('rRom').textContent=(d.romScore||86)+'%';
}

function setupDashboard(){
  const count=document.getElementById('patientsCount'); if(!count)return;
  const today=new Date().toDateString();
   fetch('https://oa-sahayak.onrender.com/api/screenings')
    .then(r=>r.json())
    .then(payload=>{
      const records=payload.records||[];
      count.textContent=records.length;
      document.getElementById('highCount').textContent=records.filter(x=>x.risk_category==='HIGH').length;
      document.getElementById('pendingCount').textContent=0;
      document.getElementById('todayCount').textContent=records.filter(x=>new Date(x.created_at).toDateString()===today).length;
      const list=document.getElementById('recentList');
      if(records.length){
        list.innerHTML=records.slice(0,4).map(x=>`<div class="step"><b>${x.risk_category}</b><div><strong>${x.name||'Patient'}</strong><span>${x.patient_code||'—'} • Score ${x.risk_score}/100</span></div></div>`).join('');
      }
    })
    .catch(()=>{});

}

function setupHistory(){
  const body=document.getElementById('historyBody'); if(!body)return;
   fetch('https://oa-sahayak.onrender.com/api/screenings')
    .then(r=>r.json())
    .then(payload=>{
      const records=payload.records||[];
      body.innerHTML=records.length?records.map(x=>`<tr><td>${x.name||'—'}</td><td>${x.patient_code||'—'}</td><td>${new Date(x.created_at).toLocaleDateString()}</td><td><b>${x.risk_score}/100</b></td><td class="risk-${String(x.risk_category).toLowerCase()}">${x.risk_category}</td></tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:#789098;padding:35px">No records yet.</td></tr>`;
    })
    .catch(()=>{body.innerHTML=`<tr><td colspan="5" style="text-align:center;color:#b33e3e;padding:35px">Backend connection unavailable.</td></tr>`});
  const clear=document.getElementById('clearData');
  if(clear) clear.style.display='none';
}

setupLanguage();setupPatient();setupAssessment();setupResult();setupDashboard();setupHistory();
