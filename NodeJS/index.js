'use strict'
// carga o importo el modulo de mongoose
var mongoose = require('mongoose');
//cargo la configuracion de express
var app = require('./app');
//puerto del servidor
var port = 3700;

//le indico que es una promesa
mongoose.Promise  = global.Promise;

//invoco el metodo connect
//como parametro paso la url de la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/portafolio')
    .then( () => {
        console.log("Me conecte a mongodb dice el bolon_xd");
        
        //Creacion del servidor
        app.listen(port, () => {
            console.log("El servidor esta corriendo en el servidor localhost: " + port)
            
        });
    })
    .catch (err => {
        console.log(err)
    });