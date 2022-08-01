const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: { type: String },
  ename: { type: String },
  avatar: { type: String },
  banner: { type: String },
  photo: { type: String }, 
  cate: [ { type: mongoose.SchemaTypes.ObjectId, ref: "Category", }, ],
  //难度等级等
  scores: {
    difficulty: { type: Number, default: 0 },
    skill: { type: Number, default: 0 },
    attack: { type: Number, default: 0 },
    survive: { type: Number, default: 0 },
  },
  //皮肤
  skins: [
    {
      img: { type: String },
      name: { type: String },
    },
  ],
  // 技能
  skills: [
    {
      id: { type: String, default: "" },
      icon: { type: String, default: "" },
      name: { type: String, default: "" },
      delay: { type: String, default: "" },
      desc: { type: String, default: "" },
      tips: { type: String, default: "" },
    },
  ],
  // 升级加点 建议
  levelUp: [
    { icon: String, id: String, },
  ],
  // 铭文
  InscriptionId: [
    {type: String, ref: 'Inscription'}
  ],
  // 召唤师技能
  summonersId: [
    {type: String, ref: 'Summoner'}
  ],
  //顺风出装
  downWind: {
    equipment: [
      {
        // type: mongoose.SchemaTypes.ObjectId,
        // todo: 依赖武器, 待修改
        type: String,
        default: "",
        ref: "Items",
      },
    ],
  },
  //逆风出装
  upWind: {
    equipment: [
      {
        // type: mongoose.SchemaTypes.ObjectId,
        // todo: 依赖武器, 待修改
        type: String,
        default: "",
        ref: "Items",
      },
    ],
  },
  tips: [
    {
      title: String,
      content: String,
    },
  ],
  relations: [
    {
      title: String,
      hero: [
        {
          ename: String,
          icon: String,
          content: String,
        },
      ],
    },
  ],
});

const Hero = mongoose.model("Hero", heroSchema, "Hero");

module.exports = Hero;
