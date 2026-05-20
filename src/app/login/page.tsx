"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/learn");
  }, [loading, user, router]);

  const handleLogin = async () => {
    setBusy(true);
    setErr(null);
    const error = await signInWithGoogle();
    if (error) {
      setErr(error);
      setBusy(false);
    } else {
      router.replace("/learn");
    }
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", background: "#F2F4F8" }}>

      {/* ─── Left panel ─── */}
      <div
        style={{
          flex: "0 0 420px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2.5rem",
          background: "linear-gradient(160deg, #0A4670 0%, #1591DC 60%, #4FB5EC 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        className="login-left-panel"
      >
        {/* Background decoration */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 320, height: 320, borderRadius: "50%", background: "rgba(0,0,0,.06)" }} />
        <div style={{ position: "absolute", top: "40%", right: "15%", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "3rem" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                background: "rgba(255,255,255,.2)",
                border: "1px solid rgba(255,255,255,.3)",
                backdropFilter: "blur(8px)",
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              <Image
                src="/school-logo.png"
                alt="โรงเรียนเทศบาล 6"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
                TOI<span style={{ opacity: 0.7 }}>·</span>Playground
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.7)" }}>สอวน. คอมพิวเตอร์ · ทต.6 นครเชียงราย</div>
            </div>
          </div>

          <h2 style={{ margin: "0 0 0.875rem", fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.03em" }}>
            ฝึกโค้ด<br />เตรียมสอบ สอวน.
          </h2>
          <p style={{ margin: "0 0 2rem", color: "rgba(255,255,255,.8)", fontSize: "0.9rem", lineHeight: 1.65 }}>
            เรียนรู้ C, C++ และ Python ผ่านบทเรียนเชิงลึกและโจทย์จริง พร้อมระบบตรวจอัตโนมัติ
          </p>

          {[
            { n: "9", label: "บทเรียน" },
            { n: "C/C++/Py", label: "3 ภาษา" },
            { n: "Auto", label: "Judge" },
          ].map(({ n, label }) => (
            <div
              key={label}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", fontFamily: "var(--mono)", lineHeight: 1 }}>{n}</span>
              <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,.65)", fontWeight: 500, marginTop: "0.1rem" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* School */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              padding: "0.875rem 1rem",
              background: "rgba(255,255,255,.15)",
              border: "1px solid rgba(255,255,255,.25)",
              borderRadius: 10,
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
              โรงเรียน
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>
              โรงเรียนเทศบาล 6 นครเชียงราย
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right panel ─── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Mobile logo (hidden on desktop via CSS) */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }} className="login-mobile-logo">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              background: "transparent",
              borderRadius: 13,
              marginBottom: "0.75rem",
            }}
          >
            <Image src="/school-logo.png" alt="โรงเรียนเทศบาล 6" width={48} height={48} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: "1.35rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
            TOI<span style={{ color: "var(--accent)" }}>·</span>Playground
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: "0.25rem" }}>
            โรงเรียนเทศบาล 6 นครเชียงราย
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            background: "#FFFFFF",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "2.25rem",
            boxShadow: "0 8px 32px rgba(0,0,0,.07), 0 2px 8px rgba(0,0,0,.04)",
          }}
        >
          <h2 style={{ margin: "0 0 0.375rem", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text)" }}>
            เข้าสู่ระบบ
          </h2>
          <p style={{ margin: "0 0 1.75rem", color: "var(--text3)", fontSize: "0.85rem", lineHeight: 1.55 }}>
            ใช้อีเมลโรงเรียน{" "}
            <code
              style={{
                fontFamily: "var(--mono)",
                background: "var(--accent-bg)",
                color: "var(--accent)",
                padding: "0.1em 0.4em",
                borderRadius: 4,
                fontSize: "0.82em",
                border: "1px solid var(--accent-bd)",
              }}
            >
              @tesaban6.ac.th
            </code>
          </p>

          <button
            onClick={handleLogin}
            disabled={busy || loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.625rem",
              padding: "0.85rem 1rem",
              background: busy ? "#F3F4F6" : "#FFFFFF",
              color: busy ? "var(--text3)" : "#1F2937",
              border: "1.5px solid #E5E7EB",
              borderRadius: 10,
              fontFamily: "var(--sans)",
              fontSize: "0.925rem",
              fontWeight: 600,
              cursor: busy ? "not-allowed" : "pointer",
              transition: "all 0.15s",
              boxShadow: busy ? "none" : "0 1px 4px rgba(0,0,0,.06)",
              letterSpacing: "-0.01em",
            }}
          >
            {busy ? <><Spinner /> กำลังเข้าสู่ระบบ…</> : <><GoogleIcon /> เข้าสู่ระบบด้วย Google</>}
          </button>

          {err && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.625rem 0.875rem",
                background: "var(--red-bg)",
                border: "1px solid var(--red-bd)",
                borderRadius: 8,
                color: "var(--red)",
                fontSize: "0.82rem",
                lineHeight: 1.5,
              }}
            >
              {err}
            </div>
          )}

          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border)",
              fontSize: "0.74rem",
              color: "var(--text3)",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            ระบบนี้สำหรับนักเรียน{" "}
            <span style={{ color: "var(--text2)", fontWeight: 500 }}>โรงเรียนเทศบาล 6 นครเชียงราย</span>{" "}
            เท่านั้น
          </div>
        </div>

        <div style={{ marginTop: "1.75rem", fontSize: "0.7rem", color: "var(--text3)" }}>
          Powered by{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>Kawin</span>
          {" & "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>Oracle Family</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .login-left-panel { display: none !important; }
        }
        @media (min-width: 768px) {
          .login-mobile-logo { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 16,
        height: 16,
        border: "2px solid #D1D5DB",
        borderTop: "2px solid #6B7280",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
