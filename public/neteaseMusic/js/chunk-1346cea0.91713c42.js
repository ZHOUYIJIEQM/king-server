(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1346cea0"],{"5f55":function(t,a,s){"use strict";s.r(a);var o=function(){var t=this,a=t._self._c;return a("div",{staticClass:"mvlog-comp"},[a("div",{staticClass:"mv-box"},[a("video",{ref:"mlogVideo",on:{click:t.playVideo,play:t.vdoPlay,pause:t.vdoPause,error:t.vdoError}}),a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.mvLogData.img,expression:"mvLogData.img"}],ref:"coverUrl",attrs:{alt:""},on:{click:t.playVideo}}),t.mvLogData.playCount?a("span",{staticClass:"tr-text"},[a("span",{staticClass:"iconfont icon-bofangsanjiaoxing"}),t._v(" "+t._s(t._f("formatNum")(t.mvLogData.playCount))+" ")]):t._e(),a("div",{staticClass:"playicon"},[t.videoStatus?a("i",{staticClass:"iconfont icon-bofang2"}):a("div",{staticClass:"loader"},[a("div",{staticStyle:{"--x":"0"}}),a("div",{staticStyle:{"--x":"1"}}),a("div",{staticStyle:{"--x":"2"}})])])]),a("div",{staticClass:"mv-name two-eli",on:{click:t.goMvPlayer}},[t._v(t._s(t.mvLogData.name))])])},e=[],i=s("4ec3"),l=s("5a84"),c={props:{mvLogData:{type:Object,default:function(){return{}}}},mixins:[l["a"]],data(){return{videoStatus:!0}},mounted(){},methods:{async playVideo(){this.$store.commit("changeMvId",this.mvLogData.id);let t=this.$refs.mlogVideo;if(t.src)this.toggleVdoStatus(),this.$refs.coverUrl.style.zIndex="-1";else try{let a=await Object(i["k"])({id:this.mvLogData.id,res:480});console.log(a),t.src=a.data.resource.content.video.urlInfo.url,t.oncanplay=()=>{t.play(),this.$refs.coverUrl.style.zIndex="-1"}}catch(a){this.$toast("获取播放链接错误!"),console.log(a)}},toggleVdoStatus(){let t=this.$refs.mlogVideo;t.paused?t.play():t.pause()},vdoPlay(){this.videoStatus=!1},vdoPause(){this.videoStatus=!0},vdoError(){this.$toast("视频播放错误!")},goMvPlayer(){this.clickMvIcon(this.mvLogData.id,"mlog")}},watch:{"$store.getters.mvId":{handler:function(t){this.$refs.mlogVideo.paused||t===this.mvLogData.id||(this.$refs.mlogVideo.pause(),this.$refs.coverUrl.style.zIndex="1")}},mvLogData(t){this.$refs.mlogVideo.pause(),this.$refs.mlogVideo.removeAttribute("src"),this.$refs.mlogVideo.load(),this.videoStatus=!0}}},r=c,n=(s("faea"),s("2877")),d=Object(n["a"])(r,o,e,!1,null,"370402a9",null);a["default"]=d.exports},cabc:function(t,a,s){},faea:function(t,a,s){"use strict";s("cabc")}}]);
//# sourceMappingURL=chunk-1346cea0.91713c42.js.map