import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function PrimaryButton({ className,  children, href, Icon, ...props }) {
  const Component = href ? Link : "button";
  return (
    <Component
      {...(href && { href })}
      {...props}
      className={twMerge("flex gap-2 items-center cursor-pointer bg-(image:--gradient-button-primary) font-semibold rounded-lg  h-14 px-6" , className)}
    >
      <span> {children}</span>
      {Icon && <Icon />}
    </Component>
  );
}

export function OutlineButton({
  children,
  Icon,
  clickHandler,
  className,
  href,
}) {
  const Component = href ? Link : "button";
  return (
    <Component
      {...(href && { href })}
      onClick={clickHandler}
      className={twMerge(
        "cursor-pointer border border-white/10 rounded-lg font-semibold items-center flex gap-2 px-4 py-3",
        className,
      )}
    >
      <span>{children}</span>
      {Icon && <Icon className="text-primary" />}
    </Component>
  );
}
