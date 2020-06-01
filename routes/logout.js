var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {


   if(req.session.UserId)
  {
    req.session.destroy();
    res.redirect('/');
 
  }
  else{
    res.redirect('/login');
  }
  

  
});

module.exports = router;
