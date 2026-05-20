"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/lib/auth";
import type { Section, SectionQuiz, SectionCoding, Lang } from "@/data/lessons";
import { LESSONS_CPP } from "@/data/lessons-cpp";
import { LESSONS_C } from "@/data/lessons-c";
import { LESSONS_PYTHON } from "@/data/lessons-python";
import { getLessonProgress, markExercisePassed, LessonProgress } from "@/lib/firestore";
import { runCode, checkAnswer, Language } from "@/lib/piston";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import AppShell from "@/components/AppShell";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100%", background: "#1E293B", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontSize: "0.82rem", fontFamily: "var(--mono)" }}>
      กำลังโหลด Editor…
    </div>
  ),
});

const LANG_LESSONS = { cpp: LESSONS_CPP, c: LESSONS_C, python: LESSONS_PYTHON };

const LANG_META: Record<Lang, { label: string; color: string; bg: string; bd: string }> = {
  cpp:    { label: "C++",    color: "var(--accent)", bg: "var(--accent-bg)", bd: "var(--accent-bd)" },
  c:      { label: "C",      color: "var(--blue)",   bg: "var(--blue-bg)",   bd: "var(--blue-bd)"   },
  python: { label: "Python", color: "var(--yellow)", bg: "var(--yellow-bg)", bd: "#FDE68A"           },
};

function isValidLang(s: string): s is Lang {
  return s === "cpp" || s === "c" || s === "python";
}

// ─── MiniSpinner ─────────────────────────────────────────────────────────────

function MiniSpinner() {
  return (
    <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid #E5E7EB", borderTop: "2px solid var(--accent)", borderRadius: "50%", animation: "spin 0.65s linear infinite", flexShrink: 0 }} />
  );
}

// ─── QuizSection ─────────────────────────────────────────────────────────────

function QuizSection({ section, onPass, alreadyPassed, accentColor, accentBg, accentBd }: {
  section: SectionQuiz;
  onPass: () => void;
  alreadyPassed: boolean;
  accentColor: string;
  accentBg: string;
  accentBd: string;
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

  return (
    <div style={{ border: "1.5px solid var(--blue-bd)", borderLeft: `4px solid ${accentColor}`, borderRadius: "0 12px 12px 0", background: "var(--surface)", padding: "1.375rem 1.5rem", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.65rem", fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", background: accentBg, padding: "0.2rem 0.6rem", borderRadius: 20, border: `1px solid ${accentBd}` }}>
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
          let bg = "var(--surface2)", border = "var(--border)", color = "var(--text2)";
          let weight = 400;
          if (submitted) {
            if (i === section.correct) { bg = accentBg; border = accentBd; color = accentColor; weight = 600; }
            else if (i === selected && !isCorrect) { bg = "var(--red-bg)"; border = "var(--red-bd)"; color = "var(--red)"; }
          } else if (selected === i) {
            bg = accentBg; border = accentBd; color = accentColor; weight = 500;
          }
          return (
            <button key={i} onClick={() => !submitted && setSelected(i)} disabled={submitted}
              style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.7rem 0.875rem", background: bg, border: `1.5px solid ${border}`, borderRadius: 9, color, fontWeight: weight, cursor: submitted ? "default" : "pointer", textAlign: "left", fontSize: "0.875rem", lineHeight: 1.5, transition: "all 0.12s", fontFamily: "inherit" }}
            >
              <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontFamily: "var(--mono)", fontWeight: 700, flexShrink: 0, marginTop: 1, background: submitted && i === section.correct ? accentColor : submitted && i === selected && !isCorrect ? "var(--red)" : "transparent", color: (submitted && (i === section.correct || (i === selected && !isCorrect))) ? "#fff" : color }}>
                {submitted && i === section.correct ? "✓" : submitted && i === selected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div style={{ padding: "0.75rem 1rem", borderRadius: 9, background: isCorrect ? accentBg : "var(--red-bg)", border: `1.5px solid ${isCorrect ? accentBd : "var(--red-bd)"}`, marginBottom: "0.875rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: isCorrect ? accentColor : "var(--red)", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {isCorrect ? "ถูกต้อง!" : "ยังไม่ถูกต้อง"}
          </div>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.6 }}>{section.explanation}</p>
        </div>
      )}

      {!submitted && (
        <button onClick={handleSubmit} disabled={selected === null}
          style={{ padding: "0.5rem 1.375rem", fontSize: "0.875rem", fontWeight: 700, background: selected !== null ? accentColor : "var(--surface2)", color: selected !== null ? "#fff" : "var(--text3)", border: "none", borderRadius: 8, cursor: selected !== null ? "pointer" : "not-allowed", transition: "all 0.12s", fontFamily: "inherit" }}
        >
          ตรวจคำตอบ
        </button>
      )}
      {submitted && !isCorrect && (
        <button onClick={() => { setSelected(null); setSubmitted(false); setIsCorrect(false); }}
          style={{ padding: "0.5rem 1.375rem", fontSize: "0.875rem", fontWeight: 600, background: "var(--surface2)", color: "var(--text2)", border: "1.5px solid var(--border)", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}
        >
          ลองใหม่
        </button>
      )}
    </div>
  );
}

// ─── CodingSection ─────────────────────────────────────────────────────────

interface TestResult {
  passed: boolean; output: string; expected: string; input: string;
  label?: string; error?: string; elapsed?: number;
}

function DiffRow({ label, value, color, bg }: { label: string; value: string; color: string; bg: string }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", minWidth: 52, paddingTop: "0.1rem" }}>{label}</span>
      <pre style={{ margin: 0, fontFamily: "var(--mono)", fontSize: "0.78rem", color, background: bg, padding: "0.25rem 0.5rem", borderRadius: 5, whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.5, flex: 1 }}>{value}</pre>
    </div>
  );
}

function CodingSection({ section, onPass, alreadyPassed, lang, meta }: {
  section: SectionCoding;
  onPass: () => void;
  alreadyPassed: boolean;
  lang: Lang;
  meta: typeof LANG_META[Lang];
}) {
  const langKey = lang as "cpp" | "c" | "python";
  const [code, setCode] = useState(section.starterCode[langKey] || "");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [ran, setRan] = useState(alreadyPassed);
  const [allPassed, setAllPassed] = useState(alreadyPassed);
  const [showHints, setShowHints] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const handleRun = useCallback(async () => {
    if (busy) return;
    setBusy(true); setRan(false); setResults([]); setExpanded(new Set());
    const pistonLang = lang as Language;
    const tempResults: TestResult[] = [];
    for (const tc of section.testCases) {
      const r = await runCode(pistonLang, code, tc.input);
      const actual = r.error || r.isCompileError ? "" : r.stdout;
      const passed = !r.error && !r.isCompileError && checkAnswer(tc.expectedOutput, actual);
      tempResults.push({ passed, output: actual, expected: tc.expectedOutput, input: tc.input, label: tc.label, error: r.error || (r.isCompileError ? r.stderr : undefined), elapsed: r.elapsed });
      setResults([...tempResults]);
    }
    const passed = tempResults.every((r) => r.passed);
    setAllPassed(passed); setRan(true); setBusy(false);
    if (passed) onPass();
  }, [busy, lang, code, section, onPass]);

  const passedCount = results.filter((r) => r.passed).length;
  const monacoLang = lang === "python" ? "python" : "cpp";

  return (
    <div style={{ border: "1.5px solid var(--border)", borderRadius: 12, background: "var(--surface)", marginBottom: "1.5rem", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
      {/* Header */}
      <div style={{ padding: "0.875rem 1.125rem", borderBottom: "1px solid var(--border)", background: "var(--surface2)", display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.65rem", fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.1em", background: "#F5F3FF", padding: "0.2rem 0.6rem", borderRadius: 20, border: "1px solid #DDD6FE" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          แบบฝึกหัด
        </span>
        {/* Language badge — single lang, no tab switching */}
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", fontWeight: 700, color: meta.color, background: meta.bg, padding: "0.15rem 0.55rem", borderRadius: 20, border: `1px solid ${meta.bd}` }}>
          {meta.label}
        </span>
        {alreadyPassed && (
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--accent)", background: "var(--accent-bg)", padding: "0.15rem 0.5rem", borderRadius: 4, border: "1px solid var(--accent-bd)" }}>
            ✓ ผ่านแล้ว
          </span>
        )}
        {section.hints && section.hints.length > 0 && (
          <>
            <div style={{ flex: 1 }} />
            <button onClick={() => setShowHints((h) => !h)}
              style={{ padding: "0.25rem 0.7rem", fontSize: "0.75rem", fontWeight: 600, background: showHints ? "var(--blue-bg)" : "transparent", color: "var(--blue)", border: `1.5px solid ${showHints ? "var(--blue-bd)" : "transparent"}`, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: "inherit" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Hints ({section.hints.length})
            </button>
          </>
        )}
      </div>

      {/* Instruction */}
      <div style={{ padding: "1rem 1.125rem", borderBottom: "1px solid var(--border)", fontSize: "0.875rem", color: "var(--text2)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {section.instruction}
      </div>

      {/* Hints */}
      {showHints && section.hints && (
        <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", background: "var(--blue-bg)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {section.hints.map((h, i) => (
            <div key={i} style={{ padding: "0.5rem 0.75rem", borderRadius: 8, background: "#FFFFFF", border: "1px solid var(--blue-bd)", fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: "var(--blue)", fontSize: "0.72rem", marginRight: "0.5rem", fontFamily: "var(--mono)" }}>Hint {i + 1}</span>
              {h}
            </div>
          ))}
        </div>
      )}

      {/* Editor */}
      <div style={{ height: 240, borderBottom: "1px solid var(--border)" }}>
        <MonacoEditor
          height="100%"
          language={monacoLang}
          value={code}
          theme="vs-dark"
          onChange={(v) => setCode(v ?? "")}
          options={{ fontSize: 13, fontFamily: "'JetBrains Mono', 'Cascadia Code', ui-monospace, monospace", minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 10, bottom: 10 }, lineNumbersMinChars: 3, tabSize: 4, wordWrap: "on" }}
        />
      </div>

      {/* Run bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.875rem", borderBottom: results.length > 0 ? "1px solid var(--border)" : "none", background: "var(--surface2)", flexWrap: "wrap" }}>
        <button onClick={handleRun} disabled={busy}
          style={{ padding: "0.45rem 1.125rem", fontSize: "0.82rem", fontWeight: 700, background: busy ? "var(--border)" : meta.color, color: busy ? "var(--text3)" : "#fff", border: "none", borderRadius: 7, cursor: busy ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.375rem", transition: "all 0.12s", fontFamily: "inherit" }}
        >
          {busy ? <><MiniSpinner /> กำลังตรวจ {results.length}/{section.testCases.length}…</> : <><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>ตรวจคำตอบ</>}
        </button>
        {ran && (
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: allPassed ? meta.color : "var(--red)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            {allPassed ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>ผ่านทุก test case ({results.length}/{results.length})</> : `ผ่าน ${passedCount}/${results.length} test case`}
          </span>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={{ padding: "0.625rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {results.map((r, i) => (
            <div key={i} style={{ borderRadius: 8, border: `1.5px solid ${r.passed ? meta.bd : "var(--red-bd)"}`, background: r.passed ? meta.bg : "var(--red-bg)", overflow: "hidden" }}>
              <button onClick={() => !r.passed && setExpanded((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 0.75rem", background: "transparent", border: "none", cursor: r.passed ? "default" : "pointer", textAlign: "left", fontFamily: "inherit" }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 700, color: r.passed ? meta.color : "var(--red)", flexShrink: 0 }}>{r.passed ? "✓" : "✗"}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", flex: 1 }}>{r.label ?? `Test ${i + 1}`}</span>
                {r.elapsed !== undefined && <span style={{ fontSize: "0.65rem", color: "var(--text3)", fontFamily: "var(--mono)" }}>{r.elapsed}ms</span>}
                {!r.passed && <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{expanded.has(i) ? "▲" : "▼"}</span>}
              </button>
              {!r.passed && expanded.has(i) && (
                <div style={{ borderTop: "1px solid var(--red-bd)", padding: "0.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem", background: "#FFFFFF" }}>
                  {r.error ? <DiffRow label="error" value={r.error} color="var(--red)" bg="#FFF5F5" /> : <>
                    <DiffRow label="input" value={r.input} color="var(--text2)" bg="var(--surface2)" />
                    <DiffRow label="expected" value={r.expected} color={meta.color} bg={meta.bg} />
                    <DiffRow label="got" value={r.output || "(ไม่มี output)"} color="var(--red)" bg="var(--red-bg)" />
                  </>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { lang: langParam, id } = useParams<{ lang: string; id: string }>();

  const lang = isValidLang(langParam) ? langParam : null;
  const meta = lang ? LANG_META[lang] : LANG_META.cpp;
  const lessons = lang ? LANG_LESSONS[lang] : [];
  const lesson = lessons.find((l) => l.id === id) ?? null;

  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [progressFetched, setProgressFetched] = useState(false);
  const [passedThisSession, setPassedThisSession] = useState<Set<string>>(new Set());
  const [lessonDone, setLessonDone] = useState(false);
  const completingRef = useRef(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!lang) router.replace("/learn");
  }, [lang, router]);

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

  const handleExercisePass = useCallback(async (exerciseId: string) => {
    if (!user || !lesson) return;
    setPassedThisSession((prev) => new Set(prev).add(exerciseId));
    await markExercisePassed(user.uid, lesson.id, exerciseId, countInteractives());
    const updated = await getLessonProgress(user.uid, lesson.id);
    setProgress(updated);
    if (updated?.status === "completed" && !completingRef.current) {
      completingRef.current = true;
      setLessonDone(true);
    }
  }, [user, lesson, countInteractives]);

  if (!progressFetched || loading || !user || !lang) return null;

  if (!lesson) {
    return (
      <AppShell>
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--text3)" }}>ไม่พบบทเรียน {id}</div>
      </AppShell>
    );
  }

  const completedExercises = new Set([...(progress?.completedExercises ?? []), ...passedThisSession]);
  const totalInteractives = countInteractives();
  const completedInteractives = lesson.sections.filter(
    (s) => (s.type === "quiz" || s.type === "coding") && completedExercises.has((s as SectionQuiz | SectionCoding).id)
  ).length;
  const progressPct = totalInteractives > 0 ? (completedInteractives / totalInteractives) * 100 : lessonDone ? 100 : 0;

  return (
    <AppShell>
      {/* Breadcrumb */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "0.75rem 1.75rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        <Link href="/learn" style={{ fontSize: "0.78rem", color: "var(--text3)", display: "flex", alignItems: "center", gap: "0.2rem", textDecoration: "none", fontWeight: 500 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          เนื้อหา
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--border2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        <Link href={`/learn/${lang}`} style={{ fontSize: "0.78rem", color: meta.color, fontFamily: "var(--mono)", fontWeight: 700, textDecoration: "none" }}>
          {meta.label}
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--border2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--text3)", background: "var(--surface2)", padding: "0.1rem 0.4rem", borderRadius: 4, border: "1px solid var(--border)" }}>{lesson.id}</span>
        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text)" }}>{lesson.title}</span>
        {lessonDone && (
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: meta.color, background: meta.bg, padding: "0.15rem 0.5rem", borderRadius: 4, border: `1px solid ${meta.bd}`, textTransform: "uppercase", letterSpacing: "0.05em" }}>✓ เสร็จแล้ว</span>
        )}
        <div style={{ flex: 1, minWidth: 100, display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text3)", fontFamily: "var(--mono)", flexShrink: 0 }}>{completedInteractives}/{totalInteractives}</span>
          <div style={{ width: 80, height: 5, background: "var(--border)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: `linear-gradient(90deg, ${meta.color}99, ${meta.color})`, borderRadius: 5, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2rem 1.75rem 4rem" }}>
        <h1 style={{ margin: "0 0 0.375rem", fontSize: "1.65rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)" }}>{lesson.title}</h1>
        <p style={{ margin: "0 0 2.25rem", color: "var(--text3)", fontSize: "0.875rem" }}>
          {lesson.description} · ~{lesson.estimatedMinutes} นาที · {completedInteractives}/{totalInteractives} แบบฝึกหัดเสร็จแล้ว
        </p>

        {lesson.sections.map((section: Section, idx: number) => {
          if (section.type === "content") {
            return <div key={idx} className="prose" style={{ marginBottom: "1.75rem" }}><MarkdownRenderer content={section.markdown} /></div>;
          }
          if (section.type === "quiz") {
            return <QuizSection key={section.id} section={section} alreadyPassed={completedExercises.has(section.id)} onPass={() => handleExercisePass(section.id)} accentColor={meta.color} accentBg={meta.bg} accentBd={meta.bd} />;
          }
          if (section.type === "coding") {
            return <CodingSection key={section.id} section={section} alreadyPassed={completedExercises.has(section.id)} onPass={() => handleExercisePass(section.id)} lang={lang} meta={meta} />;
          }
          return null;
        })}

        {lessonDone && (
          <div style={{ marginTop: "2rem", padding: "2rem", borderRadius: 16, background: meta.bg, border: `2px solid ${meta.bd}`, textAlign: "center", boxShadow: `0 4px 20px ${meta.color}22`, animation: "fadeIn 0.4s ease" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem", fontWeight: 700, color: meta.color }}>ยินดีด้วย! เสร็จบทเรียนนี้แล้ว</h2>
            <p style={{ margin: "0 0 1.5rem", color: "var(--text2)", fontSize: "0.875rem" }}>
              คุณผ่านบทเรียน <strong>{lesson.title}</strong> เรียบร้อยแล้ว
            </p>

            {/* Next lesson */}
            {(() => {
              const nextLesson = lessons.find((l) => l.order === lesson.order + 1);
              return nextLesson ? (
                <Link
                  href={`/learn/${lang}/${nextLesson.id}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.5rem", background: meta.color, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", boxShadow: `0 2px 12px ${meta.color}44` }}
                >
                  บทเรียนต่อไป: {nextLesson.title}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              ) : (
                <Link
                  href={`/learn/${lang}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.5rem", background: meta.color, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
                >
                  ดูบทเรียนทั้งหมด
                </Link>
              );
            })()}

            {lesson.relatedProblems.length > 0 && (
              <div style={{ marginTop: "1.25rem" }}>
                <p style={{ margin: "0 0 0.625rem", fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>โจทย์ที่เกี่ยวข้อง</p>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                  {lesson.relatedProblems.map((pid) => (
                    <Link key={pid} href={`/problems/${pid}`}
                      style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 700, color: meta.color, background: "#fff", border: `1.5px solid ${meta.bd}`, padding: "0.375rem 0.75rem", borderRadius: 8, textDecoration: "none" }}
                    >
                      {pid}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
