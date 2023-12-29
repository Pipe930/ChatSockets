import { Socket } from "net";
import { createInterface } from "readline";

const END = "END";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function connect(port, host) {

  const socket = new Socket();

  console.log(`Connecting to ${host}:${port}`);
  socket.connect({ host, port });
  socket.setEncoding("utf-8");

  socket.on("connect", () => {

    console.log("Connected");
    readline.question("Choose your username: ", (username) => {
      socket.write(username);
      console.log(`Type any message to send it, type ${END} to finish`);
    });

    readline.on("line", (message) => {
        
      socket.write(message);
      if (message === END) {
        socket.end();
      }
    });

    socket.on("data", (data) => {
      console.log(data);
    });
  });

  socket.on("error", (err) => error(err.message));

  socket.on("close", () => {
    console.log("Disconnected");
    process.exit(0);
  });
}

function error(message) {
  console.log(message);
  process.exit(1);
}

function main() {
  if (process.argv.length !== 4) {
    error(`Usage: node ${__filename} host port`);
  }

  let [, , host, port] = process.argv;

  if (isNaN(port)) {
    error(`Invalid port ${port}`);
  }

  port = Number(port);

  connect(port, host);
}

main();
