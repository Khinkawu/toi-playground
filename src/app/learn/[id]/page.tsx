"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/lib/auth";
import { LESSON_MAP, Section, SectionQuiz, SectionCoding } from "@/data/lessons";
import { getLessonProgress, markExercisePassed, LessonProgress } from "@/lib/firestore";
import { runCode, checkAnswer, Language } from "@/lib/piston";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import AppShell from "@/components/AppShell";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        background: "#1E293B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748B",
        fontSize: "0.82rem",
        fontFamily: "var(--mono)",
      }}
    >
      กำลังโหลด Editor…
    </div>
  ),
});

function MiniSpinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
        border: "2px solid #E5E7EB",
        borderTop: "2px solid var(--accent)",
        borderRadius: "50%",
        animation: "spin 0.65s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

// ─── QuizSection ─────────────────────────────────────────────────────────────

function QuizSection({
  section,
  onPass,
  alreadyPassed,
}: {
  section: SectionQuiz;
  onPass: () => void;
  alreadyPassed: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(alreadyPassed);
  const [isCorrect, setIsCorrect] = useState(alreadyPassed);

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === section.correct;
    setSubmitted(true);
    setIsCorrect(correct);
    if (correct) onPass();
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div
      style={{
        border: "1.5px solid var(--blue-bd)",
        borderLeft: "4px solid var(--blue)",
        borderRadius: "0 12px 12px 0",
        background: "var(--surface)",
        padding: "1.375rem 1.5rem",
        marginBottom: "1.5rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "var(--blue)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "0.75rem",
          background: "var(--blue-bg)",
          padding: "0.2rem 0.6rem",
          borderRadius: 20,
          border: "1px solid var(--blue-bd)",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        แบบทดสอบ
      </div>

      <p style={{ margin: "0 0 1.125rem", fontWeight: 600, fontSize: "0.975rem", lineHeight: 1.6, color: "var(--text)", whiteSpace: "pre-wrap" }}>
        {section.question}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
        {section.options.map((opt, i) => {
          let bg = "var(--surface2)";
          let border = "var(--border)";
          let color = "var(--text2)";
          let weight = 400;

          if (submitted) {
            if (i === section.correct) {
              bg = "var(--accent-bg)"; border = "var(--accent-bd)"; color = "var(--accent)"; weight = 600;
            } else if (i === selected && !isCorrect) {
              bg = "var(--red-bg)"; border = "var(--red-bd)"; color = "var(--red)";
            }
          } else if (selected === i) {
            bg = "var(--blue-bg)"; border = "var(--blue-bd)"; color = "var(--blue)"; weight = 500;
          }

          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.625rem",
                padding: "0.7rem 0.875rem",
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: 9,
                color,
                fontWeight: weight,
                cursor: submitted ? "default" : "pointer",
                textAlign: "left",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                transition: "all 0.12s",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `2px solid ${border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.68rem",
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 1,
                  background: submitted && i === section.correct ? "var(--accent)" : submitted && i === selected && !isCorrect ? "var(--red)" : "transparent",
                  color: (submitted && (i === section.correct || (i === selected && !isCorrect))) ? "#fff" : color,
                }}
              >
                {submitted && i === section.correct ? "✓" : submitted && i === selected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 9,
            background: isCorrect ? "var(--accent-bg)" : "var(--red-bg)",
            border: `1.5px solid ${isCorrect ? "var(--accent-bd)" : "var(--red-bd)"}`,
            marginBottom: "0.875rem",
          }}
        >
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: isCorrect ? "var(--accent)" : "var(--red)", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {isCorrect ? "ถูกต้อง!" : "ยังไม่ถูกต้อง"}
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.6 }}>{section.explanation}</p>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            style={{
              padding: "0.5rem 1.375rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              background: selected !== null ? "var(--blue)" : "var(--surface2)",
              color: selected !== null ? "#fff" : "var(--text3)",
              border: "none",
              borderRadius: 8,
              cursor: selected !== null ? "pointer" : "not-allowed",
              boxShadow: selected !== null ? "0 2px 8px rgba(37,99,235,.25)" : "none",
              transition: "all 0.12s",
            }}
          >
            ตรวจคำตอบ
          </button>
        )}
        {submitted && !isCorrect && (
          <button
            onClick={handleRetry}
            style={{
              padding: "0.5rem 1.375rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              background: "var(--surface2)",
              color: "var(--text2)",
              border: "1.5px solid var(--border)",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            ลองใหม่
          </button>
        )}
      </div>
    </div>
  );
}

// ─── CodingSection ────────────────────────────────────────────────────────────

interface TestResult {
  passed: boolean;
  output: string;
  expected: string;
  input: string;
  label?: string;
  error?: string;
  elapsed?: number;
}

function CodingSection({
  section,
  onPass,
  alreadyPassed,
}: {
  section: SectionCoding;
  onPass: () => void;
  alreadyPassed: boolean;
}) {
  const [lang, setLang] = useState<"cpp" | "c" | "python">("cpp");
  const [code, setCode] = useState<Record<"cpp" | "c" | "python", string>>({
    cpp: section.starterCode.cpp,
    c: section.starterCode.c,
    python: section.starterCode.python,
  });
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [ran, setRan] = useState(alreadyPassed);
  const [allPassed, setAllPassed] = useState(alreadyPassed);
  const [showHints, setShowHints] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const handleRun = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setRan(false);
    setResults([]);
    setExpanded(new Set());

    const pistonLang: Language = lang as Language;
    const tempResults: TestResult[] = [];

    for (const tc of section.testCases) {
      const r = await runCode(pistonLang, code[lang], tc.input);
      const actual = r.error || r.isCompileError ? "" : r.stdout;
      const passed = !r.error && !r.isCompileError && checkAnswer(tc.expectedOutput, actual);
      tempResults.push({
        passed,
        output: actual,
        expected: tc.expectedOutput,
        input: tc.input,
        label: tc.label,
        error: r.error || (r.isCompileError ? r.stderr : undefined),
        elapsed: r.elapsed,
      });
      setResults([...tempResults]);
    }

    const passed = tempResults.every((r) => r.passed);
    setAllPassed(passed);
    setRan(true);
    setBusy(false);
    if (passed) onPass();
  }, [busy, lang, code, section, onPass]);

  const toggleExpand = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const passedCount = results.filter((r) => r.passed).length;

  return (
    <div
      style={{
        border: "1.5px solid var(--border)",
        borderRadius: 12,
        background: "var(--surface)",
        marginBottom: "1.5rem",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.875rem 1.125rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface2)",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "#7C3AED",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            background: "#F5F3FF",
            padding: "0.2rem 0.6rem",
            borderRadius: 20,
            border: "1px solid #DDD6FE",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          แบบฝึกหัด
        </span>
        {alreadyPassed && (
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent)", background: "var(--accent-bg)", padding: "0.15rem 0.5rem", borderRadius: 4, border: "1px solid var(--accent-bd)" }}>
            ✓ ผ่านแล้ว
          </span>
        )}
      </div>

      {/* Instruction */}
      <div
        style={{
          padding: "1rem 1.125rem",
          borderBottom: "1px solid var(--border)",
          fontSize: "0.875rem",
          color: "var(--text2)",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
        }}
      >
        {section.instruction}
      </div>

      {/* Language tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.5rem 0.875rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface2)",
        }}
      >
        {(["cpp", "c", "python"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "0.25rem 0.7rem",
              fontSize: "0.78rem",
              fontFamily: "var(--mono)",
              fontWeight: 600,
              background: lang === l ? "#FFFFFF" : "transparent",
              color: lang === l ? "var(--text)" : "var(--text3)",
              border: lang === l ? "1.5px solid var(--border)" : "1.5px solid transparent",
              borderRadius: 6,
              cursor: "pointer",
              boxShadow: lang === l ? "var(--shadow-sm)" : "none",
              transition: "all 0.12s",
            }}
          >
            {l === "cpp" ? "C++" : l === "c" ? "C" : "Python"}
          </button>
        ))}

        {section.hints && section.hints.length > 0 && (
          <>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => setShowHints((h) => !h)}
              style={{
                padding: "0.25rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: showHints ? "var(--blue-bg)" : "transparent",
                color: "var(--blue)",
                border: `1.5px solid ${showHints ? "var(--blue-bd)" : "transparent"}`,
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Hints ({section.hints.length})
            </button>
          </>
        )}
      </div>

      {/* Hints */}
      {showHints && section.hints && (
        <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", background: "var(--blue-bg)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {section.hints.map((h, i) => (
            <div
              key={i}
              style={{ padding: "0.5rem 0.75rem", borderRadius: 8, background: "#FFFFFF", border: "1px solid var(--blue-bd)", fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}
            >
              <span style={{ fontWeight: 700, color: "var(--blue)", fontSize: "0.72rem", marginRight: "0.5rem", fontFamily: "var(--mono)" }}>
                Hint {i + 1}
              </span>
              {h}
            </div>
          ))}
        </div>
      )}

      {/* Editor (keep dark) */}
      <div style={{ height: 240, borderBottom: "1px solid var(--border)" }}>
        <MonacoEditor
          height="100%"
          language={lang === "python" ? "python" : "cpp"}
          value={code[lang]}
          theme="vs-dark"
          onChange={(v) => setCode((prev) => ({ ...prev, [lang]: v ?? "" }))}
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Cascadia Code', ui-monospace, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 10, bottom: 10 },
            lineNumbersMinChars: 3,
            tabSize: 4,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Run bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          padding: "0.625rem 0.875rem",
          borderBottom: results.length > 0 ? "1px solid var(--border)" : "none",
          background: "var(--surface2)",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleRun}
          disabled={busy}
          style={{
            padding: "0.45rem 1.125rem",
            fontSize: "0.82rem",
            fontWeight: 700,
            background: busy ? "var(--border)" : "var(--accent)",
            color: busy ? "var(--text3)" : "#fff",
            border: "none",
            borderRadius: 7,
            cursor: busy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            boxShadow: busy ? "none" : "0 2px 8px rgba(22,163,74,.3)",
            transition: "all 0.12s",
          }}
        >
          {busy ? (
            <><MiniSpinner /> กำลังตรวจ {results.length}/{section.testCases.length}…</>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ตรวจคำตอบ
            </>
          )}
        </button>

        {ran && (
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: allPassed ? "var(--accent)" : "var(--red)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            {allPassed ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ผ่านทุก test case ({results.length}/{results.length})
              </>
            ) : (
              `ผ่าน ${passedCount}/${results.length} test case`
            )}
          </span>
        )}
      </div>

      {/* Test results */}
      {results.length > 0 && (
        <div style={{ padding: "0.625rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {results.map((r, i) => (
            <div
              key={i}
              style={{
                borderRadius: 8,
                border: `1.5px solid ${r.passed ? "var(--accent-bd)" : "var(--red-bd)"}`,
                background: r.passed ? "var(--accent-bg)" : "var(--red-bg)",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => !r.passed && toggleExpand(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 0.75rem",
                  background: "transparent",
                  border: "none",
                  cursor: r.passed ? "default" : "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 700, color: r.passed ? "var(--accent)" : "var(--red)", flexShrink: 0 }}>
                  {r.passed ? "✓" : "✗"}
                </span>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", flex: 1 }}>
                  {r.label ?? `Test ${i + 1}`}
                </span>
                {r.elapsed !== undefined && (
                  <span style={{ fontSize: "0.65rem", color: "var(--text3)", fontFamily: "var(--mono)" }}>
                    {r.elapsed}ms
                  </span>
                )}
                {!r.passed && (
                  <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>
                    {expanded.has(i) ? "▲" : "▼"}
                  </span>
                )}
              </button>

              {!r.passed && expanded.has(i) && (
                <div
                  style={{
                    borderTop: `1px solid var(--red-bd)`,
                    padding: "0.5rem 0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                    background: "#FFFFFF",
                  }}
                >
                  {r.error ? (
                    <DiffRow label="error" value={r.error} color="var(--red)" bg="#FFF5F5" />
                  ) : (
                    <>
                      <DiffRow label="input" value={r.input} color="var(--text2)" bg="var(--surface2)" />
                      <DiffRow label="expected" value={r.expected} color="var(--accent)" bg="var(--accent-bg)" />
                      <DiffRow label="got" value={r.output || "(ไม่มี output)"} color="var(--red)" bg="var(--red-bg)" />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DiffRow({ label, value, color, bg }: { label: string; value: string; color: string; bg: string }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
      <span
        style={{
          fontSize: "0.62rem",
          fontWeight: 700,
          color: "var(--text3)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          minWidth: 52,
          paddingTop: "0.1rem",
        }}
      >
        {label}
      </span>
      <pre
        style={{
          margin: 0,
          fontFamily: "var(--mono)",
          fontSize: "0.78rem",
          color,
          background: bg,
          padding: "0.25rem 0.5rem",
          borderRadius: 5,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {value}
      </pre>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const lesson = LESSON_MAP.get(id);

  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [progressFetched, setProgressFetched] = useState(false);
  const [passedThisSession, setPassedThisSession] = useState<Set<string>>(new Set());
  const [lessonDone, setLessonDone] = useState(false);
  const completingRef = useRef(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || !lesson) return;
    getLessonProgress(user.uid, lesson.id).then((p) => {
      setProgress(p);
      if (p?.status === "completed") setLessonDone(true);
      setProgressFetched(true);
    });
  }, [user, lesson]);

  const countInteractives = useCallback((): number => {
    if (!lesson) return 0;
    return lesson.sections.filter((s) => s.type === "quiz" || s.type === "coding").length;
  }, [lesson]);

  const handleExercisePass = useCallback(
    async (exerciseId: string) => {
      if (!user || !lesson) return;
      setPassedThisSession((prev) => new Set(prev).add(exerciseId));
      await markExercisePassed(user.uid, lesson.id, exerciseId, countInteractives());
      const updated = await getLessonProgress(user.uid, lesson.id);
      setProgress(updated);
      if (updated?.status === "completed" && !completingRef.current) {
        completingRef.current = true;
        setLessonDone(true);
      }
    },
    [user, lesson, countInteractives]
  );

  if (!progressFetched || loading || !user) return null;

  if (!lesson) {
    return (
      <AppShell>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--text3)" }}>
          ไม่พบบทเรียน {id}
        </div>
      </AppShell>
    );
  }

  const completedExercises = new Set([
    ...(progress?.completedExercises ?? []),
    ...passedThisSession,
  ]);
  const totalInteractives = countInteractives();
  const completedInteractives = lesson.sections.filter(
    (s) => (s.type === "quiz" || s.type === "coding") && completedExercises.has((s as SectionQuiz | SectionCoding).id)
  ).length;
  const progressPct = totalInteractives > 0
    ? (completedInteractives / totalInteractives) * 100
    : lessonDone ? 100 : 0;

  return (
    <AppShell>
      {/* ─── Top bar / breadcrumb ─── */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "0.75rem 1.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          boxShadow: "0 1px 0 var(--border)",
        }}
      >
        <Link
          href="/learn"
          style={{
            fontSize: "0.78rem",
            color: "var(--text3)",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          เนื้อหา
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--border2)", flexShrink: 0 }}>
          <polyline points="9 18 15 12 9 6"/>
        </svg>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.7rem",
            color: "var(--text3)",
            background: "var(--surface2)",
            padding: "0.1rem 0.4rem",
            borderRadius: 4,
            border: "1px solid var(--border)",
          }}
        >
          {lesson.id}
        </span>
        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text)" }}>
          {lesson.title}
        </span>
        {lessonDone && (
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent)", background: "var(--accent-bg)", padding: "0.15rem 0.5rem", borderRadius: 4, border: "1px solid var(--accent-bd)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ✓ เสร็จแล้ว
          </span>
        )}

        <div style={{ flex: 1, minWidth: 100, display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text3)", fontFamily: "var(--mono)", flexShrink: 0 }}>
            {completedInteractives}/{totalInteractives}
          </span>
          <div style={{ width: 80, height: 5, background: "var(--border)", borderRadius: 5, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, var(--accent-dim), var(--accent))",
                borderRadius: 5,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.75rem 4rem" }}>
        <h1 style={{ margin: "0 0 0.375rem", fontSize: "1.65rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>
          {lesson.title}
        </h1>
        <p style={{ margin: "0 0 2.25rem", color: "var(--text3)", fontSize: "0.875rem" }}>
          {lesson.description} · ~{lesson.estimatedMinutes} นาที · {completedInteractives}/{totalInteractives} แบบฝึกหัดเสร็จแล้ว
        </p>

        {/* Sections */}
        {lesson.sections.map((section: Section, idx: number) => {
          if (section.type === "content") {
            return (
              <div key={idx} className="prose" style={{ marginBottom: "1.75rem" }}>
                <MarkdownRenderer content={section.markdown} />
              </div>
            );
          }
          if (section.type === "quiz") {
            return (
              <QuizSection
                key={section.id}
                section={section}
                alreadyPassed={completedExercises.has(section.id)}
                onPass={() => handleExercisePass(section.id)}
              />
            );
          }
          if (section.type === "coding") {
            return (
              <CodingSection
                key={section.id}
                section={section}
                alreadyPassed={completedExercises.has(section.id)}
                onPass={() => handleExercisePass(section.id)}
              />
            );
          }
          return null;
        })}

        {/* Congratulations */}
        {lessonDone && (
          <div
            style={{
              marginTop: "2rem",
              padding: "2rem",
              borderRadius: 16,
              background: "var(--accent-bg)",
              border: "2px solid var(--accent-bd)",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(22,163,74,.1)",
              animation: "fadeIn 0.4s ease",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem", fontWeight: 700, color: "var(--accent)" }}>
              ยินดีด้วย! เสร็จบทเรียนนี้แล้ว
            </h2>
            <p style={{ margin: "0 0 1.5rem", color: "var(--text2)", fontSize: "0.875rem" }}>
              คุณผ่านบทเรียน <strong>{lesson.title}</strong> เรียบร้อยแล้ว ลองนำความรู้ไปใช้กับโจทย์จริงกันเลย!
            </p>

            {lesson.relatedProblems.length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ margin: "0 0 0.625rem", fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>
                  โจทย์ที่เกี่ยวข้อง
                </p>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                  {lesson.relatedProblems.map((pid) => (
                    <Link
                      key={pid}
                      href={`/problems/${pid}`}
                      style={{
                        padding: "0.4rem 0.875rem",
                        fontFamily: "var(--mono)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        background: "#FFFFFF",
                        color: "var(--accent)",
                        border: "1.5px solid var(--accent-bd)",
                        borderRadius: 7,
                        textDecoration: "none",
                      }}
                    >
                      {pid}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "0.625rem", justifyContent: "center" }}>
              <Link
                href="/learn"
                style={{
                  padding: "0.55rem 1.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  background: "#FFFFFF",
                  color: "var(--text2)",
                  border: "1.5px solid var(--border)",
                  borderRadius: 9,
                  textDecoration: "none",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                ← กลับหน้าเนื้อหา
              </Link>
              <Link
                href="/problems"
                style={{
                  padding: "0.55rem 1.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  textDecoration: "none",
                  boxShadow: "0 3px 10px rgba(22,163,74,.3)",
                }}
              >
                ไปทำชาเลนจ์ →
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
