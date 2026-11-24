// DOM helpers: query, escape, toast, and flag() for invalid fields.

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let toastT;function toast(m){const el=$("#toast");el.textContent=m;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,2600)}
function flag(els){els.forEach(el=>{el.classList.add("invalid");el.classList.remove("shake");void el.offsetWidth;el.classList.add("shake")});const f=els[0];f.scrollIntoView({block:"center",behavior:"smooth"});const c=f.matches("input,select")?f:f.querySelector("input");if(c)setTimeout(()=>c.focus({preventScroll:true}),350)}
["input","change"].forEach(ev=>document.addEventListener(ev,e=>{const el=e.target;if(!el.classList)return;el.classList.remove("invalid");const w=el.closest(".check,.filepick");if(w)w.classList.remove("invalid")}));
