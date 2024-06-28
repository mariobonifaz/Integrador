import Joi from 'joi';

export const validateCreateIngrediente = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    cantidad: Joi.number().min(1).positive().required()
});

export const validateUpdateIngrediente = Joi.object({
    id: Joi.string().required(),
    nombre: Joi.string().min(1).max(100).optional(),
    cantidad: Joi.number().min(1).positive().optional()
});

export const validateIdIngrediente = Joi.object({
    id: Joi.string().required(),
});