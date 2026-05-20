"use client";

import { useState } from "react";
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

export default function RunPanel({ problem, code, language, onSolved, onAttempted }: Props) {
  const [tab, setTab] = useState<Tab>("run");
  const [stdin, setStdin] = useState(problem.examples[0]?.input ?? "");
  const [result, setResult] = useState<RunResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [judgeResults, setJudgeResults] = useState<
    Array<{ tc: number; passed: boolean; output: string; expected: string; label?: string }>
  >([]);
  const [judged, setJudged] = useState(false);

  const handleRun = async () => {
    setBusy(true);
    setResult(null);
    const r = await runCode(language, code, stdin);
    setResult(r);
    setBusy(false);
    onAttempted?.();
  };

  const handleJudge = async () => {
    setBusy(true);
    setJudged(false);
    const tcs = [...problem.examples, ...problem.testCases];
    const results = [];
    for (let i = 0; i < tcs.length; i++) {
      const tc = tcs[i];
      const r = await runCode(language, code, tc.input);
      const actual = r.error ? "" : r.stdout;
      results.push({
        tc: i + 1,
        passed: checkAnswer(tc.expectedOutput, actual),
        output: actual,
        expected: tc.expectedOutput,
        label: tc.label,
      });
    }
    setJudgeResults(results);
    setJudged(true);
    setBusy(false);
    const allPassed = results.every((r) => r.passed);
    if (allPassed) onSolved?.();
    else onAttempted?.();
  };

  const allPassed = judged && judgeResults.every((r) => r.passed);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Tabs + Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.5rem 0.75rem",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}
      >
        {(["run", "judge"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "0.25rem 0.75rem",
              fontSize: "0.8rem",
              fontWeight: 500,
              background: tab === t ? "var(--surface2)" : "none",
              color: tab === t ? "var(--text)" : "var(--text3)",
              border: tab === t ? "1px solid var(--border2)" : "1px solid transparent",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {t === "run" ? "Run" : "Judge"}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button
          onClick={tab === "run" ? handleRun : handleJudge}
          disabled={busy}
          style={{
            padding: "0.3rem 1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            background: busy ? "var(--surface2)" : "var(--accent)",
            color: busy ? "var(--text2)" : "#000",
            border: "none",
            borderRadius: 6,
            cursor: busy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            transition: "background 0.15s",
          }}
        >
          {busy ? (
            <>
              <Spinner dark={false} />
              {tab === "run" ? "รัน…" : "ตรวจ…"}
            </>
          ) : tab === "run" ? (
            "▶ Run"
          ) : (
            "✓ Judge All"
          )}
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", padding: "0.75rem" }}>
        {tab === "run" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", height: "100%" }}>
            {/* Input */}
            <div>
              <label
                style={{ fontSize: "0.72rem", color: "var(--text3)", display: "block", marginBottom: "0.3rem" }}
              >
                Input (stdin)
              </label>
              <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                {problem.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setStdin(ex.input)}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.1rem 0.5rem",
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      color: "var(--text2)",
                      cursor: "pointer",
                    }}
                  >
                    {ex.label ?? `ตัวอย่าง ${i + 1}`}
                  </button>
                ))}
              </div>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  background: "#0a0a0f",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  color: "var(--text)",
                  fontFamily: "var(--mono)",
                  fontSize: "0.82rem",
                  padding: "0.5rem 0.75rem",
                  resize: "vertical",
                  outline: "none",
                }}
              />
            </div>

            {/* Output */}
            {result && (
              <div>
                <label
                  style={{ fontSize: "0.72rem", color: "var(--text3)", display: "block", marginBottom: "0.3rem" }}
                >
                  Output {result.code !== null && result.code !== 0 && `(exit ${result.code})`}
                </label>
                {result.error && (
                  <div
                    style={{
                      background: "#1a0505",
                      border: "1px solid #ef444444",
                      borderRadius: 6,
                      padding: "0.5rem 0.75rem",
                      color: "var(--red)",
                      fontSize: "0.82rem",
                    }}
                  >
                    {result.error}
                  </div>
                )}
                {result.stderr && (
                  <div
                    style={{
                      background: "#0f0a00",
                      border: "1px solid #eab30844",
                      borderLeft: "3px solid var(--yellow)",
                      borderRadius: "0 6px 6px 0",
                      padding: "0.5rem 0.75rem",
                      color: "#fde68a",
                      fontFamily: "var(--mono)",
                      fontSize: "0.78rem",
                      whiteSpace: "pre-wrap",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {result.stderr}
                  </div>
                )}
                {result.stdout !== undefined && (
                  <pre
                    style={{
                      background: "#040407",
                      border: "1px solid #1a2a1a",
                      borderLeft: "3px solid var(--accent)",
                      borderRadius: "0 6px 6px 0",
                      padding: "0.5rem 0.75rem",
                      color: "#86efac",
                      fontFamily: "var(--mono)",
                      fontSize: "0.82rem",
                      whiteSpace: "pre-wrap",
                      margin: 0,
                    }}
                  >
                    {result.stdout || <span style={{ color: "var(--text3)" }}>(ไม่มี output)</span>}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "judge" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {!judged && !busy && (
              <p style={{ color: "var(--text3)", fontSize: "0.82rem", textAlign: "center", marginTop: "2rem" }}>
                กด Judge All เพื่อตรวจทุก test case
              </p>
            )}

            {judged && (
              <div
                style={{
                  padding: "0.5rem 0.75rem",
                  background: allPassed ? "#0a1a0a" : "#1a0a0a",
                  border: `1px solid ${allPassed ? "#22c55e44" : "#ef444444"}`,
                  borderRadius: 6,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: allPassed ? "var(--accent)" : "var(--red)",
                  textAlign: "center",
                }}
              >
                {allPassed
                  ? `🎉 ผ่านทุก test case (${judgeResults.length}/${judgeResults.length})`
                  : `ผ่าน ${judgeResults.filter((r) => r.passed).length}/${judgeResults.length} test case`}
              </div>
            )}

            {judgeResults.map((r) => (
              <div
                key={r.tc}
                style={{
                  background: r.passed ? "#0a130a" : "#130a0a",
                  border: `1px solid ${r.passed ? "#22c55e22" : "#ef444422"}`,
                  borderRadius: 6,
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.78rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: r.passed ? 0 : "0.375rem",
                  }}
                >
                  <span style={{ color: r.passed ? "var(--accent)" : "var(--red)" }}>
                    {r.passed ? "✓" : "✗"}
                  </span>
                  <span style={{ color: "var(--text2)", fontWeight: 600 }}>
                    Test {r.tc} {r.label ? `— ${r.label}` : ""}
                  </span>
                </div>
                {!r.passed && (
                  <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
                    <div>
                      <span style={{ color: "var(--text3)" }}>คาดหวัง: </span>
                      <code style={{ fontFamily: "var(--mono)", color: "#86efac" }}>
                        {r.expected.replace(/\n/g, "↵")}
                      </code>
                    </div>
                    <div>
                      <span style={{ color: "var(--text3)" }}>ได้รับ: </span>
                      <code style={{ fontFamily: "var(--mono)", color: "#fca5a5" }}>
                        {r.output.replace(/\n/g, "↵") || "(ไม่มี output)"}
                      </code>
                    </div>
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

function Spinner({ dark }: { dark: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
        border: `2px solid ${dark ? "#444" : "#0009"}`,
        borderTop: `2px solid ${dark ? "#ccc" : "#0006"}`,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}
