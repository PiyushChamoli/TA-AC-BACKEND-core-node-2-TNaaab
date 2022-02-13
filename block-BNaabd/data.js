var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    var dataFormat = req.headers['content-type'];
    console.log(dataFormat);
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (dataFormat === 'application/json') {
            res.end(store);
        }
        if (dataFormat === 'application/x-www-form-urlencoded') {
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(7000, () => {
    console.log('server listening on port 7000')
})