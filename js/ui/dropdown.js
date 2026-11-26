// Styled dropdown, matching the course search box. The real <select> stays (visually hidden)
// and holds the value, so validation, "Other" and conditional questions work unchanged.

let ddSeq=0;
function enhanceSelect(sel){
 if(sel.dataset.dd)return;sel.dataset.dd="1";
 const n=++ddSeq,box=document.createElement("div"),btn=document.createElement("button"),list=document.createElement("ul");
 box.className="combo";btn.type="button";btn.className="dd-btn";list.id="dd-list-"+n;list.setAttribute("role","listbox");list.hidden=true;
 for(const[k,v] of [["role","combobox"],["aria-haspopup","listbox"],["aria-expanded","false"],["aria-controls",list.id]])btn.setAttribute(k,v);
 sel.before(box);box.append(sel,btn,list);sel.tabIndex=-1;sel.setAttribute("aria-hidden","true");
 let active=-1,typed="",typedT;
 const items=()=>[...list.children];
 const close=()=>{list.hidden=true;btn.setAttribute("aria-expanded","false");btn.removeAttribute("aria-activedescendant");active=-1};
 const mark=i=>{const all=items();if(!all.length)return;active=Math.max(0,Math.min(i,all.length-1));all.forEach((li,k)=>li.classList.toggle("active",k===active));btn.setAttribute("aria-activedescendant",all[active].id);all[active].scrollIntoView({block:"nearest"})};
 const open=()=>{list.innerHTML=[...sel.options].filter(o=>o.value).map((o,k)=>`<li role="option" id="dd-${n}-${k}" data-v="${esc(o.value)}" aria-selected="${o.value===sel.value}"><bdi>${esc(o.text)}</bdi></li>`).join("");
  list.hidden=false;btn.setAttribute("aria-expanded","true");const cur=items().findIndex(li=>li.dataset.v===sel.value);if(cur>=0)mark(cur)};
 const pick=v=>{close();sel.value=v;sel.dispatchEvent(new Event("change",{bubbles:true}))};
 btn.onclick=()=>{btn.focus();list.hidden?open():close()};
 btn.onblur=close;
 sel.onfocus=()=>btn.focus();
 btn.onkeydown=e=>{const k=e.key;
  if(k==="ArrowDown"||k==="ArrowUp"){e.preventDefault();if(list.hidden){open();if(active<0)mark(0)}else mark(active+(k==="ArrowDown"?1:-1))}
  else if((k==="Enter"||k===" ")&&!list.hidden){e.preventDefault();if(active>=0)pick(items()[active].dataset.v);else close()}
  else if(k==="Escape")close();
  else if(k.length===1&&k!==" "){clearTimeout(typedT);typed+=k.toLowerCase();typedT=setTimeout(()=>typed="",700);if(list.hidden)open();const i=items().findIndex(li=>li.textContent.toLowerCase().startsWith(typed));if(i>=0)mark(i)}};
 // mousedown so the button keeps focus; preventDefault on click so the wrapping <label> doesn't re-trigger
 list.onmousedown=e=>e.preventDefault();
 list.onclick=e=>{e.preventDefault();const li=e.target.closest("[data-v]");if(li)pick(li.dataset.v)};
}
function syncDropdown(sel){
 const btn=sel.nextElementSibling;if(!sel.dataset.dd||!btn)return;
 const text=sel.options[sel.selectedIndex]?.text||"",q=sel.closest("label")?.querySelector(".lt")?.textContent||"";
 btn.textContent=text;btn.classList.toggle("empty",!sel.value);btn.setAttribute("aria-label",`${q} ${text}`.trim());
}
