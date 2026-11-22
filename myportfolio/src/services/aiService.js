import { resumeData, SYSTEM_PROMPT } from "../data/resumeData.js";
import { experiences, projects } from "../data/portfolioData.js";

/**
 * Fallback Local Knowledge Engine based on Kamal's verified resume and sections.
 * Responds immediately with 0ms latency and 100% accuracy when free AI API key is not provided.
 */
export const getLocalResumeAnswer = (query) => {
  const q = query.toLowerCase().trim();

  // Quick math detector (e.g., "2+2", "what is 5 * 10")
  const mathPattern = /^(?:what\s+is\s+|calculate\s+|solve\s+)?([\d\s+\-*/().%]+)$/i;
  const match = q.match(mathPattern);
  if (match && /[+\-*/]/.test(match[1])) {
    try {
      const cleanExpr = match[1].replace(/[^\d+\-*/().\s]/g, "").trim();
      if (cleanExpr && /^[\d\s+\-*/().]+$/.test(cleanExpr)) {
        const calcResult = Function(`'use strict'; return (${cleanExpr})`)();
        if (typeof calcResult === "number" && !isNaN(calcResult) && isFinite(calcResult)) {
          return `🔢 **${cleanExpr} = ${calcResult}**\n\nI can do calculations, but my real specialty is answering questions about **Kamal Singh Sijwali's** software engineering background, projects, skills, and resume! Feel free to ask about his work at Akitra or his M.Sc. in Computer Science.`;
        }
      }
    } catch {
      // fallback to regular matching
    }
  }

  // 1. College, Degree & Education
  if (
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("university") ||
    q.includes("education") ||
    q.includes("study") ||
    q.includes("studied") ||
    q.includes("graduat") ||
    q.includes("cgpa") ||
    q.includes("msc") ||
    q.includes("m.sc")
  ) {
    return `🎓 **Kamal's Educational Background**:

• **Degree**: ${resumeData.education.degree}
• **College / University**: ${resumeData.education.college}
• **Graduation Year**: ${resumeData.education.year}
• **Academic Score**: ${resumeData.education.score}

Kamal has a solid foundation in computer science, software engineering algorithms, data structures, and distributed systems.`;
  }

  // 2. Projects & Experience (Picks links from experiences of Experience.jsx and projects of Projects.jsx)
  if (
    q.includes("project") ||
    q.includes("videotube") ||
    q.includes("crypto") ||
    q.includes("video hub") ||
    q.includes("portfolio") ||
    q.includes("app") ||
    q.includes("build")
  ) {
    // Collect experience items from Experience.jsx
    const akitraExp = experiences.find((e) => e.company === "Akitra") || {
      company: "Akitra",
      link: "https://akitra.com/",
      role: "Software Engineer",
      period: "Oct 2024 — Present",
    };

    const freelanceExp = experiences.find((e) => e.role.includes("Freelance")) || {
      company: "Self-Employed",
      link: "https://github.com/Kamal-Singh-Sijwali",
      role: "Freelance Developer",
    };

    return `🚀 **Kamal's Projects & Experience Links**:

**1. Enterprise Projects & Modules (from experiences of Experience.jsx)**:
• **[${akitraExp.company} — Enterprise SaaS Platform](${akitraExp.link})**
  - **Role**: ${akitraExp.role} (${akitraExp.period})
  - **Enterprise Modules Built**:
    * 📋 **Requirements Management Module**: Automated regulatory tracking & version control (reduced manual documentation time by 40%).
    * 💬 **Comments Microservice**: Reusable Node.js threaded comments microservice with real-time updates deployed across 5+ enterprise modules.
    * 🛡️ **CAPA Module**: Root-cause analysis and corrective actions (improved issue resolution by 30%).
    * 📦 **Travelers Module**: Batch production tracking achieving 100% digital traceability.
    * 🏥 **FDA 510(k) Module**: Medical device regulatory submission workflows.
  - 🔗 **Link**: [${akitraExp.company} Official Platform](${akitraExp.link})

• **[${freelanceExp.role} — Client Web Applications](${freelanceExp.link})**
  - Delivered custom responsive web applications with modern frontend UI, React, Chakra UI, and post-launch maintenance.
  - 🔗 **Link**: [Kamal's GitHub Repositories](${freelanceExp.link})

---

**2. Featured Production Web Applications (from Projects.jsx)**:
${projects
  .map(
    (p) => `• **${p.title}**
  - *About*: ${p.description}
  - 🌐 **Live Demo**: [${p.title} Live Link](${p.link})
  - 💻 **Source Code**: [GitHub Code](${p.github})`
  )
  .join("\n\n")}`;
  }

  // 3. Currently Working Company & Work Experience
  if (
    q.includes("current") ||
    q.includes("working") ||
    q.includes("company") ||
    q.includes("auriss") ||
    q.includes("akitra") ||
    q.includes("job") ||
    q.includes("role") ||
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("employ")
  ) {
    const akitraLink = experiences[0]?.link || "https://akitra.com/";

    return `💼 **Kamal's Professional Experience**:

**Currently Working At**:
• **Company**: [**Akitra / Auriss Technologies**](${akitraLink}) (${resumeData.currentCompany.type})
• **Role**: ${resumeData.currentCompany.role}
• **Period**: ${resumeData.currentCompany.period} (${resumeData.experienceYears} total experience)
• **Company Website**: [${akitraLink}](${akitraLink})

**Key Achievements & Modules Built**:
• ⚡ **Requirements Management**: Reduced manual documentation time by 40% with automated workflows.
• 🚀 **Performance Optimization**: Accelerated React application load times by 25% with lazy loading and data filtering.
• 🛡️ **CAPA Module**: Root-cause analysis and task workflows, cutting resolution time by 30%.
• 💬 **Comments Microservice**: Reusable Node.js real-time threaded discussions across 5+ enterprise modules.
• 📋 **Travelers Module**: 100% digital traceability for production batch life cycles.
• 🏥 **FDA 510(k)**: Regulatory submission workflows for medical device clients.

He also worked as a **Freelance Full Stack Developer** in 2023 building client web applications.`;
  }

  // 4. Notice Period & Availability
  if (
    q.includes("notice") ||
    q.includes("join") ||
    q.includes("available") ||
    q.includes("availability") ||
    q.includes("immediate") ||
    q.includes("relocat") ||
    q.includes("hiring")
  ) {
    return `⚡ **Availability & Notice Period**:

• **Status**: **${resumeData.status}**!
• Kamal can start **immediately** upon offer acceptance (0 days notice period).
• He is open to **Full-Time**, **Remote**, or **Hybrid / On-site** Software Engineering opportunities.

Would you like to review his resume or schedule an interview? You can reach him at [${resumeData.email}](mailto:${resumeData.email}) or **${resumeData.phone}**.`;
  }

  // 5. Latest Resume Link
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("download") ||
    q.includes("pdf")
  ) {
    return `📄 **Kamal's Latest Resume**:

You can view and download his verified resume here:
🔗 **[Click here to View / Download Kamal's Resume (Google Drive)](${resumeData.resumeLink})**

The resume highlights his 3+ years of experience in enterprise SaaS, full-stack microservices, M.Sc. in Computer Science, and certifications.`;
  }

  // 6. Technical Skills & Tech Stack
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("react") ||
    q.includes("node") ||
    q.includes("javascript") ||
    q.includes("typescript") ||
    q.includes("database") ||
    q.includes("cloud") ||
    q.includes("aws") ||
    q.includes("docker") ||
    q.includes("ai")
  ) {
    return `🛠️ **Kamal's Core Technical Skills**:

• **Frontend**: React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, Redux Toolkit, TanStack Query, Prime React, Chakra UI
• **Backend**: Node.js, Express.js, RESTful APIs, Microservices, JWT, Prisma ORM
• **Databases**: PostgreSQL, MongoDB, MySQL
• **DevOps & Cloud**: AWS (EC2, S3, RDS, Lambda), Docker, Git & GitHub, Jenkins, Nginx, Postman, Jira, Agile/SDLC
• **AI & GenAI**: OpenAI API, Google Gemini API, Anthropic Claude API, GenAI Workflow Integration`;
  }

  // 7. Contact Details
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("number") ||
    q.includes("call") ||
    q.includes("reach") ||
    q.includes("location") ||
    q.includes("address") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    return `📬 **Get in Touch with Kamal**:

• **Email**: [${resumeData.email}](mailto:${resumeData.email})
• **Phone**: [${resumeData.phone}](tel:${resumeData.phone.replace(/\s+/g, "")})
• **Location**: ${resumeData.location} (PIN: ${resumeData.pinCode})
• **LinkedIn**: [linkedin.com/in/kamal-singh-sijwali](${resumeData.linkedin})
• **GitHub**: [github.com/Kamal-Singh-Sijwali](${resumeData.github})
• **Resume**: [View Latest Resume (PDF)](${resumeData.resumeLink})

Feel free to send him an email or connect on LinkedIn directly!`;
  }

  // 8. Certifications
  if (
    q.includes("certif") ||
    q.includes("credential") ||
    q.includes("course") ||
    q.includes("train")
  ) {
    return `📜 **Certifications & Training**:

• **AWS Cloud Enablement Training** — LinuxWorld Informatics Pvt. Ltd. (70+ hours covering EC2, S3, VPC, RDS, and Lambda).
• **Python Certificate** — HackerRank.`;
  }

  // Default Greeting / Introduction
  return `👋 Hi there! I'm **Kamal's AI Assistant**.

I am trained on Kamal Singh Sijwali's verified resume and current portfolio. Here is a quick snapshot:

• **Current Role**: Software Engineer at [Akitra](${experiences[0]?.link || "https://akitra.com/"}) (${resumeData.experienceYears} experience)
• **Availability**: **${resumeData.status}**
• **Education**: **${resumeData.education.degree}** from **${resumeData.education.college}** (${resumeData.education.year})
• **Key Skills**: React.js, Node.js, TypeScript, PostgreSQL, MongoDB, AWS, Microservices
• **Latest Resume**: [View Resume Link](${resumeData.resumeLink})

Feel free to click any of the suggested questions above or ask me about his projects, experience, or college!`;
};

/**
 * Send query to Free Google Gemini API (or fallback to local verified knowledge engine)
 */
export const queryAiAssistant = async (userMessage, chatHistory = [], customApiKey = null) => {
  const apiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!apiKey || apiKey.trim() === "") {
    await new Promise((r) => setTimeout(r, 350));
    return getLocalResumeAnswer(userMessage);
  }

  // Modern supported Gemini model endpoints with automatic fallback
  const candidateModels = [
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-flash-latest",
  ];

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${SYSTEM_PROMPT}\n\nIMPORTANT: Use the above verified resume details to answer accurately. Always include relevant links (e.g. Akitra platform: https://akitra.com/, projects, or resume) formatted in Markdown.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood. I am Kamal's AI Assistant, trained on his exact resume, education from Kumaun University (M.Sc. CS 2023), experience at Auriss/Akitra (https://akitra.com/), skills, and projects.",
        },
      ],
    },
  ];

  const recentHistory = chatHistory.slice(-6);
  recentHistory.forEach((msg) => {
    contents.push({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    });
  });

  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 600,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (reply && reply.trim()) {
          return reply.trim();
        }
      } else {
        console.warn(`Gemini model ${model} returned status ${response.status}`);
      }
    } catch (error) {
      console.warn(`Error querying Gemini model ${model}:`, error);
    }
  }

  // If all API model attempts fail or are rate-limited, smoothly fallback to local verified resume engine
  return getLocalResumeAnswer(userMessage);
};
