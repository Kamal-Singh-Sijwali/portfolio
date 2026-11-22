import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  FileText,
  ExternalLink,
  RotateCcw,
  Key,
  Check,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { queryAiAssistant } from "../services/aiService";
import { resumeData } from "../data/resumeData";

const SUGGESTED_QUESTIONS = [
  {
    icon: "🚀",
    title: "Projects & Experience Links",
    desc: "Akitra enterprise modules, Videotube, Crypto Z & live links",
    query: "Tell me about Kamal's projects and experience with links",
  },
  {
    icon: "💼",
    title: "Current Company & Role",
    desc: "Software Engineer at Akitra (Enterprise SaaS Platform)",
    query: "What is Kamal's current working company and role?",
  },
  {
    icon: "🎓",
    title: "College & Degree",
    desc: "Master of Science in Computer Science, Kumaun University",
    query: "What is Kamal's college, degree, and educational background?",
  },
  {
    icon: "⚡",
    title: "Notice Period & Availability",
    desc: "Immediate Joiner (0 Days Notice)",
    query: "What is Kamal's notice period and availability?",
  },
  {
    icon: "🛠️",
    title: "Core Technical Skills",
    desc: "React, Node.js, TypeScript, AWS, Microservices",
    query: "What are Kamal's core technical skills?",
  },
  {
    icon: "📄",
    title: "Latest Resume Link",
    desc: "Direct Google Drive PDF View",
    query: "Can you provide Kamal's latest resume link?",
  },
  {
    icon: "📞",
    title: "Contact & Hiring Details",
    desc: "Email, Phone, LinkedIn, and Location",
    query: "How can I contact or hire Kamal?",
  },
];

// Helper to render basic markdown formatting: **bold**, [link](url), bullet points
const FormattedMessage = ({ text }) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <div key={lineIdx} className="h-1" />;
        }

        const parts = [];
        let remaining = line;
        let keyIndex = 0;

        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let lastIdx = 0;
        let match;

        while ((match = linkRegex.exec(remaining)) !== null) {
          if (match.index > lastIdx) {
            const before = remaining.substring(lastIdx, match.index);
            parts.push(renderBold(before, `b-${keyIndex++}`));
          }
          parts.push(
            <a
              key={`link-${keyIndex++}`}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary underline hover:text-purple-300 transition-colors"
            >
              <span>{match[1]}</span>
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          );
          lastIdx = match.index + match[0].length;
        }

        if (lastIdx < remaining.length) {
          parts.push(renderBold(remaining.substring(lastIdx), `b-${keyIndex++}`));
        }

        const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");

        return (
          <p
            key={lineIdx}
            className={`${isBullet ? "pl-2 flex items-start gap-1.5" : ""}`}
          >
            {parts}
          </p>
        );
      })}
    </div>
  );
};

// Render **bold** helper
const renderBold = (str, baseKey) => {
  const segments = str.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((seg, idx) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      return (
        <strong key={`${baseKey}-${idx}`} className="font-bold text-white">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${baseKey}-${idx}`}>{seg}</span>;
  });
};

export const AiChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVerticalPrompts, setShowVerticalPrompts] = useState(false);
  const [customKey, setCustomKey] = useState(
    localStorage.getItem("user_gemini_key") || ""
  );
  const [keySaved, setKeySaved] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `👋 Hi! I'm **Kamal's AI Assistant**.

I am trained directly on Kamal Singh Sijwali's verified resume and current portfolio.

Feel free to ask me anything about his **Projects & Links**, **Current Company (Akitra)**, **College & Degree**, **Skills**, or **Availability**!`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend = null) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const reply = await queryAiAssistant(text, messages, customKey);
      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: `Sorry, I encountered an issue. You can always view Kamal's resume directly at [Google Drive Resume](${resumeData.resumeLink}) or reach him at [${resumeData.email}](mailto:${resumeData.email}).`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    localStorage.setItem("user_gemini_key", customKey);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowSettings(false);
    }, 1200);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: `Conversation reset! How can I help you regarding Kamal's projects, experience, or resume?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-purple-600 to-cyan-400 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] border border-white/20 focus:outline-none"
          aria-label="Open AI Assistant"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-primary/40 animate-ping pointer-events-none" />

          {isOpen ? (
            <X className="w-6 h-6 relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f1418] animate-pulse" />
            </div>
          )}
        </Motion.button>

        {/* Small greeting tooltip pill when closed */}
        {!isOpen && (
          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex absolute right-16 top-2.5 items-center gap-2 px-3.5 py-1.5 rounded-full glass-strong border border-white/10 text-xs font-medium text-white shadow-lg cursor-pointer whitespace-nowrap hover:border-primary/50 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-highlight animate-pulse" />
            <span>Ask Kamal's AI</span>
          </Motion.div>
        )}
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[84vh] rounded-3xl glass-strong border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden bg-[#141a1f]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-surface/80">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white shadow-md shadow-primary/30">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-surface animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Kamal's AI Assistant</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-purple-300 font-semibold border border-primary/30">
                      AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Trained on Kamal's Latest Resume & Experience
                  </p>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-1 text-muted-foreground">
                {/* Resume direct link */}
                <a
                  href={resumeData.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="View Kamal's Resume"
                  aria-label="View Resume"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                </a>

                {/* API Settings toggle */}
                {/* <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Configure Gemini API Key"
                  aria-label="API Settings"
                >
                  <Key className="w-4 h-4" />
                </button> */}

                {/* Reset Chat */}
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                  title="Reset Chat"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors ml-1"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional Settings Drawer for Gemini Free API Key */}
            {showSettings && (
              <Motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-surface/95 border-b border-white/10 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-primary" />
                    <span>Free Google Gemini API Key</span>
                  </span>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-muted-foreground hover:text-white"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Works automatically with Kamal's verified resume engine. You can also provide a free key from{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Google AI Studio
                  </a>
                  .
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={handleSaveKey}
                    className="px-3 py-1.5 rounded-xl bg-primary text-white font-semibold text-xs flex items-center gap-1 hover:bg-primary/90"
                  >
                    {keySaved ? <Check className="w-3.5 h-3.5" /> : "Save"}
                  </button>
                </div>
              </Motion.div>
            )}

            {/* Status Quick Bar */}
            <div className="px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-cyan-500/10 border-b border-white/5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {resumeData.status}
                </span>
              </span>
              <a
                href={resumeData.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>Latest Resume (PDF)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-tr-sm"
                        : "bg-surface/90 border border-white/10 text-foreground rounded-tl-sm"
                    }`}
                  >
                    <FormattedMessage text={msg.text} />
                    <div
                      className={`text-[9px] mt-1.5 text-right ${
                        msg.sender === "user"
                          ? "text-white/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* VERTICAL SUGGESTED QUESTIONS (Shown initially right below greeting) */}
              {messages.length === 1 && (
                <div className="space-y-2 pt-2 pb-1">
                  <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-purple-300">
                      <Sparkles className="w-3.5 h-3.5 text-highlight animate-pulse" />
                      <span>Suggested Questions for Recruiters:</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">Click to ask</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q.query)}
                        disabled={isLoading}
                        className="w-full text-left p-2.5 sm:p-3 rounded-2xl bg-surface/90 hover:bg-primary/20 hover:border-primary/50 text-white border border-white/10 transition-all duration-200 flex items-center justify-between group shadow-sm disabled:opacity-50"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-base sm:text-lg shrink-0 p-1.5 rounded-xl bg-card border border-white/5">
                            {q.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-white group-hover:text-primary transition-colors text-xs truncate">
                              {q.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {q.desc}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs py-2">
                  <div className="w-7 h-7 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl bg-surface/90 border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Vertical Suggestions Drawer above Input (always accessible) */}
            <div className="px-3 pt-2 bg-surface/90 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowVerticalPrompts(!showVerticalPrompts)}
                className="w-full flex items-center justify-between py-1.5 px-3 rounded-xl bg-card/60 hover:bg-primary/10 text-[11px] font-semibold text-muted-foreground hover:text-white border border-white/5 transition-all mb-1"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-highlight" />
                  <span>Suggested Questions ({SUGGESTED_QUESTIONS.length})</span>
                </span>
                <span className="text-[10px] text-primary flex items-center gap-1">
                  <span>{showVerticalPrompts ? "Hide" : "Show Vertically"}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showVerticalPrompts ? "rotate-180" : ""}`} />
                </span>
              </button>

              {showVerticalPrompts && (
                <Motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="max-h-52 overflow-y-auto no-scrollbar py-1 space-y-1.5"
                >
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleSendMessage(q.query);
                        setShowVerticalPrompts(false);
                      }}
                      disabled={isLoading}
                      className="w-full text-left p-2 rounded-xl bg-card hover:bg-primary/20 hover:border-primary/50 text-white text-xs border border-white/10 transition-all flex items-center justify-between group shadow-sm disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm shrink-0">{q.icon}</span>
                        <div className="min-w-0">
                          <p className="font-medium text-white group-hover:text-primary transition-colors truncate">
                            {q.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {q.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 ml-1.5" />
                    </button>
                  ))}
                </Motion.div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-surface/90 border-t border-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about projects, Akitra, college, resume..."
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-primary/30 shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
