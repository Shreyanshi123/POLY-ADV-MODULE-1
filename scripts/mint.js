const hre = require("hardhat");
require('dotenv').config()

const NFTAddress = "0x4C614F660780b3A6C38fe4d3797714925d15dE96";

// Replace "YourContractClassName" with the actual contract class name
const NFTContractClass = "PokemonContract"; // Example: "PokemonContract"

// Replace "YOUR_WALLET_ADDRESS" with your actual Ethereum address
const walletAddress = "0x335F87d07A1e8a6A1FBF42d5265AdC6dCC732315"; // Example: "0x1234567890123456789012345678901234567890"

async function main() {
  const NFT = await hre.ethers.getContractAt(NFTContractClass, NFTAddress);

  for (let i = 0; i < 5; i++) {
    const tx = await NFT.mintPokemon(
      walletAddress,
      "PokemonName" + i,      // Unique name for each NFT
      "Description" + i,      // Unique description for each NFT
      "ImageURI" + i,         // Unique image URI for each NFT
      "ElementType" + i       // Unique element type for each NFT
    );

    await tx.wait();
  }

  console.log("You now have: " + await NFT.balanceOf(walletAddress) + " nfts");

  console.log("Prompt: ", await NFT.getPromptDescription());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
