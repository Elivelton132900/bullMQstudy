import express from "express"
import { userRegister } from "./users.route"

export const routes = (app: express.Express) => 
    {
    app.use(express.json({ limit: "5mb" }))
    app.use("/api", userRegister)
}