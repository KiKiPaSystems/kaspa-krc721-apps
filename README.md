### README: Deploy and Mint KRC-721 Tokens on Kaspa

#### Overview

This repository provides two scripts, `deploy.ts` and `mint.ts`, designed to serve as a **tutorial** for interacting with the **KRC-721 standard** on the Kaspa network. KRC-721 is a framework for creating and managing non-fungible tokens (NFTs) that leverages Kaspa’s high-performance Proof of Work network.

These scripts demonstrate how to:
- **`deploy.ts`**: Deploy a new KRC-721 collection.
- **`mint.ts`**: Mint tokens from an existing KRC-721 collection.

⚠️ **Disclaimer**:  
- These apps are for tutorial purposes only. They are **not production-ready**, and their use requires a good understanding of the Kaspa network.
- I am not responsible for any outcomes that may result from using these scripts.
- I do not recommend or endorse any project, and this is **not financial advice**.

---
## Install required packages

This project was created using `bun init` in bun v1.0.31. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
```bash
  bun install
```  

## Download Kaspa WASM
You can download the latest form here: https://kaspa.aspectron.org/nightly/downloads/
move `nodejs` to the repo folder as `wasm`

### Getting Started

#### Prerequisites
1. **Private Key**: A valid Kaspa private key for signing transactions.
2. **Kaspa Network**: By default, the scripts use `testnet-10`.
3. **Sufficient Funds**: Ensure the wallet has enough KAS to cover transaction fees.
4. **Indexer and Protocol Specifics** are here: https://testnet-10.krc721.stream/docs

---

### Usage

#### Deploy a KRC-721 Collection
The `deploy.ts` script demonstrates how to deploy a new KRC-721 collection by specifying a ticker, metadata, and optional royalty details.

**Example Command:**
```bash
bun deploy.ts --privKey abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef1234 \
  --image "ipfs://bafybeihashforsampleimage" \
  --ticker TUTORIAL1
```

**Key Flags:**
- `--privKey` (required): Your Kaspa private key.
- `--image` (required): IPFS URL of the NFT’s image.
- `--ticker` (required): A unique ticker for the collection.
- `--royaltyFee` (optional): Royalty percentage (default: `100` = 1%).
- `--royaltyOwner` (optional): Wallet address to receive royalties.

**Output:**
- Commit transaction hash.
- Reveal transaction hash.
- Confirmation of successful deployment.

---

#### Mint Tokens from a Collection
The `mint.ts` script shows how to mint tokens from a previously deployed collection.

**Example Command:**
```bash
bun mint.ts --privKey abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef1234 \
  --ticker TUTORIAL1
```

**Key Flags:**
- `--privKey` (required): Your Kaspa private key.
- `--ticker` (required): The ticker of the deployed collection.
- `--loops` (optional): Number of tokens to mint (default: `1`).

**Output:**
- Commit transaction hash.
- Reveal transaction hash.
- Confirmation of successful minting.

---

### Example Workflow

1. **Deploy a Collection:**
   ```bash
   bun deploy.ts --privKey abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef1234 \
     --image "ipfs://bafybeihashforsampleimage" \
     --ticker DEMO721
   ```

2. **Mint Tokens:**
   ```bash
   bun mint.ts --privKey abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef1234 \
     --ticker DEMO721
   ```

---

### Features of KRC-721
- **Decentralization**: Powered by Kaspa’s Proof of Work network.
- **Flexible Metadata**: Metadata can be stored on-chain or off-chain via IPFS.
- **Royalty Support**: Optionally configure royalties for secondary sales.
- **Commit-and-Reveal Process**: Ensures secure operations.
- **Indexer API**: Confirm deployment and minting results via the KRC-721 Indexer API.

---

### Troubleshooting
- **Deployment Issues**: Use the KRC-721 Indexer API to verify if the deployment was successfully indexed.
- **Timeout Errors**: Ensure your wallet has sufficient UTXOs to cover fees.
- **Data Format Issues**: Double-check your `deploy.ts` input parameters to ensure proper formatting.
- **Issues with lenght of the script**:
```
[2025-01-19T21:02:17.955Z] [DEBUG] Main: Transaction with revealUTX0s signed with ID: f455b8d62d749b87defc5bf7dc9b66604cd88078e8ca7bcc03b19bb7f722b32d
error: adding a data element of 526 bytes exceed the maximum allowed script element size of 520
```
Solution: remove data from the attributes/metadata or move the metadata to IPFS
---

### Notes
- These scripts are **tutorial-only** and not optimized for production use.
- **Not financial advice**: The use of these scripts or any related projects is entirely at your own risk. Understand the Kaspa network before proceeding.

Happy experimenting with Kaspa’s KRC-721! 🚀