"use client"
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore()
  const router = useRouter()

  function sairCliente() {
    deslogaCliente()
    // remove de localStorage o id do cliente logado (se ele indicou salvar no login)
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key")
    }
    router.push("/login")
  }

  return (
    <nav className="bg-slate-50 border-gray-200 mb-15">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../logo.png" className="h-16" alt="logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap ">
            E-Ferramenentas
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {cliente.id ?
            <>
              <span className="text-black">
                {cliente.nome}
              </span>
              <Link href="/favoritos" className="font-bold flex text-orange-600  hover:underline">
                Favoritos 
                <img src="/gostar.png" alt="favoritos" className="w-6 h-6 ml-1" />
              </Link>
              <span className="cursor-pointer font-bold text-blue-600 hover:underline"
                onClick={sairCliente}>
                Sair
              </span>
            </>
            :
            <>
              <Link href="/login" className="font-bold text-blue-600  hover:underline">
                Entrar
              </Link>
            </>
          }
        </div>
      </div>
    </nav>
  )
}