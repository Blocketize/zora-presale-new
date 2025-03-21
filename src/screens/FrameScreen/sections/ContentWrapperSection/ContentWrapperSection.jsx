import Marquee from "react-fast-marquee";

export const ContentWrapperSection = () => {
  const featuredCompanies = [
    {
      name: "Coinmarketcap",
      className:
        "bg-gradient-to-b from-white to-[rgba(0.19,0.19,0.19,1)] bg-clip-text text-transparent",
    },
    { name: "Cointelegraph", className: "text-black" },
    { name: "Coingape", className: "text-black" },
    { name: "Technopedia", className: "text-black" },
    {
      name: "Binance Square",
      className:
        "bg-gradient-to-b from-[rgba(0.19,0.19,0.19,1)] to-white bg-clip-text text-transparent",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-2.5 px-6 py-[60px] md:px-[120px] w-full">
      <h2 className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-2xl tracking-[-0.96px]">
        Featured in
      </h2>

      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6 w-full mt-2">
        <Marquee autoFill={true} gradient={true}>
          {featuredCompanies.map((company, index) => (
            <div
              key={index}
              className={`[font-family:'Satoshi-Medium',Helvetica] font-medium text-[32px] tracking-[-1.28px] px-6`}
            >
              {company.name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};