const express = require("express")
const router = express.Router()
var path = require('path');
const jwt = require('jsonwebtoken')


const { sucess, fail } = require("../data/resposta")
const AlimentoDAO = require("../model/Alimento")


router.use((req, res, next) => {
    const token = req.session.user.token;
    const id = req.session.user.id;
    next();
})


// rota pra carregar a pagina de alimentos

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'Alimento.html'));
})

// rota pra carregar a pagina de cadastro de alimentos

router.get('/cadastroAlimento', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'CadastroAlimento.html'));
})


// rota para carregar os dados dos alimentos e listar na página inicial

router.get('/meus-alimentos', async (req, res) => {

    const token = req.session.user.token;

    const dados = jwt.verify(token, '13579');

    try {
        const obj = await UsersDAO.buscaPorEmail(dados.email)

        res.json(obj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false });
    }
})


// rota para o cadastro de um novo alimento

router.post("/cadastro", (req, res) => {

    const { nome, medida } = req.body
    const id = req.session.user.id;


    AlimentoDAO.cadastrar(nome, medida, id).then(alimento => {
        res.json(sucess(alimento))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possivel salvar o alimento"))
    })

})

//rota para alteração do alimento

router.put("/alterar", (req, res) => {
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


// rota para exclusao do alimento

router.delete("/excluir", (req, res) => {
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

module.exports = router
