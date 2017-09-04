var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('user')
  res.json([{
  	no: 1,
  	username: "laon",
    pushType:'nnn',
    subject:'nnn',
    pushCount:'nnn',
    isPush:'nnn',
    data:'2017-08-06'
  }, {
    no: 2,
  	username: "on2",
    pushType:'nnn',
    subject:'nnn',
    pushCount:'nnn',
    isPush:'nnn',
    date:'2017-05-20'
  }]);
});


module.exports = router;
