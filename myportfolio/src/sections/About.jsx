import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Engineering",
    description:
      "Crafting scalable, maintainable codebases that support long-term product growth.",
  },
  {
    icon: Rocket,
    title: "High Performance",
    description:
      "Optimizing frontend and backend systems for faster load times and seamless user experiences.",
  },
  {
    icon: Users,
    title: "Business Impact",
    description:
      "Building enterprise-grade solutions that streamline workflows and improve operational efficiency.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description:
      "Transforming complex requirements into reliable, user-focused software solutions.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-White text-base font-bold tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground ">
            <span className="text-primary">Building scalable software,</span>
              <span className="font-serif italic font-normal text-white">
                {" "}
                that powers enterprise innovation.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200 text-muted-foreground">
              <p>
              I'm a Full Stack Software Developer with 3+ years of experience building high-performance SaaS applications using the React, Node, JavaScript, TypeScript, MongoDB and PostgreSQL. I enjoy solving complex engineering problems by designing scalable architectures, developing reusable components, and delivering intuitive user experiences.
              </p>
              <p>
              I have a strong passion for creating clean, maintainable code, developing scalable microservices, optimizing frontend performance, and building products that are both reliable and user-friendly. Whether it's architecting backend services, crafting responsive React interfaces, or improving system performance, I focus on delivering solutions that create measurable business impact.
              </p>
              <p>
              Outside of work, I'm continuously sharpening my skills through system design, JavaScript, React, and backend engineering while exploring modern technologies and contributing to personal projects.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "I believe great software is built by combining clean architecture, scalable engineering, and exceptional user experiences—creating products that businesses trust and users enjoy every day."
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-base text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
