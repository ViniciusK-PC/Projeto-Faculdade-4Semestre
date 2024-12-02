'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { FerramentaI } from "@/utils/types/ferramentas"


interface listaFerramentaProps {
  ferramenta: FerramentaI,
  ferramentas: FerramentaI[],
  setFerramentas: Dispatch<SetStateAction<FerramentaI[]>>
}

function ItemFerramenta({ ferramenta, ferramentas, setFerramentas }: listaFerramentaProps) {

  async function excluirFerramenta() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${ferramenta.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const ferramentas2 = ferramentas.filter(x => x.id != ferramenta.id)
        setFerramentas(ferramentas2)
        alert("Carro excluído com sucesso")
      } else {
        alert("Erro... Carro não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/comentario/${ferramenta.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const ferramentas2 = ferramentas.map(x => {
        if (x.id == ferramenta.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setFerramentas(ferramentas2)
    }
  }

  return (
    <tr key={ferramenta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={ferramenta.foto} alt="Capa do Carro"
          style={{width: 200}} />
      </th>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {ferramenta.modelo}
      </td>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {ferramenta.marca.nome}
      </td>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {ferramenta.ano}
      </td>
      <td className={`px-6 py-4 ${ferramenta.destaque ? "font-extrabold" : ""}`}>
        {Number(ferramenta.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirFerramenta} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemFerramenta