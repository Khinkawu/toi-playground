"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getAllLessonProgress, LessonProgress } from "@/lib/firestore";
import { LESSONS } from "@/data/lessons";
import Navbar from "@/components/Navbar";

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

  // A lesson is unlocked if it's L01, or if the previous lesson is "completed"
  function isUnlocked(order: number): boolean {
    if (order === 1) return true;
    const prevLesson = LESSONS.find((l) => l.order === order - 1);
    if (!prevLesson) return true;
    return progressMap[prevLesson.id]?.status === "completed";
  }

  const completedCount = LESSONS.filter(
    (l) => progressMap[l.id]?.status === "completed"
  ).length;

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
      <Navbar />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1rem" }}>
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
            เนื้อหาทั้งหมด
          </h1>
          <p style={{ margin: 0, color: "var(--text3)", fontSize: "0.875rem" }}>
            เรียนรู้ C++ จากศูนย์ · เสร็จแล้ว {completedCount}/{LESSONS.length} บทเรียน
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 4,
            background: "var(--border)",
            borderRadius: 4,
            marginBottom: "1.75rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(completedCount / LESSONS.length) * 100}%`,
              background: "var(--accent)",
              borderRadius: 4,
              transition: "width 0.5s ease",
            }}
          />
        </div>

        {/* Lesson list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {LESSONS.map((lesson) => {
            const unlocked = isUnlocked(lesson.order);
            const prog = progressMap[lesson.id];
            const status = prog?.status ?? "not_started";

            const statusLabel =
              status === "completed"
                ? "เสร็จแล้ว ✓"
                : status === "in_progress"
                ? "กำลังเรียน"
                : unlocked
                ? "ยังไม่เริ่ม"
                : "ล็อก";

            const statusColor =
              status === "completed"
                ? "var(--accent)"
                : status === "in_progress"
                ? "var(--yellow)"
                : unlocked
                ? "var(--text3)"
                : "var(--text3)";

            const card = (
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: unlocked ? 1 : 0.4,
                  cursor: unlocked ? "pointer" : "not-allowed",
                  transition: "border-color 0.15s, background 0.15s",
                  ...(unlocked
                    ? {
                        ["&:hover" as string]: {
                          borderColor: "var(--border2)",
                        },
                      }
                    : {}),
                }}
              >
                {/* Order badge */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    background:
                      status === "completed"
                        ? "#22c55e18"
                        : "var(--surface2)",
                    border: `1px solid ${
                      status === "completed"
                        ? "#22c55e33"
                        : "var(--border)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--mono)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color:
                      status === "completed"
                        ? "var(--accent)"
                        : "var(--text2)",
                    flexShrink: 0,
                  }}
                >
                  {unlocked ? (status === "completed" ? "✓" : String(lesson.order).padStart(2, "0")) : "🔒"}
                </div>

                {/* Title + description */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "var(--text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {lesson.id} — {lesson.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text3)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lesson.description}
                  </div>
                </div>

                {/* Right side: status + time */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.25rem",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: statusColor,
                      background:
                        status === "completed"
                          ? "#22c55e14"
                          : status === "in_progress"
                          ? "#eab30814"
                          : "transparent",
                      padding:
                        status !== "not_started" && unlocked
                          ? "0.15rem 0.5rem"
                          : "0",
                      borderRadius: 4,
                    }}
                  >
                    {statusLabel}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                      fontFamily: "var(--mono)",
                    }}
                  >
                    ~{lesson.estimatedMinutes} นาที
                  </span>
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

        {/* Footer note */}
        <p
          style={{
            marginTop: "2rem",
            fontSize: "0.78rem",
            color: "var(--text3)",
            textAlign: "center",
          }}
        >
          บทเรียนแต่ละบทจะปลดล็อกหลังจากเรียนบทก่อนหน้าจนจบ
        </p>
      </div>
    </div>
  );
}
