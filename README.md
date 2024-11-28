# Trabalho-II
Trabalho de linguagens emergentes 



# add Fabricante
http://localhost:3004/fabricante
{
  "nome":"nomedoFabricante"   
  
}


# add Ferramentas
http://localhost:3004/ferramentas
{
    "modelo":"dfs343", 
        "ano": 2023, 
        "preco": 300, 
        "tipo": "APROVADA", 
        "quantidadeEmEstoque": 30, 
        "foto": "https://img.lojadomecanico.com.br/IMAGENS/21/221/19017/1653584804013.JPG?ims=100x100/filters:quality(50)", 
        "acessorios":"Furadeira de impacto com mandril 1/2 que oferece maior capacidade de trabalho e melhor retenção da broca", 
        "fabricanteId":2   
  
}

# .env
DATABASE_URL="mysql://root:84471814@localhost:3306/texttp"

# .env.local
NEXT_PUBLIC_URL_API="http://localhost:3004"


# Iniciar o Docker compose {não esta funcioando a Migração de tabelas em api}
docker-compose up --build

-# remove a build 
docker-compose down
