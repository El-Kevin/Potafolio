'use strict'
var Project = require('../models/project')
var fs = require('fs')
 var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message: 'soy el metodo test del controlador de project'
        });
    },
    saveProject: function(req, res){
        var project = new Project();
        // Recoger parametros que me llegan desde la aplicación
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
    
        // Usar Promesa para guardar el proyecto
        project.save()
            .then((projectStored) => {
                if (!projectStored) {
                    return res.status(404).send({ message: 'No se ha guardado el proyecto' });
                }
                return res.status(200).send({ project: projectStored });
            })
            .catch((err) => {
                return res.status(500).send({ message: 'Error al guardar' });
            });
    },
    //obtener un proyecto
    getProject: function(req, res) {
        var projectId = req.params.id;
        
        Project.findById(projectId)
            .then(project => {
                if (!project) {
                    return res.status(404).send({ message: 'El documento no existe' });
                }
                return res.status(200).send(project);
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            });
    },
    //listar todos
    getProjects: function(req, res) {
        Project.find()
            .sort({ year: -1 })
            .exec()
            .then(projects => {
                if (!projects || projects.length === 0) {
                    return res.status(404).send({ message: 'No hay proyectos para mostrar' });
                }
                return res.status(200).send({ projects });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            });
    },
    //Actualizar documentos
    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;
        Project.findByIdAndUpdate(projectId, update, { new: true })
            .then(projectUpdated => {
                if (!projectUpdated) {
                    return res.status(404).send({ message: 'No existe un proyecto para actualizar' });
                }
                return res.status(200).send({ project: projectUpdated });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al actualizar' });
            });
    },

    deleteProject: function(req,res){
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId)
        .then(projectRemoved => {
            if (!projectRemoved) {
                return res.status(404).send({ message: 'No se puede eliminar ese proyecto' });
            }
            return res.status(200).send({ project: projectRemoved });
        })
        .catch(err =>{
            return res.status(500).send({ message: 'No se a podido borrar el documento' });
        });
    },
    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Image no subida...'
        //connect multi-party recoger ficheros por la request, utilizando req,files
        //en caso de que exista la propiedad con los archivos que se estan subiendo
        if(req.files){
            var filePath = req.files.image.path;
            //se guarda el recorte
            var fileSplit = filePath.split('\\')
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, { new: true })
                .then(projectUpdated => {
                    if (!projectUpdated) {
                        return res.status(404).send({ message: 'El proyecto no existe y no se ha asignado la imagen' });
                    }
                    return res.status(200).send({ project: projectUpdated });
                })
                .catch(err => {
                    return res.status(500).send({ message: 'La imagen no se a subido' });
                });
            }else{
                 //borrar el archivo
                fs.unlink(filePath, (err, filePath) => {
                    return res.status(200).send({message: 'la extension no es valida'});
                })
                   
            }
        }else{          
            return res.status(200).send({
                message: 'No se ha subido archivos'
            });
        }
    }
 };

 module.exports = controller;