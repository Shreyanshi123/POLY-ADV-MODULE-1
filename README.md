## ERC721 Goerli to Mumbai Bridge Using fxPortal

This repository also contains a Solidity file for transferring NFTs over the fxPortal Bridge from Goerli to the Mumbai Testnet. Hardhat scripts are utilized for deploying, minting, approving, and depositing the NFTs from Goerli to Mumbai.


# Pokemon NFT Contract

**Pokemon NFT Contract** is an Ethereum smart contract that allows you to mint and manage Pokemon-themed NFTs (Non-Fungible Tokens). Each token represents a unique Pokemon with associated metadata, including name, description, image URI, and elemental type.


### Functions

- **mint:** A Hardhat script is used for minting NFTs. In this project, the NFTs are minted all at once.
- **approveDeposit:** This Hardhat script is used to approve the transfer of tokens and deposit them on the Mumbai Testnet.
- **getBalance:** This script is used to return the balance of the specified wallet address.
- **_promptDescription:** This function returns the prompt used to generate the images.

### Steps

1. **Install:** Run the following command to install the dependencies:

   ```bash
   npm install
   ```

2. **Compile:** Compile your contract and generate the JSON files:

   ```bash
   npx hardhat compile
   ```

   This step compiles your contract and generates the necessary artifacts.

3. **Deploy on Goerli Testnet:** Ensure that `hardhat.config.js` contains the URL and private key for deployment. Deploy the contract on the Ethereum Goerli Testnet:

   ```bash
   npx hardhat run scripts/deploy.js --network goerli
   ```

   This script deploys the contract on the Ethereum Goerli Testnet and generates the contract address. Copy the contract address for later use.

4. **Verify:** Optionally, you can verify and publish your contract on the Etherscan Goerli Testnet using the following command:

   ```bash
   npx hardhat verify your_contract_address --network goerli
   ```

   This step is not necessary but can help with contract transparency.

5. **Mint NFTs on Goerli Testnet:** Note that the contract address and wallet address must be provided to the `mint.js` script. Mint the NFTs to your wallet address on the Goerli Testnet:

   ```bash
   npx hardhat run scripts/mint.js --network goerli
   ```

   This script mints the NFTs to your specified wallet address.

6. **Approve and Deposit To Mumbai Testnet:** Provide the contract address, wallet address, and `fxERC721RootAddress` to the `approveDeposit.js` script. This script approves and bridges the NFTs from Goerli to the Mumbai Testnet:

   ```bash
   npx hardhat run scripts/approveDeposit.js --network goerli
   ```

7. **Get Balance of Mumbai Testnet:** Provide the contract address of NFT deployment and the wallet address to the `getBalance.js` script. This script fetches the balance of your wallet from the Mumbai Testnet and displays it on the screen:

   ```bash
   npx hardhat run scripts/getBalance.js --network mumbai
   ```

## Author
Shreyanshi Mishra shreyanshimishra7689@gmail.com

