// Mutable app state.

let view="student";
const fresh=()=>({step:"landing",email:"",codeSent:false,me:null,lastResult:null,uploadDraft:{}});
let S=fresh();
let tab="overview";let preview=null;let revealed={};let winners=[];let pendingFile=null;
let R={email:"",codeSent:false,in:false};
