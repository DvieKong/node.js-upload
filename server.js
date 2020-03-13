var http = require("http");
var url = require("url");

function start(route, handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log("请求路径: "+ pathname +" 接收...");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("node服务启动...");
}

exports.start = start;