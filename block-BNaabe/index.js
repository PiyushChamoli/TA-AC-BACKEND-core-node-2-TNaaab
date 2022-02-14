// Question 1
var path = require('path');

// - capture absolute path of `server.js`(itself)
console.log(__filename);

// - get absolute path of `app.js`
console.log(__dirname + '/app.js');

// - get realtive path of `index.html`
console.log('./index.html');

// - get absolute path of `index.html` using `path module` 
console.log(path.join(__dirname,'index.html'));

//Question 2

var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/') {
            res.writeHead(201,{'Content-Type':'application/json'});
            res.end(store);
        }
    })
}

server.listen(5000, () => {
    console.log('Server listening on port 5000')
})

// Question 3

var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/') {
            res.writeHead(201,{'Content-Type':'text/plain'});
            let parsedData = qs.parse(store);
            res.end(parsedData.captain);
        }
    })
}

server.listen(5001, () => {
    console.log('Server listening on port 5001')
})

// Question 4

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            let parsedData = qs.parse(store);
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(parsedData));
        } else if (req.headers['content-type'] === 'application/json') {
            res.setHeader('Content-Type','application/json');
            res.end(store);
        }
    })
}

server.listen(9000, () => {
    console.log('Server listening on port 9000')
})

// QUestion 5

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        let parsedData = JSON.parse(store);
        res.setHeader('Content-Type','text/html');
        res.write(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`)
        res.end();
    })
}

server.listen(3000, () => {
    console.log('Server listening on port 3000')
})

// QUestion 6

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        let parsedData = qs.parse(store);
        res.setHeader('Content-Type','text/html');
        res.write(`<h2>${parsedData.email}</h2>`)
        res.end();
    })
}

server.listen(3456, () => {
    console.log('Server listening on port 3456')
})