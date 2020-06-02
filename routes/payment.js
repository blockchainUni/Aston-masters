var express = require('express');
var router = express.Router();




router.get('/', function(req, res, next) {

  if(req.session.isExist)
  {

    if(req.session.creationTime != 0)
    res.redirect('/dashboard');
    else
   {
    if(req.session.rid!=null)
    {
      res.render('payment',{ UserId: req.session.UserId,
        user_address:req.session.user_address,Level:req.session.level, UserId:req.session.UserId, isRecommended:req.session.isRecommended,
        earnings:req.session.earnings,recomendation:req.session.recomendation, creationTime:req.session.creationTime,
        total_Days:req.session.total_Days,total_Amount:req.session.total_Amount,ref_Income:req.session.ref_Income,rid:req.session.rid,expirePeriod:req.session.expirePeriod,
        visit:req.session.visit
      });

    }else{
      res.render('payment',{ UserId: req.session.UserId,
        user_address:req.session.user_address,Level:req.session.level, UserId:req.session.UserId, isRecommended:req.session.isRecommended,
        earnings:req.session.earnings,recomendation:req.session.recomendation, creationTime:req.session.creationTime,
        total_Days:req.session.total_Days,total_Amount:req.session.total_Amount,ref_Income:req.session.ref_Income,expirePeriod:req.session.expirePeriod,
        visit:req.session.visit
      });
        
    }

 

}
  


}
  else
  {

    if(req.query.rid != null)
    {
      req.session.rid = req.query.rid;
      res.redirect('/signup');
    }
    else
    {
    res.redirect('/login');
    }
  }
 });

module.exports = router;




