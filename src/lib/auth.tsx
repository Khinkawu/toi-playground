"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";
import { ensureUserDoc } from "./firestore";

const ALLOWED_DOMAIN = process.env.NEXT_PUBLIC_ALLOWED_DOMAIN || "tesaban6.ac.th";
const TEACHER_EMAIL = "mr.bankkawinjp@gmail.com";

function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email === TEACHER_EMAIL || email.endsWith(`@${ALLOWED_DOMAIN}`);
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const domain = u.email?.split("@")[1];
        if (!isAllowedEmail(u.email)) {
          await signOut(auth);
          setUser(null);
        } else {
          await ensureUserDoc(u);
          setUser(u);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInWithGoogle = async (): Promise<string | null> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (!isAllowedEmail(result.user.email)) {
        await signOut(auth);
        return `อีเมลต้องเป็น @${ALLOWED_DOMAIN} เท่านั้น`;
      }
      return null;
    } catch (e: unknown) {
      if (e instanceof Error && "code" in e) {
        const code = (e as { code: string }).code;
        if (code === "auth/popup-closed-by-user") return null;
        if (code === "auth/cancelled-popup-request") return null;
        return `เข้าสู่ระบบไม่สำเร็จ (${code})`;
      }
      return `เข้าสู่ระบบไม่สำเร็จ: ${String(e)}`;
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
