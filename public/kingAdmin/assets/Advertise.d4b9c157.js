import{d as R,a as _,n as F,o as X,av as Y,a0 as E,w as l,bJ as Z,j as i,at as k,f as a,e as d,c as v,a_ as I,V as x,u as h,bK as ee,m as B,t as f,a1 as te,bk as ae,bL as le,bM as se,a$ as oe,b0 as ne,g as ue,W as ie}from"./index.672c262c.js";import{r as A,v as de}from"./el-loading.dbcf95cb.js";import{E as re,a as ce,_ as me}from"./el-table-column.7a12c849.js";/* empty css                */import{_ as pe}from"./CardItem.3ea13313.js";import{_ as _e}from"./UploadFile.d0bdbc92.js";import{a as ve,E as fe,b as C}from"./el-notification.ae329e13.js";import"./el-select.bfa2f570.js";import"./el-tooltip.586473e3.js";import{E as be,a as ge}from"./el-form-item.c60c539b.js";import{_ as ye}from"./plugin-vue_export-helper.21dcd24c.js";import"./validator.e9ac4e08.js";import"./el-overlay.1f147f42.js";import"./refs.a8fe6481.js";function Fe(){return A({url:"/ad"})}function Ee(o){return A({url:"/ad",method:"post",data:o})}function he(o,c){return A({url:`/ad/${o}`,method:"put",data:c})}function Ae(o){return A({url:`/ad/${o}`,method:"delete"})}const De=o=>(oe("data-v-3752b66f"),o=o(),ne(),o),$e={class:"expand"},Ce={class:"expand-item"},we={style:{"font-size":"16px","font-weight":"bold","margin-bottom":"18px"}},Se=["src"],ke=["href"],Ie={key:1,class:"text eli"},xe={class:"option"},Be={class:"scroll-box"},Ve={class:"card-item"},Te=De(()=>d("div",{style:{"margin-top":"10px"}},"\u6DFB\u52A0\u4E00\u4E2A\u8F6E\u64AD\u56FE",-1)),Ue=R({setup(o){const{proxy:c}=ue(),{$lodash:V}=c,m=_(!1),p=_(!1),w=_([]),b=_(!1),s=_({}),T=`${F().uploadPath}/advertisement`,U=(e,u,g)=>{u[g]=e},z=async e=>{p.value=!1,m.value=!0,s.value=V.cloneDeep(e),await ie(),setTimeout(()=>{c.$refs.nameEl.focus()},100)},H=async e=>{(await Ae(e._id)).status===200&&C({duration:F().tipDurationS,type:"success",message:"\u5220\u9664\u6210\u529F!"}),await D()},N=async()=>{p.value=!0,m.value=!0,s.value={items:[]},setTimeout(()=>{c.$refs.nameEl.focus()},100)},L=async()=>{b.value=!0,m.value=!1;let e={};p.value?(e=await Ee(s.value),e.status===200&&C({duration:F().tipDurationS,title:"Success",message:"\u6DFB\u52A0\u5206\u7C7B\u6210\u529F!",type:"success"})):(e=await he(s.value._id,s.value),e.status===200&&C({duration:F().tipDurationS,title:"Success",message:"\u66F4\u65B0\u6210\u529F!",type:"success"})),await D()},P=async e=>{e.push({img:"",url:""})},D=async()=>{b.value=!0;const e=await Fe();w.value=e.data,b.value=!1},M=async()=>{setTimeout(()=>{s.value={}},500)};return X(async()=>{await D()}),(e,u)=>{const g=be,j=ge,y=re,$=ve,J=ce,S=fe,K=_e,W=pe,q=Y,G=me,O=Z("permission"),Q=de;return i(),E(G,{isAdd:p.value,btnAdd:e.$t("btn.addAds"),dialogTitle:p.value?e.$t("btn.addAds"):e.$t("btn.editAds"),visible:m.value,"onUpdate:visible":u[2]||(u[2]=t=>m.value=t),onAddDataItem:N,onSaveContent:L,onDialogClosed:M},{table:l(()=>[k((i(),E(J,{"empty-text":"\u6682\u65E0\u5E7F\u544A!",border:"",data:w.value},{default:l(()=>[a(y,{"class-name":"expand",type:"expand",label:e.$t("tableH.expand"),width:"85"},{default:l(t=>[d("div",$e,[(i(!0),v(x,null,I(t.row.items,(n,r)=>(i(),v("div",Ce,[d("div",we,f(`\u8F6E\u64AD\u56FE${r+1}`),1),a(j,null,{default:l(()=>[a(g,{label:"\u8F6E\u64AD\u56FE\u7247:"},{default:l(()=>[d("img",{class:"banner-img",src:n.img,alt:""},null,8,Se)]),_:2},1024),a(g,{label:"\u8DF3\u8F6C\u5730\u5740:"},{default:l(()=>[n.url.length?(i(),v("a",{key:0,class:"eli",target:"_blank",href:n.url},f(n.url),9,ke)):(i(),v("div",Ie,"\u6CA1\u6709\u5BF9\u5E94\u8DF3\u8F6C\u5730\u5740!"))]),_:2},1024)]),_:2},1024)]))),256))])]),_:1},8,["label"]),a(y,{align:"center",type:"index",label:e.$t("tableH.orderNum"),width:"70"},null,8,["label"]),a(y,{"min-width":"180px",label:e.$t("tableH.category"),prop:"name"},null,8,["label"]),a(y,{label:e.$t("tableH.operation"),align:"center",width:"180"},{default:l(t=>[d("div",xe,[a($,{size:"small",type:"primary",plain:"",icon:h(ee),onClick:n=>z(t.row)},{default:l(()=>[B(f(e.$t("btn.edit"))+" / "+f(e.$t("btn.view")),1)]),_:2},1032,["icon","onClick"]),k((i(),E($,{size:"small",style:te({"margin-top":h(ae)().valueHasPermission(["admin"])?"10px":""}),type:"danger",plain:"",icon:h(le),onClick:n=>H(t.row)},{default:l(()=>[B(f(e.$t("btn.delete")),1)]),_:2},1032,["style","icon","onClick"])),[[O,["admin"]]])])]),_:1},8,["label"])]),_:1},8,["data"])),[[Q,b.value]])]),dialog:l(()=>[d("div",Be,[a(S,{style:{"margin-bottom":"15px"},clearable:"",ref:"nameEl",modelValue:s.value.name,"onUpdate:modelValue":u[0]||(u[0]=t=>s.value.name=t),placeholder:"\u8BF7\u8F93\u5165\u5E7F\u544A\u8F6E\u64AD\u540D!"},null,8,["modelValue"]),(i(!0),v(x,null,I(s.value.items,(t,n)=>(i(),E(W,{class:"card-item",key:n,title:`\u8F6E\u64AD${n+1}`,onCloseItem:r=>s.value.items.splice(n,1)},{default:l(()=>[a(K,{class:"hero-avatar",actionUrl:T,imageUrl:t.img,onUploadSuccess:r=>U(r,t,"img")},null,8,["imageUrl","onUploadSuccess"]),a(S,{style:{"margin-top":"8px"},clearable:"",class:"eli",modelValue:t.url,"onUpdate:modelValue":r=>t.url=r,placeholder:"\u8BF7\u8F93\u5165\u5E7F\u544A\u8DF3\u8F6C\u5730\u5740!"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["title","onCloseItem"]))),128)),d("div",Ve,[a($,{class:"button",text:"",onClick:u[1]||(u[1]=t=>P(s.value.items))},{default:l(()=>[a(q,{size:25,class:"plus"},{default:l(()=>[a(h(se))]),_:1}),Te]),_:1})])])]),_:1},8,["isAdd","btnAdd","dialogTitle","visible"])}}});var Re=ye(Ue,[["__scopeId","data-v-3752b66f"]]);export{Re as default};
