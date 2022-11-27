const mongoose = require("mongoose");
const { Schema } = mongoose;

const heroSchema = Schema({
  name: { type: String, required: true },
  nickname: String,
  ename: String,
  avatar: String,
  backgroundImg: String,
  photo: String,
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  //难度等级等
  scores: {
    difficulty: { type: Number, default: 0 },
    skill: { type: Number, default: 0 },
    attack: { type: Number, default: 0 },
    survive: { type: Number, default: 0 },
  },
  //皮肤
  skins: [{ img: String, name: String }],
  // 技能
  skills: [{
    id: { type: String, default: "" },
    icon: { type: String, default: "" },
    name: { type: String, default: "" },
    delay: { type: String, default: "" },
    desc: { type: String, default: "" },
    tips: { type: String, default: "" },
  }],
  // 升级加点 建议
  levelUp: [ String ],
  // levelUp: [{ icon: String, id: String }],
  // 铭文
  inscriptionId: [{ type: Schema.Types.ObjectId, ref: "Inscription" }],
  // 召唤师技能
  summonersId: [{ type: Schema.Types.ObjectId, ref: "Summoner" }],
  // todo: 此处有改动
  equipment: {
    // 顺风出装
    downWind: [{ type: Schema.Types.ObjectId, ref: "Items" }],
    // 逆风出装
    upWind: [{ type: Schema.Types.ObjectId, ref: "Items" }],
  },
  tips: [{
    title: String,
    content: String,
  }],
  relations: [{
    title: String,
    relation: [{
      hero: { type: Schema.Types.ObjectId, ref: "Hero", default: null },
      ename: String,
      content: String,
    }],
  }],
});

const Hero = mongoose.model("Hero", heroSchema, "Hero");

module.exports = Hero;
