// Email and file checks.

function isTechnion(e){return /^[^\s@]+@([a-z0-9-]+\.)*technion\.ac\.il$/i.test(e.trim())}
// Mirrors the Qualtrics validator: hard-fail only on wrong type, bad encoding, or no clear markers.
function validate(name,text){
 if(!/\.txt$/i.test(name))return{ok:false,key:"vNotTxt"};
 if(text.includes("\uFFFD"))return{ok:false,key:"vEnc"};
 if(!text.trim())return{ok:false,key:"vEmpty"};
 if(/<<<USER_TURN>>>/.test(text)&&/<<<LLM_TURN>>>/.test(text))return{ok:true,turns:(text.match(/<<<(USER|LLM)_TURN>>>/g)||[]).length};
 if(/###USER###/.test(text)&&/###LLM###/.test(text))return{ok:true,turns:(text.match(/###(USER|LLM)###/g)||[]).length};
 const counts={};text.split(/\r?\n/).forEach(l=>{const m=l.match(/^\s*([^\s:][^:\n]{0,24}?)\s*:/);if(m){const k=m[1].trim().toLowerCase();counts[k]=(counts[k]||0)+1}});
 const labels=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
 if(labels.length<2)return{ok:false,key:"vMarkers"};
 return{ok:true,turns:labels[0][1]+labels[1][1]};
}
