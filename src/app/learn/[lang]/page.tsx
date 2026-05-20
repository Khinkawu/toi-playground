"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getAllLessonProgress, LessonProgress } from "@/lib/firestore";
import type { Lesson, Lang } from "@/data/lessons";
import { LESSONS_CPP } from "@/data/lessons-cpp";
import { LESSONS_C } from "@/data/lessons-c";
import { LESSONS_PYTHON } from "@/data/lessons-python";
import AppShell from "@/components/AppShell";

const LANG_LESSONS: Record<Lang, Lesson[]> = {
  cpp: LESSONS_CPP,
  c: LESSONS_C,
  python: LESSONS_PYTHON,
};

const LANG_META: Record<Lang, { label: string; color: string; bg: string; bd: string; desc: string }> = {
  cpp: { label: "C++", color: "var(--accent)", bg: "var(--accent-bg)", bd: "var(--accent-bd)", desc: "competitive programming · สอวน." },
  c:   { label: "C",   color: "var(--blue)",   bg: "var(--blue-bg)",   bd: "var(--blue-bd)",   desc: "รากฐานทุกภาษา · ควบคุม memory" },
  python: { label: "Python", color: "var(--yellow)", bg: "var(--yellow-bg)", bd: "#FDE68A", desc: "เขียนง่าย · data science" },
};

function isValidLang(s: string): s is Lang {
  return s === "cpp" || s === "c" || s === "python";
}

export default function LangLearnPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const lang = params.lang;

  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!isValidLang(lang)) router.replace("/learn");
  }, [lang, router]);

  useEffect(() => {
    if (!user) return;
    getAllLessonProgress(user.uid).then(setProgressMap);
  }, [user]);

  if (loading || !user || !isValidLang(lang)) return null;

  const lessons = LANG_LESSONS[lang];
  const meta = LANG_META[lang];

  function isUnlocked(order: number): boolean {
    if (order === 0) return true;
    const prev = lessons.find((l) => l.order === order - 1);
    if (!prev) return true;
    return progressMap[prev.id]?.status === "completed";
  }

  const completedCount = lessons.filter((l) => progressMap[l.id]?.status === "completed").length;
  const progressPct = Math.round((completedCount / lessons.length) * 100);

  return (
    <AppShell>
      {/* Top bar */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "1.125rem 1.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/learn"
          style={{ fontSize: "0.78rem", color: "var(--text3)", display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none", fontWeight: 500 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          เลือกภาษา
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--border2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
        <span style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: "0.875rem", color: meta.color }}>
          {meta.label}
        </span>
        <span style={{ fontSize: "0.78rem", color: "var(--text3)" }}>· {meta.desc}</span>

        <div style={{ flex: 1 }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.375rem 0.875rem",
            background: meta.bg,
            border: `1px solid ${meta.bd}`,
            borderRadius: 50,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: meta.color }}>
            {completedCount} / {lessons.length} บทเรียน
          </span>
        </div>
      </div>

      <div style={{ padding: "1.75rem" }}>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr auto",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
          className="stats-grid"
        >
          {[
            { value: completedCount, label: "เสร็จแล้ว", color: meta.color, bg: meta.bg, bd: meta.bd },
            { value: lessons.filter((l) => progressMap[l.id]?.status === "in_progress").length, label: "กำลังเรียน", color: "var(--yellow)", bg: "var(--yellow-bg)", bd: "#FDE68A" },
            { value: lessons.length - completedCount, label: "เหลืออยู่", color: "var(--text3)", bg: "var(--surface2)", bd: "var(--border)" },
          ].map(({ value, label, color, bg, bd }) => (
            <div key={label} style={{ background: bg, border: `1px solid ${bd}`, borderRadius: 12, padding: "1.125rem 1.25rem", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "1.75rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text3)", marginTop: "0.375rem", fontWeight: 500 }}>{label}</div>
            </div>
          ))}

          {/* Progress ring */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", boxShadow: "var(--shadow-sm)" }}>
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="5"/>
              <circle cx="28" cy="28" r="22" fill="none" stroke={meta.color} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - progressPct / 100)}`}
                transform="rotate(-90 28 28)"
                style={{ transition: "stroke-dashoffset 0.7s ease" }}
              />
              <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text)" fontFamily="var(--mono)">{progressPct}%</text>
            </svg>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)" }}>ความคืบหน้า</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: "0.2rem" }}>track {meta.label}</div>
            </div>
          </div>
        </div>

        {/* Lesson list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {lessons.map((lesson) => {
            const unlocked = isUnlocked(lesson.order);
            const prog = progressMap[lesson.id];
            const status = prog?.status ?? "not_started";
            const done = status === "completed";
            const inProgress = status === "in_progress";

            const card = (
              <div
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${done ? meta.bd : "var(--border)"}`,
                  borderRadius: 12,
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: unlocked ? 1 : 0.5,
                  cursor: unlocked ? "pointer" : "not-allowed",
                  transition: "box-shadow 0.15s, border-color 0.15s, transform 0.1s",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                }}
                className={unlocked ? "lesson-card-hover" : ""}
              >
                {done && (
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: meta.color, borderRadius: "12px 0 0 12px" }} />
                )}

                {/* Badge */}
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: done ? meta.bg : inProgress ? "var(--yellow-bg)" : "var(--surface2)",
                    border: `1.5px solid ${done ? meta.bd : inProgress ? "#FDE68A" : "var(--border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--mono)", fontWeight: 700, fontSize: "0.875rem",
                    color: done ? meta.color : inProgress ? "var(--yellow)" : "var(--text3)",
                  }}
                >
                  {!unlocked ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ) : done ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={meta.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    String(lesson.order).padStart(2, "0")
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--text3)", fontWeight: 600, background: "var(--surface2)", padding: "0.1rem 0.4rem", borderRadius: 4, border: "1px solid var(--border)" }}>
                      {lesson.id}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", fontWeight: 700, color: meta.color, background: meta.bg, padding: "0.1rem 0.4rem", borderRadius: 4, border: `1px solid ${meta.bd}` }}>
                      {meta.label}
                    </span>
                    {inProgress && (
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--yellow)", background: "var(--yellow-bg)", padding: "0.1rem 0.45rem", borderRadius: 4, border: "1px solid #FDE68A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        กำลังเรียน
                      </span>
                    )}
                    {done && (
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: meta.color, background: meta.bg, padding: "0.1rem 0.45rem", borderRadius: 4, border: `1px solid ${meta.bd}`, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        เสร็จแล้ว
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.925rem", color: "var(--text)", marginBottom: "0.2rem" }}>{lesson.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lesson.description}</div>
                </div>

                {/* Right */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.68rem", fontFamily: "var(--mono)", color: "var(--text3)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {lesson.estimatedMinutes} นาที
                  </span>
                  {unlocked && !done && (
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: meta.color, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      {inProgress ? "ต่อเลย" : "เริ่มเลย"}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            );

            return unlocked ? (
              <Link key={lesson.id} href={`/learn/${lang}/${lesson.id}`} style={{ textDecoration: "none", display: "block" }}>
                {card}
              </Link>
            ) : (
              <div key={lesson.id}>{card}</div>
            );
          })}
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--text3)", textAlign: "center", lineHeight: 1.6 }}>
          แต่ละบทเรียนจะปลดล็อกหลังจากผ่านบทก่อนหน้า
        </p>
      </div>

      <style>{`
        .lesson-card-hover:hover { box-shadow: var(--shadow) !important; transform: translateY(-1px); }
        @media (max-width: 700px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </AppShell>
  );
}
