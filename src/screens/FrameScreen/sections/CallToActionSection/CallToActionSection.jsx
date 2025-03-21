import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CallToActionSection = () => {
  return (
    <section className="flex flex-col items-center gap-9 py-[20px] md:py-[100px] px-6 md:px-[120px] w-full">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-normal md:text-5xl text-3xl tracking-[-1.44px] [font-family:'Satoshi-Regular',Helvetica]">
          Trade and earn on our marketplace
        </h2>
        <p className="font-normal md:text-2xl text-xl tracking-[-0.72px] [font-family:'Satoshi-Regular',Helvetica] max-w-[728px]">
          All-in-One App
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-9 w-full">
        <Card className="border-none shadow-none bg-transparent max-w-[310px]">
          <CardContent className="p-0">
            <p className="font-normal md:text-lg text-md md:text-start text-center tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
              Not only can you create your own digital character, but you'll
              also be able to trade them directly on our platform. The value of
              each one will be determined by its level. The more unique features
              it boasts, the higher its potential to rise in value.
            </p>
          </CardContent>
        </Card>

        <div className="relative w-full md:max-w-[736px] md:h-[568px] w-full">
          <img
            className="md:absolute md:top-[147px] max-md:rounded-xl top-0 left-0 md:w-[469px] md:h-[421px] object-cover"
            alt="Zoramark"
            src="zoramark-1.png"
          />
          <img
            className="absolute top-0 left-[267px] md:w-[469px] md:h-[421px] object-cover max-md:hidden"
            alt="Zoramark"
            src="zoramark-1.png"
          />
        </div>
      </div>
    </section>
  );
};