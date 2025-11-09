import type { Umi } from "@metaplex-foundation/umi";

export interface MetadataAttributes {
  trait_type: string;
  value: string;
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: MetadataAttributes[];
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    category: string;
  };
}

export async function uploadMetadata(
  imageUri: string,
  umi: Umi,
  options?: {
    name?: string;
    description?: string;
    externalUrl?: string;
    attributes?: MetadataAttributes[];
  }
): Promise<string> {
  const metadata: Metadata = {
    name: options?.name ?? "Angry Tiger",
    description: options?.description ?? "Angry Tiger!",
    image: imageUri,
    external_url: options?.externalUrl ?? "https://example.com",
    attributes: options?.attributes ?? [
      {
        trait_type: "Unbreakable",
        value: "Yes",
      },
      {
        trait_type: "Indestructible",
        value: "Yes",
      },
    ],
    properties: {
      files: [
        {
          uri: imageUri,
          type: "image/jpeg",
        },
      ],
      category: "image",
    },
  };

  const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
    throw new Error(`Failed to upload metadata: ${err}`);
  });

  return metadataUri;
}

