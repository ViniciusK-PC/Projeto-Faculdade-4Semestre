import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

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

// router.get("/:carroId", async (req, res) => {
//   const { carroId } = req.params

//   try {
//     const fotos = await prisma.foto.findMany({
//       where: { carroId: Number(carroId) }
//     })
//     res.status(200).json(fotos)
//   } catch (error) {
//     res.status(400).json(error)
//   }
// })

// router.post("/", upload.single('codigoFoto'), async (req, res) => {
//   const { descricao, carroId } = req.body
//   const codigo = req.file?.buffer.toString("base64")

//   if (!descricao || !carroId || !codigo) {
//     res.status(400).json({ "erro": "Informe descricao, carroId e codigoFoto" })
//     return
//   }

//   try {
//     const foto = await prisma.foto.create({
//       data: {
//         descricao, carroId: Number(carroId),
//         codigoFoto: codigo as string
//       }
//     })
//     res.status(201).json(foto)
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
const router = Router()

router.get("/:ferramentaId", async (req, res) => {
  const { ferramentaId } = req.params

  try {
    const fotos = await prisma.foto.findMany({
      where: { ferramentaId: Number(ferramentaId) }
    })

    res.status(200).json(fotos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", upload.single('codigoFoto'), async (req, res) => {
  const { descricao, ferramentaId } = req.body
  const codigo = req.file?.buffer.toString("base64")

  if (!descricao || !ferramentaId || !codigo) {
    res.status(400).json({ "erro": "Informe descricao, ferramentaId e codigoFoto" })
    return
  }

  try {
    const foto = await prisma.foto.create({
      data: {
        descricao, ferramentaId: Number(ferramentaId),
        codigoFoto: codigo as string
      }
    })
    res.status(201).json(foto)
  } catch (error) {
    res.status(400).json(error)
  }
})

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