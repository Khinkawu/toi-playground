"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

const NAV = [
  { href: "/problems", label: "โจทย์" },
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
        background: "rgba(9,9,11,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        height: 52,
        display: "flex",
        alignItems: "center",
        padding: "0 1.25rem",
        gap: "0.75rem",
      }}
    >
      {/* Brand */}
      <Link href="/problems" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            background: "var(--accent)",
            borderRadius: 7,
            fontFamily: "var(--mono)",
            fontWeight: 700,
            fontSize: "0.75rem",
            color: "#000",
            flexShrink: 0,
          }}
        >
          TZ
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          TOI<span style={{ color: "var(--accent)" }}>·</span>Playground
        </span>
      </Link>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Nav links */}
      {NAV.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: pathname.startsWith(href) ? "var(--accent)" : "var(--text2)",
            padding: "0.25rem 0.5rem",
            borderRadius: 6,
            transition: "color 0.15s",
          }}
        >
          {label}
        </Link>
      ))}

      {/* User */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "0.25rem" }}>
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "user"}
              width={26}
              height={26}
              style={{ borderRadius: "50%" }}
            />
          )}
          <button
            onClick={handleLogout}
            style={{
              fontSize: "0.78rem",
              color: "var(--text3)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.2rem 0.4rem",
              borderRadius: 4,
            }}
          >
            ออก
          </button>
        </div>
      )}
    </nav>
  );
}
