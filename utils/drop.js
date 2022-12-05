// 从备份里恢复数据库
const mongodb = require("./mongodb");
const path = require("path");
const { execSync, exec } = require("child_process");

mongodb.once("open", () => {
  console.log("删除原有数据库!");
  mongodb.dropDatabase();
  const dir = path.join(__dirname, "../backUpDataBase/kingdb/");
  // execSync(
  //   `mongorestore -u kingdbuser -p kingdbpsw -h 127.0.0.1:27017 -d kingdb --dir ${dir}`
  // );
  // mongodb.close();
  // console.log("恢复完成!");

  exec(
    `mongorestore -u kingdbuser -p kingdbpsw -h 127.0.0.1:27017 -d kingdb --dir ${dir}`, 
    function (err, stdout, stderr) {
      if (err) {
        console.log("恢复失败:", err);
        process.exit();
      } else {
        console.log("恢复完成!", stdout.toString());
        mongodb.close();
        // process.exit();
      }
  });
});
