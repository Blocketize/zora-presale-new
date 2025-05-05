import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";
import { Separator } from "../../../../components/ui/separator";
import PHWalletBuy from "../../../../components/wallet/walletBuy";
import { useWallet } from "@solana/wallet-adapter-react";
import usePresale from "../../../../contract/usePresale";
import { useState, useEffect } from "react";

export const OverviewSection = () => {
  const PRESALE_AUTHORITY = process.env.REACT_APP_PRESALE_AUTHORITY;

  const [selectedCurrency, setSelectedCurrency] = useState("SOL");
  const [isOpen, setIsOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);

  const { publicKey } = useWallet();
  const {
    endTime,
    currentPrice,
    nextPrice,
    createPresale,
    totalAmount,
    buySol,
    buyUsdt,
    buyUsdc,
    updatePresale,
    increaseDate,
    withdrawSol,
    withdrawUsdt,
    withdrawUsdc,
    depositToken,
    claimToken,
    claimableAmount
  } = usePresale();
  const [timeLeft, setTimeLeft] = useState([
    { value: "00", label: "days" },
    { value: "00", label: "hours" },
    { value: "00", label: "mins" },
    { value: "00", label: "secs" },
  ]);

  const handleInputAmount = (e) => {
    setInputAmount(e.target.value);
  };
  const handleInputUpdatePrice = (e) => {
    setInputPrice(e.target.value);
  };

  const handleBuy = async () => {
    if (selectedCurrency === "SOL") {
      await buySol(inputAmount);
    }
    if (selectedCurrency === "USDT") {
      await buyUsdt(inputAmount);
    }
    if (selectedCurrency === "USDC") {
      await buyUsdc(inputAmount);
    }
  };

  const paymentMethods = [
    { name: "SOL", icon: "vector.svg" },
    { name: "USDT", icon: "vector-1.svg" },
    { name: "USDC", icon: "vector-3.svg" },
  ];

  const currencyIcon = {
    SOL: "vector.svg",
    USDT: "vector-1.svg",
    USDC: "vector-3.svg",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime * 1000 - now;
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft([
          { value: "00", label: "days" },
          { value: "00", label: "hours" },
          { value: "00", label: "mins" },
          { value: "00", label: "secs" },
        ]);
      } else {
        setTimeLeft([
          {
            value: Math.floor(distance / (1000 * 60 * 60 * 24))
              .toString()
              .padStart(2, "0"),
            label: "days",
          },
          {
            value: Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
              .toString()
              .padStart(2, "0"),
            label: "hours",
          },
          {
            value: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
              .toString()
              .padStart(2, "0"),
            label: "mins",
          },
          {
            value: Math.floor((distance % (1000 * 60)) / 1000)
              .toString()
              .padStart(2, "0"),
            label: "secs",
          },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const handleCurrency = (currency) => {
    if (currency === "SOL") {
      setSelectedCurrency("SOL");
    }
    if (currency === "USDT") {
      setSelectedCurrency("USDT");
    }
    if (currency === "USDC") {
      setSelectedCurrency("USDC");
    }
    setIsOpen(false);
  };

  return (
    <div className="flex w-full flex-col xl:flex-row items-center justify-between md:px-[120px] px-[20px] py-16 relative">
      <div className="flex flex-col items-start justify-center gap-6 relative">
        <div className="flex flex-col md:items-start gap-2 relative w-full">
          <img
            className="relative z-20 md:w-[471px] md:h-[170.75px]"
            alt="Zora"
            src="zora.svg"
          />

          <h1 className="relative z-20 w-full md:w-[455.46px] font-normal text-black md:text-4xl text-3xl md:text-start text-center tracking-[-1.44px] leading-normal [font-family:'Satoshi-Regular',Helvetica]">
            The future of digital humans
          </h1>
        </div>

        <p className="relative z-20 max-sm:mb-[40px] md:w-[571px] w-full text-start font-normal text-black text-lg tracking-[-0.54px] leading-normal [font-family:'Century_Gothic-Regular',Helvetica]">
          Create, customize, and evolve your own digital character. <br />
          AI is set to redefine human potential. Join the revolution with Zora!
        </p>
        <div className="w-full absolute z-10 flex justify-center sm:right-[-350px] sm:top-[-100px] top-[-50px]">
          <img
            src="zora.png"
            className="max-sm:w-[250px] max-sm:opacity-30 -z-10 "
          />
        </div>
      </div>

      <Card className="md:w-[400px] w-full md:mt-0 mt-3 shadow-[0px_0px_25px_#9f74ff80] rounded-xl z-10">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <h2 className="w-fit mt-[-2.00px] font-normal text-black text-2xl tracking-[-0.72px] leading-normal [font-family:'Satoshi-Regular',Helvetica]">
            PRESALE IS LIVE
          </h2>

          <div className="flex items-center justify-between p-3 w-full rounded-xl border border-solid border-[#0000001a] [background:linear-gradient(180deg,rgba(159,116,255,0.1)_0%,rgba(255,255,255,0.1)_100%)]">
            {timeLeft.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-start">
                  <div className="w-fit mt-[-1.00px] font-normal text-black text-4xl text-center tracking-[-1.44px] leading-normal [font-family:'Satoshi-Regular',Helvetica]">
                    {item.value}
                  </div>
                  <div className="self-stretch -mt-3 font-normal text-black text-base text-center tracking-[-0.64px] leading-normal [font-family:'Satoshi-Regular',Helvetica]">
                    {item.label}
                  </div>
                </div>

                {index < timeLeft.length - 1 && (
                  <div className="flex flex-col items-center justify-center gap-1 self-stretch">
                    <div className="w-fit mt-[-4.00px] font-normal text-black text-[45px] text-center tracking-[-1.80px] leading-normal [font-family:'Satoshi-Regular',Helvetica]">
                      :
                    </div>
                    <div className="flex-1 w-[12.84px] grow mb-[-4.00px]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-center justify-between px-2 py-1 bg-black rounded-md w-full">
              <div className="flex items-center gap-1">
                <span className="w-fit mt-[-1.00px] font-medium text-white text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                  Current Price:
                </span>
                <span className="mt-[-1.00px] font-medium text-white text-sm tracking-[-0.56px] w-fit leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                  {currentPrice}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="w-fit mt-[-1.00px] font-medium text-white text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                  Next Price
                </span>
                <span className="mt-[-1.00px] font-medium text-white text-sm tracking-[-0.56px] w-fit leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                  {nextPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-start gap-2">
              <span className="w-fit mt-[-1.00px] font-medium text-black text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                Tokens Sold (USD):
              </span>
              <span className="w-fit mt-[-1.00px] font-medium text-black text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                {totalAmount.toFixed(2)}/3,200,000
              </span>
            </div>
            <div className="flex flex-col items-start gap-2.5 p-0.5 w-full rounded-[5px] border border-solid border-[#0000001a]">
              <Progress
                className={`h-[15.27px] rounded [background:linear-gradient(90deg,rgb(0,0,0)_0%,rgb(102,102,102)_100%)]`}
                style={{ width: `${(totalAmount * 100) / 1000000}%` }}
              />
            </div>
          </div>

          {publicKey ? (
            <>
              {publicKey.toBase58() !== PRESALE_AUTHORITY && (
                <div className="flex items-center justify-between pl-0 pr-1 py-0 w-full rounded-lg border border-solid border-[#0000001a]">
                  <div
                    className="flex w-[120px] items-center gap-1 px-3 py-2 bg-[#9f74ff] rounded-[8px_0px_0px_8px] relative cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <img
                      className="w-[17px] h-[14.08px]"
                      alt="Vector"
                      src={currencyIcon[selectedCurrency]}
                    />
                    <span className="w-fit mt-[-1.00px] font-medium text-white text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                      {selectedCurrency}
                    </span>
                    <img
                      className="w-3 h-3"
                      alt="Arrow down"
                      src="arrow-down.svg"
                    />
                    {isOpen && (
                      <div className="bg-white w-full absolute top-[100%] left-0">
                        {paymentMethods.map((method, index) => (
                          <div
                            key={index}
                            className="flex w-full justify-start items-center gap-1 px-3 py-2 cursor-pointer"
                            onClick={() => handleCurrency(method.name)}
                          >
                            <img
                              className="w-[17px] h-[15.59px]"
                              alt={`${method.name} icon`}
                              src={method.icon}
                            />
                            <span className="w-fit mt-[-1.00px] font-medium text-black text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                              {method.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    className="pr-2 outline-none bg-transparent font-medium text-black text-sm tracking-[-0.56px] w-full text-right leading-normal [font-family:'Satoshi-Medium',Helvetica]"
                    value={inputAmount}
                    onChange={handleInputAmount}
                    type="number"
                  />
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="w-fit mt-[-1.00px] font-medium text-black text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                  You purchased {claimableAmount.toFixed(2)} $ZORA
                </span>
              </div>
              {publicKey.toBase58() === PRESALE_AUTHORITY ? (
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Separator className="flex-1 h-px bg-[#00000040]" />
                    <span className="w-fit mt-[-1.00px] font-medium text-[#00000040] text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                      WITHDRAW VAULT
                    </span>
                    <Separator className="flex-1 h-px bg-[#00000040]" />
                  </div>
                  <div className="flex w-full gap-2">
                    <Button
                      className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                      onClick={async () => {
                        await withdrawSol();
                      }}
                    >
                      <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                        SOL
                      </span>
                    </Button>
                    <Button
                      className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                      onClick={async () => {
                        await withdrawUsdt();
                      }}
                    >
                      <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                        USDT
                      </span>
                    </Button>
                    <Button
                      className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                      onClick={async () => {
                        await withdrawUsdc();
                      }}
                    >
                      <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                        USDC
                      </span>
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Separator className="flex-1 h-px bg-[#00000040]" />
                    <span className="w-fit mt-[-1.00px] font-medium text-[#00000040] text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                      UPDATE
                    </span>
                    <Separator className="flex-1 h-px bg-[#00000040]" />
                  </div>
                  <div className="w-full flex gap-2">
                    <input
                      className="pr-2 border border-solid border-[#0000001a] rounded-lg outline-none bg-transparent font-medium text-black text-sm tracking-[-0.56px] w-full text-right leading-normal [font-family:'Satoshi-Medium',Helvetica]"
                      value={inputPrice}
                      onChange={handleInputUpdatePrice}
                      type="number"
                    />
                    <Button
                      className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                      onClick={async () => {
                        await updatePresale(inputPrice);
                      }}
                    >
                      <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                        Update Price
                      </span>
                    </Button>
                  </div>
                  <Button
                    className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                    onClick={async () => {
                      await increaseDate();
                    }}
                  >
                    <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                      Increase Date
                    </span>
                  </Button>
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Separator className="flex-1 h-px bg-[#00000040]" />
                    <span className="w-fit mt-[-1.00px] font-medium text-[#00000040] text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                      CREATE PRESALE
                    </span>
                    <Separator className="flex-1 h-px bg-[#00000040]" />
                  </div>
                  <div className="w-full flex gap-2">
                    <Button
                      className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                      onClick={async () => {
                        await createPresale();
                      }}
                    >
                      <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                        Create Owner
                      </span>
                    </Button>
                    <Button
                      className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                      onClick={async () => {
                        await depositToken();
                      }}
                    >
                      <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                        Deposit Token
                      </span>
                    </Button>
                  </div>
                </div>
              ) : endTime * 1000 - new Date().getTime() < 0 ? (
                <Button
                  className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                  onClick={async () => {
                    await claimToken();
                  }}
                >
                  <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                    Claim Now
                  </span>
                </Button>
              ) : (
                <Button
                  className="border border-[2px] border-white w-full justify-around gap-4 p-2 bg-[#9f74ff] rounded-lg text-white hover:bg-[#8a63e0]"
                  onClick={async () => {
                    await handleBuy();
                  }}
                >
                  <span className="w-fit mt-[-1.00px] font-medium text-white text-base tracking-[-0.64px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                    Buy Now
                  </span>
                </Button>
              )}
            </>
          ) : (
            <div className="w-full">
              <PHWalletBuy />
            </div>
          )}
          {publicKey?.toBase58() !== PRESALE_AUTHORITY && (
            <>
              <div className="flex items-center justify-center gap-2 w-full">
                <Separator className="flex-1 h-px bg-[#00000040]" />
                <span className="w-fit mt-[-1.00px] font-medium text-[#00000040] text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                  PAY WITH
                </span>
                <Separator className="flex-1 h-px bg-[#00000040]" />
              </div>

              <div className="flex gap-2 items-center justify-between w-full">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex w-full justify-center items-center gap-1 px-3 py-2 rounded-lg border border-solid border-[#00000040]"
                  >
                    <img
                      className="w-[17px] h-[15.59px]"
                      alt={`${method.name} icon`}
                      src={method.icon}
                    />
                    <span className="w-fit mt-[-1.00px] font-medium text-black text-sm tracking-[-0.56px] leading-normal [font-family:'Satoshi-Medium',Helvetica]">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
