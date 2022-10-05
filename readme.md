# 流程
## 运行环境
### 1. 安装 ```node```, ```mongo```, 配置好环境变量
### 2. 连接 ```mongodb``` 
1. ```mongo``` 默认没有密码, 为了安全, 设置密码
```sql
-- 命令
-- 创建管理员账户
use admin
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "userAdminAnyDatabase",
      db: "admin",
    },
  ],
});

-- 超级管理员root
db.createUser({
  user: "root",
  pwd: "root",
  roles: [
    {
      role: "root",
      db: "admin",
    },
  ],
});

-- 创建单个数据库的管理角色
db.createUser({
  user: "kingdbuser",
  pwd: "kingdbpsw",
  roles: [
    {
      role: "dbOwner",
      db: "kingdb",
    },
  ],
});

-- 查看当前库下的用户
show users

-- 权限认证
db.auth("用户名","密码")

-- 如果需要删除用户
-- 删除某个用户
db.dropUser("user_name")  
-- 删除当前库的所有用户
db.dropAllUsers() 
```
2. 找到 ```mongo``` 安装目录下 ```bin``` 与 ```mongo.exe```同目录, 修改 ```mongod.cfg```
```
security:
  authorization: enabled
```
3. 重启 ```MongoDB``` 服务, 以管理员身份打开命令窗口
```
net stop MongoDB
net start MongoDB
```
4. ```mongoose```连接数据库
```js
const mongoose = require('mongoose')
mongoose.connect("mongodb://kingdbuser:kingdbpsw@127.0.0.1:27017/kingdb");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误："));
db.once("open", async () => {
  console.log("连接成功!");
});
```

## 克隆仓库后安装好依赖模块
```bash
yarn
# 或者
npm i
```

## 爬取[王者荣耀移动端官网](https://pvp.qq.com/m/m201706/index.shtml), 采集需要的数据
1. 运行```yarn spider```命令, 从王者荣耀移动端官网重新爬取数据
2. 也可以用```backUpDataBase```里备份的数据库, 重新导入数据, 因为设置了密码, 命令需要有账号密码, 导入命令:
```bash
mongorestore -u kingdbuser -p kingdbpsw -h 127.0.0.1:27017 -d kingdb --dir .\backUpDataBase\kingdb\
```
3. 如果导出数据库, 导出命令:
```bash
mongodump -u kingdbuser -p kingdbpsw -h 127.0.0.1:27017 -d kingdb -o backUpData
```
4. 因为```mongo 5```没有 ```mongodump```, ```mongorestore```, 需要另外下载[database-tools](https://www.mongodb.com/try/download/database-tools)

## ```express```设置
```js
// 设置跨域
app.use(cors());
// 请求体转为json对象
app.use(express.json());
```

## 根据前端需要分为移动端接口, 后台管理接口
### 后台管理系统的接口
> 用于管理数据库里的数据, 方便修改
#### 登录
1. 从请求体获取用户名, 密码, 可以稍做一些判断, 比如: 密码是否达到8位长度, 不符合返回错误提示
2. 从数据库查询用户, 包括密码, 存在就需要判断密码是否正确, 密码使用```bcrypt.js```加密后存放在数据库中, 所以校验密码时, 需要对比
```js
// bcrypt.js的使用
const bcryptjs = require("bcryptjs");
const value = 'abcdef123456'
let salt = bcryptjs.genSaltSync(10)
let hash = bcryptjs.hashSync(value, salt)
// 校验, value 正确返回 true
let compare = bcryptjs.compareSync(value, hash)
console.log(compare); // true
```
3. 校验后密码正确就给前端返回一些需要的信息及```token```(因为用户id是唯一的, 用这个值来生成), 还可以设置过期时间, 具体参考[jwt文档](https://github.com/auth0/node-jsonwebtoken)
```js
// jwt的使用
const jwt = require("jsonwebtoken");
const secret = 'kingAdminNode123456'
const token = jwt.sign('userId123456', secret)
const id = jwt.verify(token, secret)
console.log(token, id);
// eyJhbGciOiJIUzI1NiJ9.dXNlcklkMTIzNDU2.YQYdP5v56JeDx6TB4epWLJwSLKbVU0ScWvJ_sMVyRBc userId123456
```

#### 因为接口的路由路径相似, 处理的操作也差不多, 抽取出公用接口, 再根据请求路径判断要做什么处理
```js
// 请求接口, 比如
app.use("/admin/api/resource/Hero", (req, res, next) => {})
// 前端请求: http://localhost:3080/admin/api/resource/hero
app.use("/admin/api/resource/Category", (req, res, next) => {})
app.use("/admin/api/resource/Article", (req, res, next) => {})
// ...
// 因为接口的处理操作相似, 可以把接口合并为公用接口
const commonRouter = express.Router();
app.use(
  "/admin/api/resource/:resource",
  async(req, res, next) => {
    // 处理过程, req.params.resource 可以得到 :resource, 就可以知道是请求什么类型
    next()
  },
  commonRouter
)
commonRouter.get("/", (req, res, next) => {})
```

#### 后台管理所有接口都需要登录后才能获取数据, 需要校验是否已登录, 前端请求需要在请求头带上```token```, 后端校验```token```正确性, 把这个校验过程提取为一个中间件, 在公用接口处校验
```js
app.use(
  "/admin/api/resource/:resource", 
  // 校验token
  auth(app),
  async(req, res, next) => { next() }, 
  commonRouter
)
```

#### 权限校验, 除了登录, 有些接口还要校验权限, 得到权限级别, 判断是否可以执行操作
```js
// 比如: 做删除操作, 就需要根据权限级别判断
commonRouter.delete(
  '/:id',
  // 多处使用, 应把这个函数提取为模块, 使用时导入, 这样会方便得多
  async (req, res, next) => {
    // 在commonRouter这个路由, req.user 是在校验是否登录时, 登录成功的话就根据 用户id , 查询出用户信息(包括权限级别)
    if (req.user.level > 1) {
      return res.status(403).send({
        message: '您的权限无法使用此操作!'
      })
    }
    return next()
  },
  async (req, res) => {
    // 处理操作
  }
)
```

### ```mongo``` 数据库
#### 使用 ```mongoose```
```js
const mongoose = require('mongoose');
const { Schema } = mongoose;
// 根据文章需要的内容确定结构
const articleSchema = Schema({
  // 文章id
  iId: String,
  title: String,
  cate: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  content: String,
  createdTime: String,
});
const Article = mongoose.model("Article", articleSchema, "Article");
// 通过 Article 操作这个集合
await Article.insertMany([...])
```
#### 聚合查询
```js
await Hero.aggregate([
  {
    // 关联其他表
    $lookup: {
      from: "Category",
      localField: "cate",
      foreignField: "_id",
      as: "cate",
    },
  },
  { $skip: Number(skipNum) },
  { $limit: Number(pageSize) }
])
```
#### ★要点, 分类处把扁平数组转为树状结构, 方便前端显示树形控件
```js
// 从数据库中查询到的分类不是树状数组
let allCate = [
  {
    _id: "632c65620e6e0cc979171938",
    name: "活动",
    parent: "632c65620e6e0cc97917192c",
    desc: "活动的介绍内容",
  },
  { _id: "632c65620e6e0cc979171900", name: "荣耀大话王", parent: "632c65620e6e0cc9791718f1", desc: "荣耀大话王的介绍内容", }, { _id: "632c65620e6e0cc97917190f", name: "王者时刻", parent: "632c65620e6e0cc97917190c", desc: "王者时刻的介绍内容", }, { _id: "632c65620e6e0cc9791718c2", name: "战士", parent: "632c65620e6e0cc9791718bc", desc: "战士的介绍内容", }, { _id: "632c65620e6e0cc979171903", name: "KPL云电台", parent: "632c65620e6e0cc9791718f1", desc: "KPL云电台的介绍内容", }, { _id: "632c65620e6e0cc9791718dc", name: "周", parent: "632c65620e6e0cc9791718d6", desc: "周的介绍内容", }, { _id: "632c65620e6e0cc9791718cb", name: "刺客", parent: "632c65620e6e0cc9791718bc", desc: "刺客的介绍内容", }, { _id: "632c65620e6e0cc979171921", name: "英雄", parent: "632c65620e6e0cc97917191b", desc: "英雄的介绍内容", }, { _id: "632c65620e6e0cc97917194f", name: "TGA", parent: "632c65620e6e0cc97917193d", desc: "TGA的介绍内容", }, { _id: "632c65620e6e0cc979171943", name: "挑战者杯", parent: "632c65620e6e0cc97917193d", desc: "挑战者杯的介绍内容", }, { _id: "632c65620e6e0cc979171955", name: "模拟战大师赛", parent: "632c65620e6e0cc97917193d", desc: "模拟战大师赛的介绍内容", }, { _id: "632c65620e6e0cc979171924", name: "新手", parent: "632c65620e6e0cc97917191b", desc: "新手的介绍内容", }, { _id: "632c65620e6e0cc97917191b", name: "图文攻略", parent: "632c65620e6e0cc9791718d3", desc: "图文攻略的介绍内容", }, { _id: "632c65620e6e0cc9791718eb", name: "马菠萝奇闻录", parent: "632c65620e6e0cc9791718e5", desc: "马菠萝奇闻录的介绍内容", }, { _id: "632c65620e6e0cc9791718f1", name: "赛事精品", parent: "632c65620e6e0cc9791718d3", desc: "赛事精品的介绍内容", }, { _id: "632c65620e6e0cc9791718c5", name: "法师", parent: "632c65620e6e0cc9791718bc", desc: "法师的介绍内容", }, { _id: "632c65620e6e0cc9791718bf", name: "热门", parent: "632c65620e6e0cc9791718bc", desc: "热门的介绍内容", }, { _id: "632c65620e6e0cc9791718f7", name: "王者炸麦了", parent: "632c65620e6e0cc9791718f1", desc: "王者炸麦了的介绍内容", }, { _id: "632c65620e6e0cc9791718f4", name: "最新", parent: "632c65620e6e0cc9791718f1", desc: "最新的介绍内容", }, { _id: "632c65620e6e0cc979171909", name: "王者好莱坞", parent: "632c65620e6e0cc9791718f1", desc: "王者好莱坞的介绍内容", }, { _id: "632c65620e6e0cc97917193b", name: "赛事", parent: "632c65620e6e0cc97917192c", desc: "赛事的介绍内容", }, { _id: "632c65620e6e0cc97917192c", name: "新闻资讯", parent: null, desc: "新闻资讯的介绍内容", }, { _id: "632c65620e6e0cc979171932", name: "新闻", parent: "632c65620e6e0cc97917192c", desc: "新闻的介绍内容", }, { _id: "632c65620e6e0cc9791718bc", name: "英雄列表", parent: null, desc: "英雄列表的介绍内容", }, { _id: "632c65620e6e0cc9791718fd", name: "超神快讯1+1", parent: "632c65620e6e0cc9791718f1", desc: "超神快讯1+1的介绍内容", }, { _id: "632c65620e6e0cc979171912", name: "王者学院", parent: "632c65620e6e0cc97917190c", desc: "王者学院的介绍内容", }, { _id: "632c65620e6e0cc979171915", name: "新手视频", parent: "632c65620e6e0cc97917190c", desc: "新手视频的介绍内容", }, { _id: "632c65620e6e0cc9791718ce", name: "射手", parent: "632c65620e6e0cc9791718bc", desc: "射手的介绍内容", }, { _id: "632c65620e6e0cc9791718ee", name: "狄仁杰封神榜", parent: "632c65620e6e0cc9791718e5", desc: "狄仁杰封神榜的介绍内容", }, { _id: "632c65620e6e0cc97917191e", name: "最新", parent: "632c65620e6e0cc97917191b", desc: "最新的介绍内容", }, { _id: "632c65620e6e0cc979171906", name: "荣耀宅急送", parent: "632c65620e6e0cc9791718f1", desc: "荣耀宅急送的介绍内容", }, { _id: "632c65620e6e0cc9791718c8", name: "坦克", parent: "632c65620e6e0cc9791718bc", desc: "坦克的介绍内容", }, { _id: "632c65620e6e0cc9791718e2", name: "英雄攻略", parent: "632c65620e6e0cc9791718d3", desc: "英雄攻略的介绍内容", }, { _id: "632c65620e6e0cc9791718d1", name: "辅助", parent: "632c65620e6e0cc9791718bc", desc: "辅助的介绍内容", }, { _id: "632c65620e6e0cc97917190c", name: "精彩视频", parent: "632c65620e6e0cc9791718d3", desc: "精彩视频的介绍内容", }, { _id: "632c65620e6e0cc9791718e5", name: "精品栏目", parent: "632c65620e6e0cc9791718d3", desc: "精品栏目的介绍内容", }, { _id: "632c65620e6e0cc979171952", name: "WGI", parent: "632c65620e6e0cc97917193d", desc: "WGI的介绍内容", }, { _id: "632c65620e6e0cc979171918", name: "官方视频", parent: "632c65620e6e0cc97917190c", desc: "官方视频的介绍内容", }, { _id: "632c65620e6e0cc979171949", name: "K甲联赛", parent: "632c65620e6e0cc97917193d", desc: "K甲联赛的介绍内容", }, { _id: "632c65620e6e0cc9791718df", name: "月", parent: "632c65620e6e0cc9791718d6", desc: "月的介绍内容", }, { _id: "632c65620e6e0cc9791718d3", name: "攻略中心", parent: null, desc: "攻略中心的介绍内容", }, { _id: "632c65620e6e0cc979171927", name: "官方", parent: "632c65620e6e0cc97917191b", desc: "官方的介绍内容", }, { _id: "632c65620e6e0cc97917192f", name: "热门", parent: "632c65620e6e0cc97917192c", desc: "热门的介绍内容", }, { _id: "632c65620e6e0cc9791718fa", name: "绝对王者", parent: "632c65620e6e0cc9791718f1", desc: "绝对王者的介绍内容", }, { _id: "632c65620e6e0cc979171946", name: "全国大赛", parent: "632c65620e6e0cc97917193d", desc: "全国大赛的介绍内容", }, { _id: "632c65620e6e0cc979171935", name: "公告", parent: "632c65620e6e0cc97917192c", desc: "公告的介绍内容", }, { _id: "632c65620e6e0cc9791718e8", name: "最新", parent: "632c65620e6e0cc9791718e5", desc: "最新的介绍内容", }, { _id: "632c65620e6e0cc97917194c", name: "高校联赛", parent: "632c65620e6e0cc97917193d", desc: "高校联赛的介绍内容", }, { _id: "632c65620e6e0cc9791718d9", name: "日", parent: "632c65620e6e0cc9791718d6", desc: "日的介绍内容", }, { _id: "632c65620e6e0cc97917193d", name: "赛事中心", parent: null, desc: "赛事中心的介绍内容", }, { _id: "632c65620e6e0cc979171940", name: "KPL", parent: "632c65620e6e0cc97917193d", desc: "KPL的介绍内容", }, { _id: "632c65620e6e0cc97917192a", name: "同人", parent: "632c65620e6e0cc97917191b", desc: "同人的介绍内容", }, { _id: "632c65620e6e0cc9791718d6", name: "热门视频", parent: "632c65620e6e0cc9791718d3", desc: "热门视频的介绍内容", },
];

/**
 * 分类的扁平数组转树状数组, 递归写法, 数据量太大可能报错
 */
function arrayToTree(originArr, pid) {
  const treeArr = []
  // 遍历数组找到子元素
  const getChildren = (originArr, parentItem, pid) => {
    for (const item of originArr) {
      // 判断是否子元素
      if (item.parent === pid) {
        const newItem = {...item, children: []}
        parentItem.push(newItem)
        getChildren(originArr, newItem.children, item._id)
      }
    }
  }
  getChildren(originArr, treeArr, pid)
  return treeArr
}
let res = arrayToTree(allCate, null)
console.log(res);


/**
 * 分类的扁平数组转树状数组, 较好的写法
 */
function arrayToTree(cateArr, firstLevel) {
  // 树状数组
  const treeArr = [];
  // 存放对应id的数据
  const itemMap = {};
  for (const item of cateArr) {
    const id = item._id;
    const parentId = item.parent;
    // 如果itemMap对象还没有id值(_id: "632c65620e6e0cc979171938")的属性, 就添加 children: []
    if (!itemMap[id]) {
      itemMap[id] = { children: [] };
    }
    // 对象加入 children: [] , {...item, children: []}
    const treeItem = Object.assign({}, item, itemMap[id]);
    // 如果是第一层, 直接 push 到树第一层
    if (parentId === firstLevel) {
      treeArr.push(treeItem);
    } else {
      // 不是第一层, 就会有父级元素, itemMap对象如果还没该父级id值, 就添加
      if (!itemMap[parentId]) {
        itemMap[parentId] = { children: [] };
        // console.log('-----', item.name, itemMap[parentId]);
      }
      // 再添加到父级元素的children
      itemMap[parentId].children.push(treeItem);
    }
  }
  return treeArr;
}
let res = arrayToTree(allCate, null);
console.log(res);
```

#### 上传图片接口, 使用[multer 文档](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)
> 但文件名如果带中文会乱码, 如果想要带中文名, 需要前端传入, 代码可以查看前端部分
存在多个上传接口, 但上传逻辑都一样, 提取为公用接口
```js
const router = express.Router()
app.use(
  '/admin/api/upload', 
  // 校验token, 权限
  auth(app), authority(), 
  router
)

```