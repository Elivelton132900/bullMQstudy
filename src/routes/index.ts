import express from "express"
import { userRegister } from "./users.route"

console.log("ESTOU AQUI 2")

export const routes = (app: express.Express) => 
    {
    console.log("REGISTERING ROUTES")
    app.use(express.json({ limit: "5mb" }))
    app.use("/api", userRegister)
}