function route(handle, pathname, response, request){
  console.log("接收发送请求: "+ pathname);
  if(typeof handle[pathname]==='function'){
    handle[pathname](response, request);
  }else{
    console.log("找不到的请求处理程序 "+ pathname);
    response.writeHead(404,{"Content-Type":"text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;