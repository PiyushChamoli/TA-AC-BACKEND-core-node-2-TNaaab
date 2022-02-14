var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    const userDir = __dirname + "/users/";
    let parsedURL = url.parse(req.url,true);
    let pathname = parsedURL.pathname;

    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if (req.method === 'POST' && req.url === '/users') {
            var userName = JSON.parse(store).username;
            fs.open(userDir+userName+".json", "wx", (err,fd) => {
                fs.writeFile(fd, store, (err) => {
                    fs.close(fd, (err) => {
                        res.end(`${userName} successfully registered`);
                    })
                })
            })   
        }
        if (req.method === 'GET' && pathname === '/users') {
            let username = parsedURL.query.username;
            fs.readFile(userDir + username + '.json', (err, user) => {
                res.setHeader('Content-Type','application/json');
                res.end(user);
            })
        }
        if (req.method === 'PUT' && pathname === '/users') {
            let username = parsedURL.query.username;
            fs.open(userDir+userName+".json","r+", (err,fd) => {
                fs.ftruncate()
            })
        }
        if (req.method === 'DELETE' && pathname === '/users') {
            let username = parsedURL.query.username;
            fs.unlink(userDir + username + '.json',() => {
                res.end(`${username} successfully deleted`);
            });
        }
    })

}

server.listen(5000, () => {
    console.log('Server listening on port 5000')
})