export type Language = "cpp" | "c" | "python";

const JUDGE0_URL = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

// Judge0 CE language IDs
const LANG_ID: Record<Language, number> = {
  cpp:    105, // C++ (GCC 14.1.0)
  c:      103, // C (GCC 14.1.0)
  python: 100, // Python (3.12.5)
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

// Judge0 status IDs that indicate compile error
const COMPILE_ERROR_STATUS = 6;
// Status IDs for runtime errors
const RUNTIME_ERROR_STATUSES = new Set([7, 8, 9, 10, 11, 12]);

export async function runCode(
  language: Language,
  code: string,
  stdin = ""
): Promise<RunResult> {
  const t0 = Date.now();
  try {
    const res = await fetch(JUDGE0_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: LANG_ID[language],
        source_code: code,
        stdin,
        cpu_time_limit: 5,
        wall_time_limit: 10,
        memory_limit: 128000,
      }),
    });

    if (!res.ok) {
      return { stdout: "", stderr: `HTTP ${res.status}`, code: null, signal: null, elapsed: Date.now() - t0 };
    }

    const data = await res.json();
    const statusId: number = data.status?.id ?? 0;
    const elapsed = data.time ? Math.round(parseFloat(data.time) * 1000) : Date.now() - t0;

    if (statusId === COMPILE_ERROR_STATUS) {
      return {
        stdout: "",
        stderr: data.compile_output || data.stderr || "Compile error",
        code: 1,
        signal: null,
        isCompileError: true,
        elapsed,
      };
    }

    if (RUNTIME_ERROR_STATUSES.has(statusId)) {
      return {
        stdout: data.stdout ?? "",
        stderr: data.stderr ?? data.message ?? `Runtime Error (${data.status?.description ?? statusId})`,
        code: data.exit_code ?? 1,
        signal: null,
        elapsed,
      };
    }

    // TLE
    if (statusId === 5) {
      return {
        stdout: data.stdout ?? "",
        stderr: "Time Limit Exceeded",
        code: null,
        signal: "TLE",
        elapsed,
      };
    }

    return {
      stdout: data.stdout ?? "",
      stderr: data.stderr ?? "",
      code: data.exit_code ?? 0,
      signal: null,
      elapsed,
    };
  } catch (e) {
    return {
      stdout: "",
      stderr: "",
      code: null,
      signal: null,
      error: "ไม่สามารถเชื่อมต่อ Judge0 API ได้",
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
