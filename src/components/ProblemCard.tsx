"use client";

import Link from "next/link";
import { Problem } from "@/data/problems";
import { ProgressRecord } from "@/lib/firestore";

const LEVEL_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  A1: { color: "var(--accent)", bg: "var(--accent-bg)", border: "var(--accent-bd)" },
  A2: { color: "var(--yellow)", bg: "var(--yellow-bg)", border: "#FDE68A" },
  A3: { color: "var(--red)", bg: "var(--red-bg)", border: "var(--red-bd)" },
};

interface Props {
  problem: Problem;
  progress?: ProgressRecord;
}

export default function ProblemCard({ problem, progress }: Props) {
  const status = progress?.status;
  const levelStyle = LEVEL_STYLE[problem.level];

  return (
    <Link href={`/problems/${problem.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--surface)",
          border: `1px solid ${status === "solved" ? "var(--accent-bd)" : "var(--border)"}`,
          borderRadius: 12,
          padding: "0.875rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
          transition: "border-color 0.15s, background 0.15s, box-shadow 0.15s, transform 0.1s",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "var(--surface2)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            status === "solved" ? "var(--accent-bd)" : "var(--border2)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "var(--surface)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            status === "solved" ? "var(--accent-bd)" : "var(--border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)";
        }}
      >
        {/* Status dot */}
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            flexShrink: 0,
            background:
              status === "solved"
                ? "var(--accent)"
                : status === "attempted"
                ? "var(--yellow)"
                : "var(--border2)",
          }}
        />

        {/* Level badge */}
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            fontFamily: "var(--mono)",
            color: levelStyle.color,
            background: levelStyle.bg,
            border: `1px solid ${levelStyle.border}`,
            padding: "0.15rem 0.45rem",
            borderRadius: 4,
            flexShrink: 0,
          }}
        >
          {problem.level}
        </span>

        {/* ID */}
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.8rem",
            color: "var(--text3)",
            flexShrink: 0,
            minWidth: 52,
          }}
        >
          {problem.id}
        </span>

        {/* Title */}
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--text)",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {problem.title}
        </span>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
          {(problem.tags ?? []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem",
                color: "var(--text3)",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                padding: "0.1rem 0.4rem",
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
