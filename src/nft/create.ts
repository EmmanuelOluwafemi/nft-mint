import { loadKeypairToUmi } from "../config/umi.js";
import { uploadImage } from "../upload/image.js";
import { uploadMetadata, type MetadataAttributes } from "../upload/metadata.js";
import { mintNft } from "./mint.js";

export async function createNft(options?: {
  imagePath?: string;
  fileName?: string;
  name?: string;
  description?: string;
  externalUrl?: string;
  attributes?: MetadataAttributes[];
}) {
  const umi = loadKeypairToUmi();

  const imageUri = await uploadImage(
    umi,
    options?.imagePath,
    options?.fileName
  );

  const metadataOptions: {
    name?: string;
    description?: string;
    externalUrl?: string;
    attributes?: MetadataAttributes[];
  } = {};

  if (options?.name !== undefined) {
    metadataOptions.name = options.name;
  }
  if (options?.description !== undefined) {
    metadataOptions.description = options.description;
  }
  if (options?.externalUrl !== undefined) {
    metadataOptions.externalUrl = options.externalUrl;
  }
  if (options?.attributes !== undefined) {
    metadataOptions.attributes = options.attributes;
  }

  const metadataUri = await uploadMetadata(imageUri, umi, metadataOptions);

  const { signature, assetPublicKey } = await mintNft(
    metadataUri,
    umi,
    options?.name
  );

  console.log("\nNFT Created");
  console.log("View Transaction on Solana Explorer");
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  console.log("\n");
  console.log("View NFT on Metaplex Explorer");
  console.log(
    `https://core.metaplex.com/explorer/${assetPublicKey}?env=devnet`
  );

  return {
    signature,
    assetPublicKey,
    imageUri,
    metadataUri,
  };
}
