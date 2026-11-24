// Questions tab.

const TYPE_LABEL={choice:"Multiple choice",text:"Short text",number:"Number",course:"Course list"};
function qView(){
 const card=(x,i)=>`<div class="qcard ${x.retired?"retired":""}">
  <div class="qhead"><div class="row" style="gap:6px"><span class="chip neutral">${TYPE_LABEL[x.type]}</span>${x.core?'<span class="chip acc">Core question</span>':'<span class="chip ok">Added by you</span>'}${x.required?'<span class="chip neutral">Required</span>':'<span class="chip neutral">Optional</span>'}${x.retired?'<span class="chip err">Retired</span>':""}</div>
   ${x.core?"":`<button class="btn ghost small" data-retire="${i}">${x.retired?"Restore":"Retire"}</button>`}</div>
  <div class="qlangs">
   <label>HE<input type="text" dir="rtl" lang="he" data-q="${i}" data-l="he" maxlength="160" value="${esc(x.text.he)}"></label>
   <label>AR<input type="text" dir="rtl" lang="ar" data-q="${i}" data-l="ar" maxlength="160" value="${esc(x.text.ar)}"></label>
   <label>EN<input type="text" dir="ltr" data-q="${i}" data-l="en" maxlength="160" value="${esc(x.text.en)}"></label>
  </div>
  ${x.type==="choice"?`<div class="opts"><div class="optrow opthead"><span>Option · HE</span><span>AR</span><span>EN</span><span></span></div>
   ${x.opts.map((o,j)=>`<div class="optrow"><input type="text" dir="rtl" data-o="${i}.${j}" data-l="he" maxlength="60" value="${esc(o.he)}" aria-label="Option ${j+1} Hebrew"><input type="text" dir="rtl" data-o="${i}.${j}" data-l="ar" maxlength="60" value="${esc(o.ar)}" aria-label="Option ${j+1} Arabic"><input type="text" data-o="${i}.${j}" data-l="en" maxlength="60" value="${esc(o.en)}" aria-label="Option ${j+1} English"><button class="iconbtn" data-odel="${i}.${j}" ${o.locked?`disabled title="The form's logic uses this option"`:`title="Remove option"`} aria-label="Remove option">${o.locked?LOCK_ICON:X_ICON}</button></div>`).join("")}
   <div class="row"><button class="btn ghost small" data-oadd="${i}">+ Add option</button></div></div>`:""}
  ${x.type==="course"?'<p class="muted" style="font-size:13px">The options come from the course list in Courses & rounds.</p>':""}
 </div>`;
 const grp=sc=>questions.map((x,i)=>x.scope===sc?card(x,i):"").join("");
 return `<div class="stack">
  <div class="note">Every question has Hebrew, Arabic and English wording. Edits apply to new answers only. Retiring a question hides it from students and keeps every past answer. Core questions can't be retired because the form's logic depends on them; options with a lock can't be removed for the same reason.</div>
  <div class="panel stack"><h3>Add a question</h3>
   <div class="grid3">
    <label class="f"><span class="lt">Where it's asked</span><select id="nq-scope"><option value="Profile">Profile (asked once)</option><option value="Each upload">With every conversation</option></select></label>
    <label class="f"><span class="lt">Answer type</span><select id="nq-type"><option value="choice">Multiple choice</option><option value="text">Short text</option><option value="number">Number</option></select></label>
    <label class="f"><span class="lt">Required</span><select id="nq-req"><option value="1">Required</option><option value="0">Optional</option></select></label>
   </div>
   <div class="qlangs">
    <label>HE<input type="text" id="nq-he" dir="rtl" maxlength="160" placeholder="נוסח השאלה בעברית"></label>
    <label>AR<input type="text" id="nq-ar" dir="rtl" maxlength="160" placeholder="نص السؤال بالعربية"></label>
    <label>EN<input type="text" id="nq-en" maxlength="160" placeholder="Question wording in English"></label>
   </div>
   <label class="check" id="nq-other-wrap"><input type="checkbox" id="nq-other"><span>Include an "Other" option with a text box</span></label>
   <div class="row"><button class="btn small" id="nq-add">Add question</button><span class="muted" style="font-size:13px">You can add its options right after.</span></div>
  </div>
  <h3>Profile questions <span class="muted" style="font-weight:400">asked once</span></h3>${grp("Profile")}
  <h3>Per-conversation questions <span class="muted" style="font-weight:400">asked with every file</span></h3>${grp("Each upload")}
 </div>`;
}
function bindQuestions(){
 document.querySelectorAll("[data-q]").forEach(inp=>inp.onchange=()=>{questions[inp.dataset.q].text[inp.dataset.l]=inp.value;toast("Question updated.")});
 document.querySelectorAll("[data-o]").forEach(inp=>inp.onchange=()=>{const[i,j]=inp.dataset.o.split(".").map(Number);questions[i].opts[j][inp.dataset.l]=inp.value;toast("Option updated.")});
 document.querySelectorAll("[data-oadd]").forEach(b=>b.onclick=()=>{const x=questions[+b.dataset.oadd];const o={v:"opt_"+(++optSeq),he:"",ar:"",en:""};const oi=x.opts.findIndex(z=>z.v===OTHER);oi>=0?x.opts.splice(oi,0,o):x.opts.push(o);render()});
 document.querySelectorAll("[data-odel]").forEach(b=>b.onclick=()=>{const[i,j]=b.dataset.odel.split(".").map(Number);questions[i].opts.splice(j,1);render()});
 document.querySelectorAll("[data-retire]").forEach(b=>b.onclick=()=>{const x=questions[b.dataset.retire];x.retired=!x.retired;render()});
 const nt=$("#nq-type");if(nt){const sync=()=>{$("#nq-other-wrap").hidden=nt.value!=="choice"};nt.onchange=sync;sync();
  $("#nq-add").onclick=()=>{const he=$("#nq-he").value.trim(),ar=$("#nq-ar").value.trim(),en=$("#nq-en").value.trim();const bad=[];if(!he)bad.push($("#nq-he"));if(!ar)bad.push($("#nq-ar"));if(!en)bad.push($("#nq-en"));if(bad.length){flag(bad);return toast("Write the question in all three languages.")}
   const type=nt.value,x={id:"cq_"+(++qSeq),scope:$("#nq-scope").value,type,required:$("#nq-req").value==="1",retired:false,core:false,text:{he,ar,en},opts:[]};
   if(type==="choice"){x.opts.push({v:"opt_"+(++optSeq),he:"",ar:"",en:""},{v:"opt_"+(++optSeq),he:"",ar:"",en:""});if($("#nq-other").checked)x.opts.push({v:OTHER,he:"אחר",ar:"آخر",en:"Other",locked:true})}
   questions.push(x);toast(type==="choice"?"Question added. Fill in its options below.":"Question added.");render()}}
}
