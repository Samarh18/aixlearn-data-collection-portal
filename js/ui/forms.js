// Select and field helpers: "Other" text box, custom questions, option lists.

const OTHER="Other";
const selO=(id,qid,sel,oth)=>`<select id="${id}" data-other="${id}-other">${optsQ(qid,sel)}</select><input type="text" id="${id}-other" class="other-input" dir="auto" maxlength="40" placeholder="${esc(t("pleaseSpecify"))}" value="${esc(oth||"")}" ${sel===OTHER?"":"hidden"}>`;
const otherMissing=id=>$("#"+id).value===OTHER&&!$("#"+id+"-other").value.trim();
const otherVal=id=>$("#"+id).value===OTHER?$("#"+id+"-other").value.trim():"";
function syncSelects(){document.querySelectorAll("#app select").forEach(s=>{syncDropdown(s);if(s.dataset.other){const o=document.getElementById(s.dataset.other);if(o)o.hidden=s.value!==OTHER}})}
function bindSelects(){document.querySelectorAll("#app select").forEach(enhanceSelect);syncSelects();document.querySelectorAll("#app select").forEach(s=>s.addEventListener("change",()=>{syncSelects();if(s.dataset.other&&s.value===OTHER)document.getElementById(s.dataset.other).focus()}))}
const optsQ=(qid,sel)=>`<option value="">${esc(t("choose"))}</option>`+qById(qid).opts.map(o=>`<option value="${esc(o.v)}" ${sel===o.v?"selected":""}>${esc(o[lang]||o.en||o.he)}</option>`).join("");
const customQs=sc=>questions.filter(x=>!x.core&&!x.retired&&x.scope===sc);
const customFields=(sc,ans={})=>customQs(sc).map(x=>{const id="cq-"+x.id,v=ans[x.id]??"",oth=x.type==="choice"&&x.opts.some(o=>o.v===OTHER);
 const ctl=x.type==="choice"?`<select id="${id}" ${oth?`data-other="${id}-other"`:""}>${optsQ(x.id,v)}</select>${oth?`<input type="text" id="${id}-other" class="other-input" dir="auto" maxlength="40" placeholder="${esc(t("pleaseSpecify"))}" value="${esc(ans[x.id+"_other"]||"")}" ${v===OTHER?"":"hidden"}>`:""}`
  :x.type==="number"?`<input type="number" id="${id}" value="${esc(v)}">`:`<input type="text" id="${id}" dir="auto" maxlength="100" value="${esc(v)}">`;
 return `<label class="f"><span class="lt">${esc(x.text[lang]||x.text.en)}${x.required?"":` <span class="muted">${t("opt")}</span>`}</span><span class="ctl">${ctl}</span><span class="hint"></span></label>`}).join("");
const readCustom=(sc,need)=>{const o={};customQs(sc).forEach(x=>{const id="cq-"+x.id,el=$("#"+id);if(!el)return;o[x.id]=el.value.trim();if(el.value===OTHER)o[x.id+"_other"]=otherVal(id);
 if(need&&x.required){need(el.value.trim(),el,x.text[lang]||x.text.en);need(!otherMissing(id),$("#"+id+"-other"),t("mOther"))}});return o};
const opts=(list,sel)=>`<option value="">${esc(t("choose"))}</option>`+list.map(v=>`<option value="${esc(v)}" ${sel===v?"selected":""}>${esc(lbl(v))}</option>`).join("");
