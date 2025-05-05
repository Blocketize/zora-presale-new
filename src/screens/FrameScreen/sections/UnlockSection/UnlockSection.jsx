import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";
import { useEffect } from "react";
import { ArrowRightIcon } from "lucide-react";

export const UnlockSection = () => {
  const splineRef = useRef(null);
  const heroText =
    "Be one of the first to explore the Zora Dapp! Fill out our form now and secure your spot in this exclusive experience.";
  const heroTitle = "Unlock ZORA First!";

  useEffect(() => {
    if (splineRef.current) {
      const canvas = splineRef.current.querySelector("canvas");
      if (canvas) {
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }
    }
  }, []);

  return (
    <section className="flex flex-col items-center gap-9 px-6 py-24 md:px-[120px] md:py-[100px] w-full">
      <div className="relative w-full">
        <Card className="flex flex-col justify-center items-center gap-2 md:gap-8 p-6 md:px-[95px] py-[20px] md:py-[50px] rounded-3xl border-2 border-dashed border-[#00000040]">
          <CardContent className="w-full pb-[5px]">
            <p className="font-normal text-black text-[30px] md:text-[48px] text-center tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
              {heroTitle}
            </p>
          </CardContent>
          <CardContent className="w-full p-3 pt-0 md:w-[700px]">
            <p className="font-normal text-black text-[16px] md:text-[24px] text-center max-sm:text-left tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
              {heroText}
            </p>
          </CardContent>
          <button className="inline-flex items-center gap-2 z-0" onClick={()=>window.open("https://form.typeform.com/to/vYNzgCKl", "_blank")}>
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-black text-2xl tracking-[-0.72px]">
              Whitelist
            </span>
            <ArrowRightIcon className="w-[18.57px] h-[14.12px] mr-[-1.61px]" />
          </button>
        </Card>
      </div>
    </section>
  );
};
