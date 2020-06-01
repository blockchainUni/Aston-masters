pragma solidity ^0.6.1;
//Library for safe math
library SafeMath {

  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a / b;
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }

}



    
    //Mian Business contract is drived from owner contract
        contract Generation{
                address payable public owner;// owner address
        // for partners to share commission
        address payable creator1;
        address payable creator2;
        address payable creator3;
        address payable creator4;
        
        // owner contract modifier
            using SafeMath for uint256;
                uint256 commission;
        //struct for user    
        struct user
        {
        bool isExist;         //for user existance
        bool isRecomended;    //for checking is Recommended or not
        uint256 earning;      //earnings from investments
        uint256 id;           // user id
       uint256 recomendation; //for recomendation counter
       uint256 creationTime;  //creationTime counter
       uint256 total_Days;    //total_Days counter
       uint256 total_Amount;  //total_Amount counter earnings
       uint256 level;         //level counter
       uint256 ref_Income;   // ref_Income earn by levels 
       uint256 referBy;
       
       address[] reffrals;
    }
    user[] userList;
    //mappings
    mapping(address=>user)public users;
    mapping(address=>address payable)public recomendators;//number of people come through one person
    mapping(address=>uint256)private invested;
    mapping(address=>bool)public isInvested;
    mapping(address=>bool)public registration;    
    mapping(uint256=>address payable)public userAddress;
    //Events
    // for registration
    event RegUser(bool isExist,uint256 earning,uint256 recomendation, uint256 creationTime,uint256 total_Days,bool isRecomended,uint256 id);
    //for invest event
    event Invest(address _user,uint256 _value);
    //for Recommend event
   event Recommend(address _user,address _refference,uint256 referBy);
        // For WithDrawl event
    event    WithDrawl(address user,uint256 earning);
    
    //constructor
        constructor() public{
            owner=msg.sender;
            creator1=0xF161abA3a2cc544133C41d28D35c6d20B7f5754B;
            creator2=0x77dC753d9c15Fae33eC91422342130D79ff3F84b;
            creator3=0xf242aA1C641591DDe68c598A3C9eAa285794ae80;
            creator4=0xa5a625D3CC186Fa68aa4EeCa7D29b1b6154f4201;
        }

    //modifier
       modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    modifier onlyAmount(){
        require(msg.value==0.25 ether);
        _;
    }
    modifier onlyRecommend(uint256 _refference){//for checking reference recomendations counter
    user memory obj=userList[_refference-1];
        require(obj.recomendation<11);
        _;
    }
    modifier onlyFirst(uint256 _refference){ //for Recommend functions
    address a=userAddress[_refference];
        require(users[a].isExist==true); //to check reference should exist before 
        require(a!=msg.sender);   //to check investor should not be refferer
        // require(isInvested[_refference]==true);
        // require(users[msg.sender].isExist=false); //investor should not exist before
        _;
    }
    modifier firstExist(){   // for in function
        require(users[msg.sender].isExist==true);   //investor should be registered before investments
        require(isInvested[msg.sender]==false);
        _;
    }
    modifier onlyafter(){ // for WithDrawl function
        user memory obj=users[msg.sender];   
        require(obj.total_Days<400);    // should not WithDraw money after 400 days; 
        require(obj.total_Amount< 1 ether); // earnings should be less than 1 ether
        _;
    }
    // public functions
    //invest function
    function regUser()public returns(bool){
        uint256 _id=userList.length+1;
        require(users[msg.sender].isExist==false);
        require(registration[msg.sender]==false);
        user memory obj =user({isExist:true,earning:0,recomendation:0,creationTime:0,total_Days:0,isRecomended:false,id:_id,
     total_Amount:0,level:0,ref_Income:0,referBy:0,reffrals:new address[](0)});
     userList.push(obj);
     users[msg.sender]= obj;
     registration[msg.sender]=true;
      userAddress[_id]=msg.sender;
     emit RegUser(obj.isExist,obj.earning,obj.recomendation,obj.creationTime,obj.total_Days,obj.isRecomended,obj.id);
    return true;
    }
    function invest()public payable onlyAmount() firstExist  returns(bool){
        
     
    //  balances[msg.sender]=msg.value;
     invested[msg.sender]+= msg.value;
     isInvested[msg.sender]=true;
     users[msg.sender].creationTime=now;
      commission=(msg.value.mul(10)).div(100);
     forCreators(commission);
    emit Invest(msg.sender,msg.value);
     return true;
    }
    //recommend function
    function recommend(uint256 _refference)public payable onlyRecommend(_refference) onlyAmount  onlyFirst(_refference) firstExist
    returns(bool){
    
    invest();
    address payable a=userAddress[_refference];
    require(isInvested[a]==true);
        recomendators[msg.sender]=a;
        users[a].reffrals.push(msg.sender);
        users[a].recomendation+=1;
        users[msg.sender].referBy=_refference;
        users[msg.sender].isRecomended=true;
        
        
        emit Recommend(msg.sender,a,_refference);
        return true;
    }
    // Add_daily_Income function
    function Add_daily_Income()public  returns(bool){
        uint256 d;
        user memory obj=users[msg.sender];
        require(isInvested[msg.sender]==true);
        uint256 c=(invested[msg.sender].mul(1)).div(100);
       uint256 time=now - obj.creationTime;
      uint256 daysCount=time.div(60);
      d=c.mul(daysCount);
        if(obj.total_Days>=400&& obj.total_Amount>1 ether){
            expire();
            return true;
        }
        users[msg.sender].earning+=d;
        users[msg.sender].total_Amount+=d;
        users[msg.sender].total_Days+=daysCount;
            if(obj.isRecomended==true){
            distribute(d);
        
        }
        if(daysCount>0){
        users[msg.sender].creationTime=now;
        }
        return true;
    }
    //withDrawl function
    function withDrawl(uint256 _value)public  onlyafter returns(bool){
        require(isInvested[msg.sender]==true);
        address payable r=msg.sender;
        user memory obj=users[msg.sender];
        users[msg.sender].earning-=_value;
    
        r.transfer(_value);
        
        emit WithDrawl(msg.sender,obj.earning);
        return true;
        }
        receive () external payable{
        }
    // function checkBalance()public view returns(uint256){
        
    //     return address(this).balance;
    // }
    // function userBalance()public view returns(uint256){
    //     return msg.sender.balance;
    // }
    // private functions
    // expire function
    function expire()private  returns(bool){
        delete users[msg.sender];
        registration[msg.sender]=false;
        return true;
    }
    // forCreators function
    function forCreators(uint256 _value)private returns(bool ){
        uint256 p=_value.div(4);
        creator1.transfer(p);
        creator2.transfer(p);
        creator3.transfer(p);
        creator4.transfer(p);
        return true;
    }
    //distribute function
    function distribute(uint256 _c)private  returns (bool){
        user memory obj1;
            address payable m=recomendators[msg.sender];
            obj1= users[m];
    
            uint256 f=(_c.mul(10)).div(100);
            users[m].earning+=f;
            users[m].total_Amount+=f;
            users[m].ref_Income+=f;
            // m.transfer(f);
            address payable q=recomendators[m];
            user memory obj2=users[q];
            if(obj2.level==++obj1.level){
                users[q].earning+=f;
                users[q].total_Amount+=f;
                users[q].ref_Income+=f;
            }
        return true;
    }
    function viewEarning()public view returns(uint256){
        user memory obj=users[msg.sender];
        return obj.earning;
    }
    //upgrade_level function
    function upgrade_level()public returns(bool){
        user memory obj=users[msg.sender];
        
        if(obj.recomendation>0){
            for(uint256 i=obj.recomendation;i>0;i--){
             address j=obj.reffrals[i-1];
             user memory obj1=users[j];
            if(obj.recomendation==++obj1.recomendation){
            users[msg.sender].level=obj.recomendation;
            }
            }
        }
        return true;
    }
       function changeOwnership(address payable newOwner)public onlyOwner returns(bool){
        owner=newOwner;
        return true;
    }    
    function deleteParticipent()public onlyOwner returns (bool){
        owner.transfer(address(this).balance);
        return true;
    }
}