import { create } from "zustand";
import { ethers, formatEther } from "ethers";
import { immer } from "zustand/middleware/immer";
import {
  ElectionManager__factory,
  ElectionManager,
} from "../typechain-types/index";
import { WritableDraft } from "immer";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
interface BlockChainState {
  account: string | null;
  connect: () => void;
  balance: string | null;
  contract: ElectionManager | null;
  provider: ethers.Provider | null;
  signer: ethers.Signer | null;
}

export const useBlockChain = create<BlockChainState>()(
  immer((set) => ({
    account: null,
    balance: null,
    contract: null,
    provider: null,
    signer: null,
    connect: async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = formatEther(await provider.getBalance(address));
          const contract = ElectionManager__factory.connect(
            contractAddress,
            signer
          ) as unknown as WritableDraft<ElectionManager>;
          set((state) => {
            state.provider = provider;
            state.signer = signer;
            state.account = address;
            state.balance = balance;
            state.contract = contract;
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Please install MetaMask");
      }
    },
  }))
);
