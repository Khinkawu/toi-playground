"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/lib/auth";
import { LESSON_MAP, Section, SectionQuiz, SectionCoding } from "@/data/lessons";
import {
  getLessonProgress,
  markExercisePassed,
  LessonProgress,
} from "@/lib/firestore";
import { runCode, checkAnswer, Language } from "@/lib/piston";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Navbar from "@/components/Navbar";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        background: "#0d0d0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text3)",
        fontSize: "0.82rem",
      }}
    >
      กำลังโหลด Editor…
    </div>
  ),
});

// ─── MiniSpinner ──────────────────────────────────────────────────────────────

function MiniSpinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
        border: "2px solid #0004",
        borderTop: "2px solid currentColor",
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
        border: "1px solid #3b82f633",
        borderLeft: "3px solid var(--blue)",
        borderRadius: "0 10px 10px 0",
        background: "#0a0d18",
        padding: "1.25rem 1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "var(--blue)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.625rem",
        }}
      >
        แบบทดสอบ
      </div>

      <p
        style={{
          margin: "0 0 1rem",
          fontWeight: 600,
          fontSize: "0.95rem",
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
        }}
      >
        {section.question}
      </p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
        {section.options.map((opt, i) => {
          let bg = "var(--surface2)";
          let border = "var(--border)";
          let color = "var(--text2)";

          if (submitted) {
            if (i === section.correct) {
              bg = "#0a1a0a";
              border = "#22c55e44";
              color = "#86efac";
            } else if (i === selected && !isCorrect) {
              bg = "#1a0a0a";
              border = "#ef444433";
              color = "#fca5a5";
            }
          } else if (selected === i) {
            bg = "#0d1526";
            border = "#3b82f655";
            color = "var(--text)";
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
                padding: "0.625rem 0.875rem",
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 7,
                color,
                cursor: submitted ? "default" : "pointer",
                textAlign: "left",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                transition: "all 0.12s",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: `2px solid ${selected === i || (submitted && i === section.correct) ? border : "var(--border2)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontFamily: "var(--mono)",
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 1,
                  color: submitted && i === section.correct ? "#22c55e" : submitted && i === selected ? "#ef4444" : "var(--text3)",
                }}
              >
                {submitted && i === section.correct ? "✓" : submitted && i === selected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {submitted && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 7,
            background: isCorrect ? "#0a1a0a" : "#1a0a0a",
            border: `1px solid ${isCorrect ? "#22c55e33" : "#ef444433"}`,
            marginBottom: "0.875rem",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: isCorrect ? "var(--accent)" : "var(--red)",
              marginBottom: "0.375rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {isCorrect ? "ถูกต้อง!" : "ยังไม่ถูกต้อง"}
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.6 }}>
            {section.explanation}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            style={{
              padding: "0.45rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              background: selected !== null ? "var(--blue)" : "var(--surface2)",
              color: selected !== null ? "#fff" : "var(--text3)",
              border: "none",
              borderRadius: 7,
              cursor: selected !== null ? "pointer" : "not-allowed",
            }}
          >
            ตรวจคำตอบ
          </button>
        )}
        {submitted && !isCorrect && (
          <button
            onClick={handleRetry}
            style={{
              padding: "0.45rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              background: "var(--surface2)",
              color: "var(--text2)",
              border: "1px solid var(--border)",
              borderRadius: 7,
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
      const passed =
        !r.error && !r.isCompileError && checkAnswer(tc.expectedOutput, actual);
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
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  const passedCount = results.filter((r) => r.passed).length;

  return (
    <div
      style={{
        border: "1px solid #27272a",
        borderRadius: 10,
        background: "#0c0c10",
        marginBottom: "1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.875rem 1rem",
          borderBottom: "1px solid var(--border)",
          background: "#111115",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
        }}
      >
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "#a78bfa",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          แบบฝึกหัด
        </span>
        {alreadyPassed && (
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--accent)",
              background: "#22c55e14",
              padding: "0.1rem 0.45rem",
              borderRadius: 4,
            }}
          >
            ✓ ผ่านแล้ว
          </span>
        )}
      </div>

      {/* Instruction */}
      <div
        style={{
          padding: "1rem",
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
          padding: "0.4rem 0.75rem",
          borderBottom: "1px solid var(--border)",
          background: "#0f0f14",
        }}
      >
        {(["cpp", "c", "python"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "0.2rem 0.625rem",
              fontSize: "0.78rem",
              fontFamily: "var(--mono)",
              fontWeight: 500,
              background: lang === l ? "var(--surface2)" : "none",
              color: lang === l ? "var(--text)" : "var(--text3)",
              border: lang === l ? "1px solid var(--border2)" : "1px solid transparent",
              borderRadius: 5,
              cursor: "pointer",
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
                padding: "0.2rem 0.625rem",
                fontSize: "0.75rem",
                fontWeight: 500,
                background: "none",
                color: "var(--blue)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showHints ? "ซ่อน Hints" : `Hints (${section.hints.length})`}
            </button>
          </>
        )}
      </div>

      {/* Hints */}
      {showHints && section.hints && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {section.hints.map((h, i) => (
            <div
              key={i}
              style={{
                padding: "0.5rem 0.75rem",
                borderRadius: 6,
                background: "#0d1526",
                border: "1px solid #3b82f622",
                fontSize: "0.82rem",
                color: "var(--text2)",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color: "var(--blue)",
                  fontSize: "0.72rem",
                  marginRight: "0.5rem",
                  fontFamily: "var(--mono)",
                }}
              >
                Hint {i + 1}
              </span>
              {h}
            </div>
          ))}
        </div>
      )}

      {/* Editor */}
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
          padding: "0.5rem 0.75rem",
          borderBottom: results.length > 0 ? "1px solid var(--border)" : "none",
          background: "#0f0f14",
        }}
      >
        <button
          onClick={handleRun}
          disabled={busy}
          style={{
            padding: "0.35rem 1rem",
            fontSize: "0.82rem",
            fontWeight: 700,
            background: busy ? "#1a1a1f" : "var(--accent)",
            color: busy ? "var(--text3)" : "#000",
            border: "none",
            borderRadius: 6,
            cursor: busy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? (
            <>
              <MiniSpinner /> กำลังตรวจ {results.length}/{section.testCases.length}…
            </>
          ) : (
            "▶  ตรวจคำตอบ"
          )}
        </button>

        {ran && (
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: allPassed ? "var(--accent)" : "var(--red)",
            }}
          >
            {allPassed
              ? `ผ่านทุก test case (${results.length}/${results.length}) ✓`
              : `ผ่าน ${passedCount}/${results.length} test case`}
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
                borderRadius: 6,
                border: `1px solid ${r.passed ? "#22c55e22" : "#ef444433"}`,
                background: r.passed ? "#0a130a" : "#130a0a",
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
                  padding: "0.4rem 0.625rem",
                  background: "transparent",
                  border: "none",
                  cursor: r.passed ? "default" : "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: r.passed ? "var(--accent)" : "var(--red)",
                    flexShrink: 0,
                  }}
                >
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
                    borderTop: "1px solid #ef444422",
                    padding: "0.5rem 0.625rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  {r.error ? (
                    <DiffRow label="error" value={r.error} color="#fca5a5" />
                  ) : (
                    <>
                      <DiffRow label="input" value={r.input} color="#94a3b8" />
                      <DiffRow label="expected" value={r.expected} color="#86efac" />
                      <DiffRow label="got" value={r.output || "(ไม่มี output)"} color="#fca5a5" />
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

function DiffRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
      <span
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "var(--text3)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
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
  // Set of exercise IDs completed this session (merged with Firestore data)
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
    return lesson.sections.filter(
      (s) => s.type === "quiz" || s.type === "coding"
    ).length;
  }, [lesson]);

  const handleExercisePass = useCallback(
    async (exerciseId: string) => {
      if (!user || !lesson) return;
      // Optimistic local state
      setPassedThisSession((prev) => new Set(prev).add(exerciseId));

      const totalInteractives = countInteractives();
      await markExercisePassed(user.uid, lesson.id, exerciseId, totalInteractives);

      // Re-fetch to check if lesson is now complete
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
      <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
        <Navbar />
        <div
          style={{
            padding: "4rem",
            textAlign: "center",
            color: "var(--text3)",
          }}
        >
          ไม่พบบทเรียน {id}
        </div>
      </div>
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
    : lessonDone
    ? 100
    : 0;

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
      <Navbar />

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
          href="/learn"
          style={{
            fontSize: "0.8rem",
            color: "var(--text3)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          ← เนื้อหา
        </Link>
        <span style={{ color: "var(--border2)" }}>·</span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.75rem",
            color: "var(--text3)",
          }}
        >
          {lesson.id}
        </span>
        <span
          style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text)" }}
        >
          {lesson.title}
        </span>

        {lessonDone && (
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--accent)",
              background: "#22c55e18",
              padding: "0.15rem 0.5rem",
              borderRadius: 4,
              border: "1px solid #22c55e33",
            }}
          >
            ✓ เสร็จแล้ว
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          background: "var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "var(--accent)",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        {/* Title */}
        <h1
          style={{
            margin: "0 0 0.375rem",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {lesson.title}
        </h1>
        <p
          style={{
            margin: "0 0 2rem",
            color: "var(--text3)",
            fontSize: "0.875rem",
          }}
        >
          {lesson.description} · ~{lesson.estimatedMinutes} นาที ·{" "}
          {completedInteractives}/{totalInteractives} แบบฝึกหัดเสร็จแล้ว
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

        {/* Congratulations banner */}
        {lessonDone && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              borderRadius: 12,
              background: "#0a1a0a",
              border: "1px solid #22c55e33",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              🎉
            </div>
            <h2
              style={{
                margin: "0 0 0.5rem",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              ยินดีด้วย! เสร็จบทเรียนนี้แล้ว
            </h2>
            <p
              style={{
                margin: "0 0 1.25rem",
                color: "var(--text2)",
                fontSize: "0.875rem",
              }}
            >
              คุณผ่านบทเรียน {lesson.title} เรียบร้อยแล้ว ลองนำความรู้ไปใช้กับโจทย์จริงกันเลย!
            </p>

            {/* Related problems */}
            {lesson.relatedProblems.length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <p
                  style={{
                    margin: "0 0 0.625rem",
                    fontSize: "0.78rem",
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                  }}
                >
                  โจทย์ที่เกี่ยวข้อง
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {lesson.relatedProblems.map((pid) => (
                    <Link
                      key={pid}
                      href={`/problems/${pid}`}
                      style={{
                        padding: "0.35rem 0.875rem",
                        fontFamily: "var(--mono)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        background: "var(--surface2)",
                        color: "var(--accent)",
                        border: "1px solid #22c55e33",
                        borderRadius: 6,
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
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  background: "var(--surface2)",
                  color: "var(--text2)",
                  border: "1px solid var(--border)",
                  borderRadius: 7,
                  textDecoration: "none",
                }}
              >
                ← กลับหน้าเนื้อหา
              </Link>
              <Link
                href="/problems"
                style={{
                  padding: "0.5rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  background: "var(--accent)",
                  color: "#000",
                  border: "none",
                  borderRadius: 7,
                  textDecoration: "none",
                }}
              >
                ไปทำชาเลนจ์ →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
