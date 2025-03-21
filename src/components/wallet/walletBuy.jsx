import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./wallet.css";

const PHWalletBuy = () => {
  const wallet = useWallet();

  return (
    <WalletModalProvider>
      <WalletMultiButton
        style={{
          padding: "0",
          backgroundColor: "#9f74ff",
          color: "#fff",
          borderRadius: "6px",
          fontSize: "16px",
          width: "100%",
          textAlign: "center",
          height: "40px",
          placeContent: "center",
        }}
      >
        {!wallet?.connected && "Connect Wallet"}
      </WalletMultiButton>
    </WalletModalProvider>
  );
};

export default PHWalletBuy;