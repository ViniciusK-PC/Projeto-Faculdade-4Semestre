import { Ferramenta } from "@/utils/types/ferramentas";
import Link from "next/link";


export function ItemFerramentas({ ferramenta }: { ferramenta: Ferramenta }) {
  console.log(ferramenta);
  
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow 
    ">

      <Link href={`/detalhes/${ferramenta.id}`}>
        <img className="rounded-t-lg w-full"
          src={ferramenta.foto}
          alt={`Imagem do ${ferramenta.modelo}`} />
      </Link>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900
         ">
          {ferramenta.fabricante.nome} {ferramenta.modelo}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          Ano: {ferramenta.ano} - {ferramenta.quantidadeEmEstoque} Estoque
        </p>
        <p className="mb-3 font-bold ">
          R$ {Number(ferramenta.preco).toLocaleString("pt-br",
            { minimumFractionDigits: 2 }
          )}
        </p>
        <p className="mb-3 text-sm text-gray-700 truncate">
          {ferramenta.acessorios}
        </p>
        <Link href={`/detalhes/${ferramenta.id}`} 
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-orange-500 rounded-lg hover:bg-orange-400 focus:ring-4 
         focus:outline-none
          focus:ring-blue-300">
          Ver Detalhes
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
