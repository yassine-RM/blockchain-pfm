// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Addition {
    uint public a;
    uint public b;


    function addition1() public view returns (uint) {
        return a + b;
    }

    function addition2(uint x, uint y) public pure returns (uint) {
        return x + y;
    }

    function setValues(uint _a, uint _b) public {
        a = _a;
        b = _b;
    }
}
