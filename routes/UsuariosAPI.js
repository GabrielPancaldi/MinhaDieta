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





router.put("/:id", (req, res) => {
    const { id } = req.params
    const { nome, estado, cidade } = req.body

    let obj = {}
    if (nome) obj.nome = nome
    if (estado) obj.estado = estado
    if (cidade) obj.cidade = cidade

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    TimesDAO.editar(id, obj).then(time => {
        if (time)
            res.json(sucess(time))
        else
            res.status(500).json(fail("Time nao encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("falha ao alterar o time"))
    })
})

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
