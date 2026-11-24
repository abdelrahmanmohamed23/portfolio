"use client";
import { OutlineButton } from "./Button";
import technologies from "../../data/technologies.data";
import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "./StoreProvider";
import { useStore } from "zustand";
import { ArrowUpRight } from "lucide-react";
function Technologies({ refs }) {
  const store = useContext(StoreContext);
  const addSection = useStore(store, (state) => state.addSection);
  const INITIAL_VISIBLE_TECHNOLOGIES_COUNT = 8;
  const technologiesLength = technologies.length;
  const [newTechnologiesCardsState, setNewTechnologiesCardsState] = useState({
    translateValue: -16,
    opacityValue: 0,
  });
  const [visibleTechnologiesCount, setVisibleTechnologiesCount] = useState(
    INITIAL_VISIBLE_TECHNOLOGIES_COUNT,
  );

  useEffect(() => {
    if (visibleTechnologiesCount > INITIAL_VISIBLE_TECHNOLOGIES_COUNT) {
      // refs.technologies.current.scrollIntoView({ behavior: "smooth" });
      setNewTechnologiesCardsState({ translateValue: 0, opacityValue: 1 });
    }
  }, [visibleTechnologiesCount]);
  return (
    <section
      id="technologies-section"
      ref={(element) => {
        addSection("technologies", element);
      }}
      className="flex flex-col gap-4 border border-white/10 py-4 px-4 mt-15 rounded-2xl scroll-mt-22"
    >
      <div className="grid grid-cols-[1fr_auto] grid-rows-2">
        <p className="text-primary font-semibold">Technologies</p>
        {technologiesLength > INITIAL_VISIBLE_TECHNOLOGIES_COUNT && (
          <OutlineButton
            className="row-span-2 self-center"
            Icon={ArrowUpRight}
            clickHandler={() => {
              if (
                visibleTechnologiesCount > INITIAL_VISIBLE_TECHNOLOGIES_COUNT
              ) {
                setVisibleTechnologiesCount(INITIAL_VISIBLE_TECHNOLOGIES_COUNT);
                return setNewTechnologiesCardsState({
                  translateValue: -16,
                  opacityValue: 0,
                });
              }
              setVisibleTechnologiesCount(technologiesLength);
            }}
          >
            {visibleTechnologiesCount > INITIAL_VISIBLE_TECHNOLOGIES_COUNT
              ? "Show less"
              : "View all technologies"}
          </OutlineButton>
        )}
        <h3 className="text-2xl font-semibold">
          Technologies <span className="text-primary">I work with</span>
        </h3>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] auto-rows-30 justify-between gap-2">
        {technologies
          .slice(0, visibleTechnologiesCount)
          .map((element, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border-white/10 border transition-[opacity, transform] duration-1500 ease-out  rounded-lg gap-2"
              style={
                index >=
                Math.min(INITIAL_VISIBLE_TECHNOLOGIES_COUNT, technologiesLength)
                  ? {
                      opacity: newTechnologiesCardsState.opacityValue,
                      transform: `translate(0,${newTechnologiesCardsState.translateValue}px)`,
                    }
                  : {}
              }
            >
              <svg
                {...element.icon.props}
                className="w-16 h-16 "
                style={
                  element.icon.scaleValue
                    ? { transform: `scale(${element.icon.scaleValue})` }
                    : {}
                }
              >
                {element.icon.children}
              </svg>
              <p className="">{element.name}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Technologies;
