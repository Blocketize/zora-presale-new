import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const GallerySection = () => {
  const tokenAllocations = [
    { label: "50% Presale", id: 1 },
    { label: "10% Liquidity Pool", id: 2 },
    { label: "9% Airdrop", id: 3 },
    { label: "20% Ecosystem Growth", id: 4 },
    { label: "6% Team", id: 5 },
    { label: "5% Rewards", id: 6 },
    { label: "Supply: 1,369,000,000", id: 7 },
  ];

  return (
    <section className="flex flex-col items-center gap-9 px-6 py-16 md:px-[120px] md:py-[100px] w-full">
      <h2 className="font-normal md:text-5xl text-4xl tracking-[-1.44px] [font-family:'Satoshi-Regular',Helvetica] text-black">
        Tokenomics
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-[107px] w-full items-center justify-center">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            <ul className="flex flex-col items-start gap-6">
              {tokenAllocations.map((item) => (
                <li
                  key={item.id}
                  className="font-normal md:text-2xl text-xl md:text-start text-center w-full tracking-[-0.72px] [font-family:'Satoshi-Regular',Helvetica] text-black"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <img
          className="w-full max-w-[600px] h-auto aspect-square object-cover"
          alt="Tokenomics distribution pie chart"
          src="circle-1-1.png"
        />
      </div>

      <p className="max-w-[640px] font-normal text-lg text-center tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica] text-[#00000099]">
        Tokenomics could undergo adjustments in the future if deemed necessary.
        Any modifications will be implemented with the aim of benefiting
        investors.
      </p>
    </section>
  );
};