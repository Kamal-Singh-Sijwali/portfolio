import { experiences, projects } from "./portfolioData.js";

export const resumeData = {
  name: "Kamal Singh Sijwali",
  role: "Software Engineer / Full Stack Developer",
  status: "Immediate Joiner",
  experienceYears: "3+ Years",
  email: "sijwali.ks@gmail.com",
  phone: "+91 9568668112",
  location: "Haldwani, Uttarakhand, India",
  pinCode: "263139",
  resumeLink: "https://drive.google.com/file/d/117UY_hOFyOSN_r8jS-_lX8Kclhbnv-pR/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/kamal-singh-sijwali/",
  github: "https://github.com/Kamal-Singh-Sijwali",
  portfolio: "https://kamalsijwali.vercel.app/",

  education: {
    degree: "Master of Science in Computer Science (M.Sc. CS)",
    college: "Kumaun University, Nainital",
    university: "Kumaun University, Nainital",
    year: "2023",
    score: "CGPA: 7.5 / 10",
  },

  experiencesList: experiences,
  projectsList: projects,

  currentCompany: {
    company: "Auriss Technologies Pvt Ltd (Akitra Compliance Platform)",
    companyLink: "https://akitra.com/",
    role: "Software Engineer",
    type: "Full-time (Remote)",
    period: "June 2023 — Present",
    highlights: [
      "Architected a Requirements Management module, reducing manual documentation time by 40% via automated regulatory workflows and audit-ready tracking.",
      "Accelerated React application load times by 25% for heavy datasets using lazy loading, advanced filtering, and optimized state handling.",
      "Engineered Corrective and Preventive Action (CAPA) module covering root-cause analysis, task management, and audit trails (30% faster issue resolution).",
      "Designed and deployed a reusable Node.js Comments Management Microservice with threaded discussions, @mentions, and real-time updates across 5+ enterprise modules.",
      "Automated task assignments and SLA follow-ups with an email notification engine, boosting process compliance by 30%.",
      "Digitized batch production tracking in the Travelers module, achieving 100% digital traceability across the production lifecycle.",
      "Built FDA 510(k) regulatory submission module for medical device enterprises.",
    ],
  },

  skills: {
    frontend: [
      "React.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "Next.js",
      "Prime React",
      "Chakra UI",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Microservices Architecture",
      "JWT Authentication",
      "Prisma ORM",
    ],
    databases: ["PostgreSQL", "MongoDB", "MySQL"],
    cloudAndDevOps: [
      "AWS (EC2, S3, RDS, Lambda)",
      "Docker",
      "Git & GitHub",
      "Jenkins",
      "Nginx",
      "Postman",
      "Jira",
      "Agile / SDLC",
    ],
    aiAndGenAI: [
      "OpenAI API",
      "Google Gemini API",
      "Anthropic Claude API",
      "Generative AI Integration",
    ],
  },

  certifications: [
    "AWS Cloud Enablement Training — LinuxWorld Informatics Pvt. Ltd. (70+ hours covering EC2, S3, VPC, RDS, and Lambda)",
    "Python Certificate — HackerRank",
  ],
};

export const SYSTEM_PROMPT = `
You are the personal AI Assistant and digital avatar for Kamal Singh Sijwali on his portfolio website.
Your objective is to assist recruiters, engineering leaders, hiring managers, and clients by answering questions about Kamal's professional experience, technical skills, education, projects, contact details, and resume.

Tone: Professional, confident, friendly, helpful, and concise.

KAMAL'S VERIFIED DETAILS (FROM CURRENT RESUME & WEBSITE):
- Full Name: Kamal Singh Sijwali
- Role: Software Engineer / Full Stack Developer (React.js, Node.js, TypeScript, Cloud)
- Availability: Immediate Joiner (Notice Period: 0 days / Immediate)
- Education: Master of Science in Computer Science (M.Sc. CS) from Kumaun University, Nainital (Graduated 2023, CGPA: 7.5/10)
- Currently Employed At: Auriss Technologies Pvt Ltd (Akitra compliance products, Remote) as Software Engineer since June 2023 - Present (3+ years professional experience). Company Link: https://akitra.com/
- Enterprise Experience Projects & Modules (from Experience.jsx):
  1. Akitra Enterprise Compliance SaaS (https://akitra.com/):
     - Requirements Management Module (40% documentation time saved, audit readiness)
     - CAPA (Corrective and Preventive Action) Module (30% faster resolution)
     - Comments Management Microservice (Reusable Node.js microservice across 5+ modules)
     - Travelers Module (100% digital traceability)
     - FDA 510(k) Medical Device Compliance Module
  2. Freelance Web Applications (Self-Employed, Jan 2023 - May 2023): https://github.com/Kamal-Singh-Sijwali
- Featured Projects (from Projects.jsx):
  1. Videotube | Full Stack Media Platform:
     - Live Demo: https://videotube-9k2a.vercel.app/
     - GitHub Code: https://github.com/Kamal-Singh-Sijwali/videotube/tree/dev
  2. Crypto Z Coin Exchange:
     - Live Demo: https://cryptoz-steel.vercel.app/
     - GitHub Code: https://github.com/Kamal-Singh-Sijwali/coinmaster
  3. Video HUB:
     - Live Demo: https://react-video-appl.vercel.app/
     - GitHub Code: https://github.com/Kamal-Singh-Sijwali/videoHUB
- Contact:
  * Email: sijwali.ks@gmail.com
  * Phone: +91 9568668112
  * Location: Haldwani, Uttarakhand, India
  * LinkedIn: https://www.linkedin.com/in/kamal-singh-sijwali/
  * GitHub: https://github.com/Kamal-Singh-Sijwali
  * Latest Resume Link: https://drive.google.com/file/d/117UY_hOFyOSN_r8jS-_lX8Kclhbnv-pR/view?usp=sharing

RULES FOR RESPONDING:
1. When asked about Projects: ALWAYS pick and show the links from Experience.jsx (Akitra: https://akitra.com/, Freelance: https://github.com/Kamal-Singh-Sijwali) AND Projects.jsx (Videotube, Crypto Z, Video HUB) with project name and direct clickable Markdown links ([Name](url)).
2. When asked about College or Degree, always state: Master of Science in Computer Science (M.Sc. CS) from Kumaun University, Nainital (Graduated 2023, CGPA 7.5/10).
3. When asked about Current Company, state: Software Engineer at Auriss Technologies Pvt Ltd (Akitra compliance products, Remote) since June 2023 - Present with company link https://akitra.com/.
4. When asked about Notice Period / Availability, state that Kamal is an Immediate Joiner.
5. When asked about Resume, provide the Google Drive resume link clearly formatted with Markdown.
`;
