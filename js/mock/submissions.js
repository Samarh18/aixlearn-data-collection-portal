// MOCK DATA: submissions.

let submissions=[];
(function(){let id=1;const days=["2027-01-27","2027-01-29","2027-02-01","2027-02-03","2027-02-05","2027-02-08","2027-02-10","2027-02-12"];
 participants.forEach(p=>{if(p.withdrawn)return;const n=1+Math.floor(r()*4);for(let k=0;k<n;k++){const c=pick(courses);const ok=r()>.15;const moed=r()>.75?"Moed B":"Moed A";
  submissions.push({sid:"S"+String(id++).padStart(4,"0"),pid:p.pid,course:c.num,tool:pick(TOOLS.slice(0,5)),moed,reason:moed==="Moed B"?pick(REASONS):"",purpose:r()>.2?"Exam prep":"Assignment",date:pick(days),ok,error:ok?"":"No clear speaker markers",turns:ok?6+Math.floor(r()*30):0,text:ok?SAMPLE_OK:SAMPLE_BAD,round:p.joined==="R0"?"R0":"R1"})}});
})();
const fname=s=>`AIX-${s.sid}-${s.pid}-${s.course}.txt`;
submissions.forEach(s=>s.file=fname(s));
submissions.forEach(s=>{if(s.purpose==="Assignment"&&s.ok&&parseInt(s.sid.slice(1),10)%2===0)s.pdf={name:`AIX-${s.sid}-${s.pid}-${s.course}-assignment.pdf`,size:150000}});
submissions.forEach(s=>{if(s.purpose==="Assignment"){const n=parseInt(s.sid.slice(1),10);s.partner=n%3===0?"Yes":"No";s.partnerEmails=n%3===0?["studentb.mock@campus.technion.ac.il",...(n%2===0?["student.z.mock@campus.technion.ac.il"]:[])]:[]}});
