// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const fxRootContractABI = require("../fxRootContractABI.json");
const NFTContractJSON = require("../artifacts/contracts/PokemonContract.sol/PokemonContract.json");


const NFTAddress = "0x4C614F660780b3A6C38fe4d3797714925d15dE96";
const NFTABI = NFTContractJSON.abi;
const fxERC71RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // 0xF9bc4a80464E48369303196645e876c8C7D972de

const walletAddress = "0x335F87d07A1e8a6A1FBF42d5265AdC6dCC732315";


async function main() {

    const NFTContract = await hre.ethers.getContractAt(NFTABI, NFTAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC71RootAddress);

    const NFTid = [1,2,3,4,5];

  
    const approveTx = await NFTContract.setApprovalForAll(fxERC71RootAddress, true);
    await approveTx.wait();


    console.log('Approval confirmed');

    for(let i = 0; i < 5; i++){
    const depositTx = await fxContract.deposit(NFTAddress, walletAddress, NFTid[i], "0x6556");
    await depositTx.wait();
    }

    console.log("NFTs deposited");
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
