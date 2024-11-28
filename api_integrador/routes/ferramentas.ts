import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()




router.get("/", async (req, res) => {
  try {
    const ferramentas = await prisma.ferramenta.findMany({
      include: {
        fabricante: true
      }
    })
    res.status(200).json(ferramentas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { modelo, ano, preco, tipo, quantidadeEmEstoque, foto, acessorios, fabricanteId } = req.body

  // Verifica se todos os campos obrigatórios foram enviados
  if (!modelo || !ano || !preco || !tipo || !quantidadeEmEstoque || !foto || !fabricanteId) {
    res.status(400).json({ "erro": "Informe modelo, ano, preco, tipo, quantidadeEmEstoque, foto e fabricanteId" })
    return
  }

  try {
    // Cria uma nova ferramenta
    const ferramenta = await prisma.ferramenta.create({
      data: { 
        modelo, 
        ano, 
        preco, 
        tipo, 
        quantidadeEmEstoque, 
        foto, 
        acessorios, 
        fabricanteId 
      }
    })
    res.status(201).json(ferramenta)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const ferramenta = await prisma.ferramenta.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(ferramenta)
  } catch (error) {
    res.status(400).json(error)
  }
})



router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { modelo, ano, preco, tipo, quantidadeEmEstoque, foto, acessorios, fabricanteId } = req.body

  if (!modelo || !ano || !preco || !tipo || !quantidadeEmEstoque || !foto || !fabricanteId) {
    res.status(400).json({ "erro": "Informe modelo, ano, preco, tipo, quantidadeEmEstoque, foto, acessorios e fabricanteId" })
    return
  }

  try {
    const ferramenta = await prisma.ferramenta.update({
      where: { id: Number(id) },
      data: { modelo, ano, preco, tipo, quantidadeEmEstoque, foto, acessorios, fabricanteId }
    })
    res.status(200).json(ferramenta)
  } catch (error) {
    res.status(400).json(error)
  }
})


router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params

  // tenta converter o termo em número
  const termoNumero = Number(termo)

  // se a conversão gerou um NaN (Not a Number)
  if (isNaN(termoNumero)) {
    try {
      const ferramentas = await prisma.ferramenta.findMany({
        include: {
          fabricante: true
        },
        where: {
          OR: [
            { modelo: { contains: termo }},
            { fabricante: { nome: termo }}
          ]
        }
      })
      res.status(200).json(ferramentas)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    try {
      const ferramentas = await prisma.ferramenta.findMany({
        include: {
          fabricante: true
        },
        where: {
          OR: [
            { preco: { lte: termoNumero }},
            { ano: termoNumero }
          ]
        }
      })
      res.status(200).json(ferramentas)
    } catch (error) {
      res.status(400).json(error)
    }
  }
})



router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const ferramenta = await prisma.ferramenta.findUnique({
      where: { id: Number(id)},
      include: {
        fabricante: true
      }
    })
    res.status(200).json(ferramenta)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router