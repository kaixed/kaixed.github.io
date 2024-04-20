const sidebarFn=()=>{const e=document.getElementById("toggle-menu"),t=document.getElementById("sidebar-menus"),o=document.getElementById("menu-mask"),n=document.body,s=e=>{utils.sidebarPaddingR(),n.style.overflow=e?"hidden":"",n.style.paddingRight="",utils[e?"fadeIn":"fadeOut"](o,.5),t.classList[e?"add":"remove"]("open")};e.addEventListener("click",(()=>s(!0))),o.addEventListener("click",(()=>{t.classList.contains("open")&&s(!1)})),window.addEventListener("resize",(()=>{utils.isHidden(e)&&t.classList.contains("open")&&s(!1),sco.refreshWaterFall()}))},scrollFn=function(){const e=window.innerHeight;if(document.body.scrollHeight<=e)return;let t=0;const o=document.getElementById("page-header"),n=utils.throttle((function(e){initThemeColor();const n=window.scrollY||document.documentElement.scrollTop,s=function(e){const o=e>t;return t=e,o}(n);n>0?(s?o.classList.contains("nav-visible")&&o.classList.remove("nav-visible"):o.classList.contains("nav-visible")||o.classList.add("nav-visible"),o.classList.add("nav-fixed")):o.classList.remove("nav-fixed","nav-visible")}),200);window.addEventListener("scroll",(function(e){n(e),0===window.scrollY&&o.classList.remove("nav-fixed","nav-visible")}))},percent=()=>{const e=document.documentElement,t=document.body,o=window.pageYOffset||e.scrollTop,n=Math.max(t.scrollHeight,e.scrollHeight,t.offsetHeight,e.offsetHeight,t.clientHeight,e.clientHeight)-e.clientHeight,s=Math.round(o/n*100),c=document.querySelector("#nav-totop"),i=document.querySelector("#percent"),l=window.scrollY+e.clientHeight>=(document.getElementById("post-comment")||document.getElementById("footer")).offsetTop;c.classList.toggle("long",l||s>90),i.textContent=l||s>90?GLOBAL_CONFIG.lang.backtop:s,document.querySelectorAll(".needEndHide").forEach((e=>e.classList.toggle("hide",n-o<100)))},showTodayCard=()=>{const e=document.getElementById("todayCard"),t=document.querySelector(".topGroup");t?.addEventListener("mouseleave",(()=>e?.classList.remove("hide")))},initObserver=()=>{const e=document.getElementById("post-comment"),t=document.getElementById("pagination"),o=document.querySelector(".comment-barrage");if(e&&t){new IntersectionObserver((e=>{e.forEach((e=>{const n=e.isIntersecting?"add":"remove";t.classList[n]("show-window"),GLOBAL_CONFIG.comment.commentBarrage&&(o.style.bottom=e.isIntersecting?"-200px":"0px")}))})).observe(e)}},addCopyright=()=>{if(!GLOBAL_CONFIG.copyright)return;const{limit:e,author:t,link:o,source:n,info:s}=GLOBAL_CONFIG.copyright;document.body.addEventListener("copy",(c=>{c.preventDefault();const i=window.getSelection().toString(),l=i.length>e?`${i}\n\n${t}\n${o}${window.location.href}\n${n}\n${s}`:i;c.clipboardData.setData("text",l)}))},asideStatus=()=>{const e=utils.saveToLocal.get("aside-status");document.documentElement.classList.toggle("hide-aside","hide"===e)};function initThemeColor(){const e=(window.scrollY||document.documentElement.scrollTop)>0?"--efu-card-bg":PAGE_CONFIG.is_post?"--efu-main":"--efu-background";applyThemeColor(getComputedStyle(document.documentElement).getPropertyValue(e))}function applyThemeColor(e){const t=document.querySelector('meta[name="theme-color"]'),o=document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');t&&o&&window.matchMedia("(display-mode: standalone)").matches&&(t.setAttribute("content",e),o.setAttribute("content",e),document.body.style.backgroundColor=e)}const handleThemeChange=e=>{const t=window.globalFn?.themeChange||{};for(let o in t)t[o](e)};let lastSayHello="",musicPlaying=!1,is_rm="undefined"!=typeof rm,sco={hideCookie:function(){const e=document.getElementById("cookies-window");e&&setTimeout((()=>{e.classList.add("cw-hide"),setTimeout((()=>e.style.display="none"),1e3)}),3e3)},scrollTo:function(e){const t=document.getElementById(e);if(t){const e=t.getBoundingClientRect().top+window.pageYOffset-80;window.scroll({top:e,behavior:"smooth"})}},musicToggle:function(){const e=document.querySelector("#nav-music"),t=document.querySelector("meting-js"),o=document.getElementById("consoleMusic"),n=document.querySelector("#menu-music-toggle span"),s=document.querySelector("#menu-music-toggle i");musicPlaying=!musicPlaying,e.classList.toggle("playing",musicPlaying),o.classList.toggle("on",musicPlaying),musicPlaying?(t.aplayer.play(),rm?.menuItems.music[0]&&(n.textContent=GLOBAL_CONFIG.right_menu.music.stop)&&(s.className="solitude st-pause-fill")):(t.aplayer.pause(),rm?.menuItems.music[0]&&(n.textContent=GLOBAL_CONFIG.right_menu.music.start)&&(s.className="solitude st-play-fill"))},switchCommentBarrage:function(){let e=document.querySelector(".comment-barrage");if(!e)return;const t="flex"===window.getComputedStyle(e).display;e.style.display=t?"none":"flex",document.querySelector("#consoleCommentBarrage").classList.toggle("on",!t),utils.saveToLocal.set("commentBarrageSwitch",!t,.2),rm?.menuItems.barrage&&rm.barrage(t)},switchHideAside:function(){const e=document.documentElement.classList,t=document.querySelector("#consoleHideAside"),o=e.contains("hide-aside");utils.saveToLocal.set("aside-status",o?"show":"hide",1),e.toggle("hide-aside"),t.classList.toggle("on",!o)},switchKeyboard:function(){sco_keyboards=!sco_keyboards;const e=document.querySelector("#consoleKeyboard"),t=sco_keyboards?openKeyboard:closeKeyboard;e.classList.toggle("on",sco_keyboards),t(),localStorage.setItem("keyboard",sco_keyboards),document.getElementById("keyboard-tips")?.classList.remove("show")},initConsoleState:()=>document.documentElement.classList.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on"),changeSayHelloText:function(){const e=GLOBAL_CONFIG.aside.sayhello2,t=document.getElementById("author-info__sayhi");let o;do{o=e[Math.floor(Math.random()*e.length)]}while(o===lastSayHello);t.textContent=o,lastSayHello=o},switchDarkMode:function(){const e="dark"===document.documentElement.getAttribute("data-theme"),t=e?"light":"dark";document.documentElement.setAttribute("data-theme",t),utils.saveToLocal.set("theme",t,.02),utils.snackbarShow(GLOBAL_CONFIG.lang.theme[t],!1,2e3),is_rm&&rm.mode(!e),handleThemeChange(t)},hideTodayCard:()=>document.getElementById("todayCard").classList.add("hide"),toTop:()=>utils.scrollToDest(0),showConsole:()=>document.getElementById("console")?.classList.toggle("show",!0),hideConsole:()=>document.getElementById("console")?.classList.remove("show"),refreshWaterFall:function(){const e=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&(waterfall(e.target)||e.target.classList.add("show"))}))}));document.querySelectorAll(".waterfall").forEach((t=>e.observe(t)))},addRuntime:function(){let e=document.getElementById("runtimeshow");e&&GLOBAL_CONFIG.runtime&&(e.innerText=utils.timeDiff(new Date(GLOBAL_CONFIG.runtime),new Date)+GLOBAL_CONFIG.lang.time.day)},toTalk:function(e){["#wl-edit",".el-textarea__inner","#veditor",".atk-textarea"].forEach((t=>{const o=document.querySelector(t);o&&(o.dispatchEvent(new Event("input",{bubble:!0,cancelable:!0})),o.value="> "+e.replace(/\n/g,"\n> ")+"\n\n",utils.scrollToDest(utils.getEleTop(document.getElementById("post-comment")),300),o.focus(),o.setSelectionRange(-1,-1))})),utils.snackbarShow(GLOBAL_CONFIG.lang.totalk,!1,2e3)},initbbtalk:function(){document.querySelector("#bber-talk")&&new Swiper(".swiper-container",{direction:"vertical",loop:!0,autoplay:{delay:3e3,pauseOnMouseEnter:!0}})},addPhotoFigcaption:function(){document.querySelectorAll("#article-container img").forEach((e=>{const t=e.getAttribute("alt");t&&e.insertAdjacentHTML("afterend",`<div class="img-alt is-center">${t}</div>`)}))},scrollToComment:function(){utils.scrollToDest(utils.getEleTop(document.getElementById("post-comment")),300)},setTimeState:function(){const e=document.getElementById("author-info__sayhi");if(e){const t=(new Date).getHours(),o=GLOBAL_CONFIG.aside.sayhello,n=[{start:0,end:5,text:o.goodnight},{start:6,end:10,text:o.morning},{start:11,end:14,text:o.noon},{start:15,end:18,text:o.afternoon},{start:19,end:24,text:o.night}].find((e=>t>=e.start&&t<=e.end));e.innerText=n.text}},tagPageActive:function(){const e=decodeURIComponent(window.location.pathname);if(/\/tags\/.*?\//.test(e)){const t=e.split("/").slice(-2,-1)[0],o=document.getElementById(t);o&&(document.querySelectorAll("a.select").forEach((e=>{e.classList.remove("select")})),o.classList.add("select"))}},categoriesBarActive:function(){const e=document.querySelector("#category-bar"),t=decodeURIComponent(window.location.pathname),o="/"===t;if(e){e.querySelectorAll(".category-bar-item").forEach((e=>e.classList.remove("select")));const n=o?"category-bar-home":t.split("/").slice(-2,-1)[0],s=document.getElementById(n);s&&s.classList.add("select")}},scrollCategoryBarToRight:function(){const e=document.getElementById("category-bar-items"),t=document.getElementById("category-bar-next");if(e){const o=()=>e.scrollLeft+e.clientWidth>=e.scrollWidth-8,n=()=>{o()?e.scroll({left:0,behavior:"smooth"}):e.scrollBy({left:e.clientWidth,behavior:"smooth"})};e.addEventListener("scroll",(()=>{clearTimeout(this.timeoutId),this.timeoutId=setTimeout((()=>{t.style.transform=o()?"rotate(180deg)":""}),150)})),n()}},openAllTags:()=>{document.querySelectorAll(".card-allinfo .card-tag-cloud").forEach((e=>e.classList.add("all-tags"))),document.getElementById("more-tags-btn")?.remove()},listenToPageInputPress:function(){const e=document.getElementById("toPageText");if(!e)return;const t=document.getElementById("toPageButton"),o=document.querySelectorAll(".page-number"),n=+o[o.length-1].textContent;e&&1!==n&&(e.addEventListener("keydown",(e=>{13===e.keyCode&&(sco.toPage(),pjax.loadUrl(t.href))})),e.addEventListener("input",(()=>{t.classList.toggle("haveValue",""!==e.value&&"0"!==e.value),+e.value>n&&(e.value=n)})))},addNavBackgroundInit:function(){0!==document.documentElement.scrollTop&&document.getElementById("page-header").classList.add("nav-fixed","nav-visible");const e=document.getElementById("cookies-window");e&&(e.style.display="none")},topPostScroll:function(){if(document.getElementById("recent-post-top")){let e=document.getElementById("recent-post-top");e.addEventListener("mousewheel",(function(t){e.scrollLeft+=-t.wheelDelta/2,document.body.clientWidth<1200&&t.preventDefault()}),{passive:!1})}},initAdjust:function(){const e=document.getElementById("site-name"),t=document.querySelector("#menus .menus_items"),o=document.querySelector("#search-button"),n=document.getElementById("nav"),s=e&&e.offsetWidth,c=t&&t.offsetWidth,i=o&&o.offsetWidth;window.innerWidth<768||s+c+i>n?.offsetWidth-120?n?.classList.add("hide-menu"):n?.classList.remove("hide-menu"),n?.classList.add("show")},toPage:function(){const e=document.querySelectorAll(".page-number"),t=parseInt(e[e.length-1].innerHTML),o=document.getElementById("toPageText"),n=parseInt(o.value);document.getElementById("toPageButton").href=!isNaN(n)&&n<=t&&n>1?window.location.href.replace(/\/page\/\d+\/$/,"/")+"page/"+n+"/":"/"},owoBig(e){let t=document.getElementById("owo-big");t||(t=document.createElement("div"),t.id="owo-big",document.body.appendChild(t));const o=e=>{const o=e.getBoundingClientRect();t.style.left=o.left-t.offsetWidth/4+"px",t.style.top=`${o.top}px`};document.addEventListener("mouseover",(n=>{const s=n.target,c=s.closest(e.item);if(c&&s.closest(e.body)){const e=c.querySelector("img")?.src;e&&(t.innerHTML=`<img src="${e}" style="max-width: 100%; height: auto;">`,t.style.display="block",o(c))}})),document.addEventListener("mouseout",(o=>{o.target.closest(e.item)&&o.target.closest(e.body)&&(t.style.display="none")}))},changeTimeFormat(e){e.forEach((e=>{const t=e.getAttribute("datetime");e.textContent=utils.diffDate(t,!0),e.style.display="inline"}))},switchComments(){const e=document.getElementById("switch-btn");if(!e)return;let t=!1;const o=document.getElementById("post-comment");utils.addEventListenerPjax(e,"click",(()=>{o.classList.toggle("move"),t||"function"!=typeof loadTwoComment||(t=!0,loadTwoComment())}))}};const addHighlight=()=>{const e=GLOBAL_CONFIG.highlight;if(!e)return;const{copy:t,expand:o,limit:n,syntax:s}=e,c="prismjs"===s,i=e.enable||t||o||n,l=!0==!o?"closed":"",a="highlight.js"===s?document.querySelectorAll("figure.highlight"):document.querySelectorAll('pre[class*="language-"]');if(!i&&!n||!a.length)return;const d=t?'<i class="solitude st-copy-fill copy-button"></i>':"<i></i>",r=n?'<i class="solitude st-show-line"></i>':"<i></i>",m=e=>{const t=e.parentNode;t.classList.add("copy-true");const o=window.getSelection(),n=document.createRange(),s=c?"pre code":"table .code pre";var i;n.selectNodeContents(t.querySelectorAll(`${s}`)[0]),o.removeAllRanges(),o.addRange(n),document.execCommand("copy"),e.lastChild,i=GLOBAL_CONFIG.lang.copy.success,utils.snackbarShow(i,!1,2e3),o.removeAllRanges(),t.classList.remove("copy-true")},u=function(){this.classList.toggle("expand-done")},g=function(e){const t=e.target.classList;t.contains("expand")?(e=>{e.classList.toggle("closed")})(this):t.contains("copy-button")&&m(this)},h=(e,t,o)=>{const s=document.createDocumentFragment();if(i){const t=document.createElement("div");t.className=`highlight-tools ${l}`,t.innerHTML='<i class="solitude st-arrow-down expand"></i>'+e+d,utils.addEventListenerPjax(t,"click",g),s.appendChild(t)}if(n&&t.offsetHeight>n+30){const e=document.createElement("div");e.className="code-expand-btn",e.innerHTML=r,utils.addEventListenerPjax(e,"click",u),s.appendChild(e)}"hl"===o?t.insertBefore(s,t.firstChild):t.parentNode.insertBefore(s,t)};c?a.forEach((e=>{const t=`<div class="code-lang">${e.getAttribute("data-language")||"Code"}</div>`;utils.wrap(e,"figure",{class:"highlight"}),h(t,e)})):a.forEach((e=>{let t=e.getAttribute("class").split(" ")[1];"plain"!==t&&void 0!==t||(t="Code");h(`<div class="code-lang">${t}</div>`,e,"hl")}))};class toc{static init(){const e=document.getElementById("card-toc");if(!e||!e.querySelector(".toc a"))return void(e.style.display="none");const t=document.querySelectorAll(".toc a");t.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),utils.scrollToDest(utils.getEleTop(document.getElementById(decodeURI(("toc-text"===e.target.className?e.target.parentNode.hash:e.target.hash).replace("#","")))),300)}))})),this.active(t)}static active(e){const t=document.getElementById("article-container"),o=document.getElementById("toc-content"),n=t.querySelectorAll("h1,h2,h3,h4,h5,h6");let s="";function c(t){if(0===t)return!1;let c="";if(n.forEach((function(e,o){t>utils.getEleTop(e)-80&&(c=o)})),s===c)return;s=c,document.querySelectorAll(".toc .active").forEach((e=>{e.classList.remove("active")}));const i=e[s];if(i){let t=e[s].parentNode;for(i.classList.add("active"),function(e){const t=e.getBoundingClientRect().top,n=o.scrollTop;t>document.documentElement.clientHeight-100&&(o.scrollTop=n+150),t<100&&(o.scrollTop=n-150)}(i);!t.matches(".toc");t=t.parentNode)t.matches("li")&&t.classList.add("active")}}window.tocScrollFn=utils.throttle((function(){c(window.scrollY||document.documentElement.scrollTop)}),100),window.addEventListener("scroll",tocScrollFn)}}class tabs{static init(){this.clickFnOfTabs(),this.backToTop()}static clickFnOfTabs(){document.querySelectorAll("#article-container .tab > button").forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.parentNode;if(!t.classList.contains("active")){const o=t.parentNode.nextElementSibling,n=t.parentNode.querySelector(".active");n&&n.classList.remove("active"),t.classList.add("active");const s=e.target.getAttribute("data-href").replace("#","");Array.from(o.children).forEach((e=>{e.id===s?e.classList.add("active"):e.classList.remove("active")}))}}))}))}static backToTop(){document.querySelectorAll("#article-container .tabs .tab-to-top").forEach((e=>{e.addEventListener("click",(()=>{utils.scrollToDest(utils.getEleTop(e.closest(".tabs")),300)}))}))}}window.refreshFn=()=>{const{is_home:e,is_page:t,page:o,is_post:n}=PAGE_CONFIG,{runtime:s,lazyload:c,lightbox:i,randomlink:l,covercolor:a,post_ai:d}=GLOBAL_CONFIG,r=e||t?"#recent-posts time, .webinfo-item time":"#post-meta time";document.body.setAttribute("data-type",o),sco.changeTimeFormat(document.querySelectorAll(r)),s&&sco.addRuntime(),[scrollFn,sidebarFn,sco.hideCookie,sco.addPhotoFigcaption,sco.setTimeState,sco.tagPageActive,sco.categoriesBarActive,sco.listenToPageInputPress,sco.addNavBackgroundInit,sco.refreshWaterFall].forEach((e=>e())),c.enable&&utils.lazyloadImg(),i&&utils.lightbox(document.querySelectorAll("#article-container img:not(.flink-avatar,.gallery-group img)")),l&&randomLinksList(),d&&n&&efu_ai.init(),sco.switchComments(),sco.topPostScroll(),initObserver(),e&&showTodayCard(),(n||t)&&(addHighlight(),tabs.init()),a.enable&&coverColor(),PAGE_CONFIG.toc&&toc.init()},document.addEventListener("DOMContentLoaded",(()=>{[sco.initAdjust,addCopyright,sco.initConsoleState,window.refreshFn,asideStatus,()=>window.onscroll=percent].forEach((e=>e()))})),window.onkeydown=e=>{const{keyCode:t,ctrlKey:o,shiftKey:n}=e;(123===t||o&&n&&67===t)&&utils.snackbarShow(GLOBAL_CONFIG.lang.f12,!1,3e3),27===t&&sco.hideConsole()},document.addEventListener("copy",(()=>utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success,!1,3e3)));