import{d as W,a as u,r as Q,G as X,o as Y,a0 as D,w as o,u as _,ac as Z,n as r,bJ as ee,j as E,aj as B,f as l,e as w,t as g,bK as ae,m as k,a1 as te,bk as le,bL as oe,c as ne,a_ as se,V as ie,W as ue,g as re}from"./index.3ca1645a.js";import{v as me}from"./el-loading.274a2446.js";import{_ as de}from"./TableCard.cbf3a947.js";import{E as ce,a as pe}from"./el-form-item.db66e866.js";import{E as _e,a as f}from"./el-notification.56fc006a.js";import"./el-tag.c1c1dc80.js";import{E as ge,a as fe}from"./el-select.8fb73295.js";import{E as ve}from"./el-scrollbar.5cf2b49c.js";import{_ as be}from"./UploadFile.8cb5d594.js";import{E as ye,a as Ee}from"./el-table-column.bd304a43.js";import"./el-tooltip.586473e3.js";import{E as De}from"./el-image-viewer.c72e95dc.js";import{E as we}from"./el-message-box.7c334b5f.js";import"./el-overlay.1588578f.js";import{c as Se,u as Fe,s as he,g as Ce,d as $e}from"./summoner.2119088d.js";import{_ as Be}from"./plugin-vue_export-helper.21dcd24c.js";import"./_arrayPush.ab7ef295.js";import"./refs.293d8cc3.js";import"./validator.6fdf4b3e.js";import"./debounce.eb328bbe.js";/* empty css                */import"./browser.bcd0aa3c.js";const ke={style:{"font-weight":"bold"}},Te={class:"option"},Ve=W({setup(Ue){const{proxy:S}=re(),{$lodash:T}=S,m=u(!1),d=u(!1),F=u([]),c=u(!1),v=Q({pageNum:1,pageSize:10}),h=u(0);let i={pageNum:1,pageSize:10,sortItem:"rank",orderType:"ascending"};const n=u({}),b=u(""),V=X(()=>`${r().uploadPath}/inscription`),U=e=>{b.value=e,n.value.icon=e},A=async e=>{i=Object.assign({},i,e),await p(i)},N=async e=>{d.value=!0,m.value=!0,b.value="",n.value={desc:[""]}},x=async()=>{try{c.value=!0;let e={};d.value?e=await Se(n.value):e=await Fe(n.value._id,n.value),e.status===200&&f({duration:r().tipDurationS,type:"success",message:e.data.message}),m.value=!1,await p(i)}catch(e){console.log(e),f({duration:r().tipDurationS,type:"success",message:e.message})}finally{c.value=!1}},I=async e=>{i.orderType=e.order,await p(i)},H=async e=>{m.value=!0,d.value=!1,b.value=e.img,n.value=T.cloneDeep(e),await ue(),setTimeout(()=>{S.$refs.nameEl.focus()},50)},z=async e=>{we.confirm("\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u94ED\u6587\u5417?","\u5220\u9664\u94ED\u6587",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(async a=>{const s=await $e(e._id);s.status===200?(f({duration:r().tipDurationS,type:"success",message:`${e.name} ${s.data.message}`}),await p(i)):f({duration:r().tipDurationS,type:"error",message:s.data.message})}).catch(a=>{console.log(a)})},p=async e=>{try{c.value=!0;let a={};e!=null&&e.name?a=await he(e):a=await Ce(e),F.value=a==null?void 0:a.data.data,h.value=a==null?void 0:a.data.total}catch(a){f({duration:r().tipDurationS,type:"error",message:a.message})}finally{setTimeout(()=>{c.value=!1},300)}};return Y(async()=>{await p(i)}),(e,a)=>{const s=ye,j=De,C=ve,L=Ee,$=_e,y=ce,O=be,M=ge,P=fe,R=pe,q=de,G=ee("permission"),J=me;return E(),D(q,{showSearch:"",pagination:_(v),"onUpdate:pagination":a[3]||(a[3]=t=>Z(v)?v.value=t:v=t),visible:m.value,"onUpdate:visible":a[4]||(a[4]=t=>m.value=t),isAdd:d.value,totalNum:h.value,btnAdd:e.$t("btn.addSummoner"),dialogTitle:d.value?e.$t("btn.addSummoner"):e.$t("btn.editSummoner"),onReloadData:A,onAddDataItem:N,onSaveContent:x},{table:o(()=>[B((E(),D(L,{border:"","empty-text":"\u6682\u65E0\u53EC\u5524\u5E08\u6280\u80FD!",data:F.value,"default-sort":{prop:"rank",order:"ascending"},onSortChange:I},{default:o(()=>[l(s,{align:"center",type:"index",label:e.$t("tableH.orderNum"),width:"70"},null,8,["label"]),l(s,{align:"center",width:"80px",label:e.$t("tableH.name"),prop:"name"},null,8,["label"]),l(s,{width:"90px",sortable:"custom",label:e.$t("tableH.grade"),align:"center",prop:"rank"},null,8,["label"]),l(s,{"class-name":"img-box",width:"100px",label:e.$t("tableH.image"),align:"center",prop:"img"},{default:o(t=>[l(j,{lazy:"",class:"item-icon",src:t.row.img},null,8,["src"])]),_:1},8,["label"]),l(s,{"min-width":"250px",label:e.$t("tableH.desc"),prop:"description"},{default:o(t=>[w("span",ke,g(t.row.description.split("CD\uFF1A").at(0))+"CD\uFF1A",1),w("span",null,g(t.row.description.split("CD\uFF1A").slice(1).join("")),1)]),_:1},8,["label"]),l(s,{label:e.$t("tableH.operation"),align:"center",width:"150"},{default:o(t=>[w("div",Te,[l(C,{size:"small",type:"primary",plain:"",icon:_(ae),onClick:K=>H(t.row)},{default:o(()=>[k(g(e.$t("btn.edit"))+" / "+g(e.$t("btn.view")),1)]),_:2},1032,["icon","onClick"]),B((E(),D(C,{style:te({"margin-top":_(le)().valueHasPermission(["admin"])?"10px":""}),size:"small",type:"danger",plain:"",icon:_(oe),onClick:K=>z(t.row)},{default:o(()=>[k(g(e.$t("btn.delete")),1)]),_:2},1032,["style","icon","onClick"])),[[G,["admin"]]])])]),_:1},8,["label"])]),_:1},8,["data"])),[[J,c.value]])]),dialog:o(()=>[l(R,{class:"dialog-from",model:n.value,"label-width":"70px","label-position":"left"},{default:o(()=>[l(y,{label:"\u6280\u80FD\u540D\u79F0"},{default:o(()=>[l($,{clearable:"",ref:"nameEl",modelValue:n.value.name,"onUpdate:modelValue":a[0]||(a[0]=t=>n.value.name=t),placeholder:"\u8BF7\u8F93\u5165\u6280\u80FD\u540D\u79F0!"},null,8,["modelValue"])]),_:1}),l(y,{label:"\u6280\u80FD\u56FE\u6807"},{default:o(()=>[l(O,{class:"icon-upload",actionUrl:_(V),imageUrl:b.value,onUploadSuccess:U},null,8,["actionUrl","imageUrl"])]),_:1}),l(y,{label:"\u89E3\u9501\u7B49\u7EA7"},{default:o(()=>[l(P,{modelValue:n.value.rank,"onUpdate:modelValue":a[1]||(a[1]=t=>n.value.rank=t),placeholder:"Select"},{default:o(()=>[(E(),ne(ie,null,se(30,t=>l(M,{key:t,label:t,value:t},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1}),l(y,{label:"\u6280\u80FD\u8BF4\u660E"},{default:o(()=>[l($,{clearable:"",type:"textarea",modelValue:n.value.description,"onUpdate:modelValue":a[2]||(a[2]=t=>n.value.description=t),placeholder:"\u8BF7\u8F93\u5165\u6280\u80FD\u63CF\u8FF0!"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["pagination","visible","isAdd","totalNum","btnAdd","dialogTitle"])}}});var aa=Be(Ve,[["__scopeId","data-v-368f3d40"]]);export{aa as default};