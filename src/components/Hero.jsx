"use client";
import { PrimaryButton, OutlineButton } from "./Button.jsx";
import features from "./features.json";
import { useEffect, useState } from "react";
const featuresLength = features.length;
function Hero() {
  return (
    <section id="hero" className="flex scroll-m-22 justify-between flex-col lg:flex-row">
      <About />
      <Features />
    </section>
  );
}
export default Hero;

function About() {
  return (
    <div className="flex flex-col mt-18 gap-2 ">
      <h1 className="text-[64px] font-bold leading-18">Abdelrahman</h1>
      <h2 className="text-5xl font-semibold text-primary">
        Full Stack Develpor
      </h2>
      <p className="text-text-secondary">
        i build secure scaluble high performacne work
      </p>
      <div className="flex mt-10 gap-5">
        <PrimaryButton
        className="px-8.5"
          onClick={() => {
            document.getElementById("projects-section").scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          View my work
        </PrimaryButton>
        <OutlineButton className="px-8">Download CV</OutlineButton>
      </div>
      <p className="before:bg-status-available relative text-xs mt-13  before:content-[''] before:absolute before:-left-5 ml-5  before:top-1/2 before:-translate-y-1/2  before:h-3 before:w-3 before:bg-active before:rounded-full">
        Available for work
      </p>
    </div>
  );
}

function Features() {
  const [intervalRunning, setIntervalRunning] = useState(true);
  const [featuresState, setFeaturesState] = useState({
    activeFeatureIndex: 0,
    rotationValue: 0,
    direction: "forward",
  });

  useEffect(() => {
    if (!intervalRunning) return;
    const interval = setInterval(() => {
      rotateFeatures3D({ direction: "forward" });
    }, 5000);
    return () => clearInterval(interval);
  }, [intervalRunning]);

  function rotateFeatures3D({ direction }) {
    setFeaturesState((prev) => {
      if (direction === "backward") {
        return {
          activeFeatureIndex:
            (prev.activeFeatureIndex - 1 + featuresLength) % featuresLength,
          rotationValue: prev.rotationValue - 180,
          direction: direction,
        };
      }
      return {
        activeFeatureIndex: (prev.activeFeatureIndex + 1) % featuresLength,
        rotationValue: prev.rotationValue + 180,
        direction: direction,
      };
    });
  }

  return (
    <div className="col-start-8 w-[350px] h-[400px] mt-13 mr-20 perspective-distant">
      <div
        className="relative w-full h-full transform-3d transition-transform duration-800"
        style={{ transform: `rotateY(${featuresState.rotationValue}deg)` }}
      >
        <FeatureCard
          face="front"
          featuresState={featuresState}
          rotateFeatures3D={rotateFeatures3D}
          setIntervalRunning={setIntervalRunning}
        />
        <FeatureCard
          face="back"
          featuresState={featuresState}
          rotateFeatures3D={rotateFeatures3D}
          setIntervalRunning={setIntervalRunning}
        />
        {/* bg-[rgba(168,85,247,0.55)] */}
        {/* {shadow-[0_0_12px_#a855f7,0_0_30px_rgba(168,85,247,.65),0_0_70px_rgba(168,85,247,.35),0_35px_90px_rgba(0,0,0,.6)]} */}
        <div
          className="backface-hidden w-2 left-[171px]  h-full bg-primary   absolute -rotate-y-90 -translate-x-[175px] shadow-[0_0_12px_#00D2FF,0_0_30px_rgba(0,210,255,.65),0_0_70px_rgba(0,210,255,.35),0_35px_90px_rgba(0,0,0,.6)]
"
        ></div>
        <div
          className="backface-hidden w-2 left-[171px] shadow-[0_0_12px_#00D2FF,0_0_30px_rgba(0,210,255,.65),0_0_70px_rgba(0,210,255,.35),0_35px_90px_rgba(0,0,0,.6)]
  h-full bg-primary  absolute rotate-y-90 translate-x-[175px]"
        ></div>
      </div>
    </div>
  );
}
function FeatureCard({
  face,
  featuresState,
  rotateFeatures3D,
  setIntervalRunning,
}) {
  const activeFeatureIndex = featuresState.activeFeatureIndex;
  const isActiveFace =
    (featuresState.rotationValue % 360 === 0 ? "front" : "back") === face;
  let featureIndex;
  if (isActiveFace) {
    featureIndex = activeFeatureIndex;
  } else {
    if (featuresState.direction === "forward") {
      featureIndex = (activeFeatureIndex - 1 + featuresLength) % featuresLength;
    } else {
      featureIndex = (activeFeatureIndex + 1) % featuresLength;
    }
  }
  const feature = features[featureIndex];
  console.log(feature);
  return (
    <div
      onMouseEnter={() => {
        if (!window.matchMedia("(hover: hover)").matches) return;
        setIntervalRunning(false);
      }}
      onMouseLeave={() => {
        setIntervalRunning(true);
      }}
      // shadow-[0_0_3px_rgba(168,85,247,1),0_0_25px_rgba(168,85,247,.6),0_0_60px_rgba(168,85,247,.45),0_0_120px_rgba(168,85,247,.25)]
      className={
        "flex flex-col gap-4 px-6 pt-6 backface-hidden inset-0 absolute w-full h-full border  border-[#8b5cf680] bg-[linear-gradient(180deg,rgba(20,18,34,.95),rgba(9,10,16,.95))] shadow-[0_0_3px_rgba(0,210,255,1),0_0_25px_rgba(0,210,255,.6),0_0_60px_rgba(0,210,255,.45),0_0_120px_rgba(0,210,255,.25)] shadow-[0_0_3px_rgba(0,210,255,1),0_0_25px_rgba(0,210,255,.6),0_0_60px_rgba(0,210,255,.45),0_0_120px_rgba(0,210,255,.25)] " +
        (face === "back" ? "-translate-z-1 rotate-y-180" : "translate-z-1")
      }
    >
      <p className="text-primary font-semibold">FEATURED</p>
      {/* shadow-[inset_0_0_30px_rgba(168,85,247,.35),0_0_28px_rgba(168,85,247,.3),0_0_48px_rgba(168,85,247,.15),0_10px_28px_rgba(0,0,0,.38)] */}
      <svg
        className=" border border-primary rounded-lg h-20 w-20 shadow-[inset_0_0_30px_rgba(0,210,255,.35),0_0_28px_rgba(0,210,255,.3),0_0_48px_rgba(0,210,255,.15),0_10px_28px_rgba(0,0,0,.38)]
 fill-primary"
        viewBox="0 0 24 24"
      >
        <path d={feature.icon} />
      </svg>
      <h3 className="font-semibold text-2xl ">{feature.title}</h3>
      <p className="text-sm text-text-secondary">{feature.description}</p>
      <div className="flex mt-12 justify-between">
        <OutlineButton
          clickHandler={() => {
            rotateFeatures3D({ direction: "backward" });
          }}
          pxValue={5}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4"
          >
            <path
              fill="#fff"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            />
          </svg>
        </OutlineButton>
        <div className="flex justify-between gap-3 items-center">
          {Array.from({ length: featuresLength }).map((element, index) => (
            <div
              className={
                "h-2 w-2  rounded-full " +
                (index === featureIndex ? "bg-primary" : "bg-[#575672]")
              }
            ></div>
          ))}
        </div>
        <OutlineButton
          clickHandler={() => {
            rotateFeatures3D({ direction: "forward" });
          }}
          pxValue={5}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 w-4"
          >
            <path
              fill="#fff"
              d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg>
        </OutlineButton>
      </div>
    </div>
  );
}
