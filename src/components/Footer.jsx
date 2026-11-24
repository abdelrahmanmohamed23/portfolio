import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "./Button";

export default function Footer() {
  const contactCards = [
    {
      id: "email",
      title: "Email",
      value: "heillo@abdelrahman.dev",
      href: "mailto:heillo@abdelrahman.dev",
      icon: Mail,
      isExternal: false,
    },
    {
      id: "phone",
      title: "Phone",
      value: "+20 123 456 7890",
      href: "tel:+201234567890",
      icon: Phone,
      isExternal: false,
    },
    {
      id: "location",
      title: "Location",
      value: "Cairo, Egypt",
      href: null,
      icon: MapPin,
      isExternal: false,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      value: "linkedin.com/in/abdelrahman",
      href: "https://linkedin.com/in/abdelrahman",
      icon: MapPin,
      isExternal: true,
    },
    {
      id: "github",
      title: "GitHub",
      value: "github.com/abdelrahman",
      href: "https://github.com/abdelrahman",
      icon: MapPin,
      isExternal: true,
    },
  ];

  return (
    <footer id="contact" className="w-full mt-8 mb-8  px-12">
      <div className="relative rounded-2xl bg-[#0D0E12] border border-white/10 px-8 pt-8 pb-2 overflow-hidden shadow-2xl">
     
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
         
          <div className="lg:col-span-4 flex flex-col items-start gap-3">
            <span className=" font-semibold text-primary uppercase">
              Let&apos;s Work Together
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Have a project in mind?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              I&apos;m always open to discussing new projects and creative
              ideas. Let&apos;s build something amazing!
            </p>
            <PrimaryButton
              href="mailto:heillo@abdelrahman.dev"
              Icon={ArrowUpRight}
              className="py-1"
            >
              Get In Touch
            </PrimaryButton>
          </div>

       
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {contactCards.map((card) => {
              const IconComponent = card.icon;

              const CardContent = (
                <div className="flex flex-col justify-between h-full p-4 rounded-xl bg-[#13151C] border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary mb-6">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-400 mb-1">
                      {card.title}
                    </p>
                    <p className="text-xs font-semibold text-white truncate">
                      {card.value}
                    </p>
                  </div>
                </div>
              );

              if (card.href) {
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    {...(card.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="block h-full"
                  >
                    {CardContent}
                  </a>
                );
              }

              return <div key={card.id}>{CardContent}</div>;
            })}
          </div>
        </div>

        <div className=" text-center">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Abdelrahman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
