import React from "react";

export const MainContentSection = () => {
  const sectionData = {
    title: "The ultimate dapp for digital humans",
    description:
      "Zora is one of the first modular AI Dapps, empowering you to create AI-powered humans that will grow smarter with advancements in artificial intelligence.\n\nWith the Zora Dapp, designing and personalizing your own digital character will be effortless. No programming or coding skills are needed. Our intuitive interface will provide all the tools to lead this revolutionary shift.",
    images: [
      {
        src: "dapp-1-2.png",
        alt: "Dapp",
        className: "absolute md:w-[331px] md:h-[630px] w-[239px] h-[454px] top-[30px] md:left-0 left-[-100px] z-[1]",
      },
      {
        src: "dapp-3.png",
        alt: "Dapp",
        className: "relative md:w-[362px] w-[261px] h-[497px] md:h-[689px] z-[2]",
      },
      {
        src: "dapp-2.png",
        alt: "Dapp",
        className: "absolute md:w-[331px] md:h-[630px] w-[239px] h-[454px] top-[30px] md:left-[459px] max-md:right-[-20px] z-0",
      },
    ],
  };

  return (
    <section className="flex flex-col items-center gap-12 md:px-[120px] px-[20px] py-[60px] w-full">
      <h2 className="md:text-5xl text-3xl md:text-start text-center tracking-[-1.44px] font-normal [font-family:'Satoshi-Regular',Helvetica] text-black">
        {sectionData.title}
      </h2>

      <div className="flex md:flex-row flex-col items-center justify-center gap-[60px] w-full">
        <div className="flex md:w-[790px] w-full items-center justify-center relative">
          {sectionData.images.map((image, index) => (
            <React.Fragment key={index}>
              <img
                className={`${image.className} object-cover ${index !== 1 && "opacity-40"}`}
                alt={image.alt}
                src={image.src}
              />
            </React.Fragment>
          ))}
        </div>

        <div className="md:w-[280px] md:text-start text-center w-full text-lg tracking-[-0.54px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black">
          {sectionData.description.split("\n\n").map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {index < sectionData.description.split("\n\n").length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};