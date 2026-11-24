// Researcher sign-in (English only).

function rSigninView(){
 return `<div class="panel stack" style="max-width:520px">
  <h2>Researcher sign-in</h2>
  <p class="muted">The dashboard is for approved research staff only. We'll email a 6-digit code to your Technion address.</p>
  <label class="f">Staff email<input type="email" id="ra-email" dir="ltr" value="${esc(R.email)}" placeholder="name@technion.ac.il" autocomplete="email" ${R.codeSent?"readonly":""}></label>
  ${R.codeSent?`<p>We sent a code to ${esc(R.email)}. It expires in 10 minutes.</p>
  <label class="f">6-digit code<input type="text" id="ra-code" dir="ltr" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="••••••"></label>
  <div class="row"><button class="btn" id="ra-verify">Sign in</button><button class="linkbtn" id="ra-back">Use a different email</button></div>`
  :`<div class="row"><button class="btn" id="ra-send">Send code</button></div>`}
  <div id="ra-err" class="result err" hidden></div>
  <div class="proto"><span class="lbl">For testing the prototype only</span><p style="font-size:13px">Only ${ADMINS.join(", ")} has access for now. The code is ${DEMO_CODE}.</p></div>
  <p style="font-size:13px"><button class="linkbtn" id="ra-student">Back to student sign-in</button></p>
 </div>`;
}
function bindRSignin(){
 const err=m=>{const e=$("#ra-err");e.textContent=m;e.hidden=false};
 $("#ra-student").onclick=()=>setView("student");
 if(!R.codeSent){$("#ra-send").onclick=()=>{const v=$("#ra-email").value.trim().toLowerCase();
  if(!isTechnion(v))return err("Use your Technion address (ending in technion.ac.il).");
  if(!ADMINS.includes(v))return err("This address doesn't have researcher access. Ask the study lead to add it.");
  R.email=v;R.codeSent=true;render()}}
 else{$("#ra-back").onclick=()=>{R.codeSent=false;render()};
  $("#ra-verify").onclick=()=>{if($("#ra-code").value.trim()!==DEMO_CODE)return err("That code is incorrect or expired. Check the latest email and try again.");R.in=true;render()}}
}
