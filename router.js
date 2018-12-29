const fs = require('fs');

const requestRouter = (request, response) => {
    const url = request.url;
    const method = request.method;
    if (url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<h1>Enter message</h1>');
        response.write('<form action="/message" method="POST">\
    <input type="text" name="message">\
    <button type="submit">Send</button>\
    </form>')
        response.write('</html>');
        return response.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        });
        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (error) => {
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();
            });
        });

    }
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<h1>Hello World</h1>');
    response.write('</html>');
    response.end();
};

module.exports = {
    routerFunction: requestRouter
};