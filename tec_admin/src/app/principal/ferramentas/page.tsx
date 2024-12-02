'use client'
import { useEffect, useState } from "react"
import { ComentarioI } from "@/utils/types/comentarios"
import ItemComentario from "@/components/ItemComentario"

function ControleComentarios() {
  const [comentarios, setComentarios] = useState<ComentarioI[]>([])

  useEffect(() => {
    async function getComentarios() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas`)
      
      const dados = await response.json()
      setComentarios(dados)
    }
    getComentarios()
  }, [])

  const listaComentarios = comentarios.map(comentario => (
    <ItemComentario key={comentario.id} comentario={comentario} comentarios={comentarios} setComentarios={setComentarios} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Avaliações
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Veículo
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Proposta do Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Resposta da Revenda
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaComentarios}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControleComentarios