// index.js
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.delete(`/password/:id`, async (req, res) => {
    const { id } = req.params
    const password = await prisma.password.delete({
        where: {
            id: parseInt(id),
        },
    })
    res.json(password)
})

app.delete(`/note/:id`, async (req, res) => {
    const { id } = req.params
    const note = await prisma.note.delete({
        where: {
            id: parseInt(id),
        },
    })
    res.json(note)
})

app.get('/notes', async (req, res) => {
    const posts = await prisma.note.findMany({})
    res.json(posts)
})

app.get('/passwords', async (req, res) => {
    const posts = await prisma.password.findMany({
    })
    res.json(posts)
})

app.post(`/note`, async (req, res) => {
    const result = await prisma.note.create({
        data: {
            value: req.body.value,
        },
    })
    res.json(result)
})

app.post(`/password`, async (req, res) => {
    const result = await prisma.password.create({
        data: {
            value: req.body.value,
        },
    })
    res.json(result)
})

export default {
    path: '/api',
    handler: app
}