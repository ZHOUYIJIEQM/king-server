import{d as R,a as _,n as y,o as X,aE as Y,a0 as F,w as l,bJ as Z,j as i,aj as k,f as a,e as r,c as v,a_ as I,V as x,u as h,bK as ee,m as B,t as f,a1 as te,bk as ae,bL as le,bM as oe,a$ as se,b0 as ne,g as ue,W as ie}from"./index.3ca1645a.js";import{l as A,v as re}from"./el-loading.274a2446.js";import{_ as de}from"./TableCard.cbf3a947.js";/* empty css                */import{_ as ce}from"./CardItem.d01275e3.js";import{_ as me}from"./UploadFile.8cb5d594.js";import{E as pe,a as C}from"./el-notification.56fc006a.js";import{E as _e,a as ve}from"./el-table-column.bd304a43.js";import"./el-tag.c1c1dc80.js";import"./el-tooltip.586473e3.js";import{E as fe}from"./el-scrollbar.5cf2b49c.js";import{E as be,a as ge}from"./el-form-item.db66e866.js";import{_ as Ee}from"./plugin-vue_export-helper.21dcd24c.js";import"./_arrayPush.ab7ef295.js";import"./el-overlay.1588578f.js";import"./validator.6fdf4b3e.js";import"./el-select.8fb73295.js";import"./debounce.eb328bbe.js";import"./refs.293d8cc3.js";function ye(){return A({url:"/ad"})}function Fe(s){return A({url:"/ad",method:"post",data:s})}function he(s,c){return A({url:`/ad/${s}`,method:"put",data:c})}function Ae(s){return A({url:`/ad/${s}`,method:"delete"})}const De=s=>(se("data-v-3752b66f"),s=s(),ne(),s),$e={class:"expand"},Ce={class:"expand-item"},we={style:{"font-size":"16px","font-weight":"bold","margin-bottom":"18px"}},Se=["src"],ke=["href"],Ie={key:1,class:"text eli"},xe={class:"option"},Be={class:"scroll-box"},Ve={class:"card-item"},Te=De(()=>r("div",{style:{"margin-top":"10px"}},"\u6DFB\u52A0\u4E00\u4E2A\u8F6E\u64AD\u56FE",-1)),Ue=R({setup(s){const{proxy:c}=ue(),{$lodash:V}=c,m=_(!1),p=_(!1),w=_([]),b=_(!1),o=_({}),T=`${y().uploadPath}/advertisement`,U=(e,u,g)=>{u[g]=e},z=async e=>{p.value=!1,m.value=!0,o.value=V.cloneDeep(e),await ie(),setTimeout(()=>{c.$refs.nameEl.focus()},100)},H=async e=>{(await Ae(e._id)).status===200&&C({duration:y().tipDurationS,type:"success",message:"\u5220\u9664\u6210\u529F!"}),await D()},N=async()=>{p.value=!0,m.value=!0,o.value={items:[]},setTimeout(()=>{c.$refs.nameEl.focus()},100)},L=async()=>{b.value=!0,m.value=!1;let e={};p.value?(e=await Fe(o.value),e.status===200&&C({duration:y().tipDurationS,title:"Success",message:"\u6DFB\u52A0\u5206\u7C7B\u6210\u529F!",type:"success"})):(e=await he(o.value._id,o.value),e.status===200&&C({duration:y().tipDurationS,title:"Success",message:"\u66F4\u65B0\u6210\u529F!",type:"success"})),await D()},P=async e=>{e.push({img:"",url:""})},D=async()=>{b.value=!0;const e=await ye();w.value=e.data,b.value=!1},j=async()=>{setTimeout(()=>{o.value={}},500)};return X(async()=>{await D()}),(e,u)=>{const g=be,M=ge,E=_e,$=fe,J=ve,S=pe,K=me,W=ce,q=Y,G=de,O=Z("permission"),Q=re;return i(),F(G,{isAdd:p.value,btnAdd:e.$t("btn.addAds"),dialogTitle:p.value?e.$t("btn.addAds"):e.$t("btn.editAds"),visible:m.value,"onUpdate:visible":u[2]||(u[2]=t=>m.value=t),onAddDataItem:N,onSaveContent:L,onDialogClosed:j},{table:l(()=>[k((i(),F(J,{"empty-text":"\u6682\u65E0\u5E7F\u544A!",border:"",data:w.value},{default:l(()=>[a(E,{"class-name":"expand",type:"expand",label:e.$t("tableH.expand"),width:"85"},{default:l(t=>[r("div",$e,[(i(!0),v(x,null,I(t.row.items,(n,d)=>(i(),v("div",Ce,[r("div",we,f(`\u8F6E\u64AD\u56FE${d+1}`),1),a(M,null,{default:l(()=>[a(g,{label:"\u8F6E\u64AD\u56FE\u7247:"},{default:l(()=>[r("img",{class:"banner-img",src:n.img,alt:""},null,8,Se)]),_:2},1024),a(g,{label:"\u8DF3\u8F6C\u5730\u5740:"},{default:l(()=>[n.url.length?(i(),v("a",{key:0,class:"eli",target:"_blank",href:n.url},f(n.url),9,ke)):(i(),v("div",Ie,"\u6CA1\u6709\u5BF9\u5E94\u8DF3\u8F6C\u5730\u5740!"))]),_:2},1024)]),_:2},1024)]))),256))])]),_:1},8,["label"]),a(E,{align:"center",type:"index",label:e.$t("tableH.orderNum"),width:"70"},null,8,["label"]),a(E,{"min-width":"180px",label:e.$t("tableH.category"),prop:"name"},null,8,["label"]),a(E,{label:e.$t("tableH.operation"),align:"center",width:"180"},{default:l(t=>[r("div",xe,[a($,{size:"small",type:"primary",plain:"",icon:h(ee),onClick:n=>z(t.row)},{default:l(()=>[B(f(e.$t("btn.edit"))+" / "+f(e.$t("btn.view")),1)]),_:2},1032,["icon","onClick"]),k((i(),F($,{size:"small",style:te({"margin-top":h(ae)().valueHasPermission(["admin"])?"10px":""}),type:"danger",plain:"",icon:h(le),onClick:n=>H(t.row)},{default:l(()=>[B(f(e.$t("btn.delete")),1)]),_:2},1032,["style","icon","onClick"])),[[O,["admin"]]])])]),_:1},8,["label"])]),_:1},8,["data"])),[[Q,b.value]])]),dialog:l(()=>[r("div",Be,[a(S,{style:{"margin-bottom":"15px"},clearable:"",ref:"nameEl",modelValue:o.value.name,"onUpdate:modelValue":u[0]||(u[0]=t=>o.value.name=t),placeholder:"\u8BF7\u8F93\u5165\u5E7F\u544A\u8F6E\u64AD\u540D!"},null,8,["modelValue"]),(i(!0),v(x,null,I(o.value.items,(t,n)=>(i(),F(W,{class:"card-item",key:n,title:`\u8F6E\u64AD${n+1}`,onCloseItem:d=>o.value.items.splice(n,1)},{default:l(()=>[a(K,{class:"hero-avatar",actionUrl:T,imageUrl:t.img,onUploadSuccess:d=>U(d,t,"img")},null,8,["imageUrl","onUploadSuccess"]),a(S,{style:{"margin-top":"8px"},clearable:"",class:"eli",modelValue:t.url,"onUpdate:modelValue":d=>t.url=d,placeholder:"\u8BF7\u8F93\u5165\u5E7F\u544A\u8DF3\u8F6C\u5730\u5740!"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["title","onCloseItem"]))),128)),r("div",Ve,[a($,{class:"button",text:"",onClick:u[1]||(u[1]=t=>P(o.value.items))},{default:l(()=>[a(q,{size:25,class:"plus"},{default:l(()=>[a(h(oe))]),_:1}),Te]),_:1})])])]),_:1},8,["isAdd","btnAdd","dialogTitle","visible"])}}});var tt=Ee(Ue,[["__scopeId","data-v-3752b66f"]]);export{tt as default};