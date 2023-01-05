const net = require('net');
const readline = require('readline');

const client = new net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

client.connect(4000, '127.0.0.1', () => {
    console.log('Connected to server');
    rl.addListener('line', (line) => {
        client.write(`Client: ${line}\n`);
    });
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log('Disconnected from server');
});

