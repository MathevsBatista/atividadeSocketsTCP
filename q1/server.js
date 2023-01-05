const net = require('net');

const handleConnection = (socket) => {
    console.log('Someone connected.');
    socket.on('end', () => {
        console.log('disconnected');
    });
    socket.on('data', (data) => {
        const str = data.toString();
        if (str === 'end') {
            socket.end();
        }
    });
};

const server = net.createServer(handleConnection);

server.listen(4000, '127.0.0.1');

const getUserInput = () => {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim());
        });
    });
};

async function readAndSend(socket) {
    while (true) {
        const message = await getUserInput();
        socket.write(`Server: ${message}\n`);
    }
}

server.on('connection', (socket) => {
    console.log('New client connected!');

    socket.on('data', (data) => {
        console.log(`${data}`);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    readAndSend(socket);
});

