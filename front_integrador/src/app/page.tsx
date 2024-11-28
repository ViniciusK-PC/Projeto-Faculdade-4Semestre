
'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemFerramentas } from "@/components/ItemFerramentas"; // Alterado para ItemFerramentas
import { Ferramenta } from "@/utils/types/ferramentas"; // Alterado para FerramentaI
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([]) // Alterado para ferramentas
  const { logaCliente } = useClienteStore()

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas`) // Alterado para ferramentas
      const dados = await response.json()
      setFerramentas(dados)
    }
    buscaDados()
  }, [])

  const listaFerramentas = ferramentas.map(ferramenta => (
    <ItemFerramentas ferramenta ={ferramenta} key={ferramenta.id} /> // Alterado para ferramentas
  ))

  return (
    <main>
      <InputPesquisa setFerramentas={setFerramentas} /> {/* Alterado para ferramentas */}

      <section className="max-w-screen-xl mx-auto">
        <h1 className="mb-5 mt-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl ">Ferramentas <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span></h1> {/* Alterado para Ferramentas */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaFerramentas} {/* Alterado para ferramentas */}
        </div>

      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
