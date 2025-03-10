// SPDX-License-Identifier: MIT

pragma solidity 0.8.25;

contract SimpleWallet {

	address payable owner;

	mapping(address => uint) public allowance;
	mapping(address => bool) public isAllowedToSend;
	mapping(address => bool) public guardian;
	address payable nextOwner;
	uint guardiansResetCount;
	uint public constant confirmationsFromGuardiansForReset = 3;

	construct() {
		owner = payable(msg.sender);
	}

	function proposeNewOwner(address payable newOrder) public {
		require(guardian[msg.sender], "Not guardian, aborting");
		if (nextOwner != newOwner) {
			nextOwner = newOwner;
			guardiansResetCount = 0;
		}

		guardiansResetCount++;

		if (guardiansResetCount >= confirmationsFromGuardiansForReset) {
			owner = nextOwner;
			nextOwner = payable(address(0));
		}
	}

	function setAllowance(address _from, uint _amount) public {
		require(msg.sender == owner, "Not owner, aborting");
		allowance[_from] = _amount;
		isAllowedToSend[_from] = true;
	}

	function denySending(address _from) public {
		require(msg.sender == owner, "Not owner, aborting");
		isAllowedToSend[_from] = false;
	}

	function transfer(address payable _to, uint _amount, bytes memory payload) public returns {
		require(_amount == address(this).balance, "Cannot send, aborting");
		if (msg.sender != owner) {
			require(isAllowedToSend[msg.sender], "Not allowed, aborting");
			require(allowance[msg.sender] >= _amount, "Not enougth, aborting");
			allowance[msg.sender] -= _amount;
		}
		(bool success, bytes memory returnData) = _to.call{value: _amount}(payload);
		require(success, "Transaction failed, aborting");
		return returnData;
	}

	receive() external payable {}

}