# NFT Mint Project - Metaplex Core

Imagine you're an artist who just created an amazing piece of digital art. You want to share it with the world, prove ownership, and maybe even trade it with other creators. But the process seems complicated - you need to understand blockchain technology, wallet management, and complex smart contracts.

That's where this project comes in.

This is a simple yet powerful Node.js application that allows anyone to mint their own NFTs on the Solana blockchain using Metaplex Core. Whether you're creating digital art, collectibles, or unique tokens, this tool makes the minting process straightforward. Just provide your asset details - name, description, image URL - and the application handles all the blockchain complexity for you.

We built this as part of a learning journey to understand how NFTs work at a fundamental level, from creating the digital asset to recording it permanently on the blockchain. The goal? To demystify NFT creation and make it accessible to everyone.

## Features

- 🖼️ **Image Upload**: Upload NFT images to decentralized storage (Arweave via Irys)
- 📝 **Metadata Management**: Create rich metadata with custom attributes and properties
- 🪙 **NFT Minting**: Mint NFTs on Solana using Metaplex Core
- 🔄 **Transfer Functionality**: Transfer NFTs between wallets
- 🏗️ **Modular Architecture**: Clean, organized codebase with separation of concerns
- 🔒 **Type-Safe**: Built with TypeScript for better developer experience

## Project Structure

```
nft-mint/
├── src/
│   ├── assets/              # NFT image assets
│   │   ├── cool-bear-cash.png
│   │   ├── cool-bear-cyber.png
│   │   ├── cool-bear-rich.png
│   │   └── cool-bear-tug.png
│   ├── config/
│   │   └── umi.ts          # UMI instance configuration and keypair loading
│   ├── upload/
│   │   ├── image.ts        # Image upload functionality
│   │   └── metadata.ts     # Metadata upload and structure
│   ├── nft/
│   │   ├── create.ts       # Main orchestration function
│   │   ├── mint.ts         # NFT minting logic
│   │   └── transfer.ts     # NFT transfer functionality
│   └── index.ts            # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

### Module Breakdown

- **`config/umi.ts`**: Sets up the UMI instance with Solana devnet connection, Metaplex Core plugin, and Irys uploader. Handles keypair loading from wallet file.

- **`upload/image.ts`**: Handles reading image files from disk and uploading them to Arweave via Irys. Returns the decentralized URI for the uploaded image.

- **`upload/metadata.ts`**: Creates and uploads NFT metadata following the Metaplex standard. Supports custom attributes, properties, and external URLs.

- **`nft/mint.ts`**: Core minting logic that creates the NFT asset on-chain using Metaplex Core's `create` function.

- **`nft/transfer.ts`**: Enables transferring NFT ownership to another wallet address with retry logic for on-chain availability.

- **`nft/create.ts`**: Orchestrates the entire NFT creation flow: image upload → metadata upload → minting → returns transaction details.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.17.0 or higher)
- Solana CLI configured with a keypair
- A wallet file at `~/.config/solana/id.json`

### Installation

```bash
# Install dependencies
pnpm install

# Run the project
pnpm dev

# Build for production
pnpm build
```

### Configuration

Update the wallet path in `src/config/umi.ts` if your Solana keypair is located elsewhere:

```typescript
import wallet from "/path/to/your/wallet.json" with { type: "json" };
```

### Usage Example

```typescript
import { createNft } from "./nft/create.js";

createNft({
  imagePath: "./src/assets/cool-bear-cash.png",
  fileName: "cool-bear-cash.png",
  name: "Cool Bear #001",
  description: "A flashy pink bear dripping in love and cash.",
  externalUrl: "https://cool-bear.com",
  attributes: [
    { trait_type: "Background", value: "Pink" },
    { trait_type: "Fur Color", value: "Bubblegum Pink" },
    { trait_type: "Mood", value: "Playful" },
  ],
});
```

## Screenshot & Results

After successfully minting an NFT, the application outputs transaction details and explorer links:

```
NFT Created
View Transaction on Solana Explorer
[https://explorer.solana.com/tx/[SIGNATURE]?cluster=devnet](https://explorer.solana.com/tx/4xg13DiL5RtcFBmkCZTW9mzkUa99R6vv1fvLqFcpzB6DuU39WZDY2mZbKWh7TxpSzABruTyEb4WE64RBw5kTSwTd?cluster=devnet)


View NFT on Metaplex Explorer
[https://core.metaplex.com/explorer/[ASSET_PUBLIC_KEY]?env=devnet](https://core.metaplex.com/explorer/AYjXjkVpDAizzqdZPLEdFKvx946LgfCknuMqyEyPRUWB?env=devnet)
```
<img width="2880" height="1572" alt="image" src="https://github.com/user-attachments/assets/5a2d9251-ae63-48cd-8f9b-7541b807627f" />

<img width="2880" height="1572" alt="image" src="https://github.com/user-attachments/assets/f41b52ee-0aa4-40fc-8d55-ead70d8c5d67" />



## Problems with Current P2P Trading & Solutions
After minting NFTs and trading them directly in Discord, we found two major problems:

### Problem 1: No Trust = No Trade
#### What's Wrong:
When you trade NFTs directly, someone has to send first. If Alice sends her NFT to Bob, Bob could just... not send his back. Alice loses her NFT with no way to get it back.

Simple Solution: Escrow Smart Contract
Think of it like a secure lockbox:

- Both people put their NFTs in the lockbox
- Both people confirm they're happy with the trade
- The lockbox swaps the NFTs at the exact same time
- If someone backs out, everyone gets their NFT back


Why This Works:

- Nobody can steal - both NFTs are locked until swap happens
- Everything happens at once (atomic)
- If deal falls through, automatic refunds


### Problem 2: No Idea What Things Are Worth
### What's Wrong:
Without a marketplace, you don't know if your NFT is worth 1 SOL or 100 SOL. You're trading blind.

Simple Solution: Basic Marketplace with Price History

Build a simple site where people can:

- List their NFT with a price (or accept offers)
- See what others sold for - "Similar NFTs sold for 5-10 SOL last week"
- Browse available NFTs instead of asking around in Discord


Why This Works:

- Everyone sees the same prices (transparency)
- Historical data helps set fair prices
- No more guessing or getting ripped off
- Faster trades - no endless negotiation
