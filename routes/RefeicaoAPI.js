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

router.get('/minhas-refeicoes/:id', async (req, res) => {

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

    const { nome, alimento1, medida1, quantidade1, alimento2, medida2, quantidade2, alimento3, medida3, quantidade3} = req.body
    const id = req.session.user.id;


    RefeicaoDAO.cadastrar(nome, alimento1, medida1, quantidade1, alimento2, medida2, quantidade2, alimento3, medida3, quantidade3, id).then(refeicao => {
        res.json(sucess(refeicao))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Não foi possivel salvar a refeicao"))
    })

})

//rota para alteração da refeicao

router.put("/alterar", (req, res) => {
    const { id, nome, ali1, med1, quant1, ali2, med2, quant2, ali3, med3, quant3} = req.body;

    let obj = {};
    if (nome) obj.nome_refeicao = nome;
    if (ali1) obj.nome_alimento_1 = ali1;
    if(med1) obj.medida_alimento_1 = med1;
    if (quant1) obj.quantidade_alimento_1 = quant1;
    if (ali2) obj.nome_alimento_2 = ali2;
    if(med2) obj.medida_alimento_1 = med2;
    if (quant2) obj.quantidade_alimento_2 = quant2;
    if (ali3) obj.nome_alimento_3 = ali3;
    if(med3) obj.medida_alimento_1 = med3;
    if (quant3) obj.quantidade_alimento_3 = quant3;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    RefeicaoDAO.editar(id, obj).then(refeicao => {
        if (refeicao)
            res.json(sucess(refeicao))
        else
            res.status(500).json(fail("Refeicao nao encontrada"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("falha ao alterar a Refeicao"))
    })

});


// rota para exclusao do alimento

router.delete("/excluir", (req, res) => {
    const id = req.body.id;
   
    RefeicaoDAO.excluir(id).then(refeicao => {
        if (refeicao) {
            req.session.token = null;
            res.json(sucess(id))
        }
        else
            res.status(500).json(fail("Refeicao não encontrada"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir a Refeicao"))
    })

})

module.exports = router
