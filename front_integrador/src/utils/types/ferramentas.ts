import { FabricanteI } from "./fabricante"

export interface Ferramenta {
  id: number
  modelo: string
  ano: number
  preco: number
  quantidadeEmEstoque: number
  destaque: boolean
  foto: string
  acessorios: string
  createdAt: Date
  updatedAt: Date
  tipo: string
  fabricante: FabricanteI
  fabricanteId: number
}


