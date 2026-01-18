import { PrismaClient } from '../generated/prisma'
import { hashPassword, verifyPassword } from '../utils/hash'

const prisma = new PrismaClient()

export class UserService {
    static async create(data: {
        fullName?: string
        email: string
        password: string
    }) {
        const hashedPassword = await hashPassword(data.password)

        return prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashedPassword,
            },
        })
    }

    static async verifyCredentials(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isValid = await verifyPassword(password, user.password)

        if (!isValid) {
            throw new Error('Invalid credentials')
        }

        return user
    }
}