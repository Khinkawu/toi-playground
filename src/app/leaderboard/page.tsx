"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { getLeaderboard, UserRecord } from "@/lib/firestore";
import AppShell from "@/components/AppShell";
import Image from "next/image";

const LEVEL_COLORS = { A1: "#22c55e", A2: "#eab308", A3: "#ef4444" };

export default function LeaderboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [board, setBoard] = useState<UserRecord[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    getLeaderboard(50).then((data) => {
      setBoard(data);
      setFetching(false);
    });
  }, [user]);

  if (loading || !user) return null;

  const MEDAL = ["🥇", "🥈", "🥉"];

  return (
    <AppShell>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1rem" }}>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          อันดับผู้เรียน
        </h1>
        <p style={{ margin: "0 0 1.5rem", color: "var(--text3)", fontSize: "0.875rem" }}>
          เรียงตามจำนวนข้อที่แก้ได้
        </p>

        {fetching ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text3)" }}>กำลังโหลด…</div>
        ) : board.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text3)" }}>
            ยังไม่มีข้อมูล — ลองแก้โจทย์สักข้อแล้วกลับมาดู
          </div>
        ) : (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 80px 80px 80px 80px",
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
              <span style={{ textAlign: "center", color: LEVEL_COLORS.A1 }}>A1</span>
              <span style={{ textAlign: "center", color: LEVEL_COLORS.A2 }}>A2</span>
              <span style={{ textAlign: "center", color: LEVEL_COLORS.A3 }}>A3</span>
              <span style={{ textAlign: "center" }}>รวม</span>
            </div>

            {board.map((u, i) => {
              const isMe = u.uid === user.uid;
              return (
                <div
                  key={u.uid}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr 80px 80px 80px 80px",
                    padding: "0.625rem 1rem",
                    borderBottom: i < board.length - 1 ? "1px solid var(--border)" : "none",
                    alignItems: "center",
                    background: isMe ? "#22c55e08" : "none",
                    borderLeft: isMe ? "2px solid var(--accent)" : "2px solid transparent",
                    transition: "background 0.1s",
                  }}
                >
                  {/* Rank */}
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: i < 3 ? "var(--text)" : "var(--text3)" }}>
                    {i < 3 ? MEDAL[i] : `${i + 1}`}
                  </span>

                  {/* User */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                    {u.photoURL ? (
                      <Image
                        src={u.photoURL}
                        alt={u.displayName}
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%", flexShrink: 0 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "var(--border2)",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          color: "var(--text2)",
                        }}
                      >
                        {u.displayName?.charAt(0) ?? "?"}
                      </div>
                    )}
                    <div style={{ overflow: "hidden" }}>
                      <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: isMe ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {u.displayName}
                        {isMe && <span style={{ color: "var(--accent)", fontSize: "0.7rem", marginLeft: "0.35rem" }}>คุณ</span>}
                      </p>
                    </div>
                  </div>

                  {/* A1 */}
                  <span style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.875rem", color: u.solvedA1 > 0 ? LEVEL_COLORS.A1 : "var(--text3)" }}>
                    {u.solvedA1 ?? 0}
                  </span>

                  {/* A2 */}
                  <span style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.875rem", color: u.solvedA2 > 0 ? LEVEL_COLORS.A2 : "var(--text3)" }}>
                    {u.solvedA2 ?? 0}
                  </span>

                  {/* A3 */}
                  <span style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.875rem", color: u.solvedA3 > 0 ? LEVEL_COLORS.A3 : "var(--text3)" }}>
                    {u.solvedA3 ?? 0}
                  </span>

                  {/* Total */}
                  <span style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "0.9rem", fontWeight: 700, color: u.totalSolved > 0 ? "var(--text)" : "var(--text3)" }}>
                    {u.totalSolved ?? 0}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
