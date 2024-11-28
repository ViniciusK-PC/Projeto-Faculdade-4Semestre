"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/context/cliente"
import Link from "next/link"
import { useState } from "react"
type Inputs = {
  email: string
  senha: string
  manter: boolean
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>()
  const { logaCliente } = useClienteStore()

  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [alteraOlho, setAlteraOlho] = useState("olho.png")
  const router = useRouter()
  const alteraVisivilidade = () => {
    setMostrarSenha(!mostrarSenha)
    setAlteraOlho(alteraOlho === "olho.png"? "olhoAberto.png" : "olho.png")
}  

  async function verificaLogin(data: Inputs) {
    // console.log(data)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: data.email, senha: data.senha })  
    })
//    console.log(response)
    if (response.status == 200) {
      const dados = await response.json()
      // console.log(dados)
//      alert("Olá " + dados.nome)

      // "coloca" os dados do cliente no contexto 
      logaCliente(dados)

      // se indicou que quer manter conectado, vamos salvar o id em localStorage
      if (data.manter) {
        localStorage.setItem("client_key", dados.id)
      } else {
        if (localStorage.getItem("client_key")) {
          localStorage.removeItem("client_key")
        }
      }     

      router.push("/")
    } else {
      alert("Erro... Login ou Senha incorretos")
    }
  }

  return (
    <section className="bg-slate-50 
    bg-[url('https://img.freepik.com/fotos-gratis/instrumentos-de-carpintaria-em-fundo-branco_23-2148180561.jpg?t=st=1729607648~exp=1729611248~hmac=95eed6df158edf0872bac106fb1c8269d052ce776142fb8b647bf369d8bcc894&w=996')] ">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-20 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Informe seus Dados de Acesso
            </h1>
            <form className="space-y-4 md:space-y-6" 
              onSubmit={handleSubmit(verificaLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">E-mail do Cliente:</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" 
                  required 
                  {...register("email")} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha de Acesso:</label>
                <div className="flex relative justify-end ">
                                    <img src={alteraOlho} alt="olho_senha"  
                                    className=" w-8 absolute mr-2 mt-2  focus:ring-4 focus:outline-none focus:ring-primary-300 "
                                    onClick={alteraVisivilidade}
                                    />
                <input type={mostrarSenha ? "text" : "password"}
                 id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                required 
                {...register("senha")} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " 
                    {...register("manter")} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Manter Conectado
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-blue-500 dark:text-primary-500">Esqueceu sua senha?</a>
              </div>
              <button type="submit" className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Entrar</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Você não está cadastrado? 
                <Link href="./cadastro" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Cadastre-se</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}