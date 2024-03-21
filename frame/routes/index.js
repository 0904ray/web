var express = require('express');
var router = express.Router();
let  check_account = require('../model/check_login');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (token){
    let a = await check_account.chenck_token(token);
    res.render('index', { user_name: a.name }) ;
  }
  else{
    res.render('index', { user_name: 'friend' }) ;
  }
});

router.post('/', function(req, res, next) {
  const cookies = Object.keys(req.cookies);
  cookies.forEach(cookieName => {
    res.clearCookie(cookieName);
  });

  res.render('index', { user_name: 'friend' }) ;
});
module.exports = router;
