# 在 windows terminal 里运行
# node后台
Start-Process wt -ArgumentList '--title "apiFull"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijie\code\vue\king-full\king-server\;yarn dev}"
Start-Sleep -s 2
# 电脑端后台管理
Start-Process wt -ArgumentList '--title "pc"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijie\code\vue\king-full\king-admin\;yarn dev}"
Start-Sleep -s 2
# 移动端
Start-Process wt -ArgumentList '--title "mobile"', "--suppressApplicationTitle", '-p "Windows PowerShell"', "PowerShell.exe", "-NoExit", "-Command", "& {cd D:\yijie\code\vue\king-full\king-mobile\;yarn dev}"
Start-Sleep -s 2