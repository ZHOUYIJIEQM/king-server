import{D as v,aR as X,o as G,bi as z,b as U,Z as C,ad as W,I as O,bF as h,af as K,bg as w,J as V,bd as $,be as j,bG as J,bb as Z,az as E,A as q,B as A,d as Q,f as g,N,bc as P}from"./index.672c262c.js";import{t as F}from"./el-notification.ae329e13.js";import{a as ee}from"./validator.e9ac4e08.js";var c=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(c||{});const Y=e=>{const t=v(e)?e:[e],o=[];return t.forEach(n=>{v(n)?o.push(...Y(n)):X(n)&&v(n.children)?o.push(...Y(n.children)):o.push(n)}),o},de=(e,t,o)=>{let n={offsetX:0,offsetY:0};const u=a=>{const d=a.clientX,l=a.clientY,{offsetX:m,offsetY:f}=n,i=e.value.getBoundingClientRect(),p=i.left,y=i.top,D=i.width,x=i.height,k=document.documentElement.clientWidth,_=document.documentElement.clientHeight,H=-p+m,I=-y+f,B=k-p-D+m,R=_-y-x+f,T=S=>{const M=Math.min(Math.max(m+S.clientX-d,H),B),L=Math.min(Math.max(f+S.clientY-l,I),R);n={offsetX:M,offsetY:L},e.value.style.transform=`translate(${C(M)}, ${C(L)})`},b=()=>{document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",b)};document.addEventListener("mousemove",T),document.addEventListener("mouseup",b)},r=()=>{t.value&&e.value&&t.value.addEventListener("mousedown",u)},s=()=>{t.value&&e.value&&t.value.removeEventListener("mousedown",u)};G(()=>{z(()=>{o.value?r():s()})}),U(()=>{s()})},ie=e=>{W(e)||F("[useLockscreen]","You need to pass a ref param to this function");const t=O("popup"),o=h(()=>t.bm("parent","hidden"));if(!K||w(document.body,o.value))return;let n=0,u=!1,r="0";const s=()=>{setTimeout(()=>{Z(document.body,o.value),u&&(document.body.style.width=r)},200)};V(e,a=>{if(!a){s();return}u=!w(document.body,o.value),u&&(r=document.body.style.width),n=ee(t.namespace.value);const d=document.documentElement.clientHeight<document.body.scrollHeight,l=$(document.body,"overflowY");n>0&&(d||l==="scroll")&&u&&(document.body.style.width=`calc(100% - ${n}px)`),j(document.body,o.value)}),J(()=>s())},oe=e=>{if(!e)return{onClick:E,onMousedown:E,onMouseup:E};let t=!1,o=!1;return{onClick:s=>{t&&o&&e(s),t=o=!1},onMousedown:s=>{t=s.target===s.currentTarget},onMouseup:s=>{o=s.target===s.currentTarget}}},te=q({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:A([String,Array,Object])},zIndex:{type:A([String,Number])}}),ne={click:e=>e instanceof MouseEvent};var se=Q({name:"ElOverlay",props:te,emits:ne,setup(e,{slots:t,emit:o}){const n=O("overlay"),u=d=>{o("click",d)},{onClick:r,onMousedown:s,onMouseup:a}=oe(e.customMaskEvent?void 0:u);return()=>e.mask?g("div",{class:[n.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:r,onMousedown:s,onMouseup:a},[N(t,"default")],c.STYLE|c.CLASS|c.PROPS,["onClick","onMouseup","onMousedown"]):P("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[N(t,"default")])}});const ce=se;export{ce as E,ie as a,oe as b,Y as f,de as u};
