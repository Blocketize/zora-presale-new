import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { IDL } from "../IDL/IDL";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { toast } from "react-toastify";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Buffer } from "buffer";
import { Connection } from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";
import axios from "axios";
import { PythSolanaReceiver } from "@pythnetwork/pyth-solana-receiver";
window.Buffer = window.Buffer || Buffer;
export default function usePresale() {
  const { publicKey, wallet } = useWallet();
  const anchorWallet = useAnchorWallet();

  const config = {
    END_TIME_TIMESTAMP: process.env.REACT_APP_END_TIME_TIMESTAMP,
    PRESALE_PROGRAM_PUBKEY_ADDRESS: process.env.REACT_APP_PRESALE_PROGRAM_PUBKEY,
    PRESALE_AUTHORITY_ADDRESS: process.env.REACT_APP_PRESALE_AUTHORITY,
    SOL_PRICEFEED_ID_ADDRESS: process.env.REACT_APP_SOL_PRICEFEED_ID,
    DEPOSITE_TOKEN_AMOUNT: process.env.REACT_APP_DEPOSITE_TOKEN_AMOUNT,
    TOKEN_PUBKEY_ADDRESS: process.env.REACT_APP_TOKEN_PUBKEY,
    PRESALE_HARDCAP: process.env.REACT_APP_PRESALE_HARDCAP,
    PRESALE_SOFTCAP: process.env.REACT_APP_PRESALE_SOFTCAP,
    WHITELIST_PRICE: process.env.REACT_APP_WHITELIST_PRICE,
    MIN_INVESTMENT: process.env.REACT_APP_MIN_INVESTMENT,
    MAX_INVESTMENT: process.env.REACT_APP_MAX_INVESTMENT,
    START_DATE_VALUE: process.env.REACT_APP_START_DATE,
    VESTING_END_DATE: process.env.REACT_APP_VESTING_END_DATE,
    TOKEN_DECIMAL: process.env.REACT_APP_TOKEN_DECIMAL,
    PRESALE_SEED: process.env.REACT_APP_PRESALE_SEED,
    DEFAULT_SOL_PRICE: process.env.REACT_APP_DEFAULT_SOL_PRICE,
    NORMAL_PRICE: process.env.REACT_APP_NORMAL_PRICE,
    END_DATE_VALUE: process.env.REACT_APP_END_DATE,
    VAULT_SEED: process.env.REACT_APP_VAULT_SEED,
    PRESALE_ID: process.env.REACT_APP_PRESALE_ID,
    USER_SEED: process.env.REACT_APP_USER_SEED,
    CLAIM_DURATION: process.env.REACT_APP_CLAIM_DURATION,
    RPC: process.env.REACT_APP_RPC,
    GK_API_KEY: process.env.REACT_APP_GK_API_KEY,
    CLAIM_ALLOW: process.env.REACT_APP_CLAIM_ALLOW,
    USDT_PUBKEY_ADDRESS: process.env.REACT_APP_USDT_PUBKEY,
    USDC_PUBKEY_ADDRESS: process.env.REACT_APP_USDC_PUBKEY,
  };

  const {
    PRESALE_PROGRAM_PUBKEY_ADDRESS,
    PRESALE_AUTHORITY_ADDRESS,
    SOL_PRICEFEED_ID_ADDRESS,
    DEPOSITE_TOKEN_AMOUNT,
    TOKEN_PUBKEY_ADDRESS,
    PRESALE_HARDCAP,
    WHITELIST_PRICE,
    MAX_INVESTMENT,
    START_DATE_VALUE,
    VESTING_END_DATE,
    TOKEN_DECIMAL,
    PRESALE_SEED,
    DEFAULT_SOL_PRICE,
    NORMAL_PRICE,
    END_DATE_VALUE,
    VAULT_SEED,
    PRESALE_ID,
    USER_SEED,
    CLAIM_DURATION,
    RPC,
    GK_API_KEY,
    CLAIM_ALLOW,
    USDT_PUBKEY_ADDRESS,
    USDC_PUBKEY_ADDRESS,
  } = config;

  const PRESALE_PROGRAM_PUBKEY = new PublicKey(PRESALE_PROGRAM_PUBKEY_ADDRESS);
  const PRESALE_AUTHORITY = new PublicKey(PRESALE_AUTHORITY_ADDRESS);
  const TOKEN_PUBKEY = new PublicKey(TOKEN_PUBKEY_ADDRESS);
  const USDT_PUBKEY = new PublicKey(USDT_PUBKEY_ADDRESS);
  const USDC_PUBKEY = new PublicKey(USDC_PUBKEY_ADDRESS);
  const SOL_PRICEFEED_ID = new PublicKey(SOL_PRICEFEED_ID_ADDRESS);
  const START_DATE = new Date(START_DATE_VALUE);
  const END_DATE = new Date(END_DATE_VALUE);
  let connection;
  try {
    connection = new Connection(RPC, "finalized");
  } catch (error) {
    console.error(error);
  }

  const [transactionPending, setTransactionPending] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [solAmount, setSolAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vaultAddress, setVaultAddress] = useState("");
  const [claimTime, setClaimTime] = useState(0);
  const [defaultPrice, setDefaultPrice] = useState(WHITELIST_PRICE);
  const [tokenBalance, setTokenBalance] = useState(0);

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const getPresaleInfo = async () => {
      if (program && !transactionPending) {
        try {
          const [presale_info] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              new Uint8Array([Number(PRESALE_ID)]),
            ],
            program.programId
          );
          const [vault] = await PublicKey.findProgramAddress(
            [Buffer.from(VAULT_SEED), presale_info.toBuffer()],
            program.programId
          );
          setVaultAddress(vault.toBase58());
          const info = await program.account.presaleInfo.fetch(presale_info);
          
          setSolAmount(Number(info.solAmount) / LAMPORTS_PER_SOL);
          setTotalAmount(Number(info.totalAmount) / LAMPORTS_PER_SOL);
          setStartTime(Number(info.startTime));
          setEndTime(Number(info.endTime));
          setTotalBuyAmount(
            Number(info.soldTokenAmount.toString()) /
              10 ** Number(TOKEN_DECIMAL)
          );

          console.log("test",Number(info.solAmount),Number(info.startTime),Number(info.endTime),Number(info.soldTokenAmount.toString()), Number(info.totalAmount.toString()))
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getUserInfo = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          const [userInfo] = findProgramAddressSync(
            [
              utf8.encode(USER_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              publicKey.toBuffer(),
              new Uint8Array([Number(PRESALE_ID)]),
            ],
            program.programId
          );
          const info = await program.account.userInfo.fetch(userInfo);
          setClaimableAmount(
            Number(info.buyTokenAmount.toString()) / 10 ** Number(TOKEN_DECIMAL)
          );
          setBuyAmount(info.buyTokenAmount);
          setClaimedAmount(info.claimAmount);
        } catch (error) {
          setClaimableAmount(0);
          console.log(error);
        }
      }
    };

    getPresaleInfo();
    getUserInfo();
  }, [publicKey, transactionPending]);
  useEffect(() => {
    const connection = new Connection(
      RPC,
      "confirmed"
    );
    let provider = new anchor.AnchorProvider(
      connection,
      //@ts-ignore
      wallet,
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
    const getPresaleInfo = async ()=> {
      if (program && !transactionPending) {
        try {
          //   setLoading(true);
          const [presale_info] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              new Uint8Array([Number(PRESALE_ID)]),
            ],
            program.programId
          );
          const [vault] = await PublicKey.findProgramAddress(
            [Buffer.from(VAULT_SEED), presale_info.toBuffer()],
            program.programId
          );
          setVaultAddress(vault.toBase58());
          const info = await program.account.presaleInfo.fetch(presale_info);
          
          setSolAmount(Number(info.solAmount) / LAMPORTS_PER_SOL);
          setTotalAmount(Number(info.totalAmount) / LAMPORTS_PER_SOL);
          setStartTime(Number(info.startTime));
          setEndTime(Number(info.endTime));
          setTotalBuyAmount(
            Number(info.soldTokenAmount.toString()) /
              10 ** Number(TOKEN_DECIMAL)
          );

          console.log("test",Number(info.solAmount),Number(info.startTime),Number(info.endTime),Number(info.soldTokenAmount.toString()), Number(info.totalAmount.toString()))
        } catch (error) {
          console.log(error);
        } finally {
          //   setLoading(false);
        }
      }
    };


    getPresaleInfo();

  }, []);
  const createPresale = async () => {
    if (program && publicKey && wallet) {
      try {
        setTransactionPending(true);
        const [presale_info] = await PublicKey.findProgramAddress(
          [
            Buffer.from(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const [vault] = await PublicKey.findProgramAddress(
          [Buffer.from(VAULT_SEED), presale_info.toBuffer()],
          program.programId
        );
        const tokenPrice = Number(NORMAL_PRICE) * 10 ** 9;

        const hardCap = new anchor.BN(
          LAMPORTS_PER_SOL * Number(PRESALE_HARDCAP)
        );
        const price = new anchor.BN(tokenPrice);
        const sTime = new anchor.BN(START_DATE.getTime() / 1000);
        const eTime = new anchor.BN(END_DATE.getTime() / 1000);
        if (!publicKey || !wallet) {
          console.log("Wallet not connected");
          return false;
        }
        await program.methods
          .createPresale(
            hardCap,
            price,
            sTime,
            eTime,
            new anchor.BN(Number(PRESALE_ID))
          )
          .accounts({
            presaleInfo: presale_info,
            authority: PRESALE_AUTHORITY,
            usdtMint: USDT_PUBKEY,
            usdcMint: USDC_PUBKEY,
            vault: vault,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        return false;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
    return false;
  };

  const updatePresale = async () => {
    if (program && publicKey) {
      try {
        console.log("update presale");
        setTransactionPending(true);
        const [presale_info] = await PublicKey.findProgramAddress(
          [
            Buffer.from(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const tokenPrice = Number(NORMAL_PRICE) * 10 ** 9;

        const hardCap = new anchor.BN(
          LAMPORTS_PER_SOL * Number(PRESALE_HARDCAP)
        );
        const max = new anchor.BN(LAMPORTS_PER_SOL * Number(MAX_INVESTMENT));
        const price = new anchor.BN(tokenPrice);
        const sTime = new anchor.BN(START_DATE.getTime() / 1000);
        const eTime = new anchor.BN(END_DATE.getTime() / 1000);
        const veTime = new anchor.BN(
          new Date(VESTING_END_DATE).getTime() / 1000
        );

        await program.methods
          .updatePresale(
            price,
            hardCap,
            sTime,
            eTime,
            new anchor.BN(Number(PRESALE_ID))
          )
          .accounts({
            presaleInfo: presale_info,
            usdtMint: USDT_PUBKEY,
            usdcMint: USDC_PUBKEY,
            authority: PRESALE_AUTHORITY,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        return false;
      } catch (error) {
        console.error(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
    return false;
  };

  const buySol = async (solAmount) => {
    if (program && publicKey) {
      try {
        const solWalletAmount = await connection.getBalance(publicKey);
        if (Number(solWalletAmount / 10 ** 9) < solAmount) {
          toast.error("You don't have enough SOL!");
          return false;
        }
        if (endTime * 1000 - new Date().getTime() <= 0) {
          toast.error("Presale has ended!");
          return false;
        }

        setTransactionPending(true);
        const [presaleInfo] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const [vault] = await PublicKey.findProgramAddress(
          [Buffer.from(VAULT_SEED), presaleInfo.toBuffer()],
          program.programId
        );
        const [userInfo] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const bigIntSolAmount = new anchor.BN(solAmount * LAMPORTS_PER_SOL);
        const pythSolanaReceiver = new PythSolanaReceiver({
          connection,
          wallet,
        });
        const SOL_PRICE_FEED_ID = Buffer.from(
          "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
          "hex"
        );
        const solUsdPriceFeedAccount = pythSolanaReceiver
          .getPriceFeedAccountAddress(0, SOL_PRICE_FEED_ID)
          .toBase58();

        await program.methods
          .buySol(bigIntSolAmount, Number(PRESALE_ID))
          .accounts({
            presaleInfo,
            mintAccount: TOKEN_PUBKEY,
            priceUpdate: solUsdPriceFeedAccount,
            presaleAuthority: PRESALE_AUTHORITY,
            userInfo,
            vault: vault,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            pythSolAccount: SOL_PRICEFEED_ID,
          })
          .rpc();

        toast.success("Token purchase was successful.");
        return false;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setTransactionPending(false);
      }
    } else {
      toast.error("Please connect wallet!");
      return false;
    }
  };

  const buyUsdt = async (tokenAmount) => {
    if (program && publicKey) {
      try {
        if (endTime * 1000 - new Date().getTime() <= 0) {
          toast.error("Presale has ended!");
          return false;
        }
        setTransactionPending(true);
        const [presaleInfo] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const [vault] = await PublicKey.findProgramAddress(
          [Buffer.from(VAULT_SEED), presaleInfo.toBuffer()],
          program.programId
        );
        const [userInfo] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const bigIntTokenAmount = new anchor.BN(tokenAmount * 10 ** 6);
        const usdtAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: USDT_PUBKEY,
            owner: publicKey,
          });
        const usdtVault = await anchor.utils.token.associatedAddress({
          mint: USDT_PUBKEY,
          owner: vault,
        });

        await program.methods
          .buyUsdt(bigIntTokenAmount, Number(PRESALE_ID))
          .accounts({
            presaleInfo,
            mintAccount: TOKEN_PUBKEY,
            usdtMint: USDT_PUBKEY,
            presaleAuthority: PRESALE_AUTHORITY,
            userInfo,
            vault: vault,
            usdtAssociatedTokenAccount: usdtAssociatedTokenAccount,
            usdtVault: usdtVault,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            pythSolAccount: SOL_PRICEFEED_ID,
          })
          .rpc();
        toast.success("Token purchase was successful.");
        return false;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setTransactionPending(false);
      }
    } else {
      toast.error("Please connect wallet!");
      return false;
    }
  };

  const buyUsdc = async (tokenAmount) => {
    if (program && publicKey) {
      try {
        if (endTime * 1000 - new Date().getTime() <= 0) {
          toast.error("Presale has ended!");
          return false;
        }
        setTransactionPending(true);
        const [presaleInfo] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const [vault] = await PublicKey.findProgramAddress(
          [Buffer.from(VAULT_SEED), presaleInfo.toBuffer()],
          program.programId
        );
        const [userInfo] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const bigIntTokenAmount = new anchor.BN(tokenAmount * 10 ** 6);
        const usdcAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: USDC_PUBKEY,
            owner: publicKey,
          });
        const usdcVault = await anchor.utils.token.associatedAddress({
          mint: USDC_PUBKEY,
          owner: vault,
        });

        await program.methods
          .buyUsdc(bigIntTokenAmount, Number(PRESALE_ID))
          .accounts({
            presaleInfo,
            mintAccount: TOKEN_PUBKEY,
            usdcMint: USDC_PUBKEY,
            presaleAuthority: PRESALE_AUTHORITY,
            userInfo,
            vault: vault,
            usdcAssociatedTokenAccount: usdcAssociatedTokenAccount,
            usdcVault: usdcVault,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
            pythSolAccount: SOL_PRICEFEED_ID,
          })
          .rpc();
        toast.success("Token purchase was successful.");
        return false;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setTransactionPending(false);
      }
    } else {
      toast.error("Please connect wallet!");
      return false;
    }
  };

  const claimToken = async () => {
    if (Number(CLAIM_ALLOW) === 0) {
      toast.error("Please wait until presale finishes!");
      return false;
    }

    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const [userInfo] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );

        const buyerPresaleTokenAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        const presalePresaleTokenAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: presaleInfo,
          });

        await program.methods
          .claimToken(Number(PRESALE_ID))
          .accounts({
            presaleTokenMintAccount: TOKEN_PUBKEY,
            buyerPresaleTokenAssociatedTokenAccount,
            presalePresaleTokenAssociatedTokenAccount,
            userInfo,
            presaleInfo,
            presaleAuthority: PRESALE_AUTHORITY,
            buyerAuthority: publicKey,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();

        toast.success("Token claim was successful.");
        return false;
      } catch (error) {
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
    return false;
  };

  const getSolPrice = async () => {
    try {
      const response = await fetch(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
        {
          method: "GET",
          headers: {
            "x-cg-pro-api-key": GK_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const solPrice = data.solana.usd;
      return solPrice || Number(DEFAULT_SOL_PRICE);
    } catch (error) {
      return Number(DEFAULT_SOL_PRICE);
    }
  };

  const withdrawSol = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const [vault] = await PublicKey.findProgramAddress(
          [Buffer.from(VAULT_SEED), presale_info.toBuffer()],
          program.programId
        );

        await program.methods
          .withdrawSol(Number(PRESALE_ID))
          .accounts({
            presaleInfo: presale_info,
            vault: vault,
            presaleAuthority: PRESALE_AUTHORITY,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();

        toast.success("Successfully withdrew SOL.");
        return false;
      } catch (error) {
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
    return false;
  };

  const depositToken = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
          ],
          program.programId
        );
        const fromAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });
        const toAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: presale_info,
          });

        await program.methods
          .depositToken(
            new anchor.BN(
              Number(DEPOSITE_TOKEN_AMOUNT) * 10 ** Number(TOKEN_DECIMAL)
            ),
            Number(PRESALE_ID)
          )
          .accounts({
            mintAccount: TOKEN_PUBKEY,
            fromAssociatedTokenAccount,
            fromAuthority: PRESALE_AUTHORITY,
            toAssociatedTokenAccount,
            presaleInfo: presale_info,
            payer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();

        toast.success("Successfully deposited token.");
        return false;
      } catch (error) {
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
    return false;
  };

  return {
    buyUsdt,
    buyUsdc,
    buySol,
    claimToken,
    getSolPrice,
    createPresale,
    updatePresale,
    depositToken,
    withdrawSol,
    totalAmount,
    startTime,
    endTime,
    buyAmount,
    claimedAmount,
    totalBuyAmount,
    transactionPending,
    claimableAmount,
    solAmount,
    vaultAddress,
    defaultPrice,
    PRESALE_AUTHORITY,
    tokenBalance,
  };
}