import {PrismaClient} from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    const { id } = event.context.params
    const password = await prisma.password.delete({
        where: {
            id: parseInt(id),
        },
    })

    return {
        data: password
    }
})