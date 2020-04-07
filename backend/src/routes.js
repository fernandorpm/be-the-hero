const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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

// POST ONG ____________________________________________________________________
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// GET ONG INCIDENTS ___________________________________________________________
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// GET ALL INCIDENTS ___________________________________________________________
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

// POST INCIDENT _______________________________________________________________
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create);

// DELETE INCIDENT _____________________________________________________________
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


module.exports = routes;