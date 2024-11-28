import { Ferramenta } from "@/utils/types/ferramentas"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Inputs = {
  termo: string
}

type InputPesquisaProps = {
  setFerramentas: React.Dispatch<React.SetStateAction<Ferramenta[]>>
}

export function InputPesquisa({ setFerramentas }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>()

  async function enviaPesquisa(data: Inputs) {
    //    alert(data.termo)
    if (data.termo.length < 2) {
      toast.warning("Digite, no mínimo, 2 caracteres para pesquisa")
      return
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas/pesquisa/${data.termo}`)
    const dados = await response.json()
    if (dados.length == 0) {
      toast.error("Não há veículos com o termo pesquisado")
      reset({termo:""})
      return
    }
    setFerramentas(dados)
  }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ferramentas`)
    const dados = await response.json()
    setFerramentas(dados)
    reset({termo: ""})
  }

  return (
    <section className="flex max-w-5xl mx-auto mt-3">

      <form className="flex-1"
        onSubmit={handleSubmit(enviaPesquisa)}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Qual veículo você procura? (modelo, marca, ano ou preço máximo)"
            required
            {...register("termo")} />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-500 focus:shadow-md focus:shadow-orange-500 font-medium rounded-lg text-sm px-4 py-2 ">
            Buscar
          </button>
        </div>
      </form>

      <button type="button" className="ms-3 mt-2 focus:outline-none text-white bg-orange-500 hover:bg-orange-500 focus:shadow-md focus:shadow-orange-500 font-medium rounded-xl text-sm px-5 py-2.5 mb-2 "
        onClick={mostraDestaques}>
        Veículos em Destaque
      </button>

    </section>
  )
}