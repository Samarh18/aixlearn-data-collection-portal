// Courses & rounds tab.

function courseView(){
 const nIn=courses.filter(c=>c.target).length;
 return `<div class="stack">
  <div class="panel stack" style="min-width:0"><h3>Courses</h3><p class="muted">Only included courses appear in the students' course list. Students can still type a course that isn't listed. Hebrew and Arabic pages show the Hebrew name.</p>
   <div class="row"><span class="muted" style="font-size:13px">${nIn} of ${courses.length} included</span><button class="btn ghost small" id="inc-all">Include all</button><button class="btn ghost small" id="inc-none">Exclude all</button></div>
   <div class="tablewrap"><table><thead><tr><th>Number</th><th>Hebrew name</th><th>English name</th><th>Included</th></tr></thead><tbody>
   ${courses.map((c,i)=>`<tr><td class="mono">${c.num}</td><td dir="rtl">${esc(c.he)}</td><td>${esc(c.name)}</td><td><label class="inc"><input type="checkbox" data-target="${i}" ${c.target?"checked":""}><span>${c.target?"Included":"Not included"}</span></label></td></tr>`).join("")}
   </tbody></table></div>
   <h4>Add a course</h4>
   <div class="grid3"><label class="f"><span class="lt">Course number</span><input type="text" id="nc-num" inputmode="numeric" maxlength="6"></label><label class="f"><span class="lt">Hebrew name</span><input type="text" id="nc-he" dir="rtl" maxlength="80"></label><label class="f"><span class="lt">English name</span><input type="text" id="nc-name" maxlength="80"></label></div>
   <div class="row"><button class="btn small" id="nc-add">Add course</button></div></div>
  <div class="panel stack" style="min-width:0"><h3>Collection rounds</h3>
   ${rounds.map((x,i)=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:12px"><div><b>${esc(x.name.en)}</b><div class="muted mono" style="font-size:12.5px">${x.opens} → ${x.closes}</div></div><div class="row">${x.open?'<span class="chip ok">Open</span>':'<span class="chip neutral">Closed</span>'}<button class="btn ghost small" data-round="${i}">${x.open?"Close":"Open"}</button></div></div>`).join("")}
   <p class="muted" style="font-size:13px">Only one round is open at a time.</p>
   <h4>Add a round</h4>
   <label class="f"><span class="lt">Round name</span><input type="text" id="nr-name" maxlength="60" placeholder="e.g. Spring 2027 · Moed A"></label>
   <div class="grid2"><label class="f"><span class="lt">Opens</span><input type="date" id="nr-open"></label><label class="f"><span class="lt">Closes</span><input type="date" id="nr-close"></label></div>
   <div class="row"><button class="btn small" id="nr-add">Add round</button></div></div>
 </div>`;
}
function bindCourses(){
 document.querySelectorAll("[data-target]").forEach(c=>c.onchange=()=>{courses[c.dataset.target].target=c.checked;render()});
 $("#inc-all")&&($("#inc-all").onclick=()=>{courses.forEach(c=>c.target=true);render()});
 $("#inc-none")&&($("#inc-none").onclick=()=>{courses.forEach(c=>c.target=false);render()});
 $("#nc-add")&&($("#nc-add").onclick=()=>{const n=$("#nc-num").value.trim(),he=$("#nc-he").value.trim(),m=$("#nc-name").value.trim();const bad=[];if(!/^\d{5,6}$/.test(n))bad.push($("#nc-num"));if(!he)bad.push($("#nc-he"));if(!m)bad.push($("#nc-name"));if(bad.length){flag(bad);return toast("Enter a 5–6 digit course number, a Hebrew name and an English name.")}if(courses.some(c=>c.num===n))return toast("That course number is already on the list.");courses.push({num:n,name:m,he,target:true});toast("Course added and included.");render()});
 document.querySelectorAll("[data-round]").forEach(b=>b.onclick=()=>{const i=+b.dataset.round;const was=rounds[i].open;rounds.forEach(x=>x.open=false);rounds[i].open=!was;render()});
 $("#nr-add")&&($("#nr-add").onclick=()=>{const nm=$("#nr-name").value.trim(),o=$("#nr-open").value,c=$("#nr-close").value;const bad=[];if(!nm)bad.push($("#nr-name"));if(!o)bad.push($("#nr-open"));if(!c)bad.push($("#nr-close"));if(bad.length){flag(bad);return toast("Enter a name and both dates.")}if(c<o){flag([$("#nr-close")]);return toast("The closing date must be after the opening date.")}rounds.unshift({id:"R"+(rounds.length+1),name:{en:nm,he:nm,ar:nm},opens:o,closes:c,open:false});toast("Round added. Open it when you're ready.");render()});
}
