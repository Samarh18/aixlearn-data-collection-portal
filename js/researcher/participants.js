// Participants tab.

function partView(){
 return `<div class="stack"><div class="sectionhead"><p class="muted">Identity is hidden by default. Showing it is logged.</p><button class="btn ghost small" data-csv="participants">${DL_ICON}<span>Download CSV</span></button></div>
 <div class="tablewrap"><table><thead><tr><th>ID</th><th>Identity</th><th>Faculty</th><th>Year</th><th>Grades consent</th><th>Recontact</th><th class="num">Files</th><th class="num">Tickets</th><th>Status</th></tr></thead><tbody>
 ${participants.map(p=>`<tr><td class="mono">${p.pid}</td><td>${revealed[p.pid]?`<span class="idshown">${esc(p.first)} ${esc(p.last)} <span class="muted">${esc(p.email)}</span> <button class="linkbtn" data-reveal="${p.pid}">Hide</button></span>`:`<button class="linkbtn" data-reveal="${p.pid}">Show identity</button>`}</td><td>${esc(p.faculty)}${p.facultyOther?": "+esc(p.facultyOther):""}</td><td>${esc(p.year)}${p.yearOther?": "+esc(p.yearOther):""}</td><td>${p.consentGrades?'<span class="chip ok">Yes</span>':'<span class="chip neutral">No</span>'}</td><td>${p.recontact?'<span class="chip acc">Opted in</span>':'<span class="chip neutral">No</span>'}</td><td class="num">${submissions.filter(s=>s.pid===p.pid).length}</td><td class="num">${ticketTotal(p.pid)}</td><td>${p.withdrawn?'<span class="chip err">Withdrawn</span>':'<span class="chip ok">Active</span>'}</td></tr>`).join("")}
 </tbody></table></div></div>`;
}
function bindParticipants(){
 document.querySelectorAll("[data-reveal]").forEach(b=>b.onclick=()=>{const id=b.dataset.reveal;revealed[id]=!revealed[id];if(revealed[id])toast(`Identity shown for ${id}. Logged.`);render()});
}
