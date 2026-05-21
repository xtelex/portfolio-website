import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import codingVideo from "../assets/images/laptop2.mp4";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Framer Motion animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const DISPLAY_NAME = "Christian Paul";
const HERO_TITLE = "Hi, I'm Christian Paul";
const HERO_ROLES = ["Full-Stack Developer", "MERN Specialist", "UI/UX Enthusiast", "Problem Solver"];
const HERO_WATERMARK = "FULL STACK DEV";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "Building scalable, responsive web applications from scratch, handling both front-end UI and back-end logic.",
    accent: "#ffffff",
    thumbnail: "/assets/images/develop.jpg",
    projectName: "FULL STACK SOLUTIONS",
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
    accent: "#cccccc",
    thumbnail: "/assets/images/uiux.jpg",
    projectName: "DESIGN EXCELLENCE",
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
    accent: "#999999",
    thumbnail: "/assets/images/manage.jpg",
    projectName: "SYSTEM MANAGEMENT",
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
  },
  {
    title: "Application Development",
    description:
      "Developing cross-platform mobile and desktop applications with modern frameworks and native performance.",
    accent: "#666666",
    thumbnail: "/assets/images/app.jpg",
    projectName: "APP INNOVATION",
    icon: (
      <>
        <rect
          x="5"
          y="2"
          width="14"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 18h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 6h8"
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
    thumbnail: "/assets/images/appoinment.png"
  },
  {
    title: "CHAT APP",
    description: "A real-time chat application with modern UI and live messaging features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveHref: "https://chat-app-gamma-cyan-21.vercel.app/",
    codeHref: "#",
    thumbnail: "/assets/images/CHATAPP.png"
  },
  {
    title: "Project",
    description: "Add a short project description here.",
    tags: ["Landing Page", "Responsive"],
    liveHref: "#",
    codeHref: "#",
    thumbnail: null
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
  const [showHello, setShowHello] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [activeRoleText, setActiveRoleText] = useState("");
  const [activeRoleDeleting, setActiveRoleDeleting] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactClosing, setContactClosing] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [showProjectsPage, setShowProjectsPage] = useState(false);
  const modalRef = useRef(null);
  const lenisRef = useRef(null);

  const closeContact = () => {
    setContactClosing(true);
    setTimeout(() => { setContactOpen(false); setContactClosing(false); }, 380);
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 500);
  };

  const openMenu = () => {
    setMenuOpen(true);
    setMenuClosing(false);
  };

  const isRealHref = (href) => typeof href === "string" && href.trim().length > 0 && href.trim() !== "#";

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll-triggered marquee animations
    const marqueeLeft = document.querySelector('.marquee-scroll-left');
    const marqueeRight = document.querySelector('.marquee-scroll-right');

    if (marqueeLeft) {
      gsap.to(marqueeLeft, {
        x: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: marqueeLeft,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    if (marqueeRight) {
      gsap.to(marqueeRight, {
        x: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: marqueeRight,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    // Horizontal scroll services section
    const servicesSection = document.querySelector('.horizontal-services-section');
    const servicesCards = document.querySelector('.services-cards-horizontal');

    if (servicesSection && servicesCards) {
      const scrollWidth = servicesCards.scrollWidth - window.innerWidth;
      
      // Main horizontal scroll animation
      const horizontalScroll = gsap.to(servicesCards, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: servicesSection,
          start: 'top top',
          end: () => `+=${scrollWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animate service name color on scroll
      const serviceCards = gsap.utils.toArray('.service-card-horizontal[data-service-index]');
      serviceCards.forEach((card) => {
        const nameElement = card.querySelector('.service-name-highlight');
        if (nameElement) {
          gsap.fromTo(nameElement,
            { color: 'rgba(255, 255, 255, 0.3)' },
            {
              color: '#adff2f',
              scrollTrigger: {
                trigger: card,
                start: 'left center',
                end: 'right center',
                scrub: 1,
                containerAnimation: horizontalScroll,
              }
            }
          );
        }
      });
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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

  useEffect(() => {
    if (!showProjectsPage) return;
    const onKey = (e) => { if (e.key === "Escape") setShowProjectsPage(false); };
    document.addEventListener("keydown", onKey);
    
    // Stop Lenis when projects page is open
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    
    return () => {
      document.removeEventListener("keydown", onKey);
      // Restart Lenis when projects page closes
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    };
  }, [showProjectsPage]);

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

  return (
    <main className="min-h-screen bg-black text-white antialiased relative">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#top" className="text-sm font-semibold tracking-tight text-white/90">
              {DISPLAY_NAME}
            </a>
            <button 
              className="text-xs font-medium tracking-widest text-white/70 uppercase hover:text-white transition"
              onClick={openMenu}
            >
              MENU
            </button>
            <button onClick={() => setContactOpen(true)} className="text-sm text-white/80 hover:text-white transition">
              Get in Touch
            </button>
          </div>
      </header>

      <section
        id="top"
        className="hero-frame relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-black"
      >
        {/* Hero Content */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 items-center px-8 md:px-12 pt-24">
          {/* Left Side - Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2">
              <span className="text-xs uppercase tracking-wider text-white/70">Open</span>
              <span className="text-xs text-white/50">For new opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Full-stack developer who builds,
              <br />
              concept to code.
            </motion.h1>

            {/* Description */}
            <motion.div variants={fadeInUp} className="mt-12 max-w-md space-y-6 text-white/60">
              <p className="text-base leading-relaxed">
                Full-stack developer specializing in the MERN stack with a passion for creating interactive, high-performance web applications. Focused on clean code, modern design, and seamless execution.
              </p>
              <p className="text-base leading-relaxed">
                Design and code live under one roof. No handoffs. No shortcuts. No loose ends.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block w-[600px]"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <video
                src={codingVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
              {/* Fade to black overlay on all edges */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `
                  linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.7) 100%),
                  linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.7) 100%),
                  linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.7) 100%),
                  linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.7) 100%)
                `
              }} />
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Cards */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3"
        >
          <motion.div variants={fadeIn} className="bg-black p-8">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-white">Full stack</h3>
            <p className="text-sm text-white/50">Design code under one roof. No handoffs, no loose ends.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-black p-8">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-white">Built to scale</h3>
            <p className="text-sm text-white/50">Interfaces that reduce decision fatigue and increase adoption.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-black p-8 flex items-center justify-center">
            <a href="#contact" className="w-full border border-white bg-white px-8 py-4 text-center text-sm font-medium uppercase tracking-wider text-black transition hover:bg-white/90">
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll-Triggered Marquee Section */}
      <section className="relative overflow-hidden bg-black py-20">
        {/* First Row - Moves Left on Scroll */}
        <div className="marquee-scroll-container mb-8">
          <div className="marquee-scroll-left">
            <span className="marquee-text">Web Dev</span>
            <span className="marquee-separator">&</span>
            <span className="marquee-text">App</span>
            <span className="marquee-separator">&</span>
            <span className="marquee-text">Web Dev</span>
            <span className="marquee-separator">&</span>
            <span className="marquee-text">App</span>
          </div>
        </div>

        {/* Second Row - Moves Right on Scroll */}
        <div className="marquee-scroll-container">
          <div className="marquee-scroll-right">
            <span className="marquee-text">UI</span>
            <span className="marquee-separator">&</span>
            <span className="marquee-text">Systems</span>
            <span className="marquee-separator">&</span>
            <span className="marquee-text">UI</span>
            <span className="marquee-separator">&</span>
            <span className="marquee-text">Systems</span>
          </div>
        </div>
      </section>

      {/* About & Tech Stack Section */}
      <section className="relative bg-black min-h-screen flex items-center py-32 px-8 md:px-16">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Side - About */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="mb-8">
                <span className="text-sm uppercase tracking-widest text-white/50">ABOUT</span>
                <div className="mt-3 h-px w-full bg-white/10"></div>
              </div>
              
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-12">ABOUT</h2>
              
              <div className="space-y-8 text-white/70 text-base md:text-lg leading-relaxed">
                <p>
                  Hi, I'm Christian Paul E. Manievo, a BSIT student at CSTC Sariaya and currently interning at Socia. I specialize in the MERN stack (MongoDB, Express, React, Node.js) and love building full-stack web applications from concept to deployment.
                </p>
                <p>
                  My passion lies in creating interactive, high-performance web applications with modern UI/UX design. I focus on clean code, scalable architecture, and seamless user experiences that make a real impact.
                </p>
                <p>
                  Whether it's building RESTful APIs, crafting responsive interfaces, or implementing complex features, I'm always excited to turn ideas into functional, beautiful applications.
                </p>
              </div>
            </motion.div>

            {/* Right Side - Tech Stack */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {/* Frontend */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl md:text-4xl font-bold text-white/50 mb-6">FRONTEND</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-[#61DAFB]">⚛</span>
                    <span className="text-sm text-white/70">REACT</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm font-mono text-[#F7DF1E]">JS</span>
                    <span className="text-sm text-white/70">JAVASCRIPT</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm font-mono text-[#3178C6]">TS</span>
                    <span className="text-sm text-white/70">TYPESCRIPT</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-[#38BDF8]">~</span>
                    <span className="text-sm text-white/70">TAILWIND CSS</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-white/70">HTML/CSS</span>
                  </div>
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl md:text-4xl font-bold text-white/50 mb-6">BACKEND</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-[#68A063]">◆</span>
                    <span className="text-sm text-white/70">NODE.JS</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-white/70">EXPRESS.JS</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-white/70">REST API</span>
                  </div>
                </div>
              </motion.div>

              {/* Database */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl md:text-4xl font-bold text-white/50 mb-6">DATABASE</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-[#47A248]">◆</span>
                    <span className="text-sm text-white/70">MONGODB</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-[#00758F]">◉</span>
                    <span className="text-sm text-white/70">MYSQL</span>
                  </div>
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl md:text-4xl font-bold text-white/50 mb-6">TOOLS</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-[#F05032]">◆</span>
                    <span className="text-sm text-white/70">GIT</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-white/70">GITHUB</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-lg">
                    <span className="text-sm text-white/70">VS CODE</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Services Section */}
      <section id="services" className="horizontal-services-section">
        <div className="horizontal-services-wrapper">
          {/* Title at Top */}
          <div className="services-title-top">
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none">
              SERVICE OFFER
            </h2>
          </div>

          {/* Scrolling Cards at Bottom */}
          <div className="services-cards-horizontal">
            {services.map((service, index) => (
              <article key={service.title} className="service-card-horizontal" data-service-index={index}>
                {/* Thumbnail Image */}
                <div className="service-thumbnail">
                  <img 
                    src={service.thumbnail} 
                    alt={service.title}
                    className="service-thumbnail-img"
                  />
                  <div className="service-thumbnail-overlay"></div>
                </div>

                {/* Service Content */}
                <div className="service-content-wrapper">
                  <div className="serviceIconMinimal mb-4">
                    <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
                      {service.icon}
                    </svg>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-white/60 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Project Name at Bottom */}
                  <div className="service-project-name">
                    <span className="text-xs text-white/40 mb-1 block">/{String(index + 1).padStart(2, '0')}</span>
                    <h4 className="text-2xl md:text-3xl font-bold text-white service-name-highlight">
                      {service.projectName}
                    </h4>
                  </div>
                </div>
              </article>
            ))}

            {/* View All Card */}
            <article className="service-card-horizontal view-all-card">
              <div className="view-all-content">
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                  VIEW ALL
                </h3>
                <a 
                  href="#services" 
                  className="view-all-button"
                  aria-label="View all services"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Work Section - Simple Big Text with Button */}
      <section id="work" className="work-section-simple">
        <div className="work-hero-container">
          <h2 className="work-hero-text">WORK</h2>
          <button 
            onClick={() => {
              setShowProjectsPage(true);
            }}
            className="work-cta-button"
          >
            CLICK HERE TO SEE
            <svg viewBox="0 0 24 24" className="h-5 w-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black">
        <div className="w-full px-6 py-12">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-7xl mx-auto">
            {/* Left Side - Contact */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Contact</h3>
              <p className="text-sm text-white/60 mb-6">Feel free to reach out or connect with me.</p>
              
              <div className="flex gap-4">
                <a
                  href="mailto:ianmanievo6@gmail.com"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </a>
                <a
                  href="https://github.com/xtelex"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/manievo-christian-paul-e-53724a3a8/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Side - Links */}
            <div className="flex justify-end">
              <div>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Links</h4>
                <ul className="space-y-2">
                  <li><a href="https://github.com/xtelex" target="_blank" rel="noreferrer" className="text-sm text-white/60 hover:text-white transition">GITHUB</a></li>
                  <li><a href="https://x.com" target="_blank" rel="noreferrer" className="text-sm text-white/60 hover:text-white transition">X</a></li>
                  <li><a href="https://www.linkedin.com/in/manievo-christian-paul-e-53724a3a8/" target="_blank" rel="noreferrer" className="text-sm text-white/60 hover:text-white transition">LINKEDIN</a></li>
                  <li><a href="#" className="text-sm text-white/60 hover:text-white transition">CODEPEN</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Large Footer Text - Full Width */}
          <div className="relative overflow-hidden py-8 w-full">
            <div className="footer-text-grid">
              FOOTER
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 max-w-7xl mx-auto">
            <p className="text-xs text-white/40">© 2015 - 2026 Christian Paul E. Manievo</p>
          </div>
        </div>
      </footer>
      </div>

      {/* Full-Screen Menu Overlay */}
      {menuOpen && (
        <div className={`menu-overlay ${menuClosing ? 'menu-overlay-out' : 'menu-overlay-in'}`}>
          <div className="menu-container">
            {/* Close Button */}
            <button 
              onClick={closeMenu}
              className="menu-close-btn"
            >
              <span className="text-xs tracking-widest mr-3">CLOSE</span>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="menu-content">
              {/* Left Side - Navigation Links */}
              <nav className="menu-nav">
                <a 
                  href="#top" 
                  className="menu-link-wrapper"
                  onClick={closeMenu}
                  style={{ animationDelay: '0.1s' }}
                >
                  <span className="menu-link-number">(01)</span>
                  <span className="menu-link">Home</span>
                  <span className="menu-link-arrow">→</span>
                  <div className="menu-link-watermark" aria-hidden="true">
                    <span>Home Home Home Home Home Home</span>
                  </div>
                </a>
                <a 
                  href="#about" 
                  className="menu-link-wrapper"
                  onClick={closeMenu}
                  style={{ animationDelay: '0.2s' }}
                >
                  <span className="menu-link-number">(02)</span>
                  <span className="menu-link">About</span>
                  <span className="menu-link-arrow">→</span>
                  <div className="menu-link-watermark" aria-hidden="true">
                    <span>About About About About About About</span>
                  </div>
                </a>
                <a 
                  href="#work" 
                  className="menu-link-wrapper"
                  onClick={closeMenu}
                  style={{ animationDelay: '0.3s' }}
                >
                  <span className="menu-link-number">(03)</span>
                  <span className="menu-link">Work</span>
                  <span className="menu-link-arrow">→</span>
                  <div className="menu-link-watermark" aria-hidden="true">
                    <span>Work Work Work Work Work Work Work</span>
                  </div>
                </a>
                <a 
                  href="#services" 
                  className="menu-link-wrapper"
                  onClick={closeMenu}
                  style={{ animationDelay: '0.4s' }}
                >
                  <span className="menu-link-number">(04)</span>
                  <span className="menu-link">Services</span>
                  <span className="menu-link-arrow">→</span>
                  <div className="menu-link-watermark" aria-hidden="true">
                    <span>Services Services Services Services</span>
                  </div>
                </a>
                <a 
                  href="#contact" 
                  className="menu-link-wrapper"
                  onClick={closeMenu}
                  style={{ animationDelay: '0.5s' }}
                >
                  <span className="menu-link-number">(05)</span>
                  <span className="menu-link">Contact</span>
                  <span className="menu-link-arrow">→</span>
                  <div className="menu-link-watermark" aria-hidden="true">
                    <span>Contact Contact Contact Contact Contact</span>
                  </div>
                </a>
              </nav>

              {/* Right Side - Contact Info */}
              <div className="menu-info">
                <div className="menu-info-section" style={{ animationDelay: '0.3s' }}>
                  <span className="menu-info-label">SAY HELLO</span>
                  <a href="mailto:ianmanievo6@gmail.com" className="menu-info-value">
                    ianmanievo6@gmail.com
                  </a>
                </div>

                <div className="menu-info-section" style={{ animationDelay: '0.4s' }}>
                  <span className="menu-info-label">CONNECT</span>
                  <div className="menu-social-links">
                    <a href="https://github.com/xtelex" target="_blank" rel="noreferrer" className="menu-social-link">
                      GITHUB
                    </a>
                    <a href="https://www.linkedin.com/in/manievo-christian-paul-e-53724a3a8/" target="_blank" rel="noreferrer" className="menu-social-link">
                      LINKEDIN
                    </a>
                  </div>
                </div>

                <div className="menu-info-section" style={{ animationDelay: '0.5s' }}>
                  <span className="menu-info-label">BASED IN</span>
                  <p className="menu-info-value">Sariaya, Quezon</p>
                  <p className="menu-info-subtext">Available Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Projects Page Overlay */}
      {showProjectsPage && (
        <div 
          className="fixed inset-0 z-[100] bg-white projects-page-overlay" 
          style={{ 
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch'
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="min-h-screen">
            {/* Top Right Buttons */}
            <div className="fixed top-8 right-8 z-10 flex items-center gap-4">
              {/* Let's Talk Button */}
              <button
                onClick={() => {
                  setShowProjectsPage(false);
                  setTimeout(() => setContactOpen(true), 300);
                }}
                className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition"
              >
                LET'S TALK
              </button>
              
              {/* Close Button */}
              <button
                onClick={() => setShowProjectsPage(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white hover:bg-black/80 transition"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Content with Sidebar */}
            <div className="flex min-h-screen">
              {/* Left Sidebar */}
              <div className="w-64 flex-shrink-0 p-8 pt-24 sticky top-0 h-screen flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Bio Text */}
                  <div>
                    <p className="text-sm leading-relaxed text-black/80">
                      I'm obsessed with creating digital magic that's as addictive as your favorite TV show. Mobile apps, web design? Consider me your personal genie ✨
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/60">Web Design</span>
                      <span className="text-black/40">(10)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/60">Webflow Development</span>
                      <span className="text-black/40">(10)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/60">Mobile App Design</span>
                      <span className="text-black/40">(4)</span>
                    </div>
                  </div>
                </div>

                {/* CTA at Bottom */}
                <div className="pb-8">
                  <p className="text-xs text-black/60 mb-2">Ready to transform?</p>
                  <p className="text-xs text-black/60 mb-4">I offer free proposals and unlimited enthusiasm.</p>
                  <button className="px-6 py-2 bg-black text-white text-xs rounded-full hover:bg-black/80 transition">
                    Let's talk!
                  </button>
                </div>
              </div>

              {/* Right Content Area */}
              <div className="flex-1 p-8 pt-24 pb-20">
                {/* Header */}
                <div className="mb-16">
                  <h1 className="text-6xl md:text-8xl font-bold text-black mb-4">MY WORK</h1>
                  <p className="text-lg text-black/60">Selected projects showcasing my skills and creativity</p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 projects-grid-container">
                {projects.map((project, index) => (
                  <motion.article
                    key={`${project.title}-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-black/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 project-card hover:scale-105 hover:z-10 relative"
                  >
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-to-br from-black/10 to-black/5 relative overflow-hidden">
                      {project.thumbnail ? (
                        <>
                          <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold text-black/10 group-hover:text-black/20 transition">{index + 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-[#adff2f] transition">
                        {project.title}
                      </h3>
                      <p className="text-black/60 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-black/10 text-black rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        {isRealHref(project.liveHref) && (
                          <a
                            href={project.liveHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#adff2f] transition"
                          >
                            View Live
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17L17 7M17 7H7M17 7v10"/>
                            </svg>
                          </a>
                        )}
                        {isRealHref(project.codeHref) && (
                          <a
                            href={project.codeHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#adff2f] transition"
                          >
                            View Code
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
