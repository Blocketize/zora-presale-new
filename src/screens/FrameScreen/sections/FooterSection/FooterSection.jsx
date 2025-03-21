import React from "react";

export const FooterSection = () => {
  const footerNavigation = [
    {
      title: "ABOUT",
      links: ["TOKENOMICS", "HOW TO BUY", "ROADMAP"],
    },
    {
      title: "DOCS",
      links: ["WHITEPAPER", "DOCS", "BLOG"],
    },
    {
      title: "TERMS",
      links: ["TERMS OF USE", "PRIVACY POLICY", "AUDIT"],
    },
    { 
      title: "SOCIALS",
      links: ["X", "TELEGRAM", "MEDIUM"],
    },
  ];

  const socialIcons = [
    { src: "frame-2.svg", alt: "Frame" },
    { src: "frame-61.svg", alt: "Frame" },
    { src: "frame-62.svg", alt: "Frame" },
    { src: "frame-63.svg", alt: "Frame" },
  ];

  return (
    <footer className="relative w-full md:pt-52 pb-14 px-8 md:px-16 lg:px-64 flex flex-col items-center gap-[60px] bg-transparent overflow-hidden">
      <div className="flex flex-col items-center gap-12 w-full z-[2]">
        <h2 className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black md:text-5xl text-3xl tracking-[-1.44px]">
          Humanity's Digital Leap
        </h2>

        <div className="flex items-center gap-8">
          {socialIcons.map((icon, index) => (
            <img
              key={index}
              className="md:w-20 md:h-20 w-10 h-10"
              alt={icon.alt}
              src={icon.src}
            />
          ))}
        </div>

        <div className="flex md:flex-row flex-col justify-between w-full gap-8">
          {footerNavigation.map((section, index) => (
            <div key={index} className="flex flex-col items-start gap-4">
              <h3 className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-black md:text-white text-2xl tracking-[-0.72px]">
                {section.title}
              </h3>
              <div className="flex flex-col items-start">
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black md:text-white text-2xl tracking-[-0.72px] hover:underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white text-sm text-center tracking-[-0.42px] [font-family:'Satoshi-Regular',Helvetica]">
          Participation in the Zora token presale is subject to the following
          terms and conditions. This is not an offer to sell securities.
          Cryptocurrencies, including the Zora token, are highly speculative and
          volatile investments that carry significant financial risks, including
          the potential loss of your entire investment. Prices may fluctuate
          widely due to market conditions, regulatory changes, or other
          unforeseen factors. Participation is at your own risk, and you should
          only invest what you can afford to lose. Zora and its affiliates do
          not guarantee profits, future value, or the success of the project.
          This presale is not available to residents of jurisdictions where such
          offerings are prohibited by law. Consult with a financial advisor and
          conduct your own research before participating. All information
          provided is subject to change without notice
        </p>
      </div>

      <div className="flex items-center justify-between w-full z-[2]">
        <img className="w-[80.26px] h-6" alt="Zora" src="zora.svg" />
        <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-white text-sm text-center tracking-[-0.42px]">
          All Rights Reserved, 2025
        </div>
      </div>
      <img
        className="absolute rotate-[50deg] md:bottom-[-300px] bottom-[30px] w-[80%] opacity-50"
        alt="Background fluid"
        src="img-fluid2-1-1.png"
      />
    </footer>
  );
};