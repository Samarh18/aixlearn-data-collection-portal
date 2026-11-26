// Small lookups over courses and submissions.

const courseName=n=>{const c=courses.find(c=>c.num===n);return c?c.name:"Other"};
const cName=n=>{const c=courses.find(c=>c.num===n);return c?(lang==="en"?c.name:c.he):lbl("Other")};
const ticketsFor=s=>s.ok?1+(s.pdf?1:0):0;
// Registered partners appear to researchers as participant ids. Other emails stay behind "Show identity".
const partnerRec=e=>participants.find(p=>!p.withdrawn&&p.email.toLowerCase()===e);
const partnerPids=s=>(s.partnerEmails||[]).map(e=>partnerRec(e)?.pid).filter(Boolean);
const partnerUnreg=s=>(s.partnerEmails||[]).filter(e=>!partnerRec(e));
const pdfName=s=>`AIX-${s.sid}-${s.pid}-${s.course}-assignment.pdf`;
const courseHtml=s=>s.course==="other"?`${esc(lbl("Other"))}${s.courseText?` <span class="muted">${esc(s.courseText)}</span>`:""}`:`<bdi>${esc(s.course)}</bdi> <span class="muted">${esc(cName(s.course))}</span>`;
const ticketTotal=pid=>submissions.filter(s=>s.pid===pid).reduce((a,s)=>a+ticketsFor(s),0);
