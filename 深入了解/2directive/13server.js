/**
 * Created by huk on 17/4/29.
 */
var http = require('http');
var fs = require('fs');
var users = ['admin','auth','huk1022'];
http.createServer(function (req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    //允许哪些请求头传过来
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    if(req.url == '/user/check'){
        var str = '';
        req.setEncoding('utf8');
        req.on('data',function (data) {
            str += data;
        });
        req.on('end',function (data) {
            var contentType = req.headers['content-type'];
            console.log('111:'+contentType)
            if(contentType == 'application/json'){
                var json = JSON.parse(str);
                console.log(json)
                var dataJson = JSON.stringify({same:users.indexOf(json.username) == -1});
                res.end(dataJson);
            }else{
                res.end('404')
            }
        })
    }else{
        res.end('404')
    }
}).listen(8004);