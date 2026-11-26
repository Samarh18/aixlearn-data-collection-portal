// First-visit registration and profile edit.

function registerView(){
 const ed=S.step==="profile",P=ed?S.me:{};
 const v=k=>esc(P[k]??"");
 return `<div class="stack" style="max-width:720px">
  ${ed?`<div class="sectionhead"><h2>${t("myProfile")}</h2><button class="btn ghost small" id="pf-cancel">${t("cancel")}</button></div>`
  :`<div class="steps"><span class="done">${t("stepSigned")}</span><span class="on">${t("stepRegister")}</span><span>${t("stepUpload")}</span></div>`}
  <div class="panel stack">
   <h2>${t("aboutYou")}</h2>
   <p class="muted">${t("aboutIntro")}</p>
   <div class="grid2">
    <label class="f"><span class="lt">${t("first")}${STAR}</span><span class="ctl"><input type="text" id="rg-first" dir="auto" maxlength="60" value="${v("first")}"></span><span class="hint"></span></label>
    <label class="f"><span class="lt">${t("last")}${STAR}</span><span class="ctl"><input type="text" id="rg-last" dir="auto" maxlength="60" value="${v("last")}"></span><span class="hint"></span></label>
    <label class="f"><span class="lt">${t("idnum")}${STAR}</span><span class="ctl"><input type="text" id="rg-id" dir="ltr" inputmode="numeric" maxlength="9" value="${v("idnum")}"></span><span class="hint"></span></label>
    <label class="f"><span class="lt">${t("backup")}</span><span class="ctl"><input type="email" id="rg-backup" dir="ltr" maxlength="100" value="${v("backup")}"></span><span class="hint">${t("backupHint")}</span></label>
   </div>
  </div>
  <div class="panel stack">
   <h2>${t("consent")}</h2>
   ${ed?`<p class="muted">${t("consentGiven")}</p>`:`<div class="consent">${t("consentIntro")}<ul>${T[lang].consentItems.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
   <label class="check"><input type="checkbox" id="c-part"><span>${t("cPart")}${STAR}</span></label>
   <label class="check"><input type="checkbox" id="c-grades"><span>${t("cGrades")}${STAR}</span></label>`}
   <label class="check"><input type="checkbox" id="c-recontact" ${P.recontact?"checked":""}><span>${t("cRecontact")} <span class="muted">${t("opt")}</span></span></label>
  </div>
  <div class="panel stack">
   <h2>${t("background")}</h2>
   <div class="grid2">
    <label class="f"><span class="lt">${esc(q("q_year"))}${STAR}</span><span class="ctl">${selO("rg-year","q_year",P.year,P.yearOther)}</span><span class="hint"></span></label>
    <label class="f"><span class="lt">${esc(q("q_faculty"))}${STAR}</span><span class="ctl">${selO("rg-fac","q_faculty",P.faculty,P.facultyOther)}</span><span class="hint">${t("doubleMajor")}</span></label>
    <label class="f"><span class="lt">${esc(q("q_gpa"))}${STAR}</span><span class="ctl"><input type="number" id="rg-gpa" min="0" max="100" value="${v("gpa")}"></span><span class="hint"></span></label>
    <label class="f"><span class="lt">${esc(q("q_prev"))}${STAR}</span><span class="ctl"><select id="rg-prev">${optsQ("q_prev",P.prev)}</select></span><span class="hint"></span></label>
    ${customFields("Profile",P.custom||{})}
   </div>
  </div>
  <div id="rg-err" class="result err" hidden></div>
  <div class="row"><button class="btn" id="rg-save">${t(ed?"saveChanges":"saveContinue")}</button></div>
 </div>`;
}
function bindRegister(){
 const ed=S.step==="profile";
 if(ed)$("#pf-cancel").onclick=()=>{S.step="home";render();window.scrollTo({top:0})};
 $("#rg-save").onclick=()=>{const g=id=>$(id).value.trim();const e=$("#rg-err");
  const miss=[],bad=[];const need=(ok,el,msg)=>{if(!ok){bad.push(el);if(!miss.includes(msg))miss.push(msg)}};
  need(g("#rg-first"),$("#rg-first"),t("first"));need(g("#rg-last"),$("#rg-last"),t("last"));need(/^\d{9}$/.test(g("#rg-id")),$("#rg-id"),t("mId"));
  if(!ed){need($("#c-part").checked,$("#c-part").closest(".check"),t("mConsent"));need($("#c-grades").checked,$("#c-grades").closest(".check"),t("mConsent"))}
  need(g("#rg-year"),$("#rg-year"),t("mYear"));need(!otherMissing("rg-year"),$("#rg-year-other"),t("mOther"));
  need(g("#rg-fac"),$("#rg-fac"),t("mFaculty"));need(!otherMissing("rg-fac"),$("#rg-fac-other"),t("mOther"));
  const gp=g("#rg-gpa");need(gp!==""&&+gp>=0&&+gp<=100,$("#rg-gpa"),t("mGpa"));need(g("#rg-prev"),$("#rg-prev"),t("mPrev"));
  const cust=readCustom("Profile",need);
  if(bad.length){flag(bad);e.textContent=t("stillNeeded",{x:listJoin(miss)});e.hidden=false;return}
  e.hidden=true;
  const f={first:g("#rg-first"),last:g("#rg-last"),idnum:g("#rg-id"),backup:g("#rg-backup"),year:g("#rg-year"),yearOther:otherVal("rg-year"),faculty:g("#rg-fac"),facultyOther:otherVal("rg-fac"),gpa:Number(g("#rg-gpa"))||0,prev:g("#rg-prev"),recontact:$("#c-recontact").checked,custom:cust};
  if(ed){Object.assign(S.me,f);S.step="home";toast(t("profileUpdated"))}
  else{const p=Object.assign({pid:"P"+(1001+participants.length),email:S.email,consentGrades:true,withdrawn:false,joined:"R1"},f);participants.push(p);S.me=p;S.step="home";toast(t("registered"))}
  render();window.scrollTo({top:0})};
}
