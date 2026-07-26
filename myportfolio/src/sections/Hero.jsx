import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Download,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const skills = [
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Context API",
  "Redux",
  "JavaScript",
  "TanStack Query",
  "React",
  "Node.js",
  "Express",
  "REST APIs",
  "Postman",
  "Microservice",
  "JWT",
  "Prisma ORM",
  "Next.js",
  "TypeScript",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Figma",
  "Git",
  "GitHub Actions",
  "Jira",
  "Agile Development",
];

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src="/main-page.jpg"
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                15 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-green-600">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100 ">
                Building{" "}
                <span className="animate-gradient glow-text">Scalable</span>
                <br />
                Web Experiences That{" "}
                <span className="animate-gradient glow-text">Users Love.</span>
                <br />
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm{" "}
                <span className="text-white italic bold">
                  Kamal Singh Sijwali{" "}
                </span>
                — a Full Stack Software Developer specializing in React.js,
                Node.js. I build scalable, high-performance web applications
                with a focus on clean architecture, exceptional user
                experiences, and enterprise-grade solutions.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button
                size="lg"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                className="flex gap-3"
                href="https://drive.google.com/file/d/1YkV0O4j8HpHLXKCb_mYBGM13yLx88WNr/view"
                target="_blank"
              >
                <AnimatedBorderButton>
                  <Download className="w-5 h-5 mt-1" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              {/* <span className="text-base text-white">Follow me: </span> */}
              {[
                {
                  icon: Github,
                  href: "https://github.com/Kamal-Singh-Sijwali",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/kamal-singh-sijwali/",
                },
                // { icon: Twitter, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
          {/* Right Column - Profile Image */}
          <div className="relatice animate-fade-in animation-delay-300">
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto">
              <div
                className="absolute inset-0 
              rounded-3xl bg-gradient-to-br 
              from-primary/30 via-transparent 
              to-primary/10 blur-2xl animate-pulse"
              />
              <div className="relative ">
                <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-400 blur-[90px] opacity-40 animate-pulse" />

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.03,
                  }}
                  style={{ perspective: 1000 }}
                >
                  <motion.img
                    src="/portfoliosticker.png"
                    alt="Kamal Singh Sijwali"
                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                    {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-00 z-100">
                  <div className="text-2xl font-bold text-green-600">3+</div>
                  <div className="text-xs text-white">Years Exp.</div>
                </div>
                </motion.div>

             
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-base text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
             bg-gradient-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
             bg-gradient-to-l from-background to-transparent z-10"
            />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-white hover:text-primary transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-base uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
