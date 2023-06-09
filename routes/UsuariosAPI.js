const express = require("express")
const router = express.Router()
var path = require('path');
const jwt = require('jsonwebtoken')


const { sucess, fail } = require("../data/resposta")
const UsersDAO = require("../model/Usuarios")


router.use((req, res, next) => {
    const token = req.session.token;
    next();
})

router.get('/cadastrouser', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'CadastroUsuario.html'));
})



router.get('/meus-dados', async (req, res) => {

    const token = req.session.token;

    const dados = jwt.verify(token, '13579');

    try {
        const obj = await UsersDAO.buscaPorEmail(dados.email)

        res.json(obj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false });
    }
})



router.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body

    UsersDAO.cadastrar(nome, email, senha).then(usuario => {
        res.json(sucess(usuario))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possivel salvar o usuario"))
    })

})



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


router.delete("/:id", (req, res) => {
    TimesDAO.excluir(req.params.id).then(time => {
        if (time)
            res.json(sucess(time))
        else
            res.status(500).json(fail("Time não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o time"))
    })

})

module.exports = router
