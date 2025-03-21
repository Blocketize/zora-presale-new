import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ContactSection } from "./sections/ContactSection";
import { ContentWrapperSection } from "./sections/ContentWrapperSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationSection } from "./sections/NavigationSection";
import { OverviewSection } from "./sections/OverviewSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { useState } from "react";
import PHWallet from "../../components/wallet/wallet";
import { useRef } from "react";
import PHWalletBuy from "../../components/wallet/walletBuy";

export const FrameScreen = () => {
  const [hamburgerStatus, setHamburgerStatus] = useState(false);
  const handleMobileHamburger = () => {
    setHamburgerStatus(!hamburgerStatus);
  };
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section4Ref = useRef(null);
  const section3Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);
  const socialIcons = [
    { src: "frame-2.svg", alt: "Frame" },
    { src: "frame-61.svg", alt: "Frame" },
    { src: "frame-62.svg", alt: "Frame" },
    { src: "frame-63.svg", alt: "Frame" },
  ];
  const scrollToSection = (section) => {
    const sectionRefs = {
      0: section1Ref,
      1: section2Ref,
      2: section3Ref,
      3: section4Ref,
      4: section5Ref,
      5: section6Ref,
    };
    console.log(sectionRefs[section]);
    sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navItems = [
    "Home",
    "About Us",
    "Whitepaper",
    "How To Buy",
    "Tokenomics",
    "Roadmap",
  ];

  return (
    <div className="flex justify-center relative w-full scrollbars-hidden">
      <div className="flex flex-col items-start md:max-w-[1440px] w-full">
        <div className="relative w-full flex max-md:border-b-2 max-md:border-black/25 items-center justify-around px-[20px] md:px-[120px] md:py-6 py-3">
          <div className="flex items-center justify-between w-full">
            <img
              className="md:w-[107.01px] w-[60px] h-8"
              alt="Zora"
              src="zora.svg"
            />

            <NavigationMenu>
              <NavigationMenuList className="flex w-full justify-center items-center gap-5">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-2xl tracking-[-0.72px] cursor-pointer"
                      onClick={() => scrollToSection(index)}
                    >
                      {item}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {hamburgerStatus ? (
              <img
                className="cursor-pointer max-sm:block hidden"
                onClick={handleMobileHamburger}
                alt="hamburger"
                src="hamburger_1.png"
              />
            ) : (
              <img
                className="cursor-pointer max-sm:block hidden"
                onClick={handleMobileHamburger}
                alt="hamburger"
                src="hamburger.png"
              />
            )}
            <div className="max-md:hidden">
              <PHWallet />
            </div>
          </div>
          {hamburgerStatus && (
            <div className="bg-white/90 w-full p-5 absolute h-[600px] bottom-[-600px] border-y-2 border-black/25 z-10 flex flex-col gap-5">
              {navItems.map((item, index) => (
                <p
                  key={index}
                  className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-2xl tracking-[-0.72px] cursor-pointer"
                  onClick={() => {
                    scrollToSection(index);
                    handleMobileHamburger();
                  }}
                >
                  {item}
                </p>
              ))}
              <div className="w-full flex flex-col justify-between h-full">
                <PHWalletBuy />
                <div className="flex w-full justify-center items-center gap-12">
                  {socialIcons.map((icon, index) => (
                    <img
                      key={index}
                      className="md:w-20 md:h-20 w-10 h-10"
                      alt={icon.alt}
                      src={icon.src}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={section1Ref} className="w-full">
          <OverviewSection />
        </div>
        <ContentWrapperSection />
        <div ref={section2Ref} className="w-full">
          <MainContentSection />
        </div>
        <HeroSection />
        <div ref={section3Ref} className="w-full">
          <NavigationSection />
        </div>
        <div ref={section4Ref} className="w-full">
          <IntroductionSection />
        </div>
        <FeaturesSection />
        <TestimonialsSection />
        <div ref={section5Ref} className="w-full">
          <GallerySection />
        </div>
        <CallToActionSection />
        <div ref={section6Ref} className="w-full">
          <ContactSection />
        </div>
        <FooterSection />
      </div>
      <img
        className="absolute w-full md:h-[1793px] h-[1300px] bottom-0 left-0 z-[1] object-cover"
        alt="Background fluid"
        src="bg-footer.png"
      />
    </div>
  );
};
