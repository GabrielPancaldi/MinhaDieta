var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req, res) => {

    res.render("index");

});


/*router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'Index.html'));
})
*/

module.exports = router;
