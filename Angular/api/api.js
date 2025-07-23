const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'sua-chave-secreta-muito-segura';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// BANCO DE DADOS SIMULADO
const db = {
    // --- Dados de Usuários com a propriedade "role" ---
    usuarios: [
        {
            id: 1,
            nome: "Admin User",
            email: "admin@email.com",
            senha: "123456",
            role: "admin"
        },
        {
            id: 2,
            nome: "Cliente Teste",
            email: "cliente@email.com",
            senha: "senha",
            role: "cliente"
        }
    ],
    pelucias: [
        {
            id: 101, sku: "PL-WPR-01", nome: 'Pelúcia Wooper', regiao: 'johto', preco: 200.00, precoAntigo: 250.00,
            imagem: 'img/wopper-plush.jpg', estoque: 15, emEstoque: true, emDestaque: true, categoria: "Pelúcia",
            descricaoCurta: "Uma pelúcia muito fofa do Wooper, perfeita para fãs de Johto.",
            descricaoLonga: "Feita com material antialérgico de alta qualidade, esta pelúcia oficial do Wooper mede 20cm de altura e captura todos os detalhes adoráveis do Pokémon. Ideal para colecionadores e fãs da segunda geração.",
            tags: ['água', 'terra', 'johto', 'fofo'],
            avaliacoes: [
                { usuario: "Misty A.", nota: 5, comentario: "Chegou super rápido, é muito macio!" },
                { usuario: "Brock S.", nota: 4, comentario: "Gostei muito, só achei um pouco menor do que esperava." }
            ]
        },
        {
            id: 102,
            sku: "PL-PIKA-01",
            nome: 'Pelúcia Pikachu Clássico',
            regiao: 'kanto',
            preco: 270.00,
            imagem: 'img/pikachu-plush.jpg',
            estoque: 30,
            emEstoque: true,
            emDestaque: true,
            categoria: "Pelúcia",
            descricaoCurta: "A pelúcia clássica do mascote de Pokémon, um item essencial para qualquer coleção.",
            descricaoLonga: "Esta pelúcia de 25cm do Pikachu captura perfeitamente o design original da primeira geração. Feita com veludo de alta durabilidade, é perfeita para presentear ou para decorar seu espaço.",
            tags: ['elétrico', 'kanto', 'clássico', 'mascote'],
            avaliacoes: [
                { usuario: "Ash K.", nota: 5, comentario: "Meu melhor amigo! Qualidade impecável." }
            ]
        },
        {
            id: 103,
            sku: "PL-MIMIK-01",
            nome: 'Pelúcia Mimikyu',
            regiao: 'alola',
            preco: 260.00,
            imagem: 'img/mimikyu-plush.jpg',
            estoque: 12,
            emEstoque: true,
            emDestaque: false,
            categoria: "Pelúcia",
            descricaoCurta: "Não se deixe enganar pela aparência, esta pelúcia do Mimikyu é adorável e misteriosa.",
            descricaoLonga: "Uma representação fiel do solitário Mimikyu, que se veste como Pikachu para fazer amigos. Esta pelúcia de 22cm é rica em detalhes, incluindo os olhos desenhados em seu disfarce.",
            tags: ['fantasma', 'fada', 'alola', 'misterioso'],
            avaliacoes: []
        },
        {
            id: 104,
            sku: "PL-FLUT-01",
            nome: 'Pelúcia Flutter Mane',
            regiao: 'paldea',
            preco: 300.00,
            imagem: 'img/fluttermane-plush.jpg',
            estoque: 8,
            emEstoque: true,
            emDestaque: false,
            categoria: "Pelúcia",
            descricaoCurta: "Uma pelúcia rara do paradoxal Flutter Mane, diretamente de Paldea.",
            descricaoLonga: "Para os treinadores mais aventureiros, a pelúcia do Pokémon Paradoxo Flutter Mane. Com 30cm de altura, suas fitas e detalhes são feitos com materiais especiais que brilham no escuro.",
            tags: ['fantasma', 'fada', 'paldea', 'paradoxo'],
            avaliacoes: []
        },
        {
            id: 105,
            sku: "PL-PIKA-KIMONO-01",
            nome: 'Pelúcia Pikachu Kimono',
            regiao: 'kanto',
            preco: 290.00,
            imagem: 'img/pikachu-plush-kimono.jpg',
            estoque: 0,
            emEstoque: false,
            emDestaque: false,
            categoria: "Pelúcia",
            descricaoCurta: "Pikachu em um traje tradicional, celebrando a cultura de Kanto.",
            descricaoLonga: "Edição especial de colecionador! Esta pelúcia do Pikachu veste um kimono tradicional detalhado, perfeito para exibições. Produto licenciado do Pokémon Center.",
            tags: ['elétrico', 'kanto', 'especial', 'kimono'],
            avaliacoes: [
                { usuario: "Erika C.", nota: 5, comentario: "Simplesmente perfeito, os detalhes do kimono são incríveis." }
            ]
        }
    ],
    tcg: [
        {
            id: 201,
            sku: "TCG-DECK-CYN-01", nome: 'Deck Cynthia', regiao: 'sinnoh', preco: 310.00, imagem: 'img/cynthia-deck-tcg.png', estoque: 20, emEstoque: true, emDestaque: true, categoria: "TCG",
            descricaoCurta: "Domine seus oponentes com o poderoso deck da campeã de Sinnoh, Cynthia.",
            descricaoLonga: "Este deck de batalha completo é uma recriação fiel da estratégia da campeã Cynthia, focado em Pokémon do tipo Dragão e Terrestre. Inclui 60 cartas, um guia de estratégias e acessórios de jogo.",
            tags: ['deck', 'sinnoh', 'campeão', 'garchomp'],
            avaliacoes: []
        },
        {
            id: 202, sku: "TCG-BST-PALDEA-04", nome: 'Booster Pack Scarlet e Violet (4 Packs)', regiao: 'paldea', preco: 80.00, imagem: 'img/bosterpack-paldea.jpg', estoque: 50, emEstoque: true, emDestaque: false, categoria: "TCG",
            descricaoCurta: "Explore a região de Paldea com este conjunto de booster packs.",
            descricaoLonga: "Aventure-se pela região de Paldea com este kit contendo 4 pacotes de booster da coleção Escarlate e Violeta. Cada pacote contém 10 cartas e uma carta de energia.",
            tags: ['booster', 'paldea', 'escarlate', 'violeta'],
            avaliacoes: []
        },
        {
            id: 203,
            sku: "TCG-DECK-MIRA-01", nome: 'Deck Miraidon', regiao: 'paldea', preco: 270.00, imagem: 'img/miraidon-deck-tcg.jpg', estoque: 18, emEstoque: true, emDestaque: false, categoria: "TCG",
            descricaoCurta: "Acelere para a vitória com o deck temático do lendário Miraidon.",
            descricaoLonga: "Um deck de batalha focado em Pokémon do tipo Elétrico e no poder avassalador de Miraidon ex. Contém 60 cartas prontas para jogar, contadores de dano e um livro de regras.",
            tags: ['deck', 'paldea', 'lendário', 'miraidon'],
            avaliacoes: []
        },
        {
            id: 204,
            sku: "TCG-DECK-MARN-01", nome: 'Deck Marnie', regiao: 'galar', preco: 280.00, precoAntigo: 350.00, imagem: 'img/marnie-deck-tcg.png', estoque: 5, emEstoque: true, emDestaque: true, categoria: "TCG",
            descricaoCurta: "Mostre seu espírito competitivo com o deck de uma das rivais mais queridas de Galar.",
            descricaoLonga: "Este conjunto premium de torneio da Marnie inclui um deck completo, protetores de cartas, uma caixa de deck e dados, tudo com a arte exclusiva da personagem.",
            tags: ['deck', 'galar', 'marnie', 'competitivo'],
            avaliacoes: []
        },
        {
            id: 205, sku: "TCG-BST-UNOVA-10", nome: 'Booster Pack Reshiram (10 packs)', regiao: 'unova', preco: 150.00, imagem: 'img/bosterpack-reshiran.jpg', estoque: 25, emEstoque: true, emDestaque: false, categoria: "TCG",
            descricaoCurta: "Liberte o poder vasto e verdadeiro com este conjunto de boosters do Reshiram.",
            descricaoLonga: "Pacote econômico contendo 10 boosters da coleção Black & White, com a chance de encontrar cartas raras de Reshiram e Zekrom. Ideal para expandir sua coleção.",
            tags: ['booster', 'unova', 'reshiram', 'black & white'],
            avaliacoes: []
        }
    ]
};


// ENDPOINTS DE AUTENTICAÇÃO
app.post("/login", (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: "O campo de email ou senha não foi preenchido!" });
        }
        const usuario = db.usuarios.find(u => u.email === email && u.senha === senha);
        if (!usuario) {
            return res.status(401).json({ message: "Email ou senha incorretos!" });
        }
        const tokenPayload = { id: usuario.id, nome: usuario.nome, role: usuario.role };
        const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            message: "Login bem-sucedido!",
            token: token,
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role }
        });
    } catch (error) {
        return res.status(500).json({ message: "Falha na comunicação com o servidor!", error: String(error) });
    }
});

app.post("/cadastro", (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        if (db.usuarios.some(u => u.email === email)) {
            return res.status(409).json({ message: "Este email já está em uso." });
        }
        const novoId = db.usuarios.length > 0 ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
        const novoUsuario = { id: novoId, nome, email, senha, role: "cliente" };
        db.usuarios.push(novoUsuario);
        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email, role: novoUsuario.role }
        });
    } catch (error) {
        return res.status(500).json({ message: "Falha ao processar o cadastro.", error: String(error) });
    }
});

// ENDPOINTS DE PRODUTOS
app.get("/produtos/pelucias", (req, res) => res.status(200).json(db.pelucias));
app.get("/produtos/tcg", (req, res) => res.status(200).json(db.tcg));
app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = [...db.pelucias, ...db.tcg].find(p => p.id === id);
    if (produto) return res.status(200).json(produto);
    return res.status(404).json({ message: "Produto não encontrado." });
});

// INICIALIZAÇÃO DO SERVIDOR
app.listen(3001, () => {
    console.log("API simulada (simplificada) rodando em http://localhost:3001/");
});
