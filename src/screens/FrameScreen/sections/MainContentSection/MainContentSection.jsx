import React, { useState, useEffect, useRef } from "react";

export const MainContentSection = () => {
  const sectionData = {
    title: "The ultimate dapp for digital humans",
    description:
      "Zora is one of the first modular AI Dapps, empowering you to create AI-powered humans that will grow smarter with advancements in artificial intelligence.\n\nWith the Zora Dapp, designing and personalizing your own digital character will be effortless. No programming or coding skills are needed. Our intuitive interface will provide all the tools to lead this revolutionary shift.",
  };

  const [images, setImages] = useState(["dapp-1-2.png", "dapp-3.png", "dapp-2.png"]);
  const imageContainerRef = useRef(null);

  const handleImageClick = (index) => {
    if (index === 1) return;
    const newImages = [...images];
    if (index === 0) {
      setImages([images[2], images[0], images[1]]);
    } else if (index === 2) {
      setImages([images[1], images[2], images[0]]);
    }
  };

  const handleScroll = (event) => {
    if (!imageContainerRef.current.contains(event.target)) return;
    if (event.deltaY > 0) {
      setImages([images[2], images[0], images[1]]);
    } else {
      setImages([images[1], images[2], images[0]]);
    }
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    container.addEventListener("wheel", handleScroll);
    return () => container.removeEventListener("wheel", handleScroll);
  }, [images]);

  return (
    <section className="flex flex-col items-center gap-12 md:px-[120px] px-[20px] py-[60px] w-full">
      <h2 className="md:text-5xl text-3xl md:text-start text-center tracking-[-1.44px] font-normal [font-family:'Satoshi-Regular',Helvetica] text-black">
        {sectionData.title}
      </h2>

      <div className="flex md:flex-row flex-col items-center justify-center gap-[60px] w-full">
        <div 
          ref={imageContainerRef} 
          className="flex md:w-[790px] w-full items-center justify-center relative overflow-hidden">
          <img
            src={images[0]}
            alt="Left"
            onClick={() => handleImageClick(0)}
            className="absolute md:w-[331px] md:h-[630px] opacity-40 w-[239px] h-[454px] 
                   top-[30px] md:left-0 left-[-100px] z-[1] cursor-pointer transition-all duration-500"
          />
          <img
            src={images[1]}
            alt="Center"
            className="relative md:w-[362px] w-[261px] h-[497px] md:h-[689px] z-[2] transition-all duration-500"
          />
          <img
            src={images[2]}
            alt="Right"
            onClick={() => handleImageClick(2)}
            className="absolute md:w-[331px] md:h-[630px] opacity-40 w-[239px] h-[454px] 
                   top-[30px] md:left-[459px] max-md:right-[-20px] z-0 cursor-pointer transition-all duration-500"
          />
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