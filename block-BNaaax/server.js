const { Server } = require('http');
var path = require('path');

console.log(__dirname);
console.log(__filename);

let serverPath = path.join(
    __dirname,'server.js'
);
console.log(serverPath);