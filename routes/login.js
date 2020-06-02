var express = require('express');
var router = express.Router();

/* GET home page. */






router.get('/', function(req, res, next) {
  
  if(req.query.isExist)
  {

    req.session.isExist = req.query.isExist;
    req.session.UserId = req.query.UserId;
    req.session.user_address = req.query.user_address;
    req.session.isRecommended = req.query.isRecommended;
    req.session.earnings = req.query.earnings;
    req.session.recomendation = req.query.recomendation;
    req.session.creationTime = req.query.creationTime;
    req.session.total_Days = req.query.total_Days;
    req.session.total_Amount = req.query.total_Amount;
    req.session.level = req.query.level;
    req.session.ref_Income = req.query.ref_Income;
    req.session.expirePeriod = req.query.expirePeriod;
    req.session.visit= req.query.visit;
   
    if(req.session.UserId)
  {
    if(req.session.creationTime == 0)
    {
      res.redirect('/payment');
    }
    else{
    res.redirect('/dashboard');
    }
  }
  
  }
  else{
    if(req.session.UserId)
    {
      if(req.session.creationTime == 0)
      {
        res.redirect('/payment');
      }
      else{
      res.redirect('/dashboard');
      }   

    }else{

    res.render('login');
    }
     }










});

module.exports = router;
