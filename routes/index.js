var express = require('express');
var router = express.Router();
var path = require('path');
const nodemailer = require("nodemailer");
const { sucess, fail } = require("../data/resposta")
const UsersDAO = require("../model/Usuarios")
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {

    res.render("index");

});

router.get('/contato', (req, res) => {

    res.render("contato");

});

router.get('/tecnologia', (req, res) => {

    res.render("tecnologia");

});

router.get('/sobre', (req, res) => {

    res.render("sobre");

});

router.get('/desenvolvedor', (req, res) => {

    res.render("desenvolvedor");

});

router.post('/envia-email', (req, res) => {

    const { destinatario, assunto, descricao } = req.body;

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "2006e9a6a38961",
            pass: "e748002560dbbf"
        }
    });


    var message = {
        from: "noreply@minhadieta.com.br",
        to: destinatario,
        subject: assunto,
        text: descricao,
    };

    transport.sendMail(message, function (err) {
        if (err) {
            console.log(err);
            res.status(400).json({
                erro: true,
                message: "E-mail nao enviado"
            });
        } else
            res.json({
                erro: false,
                message: "Email enviado com sucesso"
            });
    });

});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body

    try {
        const obj = await UsersDAO.buscaPorEmail(email);

        if (obj && obj.senha_usuario == senha) {
            // Permissao = Criar token
            const token = jwt.sign({ email: email }, '13579', {
                expiresIn: '1 hr'
            });

            req.session.token = token;



            res.json({ status: true, token: token, email: email });
        } else {
            // Sem permissao = sem token
            res.status(403).json({ status: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false });
    }
})


router.get('/meu-perfil', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'Usuario.html'));
})


router.get('/inicial', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'inicial.html'));
})


module.exports = router;
