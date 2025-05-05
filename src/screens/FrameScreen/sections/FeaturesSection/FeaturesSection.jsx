import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import usePresale from "../../../../contract/usePresale";
import { useState, useEffect } from "react";

export const FeaturesSection = ({scrollToSection}) => {
  const featureOptions = [
    {
      id: "virtual-assistant",
      title: "Virtual Assistant",
      description:
        "AI will play a pivotal role in shaping our future, and Zora is set to be at the forefront.",
    },
    {
      id: "content-creator",
      title: "Content Creator",
      description:
        "AI will play a pivotal role in shaping our future, and Zora is set to be at the forefront.",
    },
    {
      id: "education",
      title: "Education",
      description:
        "AI will play a pivotal role in shaping our future, and Zora is set to be at the forefront.",
    },
  ];
    const {
      endTime
    } = usePresale();

  const [timeLeft, setTimeLeft] = useState([
      { value: "00", label: "days" },
      { value: "00", label: "hours" },
      { value: "00", label: "mins" },
      { value: "00", label: "secs" },
    ]);
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
  return (
    <section className="flex flex-col items-center gap-9 px-6 py-16 md:px-[120px] md:py-[100px] relative w-full">
      <div className="flex items-center md:flex-row flex-col justify-center gap-3.5 relative z-[2]">
        <img
          className="relative w-[133.77px] h-10"
          alt="Zora"
          src="zora.svg"
        />
        <h2 className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-3xl md:text-5xl tracking-[-1.44px] leading-[normal]">
          avatars can be used in
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 relative w-full z-[1]">
        <video
          className="relative w-full md:w-[645.33px] h-auto md:h-[757.3px] object-cover hidden max-sm:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="babygirl.mp4" type="video/mp4" />
        </video>
        <img className="relative w-full md:w-[645.33px] h-auto md:h-[757.3px] object-cover block max-sm:hidden" src="babygirl-1.png"/>
        <div className="flex flex-col items-start gap-3 md:absolute md:top-[235px] md:left-[870px] w-full md:w-auto">
          <Accordion type="single" collapsible className="w-full md:w-[330px]">
            {featureOptions.map((option, index) => (
              <AccordionItem
                key={option.id}
                value={option.id}
                className="bg-white rounded-xl border border-solid border-black mb-3 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-3 [font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-2xl tracking-[-0.96px]">
                  {option.title}
                </AccordionTrigger>
                {option.description && (
                  <AccordionContent className="px-6 pb-3">
                    <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-lg tracking-[-0.54px] leading-[normal]">
                      {option.description}
                    </p>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className="flex md:flex-row flex-col items-end justify-center gap-4 md:gap-8 relative z-0">
        <Card className="inline-flex max-md:w-full items-center gap-4 px-6 py-2 bg-[#9f74ff] rounded-lg border-none">
          <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
            Current price
          </div>
          <div className="flex items-center gap-2">
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
              0.0010
            </span>
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
              USDT
            </span>
            <div className="flex items-center justify-center gap-2.5 px-2 py-1 bg-[#0000004c] rounded-lg">
              <span className="mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
                - 45%
              </span>
            </div>
          </div>
        </Card>

        <Card className="inline-flex max-md:w-full h-14 items-center gap-4 px-6 py-2 bg-[#9f74ff] rounded-lg border-none">
          <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
            Next price round
          </div>
          <div className="flex items-center gap-1">
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
            {timeLeft[0].value}
            </span>
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
              :
            </span>
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
              {timeLeft[1].value}
            </span>
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
              :
            </span>
            <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]">
            {timeLeft[2].value}
            </span>
          </div>
        </Card>

        <Button className="inline-flex max-md:w-full h-14 items-center gap-4 px-6 py-2 bg-[#9f74ff] rounded-lg [font-family:'Satoshi-Medium',Helvetica] font-medium text-white md:text-2xl text-xl tracking-[-0.96px] leading-[normal]" onClick={() => scrollToSection(0)}>
          Buy Now
        </Button>
      </div>
    </section>
  );
};