import { Joi } from "celebrate";

export const UserRegister = Joi.object({
    full_name: Joi.string().min(1).max(100).required(),
    password: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required()
})