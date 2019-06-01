

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
const data = new Date();

var comments = [
    {

        message: '简易留言板！     原码：',
        time:data.toLocaleString()
    }
]

http
    .createServer(function (req, res) {
     var obj = url.parse(req.url,true)

        const path_name = obj.pathname;

     //主页请求
     if(path_name==='/'){
         fs.readFile("./view/index.html",function (err,data) {
             if(err){
                 return res.end("404! ")
             }
             var str = template.render(data.toString(),{
                 comments:comments
             })
             res.end(str);
         })
     }
     //css请求（静态文件）
     else if (path_name==='/bootstrap.min.css'){
         fs.readFile("./view/bootstrap.min.css",function (err,data) {
             if (err){
                 return res.end("css 404")
             }
             res.end(data)
         })
     }
     //提交留言请求
     else if(path_name=='/add_message'){
         var comment = obj.query


         comment.time=data.toLocaleString()

         comment.message=comment.text

         comments.unshift(comment)
         res.statusCode=302

         res.setHeader('Location','/')
         fs.readFile("./view/index.html",function (err,data) {
             if(err){
                 return res.end("404! ")
             }
             var str = template.render(data.toString(),{
                 comments:comments
             })
             res.end(str);
         })
          console.log("add")
          console.log(comment.message)
     }
     //错误请求
     else{
         res.end("404 not found!")
     }

    })
    .listen(3000, function () {
        console.log('running...')
    })
