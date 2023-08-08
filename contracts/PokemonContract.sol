// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PokemonContract is ERC721Enumerable, Ownable {
    // The base URI for metadata of the tokens
    string private constant BASE_TOKEN_URI = "https://gateway.pinata.cloud/ipfs/QmYTkrE8PaLvTaG5NNM7Q5DPFXEA5Pzb4CkuES1D6DK3YK/?_gl=1*1yv469*_ga*Mjg2NTM3OTMuMTY5MTE4MjQxNQ..*_ga_5RMPXG14TE*MTY5MTI2ODYwMy41LjEuMTY5MTI2OTA1MC42MC4wLjA.";

    // Prompt used to generate the 5 images using DALL-E 2 or Midjourney
    string private constant PROMPT_DESCRIPTION = "Unleash the Power of Pokemons - Catch, Train, and Battle!";

    // Pokemon data structure
    struct Pokemon {
        string name;
        string description;
        string imageURI;
        string elementType;
    }

    // Mapping to store Pokemon data for each token ID
    mapping(uint256 => Pokemon) private _pokemonData;

    // The base URI for metadata of the tokens
    string private baseTokenURI;

    constructor() ERC721("Pokemon", "POK") {
        // Set the base token URI
        baseTokenURI = BASE_TOKEN_URI;
    }

    // Mint a new Pokemon NFT
    function mintPokemon(
        address to,
        string memory pokemonName,
        string memory description,
        string memory imageURI,
        string memory elementType
    ) external onlyOwner {
        uint256 newTokenId = totalSupply();
        _mint(to, newTokenId);

        // Store Pokemon data for the token ID
        _pokemonData[newTokenId] = Pokemon(pokemonName, description, imageURI, elementType);
    }

    // Get Pokemon data for a specific token ID
    function getPokemonData(uint256 tokenId) external view returns (Pokemon memory) {
        require(_exists(tokenId), "Token ID does not exist");
        return _pokemonData[tokenId];
    }

    // Override the _baseURI function to return the base URI
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    // Update the base token URI
    function updateBaseTokenURI(string memory newBaseTokenURI) external onlyOwner {
        baseTokenURI = newBaseTokenURI;
    }

    // Get the hardcoded prompt description
    function getPromptDescription() external pure returns (string memory) {
        return PROMPT_DESCRIPTION;
    }
}
