// Researcher dashboard shell: tabs and per-tab wiring.

const TABS=[["overview","Overview"],["participants","Participants"],["submissions","Submissions"],["courses","Courses & rounds"],["questions","Questions"],["lottery","Lottery & recontact"]];
function renderResearch(){
 return `<h1 class="dash-title">Researcher dashboard</h1>
  <div class="tabs" role="tablist">${TABS.map(([k,l])=>`<button role="tab" data-tab="${k}" aria-selected="${tab===k}">${l}</button>`).join("")}</div>
  <div>${({overview:ovView,participants:partView,submissions:subView,courses:courseView,questions:qView,lottery:lotView})[tab]()}</div>`;
}
function bindResearch(){
 document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;preview=null;render()});
 const today=new Date().toISOString().slice(0,10);
 document.querySelectorAll("[data-csv]").forEach(b=>b.onclick=()=>downloadCsv(`aixlearn_${b.dataset.csv}_${today}.csv`,csv(b.dataset.csv)));
 const bindTab={participants:bindParticipants,submissions:bindSubmissions,courses:bindCourses,questions:bindQuestions,lottery:bindLottery}[tab];
 if(bindTab)bindTab();
}
