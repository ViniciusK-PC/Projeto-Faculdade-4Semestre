import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express"; // Importando Request e Response
import bcrypt from 'bcrypt';
//import nodemailer from "nodemailer";
import axios from 'axios';
//import test from "node:test";
const prisma = new PrismaClient();
const router = Router();


const key = "5beb740ef4043358fb868f34f626d7da371ea72f"
// Definição da interface para o corpo da requisição
interface RecuperaSenhaRequest extends Request {
    body: {
        email: string;
        token?: string;
        novaSenha?: string;
    };
}

// Função para gerar o token de recuperação
function geraResetToken() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
}

// Função para enviar o e-mail com o token
async function enviaEmail(nome: string, email: string, token: string) {
    const apikey = '5beb740ef4043358fb868f34f626d7da371ea72f'
    const url =  'https://api.sparkpost.com/api/v1/transmissions'

    const data = {
        option: {
            sandbox: true
        },
        content: {
            from:  `test@sparkpostbox.com`,
            subject: 'Redefinição de senha',
            text: `token para redefinir senha ${token}`
    },
    recipients: [
        {address:`${email}`}

    ]
    }
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${apikey}`,
                'Content-Type': 'application/json'
            }
        })
        console.log('email sent', response.data)
    }catch (error: any){
        console.error('error ao enviar email', error.response.data);
        
    }



//sparkpost
//sandgrid
//goolgeClud
//brevo
//
//     const transporter = nodemailer.createTransport({
//         host: "smtp-relay.brevo.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "7e9d0b001@smtp-brevo.com",
//             pass: "SCEAKaqgdTtknRL8"
//         }
//     });

//     const info = await transporter.sendMail({
//         from: 'matheusduarte2222@outlook.com', // Endereço do remetente
//         to: email, // Destinatário
//         subject: "Recuperação de senha", // Assunto
//         html: `<h1>E-Ferramentas</h1>
//                 <h3>Token: ${token}</h3>`
//     });

//     console.log("Message sent: %s", info.messageId);
 }

// Função para recuperar a senha e enviar token por e-mail
async function recuperaSenha(req: RecuperaSenhaRequest, res: Response) {
    const { email } = req.body;

    try {
        const cliente = await prisma.cliente.findUnique({
            where: { email },
        });

        if (!cliente) {
            return res.status(400).json({ error: "Este email não consta nos nossos registros" });
        }

        const token = geraResetToken();
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(token, salt);

        // Armazenar o hash do token no banco de dados em um campo específico
        await prisma.cliente.update({
            where: { email },
            data: { novaSenha: hash }, // Certifique-se de ter um campo resetToken
        });

        await enviaEmail(cliente.nome, email, token);
        res.status(200).json({ message: "Token enviado para o e-mail informado." });

    } catch (error) {
        console.error("Erro ao tentar recuperar senha:", error)
        res.status(500).json({ error: "Erro ao tentar recuperar senha." });
    }
}

// Rota para solicitar recuperação de senha
router.post("/", async (req: RecuperaSenhaRequest, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "E-mail inválido." });
    }

    await recuperaSenha(req, res);
});

// Rota para redefinir a senha
router.post("/resetarSenha", async (req: RecuperaSenhaRequest, res: Response) => {
    const { email, token, novaSenha } = req.body;

    if (!email || !token || !novaSenha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const cliente = await prisma.cliente.findUnique({
            where: { email },
        });

        if (!cliente || !cliente.novaSenha) {
            return res.status(400).json({ error: "E-mail ou token inválido." });
        }

        // Verifica o token
        const tokenValido = bcrypt.compareSync(token, cliente.novaSenha);

        if (!tokenValido) {
            return res.status(401).json({ error: "Token inválido." });
        }

        // Atualiza a senha do cliente
        const salt = bcrypt.genSaltSync(12);
        const novaSenhaHash = bcrypt.hashSync(novaSenha, salt);

        await prisma.cliente.update({
            where: { email },
            data: { senha: novaSenhaHash, novaSenha: null }, // Remove o token após a redefinição
        });

        res.status(200).json({ message: "Senha redefinida com sucesso." });

    } catch (error) {
        console.error("Erro ao tentar recuperar senha:", error)
        res.status(500).json({ error: "Erro ao tentar redefinir a senha." });
    }
});

export default router;
