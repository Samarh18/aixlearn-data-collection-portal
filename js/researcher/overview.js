// Overview tab.

function ovView(){
 const active=participants.filter(p=>!p.withdrawn);const ok=submissions.filter(s=>s.ok).length;
 const byCourse=courses.map(c=>[`${c.num} ${c.name}`,submissions.filter(s=>s.course===c.num).length]).sort((a,b)=>b[1]-a[1]);
 const byTool=TOOLS.map(x=>[x,submissions.filter(s=>s.tool===x).length]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]);
 const bars=rows=>{const m=Math.max(1,...rows.map(x=>x[1]));return `<div class="bars">${rows.map(([l,n])=>`<div class="bar"><span class="lbl" title="${esc(l)}">${esc(l)}</span><div class="track"><div class="fill" style="width:${n/m*100}%"></div></div><span class="n">${n}</span></div>`).join("")}</div>`};
 return `<div class="stack">
  <div class="stats">
   <div class="stat"><div class="k">Participants</div><div class="v">${active.length}</div></div>
   <div class="stat"><div class="k">Submissions</div><div class="v">${submissions.length}</div></div>
   <div class="stat"><div class="k">Accepted files</div><div class="v">${submissions.length?Math.round(ok/submissions.length*100):0}%</div></div>
   <div class="stat"><div class="k">Recontact pool</div><div class="v">${active.filter(p=>p.recontact).length}</div></div>
  </div>
  <div class="split">
   <div class="panel stack"><h3>Submissions by course</h3>${bars(byCourse)}</div>
   <div class="panel stack"><h3>Submissions by AI tool</h3>${bars(byTool)}</div>
  </div>
 </div>`;
}
