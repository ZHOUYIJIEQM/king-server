# 在 windows terminal 里运行
# # node 后端
# Start-Process wt -ArgumentList '--title "mobile"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\king-full\king-serve\;yarn dev}"
# Start-Sleep -s 2
# # 移动端
# Start-Process wt -ArgumentList '--title "mobile"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\king-full\king-mobile\;yarn dev}"
# Start-Sleep -s 2
# 后台管理
Start-Process wt -ArgumentList '--title "pc"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\king-full\king-admin\;yarn dev}"
Start-Sleep -s 2
# 完成版
Start-Process wt -ArgumentList '--title "apiFull"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\King-full-stack\vue--node-mongodb-wzry\server\;yarn serve}"
Start-Sleep -s 2
Start-Process wt -ArgumentList '--title "pcFull"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\King-full-stack\vue--node-mongodb-wzry\admin\;yarn serve}"
Start-Sleep -s 2