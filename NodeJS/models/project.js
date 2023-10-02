'use strict'
var mongoose = require('mongoose');
//defino el esquema del modelo
var Schema = mongoose.Schema;
// creo el esquema del project
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String    
});
// para usar el esquema y utilizarlo como modelo
module.exports = mongoose.model('project', ProjectSchema);