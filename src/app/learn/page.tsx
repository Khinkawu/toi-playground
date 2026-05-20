"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getAllLessonProgress, LessonProgress } from "@/lib/firestore";
import { LESSONS } from "@/data/lessons";
import AppShell from "@/components/AppShell";

export default function LearnPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    getAllLessonProgress(user.uid).then(setProgressMap);
  }, [user]);

  if (loading || !user) return null;

  function isUnlocked(order: number): boolean {
    if (order === 1) return true;
    const prev = LESSONS.find((l) => l.order === order - 1);
    if (!prev) return true;
    return progressMap[prev.id]?.status === "completed";
  }

  const completedCount = LESSONS.filter((l) => progressMap[l.id]?.status === "completed").length;
  const progressPct = Math.round((completedCount / LESSONS.length) * 100);

  return (
    <AppShell>
      <div style={{ padding: "1.75rem 2rem 3rem", maxWidth: 780, margin: "0 auto" }}>

        {/* ─── Page header ─── */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              padding: "0.25rem 0.625rem",
              background: "#22c55e12",
              border: "1px solid #22c55e28",
              borderRadius: 20,
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              C · C++ · Python
            </span>
          </div>
          <h1
            style={{
              margin: "0 0 0.375rem",
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            บทเรียนทั้งหมด
          </h1>
          <p style={{ margin: 0, color: "var(--text3)", fontSize: "0.875rem" }}>
            เรียนรู้การเขียนโปรแกรมจากศูนย์ · เสร็จแล้ว {completedCount}/{LESSONS.length} บทเรียน
          </p>
        </div>

        {/* ─── Progress card ─── */}
        <div
          style={{
            background: "#111115",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "1.25rem 1.5rem",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* Radial progress ring */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="30" fill="none" stroke="var(--border)" strokeWidth="6" />
              <circle
                cx="36"
                cy="36"
                r="30"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 30}`}
                strokeDashoffset={`${2 * Math.PI * 30 * (1 - progressPct / 100)}`}
                transform="rotate(-90 36 36)"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1rem", color: "var(--text)", lineHeight: 1 }}>
                {progressPct}%
              </span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontWeight: 600, fontSize: "0.975rem", color: "var(--text)", marginBottom: "0.25rem" }}>
              ความคืบหน้าการเรียน
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text3)", marginBottom: "0.75rem" }}>
              เสร็จแล้ว {completedCount} จาก {LESSONS.length} บทเรียน
            </div>
            <div style={{ height: 6, background: "var(--border)", borderRadius: 6, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: "linear-gradient(90deg, #16a34a, #22c55e)",
                  borderRadius: 6,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
            {[
              { value: completedCount, label: "เสร็จแล้ว", color: "var(--accent)" },
              { value: LESSONS.length - completedCount, label: "เหลืออยู่", color: "var(--text3)" },
            ].map(({ value, label, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1.5rem", color, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text3)", marginTop: "0.25rem", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Lesson list ─── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {LESSONS.map((lesson) => {
            const unlocked = isUnlocked(lesson.order);
            const prog = progressMap[lesson.id];
            const status = prog?.status ?? "not_started";
            const done = status === "completed";
            const inProgress = status === "in_progress";

            const card = (
              <div
                style={{
                  background: "#111115",
                  border: `1px solid ${done ? "#22c55e28" : "var(--border)"}`,
                  borderRadius: 11,
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: unlocked ? 1 : 0.45,
                  transition: "border-color 0.15s, transform 0.1s",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Done left accent */}
                {done && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: "var(--accent)",
                      borderRadius: "11px 0 0 11px",
                    }}
                  />
                )}

                {/* Lesson number / status badge */}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: done ? "#22c55e18" : inProgress ? "#eab30812" : "var(--surface2)",
                    border: `1px solid ${done ? "#22c55e33" : inProgress ? "#eab30830" : "var(--border)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--mono)",
                    fontWeight: 700,
                    fontSize: done ? "1rem" : "0.85rem",
                    color: done ? "var(--accent)" : inProgress ? "var(--yellow)" : "var(--text2)",
                  }}
                >
                  {!unlocked ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ) : done ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    String(lesson.order).padStart(2, "0")
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.2rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.68rem",
                        color: "var(--text3)",
                        fontWeight: 600,
                      }}
                    >
                      {lesson.id}
                    </span>
                    {inProgress && (
                      <span
                        style={{
                          fontSize: "0.63rem",
                          fontWeight: 700,
                          color: "var(--yellow)",
                          background: "#eab30814",
                          padding: "0.1rem 0.4rem",
                          borderRadius: 4,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        กำลังเรียน
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.925rem",
                      color: "var(--text)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {lesson.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text3)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lesson.description}
                  </div>
                </div>

                {/* Right meta */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.375rem",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: "var(--mono)",
                      color: "var(--text3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {lesson.estimatedMinutes} นาที
                  </span>

                  {unlocked && !done && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "var(--text3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      เริ่มเลย
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            );

            return unlocked ? (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.id}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                {card}
              </Link>
            ) : (
              <div key={lesson.id}>{card}</div>
            );
          })}
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "var(--text3)",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          แต่ละบทเรียนจะปลดล็อกหลังจากผ่านบทก่อนหน้า
        </p>
      </div>
    </AppShell>
  );
}
