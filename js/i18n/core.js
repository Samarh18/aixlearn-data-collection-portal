// Language state and the t() lookup. Strings live in he.js, ar.js and en.js.

const LANGS={he:{dir:"rtl",label:"עברית"},ar:{dir:"rtl",label:"العربية"},en:{dir:"ltr",label:"English"}};
let lang="he";
const T={};
const t=(k,p={})=>String(T[lang][k]??T.en[k]??k).replace(/\{(\w+)\}/g,(_,x)=>p[x]??"");
const tp=n=>T[lang].tickets(n);
const listJoin=a=>a.join(lang==="ar"?"، ":", ");
