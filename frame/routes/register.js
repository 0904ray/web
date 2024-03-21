var express = require('express');
var router = express.Router();
let do_register = require('../model/do_register');
let set_cookie = require('../model/set_cookie');


router.get('/', function(req,res){
  res.render('register',{message:""});
});

router.post('/',async function(req,res,next){   
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if(!(pattern.test(req.body.password))){
    res.render('register',{message:"密碼要包含大小寫和數字"});
    return
  }
  token = await do_register.register(req.body.account,req.body.username,req.body.password);
  if(token === 2){
    res.render('register',{message:"帳號已被使用"});
  }
  else if(token === 3){
    res.render('register',{message:"名字已被使用"});
  }
  else if(token === 4){
    res.render('register',{message:"密碼已被使用"});
  }
  else{
    set_cookie.set_cookie(res,token);
    res.render('index',{ user_name: req.body.username});
  }
});


module.exports = router;