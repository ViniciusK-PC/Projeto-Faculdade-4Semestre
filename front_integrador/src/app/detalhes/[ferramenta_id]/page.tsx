// "use client"
// import { CarroI } from "@/utils/types/ferramentas";
// import { FotoI } from "@/utils/types/fotos";
// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react";
// import { useClienteStore } from "@/context/cliente";
// import { useForm } from "react-hook-form"
// import { toast } from 'sonner'

// type Inputs = {
//   descricao: string
// }

// export default function Detalhes() {
//   const params = useParams()
//   const { cliente } = useClienteStore()

//   const [carro, setCarro] = useState<CarroI>()
//   const [fotos, setFotos] = useState<FotoI[]>([])

//   const { register, handleSubmit, reset } = useForm<Inputs>()

//   useEffect(() => {
//     async function buscaDados() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/carros/${params.carro_id}`)
//       const dados = await response.json()
//       // console.log(dados)
//       setCarro(dados)
//     }
//     buscaDados()

//     async function buscaFotos() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.carro_id}`)
//       const dados = await response.json()
//       setFotos(dados)
//     }
//     buscaFotos()
//   }, [])

//   const listaFotos = fotos.map(foto => (
//     <div>
//       <img className="h-auto max-w-80 rounded-lg"
//         src={`data:image/jpg;base64, ${foto.codigoFoto}`}
//         alt={foto.descricao}
//         title={foto.descricao} />
//     </div>
//   ))

//   async function enviaProposta(data: Inputs) {

//     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas`, {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       method: "POST",
//       body: JSON.stringify({
//         clienteId: cliente.id,
//         carroId: Number(params.carro_id),
//         descricao: data.descricao
//       })
//     })

//     if (response.status == 201) {
//       toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
//       reset()
//     } else {
//       toast.error("Erro... Não foi possível enviar sua proposta")
//     }
//   }

//   return (
//     <>
//       <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//         <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
//           src={carro?.foto} alt="Foto do Carro" />
//         <div className="flex flex-col justify-between p-4 leading-normal">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {carro?.marca.nome} {carro?.modelo}
//           </h5>
//           <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
//             Ano: {carro?.ano} - {carro?.km.toLocaleString("pt-br")} km
//           </h5>
//           <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
//             Preço R$: {Number(carro?.preco)
//               .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
//           </h5>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//             {carro?.acessorios}
//           </p>

//           {cliente.id ?
//             <>
//               <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Gostou deste Veículo? Faça uma Proposta!</h3>
//               <form onSubmit={handleSubmit(enviaProposta)}>
//                 <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
//                 <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
//                   placeholder="Descreva a sua proposta" 
//                   required
//                   {...register("descricao")}></textarea>
//                 <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Proposta</button>
//               </form>
//             </>
//             :
//             <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">** Faça login para fazer proposta para este veículo</h3>
//           }

//         </div>
//       </section>

//       <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
//         {listaFotos}
//       </div>

//     </>
//   )
// }

"use client"
import { useParams } from "next/navigation"

import { Ferramenta } from "@/utils/types/ferramentas"; // Alterado para FerramentaI
import { FotoI } from "@/utils/types/fotos";

import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";

import { useForm } from "react-hook-form"
import { toast } from 'sonner'

import { Comentario } from "@/utils/types/comentarios";
import Comentarios from "./comentarios";
import { Estatisticas } from "@/utils/types/estatisticas";


export default function Detalhes() {
  const params = useParams()
  const { cliente } = useClienteStore()
  const { logaCliente } = useClienteStore()

  const [ferramenta, setFerramenta] = useState<Ferramenta>() // Alterado para ferramenta
  const [fotos, setFotos] = useState<FotoI[]>([])
  //const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([])
  const [avaliacao, setAvaliacao] = useState<Comentario[]>([])
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({});
  
  const [ favoritoAdd, setFavoritoAdd] = useState("/gosteiVazio.png")
  const [jaFavorito, setjaFavorito] = useState(false);

  
  //const { register, handleSubmit, reset } = useForm<Inputs>()

  useEffect(() => {
    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    }
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${params.ferramenta_id}`) 
      const dados = await response.json()
      setFerramenta(dados)
    }
    buscaDados()
    console.log(ferramenta);


    async function buscaFotos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.ferramenta_id}`) 
      const dados = await response.json()

      setFotos(dados)
    }
    buscaFotos()
    console.log(fotos);

    async function buscaAvaliacao() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacao/${params.ferramenta_id}`) 
      const { avaliacoes, estatisticas } = await response.json()

      setAvaliacao(avaliacoes)
      setEstatisticas(estatisticas)

    }
    buscaAvaliacao()

    // async function verificaFavorito(idCliente: string) {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favoritos/${idCliente}/${params.ferramenta_id}`);
    //   if (response.status === 200) {
        
    //     setjaFavorito(true);
    //   }
    //   else (cliente.id) {
    //     verificaFavorito(false);
    // }
    // }
  }, [cliente.id, params.ferramenta_id]);
  
  async function salvaFavorito() {
  
    setFavoritoAdd(favoritoAdd === "/gosteiVazio.png" ? "/gostarCheio.png" : "/gostarCheio.png")
      
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favoritos`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        ferramentaId: Number(params.ferramenta_id),
        
      })
    })
    

      if (response.status === 201) {
      toast.success(`Adicionado aos favoritos`);
      setjaFavorito(true);
      setFavoritoAdd("/gostarCheck.png");
    } 
   else {
    toast("Essa ferramenta já está nos seus favoritos!");
  }
}

  const listaFotos = fotos.map((foto) => (
    <div key={foto.id}>
      <img className="h-auto max-w-80 rounded-lg"
        src={`data:image/jpg;base64, ${foto.codigoFoto}`}
        alt={foto.descricao}
        title={foto.descricao} />
    </div>
  ));
  const listaAvaliacao = avaliacao.map((avaliacao) => (
    <div key={avaliacao.id} >

      <div className="p-5 mt-6 mx-auto border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl">

        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 ">
            <li className="py-3 sm:py-4">
              <div className="flex items-center mt-1 mb-5">
                <div className="flex-shrink-0">
                  <img className="w-8 h-8 rounded-full" src="/avatar-do-usuario.png" alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate ">
                    {avaliacao.cliente.nome}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {avaliacao.cliente.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <p>{[...Array(avaliacao.estrelas)].map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                  </p>
                </div>
              </div>
              <p className="font-medium ml-16 mr-16">{avaliacao.comentario}</p>
            </li>

          </ul>
        </div>
      </div>



    </div>
  ));





  return (
    <>
      <section >
        <div className=" 
        mt-6 mx-auto border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl ">
         <div>
          <div className="absolute w-10 p-1 ml-4 mt-4 hover:w-11 
          focus:ring-4 focus:outline-none focus:ring-primary-300
          bg-opacity-50 bg-orange-300  rounded-full">

          <img src={favoritoAdd} alt="favoritar" 
           onClick={salvaFavorito}
           className="w-10"/>

          </div>
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
            src={ferramenta?.foto}
            alt="Foto da Ferramenta"
          /> 
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">

            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {ferramenta?.fabricante.nome} {ferramenta?.modelo}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 ">
                Ano: {ferramenta?.ano} - {ferramenta?.quantidadeEmEstoque} Estoque
              </h5><hr />
            </div>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">

                {estatisticas._avg && estatisticas._avg.estrelas ? (
                  [...Array(Math.round(estatisticas._avg.estrelas))].map((_, index) => (
                    <span key={index}>⭐</span>
                  ))
                ) : (
                  <span>Sem avaliação</span> // Ou qualquer outra mensagem padrão
                )}

              </div>
              <span
                className="bg-blue-100 text-blue-800 text-xs 
              font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200
               dark:text-blue-800 ms-3">
                {estatisticas && estatisticas._avg ? Math.round(estatisticas._avg.estrelas) : 0}
              </span>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-3">
                    {estatisticas && estatisticas._count ? estatisticas._count.id : 0} avaliações
                  </p>
            </div>
            <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 ">
              Preço R$: {Number(ferramenta?.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {ferramenta?.acessorios}
            </p>
            <button type="submit" className="w-full text-white bg-orange-600
             hover:bg-primary-700 
             focus:ring-4 focus:outline-none focus:ring-primary-300 
             font-medium rounded-lg 
             text-sm px-5 py-2.5 text-center dark:bg-primary-600 
             dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Comprar</button>
          </div>
          <div>


          </div>
        </div>
      </section>



      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>
      <div className="flex flex-col md:max-w-5xl mx-auto mt-4 ">
        {cliente.id ? (
          <Comentarios />

        ) : (

          <a href="/login" className="text-xl font-bold tracking-tight text-orange-700 ml-2 mr-2">
            ** Faça login para deixar um comentario</a>
        )
        }
        <div className=" border p-3 mt-10 w-full">
        <div className="mb-1 ">
          <h5
            className="text-xl font-bold 
             text-gray-900 ">Comentários</h5>

        </div>
        {listaAvaliacao}
        </div>
      </div>

    </>
  )
}
