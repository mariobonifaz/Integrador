import Joi from 'joi';

export const validateCreatePlatillo = Joi.object({
    nombre_platillo: Joi.string().min(1).max(100).required(),
    descripcion: Joi.string().min(1).required(),
    precio: Joi.number().min(1).positive().optional(),
    categoria: Joi.string().min(1).required(),
    imagen: Joi.string().min(1).required(),

});

export const validateUpdateIngrediente = Joi.object({
    id: Joi.string().required(),
    nombre: Joi.string().min(1).max(100).optional(),
    cantidad: Joi.number().min(1).positive().optional()
});

export const validateIdIngrediente = Joi.object({
    id: Joi.string().required(),
});