var _util=require("./util");

_util.GetPageVisual("http://blog.miaozhuang.net").on("success",function(d){
    console.log(d);
})
    .on("error", function (err) {
        console.log(err);

    })
    .on("exit",function(d){
        console.log('子进程已退出，代码：' + d);
    })