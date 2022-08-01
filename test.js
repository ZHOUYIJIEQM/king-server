let allCate = [
  {
      "_id": "62e67cdaf134a0c993ec7d5c",
      "name": "英雄列表",
      "parent": null,
      "desc": "英雄列表的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d5f",
      "name": "热门",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "热门的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d62",
      "name": "战士",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "战士的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d65",
      "name": "法师",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "法师的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d68",
      "name": "坦克",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "坦克的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d6b",
      "name": "刺客",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "刺客的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d6e",
      "name": "射手",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "射手的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d71",
      "name": "辅助",
      "parent": "62e67cdaf134a0c993ec7d5c",
      "desc": "辅助的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d73",
      "name": "攻略中心",
      "parent": null,
      "desc": "攻略中心的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d76",
      "name": "热门视频",
      "parent": "62e67cdaf134a0c993ec7d73",
      "desc": "热门视频的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d79",
      "name": "日",
      "parent": "62e67cdaf134a0c993ec7d76",
      "desc": "日的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d7c",
      "name": "周",
      "parent": "62e67cdaf134a0c993ec7d76",
      "desc": "周的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d7f",
      "name": "月",
      "parent": "62e67cdaf134a0c993ec7d76",
      "desc": "月的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d82",
      "name": "英雄攻略",
      "parent": "62e67cdaf134a0c993ec7d73",
      "desc": "英雄攻略的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d85",
      "name": "精品栏目",
      "parent": "62e67cdaf134a0c993ec7d73",
      "desc": "精品栏目的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d88",
      "name": "最新",
      "parent": "62e67cdaf134a0c993ec7d85",
      "desc": "最新的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d8b",
      "name": "马菠萝奇闻录",
      "parent": "62e67cdaf134a0c993ec7d85",
      "desc": "马菠萝奇闻录的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d8e",
      "name": "狄仁杰封神榜",
      "parent": "62e67cdaf134a0c993ec7d85",
      "desc": "狄仁杰封神榜的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d91",
      "name": "赛事精品",
      "parent": "62e67cdaf134a0c993ec7d73",
      "desc": "赛事精品的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d94",
      "name": "最新",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "最新的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d97",
      "name": "王者炸麦了",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "王者炸麦了的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d9a",
      "name": "绝对王者",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "绝对王者的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7d9d",
      "name": "超神快讯1+1",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "超神快讯1+1的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7da0",
      "name": "荣耀大话王",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "荣耀大话王的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7da3",
      "name": "KPL云电台",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "KPL云电台的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7da6",
      "name": "荣耀宅急送",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "荣耀宅急送的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7da9",
      "name": "王者好莱坞",
      "parent": "62e67cdaf134a0c993ec7d91",
      "desc": "王者好莱坞的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dac",
      "name": "精彩视频",
      "parent": "62e67cdaf134a0c993ec7d73",
      "desc": "精彩视频的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7daf",
      "name": "王者时刻",
      "parent": "62e67cdaf134a0c993ec7dac",
      "desc": "王者时刻的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7db2",
      "name": "王者学院",
      "parent": "62e67cdaf134a0c993ec7dac",
      "desc": "王者学院的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7db5",
      "name": "新手视频",
      "parent": "62e67cdaf134a0c993ec7dac",
      "desc": "新手视频的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7db8",
      "name": "官方视频",
      "parent": "62e67cdaf134a0c993ec7dac",
      "desc": "官方视频的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dbb",
      "name": "图文攻略",
      "parent": "62e67cdaf134a0c993ec7d73",
      "desc": "图文攻略的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dbe",
      "name": "最新",
      "parent": "62e67cdaf134a0c993ec7dbb",
      "desc": "最新的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dc1",
      "name": "英雄",
      "parent": "62e67cdaf134a0c993ec7dbb",
      "desc": "英雄的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dc4",
      "name": "新手",
      "parent": "62e67cdaf134a0c993ec7dbb",
      "desc": "新手的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dc7",
      "name": "官方",
      "parent": "62e67cdaf134a0c993ec7dbb",
      "desc": "官方的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dca",
      "name": "同人",
      "parent": "62e67cdaf134a0c993ec7dbb",
      "desc": "同人的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dcc",
      "name": "新闻资讯",
      "parent": null,
      "desc": "新闻资讯的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dcf",
      "name": "热门",
      "parent": "62e67cdaf134a0c993ec7dcc",
      "desc": "热门的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dd2",
      "name": "新闻",
      "parent": "62e67cdaf134a0c993ec7dcc",
      "desc": "新闻的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dd5",
      "name": "公告",
      "parent": "62e67cdaf134a0c993ec7dcc",
      "desc": "公告的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dd8",
      "name": "活动",
      "parent": "62e67cdaf134a0c993ec7dcc",
      "desc": "活动的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7ddb",
      "name": "赛事",
      "parent": "62e67cdaf134a0c993ec7dcc",
      "desc": "赛事的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7ddd",
      "name": "赛事中心",
      "parent": null,
      "desc": "赛事中心的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7de0",
      "name": "KPL",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "KPL的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7de3",
      "name": "挑战者杯",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "挑战者杯的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7de6",
      "name": "全国大赛",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "全国大赛的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7de9",
      "name": "K甲联赛",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "K甲联赛的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7dec",
      "name": "高校联赛",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "高校联赛的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7def",
      "name": "TGA",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "TGA的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7df2",
      "name": "WGI",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "WGI的介绍内容"
  },
  {
      "_id": "62e67cdaf134a0c993ec7df5",
      "name": "模拟战大师赛",
      "parent": "62e67cdaf134a0c993ec7ddd",
      "desc": "模拟战大师赛的介绍内容"
  }
]