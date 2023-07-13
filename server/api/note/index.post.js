import {PrismaClient} from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    const body = await readBody(event)

    const result = await prisma.note.create({
        data: {
            value: body.value
        },
    })

    return {
        data: result
    }
})