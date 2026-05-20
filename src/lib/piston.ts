export type Language = "cpp" | "c" | "python";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const LANG_MAP: Record<Language, { language: string; version: string }> = {
  cpp: { language: "c++", version: "10.2.0" },
  c: { language: "c", version: "10.2.0" },
  python: { language: "python", version: "3.10.0" },
};

export interface RunResult {
  stdout: string;
  stderr: string;
  code: number | null;
  signal: string | null;
  error?: string;
  isCompileError?: boolean;
  elapsed?: number;
}

export async function runCode(
  language: Language,
  code: string,
  stdin = ""
): Promise<RunResult> {
  const { language: lang, version } = LANG_MAP[language];
  const ext = language === "python" ? "py" : language === "cpp" ? "cpp" : "c";

  const t0 = Date.now();
  try {
    const res = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: lang,
        version,
        files: [{ name: `main.${ext}`, content: code }],
        stdin,
        run_timeout: 5000,
        compile_timeout: 10000,
      }),
    });

    if (!res.ok) {
      return { stdout: "", stderr: `HTTP ${res.status}`, code: null, signal: null };
    }

    const data = await res.json();
    const run = data.run ?? {};
    const compile = data.compile;

    if (compile && compile.code !== 0) {
      return {
        stdout: "",
        stderr: compile.stderr || compile.output || "Compile error",
        code: compile.code,
        signal: null,
        isCompileError: true,
        elapsed: Date.now() - t0,
      };
    }

    return {
      stdout: run.stdout ?? "",
      stderr: run.stderr ?? "",
      code: run.code ?? null,
      signal: run.signal ?? null,
      elapsed: Date.now() - t0,
    };
  } catch (e) {
    return {
      stdout: "",
      stderr: "",
      code: null,
      signal: null,
      error: "ไม่สามารถเชื่อมต่อ Piston API ได้",
      elapsed: Date.now() - t0,
    };
  }
}

export function normalize(s: string) {
  return s.replace(/\r\n/g, "\n").trim();
}

export function checkAnswer(expected: string, actual: string): boolean {
  return normalize(expected) === normalize(actual);
}
