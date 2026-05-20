"use client";

import Link from "next/link";
import { Problem } from "@/data/problems";
import { ProgressRecord } from "@/lib/firestore";

const LEVEL_COLOR: Record<string, string> = {
  A1: "#22c55e",
  A2: "#eab308",
  A3: "#ef4444",
};

interface Props {
  problem: Problem;
  progress?: ProgressRecord;
}

export default function ProblemCard({ problem, progress }: Props) {
  const status = progress?.status;

  return (
    <Link href={`/problems/${problem.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--surface)",
          border: `1px solid ${status === "solved" ? "#22c55e33" : "var(--border)"}`,
          borderRadius: 10,
          padding: "0.875rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
          transition: "border-color 0.15s, background 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "var(--surface2)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            status === "solved" ? "#22c55e88" : "var(--border2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "var(--surface)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            status === "solved" ? "#22c55e33" : "var(--border)";
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
                ? "#22c55e"
                : status === "attempted"
                ? "#eab308"
                : "var(--border2)",
          }}
        />

        {/* Level badge */}
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            fontFamily: "var(--mono)",
            color: LEVEL_COLOR[problem.level],
            background: LEVEL_COLOR[problem.level] + "18",
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
