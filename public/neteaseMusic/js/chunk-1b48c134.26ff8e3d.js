(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b48c134","chunk-211cfdb4"],{"0480":function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t._self._c;t._self._setupProxy;return s("div",{ref:"dailyList",staticClass:"daily-playlist-page"},[s("Navbar",{ref:"navbar",staticClass:"navbar",on:{clickLeft:t.goBack},scopedSlots:t._u([{key:"left",fn:function(){return[s("div",{staticClass:"icon"},[s("i",{staticClass:"iconfont icon-fanhui"})])]},proxy:!0},{key:"middle",fn:function(){return[s("div",[t._v(t._s(t.playlistName))])]},proxy:!0},{key:"background",fn:function(){return[t.dailySongs.length?s("div",{ref:"navbarBg",staticClass:"navbar-bg bg-outer"},[s("div",{staticClass:"bg-inner",style:{"background-image":"url("+t.dailySongs[0].img+")"}})]):t._e()]},proxy:!0}])}),s("div",{staticClass:"top"},[s("div",{staticClass:"daily-info"},[s("div",{staticClass:"date"},[s("span",{staticClass:"day"},[t._v(t._s(t.currentDay))]),s("span",[t._v("/")]),s("span",[t._v(t._s(t.currentMonth))])]),t._m(0)]),t.dailySongs.length?s("div",{staticClass:"top-bg bg-outer"},[s("div",{staticClass:"bg-inner",style:{"background-image":"url("+t.dailySongs[0].img+")"}})]):t._e()]),s("div",{ref:"playlist",staticClass:"playlist-content"},[s("van-sticky",{attrs:{"offset-top":"0.5rem"}},[s("div",{staticClass:"playlist-title"},[s("i",{staticClass:"iconfont icon-bofang1"}),s("span",{staticClass:"title-text",on:{click:t.playAll}},[t._v("播放全部")]),s("span",{staticClass:"title-icon"},[s("i",{staticClass:"iconfont icon-xiazai1"})])])]),s("div",{staticClass:"playlist"},t._l(t.dailySongs,(function(t,i){return s("div",{key:i,staticClass:"list-item"},[s("SongInfo",{attrs:{songInfo:t}})],1)})),0)],1)],1)},a=[function(){var t=this,s=t._self._c;t._self._setupProxy;return s("div",{staticClass:"recommend-text"},[s("span",[t._v("历史推荐")]),t._v(" 查看今日运势 > ")])}],n=i("5a84"),o=i("4ec3"),l=i("d178"),c=function(){var t=this,s=t._self._c;return s("div",{staticClass:"songInfo-comp",on:{click:function(s){return t.clickSong(t.songInfo.id)}}},[s("div",{staticClass:"img-box"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.songInfo.img+"?param=300y300",expression:"songInfo.img+'?param=300y300'"}],attrs:{alt:""}})]),s("div",{staticClass:"song-info"},[s("div",{staticClass:"name text-eli"},[s("span",{staticClass:"first"},[t._v(t._s(t.songInfo.name))]),t.songInfo.secName?s("span",{staticClass:"sec"},[t._v(" ("+t._s(t.songInfo.secName)+")")]):t._e()]),s("div",{staticClass:"artists text-eli"},[t.songInfo.sq?s("span",{staticClass:"tag",attrs:{lang:""}},[t._v("SQ")]):t._e(),t.songInfo.reason?s("span",{staticClass:"reason"},[t._v(t._s(t.songInfo.reason))]):t._e(),s("span",{staticClass:"artist-name"},[t._v(t._s(t.songInfo.artists))]),s("span",{staticClass:"split"},[t._v("-")]),s("span",{staticClass:"artist-des"},[t._v(t._s(t.songInfo.description))])])]),t.songInfo.mvId?s("div",{staticClass:"mv",on:{click:function(s){return s.stopPropagation(),t.clickMvIcon(t.songInfo.mvId)}}},[s("i",{staticClass:"iconfont icon-bofangshu"})]):t._e(),t._m(0)])},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"more"},[s("i",{staticClass:"iconfont icon-gengduoxiao"})])}],d={mixins:[n["a"]],props:{songInfo:{type:Object,require:!0,default:function(){return{}}}},methods:{}},h=d,u=(i("b924"),i("2877")),m=Object(u["a"])(h,c,r,!1,null,"15ce3e04",null),g=m.exports,p={name:"DailyPlayListInclude",mixins:[n["a"]],components:{Navbar:l["default"],SongInfo:g},data(){return{isTouch:!1,dailySongs:[],playlistName:""}},computed:{currentDay(){let t=(new Date).getDate();return t<10?"0"+t:t},currentMonth(){let t=(new Date).getMonth()+1;return t<10?"0"+t:t}},mounted(){this.getData()},activated(){setTimeout(()=>{window.scroll(0,this.scrollT),window.addEventListener("scroll",this.handlerScroll),window.addEventListener("touchstart",this.touchS),window.addEventListener("touchend",this.touchE)},10)},deactivated(){window.removeEventListener("scroll",this.handlerScroll),window.removeEventListener("touchstart",this.touchS),window.removeEventListener("touchend",this.touchE)},methods:{async getData(){try{this.$store.commit("changeLoading",!0);let t=await Object(o["e"])(),s=t.data.dailySongs;t.data.recommendReasons.forEach(t=>{let i=s.findIndex(s=>s.id===t.songId);s[i].rcmdReason=t.reason}),this.dailySongs=s.map(t=>({id:t.id,name:t.name,secName:t.tns&&t.tns[0]||t.alia&&t.alia[0]||"",img:t.al.picUrl,artists:t.ar.map(t=>t.name).join("/"),description:t.al.name,mvId:t.mv,sq:t.privilege.maxbr>48e4,reason:t.rcmdReason})),this.$nextTick(()=>{this.setAttr()})}catch(t){console.log(t)}finally{this.$store.commit("changeLoading",!1)}},setAttr(){this.navEle=this.$refs.navbar.$el,this.navbgEle=this.$refs.navbarBg,this.playlistEle=this.$refs.playlist,this.navH=this.navEle.offsetHeight,this.plT=this.playlistEle.getBoundingClientRect().top},touchS(){this.isTouch=!0},touchE(){this.isTouch=!1,this.handlerScroll()},async playAll(){let t=this.dailySongs.map(t=>t.id).join(","),s=await Object(o["C"])(t),i=s.songs.map((t,i)=>({id:t.id,name:t.name,secName:t.tns?t.tns[0]:t.alia[0],artist:t.ar.map(t=>t.name).join("/"),al:t.al.name,mvId:t.mv,duration:t.dt/1e3,bgImg:t.al.picUrl+"?param=400y400",sq:s.privileges[i].maxbr>=999e3}));this.$store.commit("setPlayList",i),this.toast("即将播放歌单中已加载的歌曲!",3e3),this.clickSong(i[0].id)},handlerScroll(){if(this.scrollT=Math.ceil(this.getScrollTop()),this.scrollT<this.navH?this.playlistName="":this.playlistName="每日推荐",this.scrollT<this.plT-this.navH){let t=this.scrollT/(this.plT-this.navH);this.navbgEle.style.opacity=t}else this.navbgEle.style.opacity=1;this.isTouch||(this.sTimer&&clearTimeout(this.sTimer),this.sTimer=setTimeout(()=>{this.scrollT<this.navH&&window.scroll({top:0,behavior:"smooth"}),this.scrollT>=this.navH&&this.scrollT<this.plT&&window.scroll({top:this.plT-this.navH,behavior:"smooth"})},60))}}},v=p,f=(i("155f"),Object(u["a"])(v,e,a,!1,null,"916ba8a6",null));s["default"]=f.exports},"155f":function(t,s,i){"use strict";i("abcc")},1844:function(t,s,i){},"5a84":function(t,s,i){"use strict";i.d(s,"a",(function(){return e}));i("14d9"),i("4ec3");let e={data(){return{}},computed:{loginStatus(){return this.$store.getters.loginStatus},playerPlayList(){return this.$store.getters.playList},adoEl(){return this.$store.getters.adoEl},songId(){return this.$store.getters.songId}},methods:{goLogin(){!this.loginStatus&&this.$router.push({name:"Login"})},logout(){this.$store.dispatch("userLogout")},toggleMenu(){this.$store.commit("toggleMenu")},goBack(){let t=this.$store.getters.historyList;t.length>1?this.$router.go(-1):this.$router.push({name:"Find"})},clickMenu(){console.log("点击了菜单")},goSearch(){this.$router.push({name:"Search"})},toTop(){window.scroll({top:0,behavior:"smooth"})},goPlaylist(t){console.log("点击歌单:",t),this.$router.push({name:"PlayListDetail",params:{id:t}})},async clickSong(t){this.$store.commit("changeSongId",String(t));let s=this.$store.getters.historyList;s.length<=1&&!window.location.href.includes("?player=show")&&(window.location.href+="?player=show"),this.$store.commit("changeShowPlayer",!0)},clickMvIcon(t,s="mv"){this.$store.commit("changeMvId",Number(t)),this.$router.push({name:"MvPlayer",params:{id:t},query:{type:s}})},toast(t,s=1500){this.$toast({message:t,className:"playerToast",duration:s,position:"bottom"})},copyText(t){let s=document.createElement("input");s.value=t,s.style.position="absolute",s.style.left="-10000px",s.style.top="-10000px",document.body.appendChild(s),s.select(),document.execCommand("copy"),this.toast("复制成功! 快和小伙伴们分享吧!"),document.body.removeChild(s)},getScrollTop(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},getClientHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0},getScrollHeight(){return document.body.scrollHeight||document.documentElement.scrollHeight}}}},abcc:function(t,s,i){},ae8c:function(t,s,i){},b924:function(t,s,i){"use strict";i("1844")},d178:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"navbar-comp"},[s("div",{staticClass:"left",on:{click:function(s){return t.clickItem("left")}}},[t._t("left")],2),s("div",{staticClass:"middle",on:{click:function(s){return t.clickItem("middle")}}},[t._t("middle")],2),s("div",{staticClass:"right",on:{click:function(s){return t.clickItem("right")}}},[t._t("right")],2),s("div",{staticClass:"background"},[t._t("background")],2)])},a=[],n={methods:{clickItem(t){"left"===t&&this.$emit("clickLeft"),"middle"===t&&this.$emit("clickMiddle"),"right"===t&&this.$emit("clickRight")}},mounted(){this.$emit("navbarMounted")}},o=n,l=(i("d714"),i("2877")),c=Object(l["a"])(o,e,a,!1,null,"2ce0cfb9",null);s["default"]=c.exports},d714:function(t,s,i){"use strict";i("ae8c")}}]);
//# sourceMappingURL=chunk-1b48c134.26ff8e3d.js.map