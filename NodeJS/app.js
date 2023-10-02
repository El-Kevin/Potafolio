//guardo toda la configuracion de express y de las peticiones con body-parser
'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var project_router = require('./rutes/project')
var app = express();
//cargan archivos de rutas



//middlewares.- son metodos que se ejecuta antes de que se ejecute controlador, el resultado de una peticion
//global app es un metodo de express
//body parser para convertir lo que llegue por post o get a un objeto json
app.use(bodyParser.urlencoded({extended: false}))

//convierte cualquier tipo de peticion a json
app.use(bodyParser.json());


//Cors

// Configurar cabeceras y cors
app.use((req, res, next) => {
    //cuando se publique, en ves de * poner la url permitida o los origenes permitidos
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//Rutas

app.use('/api', project_router)
/*
//req son datos que envio desde el cliente o desde la peticion que yo haga
//res la respuesta que voy a estar enviando
app.post('/test', (req, res) =>{

// por parametros
    const nombre = req.query.nombre;
    const apellidos = req.query.apellidos;
// por body
 const web = req.body.web

    console.log(nombre);
    console.log(apellidos);
    console.log(web);

    res.status(200).send({
        message: "Hola mundo desde mi api de nodejs",
        name: "Kevin"
    }); //respuesta exitosa del lado del servidor
});

app.get('/', (req, res) =>{
    res.status(200).send(
        "<h1>Pagina de inicio</h1>",

    ); //respuesta exitosa del lado del servidor
});
*/




//exportar el modulo app.js

module.exports = app;