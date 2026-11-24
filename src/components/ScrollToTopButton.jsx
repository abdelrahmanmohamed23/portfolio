"use client";
import { useAutoScroll } from "@/contexts/AutoScrollContext";
import { ArrowUp } from "lucide-react";
export default function ScrollToTopButton() {
  const isAutoScrollingRef = useAutoScroll();
  function scrollToTop() {
    isAutoScrollingRef.current = true;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      className="z-10 fixed bg-background  bottom-10 right-10 border border-primary animate-border-spin p-4 rounded-full cursor-pointer"
      onClick={scrollToTop}
    >
      {/* <div className="absolute flex justify-center items-center  inset-0 @container-size before:absolute before:spinner    before:content-['']  before:border-[50cqh] before:border-b-transparent before:border-r-transparent before:border-l-transparent before:block before:border-primary before:rounded-full before:w-0 ">
        <div className="w-[90%] h-[90%] relative bg-background rounded-full flex justify-center items-center"> */}
      <ArrowUp className="h-8 w-8 text-primary" />
      {/* </div>
      </div> */}
    </button>
  );
}
