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
        if (domain !== ALLOWED_DOMAIN) {
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
    provider.setCustomParameters({ hd: ALLOWED_DOMAIN });
    try {
      const result = await signInWithPopup(auth, provider);
      const domain = result.user.email?.split("@")[1];
      if (domain !== ALLOWED_DOMAIN) {
        await signOut(auth);
        return `อีเมลต้องเป็น @${ALLOWED_DOMAIN} เท่านั้น`;
      }
      return null;
    } catch (e: unknown) {
      if (e instanceof Error && "code" in e) {
        const firebaseError = e as { code: string };
        if (firebaseError.code === "auth/popup-closed-by-user") return null;
        if (firebaseError.code === "auth/cancelled-popup-request") return null;
      }
      return "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่";
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
