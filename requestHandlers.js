var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");
var timenow;
function start(response){
  console.log("已调用请求处理程序“start”...");

  var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
  timenow = Date.parse(new Date())
  console.log("调用了请求处理程序“upload”..." + "<br>");
  var form =new formidable.IncomingForm();
  form.uploadDir='./tmp';
  console.log("即将解析" + "<br>");
  form.parse(request,function(error, fields, files){
    console.log("解析完成");
    fs.renameSync(files.upload.path,"./tmp/"+ timenow +".png");
    response.writeHead(200,{"Content-Type": "text/html; charset=utf-8"});
    response.write('图片上传成功!');
    response.write("<img style='height:150px;width:300px;margin: 100px auto;' src='/show' />");
    response.end();
  });
}

function show(response){
  console.log("开始执行图片展示show");
  fs.readFile("./tmp/"+ timenow +".png","binary",function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error +"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/png"});
      response.write(file,"binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;