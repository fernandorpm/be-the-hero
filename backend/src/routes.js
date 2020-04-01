const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

/**
 *Parâmetros: 
 *
 *Query params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
 *Ex: localhost:3333/users?page=2&name=Fernando&age=23
 *req.query
 *
 *Route params: Parâmetros utilizados para identificar recursos
 *Ex: localhost:3333/:id 
 *req.params
 *
 *Request body: Corpo da requisição utilizado para criar ou alterar recursos
 *Ex: 
 *req.body
 *
 */

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;