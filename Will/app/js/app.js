const Promise = require("bluebird");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
const willJson = require("../../build/contracts/Will.json");
require("file-loader?name=../index.html!../index.html");


if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

  web3.eth.getTransactionReceiptMined = require("./utils.js");


function sequentialPromise(promiseArray) {
    const result = promiseArray.reduce(
        (reduced, promise, index) => {
            reduced.results.push(undefined);
            return {
                chain: reduced.chain
                    .then(() => promise)
                    .then(result => reduced.results[ index ] = result),
                results: reduced.results
            };
        },
        {
            chain: Promise.resolve(),
            results: []
        });
    return result.chain.then(() => result.results);
}
sequentialPromise([
    Promise.resolve(web3.eth), Promise.resolve({ suffix: "Promise" })
]).then(console.log);
web3.eth.getAccountsPromise = function () {
    return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function (e, accounts) {
            if (e != null) {
                reject(e);
            } else {
                resolve(accounts);
            }
        });
    });
};



const Will = truffleContract(willJson);
Will.setProvider(web3.currentProvider);
//Set default account to be used
Will.defaults({
    from  :web3.eth.accounts[0]
}
)

window.addEventListener('load', function() {
  //submit is button id, willfunc is the function that will be executed when button is pressed
  //After successful execution of willfunc the pages is reloaded to update the value in UI
       $("#submit").click(function(){
      return   willfunc().then(updated=>{
        window.location.reload();

      });
       });

         UserInterface();


});


const UserInterface = function(){
  let deployed;
  return Will.deployed()
      .then(_deployed => { //get instance of the contract
          deployed = _deployed;

            return _deployed.contract_balance.call().then(r => {
              
              $("#balance1").html("Balance in Son Account is " +web3.eth.getBalance(web3.eth.accounts[1]));
       
           
              $("#balance2").html("Balance in NGO Account is " +web3.eth.getBalance(web3.eth.accounts[2]));


	      $("#sonaddress").html("Son's address is " +web3.eth.accounts[1]);
       
           
              $("#ngoaddress").html("NGO's address is " +web3.eth.accounts[2]);

	      
	      $("#contval").html("Value in the Contract: "+ r);

           });



          

       });

}


//Function that will be executed when button is pressed
const willfunc = function() {
  return Will.deployed().then(_deployed=>{
    deployed = _deployed;
      return deployed.withdraw($("input[name='fpwd']").val(),$("input[name='spwd']").val(),$("input[name='sonaddress']").val(),web3.eth.accounts[2]);

  });


};
