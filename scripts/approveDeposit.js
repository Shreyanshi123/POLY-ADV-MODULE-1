// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const fxRootContractABI = require("../fxRootContractABI.json");
const NFTContractJSON = require("../artifacts/contracts/PokemonContract.sol/PokemonContract.json");

const NFTAddress = "0x40b09C149f873C87f436610f813A116f39c02FA9"; // place your erc71 contract address here
const NFTABI = NFTContractJSON.abi;
const fxERC71RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // 0xF9bc4a80464E48369303196645e876c8C7D972de
const walletAddress = "0xBEefDB19e5B0B50F8b0D403c89F381432035f932"; // place your public address for your wallet here

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