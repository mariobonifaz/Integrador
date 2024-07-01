import Joi from 'joi';

export const validateCreateComent = Joi.object({
    id_platillo: Joi.string().required(),
    id_user: Joi.string().required(),
    comentario: Joi.string().max(100).allow(null, ''),
    calificacion: Joi.number().min(0).max(5).allow(null, '')
});


export const validateIdComent = Joi.object({
    id_platillo: Joi.string().required(),
});

export const validateDeleteComent = Joi.object({
    id: Joi.string().required(),
    id_user: Joi.string().required(),
    

});

export const validateUpdateComent = Joi.object({
    id: Joi.string().required(),
    id_user: Joi.string().required(),
    comentario: Joi.string().max(100).allow(null, ''),
    calificacion: Joi.number().min(0).max(5).allow(null, '')
});
