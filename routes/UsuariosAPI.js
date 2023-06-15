const express = require("express")
const router = express.Router()
var path = require('path');
const jwt = require('jsonwebtoken')
require('dotenv').config();


const { sucess, fail } = require("../data/resposta")
const UsersDAO = require("../model/Usuarios")

// rota pra carregar a pagina de cadastro

router.get('/cadastrouser', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'CadastroUsuario.html'));
})


router.use((req, res, next) => {
    const token = req.session.user.token;
    next();
})


// rota para carregar os dados de um usuario

router.get('/meus-dados', async (req, res) => {

    const token = req.session.user.token;

    const dados = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const obj = await UsersDAO.buscaPorEmail(dados.email)

        res.json(obj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false });
    }
})


// rota para o cadastro de um novo usuario

router.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body

    UsersDAO.cadastrar(nome, email, senha).then(usuario => {
        res.json(sucess(usuario))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possivel salvar o usuario"))
    })

})

//rota para alteração do perfil do usuario

router.put("/meu-perfil/alterar", (req, res) => {
    const { id, nome, email, senha } = req.body;

    let obj = {};
    if (nome) obj.nome_usuario = nome;
    if (email) obj.email_usuario = email;
    if (senha) obj.senha_usuario = senha;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    UsersDAO.editar(id, obj).then(usuario => {
        if (usuario)
            res.json(sucess(usuario))
        else
            res.status(500).json(fail("Usuario nao encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("falha ao alterar o usuario"))
    })

});


// rota para exclusao do perfil do usuario

router.delete("/meu-perfil/excluir", (req, res) => {
    const id = req.body.id;



    UsersDAO.excluir(id).then(usuario => {
        if (usuario) {
            req.session.token = null;
            res.json(sucess(id))
        }
        else
            res.status(500).json(fail("Usuario não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o usuario"))
    })

})

router.post('/logout', (req, res) =>{

    req.session.destroy();

    res.render('index');

})

module.exports = router
