# 流程
## 安装好 mongo 配置好环境变量
## 连接 mongodb 
1. mongo 默认是没有密码, 为了安全, 设置密码
```sql
-- 命令
use admin
db.createUser({
  user: "adminUser",
  pwd: "adminPsw",
  roles: [{ 
    role: "userAdminAnyDatabase", 
    db: "admin" 
  }],
});


use kingDb
db.createUser({
  user: "kingUser",
  pwd: "kingPsw",
  roles: [
    {
      role: "userAdmin",
      db: "kingDb",
    },
  ],
});

-- 如果需要删除用户
-- 删除某个用户
db.dropUser("user_name")  
-- 删除当前库的所有用户
db.dropAllUsers() 
```
2. 找到 ```mongo.exe``` 目录, 修改 ```mongod.cfg```
```
security:
  authorization: enabled
```
3. 重启 ```MongoDB``` 服务, 以管理员身份打开命令窗口
```
net stop MongoDB
net start MongoDB
```









