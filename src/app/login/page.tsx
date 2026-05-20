"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

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
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        background: "var(--bg)",
      }}
    >
      {/* ─── Left panel (branding) ─── */}
      <div
        style={{
          display: "none",
          flex: "0 0 420px",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          background: "#111115",
          borderRight: "1px solid var(--border)",
        }}
        className="login-left"
      >
        {/* Logo */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "3rem" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: "var(--accent)",
                borderRadius: 11,
                fontFamily: "var(--mono)",
                fontWeight: 800,
                fontSize: "0.95rem",
                color: "#000",
                letterSpacing: "-0.02em",
              }}
            >
              TOI
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>Playground</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text3)" }}>สอวน. คอมพิวเตอร์</div>
            </div>
          </div>

          <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.25, letterSpacing: "-0.03em" }}>
            ฝึกโค้ด<br />เตรียมสอบ สอวน.
          </h2>
          <p style={{ margin: "0 0 2rem", color: "var(--text2)", fontSize: "0.925rem", lineHeight: 1.65 }}>
            แพลตฟอร์มสำหรับนักเรียนโปรแกรมมิ่ง เรียนรู้ C, C++ และ Python ผ่านบทเรียนและโจทย์จริง
          </p>

          {/* Features */}
          {[
            { icon: "📚", text: "บทเรียนจากศูนย์ — ครอบคลุม C, C++, Python" },
            { icon: "⚡", text: "โจทย์ระดับ A1–A3 พร้อม Judge อัตโนมัติ" },
            { icon: "🏆", text: "ระบบคะแนนและอันดับ" },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.875rem",
                padding: "0.625rem 0.875rem",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 9,
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text2)", lineHeight: 1.45 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* School info */}
        <div>
          <div
            style={{
              padding: "0.875rem 1rem",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: 9,
            }}
          >
            <div style={{ fontSize: "0.68rem", color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>
              โรงเรียน
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>
              โรงเรียนเทศบาล 6 นครเชียงราย
            </div>
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.7rem", color: "var(--text3)" }}>
            Powered by <span style={{ color: "var(--accent)", fontWeight: 600 }}>Kawin</span> &amp; <span style={{ color: "var(--accent)", fontWeight: 600 }}>Oracle Family</span>
          </div>
        </div>
      </div>

      {/* ─── Right panel (login form) ─── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {/* Mobile logo */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }} className="login-mobile-logo">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              background: "var(--accent)",
              borderRadius: 13,
              fontFamily: "var(--mono)",
              fontWeight: 800,
              fontSize: "1rem",
              color: "#000",
              marginBottom: "0.875rem",
              letterSpacing: "-0.02em",
            }}
          >
            TOI
          </div>
          <div style={{ fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
            TOI<span style={{ color: "var(--accent)" }}>·</span>Playground
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text3)", marginTop: "0.25rem" }}>
            โรงเรียนเทศบาล 6 นครเชียงราย
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            background: "#111115",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "2rem",
          }}
        >
          <h2 style={{ margin: "0 0 0.375rem", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            เข้าสู่ระบบ
          </h2>
          <p style={{ margin: "0 0 1.75rem", color: "var(--text3)", fontSize: "0.85rem", lineHeight: 1.5 }}>
            ใช้อีเมลโรงเรียน{" "}
            <code
              style={{
                fontFamily: "var(--mono)",
                background: "var(--surface2)",
                padding: "0.1em 0.4em",
                borderRadius: 4,
                fontSize: "0.82em",
                color: "var(--accent)",
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
              padding: "0.8rem 1rem",
              background: busy ? "var(--surface2)" : "#fff",
              color: busy ? "var(--text2)" : "#1a1a1a",
              border: "1px solid var(--border2)",
              borderRadius: 9,
              fontFamily: "var(--sans)",
              fontSize: "0.925rem",
              fontWeight: 600,
              cursor: busy ? "not-allowed" : "pointer",
              transition: "all 0.15s",
              letterSpacing: "-0.01em",
            }}
          >
            {busy ? (
              <>
                <Spinner /> กำลังเข้าสู่ระบบ…
              </>
            ) : (
              <>
                <GoogleIcon />
                เข้าสู่ระบบด้วย Google
              </>
            )}
          </button>

          {err && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.625rem 0.875rem",
                background: "#1a0808",
                border: "1px solid #ef444433",
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
              fontSize: "0.75rem",
              color: "var(--text3)",
              lineHeight: 1.55,
            }}
          >
            ระบบนี้สำหรับนักเรียน{" "}
            <span style={{ color: "var(--text2)", fontWeight: 500 }}>โรงเรียนเทศบาล 6 นครเชียงราย</span>{" "}
            เท่านั้น · ห้ามแชร์บัญชีกับบุคคลอื่น
          </div>
        </div>

        <div style={{ marginTop: "2rem", fontSize: "0.7rem", color: "var(--text3)" }}>
          Powered by <span style={{ color: "var(--accent)", fontWeight: 600 }}>Kawin</span> &amp; <span style={{ color: "var(--accent)", fontWeight: 600 }}>Oracle Family</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .login-left { display: flex !important; }
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
        border: "2px solid #ccc4",
        borderTop: "2px solid #555",
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
