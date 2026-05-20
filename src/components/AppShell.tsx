"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import { ReactNode } from "react";

const NAV = [
  {
    href: "/learn",
    label: "เนื้อหา",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    href: "/problems",
    label: "ชาเลนจ์",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    href: "/leaderboard",
    label: "อันดับ",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100dvh", background: "var(--bg)" }}>

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: "#111115",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflowY: "auto",
        }}
      >
        {/* Logo area */}
        <div style={{ padding: "1.25rem 1.25rem 1rem" }}>
          <Link
            href="/learn"
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                background: "var(--accent)",
                borderRadius: 9,
                fontFamily: "var(--mono)",
                fontWeight: 800,
                fontSize: "0.82rem",
                color: "#000",
                flexShrink: 0,
                letterSpacing: "-0.02em",
              }}
            >
              TOI
            </span>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.925rem",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                Playground
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "var(--text3)",
                  lineHeight: 1.3,
                  letterSpacing: "0.01em",
                }}
              >
                สอวน. คอมพิวเตอร์
              </div>
            </div>
          </Link>

          {/* School badge */}
          <div
            style={{
              marginTop: "0.875rem",
              padding: "0.5rem 0.625rem",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--text2)",
                lineHeight: 1.35,
                fontWeight: 500,
              }}
            >
              โรงเรียนเทศบาล 6<br />นครเชียงราย
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "0 1.25rem 0.75rem" }} />

        {/* Nav label */}
        <div
          style={{
            padding: "0 1.25rem 0.375rem",
            fontSize: "0.62rem",
            fontWeight: 700,
            color: "var(--text3)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          เมนูหลัก
        </div>

        {/* Nav links */}
        <nav style={{ padding: "0 0.75rem", display: "flex", flexDirection: "column", gap: "2px" }}>
          {NAV.map(({ href, label, icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.55rem 0.75rem",
                  borderRadius: 8,
                  background: active ? "#22c55e14" : "transparent",
                  color: active ? "var(--accent)" : "var(--text2)",
                  fontSize: "0.875rem",
                  fontWeight: active ? 600 : 400,
                  textDecoration: "none",
                  transition: "background 0.12s, color 0.12s",
                  position: "relative",
                }}
              >
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 20,
                      borderRadius: "0 2px 2px 0",
                      background: "var(--accent)",
                    }}
                  />
                )}
                <span style={{ opacity: active ? 1 : 0.6, display: "flex" }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", margin: "0 1.25rem 0.75rem" }} />

        {/* User area */}
        {user && (
          <div style={{ padding: "0 0.75rem 1.25rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: 8,
                background: "var(--surface2)",
                border: "1px solid var(--border)",
              }}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName ?? "user"}
                  width={28}
                  height={28}
                  style={{ borderRadius: "50%", flexShrink: 0 }}
                />
              ) : (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--border2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--text2)",
                    flexShrink: 0,
                  }}
                >
                  {user.displayName?.charAt(0) ?? "?"}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.displayName ?? "ผู้เรียน"}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--text3)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                marginTop: "0.375rem",
                padding: "0.45rem 0.75rem",
                background: "transparent",
                border: "none",
                borderRadius: 7,
                color: "var(--text3)",
                fontSize: "0.78rem",
                cursor: "pointer",
                transition: "color 0.12s, background 0.12s",
                textAlign: "left",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              ออกจากระบบ
            </button>
          </div>
        )}
      </aside>

      {/* ─── Main content ─────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto" }}>
        <main style={{ flex: 1 }}>{children}</main>

        {/* Footer */}
        <footer
          style={{
            padding: "0.875rem 1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.72rem", color: "var(--text3)" }}>
            Powered by{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Kawin</span>
            {" & "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Oracle Family</span>
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--text3)", fontFamily: "var(--mono)" }}>
            TOI·Playground · โรงเรียนเทศบาล 6 นครเชียงราย
          </span>
        </footer>
      </div>
    </div>
  );
}
