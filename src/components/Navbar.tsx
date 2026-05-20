"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

const NAV = [
  { href: "/learn", label: "เนื้อหา" },
  { href: "/problems", label: "ชาเลนจ์" },
  { href: "/leaderboard", label: "อันดับ" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "#FFFFFF",
        borderBottom: "1px solid var(--border)",
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 1.375rem",
        gap: "0.75rem",
        boxShadow: "0 1px 3px rgba(0,0,0,.05)",
      }}
    >
      {/* Brand */}
      <Link href="/learn" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            background: "var(--accent)",
            borderRadius: 8,
            fontFamily: "var(--mono)",
            fontWeight: 800,
            fontSize: "0.72rem",
            color: "#fff",
            flexShrink: 0,
            boxShadow: "0 2px 6px rgba(22,163,74,.3)",
          }}
        >
          TOI
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.2 }}>
            TOI<span style={{ color: "var(--accent)" }}>·</span>Playground
          </div>
          <div style={{ fontSize: "0.58rem", color: "var(--text3)", lineHeight: 1, letterSpacing: "0.01em" }}>
            ทต.6 นครเชียงราย
          </div>
        </div>
      </Link>

      <div style={{ flex: 1 }} />

      {/* Nav links */}
      {NAV.map(({ href, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: "0.875rem",
              fontWeight: active ? 600 : 400,
              color: active ? "var(--accent)" : "var(--text2)",
              padding: "0.3rem 0.625rem",
              borderRadius: 7,
              background: active ? "var(--accent-bg)" : "transparent",
              border: active ? "1px solid var(--accent-bd)" : "1px solid transparent",
              transition: "all 0.12s",
            }}
          >
            {label}
          </Link>
        );
      })}

      {/* User */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "0.25rem" }}>
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "user"}
              width={28}
              height={28}
              style={{ borderRadius: "50%", border: "2px solid var(--accent-bd)" }}
            />
          )}
          <button
            onClick={handleLogout}
            style={{
              fontSize: "0.78rem",
              color: "var(--text3)",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              cursor: "pointer",
              padding: "0.25rem 0.6rem",
            }}
          >
            ออก
          </button>
        </div>
      )}
    </nav>
  );
}
