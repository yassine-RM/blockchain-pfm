// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Forme {
    uint public x;
    uint public y;

    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }

    function deplacerForme(uint dx, uint dy) public {
        x += dx;
        y += dy;
    }

    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }

    function afficheInfos() public view virtual returns (string memory);

    function surface() public view virtual returns (uint);
}

contract Rectangle is Forme {
    uint public longueur;
    uint public largeur;

    constructor(uint _x, uint _y, uint _longueur, uint _largeur) Forme(_x, _y) {
        longueur = _longueur;
        largeur = _largeur;
    }

    function surface() public view override returns (uint) {
        return longueur * largeur;
    }
    
    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }


    function afficheLoLa() public view returns (uint, uint) {
        return (longueur, largeur);
    }
}
