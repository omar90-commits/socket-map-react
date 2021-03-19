const Marcadores = require('./marcadores');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
               
            // Marcadoresa-ctivos
            socket.emit('marcadores-activos', this.marcadores.activos);

            // Marcador-nuevo
            socket.on('marcador-nuevo', (marcador) => {

                this.marcadores.agregarMarcador( marcador );

                socket.broadcast.emit('marcador-nuevo', marcador);
            });

            // Marcador-actualizado
            socket.on('marcador-actualizado', (marcador) => {

                this.marcadores.actualizarMarcador( marcador );

                socket.broadcast.emit('marcador-actualizado', marcador);
            });
        });
    }


}


module.exports = Sockets;