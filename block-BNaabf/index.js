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
        if (req.method === 'POST' && req.url === '/form') {
            res.setHeader('Content-Type','text/html');
            let parsedData = qs.parse(store);
            res.write(`<h2>Name: ${parsedData.name}</h2>`);
            res.write(`<h3>Email: ${parsedData.email}</h3>`);
            res.write(`<h3>Age: ${parsedData.age}</h3>`);
            res.end();
        }
    })
}

server.listen(5678, () => {
    console.log('Server listening on port 5678')
})