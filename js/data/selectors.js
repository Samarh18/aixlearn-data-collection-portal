// Small lookups over courses and submissions.

const courseName=n=>{const c=courses.find(c=>c.num===n);return c?c.name:"Other"};
const cName=n=>{const c=courses.find(c=>c.num===n);return c?(lang==="en"?c.name:c.he):lbl("Other")};
const ticketsFor=s=>s.ok?1:0;
const ticketTotal=pid=>submissions.filter(s=>s.pid===pid).reduce((a,s)=>a+ticketsFor(s),0);
