// Lottery & recontact tab.

function lotView(){
 const pool=participants.filter(p=>!p.withdrawn).map(p=>({p,n:ticketTotal(p.pid)})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n);
 const total=pool.reduce((a,x)=>a+x.n,0);const rc=participants.filter(p=>p.recontact&&!p.withdrawn);
 return `<div class="split">
  <div class="panel stack" style="min-width:0"><div class="sectionhead"><h3>Lottery</h3><span class="ticket">${total} tickets</span></div>
   <div class="row"><label class="f" style="width:140px"><span class="lt">Winners to draw</span><input type="number" id="lt-n" value="10" min="1" max="${pool.length}"></label><button class="btn" id="lt-draw" style="align-self:flex-end">Run draw</button></div>
   ${winners.length?`<div class="result ok"><b>Draw recorded · ${winners.length} winners</b>Winners: ${winners.map(w=>w.pid).join(", ")}. Emails go to their Technion addresses.</div>`:""}
   <div class="tablewrap"><table><thead><tr><th>Participant</th><th class="num">Tickets</th><th class="num">Chance per pick</th></tr></thead><tbody>
   ${pool.map(x=>`<tr><td class="mono">${x.p.pid}</td><td class="num">${x.n}</td><td class="num">${(x.n/total*100).toFixed(1)}%</td></tr>`).join("")}</tbody></table></div></div>
  <div class="panel stack" style="min-width:0"><div class="sectionhead"><h3>Recontact pool</h3><button class="btn ghost small" data-csv="recontact">${DL_ICON}<span>Download emails</span></button></div>
   <p class="muted">${rc.length} participants agreed to be contacted about future studies. Past Qualtrics participants join after they opt in.</p>
   <div class="tablewrap"><table><thead><tr><th>Participant</th><th>Joined</th><th>Faculty</th></tr></thead><tbody>
   ${rc.map(p=>`<tr><td class="mono">${p.pid}</td><td>${p.joined==="R0"?"Pilot":"Winter 2026"}</td><td>${esc(p.faculty)}</td></tr>`).join("")}</tbody></table></div></div>
 </div>`;
}
function bindLottery(){
 $("#lt-draw")&&($("#lt-draw").onclick=()=>{let pool=[];participants.filter(p=>!p.withdrawn).forEach(p=>{for(let i=0;i<ticketTotal(p.pid);i++)pool.push(p)});
  const n=Math.max(1,Math.min(+$("#lt-n").value||1,new Set(pool.map(p=>p.pid)).size));winners=[];
  while(winners.length<n&&pool.length){const w=pool[Math.floor(Math.random()*pool.length)];winners.push(w);pool=pool.filter(p=>p.pid!==w.pid)}render()});
}
