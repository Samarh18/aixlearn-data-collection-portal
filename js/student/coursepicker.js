// Course search box: type a number or name; "Other" is always pinned first.
// The chosen course number (or "Other") is kept in data-value; typing again clears it.

const COURSE_MAX=50;
const courseText=v=>v===OTHER?t("courseOtherOpt"):v?`${v} · ${cName(v)}`:"";
const courseSelect=(sel,oth)=>`<div class="combo"><input type="text" id="up-course" role="combobox" aria-expanded="false" aria-controls="up-course-list" aria-autocomplete="list" autocomplete="off" maxlength="120" placeholder="${esc(t("courseSearch"))}" data-value="${esc(sel||"")}" value="${esc(courseText(sel))}"><ul id="up-course-list" role="listbox" hidden></ul></div><input type="text" id="up-course-other" class="other-input" dir="auto" maxlength="40" placeholder="${esc(t("pleaseSpecify"))}" value="${esc(oth||"")}" ${sel===OTHER?"":"hidden"}>`;
function bindCoursePicker(){
 const inp=$("#up-course"),list=$("#up-course-list"),other=$("#up-course-other");let active=-1;
 const items=()=>[...list.querySelectorAll("[data-v]")];
 const close=()=>{list.hidden=true;inp.setAttribute("aria-expanded","false");inp.removeAttribute("aria-activedescendant");active=-1};
 const mark=i=>{const all=items();active=(i+all.length)%all.length;all.forEach((li,k)=>li.setAttribute("aria-selected",k===active));inp.setAttribute("aria-activedescendant",all[active].id);all[active].scrollIntoView({block:"nearest"})};
 const open=()=>{const q=inp.dataset.value?"":inp.value.trim().toLowerCase();
  const hits=courses.filter(c=>c.target&&`${c.num} ${c.name} ${c.he}`.toLowerCase().includes(q));
  const li=(v,label,cls="")=>`<li role="option" id="co-${v}" data-v="${v}" class="${cls}" aria-selected="false"><bdi>${esc(label)}</bdi></li>`;
  list.innerHTML=li(OTHER,t("courseOtherOpt"),"pinned")+hits.slice(0,COURSE_MAX).map(c=>li(c.num,courseText(c.num))).join("")+(hits.length?"":`<li class="none" role="presentation">${esc(t("courseNone"))}</li>`);
  list.hidden=false;inp.setAttribute("aria-expanded","true");active=-1};
 const pick=v=>{inp.dataset.value=v;inp.value=courseText(v);inp.classList.remove("invalid");other.hidden=v!==OTHER;close();if(v===OTHER)other.focus()};
 inp.onfocus=inp.onclick=()=>{open();inp.select()};
 inp.oninput=()=>{inp.dataset.value="";other.hidden=true;open()};
 inp.onblur=close;
 inp.onkeydown=e=>{
  if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(list.hidden)open();mark(active<0?(e.key==="ArrowDown"?0:-1):active+(e.key==="ArrowDown"?1:-1))}
  else if(e.key==="Enter"&&!list.hidden&&active>=0){e.preventDefault();pick(items()[active].dataset.v)}
  else if(e.key==="Escape")close()};
 // mousedown (not click) so the choice registers before the input loses focus
 list.onmousedown=e=>e.preventDefault();
 list.onclick=e=>{e.preventDefault();const li=e.target.closest("[data-v]");if(li)pick(li.dataset.v)};
}
