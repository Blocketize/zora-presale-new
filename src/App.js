import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FrameScreen } from "./screens/FrameScreen";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import "./index.css";

const endpoint = process.env.REACT_APP_RPC;

if (!endpoint) {
  throw new Error("REACT_APP_RPC is not defined in environment variables.");
}

const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Element with ID 'app' not found in the DOM.");
}

createRoot(appElement).render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[]} autoConnect>
      <StrictMode>
        <FrameScreen />
      </StrictMode>
    </WalletProvider>
  </ConnectionProvider>
);