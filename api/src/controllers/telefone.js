const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const telefone = await prisma.telefone.create({
            data: req.body
        });
        res.status(201).json(telefone).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const read = async (req, res) => {
    const telefones = await prisma.telefone.findMany();
    res.json(telefones);
}

const readOne = async (req, res) => {
    try {
        const telefone = await prisma.telefone.findUnique({
            where: {
                id: Number(req.params.id) // Converte o ID para número
            },
            include: {
                cliente: true // Inclui os dados do cliente relacionado
            }
        });
        res.json(telefone);
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const update = async (req, res) => {
    try {
        const telefone = await prisma.telefone.update({
            data: req.body,
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(202).json(telefone).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

const remove = async (req, res) => {
    try {
        const telefone = await prisma.telefone.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(204).json(telefone).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}