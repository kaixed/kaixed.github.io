const utils={saveToLocal:{set:function(e,t,n){if(0===n)return;const o=864e5*n,a={value:t,expiry:(new Date).getTime()+o};localStorage.setItem(e,JSON.stringify(a))},get:function(e){const t=localStorage.getItem(e);if(!t)return;const n=JSON.parse(t);if(!((new Date).getTime()>n.expiry))return n.value;localStorage.removeItem(e)}},debounce:function(e,t,n){let o;return function(){const a=this,i=arguments,s=n&&!o;clearTimeout(o),o=setTimeout((function(){o=null,n||e.apply(a,i)}),t),s&&e.apply(a,i)}},throttle:function(e,t,n){let o,a,i,s=0;n||(n={});const r=function(){s=!1===n.leading?0:(new Date).getTime(),e.apply(a,i),a=i=null};return function(){const l=(new Date).getTime();s||!1!==n.leading||(s=l);const c=t-(l-s);a=this,i=arguments,c<=0||c>t?(o&&(clearTimeout(o),o=null),s=l,e.apply(a,i),o||(a=i=null)):o||!1===n.trailing||(o=setTimeout(r,c))}},fadeIn:(e,t)=>{e.style.cssText=`display:block;animation: to_show ${t}s`},fadeOut:(e,t)=>{e.addEventListener("animationend",(function t(){e.style.cssText="display: none; animation: '' ",e.removeEventListener("animationend",t)})),e.style.animation=`to_hide ${t}s`},sidebarPaddingR:()=>{const e=window.innerWidth,t=document.body.clientWidth,n=e-t;e!==t&&(document.body.style.paddingRight=n+"px")},snackbarShow:(e,t,n)=>{const o=void 0!==t&&t,a=void 0!==n?n:5e3;document.styleSheets[0].addRule(":root","--efu-snackbar-time:"+a+"ms!important"),Snackbar.show({text:e,showAction:o,duration:a,pos:"top-center"})},copy:async e=>{try{await navigator.clipboard.writeText(e),utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success,!1,2e3)}catch(e){utils.snackbarShow(GLOBAL_CONFIG.lang.copy.error,!1,2e3)}},getEleTop:e=>{let t=0;for(;e;)t+=e.offsetTop,e=e.offsetParent;return t},randomNum:e=>Math.floor(Math.random()*e),timeDiff:(e,t)=>{const n=t.getTime()-e.getTime();return Math.floor(n/864e5)},scrollToDest:(e,t=500)=>{const n=window.pageYOffset,o=document.getElementById("page-header").classList.contains("nav-fixed");if((n>e||o)&&(e-=70),"scrollBehavior"in document.documentElement.style)return void window.scrollTo({top:e,behavior:"smooth"});let a=null;const i=e-n;window.requestAnimationFrame((function o(s){a=a||s;const r=s-a;r<t?(window.scrollTo(0,n+i*r/t),window.requestAnimationFrame(o)):window.scrollTo(0,e)}))},siblings:(e,t)=>[...e.parentNode.children].filter((n=>t?n!==e&&n.matches(t):n!==e)),isMobile:()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isHidden:e=>0===e.offsetHeight&&0===e.offsetWidth,addEventListenerPjax:(e,t,n,o=!1)=>{e.addEventListener(t,n,o),utils.addGlobalFn("pjax",(()=>{e.removeEventListener(t,n,o)}))},addGlobalFn:(e,t,n=!1,o=window)=>{const a=o.globalFn||{},i=a[e]||{};n&&i[n]||(i[n=n||Object.keys(i).length]=t,a[e]=i,o.globalFn=a)},animateIn:(e,t)=>{e.style.display="block",e.style.animation=t},animateOut:(e,t)=>{e.addEventListener("animationend",(function t(){e.style.display="",e.style.animation="",e.removeEventListener("animationend",t)})),e.style.animation=t},wrap:(e,t,n)=>{const o=document.createElement(t);for(const[e,t]of Object.entries(n))o.setAttribute(e,t);e.parentNode.insertBefore(o,e),o.appendChild(e)},lazyloadImg:function(){window.lazyLoadInstance=new LazyLoad({elements_selector:"img",threshold:0,data_src:"lazy-src",callback_error:e=>{e.setAttribute("src",GLOBAL_CONFIG.lazyload.error)}})},lightbox:function(e){const t=GLOBAL_CONFIG.lightbox;"mediumZoom"===t&&mediumZoom&&mediumZoom(e,{background:"var(--efu-card-bg)"}),"fancybox"===t&&(e.forEach((e=>{if("A"!==e.parentNode.tagName){const t=e.dataset.lazySrc||e.src,n=e.title||e.alt||"";utils.wrap(e,"a",{class:"fancybox",href:t,"data-fancybox":"gallery","data-caption":n,"data-thumb":t})}})),window.fancyboxRun||(Fancybox.bind("[data-fancybox]",{Hash:!1,Thumbs:{showOnStart:!1},Images:{Panzoom:{maxScale:4}},Carousel:{transition:"slide"},Toolbar:{display:{left:["infobar"],middle:["zoomIn","zoomOut","toggle1to1","rotateCCW","rotateCW","flipX","flipY"],right:["slideshow","thumbs","close"]}}}),window.fancyboxRun=!0))},diffDate:(e,t=!1)=>{const n=new Date,o=new Date(e),a=n.getTime()-o.getTime(),i=36e5,s=24*i,r=30*s,{time:l}=GLOBAL_CONFIG.lang;if(!t)return parseInt(a/s);const c=a/r,d=a/s,m=a/i,u=a/6e4;return c>12?o.toISOString().slice(0,10):c>=1?`${parseInt(c)} ${l.month}`:d>=1?`${parseInt(d)} ${l.day}`:m>=1?`${parseInt(m)} ${l.hour}`:u>=1?`${parseInt(u)} ${l.min}`:l.just},loadComment:(e,t)=>{if("IntersectionObserver"in window){const n=new IntersectionObserver((e=>{e[0].isIntersecting&&(t(),n.disconnect())}),{threshold:[0]});n.observe(e)}else t()},getCSS:(e,t=!1)=>new Promise(((n,o)=>{const a=document.createElement("link");a.rel="stylesheet",a.href=e,t&&(a.id=t),a.onerror=o,a.onload=a.onreadystatechange=function(){const e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(a.onload=a.onreadystatechange=null,n())},document.head.appendChild(a)})),getScript:(e,t={})=>new Promise(((n,o)=>{const a=document.createElement("script");a.src=e,a.async=!0,a.onerror=o,a.onload=a.onreadystatechange=function(){const e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(a.onload=a.onreadystatechange=null,n())},Object.keys(t).forEach((e=>{a.setAttribute(e,t[e])})),document.head.appendChild(a)}))};