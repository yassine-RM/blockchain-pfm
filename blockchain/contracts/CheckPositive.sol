pragma solidity >=0.4.22 <0.9.0;

contract CheckPositive {
    function estPositif(int number) public pure returns (bool) {
        return number >= 0;
    }
}
