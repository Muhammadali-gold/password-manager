import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    const notes = await prisma.note.findMany({})
    return {
        data: notes
    }
})
