import { useEffect, useState, useRef } from "react";
import animatedPortrait from "../assets/images/removebg.png";
import fullStackThumb from "../assets/images/fullstackthumb.jpg";
import uiThumb from "../assets/images/uithumb.png";
import manageThumb from "../assets/images/managethum.png";
import appointmentThumb from "../assets/images/appoinment.png";
import chatAppThumb from "../assets/images/image.png";

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

const TAG_ICONS = {
  MongoDB: { color: "#47A248", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#47A248" aria-hidden="true"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z"/></svg> },
  Express: { color: "#ffffff", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff" aria-hidden="true"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c-.013-.447-.013-.894-.013-1.341-.013-.394-.013-.827.013-1.485zm1.186-.185h9.08c-.075-3.273-2.06-5.424-4.36-5.229-2.678.257-4.54 2.43-4.72 5.229z"/></svg> },
  React: { color: "#61DAFB", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#61DAFB" aria-hidden="true"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.096-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12 9.504a23.485 23.485 0 0 0-2.347-1.543c.06-.29.117-.569.181-.835.358-1.49.75-2.4 1.2-2.812.37-.34.787-.51 1.247-.51zm-10.692.01c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 2.16 9.504a23.485 23.485 0 0 0-2.347-1.543c.06-.29.117-.569.181-.835.358-1.49.75-2.4 1.2-2.812.37-.34.787-.51 1.247-.51zM12 10.39c.74 0 1.466.035 2.163.1.703.065 1.39.17 2.05.31a22.09 22.09 0 0 1 1.227 2.205 22.09 22.09 0 0 1-1.227 2.205 22.09 22.09 0 0 1-2.05.31A22.09 22.09 0 0 1 12 15.62a22.09 22.09 0 0 1-2.163-.1 22.09 22.09 0 0 1-2.05-.31 22.09 22.09 0 0 1-1.227-2.205 22.09 22.09 0 0 1 1.227-2.205 22.09 22.09 0 0 1 2.05-.31A22.09 22.09 0 0 1 12 10.39z"/></svg> },
  "Node.js": { color: "#339933", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#339933" aria-hidden="true"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.05-.139.142-.139.241v10.15c0 .097.055.189.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.85 1.85 0 0 1-.919-1.604V6.921c0-.663.353-1.278.919-1.608l8.795-5.082a1.864 1.864 0 0 1 1.847 0l8.794 5.082c.566.33.92.945.92 1.608v10.15c0 .662-.354 1.275-.92 1.604l-8.794 5.076c-.281.163-.6.247-.924.247z"/></svg> },
  "Socket.io": { color: "#ffffff", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#ffffff" aria-hidden="true"><path d="M11.9 1C5.9 1 1 5.9 1 11.9s4.9 10.9 10.9 10.9 10.9-4.9 10.9-10.9S17.9 1 11.9 1zm-1 15.3l1.2-5.8-4.3 2.5 3.1-7.3-1.2 5.8 4.3-2.5-3.1 7.3z"/></svg> },
};

const projects = [
  {
    title: "HOSPITAL APPOINTMENT using MERN STACK",
    description: "Hospital appointment booking web app built with the MERN stack.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    liveHref: "https://hospitalproj.vercel.app",
    codeHref: "#",
    thumb: appointmentThumb
  },
  {
    title: "CHAT APP",
    description: "A real-time chat application with modern UI and live messaging features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveHref: "https://chat-app-gamma-cyan-21.vercel.app/",
    codeHref: "#",
    thumb: chatAppThumb
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
  const [contactOpen, setContactOpen] = useState(false);
  const [contactClosing, setContactClosing] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const modalRef = useRef(null);

  const closeContact = () => {
    setContactClosing(true);
    setTimeout(() => { setContactOpen(false); setContactClosing(false); }, 380);
  };

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

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeContact(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        "service_rgg65ol",    // EmailJS Service ID
        "template_mfjffxt",   // EmailJS Template ID
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
        },
        "upxXU9cdk9-sByBoD"     // EmailJS Public Key
      );
      setContactSent(true);
      setTimeout(() => { closeContact(); setTimeout(() => { setContactSent(false); setContactForm({ name: "", email: "", message: "" }); }, 400); }, 2200);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send message: " + (err?.text || err?.message || JSON.stringify(err)));
    }
  };

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
            <button onClick={() => setContactOpen(true)} className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10 hover:text-white md:inline-flex">
              Get in Touch
            </button>
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
              aria-label="Technology stack"
            >
              {[...techStack, ...techStack, ...techStack, ...techStack].map((item, index) => {
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
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                          >
                            {TAG_ICONS[tag]?.svg ?? null}
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-center gap-4 text-sm md:justify-center">
                        {isRealHref(project.liveHref) ? (
                          <a
                            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_18px_rgba(251,146,60,0.55)] transition hover:shadow-[0_0_28px_rgba(251,146,60,0.8)] hover:scale-105 active:scale-95"
                            href={project.liveHref}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40 opacity-75"></span>
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-black/60"></span>
                            </span>
                            Live
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M7 17L17 7M17 7H7M17 7v10"/>
                            </svg>
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
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-1 text-sm text-white/50">Full-Stack Developer based in Sariaya, Quezon.</p>
          <div className="mt-4">
            <p className="text-sm leading-7 text-white/70">
                Hello! I'm Christian. I am a Full-Stack Developer based in Sariaya Quezon, specializing in the MERN stack. I have a deep-rooted fascination with creating interactive, high-performance web applications that feature modern UI/UX aesthetics—think sleek animations and polished glassmorphism. With a background in IT, I've spent my time building everything from personal branding tools to complex management systems. My goal is always the same: to create digital experiences that are as functional as they are beautiful. When I'm not at my desk, you can usually find me refining my latest project on GitHub.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                {/* MongoDB */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#47A248" aria-hidden="true">
                    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z"/>
                  </svg>
                  <span className="text-xs text-white/80">MongoDB</span>
                </div>
                {/* Express */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#ffffff" aria-hidden="true">
                    <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c-.013-.447-.013-.894-.013-1.341-.013-.394-.013-.827.013-1.485zm1.186-.185h9.08c-.075-3.273-2.06-5.424-4.36-5.229-2.678.257-4.54 2.43-4.72 5.229z"/>
                  </svg>
                  <span className="text-xs text-white/80">Express</span>
                </div>
                {/* React */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#61DAFB" aria-hidden="true">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.096-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12 9.504a23.485 23.485 0 0 0-2.347-1.543c.06-.29.117-.569.181-.835.358-1.49.75-2.4 1.2-2.812.37-.34.787-.51 1.247-.51zm-10.692.01c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 2.16 9.504a23.485 23.485 0 0 0-2.347-1.543c.06-.29.117-.569.181-.835.358-1.49.75-2.4 1.2-2.812.37-.34.787-.51 1.247-.51zM12 10.39c.74 0 1.466.035 2.163.1.703.065 1.39.17 2.05.31a22.09 22.09 0 0 1 1.227 2.205 22.09 22.09 0 0 1-1.227 2.205 22.09 22.09 0 0 1-2.05.31A22.09 22.09 0 0 1 12 15.62a22.09 22.09 0 0 1-2.163-.1 22.09 22.09 0 0 1-2.05-.31 22.09 22.09 0 0 1-1.227-2.205 22.09 22.09 0 0 1 1.227-2.205 22.09 22.09 0 0 1 2.05-.31A22.09 22.09 0 0 1 12 10.39zm-5.428 4.176a22.09 22.09 0 0 0 1.227 2.205 22.09 22.09 0 0 0-2.05.31 22.09 22.09 0 0 0-2.163.1 22.09 22.09 0 0 0-1.227-2.205 22.09 22.09 0 0 0 1.227-2.205 22.09 22.09 0 0 0 2.163-.1 22.09 22.09 0 0 0 2.05-.31 22.09 22.09 0 0 0-1.227 2.205zm10.856 0a22.09 22.09 0 0 0-1.227-2.205 22.09 22.09 0 0 0 2.05-.31 22.09 22.09 0 0 0 2.163-.1 22.09 22.09 0 0 0 1.227 2.205 22.09 22.09 0 0 0-1.227 2.205 22.09 22.09 0 0 0-2.163.1 22.09 22.09 0 0 0-2.05.31 22.09 22.09 0 0 0 1.227-2.205z"/>
                  </svg>
                  <span className="text-xs text-white/80">React</span>
                </div>
                {/* Node.js */}
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#339933" aria-hidden="true">
                    <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.05-.139.142-.139.241v10.15c0 .097.055.189.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.85 1.85 0 0 1-.919-1.604V6.921c0-.663.353-1.278.919-1.608l8.795-5.082a1.864 1.864 0 0 1 1.847 0l8.794 5.082c.566.33.92.945.92 1.608v10.15c0 .662-.354 1.275-.92 1.604l-8.794 5.076c-.281.163-.6.247-.924.247zm2.718-6.993c-3.852 0-4.657-1.769-4.657-3.252 0-.142.114-.253.256-.253h1.136c.127 0 .233.092.252.217.172 1.161.684 1.747 3.013 1.747 1.854 0 2.643-.42 2.643-1.405 0-.567-.225-.988-3.107-1.271-2.41-.238-3.9-.77-3.9-2.696 0-1.777 1.497-2.835 4.007-2.835 2.819 0 4.214.978 4.391 3.079a.255.255 0 0 1-.065.196.254.254 0 0 1-.189.083h-1.14a.253.253 0 0 1-.248-.206c-.274-1.217-.94-1.608-2.749-1.608-2.024 0-2.26.705-2.26 1.233 0 .641.278.827 3.011 1.189 2.706.358 3.996.866 3.996 2.763 0 1.917-1.598 3.019-4.39 3.019z"/>
                  </svg>
                  <span className="text-xs text-white/80">Node.js</span>
                </div>
              </div>
          </div>
        </div>
      </section>

      <section id="contact" data-reveal className="revealSection mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">Feel free to reach out or connect with me.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {/* Email */}
            <a
              href="mailto:ianmanievo6@gmail.com"
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-4 text-white/70 transition hover:bg-black/35 hover:text-white"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/xtelex"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-4 text-white/70 transition hover:bg-black/35 hover:text-white"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/manievo-christian-paul-e-53724a3a8/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 p-4 text-white/70 transition hover:bg-black/35 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {contactOpen && (
        <div
          className={`fixed inset-0 z-[100] flex items-end justify-center md:items-center ${contactClosing ? "contactOverlayOut" : "contactOverlayIn"}`}
          onClick={closeContact}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className={`contactModal relative w-full max-w-2xl rounded-t-3xl border border-white/10 bg-gradient-to-b from-[#1a1a1c] to-[#0f0f11] p-8 shadow-[0_-20px_80px_rgba(255,120,20,0.25)] md:rounded-3xl md:mb-8 ${contactClosing ? "contactModalOut" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeContact}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/60 transition hover:bg-black/50 hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Get in Touch</h2>
              <p className="mt-2 text-sm text-white/60">Let's build something amazing together.</p>
            </div>

            {contactSent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-white">Message sent!</p>
                <p className="mt-1 text-sm text-white/60">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm text-white/70">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-orange-500/50 focus:bg-black/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm text-white/70">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-orange-500/50 focus:bg-black/40"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm text-white/70">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-orange-500/50 focus:bg-black/40"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(251,146,60,0.4)] transition hover:shadow-[0_0_32px_rgba(251,146,60,0.6)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
