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
                if (err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err);
                    fs.close(fd, (err) => {
                        return res.end(`${userName} successfully registered`);
                    })
                })
            })   
        }
        if (req.method === 'GET' && pathname === '/users') {
            let username = parsedURL.query.username;
            fs.readFile(userDir + username + '.json', (err, user) => {
                if (err) return console.log(err);
                res.setHeader('Content-Type','application/json');
                return res.end(user);
            })
        }
        if (req.method === 'PUT' && pathname === '/users') {
            let username = parsedURL.query.username;
            fs.open(userDir+userName+".json","r+", (err,fd) => {
                if (err) return console.log(err);
                fs.ftruncate(fd, (err) => {
                    if (err) return console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if (err) return console.log(err);
                        fs.close(fd, () => {
                            return res.end(`${username} updated`);
                        })
                    })
                })
            })
        }
        if (req.method === 'DELETE' && pathname === '/users') {
            let username = parsedURL.query.username;
            fs.unlink(userDir + username + '.json',(err) => {
                if (err) return console.log(err);
                return res.end(`${username} successfully deleted`);
            });
        }

        res.statusCode = 404;
        res.end('Page Not Found');
    })

}

server.listen(5000, () => {
    console.log('Server listening on port 5000')
})