import { createNft } from "./nft/create.js";

createNft({
  imagePath: "./src/assets/cool-bear-cash.png",
  fileName: "cool-bear-cash.png",
  name: "Cool Bear #001",
  description:
    "A flashy pink bear dripping in love and cash. Heart shades, money flow, and pure confidence.",
  externalUrl: "https://cool-bear.com",
  attributes: [
    { trait_type: "Background", value: "Pink" },
    { trait_type: "Fur Color", value: "Bubblegum Pink" },
    { trait_type: "Eyes", value: "Hidden by Heart Shades" },
    { trait_type: "Sunglasses", value: "Heart Red" },
    { trait_type: "Headwear", value: "Striped Beanie" },
    { trait_type: "Accessory", value: "Dollar Bills Glass Frame" },
    { trait_type: "Clothing", value: "Beige Tee with Candy Chain" },
    { trait_type: "Mood", value: "Playful" },
  ],
});
