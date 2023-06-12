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
    res.sendFile(path.join(__dirname, '../front', 'Alimentos.html'));
})

// rota pra carregar a pagina de cadastro de alimentos

router.get('/cadastroAlimento', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'CadastroAlimento.html'));
})

//rota para carregar a página de alteração de alimentos

router.get('/editarAlimento', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'AlteraAlimento.html'));
})


// rota para carregar os dados dos alimentos e listar na página inicial

router.get('/meus-alimentos', async (req, res) => {


    const id = req.session.user.id;

    try {
        const obj = await AlimentoDAO.buscaPorFK(id)

        res.json(obj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false });
    }
})


// rota para listar o alimento na página de alteração

router.get('/meus-alimentos/:id', async (req, res) => {

    const id = req.params.id;

    console.log(id);

    try {
        const obj = await AlimentoDAO.buscaPorID(id)

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
    const { id, nome, medida} = req.body;

    let obj = {};
    if (nome) obj.nome_alimento = nome;
    if (medida) obj.medida_alimento = medida;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    AlimentoDAO.editar(id, obj).then(alimento => {
        if (alimento)
            res.json(sucess(alimento))
        else
            res.status(500).json(fail("Alimento nao encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("falha ao alterar o Alimento"))
    })

});


// rota para exclusao do alimento

router.delete("/excluir", (req, res) => {
    const id = req.body.id;
   
    AlimentoDAO.excluir(id).then(alimento => {
        if (alimento) {
            req.session.token = null;
            res.json(sucess(id))
        }
        else
            res.status(500).json(fail("Alimento não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o Alimento"))
    })

})

module.exports = router
