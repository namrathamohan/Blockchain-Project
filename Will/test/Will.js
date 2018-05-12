const Will = artifacts.require('./Will.sol');


// All the accounts in testrpc will have 100 ethers(100000000000000000000 wei) by default. We are deploying the contract using the address web3.eth.accounts[0] with initial value of 3 ethers deployed into the contract. On successful execution the defined value of 500 wei should be transferred to the target address. 

const will = Will.deployed();

contract('test1', function() {

          //contract deployed with initial details


	it("Son should get the money. Both the passwords are correct and is within the deadline.", function(){
    		return will.then(instance=>{
		
   			return instance.withdraw("abc","xyz",web3.eth.accounts[1],web3.eth.accounts[2]).then(result=>{
				 
				sonBalance = web3.eth.getBalance(web3.eth.accounts[1]);
				console.log("Balance in Sons account = ", +sonBalance);
				assert.equal(+sonBalance === 130000000000000000000,true,"Expected Money is not transferred to son"); 
   				
     			});
   		});
  	});		

})


contract('test2', function() {

	it("NGO should get the money. One or both the passwords are incorrect.", function(){
    		return will.then(instance=>{
		
   			return instance.withdraw("abc","def",web3.eth.accounts[1],web3.eth.accounts[2]).then(result=>{
				
				ngoBalance = web3.eth.getBalance(web3.eth.accounts[2]);
				console.log("Balance in NGOs account = ",+ngoBalance); 
   				assert.equal(+ngoBalance === 130000000000000000000,true,"Expected money is not transferred to NGO");
     			});
   		});
  	});



})
