(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04adee80"],{"2e88":function(t,e,i){t.exports=i.p+"img/yunCircle.7cdaad32.png"},5125:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"yun-village-page"},[e("Navbar",{ref:"navbar",staticClass:"yun-village-navbar",on:{clickLeft:t.toggleMenu},scopedSlots:t._u([{key:"left",fn:function(){return[e("i",{staticClass:"iconfont icon-weibiaoti12"})]},proxy:!0},{key:"middle",fn:function(){return[e("div",{staticClass:"nav-flag"},t._l(t.flagList,(function(i,o){return e("div",{key:o,staticClass:"flag-item",class:{active:t.flagActive===o},on:{click:function(e){return t.clickFlag(o)}}},[t._v(t._s(i))])})),0)]},proxy:!0},{key:"right",fn:function(){return[e("i",{staticClass:"iconfont icon-zengjia"})]},proxy:!0}])}),e("div",{staticClass:"yun-village-content"},[e("div",{directives:[{name:"show",rawName:"v-show",value:0===t.flagActive,expression:"flagActive === 0"}],staticClass:"yun-focus"},[t._m(0),e("img",{staticClass:"tip-img",attrs:{src:i("2e88"),alt:""}})]),e("div",{directives:[{name:"show",rawName:"v-show",value:1===t.flagActive,expression:"flagActive === 1"}],staticClass:"video-recommend"},t._l(t.recommendVideo,(function(t,i){return e("div",{key:i,staticClass:"video-item two-column"},[e("YunRcmdMv",{attrs:{rcmdMv:t}})],1)})),0)])],1)},n=[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"yun-circle"},[e("div",{staticClass:"title"},[t._v("我的云圈 "),e("span",[t._v("(还没有加入云圈)")])]),e("div",{staticClass:"go-circle"},[e("span",[t._v("去云圈广场逛逛")]),e("span",{staticClass:"iconfont icon-jiantou"})])])}],a=(i("14d9"),i("e6da")),s=i("5a84"),l=i("4ec3"),c={mixins:[a["a"],s["a"]],components:{Navbar:()=>i.e("chunk-211cfdb4").then(i.bind(null,"d178")),Loading:()=>i.e("chunk-04655e5c").then(i.bind(null,"3a5e")),YunRcmdMv:()=>i.e("chunk-2f6fd9f2").then(i.bind(null,"751e"))},data(){return{recommendVideo:[],flagList:["关注","推荐"],flagScrollT:{0:0,1:0},flagActive:1,pageNum:0,loading:!0}},created(){this.area=["内地","港台","欧美","日本","韩国"].sort(()=>Math.random()>.5?1:-1)[0],this.getData()},activated(){window.addEventListener("scroll",this.handlerScroll)},deactivated(){window.removeEventListener("scroll",this.handlerScroll)},methods:{async getData(){try{if(this.$store.commit("changeLoading",this.loading),this.loginStatus){let t=await Object(l["I"])(this.pageNum);this.recommendVideo.push(...t.datas.map(t=>({id:t.data.vid,duration:t.data.durationms,name:t.data.title,img:t.data.coverUrl,url:t.data.urlInfo.url,tag:t.data.videoGroup&&t.data.videoGroup[0].name,playCount:t.data.playTime,praisedCount:t.data.praisedCount}))),this.pageNum++}else{let t=20,e=await Object(l["i"])({area:this.area,offset:this.pageNum*t,limit:t});this.recommendVideo.push(...e.data.map(t=>({id:t.id,duration:t.duration,name:t.name,playCount:t.playCount,img:t.cover,tag:t.artistName}))),this.pageNum++}this.loading=!1}catch(t){console.log(t)}finally{this.$store.commit("changeLoading",!1)}},clickFlag(t){this.flagScrollT[this.flagActive]=this.getScrollTop(),this.flagActive=t,this.$nextTick(()=>{window.scrollTo(0,this.flagScrollT[this.flagActive])})},handlerScroll(){let t=document.body.scrollHeight||document.documentElement.scrollHeight,e=this.getScrollTop(),i=this.getClientHeight();e+i>t-300&&!this.loading&&1===this.flagActive&&(this.loading=!0,this.getData())}},watch:{loginStatus(t){this.recommendVideo=[],this.getData()}}},r=c,d=(i("a020"),i("69b2"),i("2877")),u=Object(d["a"])(r,o,n,!1,null,"5c472326",null);e["default"]=u.exports},"5a84":function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));i("14d9"),i("4ec3");let o={data(){return{}},computed:{loginStatus(){return this.$store.getters.loginStatus},playerPlayList(){return this.$store.getters.playList},adoEl(){return this.$store.getters.adoEl},songId(){return this.$store.getters.songId}},methods:{goLogin(){!this.loginStatus&&this.$router.push({name:"Login"})},logout(){this.$store.dispatch("userLogout")},toggleMenu(){this.$store.commit("toggleMenu")},goBack(){let t=this.$store.getters.historyList;t.length>1?this.$router.go(-1):this.$router.push({name:"Find"})},clickMenu(){console.log("点击了菜单")},goSearch(){this.$router.push({name:"Search"})},toTop(){window.scroll({top:0,behavior:"smooth"})},goPlaylist(t){console.log("点击歌单:",t),this.$router.push({name:"PlayListDetail",params:{id:t}})},async clickSong(t){this.$store.commit("changeSongId",String(t));let e=this.$store.getters.historyList;e.length<=1&&!window.location.href.includes("?player=show")&&(window.location.href+="?player=show"),this.$store.commit("changeShowPlayer",!0)},clickMvIcon(t,e="mv"){this.$store.commit("changeMvId",Number(t)),this.$router.push({name:"MvPlayer",params:{id:t},query:{type:e}})},toast(t,e=1500){this.$toast({message:t,className:"playerToast",duration:e,position:"bottom"})},copyText(t){let e=document.createElement("input");e.value=t,e.style.position="absolute",e.style.left="-10000px",e.style.top="-10000px",document.body.appendChild(e),e.select(),document.execCommand("copy"),this.toast("复制成功! 快和小伙伴们分享吧!"),document.body.removeChild(e)},getScrollTop(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},getClientHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0},getScrollHeight(){return document.body.scrollHeight||document.documentElement.scrollHeight}}}},"69b2":function(t,e,i){"use strict";i("d94b")},a020:function(t,e,i){"use strict";i("b3c4")},b3c4:function(t,e,i){},d94b:function(t,e,i){},e6da:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));let o={data(){return{scrollH:0}},methods:{getScrollTop(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},getClientHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0}},beforeRouteEnter(t,e,i){i(t=>{t.$nextTick(()=>{window.scrollTo(0,t.scrollH)})})},beforeRouteLeave(t,e,i){this.scrollH=this.getScrollTop(),i()}}}}]);
//# sourceMappingURL=chunk-04adee80.2005f10d.js.map