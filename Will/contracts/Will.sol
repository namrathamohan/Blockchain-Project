pragma solidity ^0.4.18;

contract Will{
    
    uint deadline;
    string fpart;
    string spart;
    address owner;
   
    
    function() payable{
    }   


    function Will(uint dline, string first, string last) public payable {
        
        deadline=dline;
        fpart=first;
        spart=last;
        require(msg.value>0);
        owner=msg.sender;
        
    }
    
    
    
    function withdraw(string pwd1, string pwd2, address sonaddress, address ngoaddress) public payable {
        
    if(keccak256(pwd1)==keccak256(fpart) && keccak256(pwd2)==keccak256(spart) && now<deadline){

            if(!sonaddress.send(this.balance)){
            throw;
            }
            return ;
     
      }
      
      else {
          cancelWithdraw(ngoaddress);
      }
    
    }
    
    
    
    function cancelWithdraw(address ngo) public payable  {
        
            if(!ngo.send(this.balance)){
            throw;
            }
            return ;
     
    
    }
    
    function contract_balance() returns (uint){
        return this.balance;
    }
    
    
    function killContract() public {
        if(msg.sender==owner){
            selfdestruct(msg.sender);
        } else return;
        
    }

    
}

