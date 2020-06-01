var eth;
var user_address;




window.addEventListener('load', async () => {

    // Modern dapp browsers...
debugger
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      eth = new Eth(web3.currentProvider);

      web3.eth.net.getNetworkType()
.then( res => {
 if(res == 'rinkeby')
 {
  main();
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
      if (netId != 4) {
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
    
  
  window.tokenAddress = '0x7c57ccaCd4e63F569a2D0C7c9cFc90727169C582';
  //  window.tokenAddress = '0x51ff68F80948EeE367C8ef07E2380C2374F3008a'; //1min Aston final
   // window.tokenAddress = '0xB289ecc05597578E424c05DFd34dF15d48252167'; 1 min
    // window.tokenAddress = '0x4f726C854Eb45E3f7940E3480A5E247C72e075E5';
  // window.tokenAddress = '0x11DA6DA75584112e848522038b94F13f2808C4d2';     rinks
   //  window.tokenAddress = '0x53c3d40DC6e8487C518F33Bd76D76571732C929B';
  






   (async () => {
     
    const accounts = await web3.eth.getAccounts();
    debugger
    if (accounts[0] !== user_address) {         
      user_address =accounts[0];
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
tokenContract.methods.regUser().send({ from: user_address, gas: 400000 }).once('transactionHash', function(hash){ 
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
  earnings: web3.utils.fromWei(res.earning),
  recomendation : res.recomendation,
  creationTime : parseInt(res.creationTime+'000'),
  total_Days : res.total_Days,
  total_Amount : web3.utils.fromWei(res.total_Amount),
  level:res.level,
  ref_Income: web3.utils.fromWei(res.ref_Income)
}


console.log('before saveData',data);
obj=data;
debugger
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
$(document).ready(function(){

    
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
});









function invest()
{
  
  spinner();

  tokenContract.methods.invest().send({ from: user_address, gas: 210000,value: web3.utils.toWei( '0.25', 'ether') }).once('transactionHash', function(hash){ 
    console.log(1)
     })
    .once('receipt', function(receipt){  console.log(2)})
    .on('confirmation', function(confNumber, receipt){ console.log(3) })
    .on('error', function(error){
      stopSpinner();
      alert('Could Not Invest')
     })
    .then(function(receipt){
       
      stopSpinner();
      alert('Invest Complete')
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
  tokenContract.methods.Add_daily_Income().send({ from: user_address, gas: 210000 }).once('transactionHash', function(hash){ 
  console.log(1)
   })
  .once('receipt', function(receipt){  console.log(2)})
  .on('confirmation', function(confNumber, receipt){ console.log(3) })
  .on('error', function(error){
    stopSpinner();
    alert('Transaction not complete')
    login();
   })
  .then(function(receipt){
  stopSpinner();
  login();
    
  });
      
}










function withDrawAmounts() {


 
  var amount =  document.getElementById('withdrawl_amount').value;
  amount = web3.utils.toWei(amount, 'ether');

  spinner();

  tokenContract.methods.withDrawl(amount).send({from: user_address, gas: 210000}).once('transactionHash', function(hash){ 

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
debugger
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