// Questions: wording in three languages, answer type and option lists.

let questions=[
 {id:"q_year",scope:"Profile",retired:false,text:{he:"באיזו שנה בתואר אתם לומדים?",ar:"في أي سنة من دراستك أنت؟",en:"Which year of your degree are you in?"}},
 {id:"q_faculty",scope:"Profile",retired:false,text:{he:"מהי הפקולטה העיקרית שלכם?",ar:"ما هي كليتك الرئيسية؟",en:"What is your main faculty?"}},
 {id:"q_gpa",scope:"Profile",retired:false,text:{he:"מהו הממוצע המצטבר שלכם? (אם אין עדיין, הזינו 0)",ar:"ما هو معدلك التراكمي حتى الآن؟ (إن لم يكن لديك بعد، أدخل 0)",en:"What is your GPA so far? (enter 0 if none yet)"}},
 {id:"q_prev",scope:"Profile",retired:false,text:{he:"האם השתתפתם במחקר שלנו בעבר?",ar:"هل شاركت في بحثنا من قبل؟",en:"Have you taken part in our study before?"}},
 {id:"q_course",scope:"Each upload",retired:false,text:{he:"באיזה קורס השתמשתם בכלי הבינה המלאכותית?",ar:"في أي مساق استخدمت أداة الذكاء الاصطناعي؟",en:"Which course did you use the AI tool for?"}},
 {id:"q_tool",scope:"Each upload",retired:false,text:{he:"באיזה כלי בינה מלאכותית השתמשתם בשיחה הזו?",ar:"أي أداة ذكاء اصطناعي استخدمت في هذه المحادثة؟",en:"Which AI tool did you use in this conversation?"}},
 {id:"q_moed",scope:"Each upload",retired:false,text:{he:"לאיזה מועד שייך הקובץ?",ar:"لأي موعد امتحان يعود هذا الملف؟",en:"Which exam period is this file for?"}},
 {id:"q_reason",scope:"Each upload",retired:false,text:{he:"אם זה מועד ב׳, למה ניגשתם אליו?",ar:"إذا كان موعد ب، لماذا تقدّمت له؟",en:"If Moed B, why did you take it?"}},
 {id:"q_purpose",scope:"Each upload",retired:false,text:{he:"לאיזו מטרה השתמשתם בשיחה?",ar:"لأي غرض استخدمت المحادثة؟",en:"What did you use the conversation for?"}},
];
const CORE_TYPES={q_year:"choice",q_faculty:"choice",q_gpa:"number",q_prev:"choice",q_course:"course",q_tool:"choice",q_moed:"choice",q_purpose:"choice",q_reason:"choice"};
const CORE_LISTS={q_year:YEARS,q_faculty:FACULTIES,q_prev:["Yes","No"],q_tool:TOOLS,q_moed:["Moed A","Moed B"],q_purpose:PURPOSES,q_reason:REASONS};
const LOCKED={q_purpose:["Exam prep","Assignment"],q_moed:["Moed A","Moed B"],q_reason:["Other"],q_year:["Other"],q_faculty:["Other"],q_tool:["Other"]};
let qSeq=0,optSeq=0;
questions.forEach(x=>{x.core=true;x.required=true;x.type=CORE_TYPES[x.id];x.opts=(CORE_LISTS[x.id]||[]).map(v=>({v,he:(LBL.he[v]||v),ar:(LBL.ar[v]||v),en:v,locked:(LOCKED[x.id]||[]).includes(v)}))});
const qById=id=>questions.find(x=>x.id===id);
const q=id=>questions.find(x=>x.id===id).text[lang];
