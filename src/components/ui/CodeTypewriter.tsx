"use client";

import { useEffect, useRef, useState } from "react";

const codeSnippets = [
  {
    lang: "python",
    label: "ai_agent.py",
    lines: [
      { indent: 0, tokens: [{ t: "import ", c: "#C4A15E" }, { t: "openai", c: "#A37E36" }, { t: ", asyncio", c: "#A37E36" }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ t: "class ", c: "#C4A15E" }, { t: "ZentrixAIAgent", c: "#E8D5A3" }, { t: ":", c: "#8E8271" }] },
      { indent: 2, tokens: [{ t: "async def ", c: "#C4A15E" }, { t: "automate_workflow", c: "#A37E36" }, { t: "(self, data):", c: "#8E8271" }] },
      { indent: 4, tokens: [{ t: "response ", c: "#FAF7F2" }, { t: "= await ", c: "#C4A15E" }, { t: "self.ai.chat(data)", c: "#A37E36" }] },
      { indent: 4, tokens: [{ t: "return ", c: "#C4A15E" }, { t: "self.process(response)", c: "#FAF7F2" }] },
    ],
  },
  {
    lang: "typescript",
    label: "api-route.ts",
    lines: [
      { indent: 0, tokens: [{ t: "import ", c: "#C4A15E" }, { t: "{ NextRequest } ", c: "#FAF7F2" }, { t: "from ", c: "#C4A15E" }, { t: "'next/server'", c: "#A37E36" }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ t: "export async function ", c: "#C4A15E" }, { t: "POST", c: "#E8D5A3" }, { t: "(req: NextRequest) {", c: "#8E8271" }] },
      { indent: 2, tokens: [{ t: "const ", c: "#C4A15E" }, { t: "{ prompt } ", c: "#FAF7F2" }, { t: "= await ", c: "#C4A15E" }, { t: "req.json()", c: "#FAF7F2" }] },
      { indent: 2, tokens: [{ t: "const ", c: "#C4A15E" }, { t: "result ", c: "#FAF7F2" }, { t: "= await ", c: "#C4A15E" }, { t: "zentrixAI(prompt)", c: "#A37E36" }] },
      { indent: 2, tokens: [{ t: "return ", c: "#C4A15E" }, { t: "Response.json(result)", c: "#FAF7F2" }] },
      { indent: 0, tokens: [{ t: "}", c: "#8E8271" }] },
    ],
  },
  {
    lang: "javascript",
    label: "automation.js",
    lines: [
      { indent: 0, tokens: [{ t: "const ", c: "#C4A15E" }, { t: "crm ", c: "#FAF7F2" }, { t: "= ", c: "#8E8271" }, { t: "new ", c: "#C4A15E" }, { t: "ZentrixCRM()", c: "#A37E36" }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ t: "// Auto-qualify leads with AI", c: "#6E5528" }] },
      { indent: 0, tokens: [{ t: "crm", c: "#FAF7F2" }, { t: ".on(", c: "#8E8271" }, { t: "'lead'", c: "#A37E36" }, { t: ", async lead => {", c: "#8E8271" }] },
      { indent: 2, tokens: [{ t: "const ", c: "#C4A15E" }, { t: "score ", c: "#FAF7F2" }, { t: "= await ", c: "#C4A15E" }, { t: "ai.score(lead)", c: "#A37E36" }] },
      { indent: 2, tokens: [{ t: "if ", c: "#C4A15E" }, { t: "(score ", c: "#FAF7F2" }, { t: "> ", c: "#8E8271" }, { t: "0.8", c: "#C4A15E" }, { t: ") crm.notify(lead)", c: "#FAF7F2" }] },
      { indent: 0, tokens: [{ t: "})", c: "#8E8271" }] },
    ],
  },
  {
    lang: "python",
    label: "ml_pipeline.py",
    lines: [
      { indent: 0, tokens: [{ t: "from ", c: "#C4A15E" }, { t: "zentrix.ml ", c: "#A37E36" }, { t: "import ", c: "#C4A15E" }, { t: "Pipeline, AutoML", c: "#FAF7F2" }] },
      { indent: 0, tokens: [] },
      { indent: 0, tokens: [{ t: "pipeline ", c: "#FAF7F2" }, { t: "= ", c: "#8E8271" }, { t: "Pipeline(steps=[", c: "#FAF7F2" }] },
      { indent: 2, tokens: [{ t: "('preprocess'", c: "#A37E36" }, { t: ", ", c: "#8E8271" }, { t: "AutoML.clean()),", c: "#FAF7F2" }] },
      { indent: 2, tokens: [{ t: "('model'", c: "#A37E36" }, { t: ", ", c: "#8E8271" }, { t: "AutoML.train()),", c: "#FAF7F2" }] },
      { indent: 0, tokens: [{ t: "])", c: "#FAF7F2" }] },
      { indent: 0, tokens: [{ t: "pipeline", c: "#FAF7F2" }, { t: ".fit(data)", c: "#A37E36" }, { t: ".deploy()", c: "#C4A15E" }] },
    ],
  },
];

export default function CodeTypewriter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const snippet = codeSnippets[snippetIdx];
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisibleLines(snippet.lines.length);
      setCharIdx(999);
      return;
    }

    const clearT = () => { if (timerRef.current) clearTimeout(timerRef.current); };

    if (phase === "typing") {
      if (visibleLines < snippet.lines.length) {
        timerRef.current = setTimeout(() => {
          setVisibleLines((v) => v + 1);
        }, 120);
      } else {
        clearT();
        timerRef.current = setTimeout(() => setPhase("pause"), 2500);
      }
    } else if (phase === "pause") {
      timerRef.current = setTimeout(() => setPhase("erasing"), 1200);
    } else if (phase === "erasing") {
      if (visibleLines > 0) {
        timerRef.current = setTimeout(() => {
          setVisibleLines((v) => v - 1);
        }, 60);
      } else {
        const next = (snippetIdx + 1) % codeSnippets.length;
        setSnippetIdx(next);
        setCharIdx(0);
        setPhase("typing");
      }
    }

    return clearT;
  }, [phase, visibleLines, snippetIdx, charIdx]);

  const snippet = codeSnippets[snippetIdx];
  const displayLines = snippet.lines.slice(0, visibleLines);

  return (
    <div
      ref={containerRef}
      className="code-terminal"
      style={{
        width: "100%",
        maxWidth: 420,
        fontSize: "0.75rem",
        lineHeight: 1.7,
      }}
    >
      {/* Terminal bar */}
      <div className="code-terminal-bar">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span
          style={{
            marginLeft: 8,
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.05em",
          }}
        >
          zentrix ~ {snippet.label}
        </span>
      </div>

      {/* Code content */}
      <div style={{ padding: "16px 20px", minHeight: 160 }}>
        {displayLines.map((line, li) => (
          <div
            key={`${snippetIdx}-${li}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              animation: "fadeIn 0.15s ease forwards",
              fontFamily: "var(--font-mono)",
            }}
          >
            {/* Line number */}
            <span
              style={{
                color: "rgba(255,255,255,0.18)",
                marginRight: 16,
                userSelect: "none",
                minWidth: 16,
                textAlign: "right",
                fontSize: "0.65rem",
              }}
            >
              {li + 1}
            </span>
            {/* Indent */}
            <span style={{ whiteSpace: "pre" }}>
              {"  ".repeat(line.indent)}
            </span>
            {/* Tokens */}
            {line.tokens.map((tok, ti) => (
              <span key={ti} style={{ color: tok.c }}>
                {tok.t}
              </span>
            ))}
            {/* Blinking cursor on last line */}
            {li === displayLines.length - 1 && phase === "typing" && (
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: "1em",
                  background: "var(--color-violet)",
                  marginLeft: 1,
                  verticalAlign: "middle",
                  animation: "blink-cursor 1s step-end infinite",
                }}
              />
            )}
          </div>
        ))}

        {/* Empty state cursor */}
        {displayLines.length === 0 && (
          <div style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.18)", marginRight: 16, fontSize: "0.65rem" }}>1</span>
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: "1em",
                background: "var(--color-violet)",
                animation: "blink-cursor 1s step-end infinite",
              }}
            />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        style={{
          padding: "6px 20px",
          borderTop: "1px solid rgba(163,126,54,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "rgba(163,126,54,0.5)",
          }}
        >
          ● {snippet.lang.toUpperCase()}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Zentrix AI Engine v2.0
        </span>
      </div>
    </div>
  );
}
