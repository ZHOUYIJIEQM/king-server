/**
 * 爬取王者荣耀官网数据, 并保存到mongo数据库
 */
const cheerio = require("cheerio");
const axios = require("axios");
const axiosRetry = require("axios-retry");
// utf-8 gbk 编码转换
const iconv = require("iconv-lite");
const https = require("https");
const path = require("path");
const mongodb = require("../utils/mongodb");
const cateList = require("./cateList");
const heroMap = require("./heroMap");
const requireAll = require("require-all");
const allModel = requireAll(path.join(__dirname, "..", "models"));
const startT = Date.now();

mongodb.once("open", async () => {
  console.log("数据库连接成功!");
  console.log('开始爬取...');
  await new Spider().run();
  console.log('爬取完成! 耗时:', new Spider().formatT(Date.now() - startT));
});

/**
 * 爬取王者荣耀官网的数据
 * @class Spider
 */
class Spider {
  constructor() {
    // 配置请求
    this.headers = { "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36` };
    // axios 配置
    this.Client = axios.create({
      headers: this.headers,
      // 忽略特定的 SSL 错误（如过期证书）
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    // 请求失败重试
    axiosRetry(this.Client, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 500;
      },
      shouldResetTimeout: true,
      retryCondition: (err) => {
        console.log(this.colorLog(`重试 ${err.config.url}`, "red"));
        return true;
      },
    });
    // 计算爬取了多少项
    this.currentIndex = 0;
    this.cateList = cateList;
    this.heroMap = heroMap;
  }

  /**
   * 开始爬取
   */
  async run() {
    await this.setUser();
    await this.setCate();
    await this.getAds();
    await this.getInscription();
    await this.getSummoner();
    await this.getItems();
    await this.getStrategy();
    await this.getArticle();
    await this.getHero();
  }

  /**
   * 分类
   * @memberof Spider
   */
  async setCate() {
    try {
      await allModel.Category.deleteMany();
      for (const item of this.cateList) {
        await this.writeCate(item)
      }
      console.log(this.colorLog(`${++this.currentIndex}. 分类写入完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("分类写入数据库失败了!", "red"));
    }
  }

  /**
   * 写入分类
   * @param {object} item 分类对象
   * @param parent 父级分类的id
   * @memberof Spider
   */
  async writeCate(item, parent = null) {
    let name = typeof(item) === "object" ? item.name : item;
    let cateItem = new allModel.Category({
      name: name,
      desc: `${name}的介绍内容`,
      parent,
    });
    await cateItem.save();
    if (typeof(item) === "object" && item?.child?.length) {
      for (const childItem of item.child) {
        this.writeCate(childItem, cateItem.id);
      }
    }
  }

  /**
   * 写入用户
   * @memberof Spider
   */
  async setUser() {
    try {
      await allModel.AdminUser.deleteMany();
      const admin = {
        userName: "admin",
        passWord: "123456",
        roles: ['admin', 'normal']
      };
      const xiaoming = {
        userName: "xiaoming",
        passWord: "123456",
        roles: ['normal']
      };
      let list = []
      for (let index = 1; index < 15; index++) {
        list.push({
          userName: `xiaoming${index}`,
          passWord: "123456",
          roles: Math.random() > 0.5 ? ['normal'] : ['admin'],
          status: Math.random() > 0.5
        })
      }
      await allModel.AdminUser.insertMany([admin, xiaoming, ...list]);
      console.log(this.colorLog(`${++this.currentIndex}. 管理人员写入完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("设置用户失败了!", "red"));
    }
  }

  /**
   * 轮播广告
   * @memberof Spider
   */
  async getAds() {
    try {
      await allModel.Ad.deleteMany();
      const imgBaseUrl = "https://ossweb-img.qq.com/upload/adw/";
      // 首页顶部轮播图
      const homeSwiper = { name: "首页轮播图", items: [] };
      // 首页中部英雄列表
      const heroList = { name: "英雄列表", items: [] };
      // 攻略中心轮播图
      const strategyList = { name: "攻略中心轮播图", items: [] };

      // 首页顶部轮播图
      let res = await this.Client({ url: "https://game.qq.com/time/qqadv/Info_new_15223.js" });
      if (res.status === 200) {
        let obj = /^.*?\s+=\s+(.*)$/gi.exec(res.data);
        if (obj.length > 1) {
          let swiperData = JSON.parse(obj[1]);
          Object.keys(swiperData).forEach((item) => {
            // 提取到图片地址
            let img = `${imgBaseUrl}${swiperData[item][2]}`;
            homeSwiper.items.push({
              img,
              url: swiperData[item][1],
            });
          });
        }
      }
      
      // 首页中部英雄列表
      res = await this.Client({ url: "https://pvp.qq.com/m/m201706/index.shtml" });
      if (res.status === 200) {
        // fs.writeFileSync(`home.html`, res.data)
        const $ = cheerio.load(res.data);
        // 使用$(this), 不可用箭头函数
        $("#hero-img li").each(function (index, item) {
          let aHref = $(this).find("a").attr("href");
          let img = "https:" + $(this).find("img").attr("src");
          heroList.items.push({
            img,
            url: aHref,
          });
        });
      }

      // 攻略中心轮播图 测试时证书过期
      res = await this.Client({ url: "https://ams.qq.com/wmp/data/js/v3/WMP_VDRECLIST_GW_18_229.js" });
      if (res.status === 200) {
        let obj = /^.*?\s*=\s*{(.*)}/gim.exec(res.data);
        let swiperData = JSON.parse(`{${obj[1]}}`);
        strategyList.items = swiperData.msg.reclist_236
          .map((i) => {
            return {
              img: i.sIMG,
              url: i.sUrl,
            };
          })
          .slice(0, 4);
      }

      await allModel.Ad.insertMany([homeSwiper, heroList, strategyList])
      console.log(this.colorLog(`${++this.currentIndex}. 轮播广告写入完成!`, "green"));
    } catch (error) {
      console.log(error.message);
      console.log("获取轮播内容失败了");
    }
  }
  
  /**
   * 获取铭文
   * @memberof Spider
   */
  async getInscription() {
    try {
      await allModel.Inscription.deleteMany();
      const res = await this.Client({ url: "https://pvp.qq.com/web201605/js/ming.json" });
      for (const item of res.data) {
        await allModel.Inscription.insertMany([{
          id: item.ming_id,
          type: item.ming_type,
          grade: Number(item.ming_grade),
          name: item.ming_name,
          img: `https://game.gtimg.cn/images/yxzj/img201606/mingwen/${item.ming_id}.png`,
          desc: Array.from(item.ming_des.matchAll(/<.*?>(.*?)<\/.*?>/gi)).map((i) => i[1]),
        }]);
      }
      console.log(this.colorLog(`${++this.currentIndex}. 铭文写入完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取不到铭文!", "red"));
    }
  }

  /**
   * 获取召唤师技能
   * @memberof Spider
   */
  async getSummoner() {
    try {
      await allModel.Summoner.deleteMany();
      const res = await this.Client({ url: "https://pvp.qq.com/web201605/js/summoner.json" });
      for (const item of res.data) {
        await allModel.Summoner.insertMany([{
          id: item.summoner_id,
          img: `https://game.gtimg.cn/images/yxzj/img201606/summoner/${item.summoner_id}.jpg`,
          name: item.summoner_name,
          // rank: Array.from(item.summoner_rank.matchAll(/LV\.(\d+)解锁/ig), i => i[1])[0],
          rank: Number(/LV\.(\d+)解锁/ig.exec(item.summoner_rank)[1]),
          description: item.summoner_description,
        }]);
      }
      console.log(this.colorLog(`${++this.currentIndex}. 召唤师技能写入完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取不到召唤师技能!", "red"));
    }
  }

  /**
   * 获取商品
   * @memberof Spider
   */
  async getItems() {
    try {
      await allModel.Items.deleteMany();
      const res = await this.Client({ url: "https://pvp.qq.com/web201605/js/item.json" });
      const data = res.data.map(item => {
        // 根据价格分一下级
        let star = 1;
        if (item.total_price >= 500 && item.total_price < 1600) {
          star = 2;
        } else if (item.total_price >= 1600) {
          star = 3;
        }
        return {
          id: item.item_id,
          name: item.item_name,
          icon: `https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`,
          star,
          price: item.total_price,
          desc: item.des1?.length ? item.des1.replace(/<\/?p>/g, "").trim().split("<br>") : "",
          passive: item?.des2?.length ? item.des2.replace(/<\/?p>/g, "").trim().split("<br>") : [],
        }
      });
      await allModel.Items.insertMany(data);
      console.log(this.colorLog(`${++this.currentIndex}. 武器写入完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取武器列表失败了!", "red"));
    }
  }
  
  /**
   * 攻略中心
   * @memberof Spider
   */
  async getStrategy() {
    try {
      console.log(this.colorLog(`${++this.currentIndex}. 攻略图文/视频开始写入!`, "green"));
      await allModel.Strategy.deleteMany();
      await this.getHotVdo();
      await this.getHeroStrategy();
      await this.getBoutiqueColumn();
      await this.contest();
      await this.wonderfulVdo();
      console.log(this.colorLog(`${this.currentIndex}. 攻略图文/视频写入完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取攻略中心的内容失败了!", "red"));
    }
  }

  /**
   * 获取热门视频
   */
  async getHotVdo() {
    try {
      // 热门视频,
      // https://ams.qq.com/wmp/data/js/v3/WMP_RANKLIST_GW_18.js
      const hotVdo = await this.Client({ url: "https://ams.qq.com/wmp/data/js/v3/WMP_RANKLIST_GW_18.js" });
      const hotVdoStr = [...hotVdo.data.matchAll(/^.*?=.*?({.*});$/gi)];
      const hotVdoObj = JSON.parse(hotVdoStr[0][1]).msg;
      const dataCateId = (await allModel.Category.findOne({ name: "日" })).id;
      const weekCateId = (await allModel.Category.findOne({ name: "周" })).id;
      const monthCateId = (await allModel.Category.findOne({ name: "月" })).id;
      for (const key in hotVdoObj) {
        if (key === "dpvlist" || key === "wpvlist" || key === "mpvlist") {
          // console.log(key, hotVdoObj[key]);
          let cate = [];
          // 日
          key === "dpvlist" && (cate = [dataCateId]);
          // 周
          key === "wpvlist" && (cate = [weekCateId]);
          // 月
          key === "mpvlist" && (cate = [monthCateId]);
          for (const item of hotVdoObj[key]) {
            await allModel.Strategy.insertMany([{
              name: item.sTitle,
              author: item.sAuthor,
              img: item.sIMG.indexOf("//") === 0 ? `https:${item.sIMG}` : item.sIMG,
              iTime: item.iTime,
              category: cate,
              vdoId: item.iVideoId,
              createdTime: item.sCreated,
              playCount: item.iTotalPlay,
            }]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取热门视频出错!", "red"));
    }
  }

  /**
   * 英雄攻略
   */
  async getHeroStrategy() {
    try {
      const cate = [(await allModel.Category.findOne({ name: "英雄攻略" })).id];
      let index = 0;
      for (const item of Object.keys(this.heroMap)) {
        console.log(`${++index}. 英雄攻略 -- ${item}`);
        let tag = this.heroMap[item].tag;
        if (!tag) { continue; }
        let res = await this.Client({ url: `https://apps.game.qq.com/cmc/cross?serviceId=18&typeids=1&sortby=sIdxTime&tagids=${tag}%2C619&limit=2&source=web_m&filter=tag&exclusiveChannel=4&exclusiveChannelSign=0dce11a6348b1d63bea1f0e5417b1afe&time=${Date.now()}` });
        // console.log('1 图文', res.data.data.items);
        for (const item1 of res.data.data.items) {
          // let sCoverMap = JSON.parse(item1.sCoverMap)
          // let img = sCoverMap[Object.keys(sCoverMap).at(-1)]?.Url
          let sizes = item1.sCoverList.map((i) => i.size.split("*")[0]);
          let max = Math.max.apply(null, sizes);
          let img = item1.sCoverList[sizes.findIndex((i) => Number(i) === max)]?.url;
          // console.log(sizes, max, img);
          let contentRes = await this.Client({ url: `https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${item1.iNewsId}` });
          await allModel.Strategy.insertMany([{
            newsId: item1.iNewsId,
            name: item1.sTitle,
            author: item1.sAuthor,
            img,
            category: cate,
            heros: [item],
            createdTime: item1.sCreated,
            content: this.parseRes(contentRes.data).msg.sContent,
          }]);
        }
        res = await this.Client({
          url: `https://apps.game.qq.com/cmc/cross?serviceId=18&typeids=2&sortby=sIdxTime&tagids=${tag}%2C619&limit=2&source=web_m&filter=tag&exclusiveChannel=4&exclusiveChannelSign=0dce11a6348b1d63bea1f0e5417b1afe&time=${Date.now()}`,
        });
        // console.log('2 视频', res.data.data.items);
        for (const item1 of res.data.data.items) {
          let sizes = item1.sCoverList.map((i) => i.size.split("*")[0]);
          let max = Math.max.apply(null, sizes);
          let img = item1.sCoverList[sizes.findIndex((i) => Number(i) === max)]?.url;
          // console.log(sizes, max, img);
          await allModel.Strategy.insertMany([{
            name: item1.sTitle,
            author: item1.sAuthor,
            img,
            category: cate,
            heros: [item],
            vdoId: String(item1.iVideoId),
            createdTime: item1.sCreated,
            playCount: (item1.iTotalPlay / 10000).toFixed(2) + "万",
          }]);
        }
        // if (index>=1) {
        //   break
        // }
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取英雄攻略出错!", "red"));
    }
  }

  /**
   * 精品栏目
   */
  async getBoutiqueColumn() {
    try {
      const parentId = (await allModel.Category.findOne({ name: "精品栏目" })).id;
      const newId = (await allModel.Category.findOne({ name: "最新", parent: parentId })).id;
      const mblId = (await allModel.Category.findOne({ name: "马菠萝奇闻录", parent: parentId })).id;
      const drjId = (await allModel.Category.findOne({ name: "狄仁杰封神榜", parent: parentId })).id;
      const ids = [newId, mblId, drjId];
      // console.log(parentId, newId, mblId, drjId);
      // 存放爬取的 video id
      const idList = [];
      const spiderList = [
        // 最新
        "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iTag&id=4780,5090",
        // 马菠萝奇闻录
        "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iTag&id=5090",
        // 狄仁杰封神榜
        "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iTag&id=4780",
      ];
      let index = 0;
      for (const url of spiderList) {
        let res = await this.Client({ url });
        let obj = this.parseRes(res.data);
        for (const item of obj.msg.result) {
          if (idList.includes(item.iVideoId)) {
            // mblId
            let c = await allModel.Strategy.findOneAndUpdate(
              { vdoId: item.iVideoId },
              { $push: { category: ids[index] } }
            );
          } else {
            idList.push(item.iVideoId);
            await allModel.Strategy.insertMany([{
              name: item.sTitle,
              author: item.sAuthor,
              img: this.getBigImg(item.sCoverList),
              iTime: item.iTime,
              category: [ids[index]],
              vdoId: item.iVideoId,
              createTime: item.sCreated,
              playCount: item.iTotalPlay,
            }]);
          }
        }
        index++;
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取精品栏目出错!", "red"));
    }
  }

  /**
   * 赛事精品
   */
  async contest() {
    try {
      const tags = [
        { tag: "1639,1852,4784,4785,4786,4787,4775", name: "最新" },
        { tag: "1639", name: "王者炸麦了" },
        { tag: "4775", name: "绝对王者" },
        { tag: "4785", name: "超神快讯1+1" },
        { tag: "1852", name: "荣耀大话王" },
        { tag: "4784", name: "KPL云电台" },
        { tag: "4786", name: "荣耀宅急送" },
        { tag: "4787", name: "王者好莱坞" },
      ];
      const parentId = (await allModel.Category.findOne({ name: "赛事精品" })).id;
      const idList = [];
      for (const tag of tags) {
        const res = await this.Client({ url: `https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iTag&id=${tag.tag}` });
        console.log(tag.name, `https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iTag&id=${tag.tag}`);
        const obj = this.parseRes(res.data);
        // console.log(obj);
        const id = (await allModel.Category.findOne({ name: tag.name, parent: parentId })).id;
        // console.log("分类 id", id);
        for (const item of obj.msg.result) {
          if (idList.includes(item.iVideoId)) {
            await allModel.Strategy.findOneAndUpdate(
              { vdoId: item.iVideoId },
              { $push: { category: id } }
            );
          } else {
            idList.push(item.iVideoId);
            await allModel.Strategy.insertMany([{
              name: item.sTitle,
              author: item.sAuthor,
              img: this.getBigImg(item.sCoverList),
              iTime: item.iTime,
              category: [id],
              vdoId: item.iVideoId,
              createTime: item.sCreated,
              playCount: item.iTotalPlay,
            }]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取赛事精品出错!", "red"));
    }
  }

  /**
   * 精彩视频
   */
  async wonderfulVdo() {
    try {
      const tags = [
        {
          tag: "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iKeyword&id=2142",
          name: "王者时刻",
        },
        {
          tag: "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iType&id=677",
          name: "王者学院",
        },
        {
          tag: "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iKeyword&id=862",
          name: "新手视频",
        },
        {
          tag: "https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iKeyword&id=591",
          name: "官方视频",
        },
      ];
      const idList = [];
      const parentId = (await allModel.Category.findOne({ name: "精彩视频" })).id;
      for (const tag of tags) {
        const url = tag.tag;
        console.log(tag.name, url);
        const res = await this.Client({ url });
        const obj = this.parseRes(res.data);
        // console.log(obj.msg.result);
        const id = (await allModel.Category.findOne({ name: tag.name, parent: parentId })).id;
        console.log("分类id", id);
        for (const item of obj.msg?.result) {
          if (idList.includes(item.iVideoId)) {
            await allModel.Strategy.findOneAndUpdate(
              { vdoId: item.iVideoId },
              { $push: { category: id } }
            );
          } else {
            idList.push(item.iVideoId);
            await allModel.Strategy.insertMany([{
              name: item.sTitle,
              author: item.sAuthor,
              img: this.getBigImg(item.sCoverList),
              iTime: item.iTime,
              category: [id],
              vdoId: item.iVideoId,
              createTime: item.sCreated,
              playCount: item.iTotalPlay,
            }]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取赛事精品出错!", "red"));
    }
  }
  
  /**
   * 获取文章
   * @memberof Spider
   */
  async getArticle() {
    console.log(this.colorLog(`${++this.currentIndex}. 开始写入文章!`, "green"));
    try {
      await allModel.Article.deleteMany();
      // 要获取的文章数量
      const len = 100;
      const limit = 50;
      const pId = (await allModel.Category.findOne({ name: "新闻资讯" })).id;
      // 请求参数
      const Channels = new Map([
        [ 1760, (await allModel.Category.findOne({ name: "热门", parent: pId })).id ],
        [ 1761, (await allModel.Category.findOne({ name: "新闻", parent: pId })).id ],
        [ 1762, (await allModel.Category.findOne({ name: "公告", parent: pId })).id ],
        [ 1763, (await allModel.Category.findOne({ name: "活动", parent: pId })).id ],
        [ 1764, (await allModel.Category.findOne({ name: "赛事", parent: pId })).id ],
      ]);
      // 赛事中心文章请求参数
      const centerList = [
        { name: "KPL", tagid: "2660" },
        { name: "挑战者杯", tagid: "2661" },
        { name: "K甲联赛", tagid: "2638" },
        { name: "TGA", tagid: "2664" },
        { name: "WGI", tagid: "2666" },
        { name: "模拟战大师赛", tagid: "4645" },
      ];
      const centerId = (await allModel.Category.findOne({ name: "赛事中心" })).id;
      // 记录id, 用于去重
      let arrRecodeId = [];
      let centerArticleId = [];
      for (const [chanid, value] of Channels) {
        for (let start = 0; start < len; start += limit) {
          let url = `https://apps.game.qq.com/cmc/cross?serviceId=18&filter=channel&sortby=sIdxTime&source=web_m&limit=${limit}&start=${start}&logic=or&typeids=1&chanid=${chanid}&exclusiveChannel=5&exclusiveChannelSign=eb0f0ed6328ca0b4e529e8d8b71096a2&time=${Date.now()}`;
          // console.log(type.get(chanid), url);
          let res = await this.Client({ url });
          for (const item of res.data.data.items) {
            // 如果以保存过该id, 跳过本次循环
            if (arrRecodeId.includes(item.iId)) {
              console.log(this.colorLog(`id: ${item.iId} 文章id已存在, 跳过爬取!`, "yellow"));
              continue;
            }
            // console.log(item);
            let cate = item.sChannel.filter((i) => i && Channels.get(i)).map((i) => Channels.get(i));
            // console.log(cate);
            let page = await this.Client({ url: `https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${item.iId}` });
            // https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${iId}
            let content = new RegExp(`^.*?=\s?(.*?);?$`, "igms");
            content = content.exec(page.data)[1];
            content = JSON.parse(content);
            // console.log(content);
            console.log(this.colorLog(`文章id: ${item.iId} 名称: ${item.sTitle}`, "green"));
            await allModel.Article.insertMany([{
              id: item.iId,
              name: item.sTitle,
              category: cate,
              content: content.msg.sContent,
              createdTime: Date.parse(content.msg.sCreated),
            }]);
            arrRecodeId.push(item.iId);
          }
        }
      }
      
      for (const item of centerList) {
        let cateId = (await allModel.Category.findOne({ name: item.name, parent: centerId })).id;
        console.log('文章', item.name, cateId);
        let res = await this.Client({ url: `https://apps.game.qq.com/cmc/cross?serviceId=18&typeids=1&sortby=sIdxTime&tagids=${item.tagid}&limit=50&source=web_m&filter=tag&logic=or&start=0&exclusiveChannel=4&exclusiveChannelSign=c19997f83ec0073cfe6410730c4f4fa3&time=${Date.now()}` });
        // console.log(res.data.data.items);
        for (const article of res.data.data.items) {
          if (centerArticleId.includes(article.iId)) {
            console.log(this.colorLog(`${article.iId} 已存在!`, "yellow"));
            await allModel.Article.findOneAndUpdate(
              { id: article.iId },
              { $push: { category: cateId } }
            );
            continue;
          } else {
            let articleCon = await this.Client({ url: `https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${article.iId}` });
            let obj = this.parseRes(articleCon.data);
            console.log('文章', item.name, obj.msg.sTitle);
            await allModel.Article.insertMany([{
              id: article.iId,
              name: article.sTitle,
              category: [cateId],
              content: obj.msg.sContent,
              createdTime: Date.parse(obj.msg.sCreated),
            }]);
          }
        }
      }
      console.log(this.colorLog(`${this.currentIndex}. 获取文章完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取文章出错!", "red"));
    }
  }

  /**
   * 获取英雄
   * @memberof Spider
   */
  async getHero() {
    try {
      const heroList = await this.Client({ url: "https://pvp.qq.com/web201605/js/herolist.json" });
      let index = 0;
      if (heroList.status === 200) {
        await allModel.Hero.deleteMany();
        console.log(this.colorLog(`${++this.currentIndex}. 开始爬取英雄详情信息!`, "green"));
        // 取得所有 ename
        let enameList = heroList.data.map((item) => String(item.ename));
        for (const ename of enameList) {
          const url = `https://pvp.qq.com/web201605/herodetail/m/${ename}.html`;
          const pageRes = await this.Client({
            url: `https://pvp.qq.com/web201605/herodetail/m/${ename}.html`,
            // 解决乱码
            // axios 请求的结果会转成utf-8(但这里实际上是gbk), 而转换是有损的
            // 把结果设置为 buffer, 再 使用iconv-lite 解析 buffer 数据
            responseType: "arraybuffer",
          });
          if (pageRes.status === 200) {
            let html = iconv.decode(pageRes.data, "gbk");
            let heroName = Array.from(html.matchAll(/<p class="hero-name">(.*?)<\/p>/gi))[0][1];
            let heroInfoData = await this.getHeroInfo(html, ename);
            await allModel.Hero.insertMany([heroInfoData]);
            console.log(this.colorLog(`第${++index}个 ${heroName}: ${url} 英雄详情!`, "green"));
          } else {
            console.log(this.colorLog(`获取 ${url} 出错了`, "red"));
          }
        }
        await this.updateRelationHero(enameList)
      }
      console.log(this.colorLog(`${this.currentIndex}. 获取英雄完成!`, "green"));
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取英雄出错!", "red"));
    }
  }

  /**
   * 获取英雄详情信息
   * @param {string} data 英雄详情页的html
   * @param {string} ename 英雄的ename
   * @memberof Spider
   */
  async getHeroInfo(data, ename) {
    try {
      const $ = cheerio.load(data);
      // const log = true
      const log = false;
      const hotList = [ "安琪拉", "后羿", "妲己", "鲁班七号", "孙尚香", "瑶", "甄姬", "亚瑟", "马可波罗", "孙策" ];
      const hotId = (await allModel.Category.findOne({name: "热门"})).id;
      const heroName = $("p.hero-name").text();
      const nickname = $("p.hero-title").text();
      const backgroundImg = "https:" + $(".header-hero>img").attr("src");
      log && console.log(backgroundImg);

      const scores = {};
      const difficulty = new RegExp(`<li>.*?难度.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`, "igms").exec(data);
      difficulty?.length > 1 && (scores.difficulty = Number(difficulty[1]));
      const skill = new RegExp(`<li>.*?技能.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`, "igms").exec(data);
      skill?.length > 1 && (scores.skill = Number(skill[1]));
      const attack = new RegExp(`<li>.*?攻击.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`, "igms").exec(data);
      attack?.length > 1 && (scores.attack = Number(attack[1]));
      const survive = new RegExp(`<li>.*?生存.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`, "igms").exec(data);
      survive?.length > 1 && (scores.survive = Number(survive[1]));
      log && this.jsonLog(scores);

      const heroTypeMap = new Map([
        [1, "战士"], [2, "法师"], [3, "坦克"], [4, "刺客"], [5, "射手"], [6, "辅助"],
      ]);
      // '5/' 转为 ["射手"]
      const cateName = $("p.hero-location").attr("data-herotype").split("/")
        .filter((i) => i)
        .map((i) => heroTypeMap.get(Number(i)));
      const cate = [];
      for (const i of cateName) {
        cate.push((await allModel.Category.findOne({ name: i })).id);
        if (hotList.includes(heroName)) cate.push(hotId);
      }
      log && console.log(cate);

      // 半神之弓&0|精灵王&0|阿尔法小队&1|辉光之辰&25|黄金射手座&33|如梦令&69|圣弓游侠&40|无尽星芒&5
      // ['半神之弓', '精灵王', '阿尔法小队', '辉光之辰', '黄金射手座', '如梦令', '圣弓游侠', '无尽星芒']
      const skins = $("a.hero-skin").attr("data-imgname").split(/&[0-9]+\|?/gi).filter(i => i)
        .map((item, index) => {
          return {
            name: item,
            img: `https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${ename}/${ename}-mobileskin-${index + 1}.jpg`,
          };
        });
      log && this.jsonLog(skins);

      const skills = [];
      const skillsIconRe = new RegExp(`<li onclick='pgvSendClick.*?<img src="(.*?)"`, "imgs");
      const skillIcon = [...data.matchAll(skillsIconRe)].map((i) => "https:" + i[1]);
      const skillRe = new RegExp(`<div class="plus-box c">.*?<span class="plus-name" data-skillid="(.*?)">(.*?)</span>.*?<span class="plus-value">(.*?)</span>.*?<p class="plus-int">(.*?)</p>.*?<p class="prompt">(.*?)</p>`, "igms");
      const skillsArr = [...data.matchAll(skillRe)];
      skillsArr.forEach((item, index) => {
        if (item[1].length) {
          skills.push({
            id: item[1],
            name: item[2],
            delay: item[3],
            desc: item[4],
            icon: skillIcon[index],
            tips: item[5],
          });
        }
      });
      log && this.jsonLog(skills);
      
      const levelUp = [];
      const one = new RegExp(`主升</span>.*?<img src="(.*?)".*?<span.*?data-upskill="(.*?)">`, "imgs");
      const two = new RegExp(`副升</span>.*?<img src="(.*?)".*?<span.*?data-upskill="(.*?)">`, "imgs");
      const levelUpSkill = [...data.matchAll(one), ...data.matchAll(two)];
      levelUpSkill.forEach((i) => {
        let index = skills.findIndex(ii => ii.id == i[2])
        index !== -1 && levelUp.push(index)
      });
      log && this.jsonLog(levelUp);

      // 召唤师技能 id
      let summonersTemp = $("#skill3").attr("data-skill").split("|");
      let summonersId = []
      for (const i of summonersTemp) {
        summonersId.push((await allModel.Summoner.findOne({ id: i }))?._id)
      }
      log && console.log(summonersId);

      // 铭文
      let inscriptionTemp = $(".rune-list").attr("data-ming").split("|");
      let inscriptionId = []
      for (const i of inscriptionTemp) {
        inscriptionId.push((await allModel.Inscription.findOne({ id: i }))?._id)
      }
      log && console.log(inscriptionId);

      // 顺风出装 
      let smoothly = [];
      // 逆风出装
      let adversity = [];
      let equipment = $("ul.build-list.equip-list")
      for (let index = 0; index < equipment.length; index++) {
        const item = equipment[index];
        let temp = $(item).attr("data-item").split("|")
        for (const i of temp) {
          (!index ? smoothly : adversity).push((await allModel.Items.findOne({ id: i }))?._id)
        }
      }
      log && console.log(smoothly, adversity);
      
      // 使用技巧 对抗技巧 团战思路
      const tipsList = [];
      const tips = new RegExp(`<div class="autom">.*?<h3 class="tit1 ic1[345]">(.*?)</h3>.*?<p class="use-skills">(.*?)</p>`, "igms");
      Array.from(data.matchAll(tips)).forEach((i) => {
        tipsList.push({ title: i[1], content: i[2] });
      });
      log && this.jsonLog(tipsList);
      
      const relationsTitle = $(".tit1.ic8 ~ p").map((index, item) => { 
        return $(item).text(); 
      }).get();
      log && console.log(relationsTitle); // ['最佳搭档', '被谁克制', '克制谁']

      const relations = [];
      let relaList = $(".rela-list")
      for (let index1 = 0; index1 < relaList.length; index1++) {
        const item1 = relaList[index1];
        let temp = { title: "", relation: [] };
        temp.title = relationsTitle[index1];
        let li = $(item1).find("li")
        for (let index2 = 0; index2 < li.length; index2++) {
          const item2 = li[index2];
          let ename = Array.from($(item2).find("img").attr("src").matchAll(/.*\/(.*?)\/.*?$/gi))[0][1]
          temp.relation.push({
            ename,
            content: $(item2).find("p").text(),
          })
        }
        relations.push(temp);
      }
      log && this.jsonLog(relations);
      
      return {
        name: heroName,
        nickname,
        ename,
        avatar: `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}.jpg`,
        backgroundImg,
        // 一图识英雄
        photo: `https://game.gtimg.cn/images/yxzj/m/m201706/images/heropicdetail/${ename}.jpg`,
        category: cate,
        scores,
        skins,
        skills,
        levelUp,
        inscriptionId,
        summonersId,
        equipment: {
          downWind: smoothly,
          upWind: adversity
        },
        tips: tipsList,
        relations,
      };
    } catch (error) {
      console.log(error);
      console.log(this.colorLog(`${ename} 获取英雄详情信息出错!`, "red"));
    }
  }

  /**
   * 更新英雄关系的内容
   * @param {array} enameList 
   */
  async updateRelationHero(enameList) {
    for (const ename of enameList) {
      let h = await allModel.Hero.findOne({ ename })
      for (const item1 of h.relations) {
        for (const item2 of item1.relation) {
          let temp = await allModel.Hero.findOne({ ename: item2.ename })
          item2.hero = temp._id
        }
      }
      h.save()
    }
    await allModel.Hero.updateMany({}, { $unset: { 'relations.$[].relation.$[].ename': '' } })
  }

  /**
   * 颜色打印字符
   * @param {string} content 要打印的内容
   * @param {string} color 字体颜色
   * @param {string} bgColor 背景颜色
   * @memberof Spider
   */
  colorLog(content, color, bgColor) {
    const colors = {
      bold: ["\u001b[1m", "\u001b[22m"],
      black: ["\u001b[30m", "\u001b[39m"],
      red: ["\u001b[31m", "\u001b[39m"],
      green: ["\u001b[32m", "\u001b[39m"],
      yellow: ["\u001b[33m", "\u001b[39m"],
      bgBlack: ["\u001b[40m", "\u001b[49m"],
      bgRed: ["\u001b[41m", "\u001b[49m"],
      bgGreen: ["\u001b[42m", "\u001b[49m"],
      bgYellow: ["\u001b[43m", "\u001b[49m"],
    };
    let str = colors[color].join(content);
    if (bgColor) {
      str = colors[bgColor].join(str);
    }
    // console.log(str);
    return str;
  }

  /**
   * 把字符串 var xxx = {...}; 等于号右侧转为 对象
   */
  parseRes(str) {
    return Array.from(str.matchAll(/^.*?=\s*(.*);+$/gi), (m) =>
      JSON.parse(m[1])
    )[0];
  }

  /**
   * 从 sCoverList 提取最清晰的预览图
   * @param {array} list
   */
  getBigImg(list) {
    let sizes = list.map((i) => i.size.split("*")[0]);
    let max = Math.max.apply(null, sizes);
    let img = list[sizes.findIndex((i) => Number(i) === max)]?.url;
    return img.indexOf("//") === 0 ? `https:${img}` : img;
  }

  jsonLog(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }

  formatT(num) {
    let m = parseInt(num/1000/60)
    let s = parseInt(num/1000%60)
    return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`
  }

}
