import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./firebase";

export interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  totalSolved: number;
  solvedA1: number;
  solvedA2: number;
  solvedA3: number;
  createdAt: unknown;
}

export interface ProgressRecord {
  problemId: string;
  status: "solved" | "attempted";
  language: string;
  code: string;
  solvedAt: unknown;
  attempts: number;
}

export async function ensureUserDoc(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      totalSolved: 0,
      solvedA1: 0,
      solvedA2: 0,
      solvedA3: 0,
      createdAt: serverTimestamp(),
    });
  }
}

export async function getProgress(
  uid: string,
  problemId: string
): Promise<ProgressRecord | null> {
  const ref = doc(db, "users", uid, "progress", problemId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as ProgressRecord) : null;
}

export async function getAllProgress(uid: string): Promise<Record<string, ProgressRecord>> {
  const col = collection(db, "users", uid, "progress");
  const snaps = await getDocs(col);
  const result: Record<string, ProgressRecord> = {};
  snaps.forEach((s) => {
    result[s.id] = s.data() as ProgressRecord;
  });
  return result;
}

export async function markAttempted(
  uid: string,
  problemId: string,
  language: string,
  code: string
) {
  const ref = doc(db, "users", uid, "progress", problemId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      problemId,
      status: "attempted",
      language,
      code,
      solvedAt: null,
      attempts: 1,
    });
  } else if (snap.data().status !== "solved") {
    await updateDoc(ref, {
      status: "attempted",
      language,
      code,
      attempts: increment(1),
    });
  }
}

export async function markSolved(
  uid: string,
  problemId: string,
  level: "A1" | "A2" | "A3",
  language: string,
  code: string
) {
  const progressRef = doc(db, "users", uid, "progress", problemId);
  const snap = await getDoc(progressRef);
  const alreadySolved = snap.exists() && snap.data().status === "solved";

  await setDoc(progressRef, {
    problemId,
    status: "solved",
    language,
    code,
    solvedAt: serverTimestamp(),
    attempts: alreadySolved ? snap.data().attempts : increment(1),
  }, { merge: true });

  if (!alreadySolved) {
    const userRef = doc(db, "users", uid);
    const levelField = `solved${level}` as "solvedA1" | "solvedA2" | "solvedA3";
    await updateDoc(userRef, {
      totalSolved: increment(1),
      [levelField]: increment(1),
    });
  }
}

export async function getLeaderboard(limitN = 30): Promise<UserRecord[]> {
  const q = query(
    collection(db, "users"),
    orderBy("totalSolved", "desc"),
    limit(limitN)
  );
  const snaps = await getDocs(q);
  return snaps.docs.map((s) => s.data() as UserRecord);
}

export async function getAllUsers(): Promise<UserRecord[]> {
  const snaps = await getDocs(collection(db, "users"));
  return snaps.docs.map((s) => s.data() as UserRecord);
}

// ─── Lesson Progress ───────────────────────────────────────────────────────

export interface LessonProgress {
  completedExercises: string[];
  status: "not_started" | "in_progress" | "completed";
}

export async function getLessonProgress(
  uid: string,
  lessonId: string
): Promise<LessonProgress | null> {
  const ref = doc(db, "users", uid, "lessonProgress", lessonId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as LessonProgress) : null;
}

export async function markExercisePassed(
  uid: string,
  lessonId: string,
  exerciseId: string,
  totalExercises: number
): Promise<void> {
  const ref = doc(db, "users", uid, "lessonProgress", lessonId);
  const snap = await getDoc(ref);

  let completedExercises: string[] = [];
  if (snap.exists()) {
    completedExercises = (snap.data() as LessonProgress).completedExercises ?? [];
  }

  if (!completedExercises.includes(exerciseId)) {
    completedExercises = [...completedExercises, exerciseId];
  }

  const allDone = completedExercises.length >= totalExercises;
  const status: LessonProgress["status"] = allDone
    ? "completed"
    : completedExercises.length > 0
    ? "in_progress"
    : "not_started";

  await setDoc(ref, { completedExercises, status });
}

export async function getAllLessonProgress(
  uid: string
): Promise<Record<string, LessonProgress>> {
  const col = collection(db, "users", uid, "lessonProgress");
  const snaps = await getDocs(col);
  const result: Record<string, LessonProgress> = {};
  snaps.forEach((s) => {
    result[s.id] = s.data() as LessonProgress;
  });
  return result;
}
