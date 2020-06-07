var eth;
var user_address;

var creationTime;
var timenow;
var period;


window.addEventListener('load', async () => {

    // Modern dapp browsers...
    
    gettimezone();

  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      eth = new Eth(web3.currentProvider);

      web3.eth.net.getNetworkType()
.then( res => {
 if(res == 'main')
 {
  main();
 }
 else{
   alert('switch to mainnet')
 }
});

 
  
    } catch (error) {
      console.log(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    eth = new Eth(web3.currentProvider);
    web3.version.getNetwork((err, netId) => {
      if (netId != 1) {
        alert('Change to Mainnet');
      } else {
         main();
      }
    });
  
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask! or login from Torus');
    const torus = new Torus({
      buttonPosition: "top-left" // default: bottom-left
    });
    await torus.init({
      buildEnv: "production", // default: production
      enableLogging: true, // default: false
      network: {
        host: "mainnet", // default: mainnet
        chainId: 42, // default: 1
        networkName: "Main Ethereum Network" // default: Main Ethereum Network
      },
      showTorusButton: false // default: true
    });
    await torus.login(); // await torus.ethereum.enable()
     window.web3 = new Web3(torus.provider);
     eth = new Eth(web3.currentProvider);
     main()
  
  }
  
  
  
  
  
  })
  


  


function main()
{
  window.tokenAddress = '0x910b4a28cd6d98d7f11422d89c0e3404fc0c7d4a';
 // window.tokenAddress = '0xa4e0e075b218f74936acc52aa02f705e5e8ea0d1';
  //window.tokenAddress = '0xa0d0304979ad577a24d1a7c8cad81890d126c3e2';
  // window.tokenAddress = '0x5f87fabff89460178efdc73fe8bc27b2d348991d';
  //window.tokenAddress = '0xc245f8778d72db57ad5f1489f02cb2607628a57b';
  //window.tokenAddress = '0x75e886a02bdc8c160f794730b5711d8adb4ae77c';
//  window.tokenAddress = '0xe136e40b006b279729095128e918fa7e1806bb46';
//window.tokenAddress = '0xF29aa34099729baa98b17C8FD5b8c11d8d00B9b1';
  //window.tokenAddress = '0x5dd6db74e3ae0da89fdc73c59dcb4c96f20f4559'; //final 1 min with tree 
//  window.tokenAddress = '0x9351f30e9C4e981e8ad6a87b19111F4811b3396f'; //final 1 min on 1st June
 // window.tokenAddress = '0x7c57ccaCd4e63F569a2D0C7c9cFc90727169C582';
  //  window.tokenAddress = '0x51ff68F80948EeE367C8ef07E2380C2374F3008a'; //1min Aston final
   // window.tokenAddress = '0xB289ecc05597578E424c05DFd34dF15d48252167'; 1 min
    // window.tokenAddress = '0x4f726C854Eb45E3f7940E3480A5E247C72e075E5';
  // window.tokenAddress = '0x11DA6DA75584112e848522038b94F13f2808C4d2';     rinks
   //  window.tokenAddress = '0x53c3d40DC6e8487C518F33Bd76D76571732C929B';
  






   (async () => {
     
    const accounts = await web3.eth.getAccounts();
    
    if (accounts[0] !== user_address) {         
      user_address =accounts[0];


      console.log(user_address)
      tokenContract.methods.users(user_address).call({from: user_address})
      .then(res => {   
          console.log(res); 
      });





     

        if(window.location.pathname=='/dashboard' && (period== 'false'))
          {
      
      
      
      
      
            console.log(creationTime)
creationTime = parseInt(creationTime ) ;
creationTime += 86400000 //adding 70secs 
    // Set the date we're counting down to
    var countDownDate = new Date(  creationTime  ).getTime();
    
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get today's date and time
     
      
debugger
var dates = new Date();
timenow = parseInt(timenow) +1000
      
      var now = timenow;
   
      console.log(now);
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
      document.getElementById("timmer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timmer").innerHTML = "Loading...";
    
     
       
     add_daily_income();

     
     
     
     
     
       
      }
    }, 1000);
          }

          if(window.location.pathname=='/referrals')
          {
            spinner(); 
     togetdownline(user_address);
          }
    }
    else{


      tokenContract.methods.isInvested.call(0, function(err, result){
        if(!err){
           alert(result)
        }
    });

      if(window.location.pathname=='/referrals')
      {
        spinner(); 
 togetdownline(user_address);
      }
      if(window.location.pathname=='/dashboard'  && (period == 'false'))
        {
        
creationTime = parseInt(creationTime ) ;
creationTime += 86400000 //adding 70secs 
    // Set the date we're counting down to
    var countDownDate = new Date(  creationTime  ).getTime();
    
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
      document.getElementById("timmer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timmer").innerHTML = "Loading...";
    
     
       
     add_daily_income();

     
     
     
     
     
       
      }
    }, 1000);
        }
    }

  })();



  
     



        //const NameContract = web3.eth.Contract(tokenABI);
        //window.tokenContract2 = NameContract.at(tokenAddress);
        window.tokenContract = new web3.eth.Contract(tokenABI,tokenAddress);
    console.log('Inmain');

  
}










function regUser() {


console.log(web3)
console.log(user_address);
console.log(tokenAddress)

 
spinner();
tokenContract.methods.regUser().send({ from: user_address, gas: 40000 }).once('transactionHash', function(hash){ 
console.log(1)
 })
.once('receipt', function(receipt){  console.log(2)})
.on('confirmation', function(confNumber, receipt){ console.log(3) })
.on('error', function(error){
  stopSpinner();
  alert('Could Not Register')
 })
.then(function(receipt){
   
  stopSpinner();
  alert('Registeration Complete')
  window.location.replace('/login');
  
});
    
}




var obj=[];

function login()
{

spinner();

    console.log('userwallet',user_address);
    tokenContract.methods.users(user_address).call({from: user_address})
    .then(res => {   
        console.log(res);    
if(res.isExist==true){




     var data = {
  UserId:res.id,
  isExist:res.isExist,
  user_address:user_address,
  isRecommended : res.isRecomended,
  earnings: parseFloat(web3.utils.fromWei(res.earning)),
  recomendation : res.recomendation,
  creationTime :  parseInt(res.creationTime + '000'),
  total_Days : res.total_Days,
  total_Amount : web3.utils.fromWei(res.total_Amount),
  level:res.level,
  ref_Income:  web3.utils.fromWei(res.ref_Income),
  expirePeriod : res.expirePeriod ,
  visit: parseInt(res.visit)
}




console.log('before saveData',data);
debugger
obj=data;

saveData();
}else{
  stopSpinner();
    alert('user does not exsist');
    return;
}

      }) .catch((err) => {
 
        stopSpinner();

       alert("Error couldnot login");
       
       console.log(err);
     })
}

var saveData;
var tree;
var gettimezone
$(document).ready(function(){

    

gettimezone = function()
{
  $.getJSON('http://worldtimeapi.org/api/timezone/Asia/Jakarta', function(data) {
    //data is the JSON string        
        timenow= data.unixtime ;
        timenow = timenow + '000';  
});
}









    saveData = function()
    {
       $.ajax({
         type: 'GET',
         url: '/login',
         data: obj,
             success:function(response) {
               //document.getElementById("total_items").value=response;
             //  stopSpinner();
             console.log(obj);
             stopSpinner();

               window.location.replace('/dashboard');
               
           },
           error:function(){
             stopSpinner();
             alert("Login Error");
           }});
       }


       tree =function(data) {
        $('#tree1').tree({
            data: data
        });
    };
});









function invest()
{
  

  spinner();


  tokenContract.methods.recommend("1").send({from: user_address, gas: 400000 , value: web3.utils.toWei( '0.25', 'ether')}).once('transactionHash', function(hash){ 

   })
  .once('receipt', function(receipt){ })
  .on('confirmation', function(confNumber, receipt){  })
  .on('error', function(error){
    stopSpinner();
    alert('Could not invest')
    
   })
  .then(function(receipt){
     stopSpinner();
      login();
    
  });

}





function withDrawl()
{
    tokenContract.withDrawl(user_address)
      .then(txHash =>  eth.getTransactionSuccess(txHash)
          .then(receipt => {
            
            setInterval( alert("Funds Transfered",receipt),2000);
            login();
    
    
            
          })
      )
      .catch((err) => {
        console.log(err);
      })
}







function add_daily_income() {


  spinner();
  tokenContract.methods.Add_daily_Income().send({ from: user_address, gas: 400000 }).once('transactionHash', function(hash){ 
  console.log(1)
   })
  .once('receipt', function(receipt){  console.log(2)})
  .on('confirmation', function(confNumber, receipt){ console.log(3) })
  .on('error', function(error){
    stopSpinner();
    alert('Transaction not complete')
   
   })
  .then(function(receipt){
  stopSpinner();
  login();
    
  });
      
}










function withDrawAmounts(amount) {


 

  amount = web3.utils.toWei(amount, 'ether');
console.log(amount);
  
  spinner();



  tokenContract.methods.withDrawl(amount).send({from: user_address, gas: 400000}).once('transactionHash', function(hash){ 

   })
  .once('receipt', function(receipt){ })
  .on('confirmation', function(confNumber, receipt){  })
  .on('error', function(error){
    stopSpinner();
    alert('Transaction not complete')
    
   })
  .then(function(receipt){
     stopSpinner();
    login();
    
  });
      
}










function recommend(rid)
{
  console.log(rid)
  console.log(typeof(rid))
  spinner();

  tokenContract.methods.recommend(rid).send({from: user_address, gas: 400000 , value: web3.utils.toWei( '0.25', 'ether')}).once('transactionHash', function(hash){ 

   })
  .once('receipt', function(receipt){ })
  .on('confirmation', function(confNumber, receipt){  })
  .on('error', function(error){
    stopSpinner();
    alert('Could not invest')
    
   })
  .then(function(receipt){
     stopSpinner();
      login();
    
  });



}






function spinner() {
  document.getElementById("preloader").style.display='block';
 }


function stopSpinner() {
  document.getElementById("preloader").style.display = "none";
 }



































 var downline = [];
var temparr=[];


var myJSON;
var cc ;

function togetdownline(address)
{
 functiToGetDownline(address); 
 setTimeout( 
    function(){
  // (downline[0]['0x3DEa86e3170aB1e93Ff033CEe4Ae07bb19C75aB7'][0]) = (downline[1]); 
   //console.log(downline);
   // var arr = downline[0];
   // downline.shift();

var arry = [];
var count=0;


    for (var name in downline) {
      if (downline.hasOwnProperty(name)) {
      
        if(count!=0)
        {
        temparr[name] =downline[name];
        //console.log('asdsadas',temparr[name][name]);    
        // 'hello'
        }
        else{
          arry[name]=downline[name];
                                                                                                                                                                                                                                                                                                                          }
      } 
     count++;
    }

    downline = null;
    findtherightfit(arry);
    
     myJSON = JSON.parse(JSON.stringify(arry)) 
 
     if(myJSON!=null)
     {
        cc= myJSON;
        console.log(cc);
      
        
        tree(cc)
         //var myJSON = JSON.parse(myJSON);// console.log(obj);           
         // root = obj;
          
          //console.log(root);
     }
      else{
    //      console.log(myJSON);
          alert('cannot create graph'); 
      }      
          stopSpinner();
       //   update(myJSON);
    
    console.log("TREE-RESULT",myJSON);

  
    }
  
  

  
  
  ,5000);

 

  
}










var current;
var prevaddress;
var globalcounter=0;
var for_refferal=[];

function functiToGetDownline(address){
  

  //console.log(downline);
  tokenContract.methods.tree(address).call({from: user_address})
  .then(res => {
  
    var len = res.length;
    var obj = [];
   if(len>0)
   {
    for(var l =0 ; l <len ; l++)
    {
        obj[l] = res[l] 
    }
      downline.push({name:address, children:obj});
      for_refferal.push({name:address, children:obj});

  //    globalcounter++;
    for (i = 0; i < len; i++)
    {
      address = res[i];
      functiToGetDownline(address)
            
    }
   
   }
   else{
    obj[address] = 0; 
    downline.push( {name:address, children:0});
    for_refferal.push( {name:address, children:0});

  // globalcounter++;
     return for_refferal;
     
   }
   
  

  })



}






function findtherightfit(arry)
{
var temps = arry; 


if(arry[0]){
  
for(var i = 0; i<arry[0].children.length; i++)
{
 // console.log('test',arry[0].children);

  for(var p=1; p<temparr.length; p++)
  {
    
      if(arry[0].children[i] == temparr[p].name)
      {
       // console.log('IN-IF');
        arry[0].children[i] = {name:temparr[p].name, children:temparr[p].children};
      }   
      else{
        //console.log('IN-ELSE');
        if(temparr[p].children.length > 0)
        {
          //console.log('in-recurssion',temparr[p])
          findtherightfit(temparr[p]);
        }
        else{
          continue;
        }
          

      }
  }
  //console.log('asdsad',arry[0].children[i]);
} 
}


else{
  for(var i = 0; i<arry.children.length; i++)
{
 // console.log('test',arry[0].children);

  for(var p=1; p<temparr.length; p++)
  {
    
      if(arry.children[i] == temparr[p].name)
      {
       // console.log('IN-IF');
        arry.children[i] = {name:temparr[p].name,children: temparr[p].children};
      }   
      else{
        //console.log('IN-ELSE');
      //  if(temparr[p].children.length > 0)
        //{
          //console.log('in-recurssion',temparr[p])
          //findtherightfit(temparr[p]);
        //}
        //else{
          continue;
        //}
          

      }
  }
  //console.log('asdsad',arry[0].children[i]);
} 
}

//console.log(arry);
//console.log(temparr);

}
  



function reinvest()
{
  var value = document.getElementById('sel1').value;



  spinner();

  tokenContract.methods.ReInvest().send({ from: user_address, gas: 400000,value: web3.utils.toWei( value, 'ether') }).once('transactionHash', function(hash){ 
    console.log(1)
     })
    .once('receipt', function(receipt){  console.log(2)})
    .on('confirmation', function(confNumber, receipt){ console.log(3) })
    .on('error', function(error){
      stopSpinner();
      alert('Could Not ReInvest')
     })
    .then(function(receipt){
       
      stopSpinner();
      alert('Invest Complete')
      login();
      
    }
    );





}



function expire(){

  tokenContract.methods.expire().send({ from: user_address, gas: 400000 }).once('transactionHash', function(hash){ 
    console.log(1)
     })
    .once('receipt', function(receipt){  console.log(2)})
    .on('confirmation', function(confNumber, receipt){ console.log(3) })
    .on('error', function(error){
      stopSpinner();
      alert('Could Not Expire User')
     })
    .then(function(receipt){
       
      stopSpinner();
      alert('User')
      login();
      
    });



}