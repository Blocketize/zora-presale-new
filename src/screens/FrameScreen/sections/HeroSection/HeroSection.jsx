import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import Spline from "@splinetool/react-spline";
import { useRef } from "react";
import { useEffect } from "react";

export const HeroSection = () => {
  const splineRef = useRef(null);
  const heroText =
    "Technology is advancing at an unprecedented rate, and the rise of artificial intelligence is ushering in one of the most rapid periods of growth in human history. With Zora, you can play an active role in this transformative era, helping to shape the decentralization of AI. Zora is positioned to become a cornerstone of the AI ecosystem, driving the creation of AI-powered humans that will redefine digital interaction.";

  useEffect(() => {
    if (splineRef.current) {
      const canvas = splineRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      }
    }
  }, []);

  return (
    <section className="flex flex-col items-center gap-9 px-6 py-24 md:px-[120px] md:py-[100px] w-full">
      <div className="relative w-full">
        <Card className="flex flex-col justify-center items-center md:flex-row gap-8 md:gap-[131px] px-6 py-10 md:px-[95px] md:py-[85px] rounded-3xl border-2 border-dashed border-[#00000040]">
          <CardContent className="p-0 md:w-[280px]">
            <p className="font-normal text-black text-lg tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica]">
              {heroText}
            </p>
          </CardContent>

          <CardContent className="p-0 flex items-center justify-center">
          <div className="w-full max-h-[300px]  md:max-h-[300px] flex items-center justify-center " ref={splineRef}>
              <Spline scene="https://prod.spline.design/XtqZIV2VZKCdVLqG/scene.splinecode" className="spline-canvas"/>
            </div>
          </CardContent>
        </Card>

        <div className="absolute w-full md:max-w-[1018px] w-[300px] md:h-[65px] h-[40px] -top-9 left-1/2 transform -translate-x-1/2 [background:linear-gradient(180deg,rgba(255,255,255,0)_0%,rgb(255,255,255)_7.91%,rgb(255,255,255)_92.76%,rgba(255,255,255,0)_100%)] flex items-center justify-center">
          <h2 className="font-normal text-black text-3xl md:text-5xl text-center tracking-[-1.44px] [font-family:'Satoshi-Regular',Helvetica] md:w-full w-[300px]">
            The Convergence of AI and Technology
          </h2>
        </div>
      </div>
    </section>
  );
};