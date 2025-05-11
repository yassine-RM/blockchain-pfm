pragma solidity ^0.8.0;

contract Payment {
    address public recipient;

    function setRecipient(address _recipient) public {
        recipient = _recipient;
    }

    receive() external payable {}

    function withdraw() public {
        require(msg.sender == recipient, "Only the recipient can withdraw funds.");
        payable(recipient).transfer(address(this).balance);
    }
}
