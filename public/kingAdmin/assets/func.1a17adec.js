function r(o){const t=new Date(o),e=n=>n<10?`0${n}`:n;return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())} ${e(t.getHours())}:${e(t.getMinutes())}:${e(t.getSeconds())}`}export{r as f};
