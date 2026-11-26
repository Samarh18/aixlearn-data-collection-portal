// CSV export.

function csv(kind){
 const cq=sc=>questions.filter(x=>!x.core&&x.scope===sc);
 const pq=cq("Profile"),uq=cq("Each upload");
 const rows=kind==="participants"?[["pid","faculty","faculty_other","year","year_other","gpa","previous_participation","consent_grades","recontact","withdrawn",...pq.map(x=>x.id)],...participants.map(p=>[p.pid,p.faculty,p.facultyOther||"",p.year,p.yearOther||"",p.gpa,p.prev||"",p.consentGrades,p.recontact,p.withdrawn,...pq.map(x=>(p.custom||{})[x.id]??"")])]
  :kind==="submissions"?[["sid","file_name","pid","course","course_other","tool","tool_other","purpose","purpose_other","moed","moed_b_reason","moed_b_reason_other","date","valid","messages","assignment_pdf","tickets",...uq.map(x=>x.id)],...submissions.map(s=>[s.sid,s.file,s.pid,s.course,s.courseText||"",s.tool,s.toolOther||"",s.purpose,s.purposeOther||"",s.purpose==="Exam prep"?s.moed:"",s.reason||"",s.reasonOther||"",s.date,s.ok,s.turns,s.pdf?s.pdf.name:"",ticketsFor(s),...uq.map(x=>(s.custom||{})[x.id]??"")])]
  :[["email"],...participants.filter(p=>p.recontact&&!p.withdrawn).map(p=>[p.email])];
 return rows.map(r=>r.map(v=>/[",\n]/.test(String(v))?`"${String(v).replace(/"/g,'""')}"`:v).join(",")).join("\n");
}
function downloadCsv(name,text){
 const a=document.createElement("a");
 a.href=URL.createObjectURL(new Blob(["\uFEFF"+text],{type:"text/csv;charset=utf-8"}));
 a.download=name;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(`Downloaded ${name}`);
}
