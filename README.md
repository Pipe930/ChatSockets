# CHAT SOCKET CONNECTION 🔌

# Descripción 
Este es un programa de comunicación entre dos programas o procesos a travez de sockets del sistema, esta escrito en el lenguaje de programación javascript con node js utilizando librerias nativas de node js para la implementación de conexiones entre sockets.

# Tecnologías
- Node JS v18.18.2

# Ejecución
Primero tienes que tener instalado node js. En el `package.json` tenemos 2 scripts:

    "scripts": {
        "server": "node src/server.js 8000",
        "client": "node src/client.js 127.0.0.1 8000"
    }


Para poder ejecutarlos tienes que abrir una bash o shell (Si estas en linux o mac) o un cmd (Si estas en windows), primero tienes que iniciar el servidor ejecutando el comando:

    npm run server

Donde se iniciara el servidor en local y en el puerto 8000, despues tienes que abrir otra bash o cmd y ejecutar el script de de client con el siguiente comando

    npm run server

Ahora que estan corriendo los scripts en el lado del cliente te pedira ingresar un nombre de usuario, lo ingresas y te conectaras al servidor y podras mandar mensajes.
Puedes intentar abrir más clientes, abriendo más terminales y ejecutando el comando. Para cerrar o terminar una conexión tienes que escribir END y el cliente se desconectara del servidor.