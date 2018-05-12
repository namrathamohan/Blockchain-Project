var Migrations = artifacts.require("./Migrations.sol");
var Will = artifacts.require("./Will.sol");

module.exports = function(deployer) {
        deployer.deploy(Migrations);  
	deployer.deploy(Will,1623985848,"abc","xyz",{from: web3.eth.accounts[0],value:30000000000000000000});
};



