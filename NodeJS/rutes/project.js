'use strict'
var express = require('express');
var ProjectController = require('../controller/project');
//midlewor es algo que se ejecuta antes de ejecutarse un metodo o la accion del controlador
var multipart = require('connect-multiparty');
//indico donde se van a subir los archivos
var multipartMiddleware = multipart({uploadDir: './uploads'})

var router = express.Router();
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id',multipartMiddleware, ProjectController.uploadImage);
module.exports = router;