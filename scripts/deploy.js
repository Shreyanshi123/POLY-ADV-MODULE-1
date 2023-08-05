const hre = require("hardhat");

async function main() {
  // Deploy the contract with constructor arguments
  const PokemonContract = await hre.ethers.getContractFactory("PokemonContract");
  const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmYTkrE8PaLvTaG5NNM7Q5DPFXEA5Pzb4CkuES1D6DK3YK/?_gl=1*1yv469*_ga*Mjg2NTM3OTMuMTY5MTE4MjQxNQ..*_ga_5RMPXG14TE*MTY5MTI2ODYwMy41LjEuMTY5MTI2OTA1MC42MC4wLjA."; // Replace this with your desired base URI

  // Deploy the contract
  const contract = await PokemonContract.deploy("Pokemon NFT", "PNFT", baseTokenURI);
  await contract.deployed();

  console.log("PokemonContract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
