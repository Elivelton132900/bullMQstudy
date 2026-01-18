import express from "express"
import { routes } from "./routes"

const app = express()

routes(app)

app.listen(3000, () => {
    console.log("App running http://localhost:3000")
})