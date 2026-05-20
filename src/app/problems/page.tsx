"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { getAllProgress, ProgressRecord } from "@/lib/firestore";
import { PROBLEMS, LEVELS, Level, getProblemsByLevel } from "@/data/problems";
import ProblemCard from "@/components/ProblemCard";
import AppShell from "@/components/AppShell";

export default function ProblemsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<Record<string, ProgressRecord>>({});
  const [filter, setFilter] = useState<Level | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    getAllProgress(user.uid).then(setProgress);
  }, [user]);

  const filtered = useMemo(() => {
    let list = filter === "all" ? PROBLEMS : getProblemsByLevel(filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.includes(q))
      );
    }
    return list;
  }, [filter, search]);

  const counts = useMemo(() => {
    const solved = Object.values(progress).filter((p) => p.status === "solved").length;
    const attempted = Object.values(progress).filter((p) => p.status === "attempted").length;
    return { solved, attempted, total: PROBLEMS.length };
  }, [progress]);

  if (loading || !user) return null;

  return (
    <AppShell>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 1rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              margin: "0 0 0.25rem",
              fontSize: "1.35rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            โจทย์ทั้งหมด
          </h1>
          <p style={{ margin: 0, color: "var(--text3)", fontSize: "0.875rem" }}>
            ผ่านแล้ว {counts.solved} ข้อ · กำลังทำ {counts.attempted} ข้อ · ทั้งหมด {counts.total} ข้อ
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 4,
            background: "var(--border)",
            borderRadius: 4,
            marginBottom: "1.5rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(counts.solved / counts.total) * 100}%`,
              background: "var(--accent)",
              borderRadius: 4,
              transition: "width 0.5s ease",
            }}
          />
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          {(["all", ...LEVELS] as const).map((l) => {
            const count =
              l === "all"
                ? PROBLEMS.length
                : getProblemsByLevel(l).length;
            const solvedCount =
              l === "all"
                ? counts.solved
                : getProblemsByLevel(l).filter((p) => progress[p.id]?.status === "solved").length;

            return (
              <button
                key={l}
                onClick={() => setFilter(l)}
                style={{
                  padding: "0.3rem 0.875rem",
                  fontSize: "0.82rem",
                  fontWeight: filter === l ? 700 : 500,
                  background: filter === l ? "var(--accent)" : "var(--surface)",
                  color: filter === l ? "#fff" : "var(--text2)",
                  border: `1px solid ${filter === l ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: filter === l ? "var(--shadow-sm)" : "none",
                }}
              >
                {l === "all" ? "ทั้งหมด" : l}{" "}
                <span
                  style={{
                    opacity: 0.7,
                    fontSize: "0.75rem",
                    fontFamily: "var(--mono)",
                  }}
                >
                  {solvedCount}/{count}
                </span>
              </button>
            );
          })}

          <div style={{ flex: 1 }} />

          <input
            type="text"
            placeholder="ค้นหา…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text)",
              fontSize: "0.82rem",
              padding: "0.3rem 0.75rem",
              outline: "none",
              width: 160,
              boxShadow: "var(--shadow-sm)",
            }}
          />
        </div>

        {/* Problem list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--text3)",
                fontSize: "0.875rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              ไม่พบโจทย์ที่ตรงกับการค้นหา
            </div>
          ) : (
            filtered.map((p) => (
              <ProblemCard key={p.id} problem={p} progress={progress[p.id]} />
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
