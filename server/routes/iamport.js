var express = require('express');
var router = express.Router();
var request = require('request');

var opt = {
  method:'POST',
  url:'https://api.iamport.kr/users/getToken',
  headers: {
    'Content-type':'application/json',
  },
  form: {
    imp_key:'imp_apikey',
    imp_secret:'ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f'
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {
  request.post(opt, (err, response, body) => {
    console.log(JSON.parse(body).response.access_token)
    token = JSON.parse(body).response.access_token
    res.json(JSON.parse(body).response);
  })
});

router.post('/',(req, res, next) => {
  var data = req.body;
  request({
    method:'GET',
    url: 'https://api.iamport.kr/certifications/' + data.imp_uid,
    headers: {
      'Content-type':'application/json',
      'Authorization': data.access_token,
      'X-ImpTokenHeader': data.access_token
    }
  }, (err, response, body) => {
    res.json(JSON.parse(body))
  })
})


module.exports = router;
