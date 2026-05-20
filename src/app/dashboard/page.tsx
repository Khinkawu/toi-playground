"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { getAllUsers, UserRecord } from "@/lib/firestore";
import { PROBLEMS } from "@/data/problems";
import Navbar from "@/components/Navbar";

const TEACHER_EMAILS = ["mr.bankkawinjp@gmail.com"];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [fetching, setFetching] = useState(true);

  const isTeacher = user?.email && TEACHER_EMAILS.includes(user.email);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
    if (!loading && user && !isTeacher) router.replace("/problems");
  }, [user, loading, router, isTeacher]);

  useEffect(() => {
    if (!user || !isTeacher) return;
    getAllUsers().then((data) => {
      setUsers(data.sort((a, b) => (b.totalSolved ?? 0) - (a.totalSolved ?? 0)));
      setFetching(false);
    });
  }, [user, isTeacher]);

  if (loading || !user || !isTeacher) return null;

  const totalUsers = users.length;
  const totalSolvedSum = users.reduce((s, u) => s + (u.totalSolved ?? 0), 0);
  const A1total = PROBLEMS.filter((p) => p.level === "A1").length;
  const A2total = PROBLEMS.filter((p) => p.level === "A2").length;
  const A3total = PROBLEMS.filter((p) => p.level === "A3").length;

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
      <Navbar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem" }}>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Teacher Dashboard
        </h1>
        <p style={{ margin: "0 0 1.5rem", color: "var(--text3)", fontSize: "0.875rem" }}>
          ภาพรวมความก้าวหน้าของนักเรียน
        </p>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <StatCard label="นักเรียนทั้งหมด" value={totalUsers} />
          <StatCard label="ข้อที่แก้รวม (ทุกคน)" value={totalSolvedSum} />
          <StatCard label="เฉลี่ยต่อคน" value={totalUsers > 0 ? (totalSolvedSum / totalUsers).toFixed(1) : "0"} />
        </div>

        {/* Table */}
        {fetching ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text3)" }}>กำลังโหลด…</div>
        ) : (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr 200px 70px 70px 70px 70px",
                padding: "0.5rem 1rem",
                borderBottom: "1px solid var(--border)",
                fontSize: "0.72rem",
                color: "var(--text3)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>#</span>
              <span>นักเรียน</span>
              <span>อีเมล</span>
              <span style={{ textAlign: "center" }}>A1/{A1total}</span>
              <span style={{ textAlign: "center" }}>A2/{A2total}</span>
              <span style={{ textAlign: "center" }}>A3/{A3total}</span>
              <span style={{ textAlign: "center" }}>รวม</span>
            </div>

            {users.map((u, i) => (
              <div
                key={u.uid}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 200px 70px 70px 70px 70px",
                  padding: "0.5rem 1rem",
                  borderBottom: i < users.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "center",
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ color: "var(--text3)", fontFamily: "var(--mono)", fontSize: "0.8rem" }}>
                  {i + 1}
                </span>
                <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {u.displayName}
                </span>
                <span style={{ color: "var(--text3)", fontSize: "0.78rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {u.email}
                </span>
                <BarCell value={u.solvedA1 ?? 0} max={A1total} color="#22c55e" />
                <BarCell value={u.solvedA2 ?? 0} max={A2total} color="#eab308" />
                <BarCell value={u.solvedA3 ?? 0} max={A3total} color="#ef4444" />
                <span style={{ textAlign: "center", fontFamily: "var(--mono)", fontWeight: 700 }}>
                  {u.totalSolved ?? 0}
                </span>
              </div>
            ))}

            {users.length === 0 && (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text3)", fontSize: "0.875rem" }}>
                ยังไม่มีนักเรียนลงทะเบียน
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "1rem 1.25rem",
      }}
    >
      <p style={{ margin: "0 0 0.25rem", fontSize: "0.78rem", color: "var(--text3)" }}>{label}</p>
      <p style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--mono)" }}>{value}</p>
    </div>
  );
}

function BarCell({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontFamily: "var(--mono)", fontSize: "0.82rem", color: value > 0 ? color : "var(--text3)" }}>
        {value}
      </span>
      <div
        style={{
          height: 3,
          background: "var(--border)",
          borderRadius: 2,
          marginTop: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}
