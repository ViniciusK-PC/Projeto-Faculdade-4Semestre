import { Ferramenta } from "./ferramentas"
import { ClienteI } from "./clientes";


export interface ComentarioI {
  resposta: string;
  id: number;
  totalAvaliacao: number;
  estrelas: number;
  comentario: string; // Note que "String" deve ser "string"
  ferramentaId: number;
  clienteId: number;
  ferramenta: Ferramenta;
  cliente: number;
  descricao: number;
}