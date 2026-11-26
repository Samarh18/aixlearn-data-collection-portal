// Upload a conversation, submissions list and withdrawal.

const mk=r=>esc(r).replace("{u}",'<code dir="ltr">User:</code>').replace("{a}",'<code dir="ltr">AI:</code>');
const fileSection=()=>`<section class="filesec">
 <div class="filehead"><span class="fileicon">${DOC_ICON}</span><div><h3>${t("fileLabel")}</h3><p class="muted">${t("fileIntro")}</p></div></div>
 <ul class="reqs">${T[lang].reqs.map(r=>`<li>${CHECK_ICON}<span>${mk(r)}</span></li>`).join("")}</ul>
 <label class="filepick"><input type="file" id="up-file" accept=".txt,text/plain"><span class="btn small" aria-hidden="true">${t("chooseFile")}</span><span id="up-fname" class="muted">${esc(pendingFile?pendingFile.name:t("noFileChosen"))}</span></label>
 <details class="howto"><summary>${t("howFile")}</summary>
  <ol>${T[lang].howSteps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
  <div class="promptbox"><div class="promptbar"><span>${t("promptLabel")}</span><button class="btn ghost small" id="copy-prompt">${COPY_ICON}<span>${t("copyPrompt")}</span></button></div><pre id="prompt-text" dir="ltr">${esc(PROMPT)}</pre></div>
  <div class="examples"><h4>${t("examplesTitle")}</h4>
   <div class="exgrid">${T[lang].examples.map(e=>`<figure class="ex"><figcaption>${CHECK_ICON}<span>${esc(e[0])}</span></figcaption><pre>${esc(e[1])}</pre></figure>`).join("")}</div>
   <p class="muted notacc">${t("notAccepted")}</p>
  </div>
 </details>
 <div class="proto"><span class="lbl">${t("demoHint")}</span><div class="btns"><button class="btn ghost small" id="up-sample-ok">${t("sampleOk")}</button><button class="btn ghost small" id="up-sample-bad">${t("sampleBad")}</button><button class="btn ghost small" id="up-sample-pdf" ${S.uploadDraft.purpose==="Assignment"?"":"hidden"}>${t("sampleOkPdf")}</button></div></div>
</section>`;
const pdfSection=show=>`<section class="pdfsec" id="up-pdf-wrap" ${show?"":"hidden"}>
 <div class="filehead"><span class="fileicon">${DOC_ICON}</span><div><h3>${t("pdfLabel")} <span class="muted">${t("opt")}</span></h3><p>${t("pdfIntro")}</p></div></div>
 <span class="ticket big">${TICKET_ICON}<span>${esc(t("pdfBadge"))}</span></span>
 <label class="filepick"><input type="file" id="up-pdf"><span class="btn small" aria-hidden="true">${t("chooseFile")}</span><span id="up-pdfname" class="muted">${esc(pendingPdf?pendingPdf.name:t("noFileChosen"))}</span></label>
 <div id="up-pdf-err" class="result err" role="alert" hidden></div>
</section>`;
function syncCond(){const pu=$("#up-purpose");if(!pu)return;const ex=pu.value==="Exam prep";$("#up-pdf-wrap").hidden=$("#up-sample-pdf").hidden=pu.value!=="Assignment";$("#up-moed-wrap").hidden=!ex;$("#up-reason-wrap").hidden=!(ex&&$("#up-moed").value==="Moed B")}
function homeView(){
 const mine=submissions.filter(s=>s.pid===S.me.pid);
 const n=ticketTotal(S.me.pid);
 const d=S.uploadDraft;
 const LR=S.lastResult;
 const exam=d.purpose==="Exam prep",moedB=exam&&d.moed==="Moed B";
 return `<div class="stack">
  <h2>${t("uploadTitle")}</h2>
  <div class="split">
   <div class="panel stack" style="min-width:0">
    <label class="f"><span class="lt">${esc(q("q_course"))}</span><span class="ctl">${courseSelect(d.course,d.courseOther)}</span><span class="hint"></span></label>
    <label class="f"><span class="lt">${esc(q("q_tool"))}</span><span class="ctl">${selO("up-tool","q_tool",d.tool,d.toolOther)}</span><span class="hint"></span></label>
    <label class="f"><span class="lt">${esc(q("q_purpose"))}</span><span class="ctl">${selO("up-purpose","q_purpose",d.purpose,d.purposeOther)}</span><span class="hint"></span></label>
    <label class="f" id="up-moed-wrap" ${exam?"":"hidden"}><span class="lt">${esc(q("q_moed"))}</span><span class="ctl"><select id="up-moed">${optsQ("q_moed",d.moed)}</select></span><span class="hint"></span></label>
    <label class="f" id="up-reason-wrap" ${moedB?"":"hidden"}><span class="lt">${esc(q("q_reason"))}</span><span class="ctl">${selO("up-reason","q_reason",d.reason,d.reasonOther)}</span><span class="hint"></span></label>
    ${customFields("Each upload",{})}
    ${pdfSection(d.purpose==="Assignment")}
    ${fileSection()}
    <div id="up-err" class="result err" hidden></div>
    ${LR?`<div class="result ${LR.ok?"ok":"err"}"><b>${t(LR.ok?"fileAccepted":"fileRejected")}</b>${esc(LR.ok?t("acceptedMsg",{t:LR.turns,tp:tp(LR.tickets),x:LR.pdf?t("pdfEarned"):""}):t(LR.key))}</div>`:""}
    <div class="row"><button class="btn" id="up-submit">${t("submit")}</button></div>
   </div>
   <div class="stack" style="min-width:0">
    <div class="panel stack"><h3>${t("haveNow")}</h3><span class="ticket big">${esc(t("inDraw",{tp:tp(n)}))}</span><p class="muted" style="font-size:13.5px">${t("howTickets")}</p></div>
    ${contactHtml()}
   </div>
  </div>
  <div class="panel stack">
   <h3>${t("mySubs")}</h3>
   ${mine.length?`<div class="tablewrap"><table><thead><tr><th>${t("thCourse")}</th><th>${t("thDate")}</th><th>${t("thStatus")}</th><th class="num">${t("thTickets")}</th></tr></thead><tbody>
    ${mine.map(s=>`<tr><td class="wrapcell">${courseHtml(s)}</td><td class="mono"><bdi>${s.date}</bdi></td><td>${s.ok?`<span class="chip ok">${t("accepted")}</span>`:`<span class="chip err">${t("needsFix")}</span>`}${s.pdf?` <span class="chip acc">${t("pdfChip")}</span>`:""}</td><td class="num">${ticketsFor(s)}</td></tr>`).join("")}
   </tbody></table></div>`:`<p class="muted">${t("nothingYet")}</p>`}
  </div>
  <div class="panel stack withdraw">
   <h3>${t("wdTitle")}</h3>
   <p class="muted">${t("wdIntro")}</p>
   <div class="wdpart"><h4>${t("wdSomeTitle")}</h4>
    ${mine.length?`<ul class="rmlist">${mine.map(s=>`<li><span>${courseHtml(s)} <span class="muted">· <bdi class="mono">${s.date}</bdi></span></span><button class="btn danger-ghost small" data-rm="${s.sid}">${t("removeOne")}</button></li>`).join("")}</ul>`:`<p class="muted">${t("nothingYet")}</p>`}
   </div>
   <div class="wdpart"><h4>${t("wdAllTitle")}</h4><p class="muted">${t("wdBody")}</p><div class="row"><button class="btn danger-ghost small" id="me-withdraw">${t("withdraw")}</button></div></div>
  </div>
  <div class="modal" id="wd-modal" hidden><div class="modal-box stack" role="dialog" aria-modal="true" aria-labelledby="wd-q">
   <h2 id="wd-q"></h2>
   <p class="muted" id="wd-body"></p>
   <div class="row" style="justify-content:flex-end"><button class="btn ghost" id="wd-cancel">${t("cancel")}</button><button class="btn danger" id="wd-yes"></button></div>
  </div></div>
 </div>`;
}
function bindHome(){
 const save=()=>{const pu=$("#up-purpose").value,ex=pu==="Exam prep",mo=ex?$("#up-moed").value:"";
  const co=$("#up-course").dataset.value;S.uploadDraft={course:co,courseOther:co===OTHER?$("#up-course-other").value.trim():"",tool:$("#up-tool").value,toolOther:otherVal("up-tool"),purpose:pu,purposeOther:otherVal("up-purpose"),moed:mo,reason:mo==="Moed B"?$("#up-reason").value:"",reasonOther:mo==="Moed B"?otherVal("up-reason"):""}};
 bindCoursePicker();
 $("#up-purpose").addEventListener("change",()=>{if($("#up-purpose").value!=="Assignment"){pendingPdf=null;$("#up-pdfname").textContent=t("noFileChosen");$("#up-pdf-err").hidden=true}syncCond()});$("#up-moed").addEventListener("change",syncCond);
 $("#up-file").onchange=e=>{const f=e.target.files[0];if(!f){pendingFile=null;return}const fr=new FileReader();fr.onload=()=>{pendingFile={name:f.name,text:fr.result};$("#up-fname").textContent=f.name};fr.readAsText(f,"utf-8")};
 const setPdf=(name,size,head)=>{const r=validatePdf(name,head),er=$("#up-pdf-err");$("#up-pdf-wrap .filepick").classList.remove("invalid");
  if(!r.ok){pendingPdf=null;$("#up-pdfname").textContent=t("noFileChosen");er.textContent=t(r.key,{f:"\u2068"+name+"\u2069"});er.hidden=false;return}
  er.hidden=true;pendingPdf={name,size};$("#up-pdfname").textContent=name};
 $("#up-pdf").onchange=e=>{const f=e.target.files[0];if(!f){pendingPdf=null;$("#up-pdfname").textContent=t("noFileChosen");return}const fr=new FileReader();fr.onload=()=>setPdf(f.name,f.size,fr.result);fr.readAsText(f.slice(0,5),"latin1");e.target.value=""};
 $("#up-sample-pdf").onclick=()=>{setPdf("assignment_sample.pdf",184320,"%PDF-");toast(t("sampleAttached",{f:"assignment_sample.pdf"}))};
 $("#up-sample-ok").onclick=()=>{$(".filesec .filepick").classList.remove("invalid");pendingFile={name:"bayes_chat.txt",text:SAMPLE_OK};$("#up-fname").textContent="bayes_chat.txt";toast(t("sampleAttached",{f:"bayes_chat.txt"}))};
 $("#up-sample-bad").onclick=()=>{$(".filesec .filepick").classList.remove("invalid");pendingFile={name:"my_notes.txt",text:SAMPLE_BAD};$("#up-fname").textContent="my_notes.txt";toast(t("sampleAttached",{f:"my_notes.txt"}))};
 $("#up-submit").onclick=()=>{const e=$("#up-err");save();const d=S.uploadDraft;const miss=[];const ex=d.purpose==="Exam prep";
  const bad=[];const need=(ok,el,msg)=>{if(!ok){bad.push(el);if(!miss.includes(msg))miss.push(msg)}};
  need(d.course,$("#up-course"),t("mCourse"));need(d.course!==OTHER||d.courseOther,$("#up-course-other"),t("mOther"));
  need(d.tool,$("#up-tool"),t("mTool"));need(!otherMissing("up-tool"),$("#up-tool-other"),t("mOther"));
  need(d.purpose,$("#up-purpose"),t("mPurpose"));need(!otherMissing("up-purpose"),$("#up-purpose-other"),t("mOther"));
  if(ex)need(d.moed,$("#up-moed"),t("mMoed"));
  if(d.moed==="Moed B"){need(d.reason,$("#up-reason"),t("mReason"));need(!otherMissing("up-reason"),$("#up-reason-other"),t("mOther"))}
  const cust=readCustom("Each upload",need);
  need(pendingFile,$(".filesec .filepick"),t("mFile"));
  if(bad.length){flag(bad);e.textContent=t("stillNeeded",{x:listJoin(miss)});e.hidden=false;return}
  e.hidden=true;
  const v=validate(pendingFile.name,pendingFile.text);const num=d.course===OTHER?"other":d.course;
  if(!v.ok){S.lastResult={ok:false,key:v.key};render();return}
  const s={sid:"S"+String(submissions.length+1).padStart(4,"0"),pid:S.me.pid,course:num,courseText:d.course===OTHER?d.courseOther:"",tool:d.tool,toolOther:d.toolOther,moed:d.moed,reason:d.reason,reasonOther:d.reasonOther,purpose:d.purpose,purposeOther:d.purposeOther,date:"2027-02-14",ok:true,error:"",turns:v.turns,text:pendingFile.text,round:"R1",custom:cust};s.file=fname(s);if(d.purpose==="Assignment"&&pendingPdf)s.pdf={name:pdfName(s),size:pendingPdf.size};
  submissions.push(s);S.lastResult={ok:true,turns:v.turns,tickets:ticketsFor(s),pdf:!!s.pdf};S.uploadDraft={};pendingFile=null;pendingPdf=null;render()};
 const md=$("#wd-modal");let back=null;
 const closeMd=()=>{md.hidden=true;if(back)back.focus()};
 const openMd=(btn,q,body,yes,act)=>{back=btn;$("#wd-q").textContent=q;$("#wd-body").textContent=body;$("#wd-yes").textContent=yes;$("#wd-yes").onclick=act;md.hidden=false;$("#wd-cancel").focus()};
 $("#wd-cancel").onclick=closeMd;
 md.onclick=e=>{if(e.target===md)closeMd()};
 md.onkeydown=e=>{if(e.key==="Escape")closeMd()};
 document.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>openMd(b,t("rmQ"),t("rmQBody"),t("rmYes"),()=>{submissions=submissions.filter(s=>s.sid!==b.dataset.rm);S.lastResult=null;toast(t("deleted"));render()}));
 $("#me-withdraw").onclick=e=>openMd(e.currentTarget,t("wdQ"),t("wdQBody"),t("wdYes"),()=>{S.me.withdrawn=true;submissions=submissions.filter(s=>s.pid!==S.me.pid);S=fresh();toast(t("withdrawn"));render();window.scrollTo({top:0})});
}
