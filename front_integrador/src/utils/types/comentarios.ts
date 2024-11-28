import { Ferramenta } from "./ferramentas"
import { ClienteI } from "./clientes";

export interface Comentario {
  id:             number
  totalAvaliacao: number
  estrelas:       number
  comentario:     String
  ferramentaId:  Ferramenta
  clienteId:      ClienteI
}