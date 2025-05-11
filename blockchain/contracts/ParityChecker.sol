pragma solidity >=0.4.22 <0.9.0;

contract ParityChecker {
    function estPair(int number) public pure returns (bool) {
        return number % 2 == 0;
    }
}
