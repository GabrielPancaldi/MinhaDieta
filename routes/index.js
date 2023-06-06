var express = require('express');
var router = express.Router();
var path = require('path');
const nodemailer = require("nodemailer");

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




/*router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'Index.html'));
})
*/

module.exports = router;
