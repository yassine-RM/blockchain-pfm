# TP 3 — Bases du langage Solidity

**Année Universitaire:** 2024/2025  
**Filière:** MUS IIIA, S2  
**Module:** Sécurité et Technologies Blockchain  
**Professeur:** M. OUALLA

---

## Description

Ce TP a pour objectif d'introduire les bases du langage Solidity à travers une série d'exercices pratiques. Les étudiants apprendront à manipuler les types de données fondamentaux, à interagir avec les fonctions globales comme `msg.sender` et `msg.value`, et à explorer la programmation orientée objet avec Solidity.

---

## Exercices

### ⚙️ Exercice 1 : Addition de Nombres

- Contrat avec deux variables d'état.
- Fonction `addition1()` (view) : retourne la somme des deux variables.
- Fonction `addition2()` (pure) : prend deux paramètres et retourne leur somme.

---

### 💱 Exercice 2 : Conversion Ether/Wei

- Contrat sans variables d'état.
- Fonction `etherEnWei(uint montant)` → retourne `montant * 1 ether`.
- Fonction facultative `weiEnEther(uint montant)` → retourne `montant / 1 ether`.

---

### 🧵 Exercice 3 : Gestion des Chaînes

- Contrat `GestionChaines` :
  - Variable d’état `message` (string).
  - `setMessage()`, `getMessage()`.
  - `concatener(string a, string b)` → retourne `string.concat(a, b)`.
  - `concatenerAvec(string other)` → concatène `message` avec `other`.
  - `longueur(string s)` → retourne `bytes(s).length`.
  - `comparer(string a, string b)` → retourne `bool`.

---

### 🔢 Exercice 4 : Vérification de Positivité

- Fonction `estPositif(int x)` → retourne `true` si `x >= 0`.

---

### ⚖️ Exercice 5 : Vérification de Parité

- Fonction `estPair(uint x)` → retourne `true` si `x % 2 == 0`.

---

### 📊 Exercice 6 : Somme d’un Tableau

- Tableau `uint[] nombres` initialisé dans le constructeur.
- `ajouterNombre(uint)` pour ajouter un élément.
- `getElement(uint index)` → retourne l'élément, avec `require`.
- `afficheTableau()` → retourne tous les éléments.
- `calculerSomme()` → retourne la somme du tableau.

---

### 🧱 Exercice 7 : Programmation Orientée Objet

- Contrat abstrait `Forme` :
  - `uint public x, y`
  - Constructeur
  - `deplacerForme(uint dx, uint dy)`
  - `afficheXY()` → retourne (x, y)
  - `afficheInfos()` (virtuelle pure) → "Je suis une forme"
  - `surface()` (virtuelle)

- Contrat `Rectangle` hérite de `Forme` :
  - Variables `lo`, `la`
  - Constructeur `(x, y, lo, la)`
  - Implémente `surface()` → lo * la
  - Redéfinit `afficheInfos()` → "Je suis Rectangle"
  - `afficheLoLa()` → retourne (lo, la)

---

### 💸 Exercice 8 : Paiement avec Solidity

- Contrat `Payment` :
  - Variable `recipient` (type `address`)
  - **Constructeur** → initialise `recipient`
  - `receivePayment()` (payable) → `require(msg.value > 0)`
  - `withdraw()` :
    - `require(msg.sender == recipient)`
    - `payable(recipient).transfer(address(this).balance)`

---

## 🔧 Technologies Utilisées

- Solidity (version ^0.8.0)
- Reactjs
- Tailwindcss
- Docker
- Truffle
- Ganache pour simuler le réseau Ethereum local

---

## ✅ Objectifs Pédagogiques

- Comprendre les variables d’état et les fonctions Solidity.
- Appliquer les fonctions `payable`, `msg.sender`, `msg.value`.
- Manipuler les types de base (`uint`, `string`, `bool`, `address`, etc.).
- Utiliser les tableaux dynamiques et les fonctions `require()`.
- Explorer la programmation orientée objet en Solidity.

---

## 📁 Structure Recommandée du Projet

