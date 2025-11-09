import { transfer, fetchAsset } from "@metaplex-foundation/mpl-core";
import { publicKey, type Umi, type PublicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";

export async function transferNft(
  assetPublicKey: PublicKey,
  recipientAddress: string,
  umi: Umi
): Promise<string> {
  console.log("Waiting for asset to be available on-chain...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let asset;
  let retries = 5;
  let delay = 1000;

  while (retries > 0) {
    try {
      asset = await fetchAsset(umi, assetPublicKey);
      break;
    } catch (error) {
      retries--;
      if (retries === 0) {
        throw new Error(
          `Failed to fetch asset after multiple attempts: ${error}`
        );
      }
      console.log(
        `Asset not found yet, retrying in ${delay}ms... (${retries} retries left)`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }

  if (!asset) {
    throw new Error("Failed to fetch asset");
  }

  const recipientPublicKey = publicKey(recipientAddress);

  const tx = await transfer(umi, {
    asset,
    newOwner: recipientPublicKey,
  }).sendAndConfirm(umi);

  const signature = base58.deserialize(tx.signature)[0];

  console.log("\nNFT Transferred");
  console.log("View Transfer Transaction on Solana Explorer");
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);

  return signature;
}

