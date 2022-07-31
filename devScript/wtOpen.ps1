# 在 windows terminal 里运行
# Start-Process wt -ArgumentList '--title "server"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\node\king-server\;yarn dev}"
# timeout /t 1
# Start-Process wt -ArgumentList '--title "mobile"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\King-full-stack\king-fullstack\mobile\;yarn dev}"
# timeout /t 1
Start-Process wt -ArgumentList '--title "pc"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\King-full-stack\king-fullstack\web\;yarn dev}"
Start-Sleep -s 2
# 完成版
Start-Process wt -ArgumentList '--title "apiFull"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\King-full-stack\vue--node-mongodb-wzry\server\;yarn serve}"
Start-Sleep -s 2
Start-Process wt -ArgumentList '--title "pcFull"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijieData\code\vue\King-full-stack\vue--node-mongodb-wzry\admin\;yarn serve}"
Start-Sleep -s 2