import { Server } from "net";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const server = new Server();
const host = "0.0.0.0";
const END = "END";

const connections = new Map();

function sendMessage(message, origin) {

  // Mandar a todos menos el origen el mensaje
  for(const socket of connections.keys()){

    if (socket !== origin){
        socket.write(message);
    }
  }
}

function validUsername(message, socket){
    
    for(const username of connections.values()){

        if(message === username || message === "END"){
            
            socket.write("that username already exists, enter another");
            return false;
        }
    }
    return true;
}

function listen(port) {

  server.on("connection", (socket) => {

    const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`New connection from ${remoteSocket}`);
    socket.setEncoding("utf-8");

    socket.on("data", (message) => {

        if(validUsername(message, socket)){

            if (!connections.has(socket)) {
      
              console.log(`Username ${message} set for connection ${remoteSocket}`);
              connections.set(socket, message);
            } 
            else if (message === END) {
      
              connections.delete(socket);
              socket.end();
            } else {
      
              // Enviar mensajes al resto de clientes
      
              const fullMessage = `[${connections.get(socket)}]: ${message}`;
              console.log(`${remoteSocket} -> ${fullMessage}`);
              sendMessage(fullMessage, socket);
            }
        }

      socket.on("error", (err) => error(err.message));
    });

    socket.on("close", () => {
        console.log(`Connection with ${remoteSocket} closed`);
      });
  });

  server.listen({ port: port, host: host }, () => {
    console.log("Listening on port " + port);
  });

  server.on("error", (err) => error(err.message));
}

function error(message) {

  console.log(message);
  process.exit(1);
}

function main() {

  if (process.argv.length !== 3) {
    error(`Usage: node ${__filename} port`);
  }

  let port = process.argv[2];

  if (isNaN(port)) {
    error(`Invalid port ${port}`);
  }

  port = Number(port);

  listen(port);
}

main();
