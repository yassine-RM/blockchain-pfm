pragma solidity >=0.4.22 <0.9.0;

contract NumbersSum {
    uint[] public nombres;

    function ajouterNombre(uint number) public {
        nombres.push(number);
    }

    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    function calculerSomme() public view returns (uint sum) {
        for (uint i = 0; i < nombres.length; i++) {
            sum += nombres[i];
        }
    }
}
