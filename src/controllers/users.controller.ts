import { Queue } from "bullmq";
import { Request, Response } from "express";
import IORedis from "ioredis"

export class Users {
    
    async store(req: Request, res: Response) {
        const payload = req.body

        // pode-se passar {host, port, username, password}
        const connection = new IORedis()

        const queue = new Queue("createUser")
        
        // o primeiro parâmetro é o nome do job
        await queue.add("registerUserJob", payload)
        
    }
}