const express = require("express")
const router = express.Router()
var path = require('path');
const jwt = require('jsonwebtoken')


const { sucess, fail } = require("../data/resposta")
const RefeicaoDAO = require("../model/Refeicao")


router.use((req, res, next) => {
    const token = req.session.user.token;
    const id = req.session.user.id;
    next();
})



// rota pra carregar a pagina de cadastro de refeicao

router.get('/cadastroRefeicao', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'CadastroRefeicao.html'));
})

//rota para carregar a página de alteração de refeicao

router.get('/editarRefeicao', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'AlteraRefeicao.html'));
})


// rota para carregar os dados das refeicoes e listar na página inicial

router.get('/minhas-refeicoes', async (req, res) => {


    const id = req.session.user.id;

    try {
        const obj = await RefeicaoDAO.buscaPorFK(id)

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
        const obj = await RefeicaoDAO.buscaPorID(id)

        res.json(obj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false });
    }
})


// rota para o cadastro de um novo refeicao

router.post("/cadastro", (req, res) => {

    const { nome, alimento1, quantidade1, alimento2, quantidade2, alimento3, quantidade3 } = req.body
    const id = req.session.user.id;


    RefeicaoDAO.cadastrar(nome, alimento1, quantidade1, alimento2, quantidade2, alimento3, quantidade3, id).then(refeicao => {
        res.json(sucess(refeicao))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possivel salvar a refeicao"))
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
