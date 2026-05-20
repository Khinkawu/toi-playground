"use client";

import { useState, useEffect, useCallback } from "react";
import { Language, runCode, checkAnswer, RunResult } from "@/lib/piston";
import { Problem } from "@/data/problems";

interface Props {
  problem: Problem;
  code: string;
  language: Language;
  onSolved?: () => void;
  onAttempted?: () => void;
}

type Tab = "run" | "judge";

interface JudgeItem {
  tc: number;
  label?: string;
  input: string;
  expected: string;
  passed: boolean;
  output: string;
  error?: string;
  elapsed?: number;
}

export default function RunPanel({ problem, code, language, onSolved, onAttempted }: Props) {
  const [tab, setTab] = useState<Tab>("run");
  const [stdin, setStdin] = useState(problem.examples[0]?.input ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [busy, setBusy] = useState(false);

  // Judge state
  const [judgeItems, setJudgeItems] = useState<JudgeItem[]>([]);
  const [judgeProgress, setJudgeProgress] = useState(0);
  const [judgeTotal, setJudgeTotal] = useState(0);
  const [judged, setJudged] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const handleRun = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setResult(null);
    const r = await runCode(language, code, stdin);
    setResult(r);
    setBusy(false);
    onAttempted?.();
  }, [busy, language, code, stdin, onAttempted]);

  const handleJudge = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    setJudged(false);
    setJudgeItems([]);
    setExpanded(new Set());
    const tcs = [...problem.examples, ...problem.testCases];
    setJudgeTotal(tcs.length);
    setJudgeProgress(0);
    const results: JudgeItem[] = [];
    for (let i = 0; i < tcs.length; i++) {
      setJudgeProgress(i + 1);
      const tc = tcs[i];
      const r = await runCode(language, code, tc.input);
      const actual = r.error || r.isCompileError ? "" : r.stdout;
      const passed = !r.error && !r.isCompileError && checkAnswer(tc.expectedOutput, actual);
      results.push({
        tc: i + 1,
        label: tc.label,
        input: tc.input,
        expected: tc.expectedOutput,
        passed,
        output: actual,
        error: r.error || (r.isCompileError ? r.stderr : r.code !== 0 && r.code !== null ? `exit ${r.code}${r.stderr ? "\n" + r.stderr : ""}` : undefined),
        elapsed: r.elapsed,
      });
      setJudgeItems([...results]);
    }
    setJudged(true);
    setBusy(false);
    const allPassed = results.every((r) => r.passed);
    if (allPassed) onSolved?.();
    else onAttempted?.();
  }, [busy, problem, language, code, onSolved, onAttempted]);

  // Ctrl+Enter / Cmd+Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (tab === "run") handleRun();
        else handleJudge();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tab, handleRun, handleJudge]);

  const toggleExpand = (tc: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(tc)) {
        next.delete(tc);
      } else {
        next.add(tc);
      }
      return next;
    });
  };

  const passedCount = judgeItems.filter((r) => r.passed).length;
  const allPassed = judged && passedCount === judgeItems.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>

      {/* Tab bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.75rem", borderBottom: "1px solid var(--border)", flexShrink: 0, background: "var(--surface2)" }}>
        {(["run", "judge"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "0.2rem 0.65rem", fontSize: "0.78rem", fontWeight: 600,
            background: tab === t ? "var(--surface)" : "transparent",
            color: tab === t ? "var(--text)" : "var(--text3)",
            border: tab === t ? "1px solid var(--border)" : "1px solid transparent",
            borderRadius: 6, cursor: "pointer",
            boxShadow: tab === t ? "var(--shadow-sm)" : "none",
          }}>
            {t === "run" ? "▶  Run" : "✓  Judge"}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: "0.68rem", color: "var(--text3)", fontFamily: "var(--mono)", marginRight: "0.5rem" }}>
          ⌘↵
        </span>
        <button
          onClick={tab === "run" ? handleRun : handleJudge}
          disabled={busy}
          style={{
            padding: "0.3rem 0.875rem", fontSize: "0.8rem", fontWeight: 700,
            background: busy ? "var(--surface2)" : tab === "run" ? "var(--accent)" : "var(--blue)",
            color: busy ? "var(--text3)" : "#fff",
            border: busy ? "1px solid var(--border)" : "1px solid transparent",
            borderRadius: 6, cursor: busy ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", gap: "0.375rem",
            transition: "background 0.1s",
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? <><MiniSpinner /> {tab === "run" ? "รัน…" : `${judgeProgress}/${judgeTotal}`}</> : tab === "run" ? "Run" : "Judge All"}
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>

        {/* ── RUN TAB ── */}
        {tab === "run" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Input section */}
            <div style={{ padding: "0.625rem 0.75rem 0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>stdin</span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {problem.examples.map((ex, i) => (
                    <button key={i} onClick={() => setStdin(ex.input)} style={{
                      fontSize: "0.65rem", padding: "0.1rem 0.45rem",
                      background: stdin === ex.input ? "var(--accent-bg)" : "var(--surface2)",
                      border: `1px solid ${stdin === ex.input ? "var(--accent-bd)" : "var(--border)"}`,
                      borderRadius: 3, color: stdin === ex.input ? "var(--accent)" : "var(--text3)", cursor: "pointer",
                    }}>
                      {ex.label ?? `ตย.${i + 1}`}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={3}
                spellCheck={false}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 8, color: "var(--text)", fontFamily: "var(--mono)",
                  fontSize: "0.82rem", padding: "0.4rem 0.625rem",
                  resize: "vertical", outline: "none", lineHeight: 1.5,
                  boxShadow: "var(--shadow-sm)",
                }}
              />
            </div>

            {/* Output section */}
            <div style={{ flex: 1, padding: "0.5rem 0.75rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>output</span>
                {result && (
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--mono)", color: result.isCompileError ? "var(--red)" : result.code !== 0 && result.code !== null ? "var(--yellow)" : "var(--text3)" }}>
                    {result.isCompileError ? "● compile error" : result.signal ? `● ${result.signal}` : result.code !== null && result.code !== 0 ? `● exit ${result.code}` : result.elapsed ? `${result.elapsed}ms` : ""}
                  </span>
                )}
              </div>

              {!result && !busy && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text3)", fontSize: "0.8rem", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)", minHeight: 80 }}>
                  กด Run เพื่อดู output
                </div>
              )}

              {busy && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--text3)", fontSize: "0.8rem", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)", minHeight: 80 }}>
                  <MiniSpinner /> กำลังรัน…
                </div>
              )}

              {result && !busy && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.375rem", minHeight: 0 }}>
                  {result.error && (
                    <TermBlock color="red" label="⚠ Network Error" content={result.error} />
                  )}
                  {result.isCompileError && result.stderr && (
                    <TermBlock color="red" label="⚑ Compile Error" content={result.stderr} />
                  )}
                  {!result.isCompileError && result.stderr && (
                    <TermBlock color="yellow" label="⚠ stderr" content={result.stderr} />
                  )}
                  {!result.isCompileError && !result.error && (
                    <TermBlock
                      color={result.code !== 0 && result.code !== null ? "orange" : "green"}
                      label="stdout"
                      content={result.stdout}
                      empty="(ไม่มี output)"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── JUDGE TAB ── */}
        {tab === "judge" && (
          <div style={{ flex: 1, padding: "0.625rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>

            {!judged && !busy && (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text3)", fontSize: "0.82rem" }}>
                กด Judge All เพื่อตรวจทุก test case
              </div>
            )}

            {/* Progress bar while running */}
            {busy && judgeTotal > 0 && (
              <div style={{ marginBottom: "0.375rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text2)" }}>กำลังตรวจ test case {judgeProgress}/{judgeTotal}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)" }}>{judgeItems.filter(r => r.passed).length} ✓</span>
                </div>
                <div style={{ height: 3, background: "var(--border)", borderRadius: 9 }}>
                  <div style={{ height: "100%", background: "var(--accent)", borderRadius: 9, width: `${(judgeProgress / judgeTotal) * 100}%`, transition: "width 0.2s" }} />
                </div>
              </div>
            )}

            {/* Summary banner */}
            {judged && (
              <div style={{
                padding: "0.5rem 0.75rem", borderRadius: 6, fontSize: "0.82rem", fontWeight: 700, textAlign: "center",
                background: allPassed ? "var(--accent-bg)" : "var(--red-bg)",
                border: `1px solid ${allPassed ? "var(--accent-bd)" : "var(--red-bd)"}`,
                color: allPassed ? "var(--accent)" : "var(--red)",
              }}>
                {allPassed ? `🎉 ผ่านทุก test case (${judgeItems.length}/${judgeItems.length})` : `ผ่าน ${passedCount}/${judgeItems.length} test case`}
              </div>
            )}

            {/* Test case list */}
            {judgeItems.map((r) => (
              <div key={r.tc} style={{ borderRadius: 8, border: `1px solid ${r.passed ? "var(--accent-bd)" : "var(--red-bd)"}`, background: r.passed ? "var(--accent-bg)" : "var(--red-bg)", overflow: "hidden" }}>
                <button
                  onClick={() => !r.passed && toggleExpand(r.tc)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.45rem 0.625rem", background: "transparent",
                    border: "none", cursor: r.passed ? "default" : "pointer", textAlign: "left",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 700, color: r.passed ? "var(--accent)" : "var(--red)", flexShrink: 0 }}>
                    {r.passed ? "✓" : "✗"}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)", flex: 1 }}>
                    Test {r.tc}{r.label ? ` — ${r.label}` : ""}
                  </span>
                  {r.elapsed && <span style={{ fontSize: "0.65rem", color: "var(--text3)", fontFamily: "var(--mono)" }}>{r.elapsed}ms</span>}
                  {!r.passed && (
                    <span style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{expanded.has(r.tc) ? "▲" : "▼"}</span>
                  )}
                </button>

                {!r.passed && expanded.has(r.tc) && (
                  <div style={{ borderTop: "1px solid var(--red-bd)", padding: "0.5rem 0.625rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {r.error ? (
                      <TermBlock color="red" label="error" content={r.error} compact />
                    ) : (
                      <>
                        <DiffRow label="input" value={r.input} color="var(--text2)" />
                        <DiffRow label="expected" value={r.expected} color="var(--accent)" />
                        <DiffRow label="got" value={r.output || "(ไม่มี output)"} color="var(--red)" />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helpers ──

function TermBlock({ color, label, content, empty, compact }: {
  color: "red" | "yellow" | "green" | "orange";
  label: string;
  content: string;
  empty?: string;
  compact?: boolean;
}) {
  const colors = {
    red:    { bg: "var(--red-bg)", border: "var(--red-bd)", left: "var(--red)", text: "var(--red)" },
    yellow: { bg: "var(--yellow-bg)", border: "#FDE68A", left: "var(--yellow)", text: "var(--yellow)" },
    green:  { bg: "var(--accent-bg)", border: "var(--accent-bd)", left: "var(--accent)", text: "var(--accent-dim)" },
    orange: { bg: "var(--yellow-bg)", border: "#FED7AA", left: "#F97316", text: "#C2410C" },
  };
  const c = colors[color];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.left}`, borderRadius: "0 5px 5px 0" }}>
      <div style={{ padding: "0.2rem 0.5rem", borderBottom: content ? `1px solid ${c.border}` : "none" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: c.left, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
      </div>
      {content && (
        <pre style={{
          margin: 0, padding: compact ? "0.35rem 0.5rem" : "0.5rem 0.625rem",
          fontFamily: "var(--mono)", fontSize: "0.8rem", color: c.text,
          whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6,
        }}>
          {content}
        </pre>
      )}
      {!content && empty && (
        <div style={{ padding: "0.4rem 0.625rem", fontSize: "0.78rem", color: "var(--text3)", fontStyle: "italic" }}>{empty}</div>
      )}
    </div>
  );
}

function DiffRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.04em", minWidth: 52, paddingTop: "0.1rem" }}>{label}</span>
      <pre style={{ margin: 0, fontFamily: "var(--mono)", fontSize: "0.78rem", color, whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.5, flex: 1 }}>
        {value}
      </pre>
    </div>
  );
}

function MiniSpinner() {
  return (
    <span style={{
      display: "inline-block", width: 11, height: 11,
      border: "2px solid var(--border2)", borderTop: "2px solid currentColor",
      borderRadius: "50%", animation: "spin 0.65s linear infinite", flexShrink: 0,
    }} />
  );
}
