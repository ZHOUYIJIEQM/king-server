var be=Object.defineProperty,Ve=Object.defineProperties;var we=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var xe=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable;var W=(n,u,s)=>u in n?be(n,u,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[u]=s,S=(n,u)=>{for(var s in u||(u={}))xe.call(u,s)&&W(n,s,u[s]);if(L)for(var s of L(u))Ce.call(u,s)&&W(n,s,u[s]);return n},q=(n,u)=>Ve(n,we(u));import{A as ge,B as E,am as G,c1 as w,al as U,c2 as _e,aj as J,d as re,Q,M as Ie,R as Se,H as Ee,I as Te,a as T,G as d,D,aA as X,bq as N,E as Y,J as De,j as m,c as y,V as Z,a_ as Ne,O as b,u as o,f as He,w as ee,at as ae,au as le,a0 as x,a2 as H,a3 as M,a1 as oe,av as te,t as Me,_ as ke,ah as C,bg as se,a5 as Be}from"./index.672c262c.js";import{i as Ae}from"./validator.e9ac4e08.js";import{C as je,U as g,n as Oe}from"./el-notification.ae329e13.js";const Pe=ge({modelValue:{type:Number,default:0},id:{type:String,default:void 0},lowThreshold:{type:Number,default:2},highThreshold:{type:Number,default:4},max:{type:Number,default:5},colors:{type:E([Array,Object]),default:()=>G(["","",""])},voidColor:{type:String,default:""},disabledVoidColor:{type:String,default:""},icons:{type:E([Array,Object]),default:()=>[w,w,w]},voidIcon:{type:U,default:()=>_e},disabledVoidIcon:{type:U,default:()=>w},disabled:{type:Boolean},allowHalf:{type:Boolean},showText:{type:Boolean},showScore:{type:Boolean},textColor:{type:String,default:""},texts:{type:E(Array),default:()=>G(["Extremely bad","Disappointed","Fair","Satisfied","Surprise"])},scoreTemplate:{type:String,default:"{value}"},size:{type:String,validator:Ae},label:{type:String,default:void 0},clearable:{type:Boolean,default:!1}}),ze={[je]:n=>J(n),[g]:n=>J(n)},Re=["id","aria-label","aria-labelledby","aria-valuenow","aria-valuetext","aria-valuemax"],Fe=["onMousemove","onClick"],Ke=re({name:"ElRate"}),$e=re(q(S({},Ke),{props:Pe,emits:ze,setup(n,{expose:u,emit:s}){const e=n;function _(a,l){const t=c=>X(c),f=Object.keys(l).map(c=>+c).filter(c=>{const V=l[c];return(t(V)?V.excluded:!1)?a<c:a<=c}).sort((c,V)=>c-V),h=l[f[0]];return t(h)&&h.value||h}const k=Q(Ie,void 0),B=Q(Se,void 0),ne=Ee(),i=Te("rate"),{inputId:ue,isLabeledByFormItem:A}=Oe(e,{formItemContext:B}),r=T(e.modelValue),I=T(-1),p=T(!0),ie=d(()=>[i.b(),i.m(ne.value)]),v=d(()=>e.disabled||(k==null?void 0:k.disabled)),ce=d(()=>i.cssVarBlock({"void-color":e.voidColor,"disabled-void-color":e.disabledVoidColor,"fill-color":P.value})),j=d(()=>{let a="";return e.showScore?a=e.scoreTemplate.replace(/\{\s*value\s*\}/,v.value?`${e.modelValue}`:`${r.value}`):e.showText&&(a=e.texts[Math.ceil(r.value)-1]),a}),O=d(()=>e.modelValue*100-Math.floor(e.modelValue)*100),de=d(()=>D(e.colors)?{[e.lowThreshold]:e.colors[0],[e.highThreshold]:{value:e.colors[1],excluded:!0},[e.max]:e.colors[2]}:e.colors),P=d(()=>{const a=_(r.value,de.value);return X(a)?"":a}),fe=d(()=>{let a="";return v.value?a=`${O.value}%`:e.allowHalf&&(a="50%"),{color:P.value,width:a}}),z=d(()=>{let a=D(e.icons)?[...e.icons]:S({},e.icons);return a=N(a),D(a)?{[e.lowThreshold]:a[0],[e.highThreshold]:{value:a[1],excluded:!0},[e.max]:a[2]}:a}),ve=d(()=>_(e.modelValue,z.value)),me=d(()=>v.value?Y(e.disabledVoidIcon)?e.disabledVoidIcon:N(e.disabledVoidIcon):Y(e.voidIcon)?e.voidIcon:N(e.voidIcon)),pe=d(()=>_(r.value,z.value));function R(a){const l=v.value&&O.value>0&&a-1<e.modelValue&&a>e.modelValue,t=e.allowHalf&&p.value&&a-.5<=r.value&&a>r.value;return l||t}function F(a){e.clearable&&a===e.modelValue&&(a=0),s(g,a),e.modelValue!==a&&s("change",a)}function he(a){v.value||(e.allowHalf&&p.value?F(r.value):F(a))}function ye(a){if(v.value)return;let l=r.value;const t=a.code;return t===C.up||t===C.right?(e.allowHalf?l+=.5:l+=1,a.stopPropagation(),a.preventDefault()):(t===C.left||t===C.down)&&(e.allowHalf?l-=.5:l-=1,a.stopPropagation(),a.preventDefault()),l=l<0?0:l,l=l>e.max?e.max:l,s(g,l),s("change",l),l}function K(a,l){if(!v.value){if(e.allowHalf){let t=l.target;se(t,i.e("item"))&&(t=t.querySelector(`.${i.e("icon")}`)),(t.clientWidth===0||se(t,i.e("decimal")))&&(t=t.parentNode),p.value=l.offsetX*2<=t.clientWidth,r.value=p.value?a-.5:a}else r.value=a;I.value=a}}function $(){v.value||(e.allowHalf&&(p.value=e.modelValue!==Math.floor(e.modelValue)),r.value=e.modelValue,I.value=-1)}return De(()=>e.modelValue,a=>{r.value=a,p.value=e.modelValue!==Math.floor(e.modelValue)}),e.modelValue||s(g,0),u({setCurrentValue:K,resetCurrentValue:$}),(a,l)=>{var t;return m(),y("div",{id:o(ue),class:b([o(ie),o(i).is("disabled",o(v))]),role:"slider","aria-label":o(A)?void 0:a.label||"rating","aria-labelledby":o(A)?(t=o(B))==null?void 0:t.labelId:void 0,"aria-valuenow":r.value,"aria-valuetext":o(j)||void 0,"aria-valuemin":"0","aria-valuemax":a.max,tabindex:"0",style:oe(o(ce)),onKeydown:ye},[(m(!0),y(Z,null,Ne(a.max,(f,h)=>(m(),y("span",{key:h,class:b(o(i).e("item")),onMousemove:c=>K(f,c),onMouseleave:$,onClick:c=>he(f)},[He(o(te),{class:b([o(i).e("icon"),{hover:I.value===f},o(i).is("active",f<=r.value)])},{default:ee(()=>[R(f)?M("v-if",!0):(m(),y(Z,{key:0},[ae((m(),x(H(o(pe)),null,null,512)),[[le,f<=r.value]]),ae((m(),x(H(o(me)),null,null,512)),[[le,!(f<=r.value)]])],64)),R(f)?(m(),x(o(te),{key:1,style:oe(o(fe)),class:b([o(i).e("icon"),o(i).e("decimal")])},{default:ee(()=>[(m(),x(H(o(ve))))]),_:1},8,["style","class"])):M("v-if",!0)]),_:2},1032,["class"])],42,Fe))),128)),a.showText||a.showScore?(m(),y("span",{key:0,class:b(o(i).e("text"))},Me(o(j)),3)):M("v-if",!0)],46,Re)}}}));var Le=ke($e,[["__file","/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);const Qe=Be(Le);export{Qe as E};
