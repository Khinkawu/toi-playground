"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import AppShell from "@/components/AppShell";

const TRACKS = [
  {
    lang: "cpp",
    label: "C++",
    subtitle: "แนะนำสำหรับ สอวน.",
    desc: "ภาษายอดนิยมใน competitive programming — มี STL, เร็ว, และเขียนได้กระชับ ใช้ใน สอวน. ทุกระดับ",
    color: "var(--accent)",
    bg: "var(--accent-bg)",
    bd: "var(--accent-bd)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="8" x2="12" y2="16"/><line x1="10" y1="12" x2="14" y2="12"/>
      </svg>
    ),
    badge: "⭐ แนะนำ",
    lessons: 9,
  },
  {
    lang: "c",
    label: "C",
    subtitle: "รากฐานทุกภาษา",
    desc: "ภาษาต้นกำเนิดที่ทุกคนควรรู้ — เข้าใจ C คือเข้าใจคอมพิวเตอร์ ควบคุม memory โดยตรง เร็วที่สุด",
    color: "var(--blue)",
    bg: "var(--blue-bg)",
    bd: "var(--blue-bd)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    badge: null,
    lessons: 9,
  },
  {
    lang: "python",
    label: "Python",
    subtitle: "เขียนง่าย อ่านง่าย",
    desc: "ภาษาที่เขียนเร็วที่สุด เหมาะสำหรับเรียนรู้แนวคิด algorithm และทำ prototype ได้อย่างรวดเร็ว",
    color: "var(--yellow)",
    bg: "var(--yellow-bg)",
    bd: "#FDE68A",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 4 5 7v3h7v1H4c-1.66 0-3 1.34-3 3v4c0 3 3.13 5 7 5h2v-3h-2c-2.21 0-4-.89-4-2v-4c0-1.1.9-2 2-2h8c1.66 0 3-1.34 3-3V7c0-3-3.13-5-7-5z"/>
        <path d="M12 22c3.87 0 7-2 7-5v-3h-7v-1h8c1.66 0 3-1.34 3-3V7"/>
        <circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/>
      </svg>
    ),
    badge: null,
    lessons: 9,
  },
];

export default function LearnPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <AppShell>
      {/* Header */}
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "2rem 1.75rem 1.5rem",
        }}
      >
        <h1 style={{ margin: "0 0 0.375rem", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>
          เลือกภาษาที่ต้องการเรียน
        </h1>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text3)", lineHeight: 1.6 }}>
          แต่ละ track มีบทเรียนที่ออกแบบมาเฉพาะภาษานั้น เนื้อหาและตัวอย่างโค้ดแยกกันอย่างชัดเจน
        </p>
      </div>

      <div style={{ padding: "2rem 1.75rem", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {TRACKS.map((track) => (
            <Link
              key={track.lang}
              href={`/learn/${track.lang}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: `1.5px solid var(--border)`,
                  borderRadius: 16,
                  padding: "1.5rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  cursor: "pointer",
                  transition: "box-shadow 0.15s, border-color 0.15s, transform 0.1s",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = track.bd;
                  el.style.boxShadow = "var(--shadow)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "var(--shadow-sm)";
                  el.style.transform = "none";
                }}
              >
                {/* Accent stripe */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: track.color, borderRadius: "16px 0 0 16px" }} />

                {/* Icon */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: track.bg,
                    border: `1px solid ${track.bd}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: track.color,
                  }}
                >
                  {track.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: "1.25rem", color: track.color }}>
                      {track.label}
                    </span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text2)" }}>
                      {track.subtitle}
                    </span>
                    {track.badge && (
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: track.color, background: track.bg, padding: "0.15rem 0.55rem", borderRadius: 20, border: `1px solid ${track.bd}`, letterSpacing: "0.02em" }}>
                        {track.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.825rem", color: "var(--text3)", lineHeight: 1.55 }}>
                    {track.desc}
                  </p>
                </div>

                {/* Lessons count + arrow */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1.5rem", color: track.color, lineHeight: 1 }}>
                    {track.lessons}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "var(--text3)", fontWeight: 500 }}>บทเรียน</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={track.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "0.25rem" }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: "1.75rem", fontSize: "0.75rem", color: "var(--text3)", textAlign: "center", lineHeight: 1.6 }}>
          สามารถเรียนได้ทุกภาษา — ความรู้แต่ละ track แยกกัน สามารถเรียนคู่กันได้
        </p>
      </div>
    </AppShell>
  );
}
