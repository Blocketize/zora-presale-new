import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ContactSection = () => {
  const phases = [
    {
      name: "Phase 1: Down of a New Era",
      items: [
        {
          title: "Development",
          description: "Launch of Zora's Alpha version",
        },
        {
          title: "Presale",
          description: "Star of the presale and fundraising campaing",
        },
        {
          title: "Whitelist",
          description:
            "Activation of the whitelist, allowing selected users to test our platform",
        },
        {
          title: "Strategic Partnerships",
          description:
            "At this stage, we will forge key alliances with iIndustry leaders. We'll partner with the best",
        },
      ],
    },
    {
      name: "Phase 2: Market Launch",
      items: [
        {
          title: "Distribution",
          description: "Distribution of presale tokens.",
        },
        {
          title: "Launch",
          description: "Official token launch.",
        },
        {
          title: "Marketing campaign",
          description: "Aggressive marketing strategy through influencers.",
        },
        {
          title: "Exchanges",
          description: "Listing on Tier 1 and Tier 2 exchanges.",
        },
      ],
    },
    {
      name: "Phase 3: Public Launch",
      items: [
        {
          title: "Launch",
          description: "Official release of the Dapp to the general public.",
        },
        {
          title: "Creation and Customization",
          description:
            "Creation and customization features enabled with the Dapp launch.",
        },
        {
          title: "Whitelist",
          description:
            "Activation of the whitelist, allowing selected users to test our platform",
        },
        {
          title: "Strategic Partnerships",
          description:
            "At this stage, we will forge key alliances with iIndustry leaders. We'll partner with the best",
        },
      ],
    },
    {
      name: "Phase 4: Expansion",
      items: [
        {
          title: "Development",
          description: "Launch of Zora's Alpha version",
        },
        {
          title: "Presale",
          description: "Star of the presale and fundraising campaing",
        },
        {
          title: "Whitelist",
          description:
            "Activation of the whitelist, allowing selected users to test our platform",
        },
        {
          title: "Strategic Partnerships",
          description:
            "At this stage, we will forge key alliances with iIndustry leaders. We'll partner with the best",
        },
      ],
    },
  ];

  return (
    <section className="flex flex-col items-center gap-9 px-6 md:px-[120px] py-[100px] relative w-full">
      <h2 className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-5xl tracking-[-1.44px]">
        Roadmap
      </h2>

      <div className="flex flex-col items-center justify-center max-w-[800px] mb-8">
        <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-2xl max-sm:text-start text-center tracking-[-0.72px]">
          The roadmap is a key cornerstone that sets successful projects apart
          from those that fall short. To ensure healthy and sustainable growth,
          we've crafted a realistic roadmap with clear, actionable steps
          tailored for an experienced team.
        </p>
      </div>

      <Card className="border-none shadow-none w-full">
        <CardContent className="p-0 relative">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="flex items-center justify-center w-full">
              <div className="flex md:flex-row flex-col items-start gap-[20px]">
                <div className="flex md:w-[390px] w-full items-center md:py-6">
                  <h3 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-black text-2xl tracking-[-0.72px]">
                    {phase.name}
                  </h3>
                </div>
                <div className="w-full md:hidden bg-black h-[1px] z-0"></div>

                <div className="flex flex-col md:w-[390px] w-full items-center gap-8 py-6">
                  {phase.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-col px-8 py-0 w-full"
                    >
                      <h4 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-black text-2xl tracking-[-0.72px]">
                        {item.title}
                      </h4>
                      <p className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-lg tracking-[-0.54px]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="w-[1px] max-md:hidden bg-black h-full absolute top-0 left-[50%] transform -translate-x-1/2 z-0"></div>
        </CardContent>
      </Card>

      <img
        className="absolute object-cover top-[20%] -z-10 opacity-30 left-[-80%] rotate-[-30deg]"
        alt="Background fluid design"
        src="img-fluid2-1-1.png"
      />
    </section>
  );
};