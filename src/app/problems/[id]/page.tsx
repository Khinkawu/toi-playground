"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { PROBLEM_MAP } from "@/data/problems";
import { getProgress, markAttempted, markSolved } from "@/lib/firestore";
import { Language } from "@/lib/piston";
import Editor, { DEFAULT_CODE } from "@/components/Editor";
import RunPanel from "@/components/RunPanel";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import AppShell from "@/components/AppShell";
import Link from "next/link";

const LANG_LABELS: Record<Language, string> = { cpp: "C++", c: "C", python: "Python" };
const LEVEL_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  A1: { color: "var(--accent)", bg: "var(--accent-bg)", border: "var(--accent-bd)" },
  A2: { color: "var(--yellow)", bg: "var(--yellow-bg)", border: "#FDE68A" },
  A3: { color: "var(--red)", bg: "var(--red-bg)", border: "var(--red-bd)" },
};

export default function ProblemPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const problem = PROBLEM_MAP.get(id);
  const [language, setLanguage] = useState<Language>("cpp");
  const [code, setCode] = useState<Record<Language, string>>({
    cpp: DEFAULT_CODE.cpp,
    c: DEFAULT_CODE.c,
    python: DEFAULT_CODE.python,
  });
  const [leftTab, setLeftTab] = useState<"problem" | "hints">("problem");
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !problem) return;
    getProgress(user.uid, problem.id).then((p) => {
      if (p?.code && p.language) {
        setLanguage(p.language as Language);
        setCode((prev) => ({ ...prev, [p.language]: p.code }));
      }
      if (p?.status === "solved") setSolved(true);
    });
  }, [user, problem]);

  const handleAttempted = useCallback(async () => {
    if (!user || !problem) return;
    await markAttempted(user.uid, problem.id, language, code[language]);
  }, [user, problem, language, code]);

  const handleSolved = useCallback(async () => {
    if (!user || !problem) return;
    setSolved(true);
    await markSolved(user.uid, problem.id, problem.level, language, code[language]);
  }, [user, problem, language, code]);

  if (!problem) {
    return (
      <AppShell>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--text3)" }}>
          ไม่พบโจทย์ {id}
        </div>
      </AppShell>
    );
  }

  const levelStyle = LEVEL_STYLE[problem.level];

  return (
    <AppShell>
      <div
        style={{
          height: "calc(100dvh - 3.5rem)",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        {/* Sub-header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
            flexShrink: 0,
          }}
        >
          <Link
            href="/problems"
            style={{ fontSize: "0.8rem", color: "var(--text3)", display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            ← โจทย์
          </Link>
          <span style={{ color: "var(--border2)" }}>·</span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              fontFamily: "var(--mono)",
              color: levelStyle.color,
              background: levelStyle.bg,
              border: `1px solid ${levelStyle.border}`,
              padding: "0.1rem 0.4rem",
              borderRadius: 4,
            }}
          >
            {problem.level}
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--text3)" }}>
            {problem.id}
          </span>
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{problem.title}</span>

          {solved && (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--accent)",
                background: "var(--accent-bg)",
                padding: "0.15rem 0.5rem",
                borderRadius: 4,
                border: "1px solid var(--accent-bd)",
              }}
            >
              ✓ ผ่านแล้ว
            </span>
          )}

          <div style={{ flex: 1 }} />

          {/* Language selector */}
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {(["cpp", "c", "python"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                style={{
                  padding: "0.2rem 0.6rem",
                  fontSize: "0.78rem",
                  fontFamily: "var(--mono)",
                  fontWeight: 500,
                  background: language === l ? "var(--accent-bg)" : "transparent",
                  color: language === l ? "var(--accent)" : "var(--text3)",
                  border: language === l ? "1px solid var(--accent-bd)" : "1px solid transparent",
                  borderRadius: 6,
                  cursor: "pointer",
                  boxShadow: language === l ? "var(--shadow-sm)" : "none",
                }}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        {/* Main split */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left: Problem */}
          <div
            style={{
              width: "45%",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid var(--border)",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                padding: "0.5rem 0.75rem",
                borderBottom: "1px solid var(--border)",
                flexShrink: 0,
                background: "var(--surface)",
              }}
            >
              {(["problem", "hints"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setLeftTab(t)}
                  style={{
                    padding: "0.2rem 0.625rem",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    background: leftTab === t ? "var(--surface)" : "transparent",
                    color: leftTab === t ? "var(--text)" : "var(--text3)",
                    border: leftTab === t ? "1px solid var(--border)" : "1px solid transparent",
                    borderRadius: 6,
                    cursor: "pointer",
                    boxShadow: leftTab === t ? "var(--shadow-sm)" : "none",
                  }}
                >
                  {t === "problem" ? "โจทย์" : "Hints"}
                  {t === "hints" && problem.hints && (
                    <span style={{ marginLeft: "0.25rem", color: "var(--accent)", fontSize: "0.7rem" }}>
                      {problem.hints.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "auto", padding: "1rem" }}>
              {leftTab === "problem" ? (
                <>
                  <MarkdownRenderer content={problem.description} />

                  <Divider />
                  <section style={{ marginBottom: "1rem" }}>
                    <h4 style={{ margin: "0 0 0.375rem", fontSize: "0.78rem", color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Input
                    </h4>
                    <MarkdownRenderer content={problem.inputSpec} />
                  </section>

                  <section style={{ marginBottom: "1rem" }}>
                    <h4 style={{ margin: "0 0 0.375rem", fontSize: "0.78rem", color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Output
                    </h4>
                    <MarkdownRenderer content={problem.outputSpec} />
                  </section>

                  <Divider />
                  <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    ตัวอย่าง
                  </h4>
                  {problem.examples.map((ex, i) => (
                    <div key={i} style={{ marginBottom: "0.875rem" }}>
                      {ex.label && (
                        <p style={{ margin: "0 0 0.25rem", fontSize: "0.78rem", color: "var(--text3)" }}>
                          {ex.label}
                        </p>
                      )}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        <IOBox label="Input" value={ex.input} />
                        <IOBox label="Output" value={ex.expectedOutput} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  {problem.hints && problem.hints.length > 0 ? (
                    problem.hints.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          background: "var(--surface2)",
                          border: "1px solid var(--border)",
                          borderLeft: "3px solid var(--blue)",
                          borderRadius: "0 12px 12px 0",
                          padding: "0.625rem 0.875rem",
                          marginBottom: "0.625rem",
                          fontSize: "0.875rem",
                          color: "var(--text2)",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <strong style={{ color: "var(--blue)", fontFamily: "var(--mono)", fontSize: "0.78rem" }}>
                          Hint {i + 1}
                        </strong>
                        <p style={{ margin: "0.25rem 0 0" }}>{h}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "var(--text3)", fontSize: "0.875rem", textAlign: "center", marginTop: "2rem" }}>
                      ไม่มี Hints สำหรับข้อนี้
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Editor + Output */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Editor */}
            <div style={{ flex: "0 0 60%", overflow: "hidden" }}>
              <Editor
                language={language}
                value={code[language]}
                onChange={(v) => setCode((prev) => ({ ...prev, [language]: v }))}
              />
            </div>

            {/* Run panel */}
            <div style={{ flex: "0 0 40%", overflow: "hidden" }}>
              <RunPanel
                problem={problem}
                code={code[language]}
                language={language}
                onSolved={handleSolved}
                onAttempted={handleAttempted}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--border)",
        margin: "1rem 0",
      }}
    />
  );
}

function IOBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ margin: "0 0 0.2rem", fontSize: "0.7rem", color: "var(--text3)", fontWeight: 600 }}>
        {label}
      </p>
      <pre
        style={{
          margin: 0,
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "0.5rem 0.625rem",
          fontFamily: "var(--mono)",
          fontSize: "0.8rem",
          color: "var(--text)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {value}
      </pre>
    </div>
  );
}
