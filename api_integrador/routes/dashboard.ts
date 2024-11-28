import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const ferramentas = await prisma.ferramenta.count()
    const avaliacoes = await prisma.avaliacao.count()
    res.status(200).json({ clientes, ferramentas, avaliacoes })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/ferramentasFabricantes", async (req, res) => {
  try {
    const ferramentas = await prisma.ferramenta.groupBy({
      by: ['fabricanteId'],
      _count: {
        id: true, 
      }
    })

    // Para cada carro, inclui o nome da marca relacionada ao marcaId
    const ferramentasFabricantes = await Promise.all(
      ferramentas.map(async (ferramenta) => {
        const fabricante = await prisma.fabricante.findUnique({
          where: { id: ferramenta.fabricanteId }
        })
        return {
          fabricante: fabricante?.nome, 
          num: ferramenta._count.id
        }
      })
    )
    res.status(200).json(ferramentasFabricantes)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
