"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { SiteHeader } from "./site-header";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];

export default function Hero() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <><SiteHeader /><div className="min-h-screen w-screen overflow-hidden bg-black font-[Poppins] text-[calc(var(--_size)*0.022)] [--_factor:min(1000px,100vh)] [--_size:min(var(--_factor),100vw)]">
      <div className="relative flex flex-col min-h-screen w-full items-center justify-center pt-10 px-4 md:px-0 pb-0">
        <div className="z-10 flex min-h-10 items-center justify-center pb-0 py-10 pb-3">
          <div
            className={cn(
              "group rounded-full border border-white/10 bg-transparent text-[#86868b] transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-0.5 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing Mocks Studio</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <motion.div
          className="absolute h-full w-full max-w-[44em]"
          initial={{ opacity: 0.3, scale: 1.2 }}
          animate={{ opacity: 0.8, scale: 1.2 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
            initial={{ translateY: "-70%" }}
            animate={{ translateY: "-64%" }}
            transition={{ duration: 1, ease: "easeInOut" }} />
          <motion.div
            className="absolute h-full w-full rounded-[100em] opacity-60 shadow-[inset_0_0_4em_3em_rgba(238,200,175,0.2),inset_0_0_2em_0.4em_rgba(238,200,175,0.2),0_0_0.1em_0.1em_rgba(238,200,175,0.2),0_0_1em_0.4em_rgba(238,200,175,0.3)]"
            initial={{ translateY: "70%" }}
            animate={{ translateY: "64%" }}
            transition={{ duration: 1, ease: "easeInOut" }} />
        </motion.div>

        <div className="relative z-10 text-center pb-10">
          <h1 className="text-[2em] sm:text-[2.5em] md:text-[3em] font-semibold leading-[1.0625] tracking-[-0.009em] text-[#c8c2bd]">
            Transform Screenshots
            <br />
            <motion.span
              className="relative inline-block"
              initial={{ scale: 1 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="relative z-10 bg-gradient-to-b from-[#000000] to-[#fffaf6] bg-clip-text text-transparent filter-[url(#glow-4)]">
                Into Stunning Video Ads
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-b from-[#dfe5ee] to-[#fffaf6] bg-clip-text text-transparent filter-[url(#glow-4)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.24 }}
                aria-hidden="true"
              >
                Into Stunning Video Ads
              </motion.span>
            </motion.span>
            <br />
            In Seconds
          </h1>
          <Button
            variant="outline"
            className="text-black hover:from-[#bdc2c9] hover:to-[#e7dfd6] bg-gradient-to-r from-[#86868b] to-[#bdc2c9]  border-none mt-5"
            size="lg"
            onClick={() => window.location.href = '/mockup-home'}
          >
            Create Video Ad <ArrowRightIcon className="h-3 w-3" />
          </Button>
          <p className="absolute left-0 right-0 mx-auto mt-[8em] sm:mt-[10em] md:mt-[12em] max-w-[28em] bg-gradient-to-b from-[#86868b] to-[#bdc2c9] bg-clip-text text-center font-semibold text-transparent text-sm sm:text-base md:text-lg">
            Turn your{" "}
            <span className="relative inline-block font-extrabold text-[#e7dfd6]">
              website, product, or software screenshots
            </span>{" "}
            into professional video ads instantly. No video editing or animation skills needed - just upload and choose your style.
          </p>
        </div>
      </div>

      <Companies />

      <svg
        className="absolute z-[-1] h-0 w-0"
        width="1440px"
        height="300px"
        viewBox="0 0 1440 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="glow-4"
            colorInterpolationFilters="sRGB"
            x="-50%"
            y="-200%"
            width="200%"
            height="500%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4"
              result="blur4" />
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="19"
              result="blur19" />
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="9"
              result="blur9" />
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="30"
              result="blur30" />
            <feColorMatrix
              in="blur4"
              result="color-0-blur"
              type="matrix"
              values="1 0 0 0 0 0 0.9803921568627451 0 0 0 0 0 0.9647058823529412 0 0 0 0 0 0.8 0" />
            <feOffset
              in="color-0-blur"
              result="layer-0-offsetted"
              dx="0"
              dy="0" />
            <feColorMatrix
              in="blur19"
              result="color-1-blur"
              type="matrix"
              values="0.8156862745098039 0 0 0 0 0 0.49411764705882355 0 0 0 0 0 0.2627450980392157 0 0 0 0 0 1 0" />
            <feOffset
              in="color-1-blur"
              result="layer-1-offsetted"
              dx="0"
              dy="2" />
            <feColorMatrix
              in="blur9"
              result="color-2-blur"
              type="matrix"
              values="1 0 0 0 0 0 0.6666666666666666 0 0 0 0 0 0.36470588235294116 0 0 0 0 0 0.65 0" />
            <feOffset
              in="color-2-blur"
              result="layer-2-offsetted"
              dx="0"
              dy="2" />
            <feColorMatrix
              in="blur30"
              result="color-3-blur"
              type="matrix"
              values="1 0 0 0 0 0 0.611764705882353 0 0 0 0 0 0.39215686274509803 0 0 0 0 0 1 0" />
            <feOffset
              in="color-3-blur"
              result="layer-3-offsetted"
              dx="0"
              dy="2" />
            <feColorMatrix
              in="blur30"
              result="color-4-blur"
              type="matrix"
              values="0.4549019607843137 0 0 0 0 0 0.16470588235294117 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feOffset
              in="color-4-blur"
              result="layer-4-offsetted"
              dx="0"
              dy="16" />
            <feColorMatrix
              in="blur30"
              result="color-5-blur"
              type="matrix"
              values="0.4235294117647059 0 0 0 0 0 0.19607843137254902 0 0 0 0 0 0.11372549019607843 0 0 0 0 0 1 0" />
            <feOffset
              in="color-5-blur"
              result="layer-5-offsetted"
              dx="0"
              dy="64" />
            <feColorMatrix
              in="blur30"
              result="color-6-blur"
              type="matrix"
              values="0.21176470588235294 0 0 0 0 0 0.10980392156862745 0 0 0 0 0 0.07450980392156863 0 0 0 0 0 1 0" />
            <feOffset
              in="color-6-blur"
              result="layer-6-offsetted"
              dx="0"
              dy="64" />
            <feColorMatrix
              in="blur30"
              result="color-7-blur"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.68 0" />
            <feOffset
              in="color-7-blur"
              result="layer-7-offsetted"
              dx="0"
              dy="64" />
            <feMerge>
              <feMergeNode in="layer-0-offsetted" />
              <feMergeNode in="layer-1-offsetted" />
              <feMergeNode in="layer-2-offsetted" />
              <feMergeNode in="layer-3-offsetted" />
              <feMergeNode in="layer-4-offsetted" />
              <feMergeNode in="layer-5-offsetted" />
              <feMergeNode in="layer-6-offsetted" />
              <feMergeNode in="layer-7-offsetted" />
              <feMergeNode in="layer-0-offsetted" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div></>
  );
}

function Companies() {
  return (
    <section id="companies" className="bg-black py-10 mt-10">
      <div className="py-14 mt-0 lg:mt-20">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-[#86868b]">
            TRUSTED BY LEADING TEAMS
          </h3>

          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-4">
              {companies.map((logo, idx) => (
                <img
                  key={idx}
                  src={`https://cdn.magicui.design/companies/${logo}.svg`}
                  className="h-8 w-32 sm:h-10 sm:w-40 px-2 brightness-0 invert"
                  alt={logo}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
