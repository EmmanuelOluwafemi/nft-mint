import { createGenericFile, type Umi } from "@metaplex-foundation/umi";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");

export async function uploadImage(umi: Umi, imagePath: string = "./opal-logo.png", fileName: string = "opa-logo.png"): Promise<string> {
  const resolvedPath = path.isAbsolute(imagePath) 
    ? imagePath 
    : path.resolve(projectRoot, imagePath);
  
  const imageFile = fs.readFileSync(resolvedPath);

  const umiImageFile = createGenericFile(imageFile, fileName, {
    tags: [
      {
        name: "contentType",
        value: "image/png",
      },
    ],
  });

  const [imageUrl] = await umi.uploader
    .upload([umiImageFile])
    .catch((error) => {
      console.error("Error uploading image:", error);
      throw error;
    });

  if (!imageUrl) {
    throw new Error("Failed to upload image");
  }

  return imageUrl;
}

