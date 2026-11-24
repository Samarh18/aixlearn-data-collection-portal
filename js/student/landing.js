// Landing page: headline, prize, who we are, three steps, one button to sign in or register.

function landingView(){
 const icons=[USER_ICON,UP_ICON,TICKET_ICON,REPEAT_ICON];
 const lab=`<a class="lab" href="https://roll.net.technion.ac.il/" target="_blank" rel="noopener"><bdi>LALD</bdi></a>`;
 return `<div class="landing">
 <div class="lp-ret"><span>${t("lpRet")}</span> <button class="linkbtn" data-go="signin">${t("lpRetLink")}</button></div>
 <div class="lp-hero">
  <h1><span class="q">${esc(t("lpTitle1"))}</span><span class="prize">${esc(t("lpTitle2"))}</span></h1>
  <p class="lead">${t("lpSub")}</p>
 </div>
 <p class="lp-who muted">${t("lpWho",{lab})}</p>
 <h2 class="lp-do">${t("lpDo")}</h2>
 <ul class="lp-steps">${T[lang].lpSteps.map((x,i)=>`<li><span class="ic">${icons[i]}</span><span>${esc(x)}</span></li>`).join("")}</ul>
 <div class="lp-cta"><p class="lp-invite">${t("lpInvite")}</p><button class="btn" data-go="signin">${t("lpCta")}</button></div>
 ${contactHtml()}
 </div>`;
}
function bindLanding(){document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{S.step=b.dataset.go;render();window.scrollTo({top:0})})}
