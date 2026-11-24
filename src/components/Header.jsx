"use client";
import {
  useState,
  useContext,
  useRef,
  useLayoutEffect,
  use,
  useEffect,
} from "react";
import { StoreContext } from "./StoreProvider";
import { useStore } from "zustand";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAutoScroll } from "@/contexts/AutoScrollContext";
function Header({ refs }) {
  const store = useContext(StoreContext);
  const isAutoScrollingRef = useAutoScroll()
  const sectionsRefs = useStore(store, (state) => state.sectionsRefs);
  const activeSection = useActiveSection([
    "contact",
    "projects-section",
    "technologies-section",
    "hero",
  ]);

  const linksData = [
    { label: "Home", href: "" , sectionId: "hero"},
    {
      label: "Technologies",
      href: "#technologies",
      sectionId: "technologies-section",
    },
    {
      label: "Projects",
      href: "#projects",
      sectionId: "projects-section",
    },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ];
  const linksRef = useRef(new Map());
  const [parentRect, setParentRect] = useState({});
  const [firstElementRect, setFirstElementRect] = useState({});
  const parentRef = useRef(null);
  const point = useRef(null);
  const firstElementRef = useRef(null);
  const initialPointRef = useRef(null);
  useLayoutEffect(() => {
    point.current.style.opacity = 100;
    initialPointRef.current.style.opacity = 0;
    setParentRect(parentRef.current.getBoundingClientRect());
    setFirstElementRect(firstElementRef.current.getBoundingClientRect());
    console.log(
      getNavIndicatorOffset({
        parentStart: parentRef.current.getBoundingClientRect().left,
        linkSize: linksRef.current
          .get(activeSection || "hero")
          .getBoundingClientRect().width,
        linkStart: linksRef.current
          .get(activeSection || "hero")
          .getBoundingClientRect().left,
      }),
    );
    if (!isAutoScrollingRef.current) {
      point.current.style.transform = getNavIndicatorOffset({
        parentStart: parentRef.current.getBoundingClientRect().left,
        linkSize: linksRef.current
          .get(activeSection || "hero")
          .getBoundingClientRect().width,
        linkStart: linksRef.current
          .get(activeSection || "hero")
          .getBoundingClientRect().left,
      });
    }
  }, [activeSection]);
  useEffect(() => {
    let isScrolling;

    window.addEventListener("scroll", function () {
      window.clearTimeout(isScrolling);

      isScrolling = setTimeout(function () {
        isAutoScrollingRef.current = false;
      }, 100);
    });
  }, []);

  return (
    <header className="h-22 flex items-center justify-between px-12 z-50 sticky top-0 bg-background">
      <Link scroll={false} href="/">
        <img
          className="h-16 hover:scale-105   transition-all duration-300 "
          src={"/logo.png"}
          alt=""
        />
      </Link>
      <nav>
        <ul ref={parentRef} className="flex gap-12 relative ">
          {linksData.map(({ label, href, sectionId }, index) => {
            const isFirstLink = index === 0;
            return (
              <li key={href} className="relative">
                <a
                  ref={(node) => {
                    if (isFirstLink) {
                      firstElementRef.current = node;
                    }
                    linksRef.current.set(sectionId, node);
                  }}
                  onClick={(event) => {
                    handleNavLinkClick({
                      event,
                      isAutoScrollingRef,
                      label,
                      parentRect,
                      sectionId,
                      point: point.current,
                      activeSection,
                    });
                  }}
                  href={href}
                  className={`relative font-semibold`}
                >
                  {label}
                </a>
                {isFirstLink && (
                  <div
                    ref={initialPointRef}
                    className=" absolute left-1/2 top-[calc(100%+0.3rem)] -translate-x-1/2 h-1.5 w-1.5 bg-primary rounded-full"
                  ></div>
                )}
              </li>
            );
          })}
          <span
            style={{
              transform: getNavIndicatorOffset({
                parentStart: parentRect.left,
                linkSize: firstElementRect.width,
                linkStart: firstElementRect.left,
              }),
            }}
            ref={point}
            className="block absolute transition-transform duration-0  opacity-0  top-[calc(100%+0.3rem)]  h-1.5 w-1.5 bg-primary rounded-full"
          ></span>
        </ul>
      </nav>
    </header>
  );
}

function handleNavLinkClick({
  activeSection,
  event,
  isAutoScrollingRef,
  sectionId,

  parentRect,
  point,
}) {
  const element = event.currentTarget.getBoundingClientRect();

  event.preventDefault();
  point.style.transform = getNavIndicatorOffset({
    parentStart: parentRect.left,
    linkSize: element.width,
    linkStart: element.left,
  });
  point.style.transitionDuration = "300ms";
  isAutoScrollingRef.current = true;
  if (sectionId) {
    return document.getElementById(sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  ref.current.scrollIntoView({ behavior: "smooth" });
}
function getNavIndicatorOffset({
  direction = "row",
  parentStart,
  linkStart,
  linkSize,
}) {
  const distanceBetweenParentAndChild = linkStart - parentStart;
  const childMidpoint = linkSize / 2;
  return `translateX(calc(${distanceBetweenParentAndChild + childMidpoint}px - 50%))`;
}
export default Header;
