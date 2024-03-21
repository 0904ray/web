function set_cookie(res,token){
  res.cookie('token', token,{maxAge: 900000 }); 
  return;
}

module.exports = {
    set_cookie:set_cookie,
  };