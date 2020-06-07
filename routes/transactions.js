var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {

  if(req.session.isExist)
  {

    if(req.session.creationTime==0)
    {
      res.redirect('/payment');
    }
    else{

  res.render('transactions',{ UserId: req.session.UserId,
    user_address:req.session.user_address,Level:req.session.level, UserId:req.session.UserId, isRecommended:req.session.isRecommended,
    earnings:req.session.earnings,recomendation:req.session.recomendation, creationTime:req.session.creationTime,
    total_Days:req.session.total_Days,total_Amount:req.session.total_Amount,ref_Income:req.session.ref_Income
  });
    }


  }
  else
  res.redirect('/login');
});

module.exports = router;




