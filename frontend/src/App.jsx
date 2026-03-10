import { useEffect, useState } from "react";
import animatedPortrait from "../assets/images/removebg.png";
import fullStackThumb from "../assets/images/fullstackthumb.jpg";
import uiThumb from "../assets/images/uithumb.png";
import manageThumb from "../assets/images/managethum.png";
import appointmentThumb from "../assets/images/appoinment.png";

const DISPLAY_NAME = "Christian Paul";
const HERO_TITLE = "Hi, I'm Christian Paul";
const HERO_ROLES = ["Full-Stack Developer", "MERN Specialist", "UI/UX Enthusiast", "Problem Solver"];
const HERO_WATERMARK = "FULL STACK DEV";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Building scalable, responsive web applications from scratch, handling both front-end UI and back-end logic.",
    accent: "#ff7a18",
    thumb: fullStackThumb,
    icon: (
      <>
        <path
          d="M7 8h10M7 12h6M7 16h10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M5.5 6.5h13v11h-13v-11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </>
    )
  },
  {
    title: "UI/UX & Interactive Design",
    description:
      "Creating highly interactive user interfaces with smooth animations and modern design principles.",
    accent: "#9aa7ff",
    thumb: uiThumb,
    icon: (
      <>
        <path
          d="M8 15l2.6-6.8a1 1 0 0 1 1.9 0L15 15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M9.3 12.2h4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M7 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </>
    )
  },
  {
    title: "Custom Management Systems",
    description:
      "Role-based login systems, appointment scheduling, and secure data verification for professional services.",
    accent: "#39d0ff",
    thumb: manageThumb,
    icon: (
      <>
        <path
          d="M12 21s7-4.4 7-10a7 7 0 0 0-14 0c0 5.6 7 10 7 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 11.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8.4 18.2c1.1-1.3 2.4-2 3.6-2s2.5.7 3.6 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    )
  }
];

const projects = [
  {
    title: "HOSPITAL APPOINTMENT using MERN STACK",
    description: "Hospital appointment booking web app built with the MERN stack.",
    tags: ["MongoDB", "Express", "React", "Node.js", "MERN"],
    liveHref: "https://hospitalproj.vercel.app",
    codeHref: "#",
    thumb: appointmentThumb
  },
  {
    title: "Project",
    description: "Add a short project description here.",
    tags: ["UI/UX", "Frontend"],
    liveHref: "#",
    codeHref: "#"
  },
  {
    title: "Project",
    description: "Add a short project description here.",
    tags: ["Landing Page", "Responsive"],
    liveHref: "#",
    codeHref: "#"
  }
];

const techStack = [
  { label: "JavaScript", glyph: "JS", accent: "#f7df1e" },
  { label: "TypeScript", glyph: "TS", accent: "#3178c6" },
  { label: "React", glyph: "⚛", accent: "#61dafb" },
  { label: "Node.js", glyph: "N", accent: "#3c873a" },
  { label: "HTML", glyph: "<>", accent: "#e34f26" },
  { label: "CSS", glyph: "{}", accent: "#264de4" },
  { label: "Tailwind", glyph: "TW", accent: "#38bdf8" },
  { label: "Git", glyph: "G", accent: "#f05032" },
  { label: "Python", glyph: "PY", accent: "#3776ab" }
];

export default function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showHello, setShowHello] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [activeRoleText, setActiveRoleText] = useState("");
  const [activeRoleDeleting, setActiveRoleDeleting] = useState(false);

  const isRealHref = (href) => typeof href === "string" && href.trim().length > 0 && href.trim() !== "#";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (projects.length <= 1) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const intervalId = window.setInterval(() => {
      setActiveProjectIndex((current) => (current + 1) % projects.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      setShowHello(true);
      return;
    }

    const timeoutId = window.setTimeout(() => setShowHello(true), 280);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (HERO_ROLES.length === 0) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      setActiveRoleText(HERO_ROLES[0]);
      return;
    }

    const fullText = HERO_ROLES[activeRoleIndex % HERO_ROLES.length];
    const nextText = activeRoleDeleting
      ? fullText.slice(0, Math.max(0, activeRoleText.length - 1))
      : fullText.slice(0, activeRoleText.length + 1);

    let delayMs = activeRoleDeleting ? 42 : 70;

    if (!activeRoleDeleting && nextText === fullText) delayMs = 1150;
    if (activeRoleDeleting && nextText.length === 0) delayMs = 340;

    const timeoutId = window.setTimeout(() => {
      setActiveRoleText(nextText);

      if (!activeRoleDeleting && nextText === fullText) {
        setActiveRoleDeleting(true);
      } else if (activeRoleDeleting && nextText.length === 0) {
        setActiveRoleDeleting(false);
        setActiveRoleIndex((current) => (current + 1) % HERO_ROLES.length);
      }
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [activeRoleDeleting, activeRoleIndex, activeRoleText]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (revealTargets.length === 0) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      revealTargets.forEach((element) => element.classList.add("revealVisible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.22) {
            entry.target.classList.add("revealVisible");
          } else if (entry.intersectionRatio === 0) {
            entry.target.classList.remove("revealVisible");
          }
        });
      },
      { threshold: [0, 0.22], rootMargin: "0px 0px -20% 0px" }
    );

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goToProject = (index) => {
    const nextIndex = ((index % projects.length) + projects.length) % projects.length;
    setActiveProjectIndex(nextIndex);
  };
  const goPrevProject = () => goToProject(activeProjectIndex - 1);
  const goNextProject = () => goToProject(activeProjectIndex + 1);

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#top" className="text-sm font-semibold tracking-tight text-white/90">
              {DISPLAY_NAME}
            </a>
            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur md:flex">
              <a className="rounded-full px-4 py-2 hover:bg-white/5 hover:text-white" href="#top">
                Home
              </a>
              <a className="rounded-full px-4 py-2 hover:bg-white/5 hover:text-white" href="#services">
                Services
              </a>
              <a className="rounded-full px-4 py-2 hover:bg-white/5 hover:text-white" href="#work">
                Projects
              </a>
              <a className="rounded-full px-4 py-2 hover:bg-white/5 hover:text-white" href="#about">
                About
              </a>
            </nav>
            <a href="#contact" className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10 hover:text-white md:inline-flex">
              Get in Touch
            </a>
          </div>
      </header>

      <section
        id="top"
        className="hero-frame relative flex min-h-[100svh] w-full items-stretch overflow-hidden bg-[#090707]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-64 h-[720px] w-[720px] rounded-full bg-orange-500/18 blur-[170px]"></div>
          <div className="absolute -right-44 -top-56 h-[760px] w-[760px] rounded-full bg-orange-500/28 blur-[190px]"></div>
          <div className="absolute right-28 top-10 h-[420px] w-[420px] rounded-full bg-amber-300/10 blur-[150px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_55%_35%,rgba(255,120,20,0.24),transparent_62%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/75"></div>
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 to-transparent"></div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center px-6 md:top-28">
          <p className="select-none whitespace-nowrap text-[78px] font-extrabold uppercase leading-none tracking-tight text-white/15 sm:text-[110px] md:text-[155px] lg:text-[185px]">
            {HERO_WATERMARK}
          </p>
        </div>

        <div className="relative z-10 flex w-full flex-1 items-center px-6 pt-28 md:pl-10 md:pr-14 md:pt-32 lg:pl-12">
          <div className="heroCopy text-left">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:whitespace-nowrap">
              <span className="heroAuroraText">{HERO_TITLE}</span>
            </h1>
            <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
              <span className="sr-only">
                {`Roles: ${HERO_ROLES.join(", ")}.`}
              </span>
              <span aria-hidden="true">
                <span className="text-white/65">I build as a </span>
                <span className="text-white">{activeRoleText}</span>
                <span className="typingCaret" aria-hidden="true">
                  |
                </span>
              </span>
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 z-10 flex justify-end px-2 pb-14 md:px-6 md:pb-16">
          <div className="heroAvatarWrap w-[300px] translate-x-6 sm:w-[340px] md:w-[420px] md:translate-x-10 md:-translate-y-8 lg:w-[500px] lg:translate-x-14 lg:-translate-y-10">
            {showHello ? (
              <div className="heroHelloWrap" aria-hidden="true">
                <div className="heroHello">Hi! my name is Christian nice to meet youu!!</div>
              </div>
            ) : null}
            <img src={animatedPortrait} alt="" className="heroAvatar select-none" draggable={false} />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 px-6 py-5 md:px-12">
          <div className="techMarquee">
            <ul
              className="techTrack motion-reduce:animate-none"
              style={{ "--marquee-duration": "26s" }}
              aria-label="Technology stack"
            >
              {[...techStack, ...techStack].map((item, index) => {
                const isDuplicate = index >= techStack.length;
                return (
                  <li
                    key={`${item.label}-${index}`}
                    className="techPill"
                    style={{ "--accent": item.accent }}
                    aria-hidden={isDuplicate ? "true" : "false"}
                  >
                    <span className="techGlyph" aria-hidden="true">
                      {item.label === "React" ? "\u269B" : item.glyph}
                    </span>
                    <span className="techLabel">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="services"
        data-reveal
        className="revealSection mx-auto max-w-6xl px-6 py-20"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
          <p className="mt-2 text-sm text-white/50">What I can build for you</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="serviceCard"
              style={{
                ["--accent"]: service.accent,
                ["--delay"]: `${index * 140}ms`
              }}
            >
              <div className="serviceThumb" aria-hidden="true">
                <img
                  src={service.thumb}
                  alt=""
                  className="serviceThumbImg"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
                <div className="serviceIcon">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    {service.icon}
                  </svg>
                </div>
              </div>

              <h3 className="mt-5 text-base font-semibold tracking-tight text-white/90">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" data-reveal className="revealSection mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Work</h2>
          <p className="mt-2 text-sm text-white/50">Selected projects</p>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeProjectIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <article key={`${project.title}-${index}`} className="w-full shrink-0 p-7 md:p-10">
                  <div className="grid items-center gap-8 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-300/10 to-white/0">
                        {project.thumb || project.thumbSrc ? (
                          <img
                            src={project.thumb ?? project.thumbSrc}
                            alt={`${project.title} thumbnail`}
                            className="absolute inset-0 h-full w-full object-cover"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-[radial-gradient(400px_220px_at_45%_35%,rgba(255,255,255,0.20),transparent_65%)]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                        <div className="absolute inset-0 ring-1 ring-white/10" />
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{project.description}</p>

                      <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-center gap-4 text-sm text-white/75 md:justify-start">
                        {isRealHref(project.liveHref) ? (
                          <a
                            className="hover:text-white"
                            href={project.liveHref}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live
                          </a>
                        ) : null}
                        {isRealHref(project.codeHref) ? (
                          <a
                            className="hover:text-white"
                            href={project.codeHref}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Code
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goPrevProject}
            className="group absolute left-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-2.5 text-white/80 backdrop-blur transition hover:bg-black/55 hover:text-white"
            aria-label="Previous project"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M14.5 5.5L8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNextProject}
            className="group absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-2.5 text-white/80 backdrop-blur transition hover:bg-black/55 hover:text-white"
            aria-label="Next project"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path
                d="M9.5 5.5L16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToProject(index)}
                className={[
                  "h-2.5 w-2.5 rounded-full border transition",
                  index === activeProjectIndex
                    ? "border-orange-400/60 bg-orange-400/60"
                    : "border-white/20 bg-white/10 hover:bg-white/20"
                ].join(" ")}
                aria-label={`Go to project ${index + 1}`}
                aria-current={index === activeProjectIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" data-reveal className="revealSection mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Add a short bio and what you specialize in.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <p className="text-sm leading-7 text-white/70">
                This is a placeholder paragraph for your about section. Replace it with your real story,
                stack, and highlights.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                {["Skill", "Skill", "Skill", "Skill", "Skill"].map((t, idx) => (
                  <span key={idx} className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" data-reveal className="revealSection mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">Add your email and socials here.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a className="rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-white/80 hover:bg-black/30 hover:text-white" href="mailto:you@example.com">
              Email
            </a>
            <a className="rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-white/80 hover:bg-black/30 hover:text-white" href="#">
              GitHub
            </a>
            <a className="rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-white/80 hover:bg-black/30 hover:text-white" href="#">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
