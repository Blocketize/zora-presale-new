import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import "./wallet.css";

const PHWallet = () => {
  const wallet = useWallet();
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on load and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define mobile as width <= 768px
    };

    // Add event listener and check initially
    window.addEventListener("resize", handleResize);
    handleResize();

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WalletModalProvider>
      <WalletMultiButton
        style={{
          padding: "0",
          backgroundColor: "#9f74ff",
          color: "#fff",
          // fontWeight: "bold",
          borderRadius: "6px",
          fontSize: "16px",
          width: isMobile ? "100px" : "150px",
          textAlign: "center",
          height: "40px",
          placeContent: "center",
          // fontFamily: "dalek, sans-serif",
          // textTransform: "uppercase",
        }}
      >
        {!wallet?.connected && (isMobile ? "Connect" : "Connect Wallet")}
      </WalletMultiButton>
    </WalletModalProvider>
  );
};

export default PHWallet;