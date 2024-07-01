import Joi from 'joi';

export const validateCreatePlatillo = Joi.object({
    nombre_platillo: Joi.string().min(1).max(100).required(),
    descripcion: Joi.string().min(1).required(),
    precio: Joi.number().min(1).positive().optional(),
    categoria: Joi.string().min(1).required(),
    imagen: Joi.string().min(1).required(),

});

export const validateUpdatePlatillo = Joi.object({
    id: Joi.string().required(),
    nombre_platillo: Joi.string().min(1).max(100).required(),
    descripcion: Joi.string().min(1).required(),
    precio: Joi.number().min(1).positive().optional(),
    categoria: Joi.string().min(1).required(),
    imagen: Joi.string().min(1).required(),
});

export const validateIdPlatillo = Joi.object({
    id: Joi.string().required(),
});