import { ConnectionOptions, Job, Queue } from "bullmq";
import { Request, Response } from "express";
import IORedis from "ioredis"

export class Users {

    static async store(req: Request, res: Response) {
        const { full_name, password, email } = req.body

        // pode-se passar {host, port, username, password}
        const connection = new IORedis({
            host: "127.0.0.1",
            port: 6379
        }) as ConnectionOptions

        const queue = new Queue("createUser", {connection})

        // o primeiro parâmetro é o nome do job
        const add: Job = await queue.add("registerUserJob", { full_name, password, email })
        console.log(add)
        res.status(200).json({
            mesasge: "User created",
            full_name,
            email,
            password
        })

    }
}