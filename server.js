var server = require('pushstate-server');

server.start({
  port: 3005,
  directory: './build'  //你的react项目build以后的目录，我的server.js 跟目录build是同一级的
});