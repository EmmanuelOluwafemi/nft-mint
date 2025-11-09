import { create } from "@metaplex-foundation/mpl-core";
import { generateSigner, type Umi } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";

export interface MintResult {
  signature: string;
  assetPublicKey: string;
}

export async function mintNft(
  metadataUri: string,
  umi: Umi,
  name: string = "Cool Bear #001"
): Promise<MintResult> {
  const asset = generateSigner(umi);
  const tx = await create(umi, {
    asset,
    name,
    uri: metadataUri,
  }).sendAndConfirm(umi);

  const signature = base58.deserialize(tx.signature)[0];

  return {
    signature,
    assetPublicKey: asset.publicKey,
  };
}

