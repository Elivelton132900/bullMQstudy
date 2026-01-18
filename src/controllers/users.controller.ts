import { ConnectionOptions, Job, Queue } from "bullmq";
import { Request, Response } from "express";
import IORedis from "ioredis"
import { nanoid } from "nanoid";

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
            jobId: nanoid() as string, //idempotência. Se um job com esse mesmo valor for enviado à fila, ele não será adicionado.
            // removeOnComplete e RemoveOnFail: {}
            // se true, deleta assim que o job for executado com sucesso. se age, passa tempo em segundos para que esse job seja apagado. se count, guarda os últimos x
            // ao utilizar count e age, guarda os ultimos x job por y quantidade de segundos.
            removeOnComplete:{
                count: 300,
                age: 3600 * 24
            }, 
            removeOnFail: {
                count: 1000,
                age: 3600 * 24
            }

        })

        // ---------------------------------------------- adição em massa de jobs, concorrência global e deletando jobs da fila --------------------------------------------------

        // adicionando vários jobs de uma vez
        const newQueue: Queue = new Queue("NewUserStoreQueue")

        // Permite que dentro dessa nova fila, apenas seja permitido que um worker trabalhe simultaneamente em 4 jobs
        await newQueue.setGlobalConcurrency(4)

        // limpar os jobs que estão na fila com o status de waiting ou delayed
        await newQueue.drain()

        // limpa TODA a fila
        await newQueue.obliterate()
        await newQueue.addBulk([
            {name: "Eli", data: {send: "contact@geral.com.br", subject: "about you account"}},
            {name: "Eli", data: {send: "contact@geral.com.br", subject: "about you account"}},
            {name: "Eli", data: {send: "contact@geral.com.br", subject: "about you account"}},
            {name: "Eli", data: {send: "contact@geral.com.br", subject: "about you account"}},
            {name: "Eli", data: {send: "contact@geral.com.br", subject: "about you account"}}
        ])

        console.log(add)
        res.status(200).json({
            mesasge: "User created",

        })
    }
}