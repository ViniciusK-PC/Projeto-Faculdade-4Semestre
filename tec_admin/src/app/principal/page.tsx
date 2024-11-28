'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface ferramentaFabricanteI {
  
  fabricante: string
  num: number
}

interface geralDadosI {
  clientes: number
  ferramentas: number
  avaliacoes: number
}

type DataRow = [string, number, string]

export default function Principal() {
  const [ferramentaFabricante, setFerramentaFabricante] = useState<ferramentaFabricanteI[]>([])
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dashboard/gerais")
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGrafico() {
      const response = await fetch("http://localhost:3004/dashboard/ferramentasFabricantes")
      const dados = await response.json()
      setFerramentaFabricante(dados)
    }
    getDadosGrafico()
  }, [])

  const data: (["Fabricante", "NºFerramenta", { role: string }] | DataRow)[] = [
    ["Fabricante", "NºFerramenta", { role: "style" }],
  ];
  
  const cores = ["red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered"]
  
  ferramentaFabricante.forEach((ferramenta, index) => {
    data.push([ferramenta.fabricante, ferramenta.num, cores[index%10]])
  })

  return (
    <div className="container">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.ferramentas}</span>
          <p className="font-bold mt-2 center">Nº Ferramentas</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.avaliacoes}</span>
          <p className="font-bold mt-2 text-center">Nº Avaliaçoes</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">Gráfico: Nº de Ferramentas por Marca</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data}/>

    </div>
  )
}