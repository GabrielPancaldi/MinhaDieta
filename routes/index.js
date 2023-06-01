var express = require('express');
var router = express.Router();
var path = require('path');

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




/*router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'Index.html'));
})
*/

module.exports = router;
