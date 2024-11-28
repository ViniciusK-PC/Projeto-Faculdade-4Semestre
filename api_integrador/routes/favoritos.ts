import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()

const router = Router()

router.get("/:clienteId", async (req, res) => {
  const { clienteId } = req.params;

  try {
    const favorito = await prisma.favorito.findMany({
      where: {
        clienteId: clienteId
      },
      include: {
        ferramenta: {
          select: {
            id: true,
            foto: true,
            preco: true,
            fabricante: {
              select: { nome: true }
            },
          }
        }
      }
    });

    if (favorito) {
      res.status(200).json(favorito);
    } else {
      res.status(404).json({ message: "Favorito não encontrado" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:clienteId/:ferramentaId", async (req, res) => {
  const { clienteId, ferramentaId } = req.params;

  try {
    const favorito = await prisma.favorito.findFirst({
      where: {
        clienteId: clienteId,
        ferramentaId: Number(ferramentaId),
      }
    });

    if (favorito) {
      res.status(200).json({ message: "Favorito já existe", favorito });
    } else {
      res.status(404).json({ message: "Favorito não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post("/", async (req, res) => {
  const { clienteId, ferramentaId } = req.body;

  if (!clienteId || !ferramentaId) {
    res.status(400).json({ erro: "Informe clienteId, ferramentaId e descricao" });
    return;
  }

  try {
    const favorito = await prisma.favorito.create({
      data: {
        cliente: {
          connect: { id: clienteId }
        },
        ferramenta: {
          connect: { id: ferramentaId }
        }

      }
    });

    res.status(201).json(favorito);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { clienteId } = req.body; // Obtenha o clienteId do corpo da requisição

  try {
    // Verifique se o favorito pertence ao cliente
    const favorito = await prisma.favorito.findFirst({
      where: {
        id: Number(id),
        clienteId: clienteId, // Verifique se o clienteId corresponde
      }
    });

    // if (!favorito) {
    //   return res.status(404).json({ error: 'Favorito não encontrado ou não pertence ao cliente.' });
    // }

    // Exclua o favorito
    const favoritoExcluido = await prisma.favorito.delete({
      where: { id: Number(id) }
    });

    res.status(200).json(favoritoExcluido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir o favorito', details: error });
  }
});


export default router;