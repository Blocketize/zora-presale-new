import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const IntroductionSection = () => {
  const instructionCards = [
    {
      id: 1,
      title: "CONNECT YOUR WALLET",
      description:
        'Connect your wallet safely and easily by clicking on the "Connect Wallet" button and confirm the transaction',
      dark: true,
    },
    {
      id: 2,
      title: "SELECT THE AMOUNT",
      description:
        "Choose the amount you want to buy! Remember to have some extra $SOL for fees. You can buy with $SOL, $USDT or $USDC.",
      dark: true,
    },
    {
      id: 3,
      title: "CONFIRM TRANSACTION",
      description:
        "Confirm and approve purchase transactions. Congratulations, you just purchased $ZORA",
      dark: true,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-9 px-6 md:py-[60px] py-[20px] md:px-[120px] w-full">
      <div className="flex flex-col gap-8 md:py-[85px] w-full rounded-3xl items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-[30px] w-full">
          <Card className="flex flex-col h-[280px] items-center justify-center gap-6 px-6 py-12 flex-1 rounded-3xl border-2 border-dashed border-[#00000040] bg-transparent">
            <CardContent className="flex flex-col items-center justify-center p-0 space-y-6 w-full">
              <h2 className="w-full max-w-[372px] font-normal text-black text-4xl text-center tracking-[-1.08px] [font-family:'Satoshi-Regular',Helvetica]">
                How to buy $ZORA?
              </h2>

              <div className="flex flex-col items-start gap-3">
                <Button className="w-[305px] p-2 bg-[#9f74ff] rounded-lg hover:bg-[#8a63e0] text-white font-medium text-xl tracking-[-0.64px] [font-family:'Satoshi-Medium',Helvetica]" onClick={() => window.open("https://www.youtube.com/watch?v=RKmLNONaQlg", "_blank")}>
                  Buy on Mobile
                </Button>

                <Button className="w-[305px] p-2 bg-[#9f74ff] rounded-lg hover:bg-[#8a63e0] text-white font-medium text-xl tracking-[-0.64px] [font-family:'Satoshi-Medium',Helvetica]"  onClick={() => window.open("https://www.youtube.com/watch?v=6CtL6aL7uIE", "_blank")}>
                  Buy on PC
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-[280px] items-center justify-center gap-6 px-6 py-12 flex-1 rounded-3xl bg-black">
            <CardContent className="flex flex-col items-center justify-center p-0 space-y-6 w-full">
              <h3 className="w-full max-w-[372px] font-medium text-white text-2xl text-center tracking-[-0.72px] [font-family:'Satoshi-Medium',Helvetica]">
                1. CONNECT YOUR WALLET
              </h3>

              <p className="w-full max-w-[372px] font-normal text-white text-lg text-center tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
                Connect your wallet safely and easily by clicking on the
                "Connect Wallet" button and confirm the transaction
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-[30px] w-full">
          <Card className="flex flex-col h-[280px] items-center justify-center gap-6 px-6 py-12 flex-1 rounded-3xl bg-black">
            <CardContent className="flex flex-col items-center justify-center p-0 space-y-6 w-full">
              <h3 className="w-full max-w-[372px] font-medium text-white text-2xl text-center tracking-[-0.72px] [font-family:'Satoshi-Medium',Helvetica]">
                2. SELECT THE AMOUNT
              </h3>

              <p className="w-full max-w-[372px] font-normal text-white text-lg text-center tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
                Choose the amount you want to buy! Remember to have some extra
                $SOL for fees. You can buy with $SOL, $USDT or $USDC.
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col h-[280px] items-center justify-center gap-6 px-6 py-12 flex-1 rounded-3xl bg-black">
            <CardContent className="flex flex-col items-center justify-center p-0 space-y-6 w-full">
              <h3 className="w-full max-w-[372px] font-medium text-white text-2xl text-center tracking-[-0.72px] [font-family:'Satoshi-Medium',Helvetica]">
                3. CONFIRM TRANSACTION
              </h3>

              <p className="w-full max-w-[372px] font-normal text-white text-lg text-center tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
                Confirm and approve purchase transactions. Congratulations, you
                just purchased $ZORA
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};