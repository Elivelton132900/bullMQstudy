import { ConnectionOptions, Job, Queue } from "bullmq";
import { Request, Response } from "express";
import IORedis from "ioredis"

export class Users {

    static async store(req: Request, res: Response) {
        const payload = req.body

        // pode-se passar {host, port, username, password}
        const connection = new IORedis({
            host: "127.0.0.1",
            port: 6379
        }) as ConnectionOptions

        // segundo parâmetro configurações de conexão. host, porta, username e password
        const queue = new Queue("userStoreQueue", { connection })

        // o primeiro parâmetro é o nome do job
        const add: Job = await queue.add("UserStoreJob", payload, {
            // removeOnComplete e RemoveOnFail: {}
            // se true, deleta assim que o job for executado com sucesso. se age, passa tempo em segundos para que esse job seja apagado. se count, guarda os últimos x
            // ao utilizar count e age, guarda os ultimos x job por y quantidade de segundos.
            removeOnComplete:{
                age: 3600
            }, 
            removeOnFail: {
                count: 1000
            }

        })
        console.log(add)
        res.status(200).json({
            mesasge: "User created",

        })
    }
}