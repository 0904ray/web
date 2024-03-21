var express = require('express');
var router = express.Router();
let  check_account = require('../model/check_login');
let set_cookie = require('../model/set_cookie');


router.get('/', function(req, res, next) {
  res.render('login',{message:""});
  });


router.post('/',async function(req,res,next){   
  let a = await check_account.check_account(req.body.account,req.body.password );
  console.log(a);
  if(a.name){
    set_cookie.set_cookie(res,a.token);
    res.render('index',{ user_name: a.name , message:""});
  }
  else{
    res.render('login',{message: "*帳號或密碼錯誤"});
  }
});


module.exports = router;