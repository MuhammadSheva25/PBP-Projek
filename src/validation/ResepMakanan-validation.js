import Joi from "joi";

const createResepMakananValidation = Joi.object({
    nama:Joi.string ().max(255).required(),
    bahan:Joi.string ().max(1000).required(),
    langkahpembuatan:Joi.string ().max(255).required(),
})

const getResepMakananValidation = Joi.number().required();

const updateResepMakananValidation = Joi.object({
    id:Joi.number().required(),
    nama:Joi.string().max(255).optional(),
    bahan:Joi.string().max(1000).optional(),
    langkahpembuatan:Joi.string ().max(255).optional(),
})

const searchResepMakananValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    bahan: Joi.string().max(1000).optional(),
    nama: Joi.string().max(255).optional(),
})

export{
    createResepMakananValidation,
    getResepMakananValidation,
    updateResepMakananValidation,
    searchResepMakananValidation
}