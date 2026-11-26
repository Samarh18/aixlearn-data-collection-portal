// Student side: picks the view for S.step.

function renderStudent(){
 if(S.step==="landing")return landingView();
 if(S.step==="signin")return signinView();
 if(S.step==="register"||S.step==="profile")return registerView();
 return homeView();
}
function bindStudent(){
 bindCopy();bindSelects();markRequired();
 if(S.step==="landing")bindLanding();
 else if(S.step==="signin")bindSignin();
 else if(S.step==="register"||S.step==="profile")bindRegister();
 else if(S.step==="home")bindHome();
}
