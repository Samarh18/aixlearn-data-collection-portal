// Contact box and copy-to-clipboard.

const contactHtml=()=>`<div class="note contact"><span>${esc(t("contactQ"))}</span><bdi dir="ltr" id="contact-addr" style="user-select:all;font-weight:500">${CONTACT}</bdi><button class="iconbtn" data-copy aria-label="${esc(t("copy"))}" title="${esc(t("copy"))}">${COPY_ICON}</button></div>`;
function copyText(text,node,msg){const sel=()=>{const r=document.createRange();r.selectNodeContents(node);const g=getSelection();g.removeAllRanges();g.addRange(r)};
 try{navigator.clipboard.writeText(text).then(()=>toast(msg),sel)}catch(e){sel()}}
function bindCopy(){document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=()=>copyText(CONTACT,$("#contact-addr"),t("copied")));
 const cp=$("#copy-prompt");if(cp)cp.onclick=()=>copyText(PROMPT,$("#prompt-text"),t("promptCopied"))}
