var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let allData = '';
    req.on('data', (chunk) => {
        allData += chunk;
    })
    req.on('end' ,() => console.log(allData));
    res.write(allData);
    res.end();
}

server.listen(5000, () => {
    console.log('Server listening on port 5000')
})