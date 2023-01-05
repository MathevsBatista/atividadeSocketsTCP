const net = require('net');

const client = new net.Socket();

client.connect(4000,  '127.0.0.1', () => {
    console.log('Connected to server');
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
});

const getUserInput = () => {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim());
        });
    });
};

async function readAndSend() {
    while (true) {
        const message = await getUserInput();
        client.write(message);
    }
}

readAndSend();

