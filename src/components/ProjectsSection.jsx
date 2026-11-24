import { ArrowUpRight, ExternalLink } from "lucide-react";
import { OutlineButton } from "./Button";
import projects from "@/data/projects.json";
import Link from "next/link";
import Image from "next/image";
export default function ProjectsSection() {
  console.log(projects);
  return (
    <section id="projects-section" className="flex flex-col gap-4 border border-white/10 py-3 px-4 mt-8 rounded-2xl scroll-mt-22">
      <div className="grid grid-cols-[1fr_auto] grid-rows-2">
        <p className="text-primary font-semibold">FEATURED PROJECTS</p>
        {true && (
          <OutlineButton
            className="row-span-2 self-center"
            Icon={ArrowUpRight}
            href={"/projects"}
            // clickHandler={() => {
            //   if (
            //     visibleTechnologiesCount > INITIAL_VISIBLE_TECHNOLOGIES_COUNT
            //   ) {
            //     setVisibleTechnologiesCount(INITIAL_VISIBLE_TECHNOLOGIES_COUNT);
            //     return setNewTechnologiesCardsState({
            //       translateValue: -16,
            //       opacityValue: 0,
            //     });
            //   }
            //   setVisibleTechnologiesCount(technologiesLength);
            // }}
          >
            {false ? "Show less" : "View all projects"}
          </OutlineButton>
        )}
        <h3 className="text-2xl font-semibold">
          Some things <span className="text-primary">I’ve built</span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col rounded-2xl bg-[#0D0E12] border border-white/10 overflow-hidden"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="absolute inset-0 z-10"
              aria-label={`View details for ${project.title}`}
            />

            <div className="relative w-full h-52 bg-[#13151C] overflow-hidden border-b border-white/5">
              <Image
                src={project.imgUrl}
                alt={project.imgAlt}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-bold text-white">
                  {project.title}
                </h3>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    className="relative z-20 p-2 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400 shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/[0.04] text-primary border border-white/[0.05]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
