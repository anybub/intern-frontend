/// <reference types="vite/client" />
import { Eip1193Provider } from "ethers";
declare global {
    interface Window {
      ethereum?: any;
    }
  }

