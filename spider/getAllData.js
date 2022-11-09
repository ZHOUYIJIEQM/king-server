/**
 * 爬取王者荣耀官网数据, 并保存到mongo数据库
 */
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const axiosRetry = require("axios-retry");
// utf-8 gbk 转换
const iconv = require("iconv-lite");
const fs = require("fs");
const https = require("https");
const path = require("path");
const requireAll = require("require-all");
const allModel = requireAll(path.join(__dirname, '..', "models"));

// 连接数据库
mongoose.connect("mongodb://kingdbuser:kingdbpsw@127.0.0.1:27017/kingdb");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误："));
db.once("open", async () => {
  console.log("连接成功!");
  // todo: 在这里执行爬取数据操作
  new Spider().run();
});

/**
 * 爬取王者荣耀官网的数据
 */
class Spider {
  constructor() {
    this.currentIndex = 0;
    // 配置请求
    this.headers = {
      "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36`,
    };
    this.Client = axios.create({
      headers: this.headers,
      // 忽略特定的 SSL 错误（如过期证书）
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
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
  }

  /**
   * 初始化,设置分类
   */
  async setCate() {
    try {
      await allModel.Category.deleteMany();
      let list = [
        {
          name: "英雄列表",
          child: ["热门", "战士", "法师", "坦克", "刺客", "射手", "辅助"],
        },
        {
          name: "攻略中心",
          child: [
            {
              name: "热门视频",
              child: ["日", "周", "月"],
            },
            "英雄攻略",
            {
              name: "精品栏目",
              child: ["最新", "马菠萝奇闻录", "狄仁杰封神榜"],
            },
            {
              name: "赛事精品",
              child: [
                "最新",
                "王者炸麦了",
                "绝对王者",
                "超神快讯1+1",
                "荣耀大话王",
                "KPL云电台",
                "荣耀宅急送",
                "王者好莱坞",
              ],
            },
            {
              name: "精彩视频",
              child: ["王者时刻", "王者学院", "新手视频", "官方视频"],
            },
            {
              name: "图文攻略",
              child: ["最新", "英雄", "新手", "官方", "同人"],
            },
          ],
        },
        {
          name: "新闻资讯",
          child: ["热门", "新闻", "公告", "活动", "赛事"],
        },
        {
          name: "赛事中心",
          child: [
            "KPL",
            "挑战者杯",
            "全国大赛",
            "K甲联赛",
            "高校联赛",
            "TGA",
            "WGI",
            "模拟战大师赛",
          ],
        },
      ];
      for (const item of list) {
        await this.writeCate(item);
      }
      console.log(
        this.colorLog(`${++this.currentIndex}. 分类写入完成!`, "green")
      );
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("分类写入数据库失败了!", "red"));
    }
  }

  /**
   * 写入分类
   */
  async writeCate(obj, parent = null) {
    if (obj.name) {
      await allModel.Category.insertMany([
        {
          name: obj.name,
          desc: `${obj.name}的介绍内容`,
          parent,
        },
      ]);
    }
    for (const item of obj?.child) {
      let parentId = (
        await allModel.Category.findOne({ name: obj.name, parent })
      )?.id;
      if (typeof item === "string") {
        await allModel.Category.insertMany([
          {
            name: item,
            desc: `${item}的介绍内容`,
            parent: parentId || null,
          },
        ]);
      } else {
        await this.writeCate(item, parentId);
      }
    }
  }

  /**
   * 管理人员
   */
  async setUser() {
    try {
      await allModel.AdminUser.deleteMany({});
      const admin = {
        username: "admin",
        password: "123456",
        level: 1,
      };
      const xiaoming = {
        username: "xiaoming",
        password: "123456",
        level: 2,
      };
      await allModel.AdminUser.insertMany([admin, xiaoming]);
      console.log(
        this.colorLog(`${++this.currentIndex}. 管理人员写入完成!`, "green")
      );
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("设置管理人员失败了!", "red"));
    }
  }

  /**
   * 英雄详情信息
   */
  async spiderHero() {
    try {
      let index = 0;
      let heroList = await this.Client({
        url: "https://pvp.qq.com/web201605/js/herolist.json",
      });
      if (heroList.status === 200) {
        let enameList = heroList.data.map((item) => item.ename);
        await allModel.Hero.deleteMany({});
        for (const ename of enameList) {
          let url = `https://pvp.qq.com/web201605/herodetail/m/${ename}.html`;
          let pageRes = await this.Client({
            url,
            responseType: "arraybuffer",
          });
          if (pageRes.status === 200) {
            let html = iconv.decode(pageRes.data, "gbk");
            let heroName = Array.from(
              html.matchAll(/<p class="hero-name">(.*?)<\/p>/gi)
            )[0][1];
            let heroInfoData = await this.getHeroInfo(html, ename);
            await allModel.Hero.insertMany([heroInfoData]);
            console.log(
              this.colorLog(`第${++index}个 ${heroName}: ${url} 英雄详情!`, "green")
            );
          } else {
            console.log(this.colorLog(`获取 ${url} 出错了`, "red"));
          }
        }
        console.log(
          this.colorLog(
            `${++this.currentIndex}. 共${index}个英雄爬取完成!`,
            "green"
          )
        );
      } else {
        console.log(this.colorLog("获取不到英雄列表接口数据", "red"));
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("爬取英雄详情页出错了!", "red"));
    }
  }

  /**
   * cheerio, 正则 提取英雄详情页面中的内容
   * @param {String} data 网页内容
   * @param {Number} ename 对应的英雄 ename 类似 id
   */
  async getHeroInfo(data, ename) {
    try {
      const $ = cheerio.load(data);
      // 测试阶段, 是否显示打印内容
      // let log = true
      let log = false;

      let hotList = [
        "安琪拉",
        "后羿",
        "妲己",
        "鲁班七号",
        "孙尚香",
        "瑶",
        "甄姬",
        "亚瑟",
        "马可波罗",
        "孙策",
      ];
      let hotId = (await allModel.Category.findOne({ name: "热门" })).id;

      let name = $("p.hero-name").text();
      let nickname = $("p.hero-title").text();

      // 背景 banner
      let banner = "https:" + $(".header-hero>img").attr("src");
      log && console.log(banner); // https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/105/105-bigskin-1.jpg

      // 评级 难度 技能 攻击 生存
      let scores = {};
      let difficulty = new RegExp(
        `<li>.*?难度.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`,
        "igms"
      ).exec(data);
      difficulty?.length > 1 && (scores.difficulty = Number(difficulty[1]));
      let skill = new RegExp(
        `<li>.*?技能.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`,
        "igms"
      ).exec(data);
      skill?.length > 1 && (scores.skill = Number(skill[1]));
      let attack = new RegExp(
        `<li>.*?攻击.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`,
        "igms"
      ).exec(data);
      attack?.length > 1 && (scores.attack = Number(attack[1]));
      let survive = new RegExp(
        `<li>.*?生存.*?<span class=['"]cnver.*?hero-attr.-(.*?)['"]></span>`,
        "igms"
      ).exec(data);
      survive?.length > 1 && (scores.survive = Number(survive[1]));
      log && this.jsonLog(scores);
      // { "difficulty": 3, "skill": 4, "attack": 3, "survive": 10 }

      // 分类
      let locationRule = new Map([
        [1, "战士"],
        [2, "法师"],
        [3, "坦克"],
        [4, "刺客"],
        [5, "射手"],
        [6, "辅助"],
      ]);
      let cateName = $("p.hero-location")
        .attr("data-herotype")
        .split("/")
        .filter((i) => i)
        .map((i) => locationRule.get(Number(i)));
      // console.log(cateName); // ['坦克']
      let cate = [];
      for (const i of cateName) {
        cate.push((await allModel.Category.findOne({ name: i })).id);
        if (hotList.includes(name)) {
          cate.push(hotId);
        }
      }
      // todo: mongo查询, 根据分类名称获取对应 ObjectId
      log && console.log(cate);
      // 数组长度查询
      // db.getCollection("heros").find({ $where: "this.cate.length >= 2" })

      // 皮肤
      let skins = $("a.hero-skin")
        .attr("data-imgname")
        .split(/&[0-9]+\|?/gi)
        .slice(0, -1)
        .map((item, index) => {
          return {
            name: item,
            img: `https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${ename}/${ename}-mobileskin-${
              index + 1
            }.jpg`,
          };
        });
      log && this.jsonLog(skins);

      // 技能
      let skills = [];
      let skillsIconRe = new RegExp(
        `<li onclick='pgvSendClick.*?<img src="(.*?)"`,
        "imgs"
      );
      let skillIcon = [...data.matchAll(skillsIconRe)].map(
        (i) => "https:" + i[1]
      );
      let skillRe = new RegExp(
        `<div class="plus-box c">.*?<span class="plus-name" data-skillid="(.*?)">(.*?)</span>.*?<span class="plus-value">(.*?)</span>.*?<p class="plus-int">(.*?)</p>.*?<p class="prompt">(.*?)</p>`,
        "igms"
      );
      let skillsArr = [...data.matchAll(skillRe)];
      skillsArr.forEach((item, index) => {
        if (item[1].length) {
          skills.push({
            id: item[1],
            name: item[2],
            delay: item[3],
            desc: item[4],
            icon: skillIcon[index],
            // todo: 可以再加入这个小提示
            tips: item[5],
          });
        }
      });
      log && this.jsonLog(skills);

      // 升级加点建议
      let levelUp = [];
      let one = new RegExp(
        `主升</span>.*?<img src="(.*?)".*?<span.*?data-upskill="(.*?)">`,
        "imgs"
      );
      let two = new RegExp(
        `副升</span>.*?<img src="(.*?)".*?<span.*?data-upskill="(.*?)">`,
        "imgs"
      );
      one = [...data.matchAll(one), ...data.matchAll(two)];
      one.forEach((i) => {
        levelUp.push({
          icon: "https:" + i[1],
          id: i[2],
        });
      });
      console.log();
      log && this.jsonLog(levelUp);

      // 召唤师技能 id
      let summonersId = $("#skill3").attr("data-skill").split("|");
      log && console.log(summonersId); // ['80115', '80121']

      // 顺风出装 // 逆风出装
      let smoothly = [],
        adversity = [];
      $("ul.build-list.equip-list").each(function (index, item) {
        index === 0 && (smoothly = $(this).attr("data-item").split("|"));
        index === 1 && (adversity = $(this).attr("data-item").split("|"));
      });
      log && this.jsonLog(smoothly); // [ "1336", "1421", "1331", "1333", "1335", "1332" ]
      log && this.jsonLog(adversity); // [ "1331", "1421", "1335", "1137", "1332", "1338" ]

      // 铭文
      let InscriptionId = $(".rune-list").attr("data-ming").split("|");
      log && console.log(InscriptionId); // ['1504', '3514', '2517']

      // 使用技巧 对抗技巧 团战思路
      let tipsList = [];
      let tips = new RegExp(
        `<div class="autom">.*?<h3 class="tit1 ic1[345]">(.*?)</h3>.*?<p class="use-skills">(.*?)</p>`,
        "igms"
      );
      tips = Array.from(data.matchAll(tips));
      // console.log(tips);
      tips.forEach((i) => {
        tipsList.push({
          title: i[1],
          content: i[2],
        });
      });
      log && this.jsonLog(tipsList);

      // 英雄关系 最佳搭档 被谁克制 克制谁
      // let relationsTitle = Array.from($('.tit1.ic8 ~ p')).map(i => i?.children[0]?.data)
      let relationsTitle = $(".tit1.ic8 ~ p")
        .map(function (index, item) {
          return $(this).text();
        })
        .get();
      log && console.log(relationsTitle); // ['最佳搭档', '被谁克制', '克制谁']
      let relations = [];
      $(".rela-list").each(function (index1, item1) {
        // console.log($(this).find('p').text())
        let temp = { title: "", hero: [] };
        temp.title = relationsTitle[index1];
        $(this)
          .find("li")
          .each(function (index2, item2) {
            temp.hero.push({
              ename: Array.from(
                $(this)
                  .find("img")
                  .attr("src")
                  .matchAll(/.*\/(.*?)\/.*?$/gi)
              )[0][1],
              icon: "https:" + $(this).find("img").attr("src"),
              content: $(this).find("p").text(),
            });
          });
        relations.push(temp);
      });
      log && this.jsonLog(relations);

      return {
        name,
        nickname,
        ename: String(ename),
        avatar: `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}.jpg`,
        banner,
        // 一图识英雄
        photo: `https://game.gtimg.cn/images/yxzj/m/m201706/images/heropicdetail/${ename}.jpg`,
        cate,
        scores,
        skins,
        skills,
        levelUp,
        InscriptionId,
        summonersId,
        downWind: {
          equipment: smoothly,
        },
        upWind: {
          equipment: adversity,
        },
        tips: tipsList,
        relations,
      };
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("提取英雄详情信息错误!", "red"));
    }
  }

  /**
   * 获取召唤师技能
   */
  async getSummonerSkill() {
    try {
      await allModel.Summoner.deleteMany();
      let res = await this.Client({
        url: "https://pvp.qq.com/web201605/js/summoner.json",
      });
      for (const item of res.data) {
        await allModel.Summoner.bulkWrite([
          {
            insertOne: {
              document: {
                id: item.summoner_id,
                img: `https://game.gtimg.cn/images/yxzj/img201606/summoner/${item.summoner_id}.jpg`,
                name: item.summoner_name,
                rank: item.summoner_rank,
                description: item.summoner_description,
              },
            },
          },
        ]);
      }
      console.log(
        this.colorLog(`${++this.currentIndex}. 召唤师技能写入完成!`, "green")
      );
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取不到召唤师技能!", "red"));
    }
  }

  /**
   * 获取铭文
   */
  async getInscription() {
    try {
      await allModel.Inscription.deleteMany();
      let res = await this.Client({
        url: "https://pvp.qq.com/web201605/js/ming.json",
      });
      for (const item of res.data) {
        await allModel.Inscription.insertMany([
          {
            id: item.ming_id,
            type: item.ming_type,
            grade: item.ming_grade,
            name: item.ming_name,
            img: `https://game.gtimg.cn/images/yxzj/img201606/mingwen/${item.ming_id}.png`,
            desc: Array.from(item.ming_des.matchAll(/<.*?>(.*?)<\/.*?>/gi)).map(
              (i) => i[1]
            ),
          },
        ]);
      }
      console.log(
        this.colorLog(`${++this.currentIndex}. 铭文写入完成!`, "green")
      );
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取不到铭文!", "red"));
    }
  }

  /**
   * 轮播广告
   */
  async getAds() {
    try {
      await allModel.Ad.deleteMany();
      let imgBaseUrl = "https://ossweb-img.qq.com/upload/adw/";
      let res = await this.Client({
        url: "https://game.qq.com/time/qqadv/Info_new_15223.js",
      });
      let homeSwiper = { name: "首页轮播图", items: [] };
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
          // this.jsonLog(homeSwiper)
          // 写入广告数据
          await allModel.Ad.insertMany([homeSwiper]);
        }
      }

      // 首页英雄列表轮播
      let res1 = await this.Client({
        url: "https://pvp.qq.com/m/m201706/index.shtml",
      });
      if (res1.status === 200) {
        // fs.writeFileSync(`home.html`, res1.data)
        const $ = cheerio.load(res1.data);
        let list = { name: "英雄列表", items: [] };
        // 使用$(this), 不可用箭头函数
        $("#hero-img li").each(function (index, item) {
          let aHref = $(this).find("a").attr("href");
          let img = "https:" + $(this).find("img").attr("src");
          list.items.push({
            img,
            url: aHref,
          });
        });
        await allModel.Ad.insertMany([list]);
      }

      // 攻略中心轮播图
      // 测试时证书过期
      let res2 = await this.Client({
        url: "https://ams.qq.com/wmp/data/js/v3/WMP_VDRECLIST_GW_18_229.js",
      });
      if (res2.status === 200) {
        let obj = /^.*?\s*=\s*{(.*)}/gim.exec(res2.data);
        let swiperData = JSON.parse(`{${obj[1]}}`);
        let data = swiperData.msg.reclist_236
          .map((i) => {
            return {
              img: i.sIMG,
              url: i.sUrl,
            };
          })
          .slice(0, 4);
        await allModel.Ad.insertMany([
          {
            name: "攻略中心轮播图",
            items: data,
          },
        ]);
      }

      console.log(
        this.colorLog(`${++this.currentIndex}. 轮播广告写入完成!`, "green")
      );
    } catch (error) {
      console.log(error.message);
      console.log("获取轮播内容失败了");
    }
  }

  /**
   * 武器列表
   */
  async getItems() {
    try {
      await allModel.Items.deleteMany();
      let res = await this.Client({
        url: "https://pvp.qq.com/web201605/js/item.json",
      });
      let data = res.data.map((item) => {
        let star = 1;
        if (item.total_price >= 500 && item.total_price < 1600) {
          star = 2;
        } else if (item.total_price >= 1600) {
          star = 3;
        }
        return {
          name: item.item_name,
          icon: `https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`,
          star,
          price: item.total_price,
          itemId: item.item_id,
          desc: item?.des1?.length
            ? item.des1
                .replace(/<\/?p>/g, "")
                .trim()
                .split("<br>")
            : "",
          passive: item?.des2?.length
            ? item.des2
                .replace(/<\/?p>/g, "")
                .trim()
                .split("<br>")
            : [],
          // desc: item?.des1?.length ? item.des1.replace(/<.*?>/g, '').trim() : '',
          // detail: item?.des2?.length ? item.des2.replace(/<.*?>/g, '').trim() : ''
        };
      });
      await allModel.Items.insertMany(data);
      console.log(
        this.colorLog(`${++this.currentIndex}. 武器写入完成!`, "green")
      );
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取武器列表失败了!", "red"));
    }
  }

  /**
   * 获取文章
   */
  async getArticel() {
    try {
      await allModel.Article.deleteMany({});
      const pId = (await allModel.Category.findOne({ name: "新闻资讯" })).id;
      const Channels = new Map([
        [
          1760,
          (await allModel.Category.findOne({ name: "热门", parent: pId })).id,
        ],
        [
          1761,
          (await allModel.Category.findOne({ name: "新闻", parent: pId })).id,
        ],
        [
          1762,
          (await allModel.Category.findOne({ name: "公告", parent: pId })).id,
        ],
        [
          1763,
          (await allModel.Category.findOne({ name: "活动", parent: pId })).id,
        ],
        [
          1764,
          (await allModel.Category.findOne({ name: "赛事", parent: pId })).id,
        ],
      ]);
      const type = new Map([
        [1760, "热门"],
        [1761, "新闻"],
        [1762, "公告"],
        [1763, "活动"],
        [1764, "赛事"],
      ]);
      // 要获取的文章数量
      const len = 100;
      const limit = 50;
      // 记录id, 用于去重
      let arrRecodeId = [];
      for (const [chanid, value] of Channels) {
        for (let start = 0; start < len; start += limit) {
          let url = `https://apps.game.qq.com/cmc/cross?serviceId=18&filter=channel&sortby=sIdxTime&source=web_m&limit=${limit}&start=${start}&logic=or&typeids=1&chanid=${chanid}&exclusiveChannel=5&exclusiveChannelSign=eb0f0ed6328ca0b4e529e8d8b71096a2&time=${Date.now()}`;
          // console.log(type.get(chanid), url);
          let res = await this.Client({ url });
          for (const item of res.data.data.items) {
            // 如果以保存过该id, 跳过本次循环
            if (arrRecodeId.includes(item.iId)) {
              console.log(
                this.colorLog(
                  `id: ${item.iId} 文章id已存在, 跳过爬取!`,
                  "yellow"
                )
              );
              continue;
            }
            // console.log(item);
            let cate = item.sChannel
              .filter((i) => i && Channels.get(i))
              .map((i) => Channels.get(i));
            // console.log(cate);
            let page = await this.Client({
              url: `https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${item.iId}`,
            });
            // https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${iId}
            let content = new RegExp(`^.*?=\s?(.*?);?$`, "igms");
            content = content.exec(page.data)[1];
            content = JSON.parse(content);
            // console.log(content);
            console.log(
              this.colorLog(`id: ${item.iId} 名称: ${item.sTitle}`, "green")
            );
            await allModel.Article.insertMany([
              {
                iId: item.iId,
                title: item.sTitle,
                cate,
                content: content.msg.sContent,
                createdTime: content.msg.sCreated,
              },
            ]);
            arrRecodeId.push(item.iId);
          }
        }
      }

      let centerList = [
        { name: "KPL", tagid: "2660" },
        { name: "挑战者杯", tagid: "2661" },
        { name: "K甲联赛", tagid: "2638" },
        { name: "TGA", tagid: "2664" },
        { name: "WGI", tagid: "2666" },
        { name: "模拟战大师赛", tagid: "4645" },
      ];
      let centerId = (await allModel.Category.findOne({ name: "赛事中心" })).id;
      let centerArticleId = [];
      for (const item of centerList) {
        let cateId = (
          await allModel.Category.findOne({ name: item.name, parent: centerId })
        ).id;
        console.log(item.name, cateId);
        let res = await this.Client({
          url: `https://apps.game.qq.com/cmc/cross?serviceId=18&typeids=1&sortby=sIdxTime&tagids=${
            item.tagid
          }&limit=50&source=web_m&filter=tag&logic=or&start=0&exclusiveChannel=4&exclusiveChannelSign=c19997f83ec0073cfe6410730c4f4fa3&time=${Date.now()}`,
        });
        // console.log(res.data.data.items);
        for (const article of res.data.data.items) {
          if (centerArticleId.includes(article.iId)) {
            console.log(this.colorLog(`${article.iId} 已存在!`, "yellow"));
            await allModel.Article.findOneAndUpdate(
              { iId: article.iId },
              {
                $push: {
                  cate: cateId,
                },
              }
            );
            continue;
          } else {
            let articleCon = await this.Client({
              url: `https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${article.iId}`,
            });
            let obj = this.parseRes(articleCon.data);
            console.log(item.name, obj.msg.sTitle);
            await allModel.Article.insertMany([
              {
                iId: article.iId,
                title: article.sTitle,
                cate: [cateId],
                content: obj.msg.sContent,
                createdTime: obj.msg.sCreated,
              },
            ]);
          }
        }
      }

      console.log(
        this.colorLog(`${++this.currentIndex}. 文章写入完成!`, "green")
      );
    } catch (err) {
      console.log(err);
      console.log(this.colorLog("获取新闻文章失败了!", "red"));
    }
  }

  /**
   * 获取热门视频
   */
  async getHotVdo() {
    try {
      // 热门视频,
      // https://ams.qq.com/wmp/data/js/v3/WMP_RANKLIST_GW_18.js
      let hotVdo = await this.Client({
        url: "https://ams.qq.com/wmp/data/js/v3/WMP_RANKLIST_GW_18.js",
      });
      let hotVdoStr = [...hotVdo.data.matchAll(/^.*?=.*?({.*});$/gi)];
      let hotVdoObj = JSON.parse(hotVdoStr[0][1]).msg;

      let dataCateId = (await allModel.Category.findOne({ name: "日" })).id;
      let weekCateId = (await allModel.Category.findOne({ name: "周" })).id;
      let monthCateId = (await allModel.Category.findOne({ name: "月" })).id;
      // console.log(dataCateId, weekCateId, monthCateId);
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
            await allModel.Strategy.insertMany([
              {
                name: item.sTitle,
                author: item.sAuthor,
                img:
                  item.sIMG.indexOf("//") === 0
                    ? `https:${item.sIMG}`
                    : item.sIMG,
                iTime: item.iTime,
                cate,
                vdoId: item.iVideoId,
                createdTime: item.sCreated,
                playCount: item.iTotalPlay,
              },
            ]);
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
      let heroMap = {
        廉颇: {
          ename: "105",
          tag: "843",
        },
        小乔: {
          ename: "106",
          tag: "877",
        },
        赵云: {
          ename: "107",
          tag: "864",
        },
        墨子: {
          ename: "108",
          tag: "841",
        },
        妲己: {
          ename: "109",
          tag: "872",
        },
        嬴政: {
          ename: "110",
          tag: "881",
        },
        孙尚香: {
          ename: "111",
          tag: "890",
        },
        鲁班七号: {
          ename: "112",
          tag: "889",
        },
        庄周: {
          ename: "113",
          tag: "839",
        },
        刘禅: {
          ename: "114",
          tag: "842",
        },
        高渐离: {
          ename: "115",
          tag: "875",
        },
        阿轲: {
          ename: "116",
          tag: "903",
        },
        钟无艳: {
          ename: "117",
          tag: "863",
        },
        孙膑: {
          ename: "118",
          vdo: "656",
          tag: "896",
        },
        扁鹊: {
          ename: "119",
          vdo: "657",
          tag: "873",
        },
        白起: {
          ename: "120",
          vdo: "655",
          tag: "844",
        },
        芈月: {
          ename: "121",
          tag: "869",
        },
        吕布: {
          ename: "123",
          vdo: "821",
          tag: "855",
        },
        周瑜: {
          ename: "124",
          vdo: "629",
          tag: "878",
        },
        元歌: {
          ename: "125",
          vdo: "745",
          tag: "2568",
        },
        夏侯惇: {
          ename: "126",
          vdo: "747",
          tag: "853",
        },
        甄姬: {
          ename: "127",
          vdo: "724",
          tag: "879",
        },
        曹操: {
          ename: "128",
          vdo: "658",
          tag: "860",
        },
        典韦: {
          ename: "129",
          vdo: "1602",
          tag: "859",
        },
        宫本武藏: {
          ename: "130",
          vdo: "686",
          tag: "928",
        },
        李白: {
          ename: "131",
          vdo: "690",
          tag: "897",
        },
        马可波罗: {
          ename: "132",
          vdo: "687",
          tag: "884",
        },
        狄仁杰: {
          ename: "133",
          vdo: "685",
          tag: "891",
        },
        达摩: {
          ename: "134",
          vdo: "684",
          tag: "856",
        },
        项羽: {
          ename: "135",
          vdo: "763",
          tag: "845",
        },
        武则天: {
          ename: "136",
          vdo: "689",
          tag: "876",
        },
        司马懿: {
          ename: "137",
          vdo: "736",
          tag: "2604",
        },
        老夫子: {
          ename: "139",
          vdo: "665",
          tag: "858",
        },
        关羽: {
          ename: "140",
          vdo: "670",
          tag: "854",
        },
        貂蝉: {
          ename: "141",
          vdo: "622",
          tag: "868",
        },
        安琪拉: {
          ename: "142",
          vdo: "669",
          tag: "871",
        },
        程咬金: {
          ename: "144",
          vdo: "664",
          tag: "847",
        },
        露娜: {
          ename: "146",
          vdo: "666",
          tag: "902",
        },
        姜子牙: {
          ename: "148",
          vdo: "671",
          tag: "880",
        },
        刘邦: {
          ename: "149",
          vdo: "662",
          tag: "836",
        },
        韩信: {
          ename: "150",
          vdo: "668",
          tag: "901",
        },
        王昭君: {
          ename: "152",
          vdo: "768",
          tag: "874",
        },
        兰陵王: {
          ename: "153",
          vdo: "722",
          tag: "899",
        },
        花木兰: {
          ename: "154",
          vdo: "659",
          tag: "900",
        },
        艾琳: {
          ename: "155",
          vdo: "660",
        },
        张良: {
          ename: "156",
          vdo: "682",
          tag: "870",
        },
        不知火舞: {
          ename: "157",
          vdo: "661",
          tag: "867",
        },
        娜可露露: {
          ename: "162",
          tag: "898",
        },
        橘右京: {
          ename: "163",
          tag: "851",
        },
        亚瑟: {
          ename: "166",
          tag: "861",
        },
        孙悟空: {
          ename: "167",
          tag: "862",
        },
        牛魔: {
          ename: "168",
          tag: "840",
        },
        后羿: {
          ename: "169",
          tag: "892",
        },
        刘备: {
          ename: "170",
          tag: "929",
        },
        张飞: {
          ename: "171",
          tag: "838",
        },
        李元芳: {
          ename: "173",
          tag: "886",
        },
        虞姬: {
          ename: "174",
          tag: "885",
        },
        钟馗: {
          ename: "175",
          tag: "837",
        },
        杨玉环: {
          ename: "176",
          tag: "1754",
        },
        成吉思汗: {
          ename: "177",
          vdo: "891",
          tag: "883",
        },
        杨戬: {
          ename: "178",
          vdo: "923",
          tag: "850",
        },
        女娲: {
          ename: "179",
          tag: "1629",
        },
        哪吒: {
          ename: "180",
          tag: "849",
        },
        干将莫邪: {
          ename: "182",
          tag: "865",
        },
        雅典娜: {
          ename: "183",
          tag: "852",
        },
        蔡文姬: {
          ename: "184",
          vdo: "932",
          tag: "895",
        },
        太乙真人: {
          ename: "186",
          tag: "894",
        },
        东皇太一: {
          ename: "187",
          tag: "835",
        },
        鬼谷子: {
          ename: "189",
          tag: "1199",
        },
        诸葛亮: {
          ename: "190",
          vdo: "959",
          tag: "866",
        },
        大乔: {
          ename: "191",
          vdo: "963",
          tag: "893",
        },
        黄忠: {
          ename: "192",
          tag: "882",
        },
        铠: {
          ename: "193",
          tag: "1285",
        },
        苏烈: {
          ename: "194",
          tag: "1625",
        },
        百里玄策: {
          ename: "195",
          vdo: "1264",
          tag: "1368",
        },
        百里守约: {
          ename: "196",
          tag: "1295",
        },
        弈星: {
          ename: "197",
          tag: "1823",
        },
        梦奇: {
          ename: "198",
          tag: "1626",
        },
        公孙离: {
          ename: "199",
          tag: "1654",
        },
        沈梦溪: {
          ename: "312",
          tag: "2639",
        },
        明世隐: {
          ename: "501",
          tag: "1636",
        },
        裴擒虎: {
          ename: "502",
          tag: "1755",
        },
        狂铁: {
          ename: "503",
          tag: "1858",
        },
        米莱狄: {
          ename: "504",
          tag: "1856",
        },
        云中君: {
          ename: "506",
        },
        李信: {
          ename: "507",
          tag: "2646",
        },
        伽罗: {
          ename: "508",
          tag: "2623",
        },
        盾山: {
          ename: "509",
          tag: "2607",
        },
        孙策: {
          ename: "510",
          tag: "2569",
        },
        猪八戒: {
          ename: "511",
          tag: "2657",
        },
        上官婉儿: {
          ename: "513",
          tag: "2647",
        },
        嫦娥: {
          ename: "515",
          tag: "2656",
        },
        曜: {
          ename: "522",
        },
        蒙犽: {
          ename: "524",
        },
        鲁班大师: {
          ename: "525",
          tag: "4403",
        },
      };
      let cate = [(await allModel.Category.findOne({ name: "英雄攻略" })).id];
      let index = 0;
      for (const item of Object.keys(heroMap)) {
        console.log(`${++index}. 英雄攻略 -- ${item}`);
        let tag = heroMap[item].tag;
        if (!tag) {
          continue;
        }
        let res = await this.Client({
          url: `https://apps.game.qq.com/cmc/cross?serviceId=18&typeids=1&sortby=sIdxTime&tagids=${tag}%2C619&limit=2&source=web_m&filter=tag&exclusiveChannel=4&exclusiveChannelSign=0dce11a6348b1d63bea1f0e5417b1afe&time=${Date.now()}`,
        });
        // console.log('1 图文', res.data.data.items);
        for (const item1 of res.data.data.items) {
          // let sCoverMap = JSON.parse(item1.sCoverMap)
          // let img = sCoverMap[Object.keys(sCoverMap).at(-1)]?.Url
          let sizes = item1.sCoverList.map((i) => i.size.split("*")[0]);
          let max = Math.max.apply(null, sizes);
          let img =
            item1.sCoverList[sizes.findIndex((i) => Number(i) === max)]?.url;
          // console.log(sizes, max, img);
          let contentRes = await this.Client({
            url: `https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_m&id=${item1.iNewsId}`,
          });
          await allModel.Strategy.insertMany([
            {
              newsId: item1.iNewsId,
              name: item1.sTitle,
              author: item1.sAuthor,
              img,
              cate,
              heros: [item],
              createdTime: item1.sCreated,
              content: this.parseRes(contentRes.data).msg.sContent,
            },
          ]);
        }
        res = await this.Client({
          url: `https://apps.game.qq.com/cmc/cross?serviceId=18&typeids=2&sortby=sIdxTime&tagids=${tag}%2C619&limit=2&source=web_m&filter=tag&exclusiveChannel=4&exclusiveChannelSign=0dce11a6348b1d63bea1f0e5417b1afe&time=${Date.now()}`,
        });
        // console.log('2 视频', res.data.data.items);
        for (const item1 of res.data.data.items) {
          let sizes = item1.sCoverList.map((i) => i.size.split("*")[0]);
          let max = Math.max.apply(null, sizes);
          let img =
            item1.sCoverList[sizes.findIndex((i) => Number(i) === max)]?.url;
          // console.log(sizes, max, img);
          await allModel.Strategy.insertMany([
            {
              name: item1.sTitle,
              author: item1.sAuthor,
              img,
              cate,
              heros: [item],
              vdoId: String(item1.iVideoId),
              createdTime: item1.sCreated,
              playCount: (item1.iTotalPlay / 10000).toFixed(2) + "万",
            },
          ]);
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
      let parentId = (await allModel.Category.findOne({ name: "精品栏目" }))
        ?.id;
      let newId = (
        await allModel.Category.findOne({ name: "最新", parent: parentId })
      ).id;
      let mblId = (
        await allModel.Category.findOne({
          name: "马菠萝奇闻录",
          parent: parentId,
        })
      ).id;
      let drjId = (
        await allModel.Category.findOne({
          name: "狄仁杰封神榜",
          parent: parentId,
        })
      ).id;
      let ids = [newId, mblId, drjId];
      // console.log(parentId, newId, mblId, drjId);
      // 存放爬取的 video id
      let idList = [];
      let spiderList = [
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
              {
                $push: {
                  cate: ids[index],
                },
              }
            );
          } else {
            idList.push(item.iVideoId);
            await allModel.Strategy.insertMany([
              {
                name: item.sTitle,
                author: item.sAuthor,
                img: this.getBigImg(item.sCoverList),
                iTime: item.iTime,
                cate: [ids[index]],
                vdoId: item.iVideoId,
                createTime: item.sCreated,
                playCount: item.iTotalPlay,
              },
            ]);
          }
        }
        index++;
      }
      console.log("精品栏目");
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
      let tags = [
        { tag: "1639,1852,4784,4785,4786,4787,4775", name: "最新" },
        { tag: "1639", name: "王者炸麦了" },
        { tag: "4775", name: "绝对王者" },
        { tag: "4785", name: "超神快讯1+1" },
        { tag: "1852", name: "荣耀大话王" },
        { tag: "4784", name: "KPL云电台" },
        { tag: "4786", name: "荣耀宅急送" },
        { tag: "4787", name: "王者好莱坞" },
      ];
      let idList = [];
      let parentId = (await allModel.Category.findOne({ name: "赛事精品" })).id;
      for (const tag of tags) {
        let res = await this.Client({
          url: `https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchKeywordsList&order=sIdxTime&r0=script&r1=userObj&source=app_search&page=1&pagesize=4&type=iTag&id=${tag.tag}`,
        });
        console.log(tag.name);
        let obj = this.parseRes(res.data);
        // console.log(obj);
        let id = (
          await allModel.Category.findOne({ name: tag.name, parent: parentId })
        ).id;
        console.log("分类id", id);
        for (const item of obj.msg.result) {
          if (idList.includes(item.iVideoId)) {
            let c = await allModel.Strategy.findOneAndUpdate(
              { vdoId: item.iVideoId },
              {
                $push: {
                  cate: id,
                },
              }
            );
          } else {
            idList.push(item.iVideoId);
            await allModel.Strategy.insertMany([
              {
                name: item.sTitle,
                author: item.sAuthor,
                img: this.getBigImg(item.sCoverList),
                iTime: item.iTime,
                cate: [id],
                vdoId: item.iVideoId,
                createTime: item.sCreated,
                playCount: item.iTotalPlay,
              },
            ]);
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
      let tags = [
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
      let idList = [];
      let parentId = (await allModel.Category.findOne({ name: "精彩视频" })).id;
      for (const tag of tags) {
        let url = tag.tag;
        console.log(tag.name, url);
        let res = await this.Client({ url });
        let obj = this.parseRes(res.data);
        // console.log(obj.msg.result);
        let id = (
          await allModel.Category.findOne({ name: tag.name, parent: parentId })
        ).id;
        console.log("分类id", id);
        for (const item of obj.msg?.result) {
          if (idList.includes(item.iVideoId)) {
            let c = await allModel.Strategy.findOneAndUpdate(
              { vdoId: item.iVideoId },
              {
                $push: {
                  cate: id,
                },
              }
            );
          } else {
            idList.push(item.iVideoId);
            await allModel.Strategy.insertMany([
              {
                name: item.sTitle,
                author: item.sAuthor,
                img: this.getBigImg(item.sCoverList),
                iTime: item.iTime,
                cate: [id],
                vdoId: item.iVideoId,
                createTime: item.sCreated,
                playCount: item.iTotalPlay,
              },
            ]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      console.log(this.colorLog("获取赛事精品出错!", "red"));
    }
  }

  /**
   * 攻略中心
   */
  async getStrategy() {
    await allModel.Strategy.deleteMany();

    await this.getHotVdo();
    await this.getHeroStrategy();
    await this.getBoutiqueColumn();
    await this.contest();
    await this.wonderfulVdo();

    console.log(
      this.colorLog(`${++this.currentIndex}. 图文视频写入完成!`, "green")
    );
  }

  /**
   * 开始运行
   */
  async run() {
    await this.setCate();
    await this.setUser();
    await this.getSummonerSkill();
    await this.getInscription();
    await this.getAds();
    await this.getItems();
    await this.getStrategy();
    await this.spiderHero();
    await this.getArticel();

    console.log("全部完成!");
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

  /**
   * 美化打印信息
   */
  jsonLog(obj) {
    console.log(JSON.stringify(obj, null, 2));
  }

  /**
   * 颜色打印字符
   * @param {string} content 要打印的内容
   * @param {string} color 字体颜色
   * @param {string} bgColor 背景颜色
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
}
