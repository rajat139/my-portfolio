import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { FaTimes } from "react-icons/fa";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaArrowRight, 
  FaDownload, 
  FaExternalLinkAlt,
  FaBars,
} from "react-icons/fa";

const particlesOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "bubble" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      bubble: { distance: 200, size: 6, duration: 2 },
    },
  },
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: ["#00F5FF", "#7C4DFF", "#FF10F0", "#00E6B8"] },
    shape: { 
      type: ["circle", "triangle", "polygon"],
      polygon: { sides: 6 }
    },
    opacity: {
      value: 0.15,
      random: { enable: true, minimumValue: 0.05 },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.05,
        sync: false
      }
    },
    size: { 
      value: { min: 1, max: 4 },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.5,
        sync: false
      }
    },
    links: {
      enable: true,
      distance: 150,
      color: "#00F5FF",
      opacity: 0.08,
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.02
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    },
  },
  detectRetina: true,
};

// Global Ripple Effect Component
function GlobalRippleEffect() {
  const rippleContainerRef = useRef(null);

  const handleRipple = useCallback((e) => {
    if (!rippleContainerRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    const ripple = document.createElement("span");
    ripple.className = "global-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    rippleContainerRef.current.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleRipple);
    return () => document.removeEventListener("mousemove", handleRipple);
  }, [handleRipple]);

  return (
    <div 
      ref={rippleContainerRef} 
      className="fixed inset-0 pointer-events-none z-50" 
      style={{ overflow: 'hidden' }} 
    />
  );
}

function Hero({ onResumeClick = () => {} }) {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center py-12 sm:py-20 overflow-hidden" aria-label="Hero">
      {/* Particles container */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticlesWrapper />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* left holographic emblem - hidden on mobile */}
          <div className="col-span-3 hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: 1.02, opacity: 1 }}
              transition={{ duration: 1.6, yoyo: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 xl:w-44 xl:h-44 rounded-full border border-cyan-400/20 flex items-center justify-center"
              style={{
                boxShadow:
                  "0 0 40px rgba(0,245,255,0.06), inset 0 0 30px rgba(124,77,255,0.02)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="w-20 h-20 xl:w-28 xl:h-28 rounded-full flex items-center justify-center">
                <div className="text-cyan-400 text-2xl xl:text-4xl font-extrabold">RS</div>
              </div>
            </motion.div>
          </div>

          {/* main text */}
          <div className="col-span-1 lg:col-span-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="text-cyan-300/80 mb-2 sm:mb-3 text-base sm:text-lg">Hello, I'm</div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                style={{
                  color: "rgba(0,245,255,0.95)",
                  textShadow:
                    "0 2px 12px rgba(0,245,255,0.06), 0 0 30px rgba(124,77,255,0.03)",
                }}
              >
                Rajat Saxena
              </h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-3 sm:mt-4 text-cyan-100/70 text-base sm:text-lg md:text-xl"
              >
                MCA · Java Full-Stack Developer · Backend Engineer
              </motion.h2>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-300/70 leading-relaxed">
                Passionate about building scalable backend systems and solving
                complex problems with clean, efficient code. I design APIs,
                work with microservices, and enjoy optimizing database systems.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#projects"
                  className="btn-neon inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 rounded-lg border border-cyan-400/20 text-sm sm:text-base"
                >
                  <span>View My Work</span>
                  <FaArrowRight className="text-xs sm:text-sm" />
                </a>

                <a
                  href="#contact"
                  className="btn-neon inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 rounded-lg border border-cyan-400/20 text-sm sm:text-base"
                >
                  <span>Get In Touch</span>
                  <FaEnvelope className="text-xs sm:text-sm" />
                </a>

                <button
                  onClick={onResumeClick}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md 
                            border border-cyan-400/20 text-cyan-100 
                            bg-cyan-600/10 transition-all duration-300 
                            hover:-translate-y-0.5 hover:bg-cyan-600/5 text-sm sm:text-base"
                >
                  <FaDownload className="text-xs sm:text-sm" />
                  <span>Resume</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* right holographic portrait */}
          <div className="col-span-1 lg:col-span-3 flex items-center justify-center mt-6 lg:mt-0">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl border border-cyan-400/20 overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(2,6,23,0.6))",
                boxShadow:
                  "0 8px 40px rgba(0,245,255,0.04), inset 0 0 24px rgba(0,245,255,0.02)",
              }}
            >
              <div className="absolute inset-0 p-3 sm:p-4 flex items-center justify-center">
                <img
                  src="/images/myimg.jpg"
                  alt="Rajat Saxena"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='520'><rect width='100%' height='100%' fill='%23081214'/><text x='50%' y='55%' font-size='48' fill='%2300f5ff' text-anchor='middle' font-family='Arial' dy='.3em'>R.S.</text></svg>";
                  }}
                />
              </div>

              <div
                className="absolute -bottom-0 left-1/2 -translate-x-1/2 text-xs px-2 sm:px-3 py-1 rounded-full border border-cyan-400/40 text-cyan-200/90 backdrop-blur-sm whitespace-nowrap"
                style={{
                  background: "linear-gradient(90deg, rgba(0,245,255,0.02), rgba(124,77,255,0.01))",
                }}
              >
                Java Backend Engineer
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ParticlesWrapper = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        particles: {
          color: { value: "#00f5ff" },
          links: { color: "#00f5ff", distance: 150, enable: true },
          move: { enable: true, speed: 0.5 },
          number: { value: 60 },
          opacity: { value: 0.4 },
          shape: { type: "circle" },
          size: { value: 2 },
        },
      }}
    />
  );
};

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-200">{title}</h2>
      {subtitle && <p className="text-slate-300/70 mt-1 text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}

function Projects() {
  const projects = [
    {
      title: "HR Management System",
      desc:
        "A comprehensive web application for managing employees, leave tracking, and role-based access.",
      tags: ["JSP", "Servlet", "MySQL", "JDBC"],
      repo: "https://github.com/rajat139/HR-Management-System",
      live: "#",
      badge: "Featured",
      icon: "👥",
    },
    {
      title: "School Management System",
      desc:
        "Modern web system for managing students, teachers, attendance, and reports with dynamic filters.",
      tags: ["Spring Boot", "Spring MVC", "PostgreSQL", "JSP"],
      repo: "https://github.com/amax04/school-management",
      live: "#",
      badge: "Latest",
      icon: "🎓",
    },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Featured Projects" subtitle="Check out my recent work" />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-cyan-400/10 bg-gradient-to-br from-[#04121a] to-[#03101a] p-4 sm:p-6 relative overflow-hidden"
            >
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs px-2 py-1 rounded-md bg-cyan-900/20 border border-cyan-400/10 text-cyan-200">
                {p.badge}
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl">{p.icon}</div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-100">{p.title}</h3>
                  <p className="text-slate-300/70 mt-2 text-sm sm:text-base">{p.desc}</p>

                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-md border border-cyan-400/8 text-cyan-200/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-3">
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan-100/90 hover:underline"
                    >
                      <FaGithub />
                      <span>View Code</span>
                    </a>

                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan-100/90 hover:underline"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechTools() {
  const tech = [
    "Java",
    "Spring Boot",
    "MySQL",
    "PostgreSQL",
    "REST API",
    "JDBC",
    "HTML5",
    "CSS3",
    "JavaScript",
    "Maven",
  ];
  const tools = ["Eclipse", "IntelliJ", "VS Code", "Git", "GitHub", "Postman"];

  return (
    <section id="tech" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Tech Stack" subtitle="Technologies I work with" />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-xl p-4 sm:p-6 border border-cyan-400/8 bg-[#04121a]">
            <h4 className="text-base sm:text-lg text-cyan-100 font-semibold mb-3">Languages & Platforms</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tech.map((t) => (
                <div
                  key={t}
                  className="px-2 sm:px-3 py-1 sm:py-2 rounded-md border border-cyan-400/8 text-cyan-200/90 text-xs sm:text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 sm:p-6 border border-cyan-400/8 bg-[#04121a]">
            <h4 className="text-base sm:text-lg text-cyan-100 font-semibold mb-3">Tools</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {tools.map((t) => (
                <div
                  key={t}
                  className="px-2 sm:px-3 py-1 sm:py-2 rounded-md border border-cyan-400/8 text-cyan-200/90 text-xs sm:text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    {
      title: "Java Backend Development",
      icon: <FaEnvelope />,
      desc:
        "Designing high-performance backend services using Java, Spring Boot, and clean architecture principles.",
    },
    {
      title: "Full Stack Development",
      icon: <FaGithub />,
      desc:
        "Building responsive frontends and robust APIs for end-to-end solutions (HTML/CSS/JS + Java backend).",
    },
    {
      title: "DS & Algorithms",
      icon: <FaExternalLinkAlt />,
      desc:
        "Strong foundations in algorithms and data structures to write optimized, scalable code.",
    },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="My Skills" subtitle="What I specialize in" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((s) => (
            <motion.div
              key={s.title}
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-xl p-4 sm:p-6 border border-cyan-400/8 bg-[#04121a]"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl text-cyan-200/90">{s.icon}</div>
                <h4 className="text-base sm:text-lg font-semibold text-cyan-100">{s.title}</h4>
              </div>
              <p className="mt-3 text-slate-300/70 text-sm sm:text-base">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCerts() {
  const education = [
    {
      degree: "Master of Computer Application",
      school: "Lovely Professional University",
      year: "2025 – Present",
      loc: "Phagwara, India",
    },
    {
      degree: "Bachelor of Computer Application",
      school: "UCC IBS Khandari Campus",
      year: "2022 – 2025",
      loc: "Agra, India",
    },
    {
      degree: "Senior Secondary Education",
      school: "Shree Janta Inter Collage",
      year: " 2020 – 2021",
      loc: "Agra, India",
    },
  ];

  const certs = [
    { 
      title: "AI Basics using Spring Framework", 
      issuer: "Simplilearn", 
      date: "Nov 2025",
      img: "/certificate/spring_Ai_Basic_simlpillearn.jpg", 
      pdf: "/certificate/spring_Ai_Basic_simlpillearn.pdf"  
    },
    { 
      title: "SQL Certification", 
      issuer: "Great Learning", 
      date: "Oct 2022",
      img: "/certificate/sql_Greatlearning.jpg", 
      pdf: "/certificate/sqlgreatlearning.pdf"  
    },
    { 
      title: "Mobile App Development with Python", 
      issuer: "Great Learning", 
      date: "Oct 2022",
      img: "/certificate/mobilepython_GreatLearning.jpg", 
      pdf: "/certificate/mobileAppPython_greatLearning.pdf"  
    },
  ];

  const [selectedCert, setSelectedCert] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    if (slider && !isLargeScreen) {
      const child = slider.children[index];
      const scrollPosition = child.offsetLeft - (slider.offsetWidth / 2) + (child.offsetWidth / 2);
      slider.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleMouseDown = (e) => {
    if (isLargeScreen) return;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleTouchStart = (e) => {
    if (isLargeScreen) return;
    isDragging.current = true;
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || isLargeScreen) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || isLargeScreen) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isLargeScreen) return;

    const handleScroll = () => {
      const children = Array.from(slider.children);
      const center = slider.scrollLeft + slider.offsetWidth / 2;
      const index = children.findIndex((child) => {
        const el = child;
        return el.offsetLeft <= center && el.offsetLeft + el.offsetWidth > center;
      });
      if (index !== -1) setActiveIndex(index);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [isLargeScreen]);

  return (
    <section id="education" className="py-12 sm:py-16 bg-[#010a14]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* Education Section */}
          <div className="rounded-xl p-4 sm:p-6 border border-cyan-400/10 bg-[#04121a]">
            <h3 className="text-2xl sm:text-3xl font-bold text-cyan-100 mb-4 sm:mb-6">Education</h3>
            {education.map((e) => (
              <div key={e.degree} className="mb-4 sm:mb-6 flex gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl">{e.icon}</div>
                <div>
                  <h4 className="text-cyan-100 font-semibold text-sm sm:text-base">{e.degree}</h4>
                  <div className="text-slate-300/70 text-sm sm:text-base">{e.school}</div>
                  <div className="mt-1 sm:mt-2 text-xs text-slate-400">
                    <span>{e.year} • {e.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Section */}
          <div className="rounded-xl p-4 sm:p-6 border border-cyan-400/10 bg-[#04121a] flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-cyan-100 mb-4 sm:mb-6">Certifications</h3>

            {/* Desktop/Laptop View - Horizontal Slider */}
            {isLargeScreen ? (
              <>
                <div
                  ref={sliderRef}
                  className="flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory w-full select-none"
                  style={{ 
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch"
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                >
                  {certs.map((c, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex-shrink-0 w-72 h-80 rounded-xl p-4 cursor-pointer
                                 bg-white/5 backdrop-blur-lg border border-cyan-400/30
                                 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.6)]
                                 transition-all duration-300 snap-center flex flex-col"
                      onClick={() => setSelectedCert(c)}
                    >
                      <div className="relative w-full h-56 rounded-lg overflow-hidden border border-cyan-400/20">
                        <img
                          src={c.img}
                          alt={c.title}
                          className="w-full h-full object-cover rounded-lg"
                          draggable="false"
                        />
                      </div>
                      <div className="mt-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="text-cyan-100 font-semibold text-base line-clamp-2">{c.title}</h5>
                          <p className="text-xs text-slate-300/70 mt-1">{c.issuer} • {c.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Dots Navigation for Desktop */}
                <div className="flex justify-center mt-4 gap-3">
                  {certs.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-transform
                                 ${activeIndex === index ? "bg-cyan-400 scale-125 animate-pulse" : "bg-cyan-400/30"}`}
                      onClick={() => scrollToIndex(index)}
                    />
                  ))}
                </div>
              </>
            ) : (
              /* Mobile/Tablet View - Horizontal Scroll */
              <>
                <div
                  ref={sliderRef}
                  className="flex gap-4 sm:gap-6 overflow-x-auto py-2 snap-x snap-mandatory w-full select-none"
                  style={{ 
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch"
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                >
                  {certs.map((c, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-56 sm:w-64 h-56 sm:h-64 rounded-xl p-3 sm:p-4 cursor-pointer
                                 bg-white/5 backdrop-blur-lg border border-cyan-400/30
                                 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]
                                 transition-transform duration-300 snap-center flex flex-col"
                      onClick={() => setSelectedCert(c)}
                    >
                      <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden border border-cyan-400/20">
                        <img
                          src={c.img}
                          alt={c.title}
                          className="w-full h-full object-cover rounded-lg"
                          draggable="false"
                        />
                      </div>
                      <div className="mt-2 sm:mt-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="text-cyan-100 font-semibold text-sm sm:text-base line-clamp-2">{c.title}</h5>
                          <p className="text-xs text-slate-300/70">{c.issuer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots Navigation - Only for Mobile */}
                <div className="flex justify-center mt-4 gap-2 sm:gap-3">
                  {certs.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-transform
                                 ${activeIndex === index ? "bg-cyan-400 scale-125 animate-pulse" : "bg-cyan-400/30"}`}
                      onClick={() => scrollToIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Modal */}
            <AnimatePresence>
              {selectedCert && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
                  onClick={() => setSelectedCert(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-[#04121a]/95 border border-cyan-400/40 p-4 sm:p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-2xl sm:text-3xl font-bold hover:text-cyan-400 transition-colors z-10"
                      onClick={() => setSelectedCert(null)}
                    >
                      ×
                    </button>
                    <img
                      src={selectedCert.img}
                      alt={selectedCert.title}
                      className="w-full h-auto rounded-md"
                    />
                    <div className="mt-3 sm:mt-4 text-cyan-100 font-semibold text-base sm:text-lg">{selectedCert.title}</div>
                    <div className="text-sm text-slate-300/70">{selectedCert.issuer} • {selectedCert.date}</div>
                    <a
                      href={selectedCert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 sm:mt-4 inline-block px-4 py-2 bg-cyan-500 text-black rounded-md font-semibold hover:bg-cyan-400 transition-colors text-sm sm:text-base"
                    >
                      Download PDF
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_22w0u77",
        "template_yrxba2u",
        form.current,
        "A2bSIyss0wEm4qX75"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Failed to send message:", error);
          alert("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-gradient-to-b from-transparent to-[#001018]">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader title="Get In Touch" subtitle="Let's work together!" />
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Left Info Section */}
          <div className="rounded-xl p-4 sm:p-6 border border-cyan-400/8 bg-[#04121a]">
            <h4 className="text-cyan-100 font-semibold mb-3 text-base sm:text-lg">Let's work together!</h4>
            <p className="text-slate-300/70 text-sm sm:text-base">
              I'm open to new opportunities and interesting projects. Reach out for collaborations or
              a quick chat about backend systems and full-stack engineering.
            </p>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-cyan-300 text-xl sm:text-2xl"><FaEnvelope /></div>
                <div>
                  <div className="font-medium text-cyan-100 text-sm sm:text-base">Email</div>
                  <a className="text-slate-300/70 text-sm sm:text-base break-all" href="mailto:rajatsaxena139@gmail.com">
                    rajatsaxena139@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-cyan-300 text-xl sm:text-2xl"><FaGithub /></div>
                <div>
                  <div className="font-medium text-cyan-100 text-sm sm:text-base">GitHub</div>
                  <a
                    className="text-slate-300/70 text-sm sm:text-base break-all"
                    href="https://github.com/rajat139"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/rajat139
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="text-cyan-300 text-xl sm:text-2xl"><FaLinkedin /></div>
                <div>
                  <div className="font-medium text-cyan-100 text-sm sm:text-base">LinkedIn</div>
                  <a
                    className="text-slate-300/70 text-sm sm:text-base break-all"
                    href="https://linkedin.com/in/rajat-saxena-085116272"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/rajat-saxena
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="rounded-xl p-4 sm:p-6 border border-cyan-400/8 bg-[#04121a]">
            <form ref={form} onSubmit={sendEmail} className="grid gap-3">
              <label className="text-sm text-slate-300/70">Your Name *</label>
              <input name="from_name" className="input-field" required placeholder="John Doe" />

              <label className="text-sm text-slate-300/70">Your Email *</label>
              <input name="reply_to" type="email" className="input-field" required placeholder="john@example.com" />

              <label className="text-sm text-slate-300/70">Subject *</label>
              <input name="subject" className="input-field" required placeholder="Project Discussion" />

              <label className="text-sm text-slate-300/70">Message *</label>
              <textarea name="message" className="input-field h-24 sm:h-28" placeholder="Tell me about your project..." required />

              <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cyan-600/20 border border-cyan-400/10 hover:bg-cyan-600/30 transition text-sm sm:text-base">
                <span>Send Message</span>
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 text-center text-slate-400">
        <div className="flex items-center justify-center gap-4 mb-4">
          <a href="https://github.com/rajat139" target="_blank" rel="noreferrer" className="hover:text-cyan-200 text-xl sm:text-2xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/rajat-saxena-085116272" target="_blank" rel="noreferrer" className="hover:text-cyan-200 text-xl sm:text-2xl">
            <FaLinkedin />
          </a>
          <a href="mailto:rajatsaxena139@gmail.com" className="hover:text-cyan-200 text-xl sm:text-2xl">
            <FaEnvelope />
          </a>
        </div>
        <div className="text-xs sm:text-sm">© 2025 Rajat Saxena. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResumeClick = () => {
    const resumeUrl = "/Rajat_Saxena_Resume.pdf";
    window.open(resumeUrl, "_blank");
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#03060a] text-slate-100 antialiased overflow-x-hidden">
      {/* Global Ripple Effect */}
      <GlobalRippleEffect />

      {/* Navigation */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-black/20 border-b border-cyan-400/4">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-cyan-400 font-extrabold text-xl sm:text-2xl">RS</div>
            <nav className="hidden md:flex gap-4 lg:gap-6 text-slate-300/70 text-sm lg:text-base">
              <a href="#home" className="hover:text-cyan-200 transition-colors">Home</a>
              <a href="#about" className="hover:text-cyan-200 transition-colors">About</a>
              <a href="#projects" className="hover:text-cyan-200 transition-colors">Projects</a>
              <a href="#tech" className="hover:text-cyan-200 transition-colors">Tech Stack</a>
              <a href="#skills" className="hover:text-cyan-200 transition-colors">Skills</a>
              <a href="#education" className="hover:text-cyan-200 transition-colors">Education</a>
              <a href="#contact" className="hover:text-cyan-200 transition-colors">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/rajat139" target="_blank" rel="noreferrer" className="text-slate-300/70 hover:text-cyan-200 transition-colors text-lg sm:text-xl">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/rajat-saxena-085116272" target="_blank" rel="noreferrer" className="text-slate-300/70 hover:text-cyan-200 transition-colors text-lg sm:text-xl">
              <FaLinkedin />
            </a>
            <a href="mailto:rajatsaxena139@gmail.com" className="text-slate-300/70 hover:text-cyan-200 transition-colors text-lg sm:text-xl">
              <FaEnvelope />
            </a>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-cyan-400 text-xl sm:text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-[#04121a] border-t border-cyan-400/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3 text-slate-300/70">
                <a href="#home" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">Home</a>
                <a href="#about" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">About</a>
                <a href="#projects" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">Projects</a>
                <a href="#tech" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">Tech Stack</a>
                <a href="#skills" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">Skills</a>
                <a href="#education" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">Education</a>
                <a href="#contact" onClick={handleNavClick} className="hover:text-cyan-200 transition-colors py-2">Contact</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Hero onResumeClick={handleResumeClick} />

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-1">
                <SectionHeader title="About Me" subtitle="Get to know me better" />
              </div>

              <div className="lg:col-span-2 rounded-xl p-4 sm:p-6 border border-cyan-400/8 bg-[#04121a]">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  <div className="w-32 h-40 sm:w-40 sm:h-52 rounded-xl overflow-hidden border border-cyan-400/6 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src="rjt.jpg"
                      alt="Rajat Saxena"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='420'><rect width='100%' height='100%' fill='%23020b0e'/><text x='50%' y='50%' font-size='36' fill='%2300f5ff' text-anchor='middle' dy='.3em'>Rajat</text></svg>";
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-cyan-200 font-semibold text-lg sm:text-xl">Who Am I?</h3>
                    <p className="text-slate-300/70 mt-2 sm:mt-3 text-sm sm:text-base">
                      Hello! I'm <span className="text-cyan-100 font-semibold">Rajat Saxena</span>, a passionate and detail-oriented Java Developer who enjoys turning complex problems into elegant, efficient solutions.
                    </p>

                    <p className="text-slate-300/70 mt-2 sm:mt-3 text-sm sm:text-base">
                      My expertise lies in <span className="text-cyan-100 font-semibold">Java, Spring Boot, JDBC, MySQL</span>. I've built projects such as an HR Management System and School Management System, focusing on backend architecture and optimized data handling.
                    </p>

                    <p className="text-slate-300/70 mt-2 sm:mt-3 text-sm sm:text-base">
                      Currently expanding into <span className="text-cyan-100">Full Stack Development</span> and cloud-based microservices.
                    </p>

                    <div className="mt-3 sm:mt-4">
                      <button onClick={handleResumeClick} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-cyan-600/10 border border-cyan-400/20 cursor-pointer hover:bg-cyan-600/20 transition-colors text-sm sm:text-base">
                        <FaDownload /> <span>Download Resume</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TechTools />
        <Skills />
        <Projects />
        <EducationCerts />
        <Contact />
      </main>

      <Footer />

      {/* Inline Styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        :root {
          --neon: rgba(0, 245, 255, 0.9);
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        .input-field {
          width: 100%;
          padding: 0.65rem 0.75rem;
          background: transparent;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 245, 255, 0.06);
          color: #dbeafe;
          outline: none;
        }

        .input-field::placeholder {
          color: rgba(203, 213, 225, 0.3);
        }

        .input-field:focus {
          border-color: rgba(0,245,255,0.4);
          box-shadow: 0 0 10px rgba(0,245,255,0.2);
        }

        .btn-neon {
          color: #c6fff6;
          border: 1px solid rgba(0, 245, 255, 0.18);
          background: linear-gradient(180deg, rgba(0,245,255,0.03), rgba(12,20,30,0.02));
          box-shadow: 0 8px 30px rgba(0, 245, 255, 0.04);
        }

        .btn-neon:hover {
          box-shadow: 0 0 20px rgba(0,245,255,0.2);
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }

        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Ripple Effect Animation */
        .global-ripple {
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(0, 245, 255, 0.4) 10%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: ripple-animation 1s ease-out forwards;
        }

        @keyframes ripple-animation {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }

        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling for certificate slider */
        .snap-x {
          scroll-snap-type: x mandatory;
        }

        .snap-center {
          scroll-snap-align: center;
        }

        /* Touch-friendly certificate cards */
        @media (max-width: 640px) {
          .snap-center {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </div>
  );
}