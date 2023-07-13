import {PrismaClient} from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    const passwords = await prisma.password.findMany({})
    return {
        data: passwords
    }
})