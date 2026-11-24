// MOCK DATA: seeded random participants. Mock names only.

const FIRST=["Samar","Student B","Student C","Student D","Student E","Student F","Student G","Student H","Student I","Student J","Student K","Student L","Student M","Student N"];
const LAST=["Test","Mock","Mock","Mock","Mock","Mock","Mock","Mock","Mock","Mock","Mock","Mock","Mock","Mock"];
function rng(seed){return()=>{seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296}}
const r=rng(7);
const pick=a=>a[Math.floor(r()*a.length)];
let participants=FIRST.map((f,i)=>({
 pid:"P"+String(1001+i),
 first:f,last:LAST[i],
 email:(f+"."+LAST[i]).toLowerCase().replace(/[^a-z.]/g,"")+"@campus.technion.ac.il",
 idnum:String(i+1).padStart(9,"0"),
 faculty:pick(FACULTIES.slice(0,12)),year:pick(YEARS.slice(0,5)),gpa:(70+Math.floor(r()*25)),
 consentGrades:r()>.1,recontact:r()>.35,withdrawn:i===9,joined:i<4?"R0":"R1"
}));
