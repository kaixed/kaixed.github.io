var selectTextNow="";let selectText=()=>selectTextNow=document.selection?document.selection.createRange().text:window.getSelection()+""||"";document.onmouseup=document.ondbclick=selectText;const rm={mask:document.getElementById("rightmenu-mask"),menu:document.getElementById("rightMenu"),width:document.querySelector("#rightMenu").offsetWidth,height:document.querySelector("#rightMenu").offsetHeight,domhref:"",domsrc:"",globalEvent:null,menuItems:{other:document.getElementsByClassName("rightMenuOther"),plugin:document.getElementsByClassName("rightMenuPlugin"),back:document.getElementById("menu-backward"),forward:document.getElementById("menu-forward"),refresh:document.getElementById("menu-refresh"),top:document.getElementById("menu-top"),copy:document.getElementById("menu-copytext"),paste:document.getElementById("menu-pastetext"),comment:document.getElementById("menu-commenttext"),new:document.getElementById("menu-newwindow"),copyLink:document.getElementById("menu-copylink"),copyImg:document.getElementById("menu-copyimg"),downloadImg:document.getElementById("menu-downloadimg"),search:document.getElementById("menu-search"),barrage:document.getElementById("menu-commentBarrage"),mode:document.getElementById("menu-darkmode"),translate:document.getElementById("menu-translate"),music:[toggle=document.getElementById("menu-music-toggle"),back=document.getElementById("menu-music-back"),forward=document.getElementById("menu-music-forward"),copyMusicName=document.getElementById("menu-music-copyMusicName")]},showRightMenu:(e,t=0,m=0)=>{rm.menu.style.top=m+"px",rm.menu.style.left=t+"px",rm.menu.style.display=e?"block":"none",e?stopMaskScroll():rm.mask.style.display="none"},hideRightMenu:()=>{rm.showRightMenu(!1),rm.mask.style.display="none"},reLoadSize:()=>{rm.menu.style.display="block",rm.width=rm.menu.offsetWidth,rm.height=rm.menu.offsetHeight,rm.menu.style.display="none"},copyText:e=>{navigator.clipboard&&navigator.clipboard.writeText(e),utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success,!1,2e3),rm.hideRightMenu()},pasteText:()=>rm.readClipboard(),readClipboard:()=>navigator.clipboard&&navigator.clipboard.readText().then((e=>rm.insertAtCaret(rm.globalEvent.target,e))),insertAtCaret:(e,t)=>{const m=e.selectionStart,n=e.selectionEnd;if(document.selection)e.focus(),document.selection.createRange().text=t,e.focus();else if(m||"0"===m){let r=e.scrollTop;e.value=e.value.substring(0,m)+t+e.value.substring(n,e.value.length),e.focus(),e.selectionStart=m+t.length,e.selectionEnd=m+t.length,e.scrollTop=r}else e.value+=t,e.focus()},downloadImage:async function(e=rm.domsrc,t="photo"){try{const m=await fetch(e),n=await m.blob(),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=t||"image.jpg",o.style.display="none",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r)}catch(e){utils.snackbarShow(GLOBAL_CONFIG.right_menu.img_error,!1,2e3)}},copyImage:async function(e=this.domsrc){try{const t=await fetch(e),m=await t.blob(),n=new ClipboardItem({"image/png":m});await navigator.clipboard.write([n]),utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success,!1,3e3)}catch(e){utils.snackbarShow(GLOBAL_CONFIG.right_menu.img_error,!1,2e3)}},mode:e=>(document.querySelector(".menu-darkmode-text").textContent=e?GLOBAL_CONFIG.right_menu.mode.light:GLOBAL_CONFIG.right_menu.mode.dark)&&rm.hideRightMenu(),barrage:e=>(document.querySelector(".menu-commentBarrage-text").textContent=e?GLOBAL_CONFIG.right_menu.barrage.open:GLOBAL_CONFIG.right_menu.barrage.close)&&rm.hideRightMenu()};function stopMaskScroll(){utils.addEventListenerPjax(rm.menu,"mousewheel",rm.hideRightMenu),utils.addEventListenerPjax(rm.mask,"mousewheel",rm.hideRightMenu),utils.addEventListenerPjax(rm.mask,"click",rm.hideRightMenu)}window.oncontextmenu=e=>{if(document.body.clientWidth<=768)return;let t=e.clientX+10,m=e.clientY;Array.from(rm.menuItems.other).forEach((e=>e.style.display="block")),rm.globalEvent=e;let n=!1,r=e.target.href,o=e.target.currentSrc;selectTextNow&&window.getSelection()?(n=!0,rm.menuItems.copy.style.display="block",GLOBAL_CONFIG.comment&&(rm.menuItems.comment.style.display="block"),rm.menuItems.search&&(rm.menuItems.search.style.display="block")):(rm.menuItems.copy.style.display="none",GLOBAL_CONFIG.comment&&(rm.menuItems.comment.style.display="none"),rm.menuItems.search&&(rm.menuItems.search.style.display="none")),r?(n=!0,rm.menuItems.new.style.display="block",rm.menuItems.copyLink.style.display="block",rm.domhref=r):(rm.menuItems.new.style.display="none",rm.menuItems.copyLink.style.display="none"),o?(n=!0,rm.menuItems.copyImg.style.display="block",rm.menuItems.downloadImg.style.display="block",rm.domsrc=o):(rm.menuItems.copyImg.style.display="none",rm.menuItems.downloadImg.style.display="none");let s=e.target.tagName.toLowerCase();return"input"===s||"textarea"===s?(n=!0,rm.menuItems.paste.style.display="block"):rm.menuItems.paste.style.display="none","meting-js"===s?(n=!0,rm.menuItems.music.forEach((e=>e.style.display="block"))):rm.menuItems.music[0]&&rm.menuItems.music.forEach((e=>e.style.display="none")),Array.from(n?rm.menuItems.other:rm.menuItems.plugin).forEach((e=>e.style.display="none")),Array.from(n?rm.menuItems.plugin:rm.menuItems.other).forEach((e=>e.style.display="block")),rm.reLoadSize(),t+rm.width>window.innerWidth&&(t-=rm.width+10),m+rm.height>window.innerHeight&&(m-=m+rm.height-window.innerHeight),rm.mask.style.display="flex",rm.showRightMenu(!0,t,m),!1},rm.menuItems.back.addEventListener("click",(()=>window.history.back()||rm.hideRightMenu())),rm.menuItems.forward.addEventListener("click",(()=>window.history.forward()||rm.hideRightMenu())),rm.menuItems.refresh.addEventListener("click",(()=>window.location.reload())),rm.menuItems.top.addEventListener("click",(()=>sco.toTop()||rm.hideRightMenu())),GLOBAL_CONFIG.right_menu.music&&(rm.menuItems.music[0].addEventListener("click",(()=>{sco.musicToggle(),rm.hideRightMenu()})),rm.menuItems.music[1].addEventListener("click",(()=>{document.querySelector("meting-js").aplayer.skipBack(),rm.hideRightMenu()})),rm.menuItems.music[2].addEventListener("click",(()=>{document.querySelector("meting-js").aplayer.skipForward(),rm.hideRightMenu()})),rm.menuItems.music[3].addEventListener("click",(()=>{const e=Array.from(document.querySelectorAll(".aplayer-title")).map((e=>e.innerText))[0];rm.copyText(e)}))),rm.menuItems.copy.addEventListener("click",(()=>{if(GLOBAL_CONFIG.copyright){const{limit:e,author:t,link:m,source:n,info:r}=GLOBAL_CONFIG.copyright;selectTextNow.length>e&&(selectTextNow=`${selectTextNow}\n\n${t}\n${m}${window.location.href}\n${n}\n${r}`)}rm.copyText(selectTextNow),rm.hideRightMenu()})),null!==utils.saveToLocal.get("commentBarrageSwitch")&&rm.menuItems.barrage&&rm.barrage(!utils.saveToLocal.get("commentBarrageSwitch")),rm.menuItems.paste.addEventListener("click",(()=>rm.pasteText()&&rm.hideRightMenu())),GLOBAL_CONFIG.comment&&rm.menuItems.comment.addEventListener("click",(()=>rm.hideRightMenu()||sco.toTalk(selectTextNow))),rm.menuItems.new.addEventListener("click",(()=>window.open(rm.domhref)&&rm.hideRightMenu())),rm.menuItems.downloadImg.addEventListener("click",(()=>rm.downloadImage()&&rm.hideRightMenu())),rm.menuItems.copyImg.addEventListener("click",(()=>rm.copyImage()&&rm.hideRightMenu())),is_rm=!0;