import{g as T,$ as I,n as H,S as q,a as j}from"./swiper.min.7c38d4f8.js";import{d as G,B as N,o as _,k as z,j as P,c as A,F as R,b as X,e as D,A as Y,_ as U}from"./index.6ad1a6eb.js";function V(a,$,i,u){const t=T();return a.params.createElements&&Object.keys(u).forEach(d=>{if(!i[d]&&i.auto===!0){let r=a.$el.children(`.${u[d]}`)[0];r||(r=t.createElement("div"),r.className=u[d],a.$el.append(r)),i[d]=r,$[d]=r}}),i}function k(a=""){return`.${a.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function W({swiper:a,extendParams:$,on:i,emit:u}){const t="swiper-pagination";$({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:l=>l,formatFractionTotal:l=>l,bulletClass:`${t}-bullet`,bulletActiveClass:`${t}-bullet-active`,modifierClass:`${t}-`,currentClass:`${t}-current`,totalClass:`${t}-total`,hiddenClass:`${t}-hidden`,progressbarFillClass:`${t}-progressbar-fill`,progressbarOppositeClass:`${t}-progressbar-opposite`,clickableClass:`${t}-clickable`,lockClass:`${t}-lock`,horizontalClass:`${t}-horizontal`,verticalClass:`${t}-vertical`,paginationDisabledClass:`${t}-disabled`}}),a.pagination={el:null,$el:null,bullets:[]};let d,r=0;function f(){return!a.params.pagination.el||!a.pagination.el||!a.pagination.$el||a.pagination.$el.length===0}function m(l,e){const{bulletActiveClass:n}=a.params.pagination;l[e]().addClass(`${n}-${e}`)[e]().addClass(`${n}-${e}-${e}`)}function p(){const l=a.rtl,e=a.params.pagination;if(f())return;const n=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,s=a.pagination.$el;let o;const g=a.params.loop?Math.ceil((n-a.loopedSlides*2)/a.params.slidesPerGroup):a.snapGrid.length;if(a.params.loop?(o=Math.ceil((a.activeIndex-a.loopedSlides)/a.params.slidesPerGroup),o>n-1-a.loopedSlides*2&&(o-=n-a.loopedSlides*2),o>g-1&&(o-=g),o<0&&a.params.paginationType!=="bullets"&&(o=g+o)):typeof a.snapIndex<"u"?o=a.snapIndex:o=a.activeIndex||0,e.type==="bullets"&&a.pagination.bullets&&a.pagination.bullets.length>0){const c=a.pagination.bullets;let y,v,O;if(e.dynamicBullets&&(d=c.eq(0)[a.isHorizontal()?"outerWidth":"outerHeight"](!0),s.css(a.isHorizontal()?"width":"height",`${d*(e.dynamicMainBullets+4)}px`),e.dynamicMainBullets>1&&a.previousIndex!==void 0&&(r+=o-(a.previousIndex-a.loopedSlides||0),r>e.dynamicMainBullets-1?r=e.dynamicMainBullets-1:r<0&&(r=0)),y=Math.max(o-r,0),v=y+(Math.min(c.length,e.dynamicMainBullets)-1),O=(v+y)/2),c.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map(x=>`${e.bulletActiveClass}${x}`).join(" ")),s.length>1)c.each(x=>{const h=I(x),b=h.index();b===o&&h.addClass(e.bulletActiveClass),e.dynamicBullets&&(b>=y&&b<=v&&h.addClass(`${e.bulletActiveClass}-main`),b===y&&m(h,"prev"),b===v&&m(h,"next"))});else{const x=c.eq(o),h=x.index();if(x.addClass(e.bulletActiveClass),e.dynamicBullets){const b=c.eq(y),L=c.eq(v);for(let E=y;E<=v;E+=1)c.eq(E).addClass(`${e.bulletActiveClass}-main`);if(a.params.loop)if(h>=c.length){for(let E=e.dynamicMainBullets;E>=0;E-=1)c.eq(c.length-E).addClass(`${e.bulletActiveClass}-main`);c.eq(c.length-e.dynamicMainBullets-1).addClass(`${e.bulletActiveClass}-prev`)}else m(b,"prev"),m(L,"next");else m(b,"prev"),m(L,"next")}}if(e.dynamicBullets){const x=Math.min(c.length,e.dynamicMainBullets+4),h=(d*x-d)/2-O*d,b=l?"right":"left";c.css(a.isHorizontal()?b:"top",`${h}px`)}}if(e.type==="fraction"&&(s.find(k(e.currentClass)).text(e.formatFractionCurrent(o+1)),s.find(k(e.totalClass)).text(e.formatFractionTotal(g))),e.type==="progressbar"){let c;e.progressbarOpposite?c=a.isHorizontal()?"vertical":"horizontal":c=a.isHorizontal()?"horizontal":"vertical";const y=(o+1)/g;let v=1,O=1;c==="horizontal"?v=y:O=y,s.find(k(e.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${v}) scaleY(${O})`).transition(a.params.speed)}e.type==="custom"&&e.renderCustom?(s.html(e.renderCustom(a,o+1,g)),u("paginationRender",s[0])):u("paginationUpdate",s[0]),a.params.watchOverflow&&a.enabled&&s[a.isLocked?"addClass":"removeClass"](e.lockClass)}function C(){const l=a.params.pagination;if(f())return;const e=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,n=a.pagination.$el;let s="";if(l.type==="bullets"){let o=a.params.loop?Math.ceil((e-a.loopedSlides*2)/a.params.slidesPerGroup):a.snapGrid.length;a.params.freeMode&&a.params.freeMode.enabled&&!a.params.loop&&o>e&&(o=e);for(let g=0;g<o;g+=1)l.renderBullet?s+=l.renderBullet.call(a,g,l.bulletClass):s+=`<${l.bulletElement} class="${l.bulletClass}"></${l.bulletElement}>`;n.html(s),a.pagination.bullets=n.find(k(l.bulletClass))}l.type==="fraction"&&(l.renderFraction?s=l.renderFraction.call(a,l.currentClass,l.totalClass):s=`<span class="${l.currentClass}"></span> / <span class="${l.totalClass}"></span>`,n.html(s)),l.type==="progressbar"&&(l.renderProgressbar?s=l.renderProgressbar.call(a,l.progressbarFillClass):s=`<span class="${l.progressbarFillClass}"></span>`,n.html(s)),l.type!=="custom"&&u("paginationRender",a.pagination.$el[0])}function B(){a.params.pagination=V(a,a.originalParams.pagination,a.params.pagination,{el:"swiper-pagination"});const l=a.params.pagination;if(!l.el)return;let e=I(l.el);e.length!==0&&(a.params.uniqueNavElements&&typeof l.el=="string"&&e.length>1&&(e=a.$el.find(l.el),e.length>1&&(e=e.filter(n=>I(n).parents(".swiper")[0]===a.el))),l.type==="bullets"&&l.clickable&&e.addClass(l.clickableClass),e.addClass(l.modifierClass+l.type),e.addClass(a.isHorizontal()?l.horizontalClass:l.verticalClass),l.type==="bullets"&&l.dynamicBullets&&(e.addClass(`${l.modifierClass}${l.type}-dynamic`),r=0,l.dynamicMainBullets<1&&(l.dynamicMainBullets=1)),l.type==="progressbar"&&l.progressbarOpposite&&e.addClass(l.progressbarOppositeClass),l.clickable&&e.on("click",k(l.bulletClass),function(s){s.preventDefault();let o=I(this).index()*a.params.slidesPerGroup;a.params.loop&&(o+=a.loopedSlides),a.slideTo(o)}),Object.assign(a.pagination,{$el:e,el:e[0]}),a.enabled||e.addClass(l.lockClass))}function M(){const l=a.params.pagination;if(f())return;const e=a.pagination.$el;e.removeClass(l.hiddenClass),e.removeClass(l.modifierClass+l.type),e.removeClass(a.isHorizontal()?l.horizontalClass:l.verticalClass),a.pagination.bullets&&a.pagination.bullets.removeClass&&a.pagination.bullets.removeClass(l.bulletActiveClass),l.clickable&&e.off("click",k(l.bulletClass))}i("init",()=>{a.params.pagination.enabled===!1?S():(B(),C(),p())}),i("activeIndexChange",()=>{(a.params.loop||typeof a.snapIndex>"u")&&p()}),i("snapIndexChange",()=>{a.params.loop||p()}),i("slidesLengthChange",()=>{a.params.loop&&(C(),p())}),i("snapGridLengthChange",()=>{a.params.loop||(C(),p())}),i("destroy",()=>{M()}),i("enable disable",()=>{const{$el:l}=a.pagination;l&&l[a.enabled?"removeClass":"addClass"](a.params.pagination.lockClass)}),i("lock unlock",()=>{p()}),i("click",(l,e)=>{const n=e.target,{$el:s}=a.pagination;if(a.params.pagination.el&&a.params.pagination.hideOnClick&&s&&s.length>0&&!I(n).hasClass(a.params.pagination.bulletClass)){if(a.navigation&&(a.navigation.nextEl&&n===a.navigation.nextEl||a.navigation.prevEl&&n===a.navigation.prevEl))return;const o=s.hasClass(a.params.pagination.hiddenClass);u(o===!0?"paginationShow":"paginationHide"),s.toggleClass(a.params.pagination.hiddenClass)}});const F=()=>{a.$el.removeClass(a.params.pagination.paginationDisabledClass),a.pagination.$el&&a.pagination.$el.removeClass(a.params.pagination.paginationDisabledClass),B(),C(),p()},S=()=>{a.$el.addClass(a.params.pagination.paginationDisabledClass),a.pagination.$el&&a.pagination.$el.addClass(a.params.pagination.paginationDisabledClass),M()};Object.assign(a.pagination,{enable:F,disable:S,render:C,update:p,init:B,destroy:M})}function J({swiper:a,extendParams:$,on:i,emit:u}){let t;a.autoplay={running:!1,paused:!1},$({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});function d(){if(!a.size){a.autoplay.running=!1,a.autoplay.paused=!1;return}const l=a.slides.eq(a.activeIndex);let e=a.params.autoplay.delay;l.attr("data-swiper-autoplay")&&(e=l.attr("data-swiper-autoplay")||a.params.autoplay.delay),clearTimeout(t),t=H(()=>{let n;a.params.autoplay.reverseDirection?a.params.loop?(a.loopFix(),n=a.slidePrev(a.params.speed,!0,!0),u("autoplay")):a.isBeginning?a.params.autoplay.stopOnLastSlide?f():(n=a.slideTo(a.slides.length-1,a.params.speed,!0,!0),u("autoplay")):(n=a.slidePrev(a.params.speed,!0,!0),u("autoplay")):a.params.loop?(a.loopFix(),n=a.slideNext(a.params.speed,!0,!0),u("autoplay")):a.isEnd?a.params.autoplay.stopOnLastSlide?f():(n=a.slideTo(0,a.params.speed,!0,!0),u("autoplay")):(n=a.slideNext(a.params.speed,!0,!0),u("autoplay")),(a.params.cssMode&&a.autoplay.running||n===!1)&&d()},e)}function r(){return typeof t<"u"||a.autoplay.running?!1:(a.autoplay.running=!0,u("autoplayStart"),d(),!0)}function f(){return!a.autoplay.running||typeof t>"u"?!1:(t&&(clearTimeout(t),t=void 0),a.autoplay.running=!1,u("autoplayStop"),!0)}function m(l){!a.autoplay.running||a.autoplay.paused||(t&&clearTimeout(t),a.autoplay.paused=!0,l===0||!a.params.autoplay.waitForTransition?(a.autoplay.paused=!1,d()):["transitionend","webkitTransitionEnd"].forEach(e=>{a.$wrapperEl[0].addEventListener(e,C)}))}function p(){const l=T();l.visibilityState==="hidden"&&a.autoplay.running&&m(),l.visibilityState==="visible"&&a.autoplay.paused&&(d(),a.autoplay.paused=!1)}function C(l){!a||a.destroyed||!a.$wrapperEl||l.target===a.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach(e=>{a.$wrapperEl[0].removeEventListener(e,C)}),a.autoplay.paused=!1,a.autoplay.running?d():f())}function B(){a.params.autoplay.disableOnInteraction?f():(u("autoplayPause"),m()),["transitionend","webkitTransitionEnd"].forEach(l=>{a.$wrapperEl[0].removeEventListener(l,C)})}function M(){a.params.autoplay.disableOnInteraction||(a.autoplay.paused=!1,u("autoplayResume"),d())}function F(){a.params.autoplay.pauseOnMouseEnter&&(a.$el.on("mouseenter",B),a.$el.on("mouseleave",M))}function S(){a.$el.off("mouseenter",B),a.$el.off("mouseleave",M)}i("init",()=>{a.params.autoplay.enabled&&(r(),T().addEventListener("visibilitychange",p),F())}),i("beforeTransitionStart",(l,e,n)=>{a.autoplay.running&&(n||!a.params.autoplay.disableOnInteraction?a.autoplay.pause(e):f())}),i("sliderFirstMove",()=>{a.autoplay.running&&(a.params.autoplay.disableOnInteraction?f():m())}),i("touchEnd",()=>{a.params.cssMode&&a.autoplay.paused&&!a.params.autoplay.disableOnInteraction&&d()}),i("destroy",()=>{S(),a.autoplay.running&&f(),T().removeEventListener("visibilitychange",p)}),Object.assign(a.autoplay,{pause:m,run:d,start:r,stop:f})}const K={key:1,class:"banner-loading loading-skeleton"},Q=G({__name:"Banner",props:{swiperData:{default:()=>[]},modules:{default:()=>[]},autoPlay:{default:()=>({delay:3e3,disableOnInteraction:!1})},pagination:{default:()=>({clickable:!0})},loop:{type:Boolean,default:!1}},setup(a){const $=a,i={Autoplay:J,Pagination:W};let u=N(()=>$.modules.length?$.modules.map(t=>i[t]):[]);return(t,d)=>a.swiperData.length?(_(),z(D(j),{key:0,class:"banner",autoplay:a.autoPlay,pagination:a.pagination,loop:!0,modules:D(u)},{default:P(()=>[(_(!0),A(R,null,X(a.swiperData,(r,f)=>(_(),z(D(q),{class:"slide-item",key:f},{default:P(()=>[Y(t.$slots,"default",{slideItem:r,index:f},void 0,!0)]),_:2},1024))),128))]),_:3},8,["autoplay","pagination","modules"])):(_(),A("div",K))}});const aa=U(Q,[["__scopeId","data-v-17ec1adc"]]);export{aa as _};
