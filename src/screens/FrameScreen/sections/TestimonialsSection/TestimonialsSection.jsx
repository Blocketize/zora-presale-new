import { ArrowRightIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Card, CardContent } from "../../../../components/ui/card";

export const TestimonialsSection = () => {
  const testimonialData = [
    {
      text: "Zora could achieve a valuation of $1.3 billion by 2030 by capturing just 0.1% of this market.",
      active: false,
    },
    {
      text: "The AI industry is projected to reach a value of approximately $1.3 trillion by 2030.",
      active: false,
    },
    {
      text: "With a 40% annual growth rate, the digital human sector could soar to $270 billion by 2030.",
      active: false,
    },
    {
      text: "Digital influencers are on the rise, with their industry expected to be worth $50 billion by 2028",
      active: true,
    },
    
    {
      text: "The global market for VR/AR which often integrates with AI-driven digital humans, is expected to reach $125 billion by 2030",
      active: true,
    },
    
  ];

  return (
    <section className="flex flex-col items-center gap-9 py-[60px] md:px-[120px] relative w-full">
      <div className="flex flex-col items-center gap-4 z-[3]">
        <h2 className="w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black md:text-5xl text-3xl tracking-[-1.44px]">
          Building the new era of AI
        </h2>

        <div className="flex justify-center w-full max-w-[1200px] md:px-[250px] px-[20px]">
          <p className="w-full md:w-[500px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black md:text-2xl text-xl text-center tracking-[-0.72px]">
            AI will play a pivotal role in shaping our future, and Zora is set
            to be at the forefront.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-start w-full gap-6 z-[2] max-md:px-[10px] overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="absolute top-[-30px] left-0 w-full h-32 bg-white blur-lg z-10 pointer-events-none"></div>

          <div className="marquee flex flex-col items-center">
            {Array.from({ length: 12 }).map((_, index) =>
              testimonialData.map((item, index) => (
                <Card
                  key={index}
                  className={`md:w-[590px] w-full rounded-[70px] border-2 border-solid border-black`}
                >
                  <CardContent className="flex items-center justify-center py-3.5">
                    <p className="w-full md:w-[504.78px] mt-[-2.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-md md:text-lg text-center tracking-[-0.54px]">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div className="absolute bottom-[-30px] left-0 w-full h-32 bg-white blur-lg z-10 pointer-events-none"></div>
        </div>
      </div>
      <button className="inline-flex items-center gap-2 z-0">
        <span className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-black text-2xl tracking-[-0.72px]">
          Read more
        </span>
        <ArrowRightIcon className="w-[18.57px] h-[14.12px] mr-[-1.61px]" />
      </button>
    </section>
  );
};
