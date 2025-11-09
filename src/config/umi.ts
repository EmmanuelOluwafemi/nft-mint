import { keypairIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { mplCore } from "@metaplex-foundation/mpl-core";
import type { Umi } from "@metaplex-foundation/umi";

import wallet from "/Users/mac/.config/solana/id.json" with { type: "json" };

export function loadKeypairToUmi(): Umi {
  const umi = createUmi("https://api.devnet.solana.com")
    .use(mplCore())
    .use(irysUploader());

  const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
  umi.use(keypairIdentity(keypair));

  return umi;
}

