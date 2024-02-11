const http = require('http');
const fs = require('fs');

const homepage = fs.readFileSync('./test/index.html')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write(homepage)
        res.end()
    }
    else if (req.url === '/about') {
        res.end('this is about page')
    }
    else {
        res.end('404 page not found')
    }
})
server.listen(9090);