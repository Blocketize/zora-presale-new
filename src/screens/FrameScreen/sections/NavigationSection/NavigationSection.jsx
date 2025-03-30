import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";

export const NavigationSection = () => {
  const featureCards = [
    {
      title: "Creation",
      description:
        "Unleash your vision in minutes! Craft your AI-powered human effortlessly with our intuitive, user-friendly interface. These digital humans will be stored on Solana blockchain for innovation. It's never been simpler or more exciting.",
      isDark: true,
      img:"Create_Cost_and_Env_02.png",
      id:1
    },
    {
      title: "Customization",
      description:
        "Shape your digital human to suit your vision. Tweak everything from physical traits like skin, hair, and eyes to deeper aspects like emotions and personality. This is just the start. As AI advances, we'll roll out new features to unlock even greater possibilities.",
      isDark: false,
      img:"Create_Cost_and_Env_01.png",
      id:2
    },
    {
      title: "Evolution",
      description:
        "Human intelligence within years. Though limited today, our platform will harness these advancements and enable your digital character to grow smarter over time. Designed to integrate cutting-edge AI technologies, Zora keeps you ahead of the curve.",
      isDark: true,
      img:"Create_Cost_and_Env_03.png",
      id:3
    },
  ];

  return (
    <section className="flex flex-col items-center gap-6 px-6 py-[20px] md:px-[120px] md:py-[100px] w-full">
      <header className="flex flex-col items-center gap-4">
        <h2 className="font-normal text-3xl md:text-5xl tracking-[-1.44px] [font-family:'Satoshi-Regular',Helvetica] text-center">
          Create, Customize, and Evolve
        </h2>

        <div className="flex items-center gap-2">
          <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-2xl tracking-[-0.72px]">
            Docs
          </span>
          <ArrowRightIcon className="w-[18px] h-[14px]" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {featureCards.map((card, index) => (
          <Card
            key={index}
            className={`border border-solid border-[#00000066] rounded-[20px] overflow-hidden ${
              card.isDark ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="p-0 relative">
              <div
                className={`h-[218px] w-full rounded-t-[20px]`}
              />
              <img src={card.img} className={`rounded-t-[20px] absolute ${card} ${card.id === 1?"top-[-50px] max-sm:left-[-20px]":card.id === 2?"top-[-70px] left-[-60px] w-[500px] ":"sm:top-[-40px] top-[-30px] left-[-80px] sm:left-[-70px] w-[500px] "}`} style={{maxWidth:"10000px"}}/>
            </div>
            <CardContent className="flex flex-col gap-1 p-3.5">
              <h3
                className={`[font-family:'Satoshi-Medium',Helvetica] font-medium text-2xl tracking-[-0.72px] ${
                  card.isDark ? "text-white" : "text-black"
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`[font-family:'Satoshi-Regular',Helvetica] font-normal text-lg tracking-[-0.54px] ${
                  card.isDark ? "text-white" : "text-black"
                }`}
              >
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};