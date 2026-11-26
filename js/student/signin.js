// Student sign-in: email + 6-digit code.

function signinView(){
 return `<div class="narrow">
 <div class="panel stack">
  <h2>${t("signinTitle")}</h2>
  <p class="muted">${t("signinIntro")}</p>
  <label class="f"><span class="lt">${t("emailLabel")}${STAR}</span><span class="ctl"><input type="email" id="si-email" dir="ltr" value="${esc(S.email)}" placeholder="name@campus.technion.ac.il" autocomplete="email" ${S.codeSent?"readonly":""}></span><span class="hint">${t("emailHint")}</span></label>
  ${S.codeSent?`<p>${esc(t("codeSentTo",{e:"⁨"+S.email+"⁩"}))}</p>
  <div class="note">${esc(t("protoCode",{c:DEMO_CODE}))}</div>
  <label class="f"><span class="lt">${t("codeLabel")}${STAR}</span><input type="text" id="si-code" dir="ltr" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="••••••"></label>
  <div class="row"><button class="btn" id="si-verify">${t("verify")}</button><button class="linkbtn" id="si-resend">${t("resend")}</button><button class="linkbtn" id="si-back">${t("diffEmail")}</button></div>`
  :`<div class="row"><button class="btn" id="si-send">${t("sendCode")}</button></div>`}
  <div id="si-err" class="result err" hidden></div>
  <div class="proto"><span class="lbl">${t("demoHint")}</span><div class="btns"><button class="btn ghost small" id="si-demo">${t("demoReturning")}</button><button class="btn ghost small" id="si-new">${t("demoNew")}</button></div></div>
  ${contactHtml()}
  <p style="font-size:13px"><button class="linkbtn" id="si-research">${t("researcherLink")}</button></p>
 </div>
 </div>`;
}
function bindSignin(){
 const err=m=>{const e=$("#si-err");e.textContent=m;e.hidden=false};
 $("#si-demo").onclick=()=>{S.me=participants[0];S.step="home";render()};
 $("#si-new").onclick=()=>{S.email="new.student@campus.technion.ac.il";S.step="register";render()};
 $("#si-research").onclick=()=>setView("research");
 if(!S.codeSent){$("#si-send").onclick=()=>{const v=$("#si-email").value;if(!isTechnion(v))return err(t("errEmail"));S.email=v.trim().toLowerCase();S.codeSent=true;render()}}
 else{$("#si-back").onclick=()=>{S.codeSent=false;render()};
  $("#si-resend").onclick=()=>toast(t("newCode"));
  $("#si-verify").onclick=()=>{if($("#si-code").value.trim()!==DEMO_CODE)return err(t("errCode"));
   const ex=participants.find(p=>p.email===S.email&&!p.withdrawn);if(ex){S.me=ex;S.step="home"}else S.step="register";render()}}
}
