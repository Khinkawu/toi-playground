"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { signInWithGoogle, user, loading } = useAuth();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  if (!loading && user) {
    router.replace("/problems");
    return null;
  }

  const handleLogin = async () => {
    setBusy(true);
    setErr(null);
    const error = await signInWithGoogle();
    if (error) {
      setErr(error);
      setBusy(false);
    } else {
      router.replace("/problems");
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "2rem",
      }}
    >
      {/* Brand */}
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            background: "var(--accent)",
            borderRadius: 14,
            fontFamily: "var(--mono)",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#000",
            marginBottom: "1rem",
          }}
        >
          TZ
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          TOI<span style={{ color: "var(--accent)" }}>·</span>Playground
        </h1>
        <p
          style={{
            margin: "0.4rem 0 0",
            color: "var(--text2)",
            fontSize: "0.9rem",
          }}
        >
          ฝึกโค้ดเตรียมสอบ สอวน. คอมพิวเตอร์
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "2rem",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <p
          style={{
            margin: "0 0 1.25rem",
            color: "var(--text2)",
            fontSize: "0.875rem",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          เข้าสู่ระบบด้วยอีเมลโรงเรียน{" "}
          <span style={{ color: "var(--text)", fontFamily: "var(--mono)" }}>
            @tesaban6.ac.th
          </span>
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
            padding: "0.75rem 1rem",
            background: busy ? "var(--surface2)" : "#fff",
            color: busy ? "var(--text2)" : "#1a1a1a",
            border: "1px solid var(--border2)",
            borderRadius: 8,
            fontFamily: "var(--sans)",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: busy ? "not-allowed" : "pointer",
            transition: "all 0.15s",
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
          <p
            style={{
              margin: "0.75rem 0 0",
              color: "var(--red)",
              fontSize: "0.82rem",
              textAlign: "center",
            }}
          >
            {err}
          </p>
        )}
      </div>

      <p
        style={{
          marginTop: "1.5rem",
          color: "var(--text3)",
          fontSize: "0.78rem",
        }}
      >
        ระบบนี้สำหรับนักเรียนโรงเรียนเทศบาล 6 เท่านั้น
      </p>
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
        border: "2px solid #ccc",
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
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
