(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60f89070"],{"0b09":function(t,e,i){t.exports=i.p+"img/每日推荐.e6bf3a03.png"},"0de4":function(t,e,i){"use strict";i("3151")},1107:function(t,e,i){"use strict";i("649b")},2298:function(t,e,i){t.exports=i.p+"img/歌房.6c81b050.png"},"2c04":function(t,e,i){"use strict";i.r(e);i("14d9");var s=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"find-page"},[e("Navbar",{staticClass:"find-navbar",on:{clickLeft:t.toggleMenu,clickMiddle:t.goSearch,clickRight:t.yuyin},scopedSlots:t._u([{key:"left",fn:function(){return[e("i",{staticClass:"iconfont icon-weibiaoti12"})]},proxy:!0},{key:"middle",fn:function(){return[e("div",{staticClass:"searchbox"},[e("i",{staticClass:"icon-sousuo iconfont"}),e("div",{staticClass:"text-eli search-word"},[t._v(t._s(t.searchText))])])]},proxy:!0},{key:"right",fn:function(){return[e("i",{staticClass:"iconfont icon-weibiaoti--"})]},proxy:!0}])}),e("div",{staticClass:"find-content",class:{loading:!t.homeFindData.length}},[e("div",{staticClass:"top-content"},[t.banner.length?e("swiper",{ref:"banner",staticClass:"banner-box",attrs:{options:t.swiperOptions}},[t._l(t.banner,(function(i,s){return e("swiper-slide",{key:s,staticClass:"swiper-slide"},[e("div",{staticClass:"banner-item"},[e("div",{staticClass:"swiper-lazy-preloader swiper-lazy-preloader-white"}),e("img",{staticClass:"banner-pic swiper-lazy",attrs:{"data-src":i.pic}}),e("p",{staticClass:"banner-text",style:"background-color:"+(t.color[i.titleColor]||i.titleColor)},[t._v(" "+t._s(i.typeTitle)+" ")])])])})),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2):e("div",{staticClass:"banner-gj"}),e("div",{staticClass:"icon-list-box"},t._l(t.iconList,(function(i,s){return e("div",{key:s,staticClass:"icon",on:{click:function(e){return t.clickIcon(i.title)}}},[e("img",{attrs:{src:i.icon,alt:""}}),e("p",[t._v(t._s(i.title))])])})),0)],1),t._l(t.homeFindData,(function(i,s){return e("div",{key:s,staticClass:"find-data-box"},["推荐歌单"===i.type?e("div",{staticClass:"find-data-item bottom-border"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",{on:{click:function(e){return t.$router.push({name:"PlayListSquare"})}}},[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},[e("swiper-slide",{staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner scroll-list"},[i.scrollPlaylist.length?e("swiper",{ref:"scrollList",refInFor:!0,staticClass:"scroll-play-list",attrs:{options:t.scrollPlayList},on:{slideChange:t.scrollListChange,progress:t.progressHandler,setTransition:t.setTrans},nativeOn:{click:function(e){return t.goPlaylist(i.scrollPlaylist[t.scrollList.realIndex].id)}}},t._l(i.scrollPlaylist,(function(t,i){return e("swiper-slide",{key:i,staticClass:"scroll-play-list-item"},[e("div",{staticClass:"img-box"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.img+"?param=200y200",expression:"item1.img+'?param=200y200'"}],attrs:{alt:""}})])])})),1):t._e(),e("i",{staticClass:"scroll-icon iconfont icon-huaban"}),t._l(i.scrollPlaylist,(function(i,s){return e("div",{key:s,staticClass:"list-name-box",on:{click:function(e){return t.goPlaylist(i.id)}}},[e("transition",{attrs:{name:"fadeIn"}},[s===t.scrollPlayListIndex?e("div",{staticClass:"list-name two-eli"},[t._v(t._s(i.name))]):t._e()])],1)}))],2)]),t._l(i.list,(function(i,s){return e("swiper-slide",{key:s,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner"},[e("PlayListBlock",{attrs:{playListData:i},on:{clickPlayList:function(e){return t.goPlaylist(i.id)}}})],1)])}))],2):t._e()],1)]):t._e(),"推荐歌曲"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",{staticClass:"iconfont icon-bofang2"}),e("span",[t._v(t._s(i.text))])]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"oneMoreColumn",attrs:{options:t.songOptions}},t._l(i.list,(function(i,s){return e("swiper-slide",{key:s,staticClass:"oneMoreColumn-item"},[e("div",{staticClass:"oneMoreColumn-item-inner"},t._l(i,(function(i,s){return e("div",{key:s,staticClass:"rcmd-song-item",on:{click:function(e){return t.clickSong(i.id)}}},[e("FindSongItem",{attrs:{songInfo:i}})],1)})),0)])})),1):t._e()],1)]):t._e(),"精选音乐视频"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text",on:{click:t.refreshMlog}},[e("span",{staticClass:"iconfont icon-icon_refresh"}),e("span",[t._v("换一批")])]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.list,(function(t,i){return e("swiper-slide",{key:i,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner"},[e("MvLog",{attrs:{mvLogData:t}})],1)])})),1):t._e()],1)]):t._e(),"雷达歌单"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.list,(function(i,s){return e("swiper-slide",{key:s,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner"},[e("PlayListBlock",{attrs:{playListData:i},on:{clickPlayList:function(e){return t.goPlaylist(i.id)}}})],1)])})),1):t._e()],1)]):t._e(),"热门播客"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"oneMoreColumn",attrs:{options:t.songOptions}},t._l(i.list,(function(i,s){return e("swiper-slide",{key:s,staticClass:"oneMoreColumn-item"},[e("div",{staticClass:"oneMoreColumn-item-inner"},t._l(i,(function(i,s){return e("div",{key:s,staticClass:"rcmd-song-item hotPodcast-item",on:{click:function(e){return t.$toast(`id: ${i.id}, 播客未开发!`)}}},[e("div",{staticClass:"img-box"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.img,expression:"item2.img"}],attrs:{alt:""}}),e("i",{staticClass:"playicon iconfont icon-bofang2"})]),e("div",{staticClass:"right-box"},[e("div",{staticClass:"name text-eli"},[t._v(t._s(i.name))]),e("div",{staticClass:"des"},[i.labelText?e("span",{staticClass:"tag"},[t._v(t._s(i.labelText))]):t._e()])])])})),0)])})),1):t._e()],1)]):t._e(),"专属场景歌单"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.list,(function(i,s){return e("swiper-slide",{key:s,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner"},[e("PlayListBlock",{attrs:{playListData:i},on:{clickPlayList:function(e){return t.goPlaylist(i.id)}}})],1)])})),1):t._e()],1)]):t._e(),"新歌新碟数字专辑"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},t._l(i.title,(function(i,s){return e("span",{key:s,staticClass:"title-item",class:{"item-active":s===t.newListActive},on:{click:function(e){t.newListActive=s}}},[t._v(" "+t._s(i)+" ")])})),0),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content newlist-content"},[e("div",{directives:[{name:"show",rawName:"v-show",value:0===t.newListActive,expression:"newListActive === 0"}],staticClass:"newlist content-item"},[i.newSong.length?e("swiper",{staticClass:"oneMoreColumn",attrs:{options:t.songOptions}},t._l(i.newSong,(function(i,s){return e("swiper-slide",{key:s,staticClass:"oneMoreColumn-item"},[e("div",{staticClass:"oneMoreColumn-item-inner"},t._l(i,(function(i,s){return e("div",{key:s,staticClass:"rcmd-song-item",on:{click:function(e){return t.clickSong(i.id)}}},[e("FindSongItem",{attrs:{songInfo:i}})],1)})),0)])})),1):t._e()],1),e("div",{directives:[{name:"show",rawName:"v-show",value:1===t.newListActive,expression:"newListActive === 1"}],staticClass:"newlist content-item"},[i.newAlbum.length?e("swiper",{staticClass:"oneMoreColumn",attrs:{options:t.songOptions}},t._l(i.newAlbum,(function(i,s){return e("swiper-slide",{key:s,staticClass:"oneMoreColumn-item"},[e("div",{staticClass:"oneMoreColumn-item-inner"},t._l(i,(function(i,s){return e("div",{key:s,staticClass:"rcmd-song-item",on:{click:function(e){return t.toast("未开发新碟!",2e3)}}},[e("FindSongItem",{attrs:{songInfo:i,imgShadow:!0}})],1)})),0)])})),1):t._e()],1),e("div",{directives:[{name:"show",rawName:"v-show",value:2===t.newListActive,expression:"newListActive === 2"}],staticClass:"newlist content-item"},[i.digitalAlbum.length?e("swiper",{staticClass:"oneMoreColumn",attrs:{options:t.songOptions}},t._l(i.digitalAlbum,(function(i,s){return e("swiper-slide",{key:s,staticClass:"oneMoreColumn-item"},[e("div",{staticClass:"oneMoreColumn-item-inner"},t._l(i,(function(i,s){return e("div",{key:s,staticClass:"rcmd-song-item",on:{click:function(e){return t.toast("未开发数字专辑!",2e3)}}},[e("FindSongItem",{attrs:{songInfo:i,imgShadow:!0}})],1)})),0)])})),1):t._e()],1)])]):t._e(),"音乐日历"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content calendar"},[t._m(0,!0),t._l(i.list,(function(i,s){return e("div",{key:s,staticClass:"calendar-item",on:{click:function(e){return t.$toast("音乐日历 未开发!")}}},[e("div",{staticClass:"info"},[e("div",{staticClass:"date"},[e("span",{staticClass:"time"},[t._v(t._s(i.time))]),e("span",{class:["云村热点"===i.labelText?"hot-label":"normal-label"]},[t._v(t._s(i.labelText))])]),e("div",{staticClass:"event text-eli"},[t._v(t._s(i.event))])]),e("div",{staticClass:"img-box"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.img+"?param=200y200",expression:"item1.img+'?param=200y200'"}],attrs:{alt:""}})])])}))],2)]):t._e(),"云村ktv"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content yunktv"},[i.list.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.list,(function(t,i){return e("swiper-slide",{key:i,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner"},[e("FindKTV",{attrs:{ktvData:t}})],1)])})),1):t._e()],1)]):t._e(),"广播电台"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},t._l(i.title,(function(i,s){return e("span",{key:s,staticClass:"title-item",class:{"item-active":s===t.broadCastActive},on:{click:function(e){t.broadCastActive=s}}},[t._v(" "+t._s(i)+" ")])})),0)]),e("div",{staticClass:"item-content"},[e("div",{directives:[{name:"show",rawName:"v-show",value:0===t.broadCastActive,expression:"broadCastActive === 0"}],staticClass:"content-item"},[i.broadcast.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.broadcast,(function(i,s){return e("swiper-slide",{key:s,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner broad-cast",on:{click:function(e){return t.$toast("广播电台 未开发!")}}},[e("BroadCastItem",{attrs:{broadCastInfo:i}})],1)])})),1):t._e()],1),e("div",{directives:[{name:"show",rawName:"v-show",value:1===t.broadCastActive,expression:"broadCastActive === 1"}],staticClass:"content-item"},[i.podcast24.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.podcast24,(function(i,s){return e("swiper-slide",{key:s,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner broad-cast",on:{click:function(e){return t.$toast("广播电台 未开发!")}}},[e("BroadCastItem",{attrs:{broadCastInfo:i}})],1)])})),1):t._e()],1)])]):t._e(),"视频合辑"===i.type?e("div",{staticClass:"find-data-item"},[e("div",{staticClass:"item-title"},[e("div",{staticClass:"title text-eli"},[t._v(t._s(i.title))]),i.text?e("div",{staticClass:"text"},[e("span",[t._v(t._s(i.text))]),e("span",{staticClass:"iconfont icon-jiantouyou"})]):t._e()]),e("div",{staticClass:"item-content"},[i.list.length?e("swiper",{staticClass:"threeColumn",attrs:{options:t.threeColumnOptions}},t._l(i.list,(function(i,s){return e("swiper-slide",{key:s,staticClass:"list-item-box"},[e("div",{staticClass:"list-item-inner"},[e("PlayListBlock",{attrs:{playListData:i},on:{clickPlayList:function(e){return t.goPlaylist(i.id)}}})],1)])})),1):t._e()],1)]):t._e()])})),t.dividerShow?t._e():e("div",{staticClass:"loading-box"},[e("Loading")],1),t.dividerShow&&t.homeFindData.length?e("van-divider",{staticClass:"divider"},[t._v("到底了!")]):t._e()],2)],1)},a=[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"get-luck"},[e("div",{staticClass:"left"},[t._v("领取你的今日好运")]),e("div",{staticClass:"right"},[t._v("查看运势解读"),e("i",{staticClass:"iconfont icon-jiantou"})])])}],n=i("e6da");function l(t,e){let i=[],s=[];for(let a=0;a<t.length;a++)i.push(t[a]),i.length===e&&(s.push(i),i=[]);return i.length&&s.push(i),s}var o=i("4ec3"),r=i("c1df"),c=i.n(r),u=i("5a84"),m={name:"FindInclude",mixins:[n["a"],u["a"]],components:{Navbar:()=>i.e("chunk-211cfdb4").then(i.bind(null,"d178")),Loading:()=>i.e("chunk-04655e5c").then(i.bind(null,"3a5e")),PlayListBlock:()=>i.e("chunk-41a17fc2").then(i.bind(null,"9245")),FindSongItem:()=>i.e("chunk-2f791fcc").then(i.bind(null,"ea50")),BroadCastItem:()=>i.e("chunk-fe7c7cdc").then(i.bind(null,"7ab1")),MvLog:()=>i.e("chunk-1346cea0").then(i.bind(null,"5f55")),FindKTV:()=>i.e("chunk-65645b89").then(i.bind(null,"505c"))},data(){return{iconList:[{icon:i("0b09"),title:"每日推荐"},{icon:i("5553"),title:"歌单"},{icon:i("996e"),title:"排行榜"},{icon:i("584f"),title:"私人FM"},{icon:i("7978"),title:"助眠解压"},{icon:i("ec6f"),title:"数字专辑"},{icon:i("2298"),title:"歌房"},{icon:i("a478"),title:"专注冥想"},{icon:i("a348"),title:"游戏专区"}],searchText:"搜索",banner:[],color:{red:"#f53f3c",blue:"#3b90d0"},swiperOptions:{pagination:{el:".swiper-pagination",clickable:!0,bulletClass:"bullet",bulletActiveClass:"bullet-active"},initialSlide:0,loop:!0,autoplay:{delay:1e4,disableOnInteraction:!1},lazy:{loadPrevNext:!0}},homeFindData:[],threeColumnOptions:{slidesPerView:"auto",resistanceRatio:0},scrollPlayList:{speed:400,loop:!0,direction:"vertical",watchSlidesProgress:!0,swipeHandler:".swipe-handler",initialSlide:0,autoplay:{delay:3e3}},scrollPlayListIndex:0,songOptions:{slidesPerView:"auto",resistanceRatio:0},loading:!0,newListActive:0,broadCastActive:0,cursor:null,dividerShow:!1,rcmdListBanner:[]}},computed:{scrollList(){if(this.homeFindData.length)return this.$refs.scrollList[0].$swiper}},activated(){this.loginStatus&&window.addEventListener("scroll",this.getLoginData)},deactivated(){this.loginStatus&&window.removeEventListener("scroll",this.getLoginData)},methods:{async initData(){try{this.loading=!0;let t=await Object(o["f"])();this.searchText=t.data.showKeyword,this.getData(),this.scrollPlayListIndex=0}catch(t){console.log(t)}},async getData(){try{let t=await Object(o["s"])({refresh:!0});if(this.loginStatus){this.cursor=t.data.cursor;let e=await Object(o["z"])();e=e.sub.map(t=>t.name),e=e[Math.round(Math.random()*e.length-1)];let i=await Object(o["r"])({cat:e,limit:5});this.rcmdListBanner=[],this.rcmdListBanner.push(...i.playlists.map(t=>({id:t.id,name:t.name,img:t.coverImgUrl}))),this.dividerShow=!1,window.addEventListener("scroll",this.getLoginData)}else this.dividerShow=!0,window.removeEventListener("scroll",this.getLoginData);let e=t.data.blocks;this.extractData(e),this.loading=!1}catch(t){}},async getLoginData(){let t=document.body.scrollHeight||document.documentElement.scrollHeight,e=this.getScrollTop(),i=this.getClientHeight();if(t-350<e+i&&!this.loading){if(!this.cursor)return this.dividerShow=!0,void window.removeEventListener("scroll",this.getLoginData);this.loading=!0;let t=await Object(o["s"])({refresh:!0,cursor:this.cursor});this.cursor=t.data.cursor;let e=t.data.blocks;this.extractData(e),this.loading=!1}},yuyin(){console.log("right")},clickIcon(t){"每日推荐"===t&&(this.loginStatus?this.$router.push({name:"DailyPlayList"}):this.$dialog.confirm({title:"每日推荐",message:"需要登录才能推荐哦!",confirmButtonText:"确定"}).then(t=>{console.log("确认",t),this.$store.commit("saveRedirect","/DailyPlayList"),this.$router.push({name:"Login"})}).catch(t=>{console.log("取消",t)})),"歌单"===t&&this.$router.push({name:"PlayListSquare"}),"排行榜"===t&&this.$router.push({name:"LeaderBoard"}),"私人FM"===t&&this.toast(t+" 未开发!"),"助眠解压"===t&&this.toast(t+" 未开发!"),"数字专辑"===t&&this.toast(t+" 未开发!"),"歌房"===t&&this.toast(t+" 未开发!"),"专注冥想"===t&&this.toast(t+" 未开发!"),"游戏专区"===t&&this.toast(t+" 未开发!")},scrollListChange(){this.scrollPlayListIndex=this.scrollList.realIndex},progressHandler(t){let e=this.scrollList.slides;for(let i=0;i<e.length;i++){let t=e[i].progress,s=1-Math.abs(t)/3;s=s<1?.7:1,e.eq(i).transform("scale("+s+")")}},setTrans(t){let e=this.scrollList.slides;for(let i=0;i<e.length;i++){let s=e.eq(i);s.transition(t)}},async refreshMlog(){if(this.loginStatus)try{this.$store.commit("changeLoading",!0);let t=await Object(o["s"])({refresh:!0,cursor:'{"blockCodeOrderList":["HOMEPAGE_MUSIC_MLOG"]}'}),e=this.homeFindData.findIndex(t=>"精选音乐视频"===t.type);this.homeFindData[e].list=[],t.data.blocks[0].extInfo.forEach(t=>{this.homeFindData[e].list.push({id:t.resource.mlogBaseData.id,img:t.resource.mlogBaseData.coverUrl,name:t.resource.mlogBaseData.text,playCount:t.resource.mlogExtVO.playCount})})}catch(t){console.log(t)}finally{this.$store.commit("changeLoading",!1)}else this.toast("登录后才能换一批音乐视频哦!")},extractData(t){t.forEach(t=>{if("HOMEPAGE_BANNER"===t.blockCode&&(this.banner=t.extInfo.banners),"HOMEPAGE_BLOCK_PLAYLIST_RCMD"===t.blockCode){let e={type:"推荐歌单"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.scrollPlaylist=[],e.list=[],t.creatives.forEach(async t=>{"scroll_playlist"===t.creativeType&&t.resources.forEach(t=>{e.scrollPlaylist.push({id:t.resourceId,name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl,playCount:t.resourceExtInfo.playCount})}),"list"===t.creativeType&&t.resources.forEach(t=>{e.list.push({id:t.resourceId,name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl,playCount:t.resourceExtInfo.playCount})})}),e.scrollPlaylist.length||e.scrollPlaylist.push(...this.rcmdListBanner),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_STYLE_RCMD"===t.blockCode){let e={type:"推荐歌曲"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.creatives.forEach(t=>{let i=[];t.resources.forEach(t=>{i.push({id:t.resourceId,name:t.uiElement.mainTitle&&t.uiElement.mainTitle.title,info:t.uiElement.subTitle&&t.uiElement.subTitle.title,img:t.uiElement.image.imageUrl,artists:t.resourceExtInfo.artists.map(t=>t.name),mvid:t.resourceExtInfo.songData.mvid,sq:Number(t.resourceExtInfo.songPrivilege.maxbr)>48e4})}),e.list.push(i)}),this.homeFindData.push(e)}if("HOMEPAGE_MUSIC_MLOG"===t.blockCode){let e={type:"精选音乐视频"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.extInfo.forEach(t=>{e.list.push({id:t.resource.mlogBaseData.id,img:t.resource.mlogBaseData.coverUrl,name:t.resource.mlogBaseData.text,playCount:t.resource.mlogExtVO.playCount})}),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_MGC_PLAYLIST"===t.blockCode){let e={type:"雷达歌单",title:"你的雷达歌单"};e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.creatives.forEach(t=>{e.list.push({id:t.resources[0].resourceId,img:t.resources[0].uiElement.image.imageUrl,name:t.resources[0].uiElement.mainTitle.title,playCount:t.resources[0].resourceExtInfo.playCount})}),this.homeFindData.push(e)}if("HOMEPAGE_VOICELIST_RCMD"===t.blockCode){let e={type:"热门播客",title:"热门播客",text:"更多",list:[]};t.creatives.forEach(t=>{t.resources.forEach(t=>{e.list.push({id:t.resourceId,name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl,labelText:t.uiElement.labelTexts.length&&t.uiElement.labelTexts[0]})})}),e.list=l(e.list,3),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST"===t.blockCode){let e={type:"专属场景歌单"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.creatives.forEach(t=>{e.list.push({id:t.resources[0].resourceId,img:t.resources[0].uiElement.image.imageUrl,name:t.resources[0].uiElement.mainTitle.title,playCount:t.resources[0].resourceExtInfo.playCount})}),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG"===t.blockCode){let e={type:"新歌新碟数字专辑",title:["新歌","新碟","数字专辑"],text:"更多",newSong:[],newAlbum:[],digitalAlbum:[]};t.creatives.forEach(t=>{if("NEW_SONG_HOMEPAGE"===t.creativeType){let i=[];t.resources.forEach(t=>{i.push({id:t.resourceId,name:t.resourceExtInfo.songData.name,img:t.uiElement.image.imageUrl,artists:t.resourceExtInfo.artists.map(t=>t.name),info:t.uiElement.subTitle.title,sq:Number(t.resourceExtInfo.songPrivilege.maxbr)>48e4})}),e.newSong.push(i)}if("NEW_ALBUM_HOMEPAGE"===t.creativeType){let i=[];t.resources.forEach(t=>{i.push({id:t.resourceId,name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl,artists:t.resourceExtInfo.artists.map(t=>t.name),info:t.uiElement.subTitle.title})}),e.newAlbum.push(i)}if("DIGITAL_ALBUM_HOMEPAGE"===t.creativeType){let i=[];t.resources.forEach(t=>{i.push({id:t.resourceId,name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl,artists:t.resourceExtInfo.artists.map(t=>t.name),info:t.uiElement.subTitle.title})}),e.digitalAlbum.push(i)}}),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_TOPLIST"===t.blockCode){let e={type:"排行榜"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.creatives.forEach(t=>{let e=[];t.resources.forEach(t=>{console.log(),e.push({id:t.resourceId,name:t.uiElement.mainTitle&&t.uiElement.mainTitle.title,info:t.uiElement.subTitle&&t.uiElement.subTitle.title,img:t.uiElement.image.imageUrl,artists:t.resourceExtInfo&&t.resourceExtInfo.artists.map(t=>t.name),sq:t.resourceExtInfo&&Number(t.resourceExtInfo.songPrivilege.maxbr)>48e4})})}),this.homeFindData.push(e)}if("HOMEPAGE_MUSIC_CALENDAR"===t.blockCode){let e={type:"音乐日历"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.creatives.forEach(t=>{e.list.push({event:t.resources[0].uiElement.mainTitle.title,img:t.resources[0].uiElement.image.imageUrl,labelText:t.resources[0].uiElement.labelTexts?t.resources[0].uiElement.labelTexts[0]:"预告",time:c()(Number(t.resources[0].resourceExtInfo.startTime)).format("MM-DD")})}),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_FUN_CLUB"===t.blockCode){let e={type:"云村ktv"};e.title=t.uiElement&&t.uiElement.subTitle.title,e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.extInfo.roomInfoList.forEach(t=>{e.list.push({id:t.liveId,name:t.title,songName:t.songName,onlineNum:t.onlineNumber,img:t.bgUrl})}),this.homeFindData.push(e)}if("HOMEPAGE_PODCAST24"===t.blockCode){let e={type:"广播电台",title:["广播电台","24小时播客"],broadcast:[],podcast24:[]};t.creatives.forEach((t,i)=>{0===i&&t.resources.forEach(t=>{e.broadcast.push({name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl})}),1===i&&t.resources.forEach(t=>{e.podcast24.push({name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl})})}),this.homeFindData.push(e)}if("HOMEPAGE_BLOCK_VIDEO_PLAYLIST"===t.blockCode){let e={type:"视频合辑",title:"视频歌单"};e.text=t.uiElement&&t.uiElement.button.text,e.list=[],t.creatives.forEach(t=>{e.list.push({id:t.creativeId,name:t.uiElement.mainTitle.title,img:t.uiElement.image.imageUrl,playCount:t.resources[0].resourceExtInfo.playCount})}),this.homeFindData.push(e)}})}},watch:{loginStatus:{handler:function(t){this.dividerShow=!1,this.homeFindData=[],this.initData()},immediate:!0},$route(t){"Find"===t.name?(this.$refs.banner&&this.$refs.banner.$swiper.autoplay.start(),this.scrollList&&this.scrollList.autoplay.start()):(this.$refs.banner&&this.$refs.banner.$swiper.autoplay.stop(),this.scrollList&&this.scrollList.autoplay.stop())}}},d=m,h=(i("1107"),i("0de4"),i("2877")),p=Object(h["a"])(d,s,a,!1,null,"a64e63c0",null);e["default"]=p.exports},3151:function(t,e,i){},5553:function(t,e,i){t.exports=i.p+"img/歌单.06d96600.png"},"584f":function(t,e,i){t.exports=i.p+"img/私人FM.9b286c79.png"},"5a84":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));i("14d9"),i("4ec3");let s={data(){return{}},computed:{loginStatus(){return this.$store.getters.loginStatus},playerPlayList(){return this.$store.getters.playList},adoEl(){return this.$store.getters.adoEl},songId(){return this.$store.getters.songId}},methods:{goLogin(){!this.loginStatus&&this.$router.push({name:"Login"})},logout(){this.$store.dispatch("userLogout")},toggleMenu(){this.$store.commit("toggleMenu")},goBack(){let t=this.$store.getters.historyList;t.length>1?this.$router.go(-1):this.$router.push({name:"Find"})},clickMenu(){console.log("点击了菜单")},goSearch(){this.$router.push({name:"Search"})},toTop(){window.scroll({top:0,behavior:"smooth"})},goPlaylist(t){console.log("点击歌单:",t),this.$router.push({name:"PlayListDetail",params:{id:t}})},async clickSong(t){this.$store.commit("changeSongId",String(t));let e=this.$store.getters.historyList;e.length<=1&&!window.location.href.includes("?player=show")&&(window.location.href+="?player=show"),this.$store.commit("changeShowPlayer",!0)},clickMvIcon(t,e="mv"){this.$store.commit("changeMvId",Number(t)),this.$router.push({name:"MvPlayer",params:{id:t},query:{type:e}})},toast(t,e=1500){this.$toast({message:t,className:"playerToast",duration:e,position:"bottom"})},copyText(t){let e=document.createElement("input");e.value=t,e.style.position="absolute",e.style.left="-10000px",e.style.top="-10000px",document.body.appendChild(e),e.select(),document.execCommand("copy"),this.toast("复制成功! 快和小伙伴们分享吧!"),document.body.removeChild(e)},getScrollTop(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},getClientHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0},getScrollHeight(){return document.body.scrollHeight||document.documentElement.scrollHeight}}}},"649b":function(t,e,i){},7978:function(t,e,i){t.exports=i.p+"img/助眠解压.b10fe939.png"},"996e":function(t,e,i){t.exports=i.p+"img/排行榜.0448df16.png"},a348:function(t,e,i){t.exports=i.p+"img/游戏专区.bb820a00.png"},a478:function(t,e,i){t.exports=i.p+"img/专注冥想.50e8419a.png"},e6da:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));let s={data(){return{scrollH:0}},methods:{getScrollTop(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},getClientHeight(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0}},beforeRouteEnter(t,e,i){i(t=>{t.$nextTick(()=>{window.scrollTo(0,t.scrollH)})})},beforeRouteLeave(t,e,i){this.scrollH=this.getScrollTop(),i()}}},ec6f:function(t,e,i){t.exports=i.p+"img/数字专辑.bc5dfd3a.png"}}]);
//# sourceMappingURL=chunk-60f89070.409eb443.js.map