const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const { celebrate, Segments, Joi } = require('celebrate')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
  //[Segments.BODY]: entre colchetes pq e uma variavel javascript e nao uma key de um objeto.
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), ProfileController.index)


routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentsController.index)


routes.post('/incidents', IncidentsController.create)


routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentsController.delete)

module.exports = routes