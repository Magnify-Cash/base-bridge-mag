import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { magAdapterABI } from "./src/abi/magAdapterABI";
import { magOFTABI } from "./src/abi/magOFTABI";
import { magTokenABI } from "./src/abi/magTokenABI";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "MagOFT",
      abi: magOFTABI,
    },
    {
      name: "MagOFTAdapter",
      abi: magAdapterABI,
    },
    {
      name: "MagToken",
      abi: magTokenABI,
    },
  ],
  plugins: [react()],
});
