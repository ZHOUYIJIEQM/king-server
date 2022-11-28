/**
 * 快速打开项目并运行
 */

const { execSync } = require('child_process');
const path = require('path')

/**
 * 休眠
 * @param {number} time 
 */
function sleep(time = 1) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time * 1000)
  })  
}

async function run() {
  console.log('window terminal 执行开发命令!');
  execSync(`powershell.exe -command ${path.join(__dirname, 'wtOpen.ps1')}`)
  await sleep(1)
  
  console.log('vscode 打开项目');
  const folder = [
    String.raw `D:\yijie\code\vue\king-full\king-server`,
    String.raw `D:\yijie\code\vue\king-full\king-mobile`,
    String.raw `D:\yijie\code\vue\king-full\king-admin`,
  ]
  for (const item of folder) {
    execSync(`code ${item}`)
    await sleep(0.5)
  }
}

run()