// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PokemonContract is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // The base URI for metadata of the tokens
    string private baseTokenURI;

    // Pokemon data structure
    struct Pokemon {
        string name;
        string description;
        string imageURI;
        string elementType;
        uint256 level;
        bool specialAbilityActive;
    }

    // Mapping to store Pokemon data for each token ID
    mapping(uint256 => Pokemon) private _pokemonData;

    // Mapping to store if a Pokemon has been minted or not
    mapping(string => bool) private _mintedPokemons;

    // Prompt used to generate the 5 images using DALL-E 2 or Midjourney
    string private constant promptDescription = "Unleash the Power of Pokemons - Catch, Train, and Battle!";

    constructor(string memory _name, string memory _symbol, string memory _baseTokenURI) ERC721(_name, _symbol) {
        baseTokenURI = _baseTokenURI;
    }

    // Mint a new Pokemon NFT
    function mintPokemon(
        address to,
        string memory pokemonName,
        string memory description,
        string memory imageURI,
        string memory elementType
    ) external onlyOwner {
        require(!_mintedPokemons[pokemonName], "Pokemon already minted");
    uint256 newTokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _mint(to, newTokenId);

    // Store Pokemon data for the token ID
    _pokemonData[newTokenId] = Pokemon(pokemonName, description, imageURI, elementType, 1, false);

    _mintedPokemons[pokemonName] = true;
    }

    // Get Pokemon data for a specific token ID
    function getPokemonData(uint256 tokenId) external view returns (Pokemon memory) {
        require(_exists(tokenId), "Token ID does not exist");
        return _pokemonData[tokenId];
    }

    // Activate special ability for a Pokemon
    function activateSpecialAbility(uint256 tokenId) external {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "You don't own this Pokemon");
        _pokemonData[tokenId].specialAbilityActive = true;
    }

    // Deactivate special ability for a Pokemon
    function deactivateSpecialAbility(uint256 tokenId) external {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "You don't own this Pokemon");
        _pokemonData[tokenId].specialAbilityActive = false;
    }

    // Override the _baseURI function to return the base URI
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    // Update the base token URI
    function updateBaseTokenURI(string memory newBaseTokenURI) external onlyOwner {
        baseTokenURI = newBaseTokenURI;
    }

    // Get the hardcoded prompt used to generate the 5 images using DALL-E 2 or Midjourney
    function getPromptDescription() external pure returns (string memory) {
        return promptDescription;
    }
}
