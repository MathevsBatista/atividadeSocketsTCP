const net = require('net');

const clients = [];

const server = net.createServer((client) => {
  client.write("What is your name?\n");

  client.on('data', (data) => {
    if (!client.name) {
      client.name = data.toString().trim();
      client.write(`Welcome, ${client.name}!\n`);
      console.log(`New client connected: ${client.name}`);
      clients.push(client);
    } else {
      broadcast(data, client);
    }
  });

  client.on('end', () => {
    console.log(`${client.name} disconnected`);
    clients.splice(clients.indexOf(client), 1);
  });

  client.on('error', (err) => {
    console.log(`Error: ${err}`);
  });
});

const broadcast = (message, sender) => {
  clients.forEach((client) => {
    if (client === sender) return;
    client.write(`${sender.name}: ${message}`);
  });

  process.stdout.write(`${sender.name}: ${message}\n`);
};

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});

