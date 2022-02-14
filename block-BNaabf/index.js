// Question 1

// console.log('../client/index.js');

// console.log(__dirname + );

// Question 2

var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    if (req.method === 'GET' && req.url === '/form') {
        res.setHeader('Content-Type','text/html');
        fs.createReadStream('./form.html').pipe(res);
    }
    var store = '';
    req.on('data', (chunk) => {
        store +=chunk; 
    })
    req.on('end', () => {
        if (req.method === 'POST') {
            res.setHeader('Content-Type','application/json');
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(5678, () => {
    console.log('Server listening on port 5678')
})