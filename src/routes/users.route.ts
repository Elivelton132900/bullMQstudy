import { celebrate, errors, Segments } from "celebrate";
import { Router } from "express";
import { UserRegister } from "../models/user-register.model";
import { Users } from "../controllers/users.controller";
import expressAsyncHandler from "express-async-handler";


export const userRegister = Router()
userRegister.post("/userRegister", celebrate({ [ Segments.BODY ]: UserRegister }), expressAsyncHandler(Users.store))

userRegister.use(errors())