var xl=Object.defineProperty,en=Object.defineProperties;var ln=Object.getOwnPropertyDescriptors;var hl=Object.getOwnPropertySymbols;var nn=Object.prototype.hasOwnProperty,tn=Object.prototype.propertyIsEnumerable;var yl=(e,l,t)=>l in e?xl(e,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[l]=t,be=(e,l)=>{for(var t in l||(l={}))nn.call(l,t)&&yl(e,t,l[t]);if(hl)for(var t of hl(l))tn.call(l,t)&&yl(e,t,l[t]);return e},$e=(e,l)=>en(e,ln(l));import{b8 as on,S as Sl,ca as an,x as Cl,z as Ol,cb as rn,cc as sn,A as kl,B as un,d as te,I as ne,j as C,c as $,O as h,u as E,N as H,a3 as B,e as P,a1 as j,_ as ce,m as dn,t as U,a5 as ul,C as cn,H as Nl,G as O,a0 as z,w as I,f as se,bu as wl,aN as k,aE as sl,a4 as Hl,Q as Ae,c7 as De,ab as F,J as K,g as dl,r as ze,L as cl,b as fn,W as D,aj as ye,ak as fl,a as N,o as pl,U as Gl,aI as Tl,P as El,cd as he,ae as pn,ce as ol,am as Ll,ag as vn,aC as Il,aM as mn,aX as gn,K as Ql,aU as re,bJ as bn,V as il,a_ as Ml,bD as q,cf as hn,aY as yn,a2 as $l,a6 as Ul}from"./index.3ca1645a.js";import{j as vl,m as Sn,a as Cn,d as On,U as le,C as jl,g as wn,h as Tn,f as En,n as Ln}from"./el-scrollbar.5cf2b49c.js";import{i as In,E as Mn}from"./el-notification.56fc006a.js";import{s as $n,i as Pn}from"./validator.6fdf4b3e.js";import{U as Pl,j as Al,d as Dl,h as Bl,S as al,m as An}from"./el-loading.274a2446.js";import{d as zl}from"./debounce.eb328bbe.js";import{C as Dn}from"./el-tag.c1c1dc80.js";var Bn="__lodash_hash_undefined__";function zn(e){return this.__data__.set(e,Bn),this}function Vn(e){return this.__data__.has(e)}function Be(e){var l=-1,t=e==null?0:e.length;for(this.__data__=new on;++l<t;)this.add(e[l])}Be.prototype.add=Be.prototype.push=zn;Be.prototype.has=Vn;function Rn(e,l){for(var t=-1,s=e==null?0:e.length;++t<s;)if(l(e[t],t,e))return!0;return!1}function qn(e,l){return e.has(l)}var Fn=1,Kn=2;function Jl(e,l,t,s,u,a){var r=t&Fn,c=e.length,d=l.length;if(c!=d&&!(r&&d>c))return!1;var b=a.get(e),p=a.get(l);if(b&&p)return b==l&&p==e;var y=-1,g=!0,T=t&Kn?new Be:void 0;for(a.set(e,l),a.set(l,e);++y<c;){var i=e[y],v=l[y];if(s)var S=r?s(v,i,y,l,e,a):s(i,v,y,e,l,a);if(S!==void 0){if(S)continue;g=!1;break}if(T){if(!Rn(l,function(w,L){if(!qn(T,L)&&(i===w||u(i,w,t,s,a)))return T.push(L)})){g=!1;break}}else if(!(i===v||u(i,v,t,s,a))){g=!1;break}}return a.delete(e),a.delete(l),g}function Wn(e){var l=-1,t=Array(e.size);return e.forEach(function(s,u){t[++l]=[u,s]}),t}function kn(e){var l=-1,t=Array(e.size);return e.forEach(function(s){t[++l]=s}),t}var Nn=1,Hn=2,Gn="[object Boolean]",Qn="[object Date]",Un="[object Error]",jn="[object Map]",Jn="[object Number]",Xn="[object RegExp]",Yn="[object Set]",Zn="[object String]",_n="[object Symbol]",xn="[object ArrayBuffer]",et="[object DataView]",Vl=Sl?Sl.prototype:void 0,rl=Vl?Vl.valueOf:void 0;function lt(e,l,t,s,u,a,r){switch(t){case et:if(e.byteLength!=l.byteLength||e.byteOffset!=l.byteOffset)return!1;e=e.buffer,l=l.buffer;case xn:return!(e.byteLength!=l.byteLength||!a(new Pl(e),new Pl(l)));case Gn:case Qn:case Jn:return an(+e,+l);case Un:return e.name==l.name&&e.message==l.message;case Xn:case Zn:return e==l+"";case jn:var c=Wn;case Yn:var d=s&Nn;if(c||(c=kn),e.size!=l.size&&!d)return!1;var b=r.get(e);if(b)return b==l;s|=Hn,r.set(e,l);var p=Jl(c(e),c(l),s,u,a,r);return r.delete(e),p;case _n:if(rl)return rl.call(e)==rl.call(l)}return!1}var nt=1,tt=Object.prototype,ot=tt.hasOwnProperty;function it(e,l,t,s,u,a){var r=t&nt,c=Al(e),d=c.length,b=Al(l),p=b.length;if(d!=p&&!r)return!1;for(var y=d;y--;){var g=c[y];if(!(r?g in l:ot.call(l,g)))return!1}var T=a.get(e),i=a.get(l);if(T&&i)return T==l&&i==e;var v=!0;a.set(e,l),a.set(l,e);for(var S=r;++y<d;){g=c[y];var w=e[g],L=l[g];if(s)var J=r?s(L,w,g,l,e,a):s(w,L,g,e,l,a);if(!(J===void 0?w===L||u(w,L,t,s,a):J)){v=!1;break}S||(S=g=="constructor")}if(v&&!S){var X=e.constructor,G=l.constructor;X!=G&&"constructor"in e&&"constructor"in l&&!(typeof X=="function"&&X instanceof X&&typeof G=="function"&&G instanceof G)&&(v=!1)}return a.delete(e),a.delete(l),v}var at=1,Rl="[object Arguments]",ql="[object Array]",Pe="[object Object]",rt=Object.prototype,Fl=rt.hasOwnProperty;function st(e,l,t,s,u,a){var r=Cl(e),c=Cl(l),d=r?ql:Dl(e),b=c?ql:Dl(l);d=d==Rl?Pe:d,b=b==Rl?Pe:b;var p=d==Pe,y=b==Pe,g=d==b;if(g&&Bl(e)){if(!Bl(l))return!1;r=!0,p=!1}if(g&&!p)return a||(a=new al),r||An(e)?Jl(e,l,t,s,u,a):lt(e,l,d,t,s,u,a);if(!(t&at)){var T=p&&Fl.call(e,"__wrapped__"),i=y&&Fl.call(l,"__wrapped__");if(T||i){var v=T?e.value():e,S=i?l.value():l;return a||(a=new al),u(v,S,t,s,a)}}return g?(a||(a=new al),it(e,l,t,s,u,a)):!1}function Xl(e,l,t,s,u){return e===l?!0:e==null||l==null||!Ol(e)&&!Ol(l)?e!==e&&l!==l:st(e,l,t,s,Xl,u)}function Kl(e,l){return Xl(e,l)}const ut=(e="")=>e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"),Gt=e=>rn(e),dt=e=>sn[e||"default"],ct=e=>({focus:()=>{var l,t;(t=(l=e.value)==null?void 0:l.focus)==null||t.call(l)}}),ft=kl({header:{type:String,default:""},bodyStyle:{type:un([String,Object,Array]),default:""},shadow:{type:String,values:["always","hover","never"],default:"always"}}),pt=te({name:"ElCard"}),vt=te($e(be({},pt),{props:ft,setup(e){const l=ne("card");return(t,s)=>(C(),$("div",{class:h([E(l).b(),E(l).is(`${t.shadow}-shadow`)])},[t.$slots.header||t.header?(C(),$("div",{key:0,class:h(E(l).e("header"))},[H(t.$slots,"header",{},()=>[dn(U(t.header),1)])],2)):B("v-if",!0),P("div",{class:h(E(l).e("body")),style:j(t.bodyStyle)},[H(t.$slots,"default")],6)],2))}}));var mt=ce(vt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/card/src/card.vue"]]);const Qt=ul(mt),Yl=kl({closable:Boolean,type:{type:String,values:["success","info","warning","danger",""],default:""},hit:Boolean,disableTransitions:Boolean,color:{type:String,default:""},size:{type:String,values:cn,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),gt={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent},bt=te({name:"ElTag"}),ht=te($e(be({},bt),{props:Yl,emits:gt,setup(e,{emit:l}){const t=e,s=Nl(),u=ne("tag"),a=O(()=>{const{type:d,hit:b,effect:p,closable:y,round:g}=t;return[u.b(),u.is("closable",y),u.m(d),u.m(s.value),u.m(p),u.is("hit",b),u.is("round",g)]}),r=d=>{l("close",d)},c=d=>{l("click",d)};return(d,b)=>d.disableTransitions?(C(),$("span",{key:0,class:h(E(a)),style:j({backgroundColor:d.color}),onClick:c},[P("span",{class:h(E(u).e("content"))},[H(d.$slots,"default")],2),d.closable?(C(),z(E(sl),{key:0,class:h(E(u).e("close")),onClick:k(r,["stop"])},{default:I(()=>[se(E(wl))]),_:1},8,["class","onClick"])):B("v-if",!0)],6)):(C(),z(Hl,{key:1,name:`${E(u).namespace.value}-zoom-in-center`,appear:""},{default:I(()=>[P("span",{class:h(E(a)),style:j({backgroundColor:d.color}),onClick:c},[P("span",{class:h(E(u).e("content"))},[H(d.$slots,"default")],2),d.closable?(C(),z(E(sl),{key:0,class:h(E(u).e("close")),onClick:k(r,["stop"])},{default:I(()=>[se(E(wl))]),_:1},8,["class","onClick"])):B("v-if",!0)],6)]),_:3},8,["name"]))}}));var yt=ce(ht,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);const St=ul(yt),Zl="ElSelectGroup",Ve="ElSelect";function Ct(e,l){const t=Ae(Ve),s=Ae(Zl,{disabled:!1}),u=O(()=>Object.prototype.toString.call(e.value).toLowerCase()==="[object object]"),a=O(()=>t.props.multiple?y(t.props.modelValue,e.value):g(e.value,t.props.modelValue)),r=O(()=>{if(t.props.multiple){const v=t.props.modelValue||[];return!a.value&&v.length>=t.props.multipleLimit&&t.props.multipleLimit>0}else return!1}),c=O(()=>e.label||(u.value?"":e.value)),d=O(()=>e.value||e.label||""),b=O(()=>e.disabled||l.groupDisabled||r.value),p=dl(),y=(v=[],S)=>{if(u.value){const w=t.props.valueKey;return v&&v.some(L=>De(F(L,w))===F(S,w))}else return v&&v.includes(S)},g=(v,S)=>{if(u.value){const{valueKey:w}=t.props;return F(v,w)===F(S,w)}else return v===S},T=()=>{!e.disabled&&!s.disabled&&(t.hoverIndex=t.optionsArray.indexOf(p.proxy))};K(()=>c.value,()=>{!e.created&&!t.props.remote&&t.setSelected()}),K(()=>e.value,(v,S)=>{const{remote:w,valueKey:L}=t.props;if(Object.is(v,S)||(t.onOptionDestroy(S,p.proxy),t.onOptionCreate(p.proxy)),!e.created&&!w){if(L&&typeof v=="object"&&typeof S=="object"&&v[L]===S[L])return;t.setSelected()}}),K(()=>s.disabled,()=>{l.groupDisabled=s.disabled},{immediate:!0});const{queryChange:i}=De(t);return K(i,v=>{const{query:S}=E(v),w=new RegExp(ut(S),"i");l.visible=w.test(c.value)||e.created,l.visible||t.filteredOptionsCount--}),{select:t,currentLabel:c,currentValue:d,itemSelected:a,isDisabled:b,hoverItem:T}}const Ot=te({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:{type:Boolean,default:!1}},setup(e){const l=ne("select"),t=ze({index:-1,groupDisabled:!1,visible:!0,hitState:!1,hover:!1}),{currentLabel:s,itemSelected:u,isDisabled:a,select:r,hoverItem:c}=Ct(e,t),{visible:d,hover:b}=cl(t),p=dl().proxy;r.onOptionCreate(p),fn(()=>{const g=p.value,{selected:T}=r,v=(r.props.multiple?T:[T]).some(S=>S.value===p.value);D(()=>{r.cachedOptions.get(g)===p&&!v&&r.cachedOptions.delete(g)}),r.onOptionDestroy(g,p)});function y(){e.disabled!==!0&&t.groupDisabled!==!0&&r.handleOptionSelect(p,!0)}return{ns:l,currentLabel:s,itemSelected:u,isDisabled:a,select:r,hoverItem:c,visible:d,hover:b,selectOptionClick:y,states:t}}});function wt(e,l,t,s,u,a){return ye((C(),$("li",{class:h([e.ns.be("dropdown","item"),e.ns.is("disabled",e.isDisabled),{selected:e.itemSelected,hover:e.hover}]),onMouseenter:l[0]||(l[0]=(...r)=>e.hoverItem&&e.hoverItem(...r)),onClick:l[1]||(l[1]=k((...r)=>e.selectOptionClick&&e.selectOptionClick(...r),["stop"]))},[H(e.$slots,"default",{},()=>[P("span",null,U(e.currentLabel),1)])],34)),[[fl,e.visible]])}var ml=ce(Ot,[["render",wt],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);const Tt=te({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=Ae(Ve),l=ne("select"),t=O(()=>e.props.popperClass),s=O(()=>e.props.multiple),u=O(()=>e.props.fitInputWidth),a=N("");function r(){var c;a.value=`${(c=e.selectWrapper)==null?void 0:c.offsetWidth}px`}return pl(()=>{r(),Gl(e.selectWrapper,r)}),{ns:l,minWidth:a,popperClass:t,isMultiple:s,isFitInputWidth:u}}});function Et(e,l,t,s,u,a){return C(),$("div",{class:h([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:j({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[H(e.$slots,"default")],6)}var Lt=ce(Tt,[["render",Et],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);function It(e){const{t:l}=vl();return ze({options:new Map,cachedOptions:new Map,createdLabel:null,createdSelected:!1,selected:e.multiple?[]:{},inputLength:20,inputWidth:0,optionsCount:0,filteredOptionsCount:0,visible:!1,softFocus:!1,selectedLabel:"",hoverIndex:-1,query:"",previousQuery:null,inputHovering:!1,cachedPlaceHolder:"",currentPlaceholder:l("el.select.placeholder"),menuVisibleOnFocus:!1,isOnComposition:!1,isSilentBlur:!1,prefixWidth:11,tagInMultiLine:!1,mouseEnter:!1})}const Mt=(e,l,t)=>{const{t:s}=vl(),u=ne("select");Sn({from:"suffixTransition",replacement:"override style scheme",version:"2.3.0",scope:"props",ref:"https://element-plus.org/en-US/component/select.html#select-attributes"},O(()=>e.suffixTransition===!1));const a=N(null),r=N(null),c=N(null),d=N(null),b=N(null),p=N(null),y=N(-1),g=Tl({query:""}),T=Tl(""),{form:i,formItem:v}=Cn(),S=O(()=>!e.filterable||e.multiple||!l.visible),w=O(()=>e.disabled||(i==null?void 0:i.disabled)),L=O(()=>{const n=e.multiple?Array.isArray(e.modelValue)&&e.modelValue.length>0:e.modelValue!==void 0&&e.modelValue!==null&&e.modelValue!=="";return e.clearable&&!w.value&&l.inputHovering&&n}),J=O(()=>e.remote&&e.filterable&&!e.remoteShowSuffix?"":e.suffixIcon),X=O(()=>u.is("reverse",J.value&&l.visible&&e.suffixTransition)),G=O(()=>e.remote?300:0),fe=O(()=>e.loading?e.loadingText||s("el.select.loading"):e.remote&&l.query===""&&l.options.size===0?!1:e.filterable&&l.query&&l.options.size>0&&l.filteredOptionsCount===0?e.noMatchText||s("el.select.noMatch"):l.options.size===0?e.noDataText||s("el.select.noData"):null),A=O(()=>Array.from(l.options.values())),Re=O(()=>Array.from(l.cachedOptions.values())),qe=O(()=>{const n=A.value.filter(o=>!o.created).some(o=>o.currentLabel===l.query);return e.filterable&&e.allowCreate&&l.query!==""&&!n}),ue=Nl(),Fe=O(()=>["small"].includes(ue.value)?"small":"default"),Ke=O({get(){return l.visible&&fe.value!==!1},set(n){l.visible=n}});K([()=>w.value,()=>ue.value,()=>i==null?void 0:i.size],()=>{D(()=>{W()})}),K(()=>e.placeholder,n=>{l.cachedPlaceHolder=l.currentPlaceholder=n}),K(()=>e.modelValue,(n,o)=>{e.multiple&&(W(),n&&n.length>0||r.value&&l.query!==""?l.currentPlaceholder="":l.currentPlaceholder=l.cachedPlaceHolder,e.filterable&&!e.reserveKeyword&&(l.query="",Y(l.query))),pe(),e.filterable&&!e.multiple&&(l.inputLength=20),!Kl(n,o)&&e.validateEvent&&(v==null||v.validate("change").catch(f=>On()))},{flush:"post",deep:!0}),K(()=>l.visible,n=>{var o,f,m;n?((f=(o=c.value)==null?void 0:o.updatePopper)==null||f.call(o),e.filterable&&(l.filteredOptionsCount=l.optionsCount,l.query=e.remote?"":l.selectedLabel,e.multiple?(m=r.value)==null||m.focus():l.selectedLabel&&(l.currentPlaceholder=`${l.selectedLabel}`,l.selectedLabel=""),Y(l.query),!e.multiple&&!e.remote&&(g.value.query="",he(g),he(T)))):(e.filterable&&(El(e.filterMethod)&&e.filterMethod(),El(e.remoteMethod)&&e.remoteMethod()),r.value&&r.value.blur(),l.query="",l.previousQuery=null,l.selectedLabel="",l.inputLength=20,l.menuVisibleOnFocus=!1,We(),D(()=>{r.value&&r.value.value===""&&l.selected.length===0&&(l.currentPlaceholder=l.cachedPlaceHolder)}),e.multiple||(l.selected&&(e.filterable&&e.allowCreate&&l.createdSelected&&l.createdLabel?l.selectedLabel=l.createdLabel:l.selectedLabel=l.selected.currentLabel,e.filterable&&(l.query=l.selectedLabel)),e.filterable&&(l.currentPlaceholder=l.cachedPlaceHolder))),t.emit("visible-change",n)}),K(()=>l.options.entries(),()=>{var n,o,f;if(!pn)return;(o=(n=c.value)==null?void 0:n.updatePopper)==null||o.call(n),e.multiple&&W();const m=((f=b.value)==null?void 0:f.querySelectorAll("input"))||[];Array.from(m).includes(document.activeElement)||pe(),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&Ce()},{flush:"post"}),K(()=>l.hoverIndex,n=>{typeof n=="number"&&n>-1?y.value=A.value[n]||{}:y.value={},A.value.forEach(o=>{o.hover=y.value===o})});const W=()=>{e.collapseTags&&!e.filterable||D(()=>{var n,o;if(!a.value)return;const f=a.value.$el.querySelector("input"),m=d.value,M=dt(ue.value||(i==null?void 0:i.size));f.style.height=`${(l.selected.length===0?M:Math.max(m?m.clientHeight+(m.clientHeight>M?6:0):0,M))-2}px`,l.tagInMultiLine=Number.parseFloat(f.style.height)>=M,l.visible&&fe.value!==!1&&((o=(n=c.value)==null?void 0:n.updatePopper)==null||o.call(n))})},Y=async n=>{if(!(l.previousQuery===n||l.isOnComposition)){if(l.previousQuery===null&&(typeof e.filterMethod=="function"||typeof e.remoteMethod=="function")){l.previousQuery=n;return}l.previousQuery=n,D(()=>{var o,f;l.visible&&((f=(o=c.value)==null?void 0:o.updatePopper)==null||f.call(o))}),l.hoverIndex=-1,e.multiple&&e.filterable&&D(()=>{const o=r.value.value.length*15+20;l.inputLength=e.collapseTags?Math.min(50,o):o,Se(),W()}),e.remote&&typeof e.remoteMethod=="function"?(l.hoverIndex=-1,e.remoteMethod(n)):typeof e.filterMethod=="function"?(e.filterMethod(n),he(T)):(l.filteredOptionsCount=l.optionsCount,g.value.query=n,he(g),he(T)),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&(await D(),Ce())}},Se=()=>{l.currentPlaceholder!==""&&(l.currentPlaceholder=r.value.value?"":l.cachedPlaceHolder)},Ce=()=>{const n=A.value.filter(m=>m.visible&&!m.disabled&&!m.states.groupDisabled),o=n.find(m=>m.created),f=n[0];l.hoverIndex=ve(A.value,o||f)},pe=()=>{var n;if(e.multiple)l.selectedLabel="";else{const f=Oe(e.modelValue);(n=f.props)!=null&&n.created?(l.createdLabel=f.props.value,l.createdSelected=!0):l.createdSelected=!1,l.selectedLabel=f.currentLabel,l.selected=f,e.filterable&&(l.query=l.selectedLabel);return}const o=[];Array.isArray(e.modelValue)&&e.modelValue.forEach(f=>{o.push(Oe(f))}),l.selected=o,D(()=>{W()})},Oe=n=>{let o;const f=ol(n).toLowerCase()==="object",m=ol(n).toLowerCase()==="null",M=ol(n).toLowerCase()==="undefined";for(let Q=l.cachedOptions.size-1;Q>=0;Q--){const V=Re.value[Q];if(f?F(V.value,e.valueKey)===F(n,e.valueKey):V.value===n){o={value:n,currentLabel:V.currentLabel,isDisabled:V.isDisabled};break}}if(o)return o;const x=f?n.label:!m&&!M?n:"",ee={value:n,currentLabel:x};return e.multiple&&(ee.hitState=!1),ee},We=()=>{setTimeout(()=>{const n=e.valueKey;e.multiple?l.selected.length>0?l.hoverIndex=Math.min.apply(null,l.selected.map(o=>A.value.findIndex(f=>F(f,n)===F(o,n)))):l.hoverIndex=-1:l.hoverIndex=A.value.findIndex(o=>ge(o)===ge(l.selected))},300)},ke=()=>{var n,o;Ne(),(o=(n=c.value)==null?void 0:n.updatePopper)==null||o.call(n),e.multiple&&!e.filterable&&W()},Ne=()=>{var n;l.inputWidth=(n=a.value)==null?void 0:n.$el.getBoundingClientRect().width},He=()=>{e.filterable&&l.query!==l.selectedLabel&&(l.query=l.selectedLabel,Y(l.query))},Ge=zl(()=>{He()},G.value),Qe=zl(n=>{Y(n.target.value)},G.value),oe=n=>{Kl(e.modelValue,n)||t.emit(jl,n)},Ue=n=>{if(n.target.value.length<=0&&!me()){const o=e.modelValue.slice();o.pop(),t.emit(le,o),oe(o)}n.target.value.length===1&&e.modelValue.length===0&&(l.currentPlaceholder=l.cachedPlaceHolder)},je=(n,o)=>{const f=l.selected.indexOf(o);if(f>-1&&!w.value){const m=e.modelValue.slice();m.splice(f,1),t.emit(le,m),oe(m),t.emit("remove-tag",o.value)}n.stopPropagation()},ie=n=>{n.stopPropagation();const o=e.multiple?[]:"";if(typeof o!="string")for(const f of l.selected)f.isDisabled&&o.push(f.value);t.emit(le,o),oe(o),l.hoverIndex=-1,l.visible=!1,t.emit("clear")},we=(n,o)=>{var f;if(e.multiple){const m=(e.modelValue||[]).slice(),M=ve(m,n.value);M>-1?m.splice(M,1):(e.multipleLimit<=0||m.length<e.multipleLimit)&&m.push(n.value),t.emit(le,m),oe(m),n.created&&(l.query="",Y(""),l.inputLength=20),e.filterable&&((f=r.value)==null||f.focus())}else t.emit(le,n.value),oe(n.value),l.visible=!1;l.isSilentBlur=o,Je(),!l.visible&&D(()=>{Z(n)})},ve=(n=[],o)=>{if(!Ll(o))return n.indexOf(o);const f=e.valueKey;let m=-1;return n.some((M,x)=>De(F(M,f))===F(o,f)?(m=x,!0):!1),m},Je=()=>{l.softFocus=!0;const n=r.value||a.value;n&&(n==null||n.focus())},Z=n=>{var o,f,m,M,x;const ee=Array.isArray(n)?n[0]:n;let Q=null;if(ee!=null&&ee.value){const V=A.value.filter(Me=>Me.value===ee.value);V.length>0&&(Q=V[0].$el)}if(c.value&&Q){const V=(M=(m=(f=(o=c.value)==null?void 0:o.popperRef)==null?void 0:f.contentRef)==null?void 0:m.querySelector)==null?void 0:M.call(m,`.${u.be("dropdown","wrap")}`);V&&$n(V,Q)}(x=p.value)==null||x.handleScroll()},Xe=n=>{l.optionsCount++,l.filteredOptionsCount++,l.options.set(n.value,n),l.cachedOptions.set(n.value,n)},Ye=(n,o)=>{l.options.get(n)===o&&(l.optionsCount--,l.filteredOptionsCount--,l.options.delete(n))},Ze=n=>{n.code!==vn.backspace&&me(!1),l.inputLength=r.value.value.length*15+20,W()},me=n=>{if(!Array.isArray(l.selected))return;const o=l.selected[l.selected.length-1];if(!!o)return n===!0||n===!1?(o.hitState=n,n):(o.hitState=!o.hitState,o.hitState)},_e=n=>{const o=n.target.value;if(n.type==="compositionend")l.isOnComposition=!1,D(()=>Y(o));else{const f=o[o.length-1]||"";l.isOnComposition=!In(f)}},xe=()=>{D(()=>Z(l.selected))},_=n=>{l.softFocus?l.softFocus=!1:((e.automaticDropdown||e.filterable)&&(e.filterable&&!l.visible&&(l.menuVisibleOnFocus=!0),l.visible=!0),t.emit("focus",n))},Te=()=>{var n;l.visible=!1,(n=a.value)==null||n.blur()},el=n=>{D(()=>{l.isSilentBlur?l.isSilentBlur=!1:t.emit("blur",n)}),l.softFocus=!1},Ee=n=>{ie(n)},ll=()=>{l.visible=!1},nl=n=>{l.visible&&(n.preventDefault(),n.stopPropagation(),l.visible=!1)},Le=n=>{var o;n&&!l.mouseEnter||w.value||(l.menuVisibleOnFocus?l.menuVisibleOnFocus=!1:(!c.value||!c.value.isFocusInsideContent())&&(l.visible=!l.visible),l.visible&&((o=r.value||a.value)==null||o.focus()))},Ie=()=>{l.visible?A.value[l.hoverIndex]&&we(A.value[l.hoverIndex],void 0):Le()},ge=n=>Ll(n.value)?F(n.value,e.valueKey):n.value,tl=O(()=>A.value.filter(n=>n.visible).every(n=>n.disabled)),de=n=>{if(!l.visible){l.visible=!0;return}if(!(l.options.size===0||l.filteredOptionsCount===0)&&!l.isOnComposition&&!tl.value){n==="next"?(l.hoverIndex++,l.hoverIndex===l.options.size&&(l.hoverIndex=0)):n==="prev"&&(l.hoverIndex--,l.hoverIndex<0&&(l.hoverIndex=l.options.size-1));const o=A.value[l.hoverIndex];(o.disabled===!0||o.states.groupDisabled===!0||!o.visible)&&de(n),D(()=>Z(y.value))}};return{optionsArray:A,selectSize:ue,handleResize:ke,debouncedOnInputChange:Ge,debouncedQueryChange:Qe,deletePrevTag:Ue,deleteTag:je,deleteSelected:ie,handleOptionSelect:we,scrollToOption:Z,readonly:S,resetInputHeight:W,showClose:L,iconComponent:J,iconReverse:X,showNewOption:qe,collapseTagSize:Fe,setSelected:pe,managePlaceholder:Se,selectDisabled:w,emptyText:fe,toggleLastOptionHitState:me,resetInputState:Ze,handleComposition:_e,onOptionCreate:Xe,onOptionDestroy:Ye,handleMenuEnter:xe,handleFocus:_,blur:Te,handleBlur:el,handleClearClick:Ee,handleClose:ll,handleKeydownEscape:nl,toggleMenu:Le,selectOption:Ie,getValueKey:ge,navigateOptions:de,dropMenuVisible:Ke,queryChange:g,groupQueryChange:T,reference:a,input:r,tooltipRef:c,tags:d,selectWrapper:b,scrollbar:p,handleMouseEnter:()=>{l.mouseEnter=!0},handleMouseLeave:()=>{l.mouseEnter=!1}}},Wl="ElSelect",$t=te({name:Wl,componentName:Wl,components:{ElInput:Mn,ElSelectMenu:Lt,ElOption:ml,ElTag:St,ElScrollbar:wn,ElTooltip:Tn,ElIcon:sl},directives:{ClickOutside:Dn},props:{name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:{type:String,validator:Pn},effect:{type:String,default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:{type:Boolean,default:!1},teleported:En.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:Il,default:mn},fitInputWidth:{type:Boolean,default:!1},suffixIcon:{type:Il,default:gn},tagType:$e(be({},Yl.type),{default:"info"}),validateEvent:{type:Boolean,default:!0},remoteShowSuffix:{type:Boolean,default:!1},suffixTransition:{type:Boolean,default:!0},placement:{type:String,values:Ln,default:"bottom-start"}},emits:[le,jl,"remove-tag","clear","visible-change","focus","blur"],setup(e,l){const t=ne("select"),s=ne("input"),{t:u}=vl(),a=It(e),{optionsArray:r,selectSize:c,readonly:d,handleResize:b,collapseTagSize:p,debouncedOnInputChange:y,debouncedQueryChange:g,deletePrevTag:T,deleteTag:i,deleteSelected:v,handleOptionSelect:S,scrollToOption:w,setSelected:L,resetInputHeight:J,managePlaceholder:X,showClose:G,selectDisabled:fe,iconComponent:A,iconReverse:Re,showNewOption:qe,emptyText:ue,toggleLastOptionHitState:Fe,resetInputState:Ke,handleComposition:W,onOptionCreate:Y,onOptionDestroy:Se,handleMenuEnter:Ce,handleFocus:pe,blur:Oe,handleBlur:We,handleClearClick:ke,handleClose:Ne,handleKeydownEscape:He,toggleMenu:Ge,selectOption:Qe,getValueKey:oe,navigateOptions:Ue,dropMenuVisible:je,reference:ie,input:we,tooltipRef:ve,tags:Je,selectWrapper:Z,scrollbar:Xe,queryChange:Ye,groupQueryChange:Ze,handleMouseEnter:me,handleMouseLeave:_e}=Mt(e,a,l),{focus:xe}=ct(ie),{inputWidth:_,selected:Te,inputLength:el,filteredOptionsCount:Ee,visible:ll,softFocus:nl,selectedLabel:Le,hoverIndex:Ie,query:ge,inputHovering:tl,currentPlaceholder:de,menuVisibleOnFocus:gl,isOnComposition:bl,isSilentBlur:n,options:o,cachedOptions:f,optionsCount:m,prefixWidth:M,tagInMultiLine:x}=cl(a),ee=O(()=>{const R=[t.b()],ae=E(c);return ae&&R.push(t.m(ae)),e.disabled&&R.push(t.m("disabled")),R}),Q=O(()=>({maxWidth:`${E(_)-32}px`,width:"100%"})),V=O(()=>({maxWidth:`${E(_)>123?E(_)-123:E(_)-75}px`}));Ql(Ve,ze({props:e,options:o,optionsArray:r,cachedOptions:f,optionsCount:m,filteredOptionsCount:Ee,hoverIndex:Ie,handleOptionSelect:S,onOptionCreate:Y,onOptionDestroy:Se,selectWrapper:Z,selected:Te,setSelected:L,queryChange:Ye,groupQueryChange:Ze})),pl(()=>{a.cachedPlaceHolder=de.value=e.placeholder||u("el.select.placeholder"),e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length>0&&(de.value=""),Gl(Z,b),e.remote&&e.multiple&&J(),D(()=>{const R=ie.value&&ie.value.$el;if(!!R&&(_.value=R.getBoundingClientRect().width,l.slots.prefix)){const ae=R.querySelector(`.${s.e("prefix")}`);M.value=Math.max(ae.getBoundingClientRect().width+5,30)}}),L()}),e.multiple&&!Array.isArray(e.modelValue)&&l.emit(le,[]),!e.multiple&&Array.isArray(e.modelValue)&&l.emit(le,"");const Me=O(()=>{var R,ae;return(ae=(R=ve.value)==null?void 0:R.popperRef)==null?void 0:ae.contentRef});return{tagInMultiLine:x,prefixWidth:M,selectSize:c,readonly:d,handleResize:b,collapseTagSize:p,debouncedOnInputChange:y,debouncedQueryChange:g,deletePrevTag:T,deleteTag:i,deleteSelected:v,handleOptionSelect:S,scrollToOption:w,inputWidth:_,selected:Te,inputLength:el,filteredOptionsCount:Ee,visible:ll,softFocus:nl,selectedLabel:Le,hoverIndex:Ie,query:ge,inputHovering:tl,currentPlaceholder:de,menuVisibleOnFocus:gl,isOnComposition:bl,isSilentBlur:n,options:o,resetInputHeight:J,managePlaceholder:X,showClose:G,selectDisabled:fe,iconComponent:A,iconReverse:Re,showNewOption:qe,emptyText:ue,toggleLastOptionHitState:Fe,resetInputState:Ke,handleComposition:W,handleMenuEnter:Ce,handleFocus:pe,blur:Oe,handleBlur:We,handleClearClick:ke,handleClose:Ne,handleKeydownEscape:He,toggleMenu:Ge,selectOption:Qe,getValueKey:oe,navigateOptions:Ue,dropMenuVisible:je,focus:xe,reference:ie,input:we,tooltipRef:ve,popperPaneRef:Me,tags:Je,selectWrapper:Z,scrollbar:Xe,wrapperKls:ee,selectTagsStyle:Q,nsSelect:t,tagTextStyle:V,handleMouseEnter:me,handleMouseLeave:_e}}}),Pt=["disabled","autocomplete"],At={style:{height:"100%",display:"flex","justify-content":"center","align-items":"center"}};function Dt(e,l,t,s,u,a){const r=re("el-tag"),c=re("el-tooltip"),d=re("el-icon"),b=re("el-input"),p=re("el-option"),y=re("el-scrollbar"),g=re("el-select-menu"),T=bn("click-outside");return ye((C(),$("div",{ref:"selectWrapper",class:h(e.wrapperKls),onMouseenter:l[22]||(l[22]=(...i)=>e.handleMouseEnter&&e.handleMouseEnter(...i)),onMouseleave:l[23]||(l[23]=(...i)=>e.handleMouseLeave&&e.handleMouseLeave(...i)),onClick:l[24]||(l[24]=k((...i)=>e.toggleMenu&&e.toggleMenu(...i),["stop"]))},[se(c,{ref:"tooltipRef",visible:e.dropMenuVisible,placement:e.placement,teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"fallback-placements":["bottom-start","top-start","right","left"],effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,onShow:e.handleMenuEnter},{default:I(()=>[P("div",{class:"select-trigger",onMouseenter:l[20]||(l[20]=i=>e.inputHovering=!0),onMouseleave:l[21]||(l[21]=i=>e.inputHovering=!1)},[e.multiple?(C(),$("div",{key:0,ref:"tags",class:h(e.nsSelect.e("tags")),style:j(e.selectTagsStyle)},[e.collapseTags&&e.selected.length?(C(),$("span",{key:0,class:h([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[se(r,{closable:!e.selectDisabled&&!e.selected[0].isDisabled,size:e.collapseTagSize,hit:e.selected[0].hitState,type:e.tagType,"disable-transitions":"",onClose:l[0]||(l[0]=i=>e.deleteTag(i,e.selected[0]))},{default:I(()=>[P("span",{class:h(e.nsSelect.e("tags-text")),style:j(e.tagTextStyle)},U(e.selected[0].currentLabel),7)]),_:1},8,["closable","size","hit","type"]),e.selected.length>1?(C(),z(r,{key:0,closable:!1,size:e.collapseTagSize,type:e.tagType,"disable-transitions":""},{default:I(()=>[e.collapseTagsTooltip?(C(),z(c,{key:0,disabled:e.dropMenuVisible,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:e.teleported},{default:I(()=>[P("span",{class:h(e.nsSelect.e("tags-text"))},"+ "+U(e.selected.length-1),3)]),content:I(()=>[P("div",{class:h(e.nsSelect.e("collapse-tags"))},[(C(!0),$(il,null,Ml(e.selected.slice(1),(i,v)=>(C(),$("div",{key:v,class:h(e.nsSelect.e("collapse-tag"))},[(C(),z(r,{key:e.getValueKey(i),class:"in-tooltip",closable:!e.selectDisabled&&!i.isDisabled,size:e.collapseTagSize,hit:i.hitState,type:e.tagType,"disable-transitions":"",style:{margin:"2px"},onClose:S=>e.deleteTag(S,i)},{default:I(()=>[P("span",{class:h(e.nsSelect.e("tags-text")),style:j({maxWidth:e.inputWidth-75+"px"})},U(i.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"]))],2))),128))],2)]),_:1},8,["disabled","effect","teleported"])):(C(),$("span",{key:1,class:h(e.nsSelect.e("tags-text"))},"+ "+U(e.selected.length-1),3))]),_:1},8,["size","type"])):B("v-if",!0)],2)):B("v-if",!0),B(" <div> "),e.collapseTags?B("v-if",!0):(C(),z(Hl,{key:1,onAfterLeave:e.resetInputHeight},{default:I(()=>[P("span",{class:h([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(C(!0),$(il,null,Ml(e.selected,i=>(C(),z(r,{key:e.getValueKey(i),closable:!e.selectDisabled&&!i.isDisabled,size:e.collapseTagSize,hit:i.hitState,type:e.tagType,"disable-transitions":"",onClose:v=>e.deleteTag(v,i)},{default:I(()=>[P("span",{class:h(e.nsSelect.e("tags-text")),style:j({maxWidth:e.inputWidth-75+"px"})},U(i.currentLabel),7)]),_:2},1032,["closable","size","hit","type","onClose"]))),128))],2)]),_:1},8,["onAfterLeave"])),B(" </div> "),e.filterable?ye((C(),$("input",{key:2,ref:"input","onUpdate:modelValue":l[1]||(l[1]=i=>e.query=i),type:"text",class:h([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:j({marginLeft:e.prefixWidth&&!e.selected.length||e.tagInMultiLine?`${e.prefixWidth}px`:"",flexGrow:1,width:`${e.inputLength/(e.inputWidth-32)}%`,maxWidth:`${e.inputWidth-42}px`}),onFocus:l[2]||(l[2]=(...i)=>e.handleFocus&&e.handleFocus(...i)),onBlur:l[3]||(l[3]=(...i)=>e.handleBlur&&e.handleBlur(...i)),onKeyup:l[4]||(l[4]=(...i)=>e.managePlaceholder&&e.managePlaceholder(...i)),onKeydown:[l[5]||(l[5]=(...i)=>e.resetInputState&&e.resetInputState(...i)),l[6]||(l[6]=q(k(i=>e.navigateOptions("next"),["prevent"]),["down"])),l[7]||(l[7]=q(k(i=>e.navigateOptions("prev"),["prevent"]),["up"])),l[8]||(l[8]=q((...i)=>e.handleKeydownEscape&&e.handleKeydownEscape(...i),["esc"])),l[9]||(l[9]=q(k((...i)=>e.selectOption&&e.selectOption(...i),["stop","prevent"]),["enter"])),l[10]||(l[10]=q((...i)=>e.deletePrevTag&&e.deletePrevTag(...i),["delete"])),l[11]||(l[11]=q(i=>e.visible=!1,["tab"]))],onCompositionstart:l[12]||(l[12]=(...i)=>e.handleComposition&&e.handleComposition(...i)),onCompositionupdate:l[13]||(l[13]=(...i)=>e.handleComposition&&e.handleComposition(...i)),onCompositionend:l[14]||(l[14]=(...i)=>e.handleComposition&&e.handleComposition(...i)),onInput:l[15]||(l[15]=(...i)=>e.debouncedQueryChange&&e.debouncedQueryChange(...i))},null,46,Pt)),[[hn,e.query]]):B("v-if",!0)],6)):B("v-if",!0),se(b,{id:e.id,ref:"reference",modelValue:e.selectedLabel,"onUpdate:modelValue":l[16]||(l[16]=i=>e.selectedLabel=i),type:"text",placeholder:e.currentPlaceholder,name:e.name,autocomplete:e.autocomplete,size:e.selectSize,disabled:e.selectDisabled,readonly:e.readonly,"validate-event":!1,class:h([e.nsSelect.is("focus",e.visible)]),tabindex:e.multiple&&e.filterable?-1:void 0,onFocus:e.handleFocus,onBlur:e.handleBlur,onInput:e.debouncedOnInputChange,onPaste:e.debouncedOnInputChange,onCompositionstart:e.handleComposition,onCompositionupdate:e.handleComposition,onCompositionend:e.handleComposition,onKeydown:[l[17]||(l[17]=q(k(i=>e.navigateOptions("next"),["stop","prevent"]),["down"])),l[18]||(l[18]=q(k(i=>e.navigateOptions("prev"),["stop","prevent"]),["up"])),q(k(e.selectOption,["stop","prevent"]),["enter"]),q(e.handleKeydownEscape,["esc"]),l[19]||(l[19]=q(i=>e.visible=!1,["tab"]))]},yn({suffix:I(()=>[e.iconComponent&&!e.showClose?(C(),z(d,{key:0,class:h([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:I(()=>[(C(),z($l(e.iconComponent)))]),_:1},8,["class"])):B("v-if",!0),e.showClose&&e.clearIcon?(C(),z(d,{key:1,class:h([e.nsSelect.e("caret"),e.nsSelect.e("icon")]),onClick:e.handleClearClick},{default:I(()=>[(C(),z($l(e.clearIcon)))]),_:1},8,["class","onClick"])):B("v-if",!0)]),_:2},[e.$slots.prefix?{name:"prefix",fn:I(()=>[P("div",At,[H(e.$slots,"prefix")])])}:void 0]),1032,["id","modelValue","placeholder","name","autocomplete","size","disabled","readonly","class","tabindex","onFocus","onBlur","onInput","onPaste","onCompositionstart","onCompositionupdate","onCompositionend","onKeydown"])],32)]),content:I(()=>[se(g,null,{default:I(()=>[ye(se(y,{ref:"scrollbar",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:h([e.nsSelect.is("empty",!e.allowCreate&&Boolean(e.query)&&e.filteredOptionsCount===0)])},{default:I(()=>[e.showNewOption?(C(),z(p,{key:0,value:e.query,created:!0},null,8,["value"])):B("v-if",!0),H(e.$slots,"default")]),_:3},8,["wrap-class","view-class","class"]),[[fl,e.options.size>0&&!e.loading]]),e.emptyText&&(!e.allowCreate||e.loading||e.allowCreate&&e.options.size===0)?(C(),$(il,{key:0},[e.$slots.empty?H(e.$slots,"empty",{key:0}):(C(),$("p",{key:1,class:h(e.nsSelect.be("dropdown","empty"))},U(e.emptyText),3))],64)):B("v-if",!0)]),_:3})]),_:3},8,["visible","placement","teleported","popper-class","effect","transition","persistent","onShow"])],34)),[[T,e.handleClose,e.popperPaneRef]])}var Bt=ce($t,[["render",Dt],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);const zt=te({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:{type:Boolean,default:!1}},setup(e){const l=ne("select"),t=N(!0),s=dl(),u=N([]);Ql(Zl,ze(be({},cl(e))));const a=Ae(Ve);pl(()=>{u.value=r(s.subTree)});const r=d=>{const b=[];return Array.isArray(d.children)&&d.children.forEach(p=>{var y;p.type&&p.type.name==="ElOption"&&p.component&&p.component.proxy?b.push(p.component.proxy):(y=p.children)!=null&&y.length&&b.push(...r(p))}),b},{groupQueryChange:c}=De(a);return K(c,()=>{t.value=u.value.some(d=>d.visible===!0)},{flush:"post"}),{visible:t,ns:l}}});function Vt(e,l,t,s,u,a){return ye((C(),$("ul",{class:h(e.ns.be("group","wrap"))},[P("li",{class:h(e.ns.be("group","title"))},U(e.label),3),P("li",null,[P("ul",{class:h(e.ns.b("group"))},[H(e.$slots,"default")],2)])],2)),[[fl,e.visible]])}var _l=ce(zt,[["render",Vt],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);const Ut=ul(Bt,{Option:ml,OptionGroup:_l}),jt=Ul(ml);Ul(_l);export{jt as E,Ut as a,Qt as b,Gt as c,St as d,Kl as i,Yl as t};
