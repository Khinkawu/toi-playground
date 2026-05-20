"use client";

import dynamic from "next/dynamic";
import { Language } from "@/lib/piston";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        background: "var(--surface)",
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

const DEFAULT_CODE: Record<Language, string> = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // เขียนโค้ดที่นี่
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    // เขียนโค้ดที่นี่
    return 0;
}`,
  python: `# เขียนโค้ดที่นี่
`,
};

interface Props {
  language: Language;
  value: string;
  onChange: (val: string) => void;
}

export default function Editor({ language, value, onChange }: Props) {
  const monacoLang = language === "cpp" ? "cpp" : language;

  return (
    <MonacoEditor
      height="100%"
      language={monacoLang}
      value={value || DEFAULT_CODE[language]}
      theme="vs"
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Cascadia Code', ui-monospace, monospace",
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 12, bottom: 12 },
        lineNumbersMinChars: 3,
        tabSize: 4,
        insertSpaces: true,
        wordWrap: "on",
        renderWhitespace: "selection",
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        bracketPairColorization: { enabled: true },
      }}
    />
  );
}

export { DEFAULT_CODE };
