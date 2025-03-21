import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FrameScreen } from "./screens/FrameScreen";
import ReactDOM from "react-dom/client";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { ToastContainer } from "react-toastify";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const endpoint = process.env.REACT_APP_RPC;

if (!endpoint) {
  throw new Error("REACT_APP_RPC is not defined in environment variables.");
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={[]} autoConnect>
      <StrictMode>
        <FrameScreen />
        <ToastContainer autoClose={3000} draggableDirection="x" />
      </StrictMode>
    </WalletProvider>
  </ConnectionProvider>
);
reportWebVitals();
