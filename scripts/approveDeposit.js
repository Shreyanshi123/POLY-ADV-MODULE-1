// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/PokemonContract.sol/PokemonContract.json");

const tokenAddress = "0x9C0Ccb3efB9be5E4E595827e93053E9b2dF10a85";
const tokenABI = tokenContractJSON.abi;
const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0x335F87d07A1e8a6A1FBF42d5265AdC6dCC732315";
async function main() {

  const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);
  for (let i = 0; i < 5; i++) {
    const approveTx = await tokenContract.approve(fxERC721RootAddress, i);
    await approveTx.wait();
    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, i, "0x6556");
    await depositTx.wait();

    console.log('Approval confirmed');
    console.log("Tokens deposited");
  }



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
