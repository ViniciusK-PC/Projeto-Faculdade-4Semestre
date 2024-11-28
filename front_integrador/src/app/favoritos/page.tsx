"use client"
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { Favorito } from "@/utils/types/favoritos";
import { Ferramenta } from '@/utils/types/ferramentas';
import { toast } from 'sonner'
export default function favoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]); // exemplo de uso do useState para array
  //const [ferramenta2, setFerramenta] = useState<Ferramenta[]>([]); // exemplo de uso do useState para array

  const { cliente } = useClienteStore()
  const { logaCliente } = useClienteStore()

  useEffect(() => {
    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
      }
    }
    // async function buscaFerramenta() {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/${params.ferramenta_id}`) 
    //   const dados = await response.json()
    //   setFerramenta(dados)
    // }
    // buscaFerramenta()
    async function buscaDados(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favoritos/${idCliente}`)
      const dados = await response.json()
      console.log("Dados retornados:", dados);

      setFavoritos(dados)
    }
   
    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
      buscaDados(idClienteLocal)
    }
  }, [])
  async function apagaFavorito(favoritoId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/favoritos/${favoritoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
  
    if (response.status === 200) {
      const dados = await response.json();
      setFavoritos((prevFavoritos) => prevFavoritos.filter((fav) => fav.id !== favoritoId));
      toast.success("Favorito excluído")
      console.log("Favorito excluído:", dados);
    } else {
      console.error("Erro ao excluir favorito:", await response.json());
    }
  }
  


  //Link href /detalhes/{ferramenta.id}
  const favoritoLista = favoritos.map(favoritos => (
    <div key={favoritos.id} className='flex mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100' >
      <a href={`/detalhes/${favoritos.ferramenta.id}`} className="flex w-full items-center  ">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={favoritos.ferramenta.foto} alt="" />
        <div className="flex flex-col w-80 justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{favoritos.ferramenta.fabricante.nome}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">R$ {favoritos.ferramenta.preco}</p>
          <button type="submit" className="w-full mt-10 text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Adicionar ao carrinho </button>
        </div>
      </a>
        <div className='flex items-start '>
        <svg className="hover:scale-110 active:bg-red-700" 
        width="25" height="25" viewBox="0 0 25 25" 
        fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={() => apagaFavorito(favoritos.id)}>
          <path d="M5.52832 5.79532L19.5283 19.7953M5.52832 19.7953L19.5283 5.79532" 
          stroke="orange" stroke-width="2" 
          stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>

    </div>
  ))

  return (
    <section className="max-w-7xl mx-auto ">
      <h1 className="mb-6 mt-4 flex justify-starttext-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Favoritos</span>
      </h1>
      <div className='flex flex-col items-center'>
        {favoritoLista}

      </div>

    </section>
  )
}
