// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Payment {
    address public recipient;

    event RecipientSet(address indexed recipient);
    event PaymentReceived(address indexed from, uint amount);
    event Withdrawal(address indexed to, uint amount);

    // Set the recipient address
    function setRecipient(address _recipient) public {
        require(_recipient != address(0), "Invalid address");
        recipient = _recipient;
        emit RecipientSet(_recipient);
    }

    // Receive ether payments
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    // Withdraw funds to the recipient
    function withdraw() public {
        require(recipient != address(0), "Recipient not set");
        require(msg.sender == recipient, "Only recipient can withdraw");
        uint amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");

        payable(recipient).transfer(amount);
        emit Withdrawal(recipient, amount);
    }
    function deposit() public payable {
        emit PaymentReceived(msg.sender, msg.value);
    }

    // View contract balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}