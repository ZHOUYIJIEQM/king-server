import{d as v,a as f,u as y,N as g,r as C,m as h,o as c,c as u,h as e,e as s,t as n,p as _,q as D,s as k,_ as x}from"./index.6ad1a6eb.js";import{r as E}from"./resource.f31eec73.js";import"./index.2b0276cf.js";const I=a=>(D("data-v-d5654ef1"),a=a(),k(),a),V={class:"video-detail-page"},B={class:"navbar"},$={key:0,class:"detail-nav eli"},b={class:"title eli"},A={class:"vdo-content"},N=["src"],S=I(()=>e("span",{class:"play-icon"},null,-1)),w={key:0,class:"time"},F={class:"vdo-info"},R=["src"],T={class:"name"},j={class:"play-count"},q={name:"VideoDetailExclude"},z=v({...q,setup(a){const r=f(),i=y(),p=g(),o=C({});async function m(l){let t=await E.getResources(l);o.value=t.data}return h(async()=>{await m(Object.assign({id:r.params.videoId},{type:"video"}))}),(l,t)=>(c(),u("div",V,[e("div",B,[e("span",{onClick:t[0]||(t[0]=d=>s(i).push({name:"home"}))},"\u738B\u8005\u8363\u8000"),e("span",{style:{"font-size":"12px"},onClick:t[1]||(t[1]=d=>s(i).replace({name:"HeroList"}))},"\u66F4\u591A\u82F1\u96C4>")]),s(o).name?(c(),u("div",$,[e("div",{class:"back",onClick:t[2]||(t[2]=d=>s(i).go(-1))},"<"),e("div",b,n(s(o).name),1)])):_("",!0),e("div",A,[e("div",{class:"vdo-box",onClick:t[3]||(t[3]=d=>s(p).proxy.$toast({msg:"\u65E0\u6CD5\u64AD\u653E, \u89C6\u9891\u5730\u5740\u4E0D\u53EF\u7528!",className:"error",duration:2e3}))},[e("img",{src:s(o).img,alt:""},null,8,N),S,s(o).iTime?(c(),u("span",w,n(s(o).iTime),1)):_("",!0)]),e("div",F,[e("img",{src:s(o).img,alt:"",class:"pic"},null,8,R),e("div",T,[e("p",null,n(s(o).name),1),e("p",j,"\u64AD\u653E\u6B21\u6570: "+n(s(o).playCount),1)])])])]))}});const O=x(z,[["__scopeId","data-v-d5654ef1"]]);export{O as default};
