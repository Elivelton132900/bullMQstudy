import express from "express"

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb" }))
}