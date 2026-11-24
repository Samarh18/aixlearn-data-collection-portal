// Entry point: render() and language switching. Loaded last.

function setView(v){view=v;render();window.scrollTo({top:0})}
function snapshotForm(){const m={};document.querySelectorAll("#app input[id],#app select[id]").forEach(el=>{if(el.type==="file"||el.id.startsWith("up-"))return;m[el.id]=el.type==="checkbox"?el.checked:el.value});return m}
function restoreForm(m){for(const[id,v] of Object.entries(m)){const el=document.getElementById(id);if(!el)continue;if(el.type==="checkbox")el.checked=v;else el.value=v}
 syncCond();syncSelects()}
function setLang(l){const m=snapshotForm();lang=l;S.uploadDraft={};pendingFile=null;S.lastResult=null;render();restoreForm(m)}
function render(){
 const shell=$("#shell");
 document.documentElement.lang=view==="student"?lang:"en";
 if(view==="student"){shell.lang=lang;shell.dir=LANGS[lang].dir}else{shell.lang="en";shell.dir="ltr"}
 $("#brand-sub").textContent=view==="student"?t("brandSub"):T.en.brandSub;
 $("#brand-sub").dir=view==="student"?LANGS[lang].dir:"ltr";$("#whoami").dir=view==="student"?LANGS[lang].dir:"ltr";
 const seg=$("#langseg");seg.hidden=view!=="student";
 seg.innerHTML=Object.entries(LANGS).map(([k,v])=>`<button lang="${k}" data-lang="${k}" aria-pressed="${k===lang}">${v.label}</button>`).join("");
 seg.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
 $("#whoami").innerHTML=view!=="student"&&R.in?`${esc(R.email)}<button class="btn small hdr-btn" id="ra-out">Sign out</button>`:"";
 const sub=$("#subnav");sub.hidden=view!=="student"||S.step==="signin";
 sub.querySelector(".subnav-in").innerHTML=sub.hidden?"":`<span class="signed">${S.me?esc(t("signedInAs",{e:"\u2068"+S.me.email+"\u2069"})):""}</span>
  <div class="navbtns">${S.me?`<button data-nav="home" ${S.step==="home"?'aria-current="page"':""}>${UP_ICON}<span>${esc(t("uploadTitle"))}</span></button>
   <button data-nav="profile" ${S.step==="profile"?'aria-current="page"':""}>${USER_ICON}<span>${esc(t("editProfile"))}</span></button>`:""}
   <button id="st-out">${OUT_ICON}<span>${esc(t("backToSignin"))}</span></button></div>`;
 if($("#st-out"))$("#st-out").onclick=()=>{S=fresh();pendingFile=null;render();window.scrollTo({top:0})};
 document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{S.uploadDraft={};pendingFile=null;S.lastResult=null;S.step=b.dataset.nav;render();window.scrollTo({top:0})});
 if(view==="student"){$("#app").innerHTML=renderStudent();bindStudent()}
 else if(R.in){$("#app").innerHTML=renderResearch();bindResearch();$("#ra-out").onclick=()=>{R={email:"",codeSent:false,in:false};setView("student")}}
 else{$("#app").innerHTML=rSigninView();bindRSignin()}
}
render();
