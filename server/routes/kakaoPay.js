var express = require('express');
var router = express.Router();
var request = require('request');

var opt = {
  async: true,
  crossDomain: true,
  method:'POST',
  url:'https://kapi.kakao.com/v1/payment/ready',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Authorization':'KakaoAK 12ece6927c18aa614242b0447c530225',
    "cache-control": "no-cache",
  },
  form: {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "라이언빵",
    quantity: "1",
    total_amount: "1000",
    vat_amount: "200",
    tax_free_amount: "0",
    approval_url: "http://localhost:3001/good",
    fail_url: "http://localhost:3001/fail",
    cancel_url: "http://localhost:3001/cancel"
  }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log('카카오페이')
  request.post(opt,(error, response, body)=>{
    console.log(error);
    return res.json(JSON.parse(body));
  })
});


module.exports = router;
