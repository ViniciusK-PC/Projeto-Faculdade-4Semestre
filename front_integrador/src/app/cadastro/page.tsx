"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/context/cliente"
import { useState } from "react"

type Inputs = {
    nome: string
    email: string
    senha: string
}

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [alteraOlho, setAlteraOlho] = useState("olho.png")
    const router = useRouter()

    const alteraVisivilidade = () => {
        setMostrarSenha(!mostrarSenha)
        setAlteraOlho(alteraOlho === "olho.png"? "olhoAberto.png" : "olho.png")
    }   
    

    async function cadastro(data: Inputs) {
        // console.log(data)
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ nome: data.nome, email: data.email, senha: data.senha })
        })
            console.log(response)
        if (response.status == 201) {
            const dados = await response.json()
            alert(`Parabens ${ dados.nome} Seu cadastro foi concluido `)
            router.push('/')

            
        } else {
            alert("Erro... Nome, email ou Senha incorretos")
        }
    }

    return (
        <section className="bg-slate-50 
    bg-[url('https://img.freepik.com/fotos-gratis/instrumentos-de-carpintaria-em-fundo-branco_23-2148180561.jpg?t=st=1729607648~exp=1729611248~hmac=95eed6df158edf0872bac106fb1c8269d052ce776142fb8b647bf369d8bcc894&w=996')] ">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow  md:mt-20 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Preencha o cadastro
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(cadastro)}>
                            <div>
                                <label htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Nome:
                                </label>
                                <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com"
                                    required
                                    {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 ">
                                    E-mail
                                </label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com"
                                    required
                                    {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Senha:
                                </label>
                                <div className="flex relative justify-end ">
                                    <img src={alteraOlho} alt="olho_senha"  
                                    className=" w-8 absolute mr-2 mt-2  focus:ring-4 focus:outline-none focus:ring-primary-300 "
                                    onClick={alteraVisivilidade}
                                    />

                                <input type="password" id="password"
                                    type={mostrarSenha ? "text" : "password"}
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300
                                 text-gray-900 rounded-lg focus:ring-primary-600 
                                 focus:border-primary-600 block w-full p-2.5 "
                                 
                                    required
                                    {...register("senha")} />
                                    </div>
                            </div>

                            <button type="submit" className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Cadastrar</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}