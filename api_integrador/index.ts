import express from 'express'
import cors from 'cors'

import fabricantesRoutes from './routes/fabricante'
import ferramentasRoutes from './routes/ferramentas'
import fotosRoutes from './routes/fotos'
import clientesRoutes from './routes/clientes'
import avaliacaoRoutes from './routes/avaliacao'
import recuperaSenhaRoutes from './routes/recupera'
import adminsRoutes from './routes/admins'
import favoritoRoutes from './routes/favoritos'
import dashboardRoutes from './routes/dashboard'

const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/fabricante", fabricantesRoutes)
app.use("/ferramentas", ferramentasRoutes)
app.use("/fotos", fotosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/avaliacao", avaliacaoRoutes)
app.use("/favoritos", favoritoRoutes)
app.use("/admins", adminsRoutes)
app.use("/recupera", recuperaSenhaRoutes)
app.use("/dashboard", dashboardRoutes)



app.get('/', (req, res) => {
  res.send('API: Sistema de Controle de Ferramentas')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})