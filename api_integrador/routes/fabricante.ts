import { PrismaClient } from "@prisma/client"
import { Router } from "express"

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

// const router = Router()

// router.get("/", async (req, res) => {
//   try {
//     const marcas = await prisma.marca.findMany()
//     res.status(200).json(marcas)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.post("/", async (req, res) => {
//   const { nome } = req.body

//   if (!nome) {
//     res.status(400).json({ "erro": "Informe o nome da marca" })
//     return
//   }

//   try {
//     const marca = await prisma.marca.create({
//       data: { nome }
//     })
//     res.status(201).json(marca)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params

//   try {
//     const marca = await prisma.marca.delete({
//       where: { id: Number(id) }
//     })
//     res.status(200).json(marca)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { nome } = req.body

//   if (!nome) {
//     res.status(400).json({ "erro": "Informe o nome da marca" })
//     return
//   }

//   try {
//     const marca = await prisma.marca.update({
//       where: { id: Number(id) },
//       data: { nome }
//     })
//     res.status(200).json(marca)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// export default router

const router = Router()

// Rota para listar todos os fabricantes
router.get("/", async (req, res) => {
  try {
    const fabricantes = await prisma.fabricante.findMany()
    res.status(200).json(fabricantes)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota para criar um novo fabricante
router.post("/", async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ "erro": "Informe o nome do fabricante" })
    return
  }

  try {
    const fabricante = await prisma.fabricante.create({
      data: { nome }
    })
    res.status(201).json(fabricante)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota para deletar um fabricante por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const fabricante = await prisma.fabricante.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(fabricante)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota para atualizar um fabricante por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome } = req.body

  if (!nome) {
    res.status(400).json({ "erro": "Informe o nome do fabricante" })
    return
  }

  try {
    const fabricante = await prisma.fabricante.update({
      where: { id: Number(id) },
      data: { nome }
    })
    res.status(200).json(fabricante)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
