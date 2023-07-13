import {PrismaClient} from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    const body = await readBody(event)

    const result = await prisma.password.create({
        data: {
            title: body.title,
            value: body.value
        },
    })

    return {
        data: result
    }
})