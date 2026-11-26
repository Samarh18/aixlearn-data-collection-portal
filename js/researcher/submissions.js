// Submissions tab.

function partnerCell(s){
 if(s.partner!=="Yes")return s.partner||"—";
 const pids=partnerPids(s),other=partnerUnreg(s),k="partner:"+s.sid;
 const hidden=!other.length?"":revealed[k]?` <span class="idshown"><span class="muted">${other.map(esc).join(", ")}</span> <button class="linkbtn" data-partner="${s.sid}">Hide</button></span>`:` · ${other.length} not registered <button class="linkbtn" data-partner="${s.sid}">Show identity</button>`;
 return ["Yes",...pids].join(" · ")+hidden;
}
function subView(){
 const p=preview&&submissions.find(s=>s.sid===preview);
 return `<div class="stack"><div class="sectionhead"><p class="muted">${submissions.length} files. Each file is stored under a unique name we assign. Click a row to preview the transcript.</p><button class="btn ghost small" data-csv="submissions">${DL_ICON}<span>Download CSV</span></button></div>
 ${p?`<div class="panel stack"><div class="sectionhead"><h3>${esc(p.file)}</h3><button class="linkbtn" id="pv-close">Close</button></div>
  <p class="muted">${esc(p.course)} ${esc(courseName(p.course))}${p.courseText?": "+esc(p.courseText):""} · ${esc(p.tool)} · ${esc(p.purpose)}${p.purpose==="Exam prep"?" · "+p.moed:""}${p.reason?" · "+esc(p.reason):""} · ${p.ok?p.turns+" messages":"Failed: "+esc(p.error)}${p.pdf?" · "+esc(p.pdf.name):""}</p><div class="transcript">${p.text.split(/\r?\n/).filter(l=>l.trim()).map(l=>{const m=l.match(/^([^:]{1,24}):(.*)$/);return m?`<div class="${/^user$/i.test(m[1].trim())?"":"ai"}"><span class="who">${esc(m[1])}:</span>${esc(m[2])}</div>`:`<div>${esc(l)}</div>`}).join("")}</div></div>`:""}
 <div class="tablewrap"><table><thead><tr><th>File name</th><th>Participant</th><th>Course</th><th>AI tool</th><th>Purpose</th><th>Period</th><th>Uploaded</th><th>Validation</th><th>Assignment PDF</th><th>Joint submission</th></tr></thead><tbody>
 ${submissions.slice().reverse().map(s=>`<tr style="cursor:pointer" data-pv="${s.sid}"><td class="mono">${esc(s.file)}</td><td class="mono">${s.pid}</td><td>${esc(s.course)} <span class="muted">${esc(courseName(s.course))}${s.courseText?": "+esc(s.courseText):""}</span></td><td>${esc(s.tool)}${s.toolOther?": "+esc(s.toolOther):""}</td><td>${esc(s.purpose)}${s.purposeOther?": "+esc(s.purposeOther):""}</td><td>${s.purpose==="Exam prep"?s.moed:"—"}</td><td class="mono">${s.date}</td><td>${s.ok?`<span class="chip ok">${s.turns} messages</span>`:`<span class="chip err">${esc(s.error)}</span>`}</td><td class="mono">${s.pdf?esc(s.pdf.name):"—"}</td><td>${partnerCell(s)}</td></tr>`).join("")}
 </tbody></table></div></div>`;
}
function bindSubmissions(){
 document.querySelectorAll("[data-partner]").forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.partner,k="partner:"+id;revealed[k]=!revealed[k];if(revealed[k])toast(`Partner identity shown for ${id}. Logged.`);render()});
 document.querySelectorAll("[data-pv]").forEach(tr=>tr.onclick=()=>{preview=tr.dataset.pv;render();window.scrollTo({top:0})});
 $("#pv-close")&&($("#pv-close").onclick=()=>{preview=null;render()});
}
