"use client"
import { Ferramenta } from "@/utils/types/ferramentas";
import { Comentario } from "@/utils/types/comentarios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

type Inputs = {
  estrelas: number
  comentario: string
}
//const params = useParams()



export default function Comentarios() {
  const params = useParams()
  const { cliente } = useClienteStore()

  const [ferramenta, setFerramenta] = useState<Ferramenta>()
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const [caixaDeComentarios, setcaxaDeComentarios] = useState(false)

  const [avaliacao, setAvaliacao] = useState(0)
  const [estrela, setEstrela] = useState(Array(5).fill(false))

  const mouseEstrelaCheia = (index: number) => {
    const novaEstrela = Array(5).fill(false)
    for (let i = 0; i <= index; i++) {
      novaEstrela[i] = true
    }
    setEstrela(novaEstrela)
  }
  const mouseEstrelaVazia = () => {
    const novaEstrela = Array(5).fill(false)
    for (let i = 0; i < avaliacao; i++) {
      novaEstrela[i] = true
    }
    setEstrela(novaEstrela)
  }
  const selecionarEstrela = (index: number) => {
    setAvaliacao(index + 1)
    const novaEstrela = Array(5).fill(false)
    for (let i = 0; i <= index; i++) {
      novaEstrela[i] = true
    }
    setEstrela(novaEstrela)

  }

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${params.ferramenta_id}`) // Alterado para ferramentas
      const dados = await response.json()
      setFerramenta(dados)
    }
    buscaDados()
    console.log(ferramenta);



  }, [params.ferramenta_id])




  async function enviaAvaliacao(data: Inputs) {
    console.log({
      clienteId: cliente.id,
      ferramentaId: Number(params.ferramenta_id),
      estrelas: data.estrelas,
      comentario: data.comentario,  // Alterado para 'comentario'
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacao`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        ferramentaId: Number(params.ferramenta_id),
        estrelas: avaliacao, // Enviando o valor correto de estrelas
        comentario: data.comentario,
      })
    })
    console.log("Status da resposta:", response.status);
    const responseData = await response.json();
    console.log("Dados da resposta:", responseData);

    if (response.status === 201) {
      toast.success("Sua Avaliação foi enviada! Agradecemos por avaliar nossos produtos. ")
      setcaxaDeComentarios(true)
      reset()
    } else {
      toast.error("Erro... Não foi possível enviar sua Avaliação")
    }
  }

  return (
    <>
      <div className="mr-4 ml-4">
        {caixaDeComentarios ? (
          <div className="border w-full h-[10rem] flex justify-center place-items-center bg-green-200 ">
            <img src="/marca-de-verificacao.png" alt="checkbox" className="w-10" />
            <h3 className="  text-xl font-bold tracking-tight text-gray-900">
              Obrigado pela sua avaliação!
            </h3>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
              Deixe seu comentario!
            </h3> {/* Alterado */}
            <form onSubmit={handleSubmit(enviaAvaliacao)}>
              <div className="flex mt-2">
                {estrela.map((estrelaCheia, index) => (

                  <img
                    key={index}
                    src={estrelaCheia ? "/estrelaCheia.png" : "/estrelaVazia.png"}
                    alt="estrela" className="w-5"
                    onMouseEnter={() => mouseEstrelaCheia(index)}
                    onMouseLeave={() => mouseEstrelaVazia()}
                    onClick={() => selecionarEstrela(index)} />

                ))}

              </div>
              <label htmlFor="number">Você avaliou: {avaliacao} estrela(s)</label>
              <input type="hidden" value={avaliacao} {...register("estrelas")} /> {/* Registra o valor da avaliação */}
              {/* <p className="mt-2">Você avaliou: {avaliacao} estrela(s)</p> */}
              <h3 className="mb-2 mt-4 bg-gray-100 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed " value={`${cliente.nome} (${cliente.email})`} disabled readOnly >{cliente.nome}</h3>
              <textarea
                id="message"
                className="mb-2 block p-2.5 w-full text-sm text-gray-900 
                bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                 focus:border-blue-500 "
                placeholder="Descreva seu comentario"
                required
                {...register("comentario")}>

              </textarea>
              <button type="submit"
                className="text-white bg-blue-700
                 hover:bg-blue-800 focus:ring-4 focus:outline-none
                  focus:ring-blue-300 
                 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Enviar Avaliação
              </button>
            </form>
          </>
        )}
      </div>

    </>
  )

} 