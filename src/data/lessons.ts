export type SectionContent = { type: "content"; markdown: string };
export type SectionQuiz = {
  type: "quiz";
  id: string;
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
};
export type SectionCoding = {
  type: "coding";
  id: string;
  instruction: string;
  starterCode: { cpp: string; python: string };
  testCases: Array<{ input: string; expectedOutput: string; label?: string }>;
  hints?: string[];
};
export type Section = SectionContent | SectionQuiz | SectionCoding;

export type Lesson = {
  id: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  sections: Section[];
  relatedProblems: string[];
};

export const LESSONS: Lesson[] = [
  // ─────────────────────────────────────────
  // L01 — ตัวแปรและชนิดข้อมูล
  // ─────────────────────────────────────────
  {
    id: "L01",
    order: 1,
    title: "ตัวแปรและชนิดข้อมูล",
    description: "เรียนรู้ตัวแปร, int, float, string และ char ก้าวแรกสู่โลกโปรแกรมมิ่ง",
    estimatedMinutes: 20,
    relatedProblems: ["A1001", "A1002"],
    sections: [
      {
        type: "content",
        markdown: `## ตัวแปร คืออะไร?

ลองนึกภาพว่าคุณมี **กล่องใส่ของ** อยู่หลายใบ แต่ละใบมีป้ายชื่อ เช่น "คะแนนสอบ", "ชื่อนักเรียน", "ราคาสินค้า"

ในโปรแกรมมิ่ง **ตัวแปร (Variable)** ก็คือกล่องแบบนั้น — เราตั้งชื่อให้มัน แล้วเก็บค่าไว้ข้างใน และสามารถเปลี่ยนค่าได้ภายหลัง

---

## ชนิดข้อมูลใน C++

C++ บังคับให้ระบุ **ชนิด** ของกล่องก่อนเสมอ เพราะกล่องที่เก็บตัวเลขกับกล่องที่เก็บตัวอักษรมีขนาดต่างกัน

| ชนิด | ใช้เก็บ | ตัวอย่างค่า |
|------|---------|------------|
| \`int\` | เลขจำนวนเต็ม | \`42\`, \`-7\`, \`0\` |
| \`float\` | เลขทศนิยม (ความแม่น ~7 หลัก) | \`3.14\`, \`-0.5\` |
| \`double\` | เลขทศนิยม (ความแม่นสูงกว่า) | \`3.14159265\` |
| \`char\` | อักขระ 1 ตัว | \`'A'\`, \`'z'\`, \`'9'\` |
| \`string\` | ข้อความ (ต้องใส่ \`#include <string>\`) | \`"สวัสดี"\`, \`"hello"\` |
| \`bool\` | จริง/เท็จ | \`true\`, \`false\` |

---

## วิธีสร้างตัวแปร

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    // ประกาศตัวแปรพร้อมกำหนดค่า
    int score = 95;
    float price = 29.99;
    char grade = 'A';
    string name = "สมชาย";
    bool passed = true;

    // แสดงค่าออกมา
    cout << "ชื่อ: " << name << endl;
    cout << "คะแนน: " << score << endl;
    cout << "เกรด: " << grade << endl;

    return 0;
}
\`\`\`

**จุดสำคัญ:**
- \`int\` ไม่มีจุดทศนิยม ถ้าเก็บ \`3.7\` จะได้ \`3\` เท่านั้น!
- \`char\` ใช้เครื่องหมายคำพูดเดี่ยว \`' '\`
- \`string\` ใช้เครื่องหมายคำพูดคู่ \`" "\`
- ชื่อตัวแปรห้ามเริ่มด้วยตัวเลข และห้ามมีช่องว่าง`,
      },
      {
        type: "quiz",
        id: "L01Q1",
        question: "ชนิดข้อมูลใดในภาษา C++ ที่เหมาะสมที่สุดสำหรับเก็บ 'คะแนนสอบเป็นจำนวนเต็ม'?",
        options: ["float", "int", "string", "char"],
        correct: 1,
        explanation: "`int` ใช้เก็บเลขจำนวนเต็ม (Integer) เช่น 0, 42, -10 ซึ่งเหมาะกับคะแนนสอบที่ไม่มีทศนิยม ส่วน `float` ใช้เก็บทศนิยม, `string` ใช้เก็บข้อความ, `char` ใช้เก็บอักขระ 1 ตัว",
      },
      {
        type: "quiz",
        id: "L01Q2",
        question: "ข้อใดประกาศตัวแปรในภาษา C++ ได้ถูกต้อง?",
        options: [
          "int 1score = 10;",
          "int score = 10;",
          "score int = 10;",
          "int score 10;",
        ],
        correct: 1,
        explanation: "รูปแบบที่ถูกต้องคือ `ชนิดข้อมูล ชื่อตัวแปร = ค่า;` ดังนั้น `int score = 10;` ถูกต้อง ชื่อตัวแปรห้ามเริ่มด้วยตัวเลข (1score ผิด) และต้องใส่ `=` เพื่อกำหนดค่า",
      },
    ],
  },

  // ─────────────────────────────────────────
  // L02 — รับและแสดงผล
  // ─────────────────────────────────────────
  {
    id: "L02",
    order: 2,
    title: "รับและแสดงผล",
    description: "เรียนรู้การใช้ cin รับข้อมูล และ cout แสดงผล",
    estimatedMinutes: 25,
    relatedProblems: ["A1001", "A1003"],
    sections: [
      {
        type: "content",
        markdown: `## รับข้อมูลจากผู้ใช้ด้วย cin

ในชีวิตจริง โปรแกรมต้องรับข้อมูลจากผู้ใช้ เช่น ชื่อ, ตัวเลข หรือตัวเลือก

ใน C++ เราใช้ **\`cin\`** (อ่านว่า "ซี-อิน") สำหรับรับข้อมูลจาก keyboard

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "กรอกอายุของคุณ: ";
    cin >> age;       // รับค่าจาก keyboard เก็บไว้ใน age
    cout << "อายุ " << age << " ปี" << endl;
    return 0;
}
\`\`\`

**\`>>\`** เป็นทิศทาง: ข้อมูล "ไหล" จาก \`cin\` เข้าสู่ตัวแปร

---

## แสดงผลด้วย cout

**\`cout\`** (อ่านว่า "ซี-เอาท์") ใช้แสดงผลไปที่หน้าจอ

\`\`\`cpp
string firstName, lastName;
cin >> firstName >> lastName;  // รับ 2 ค่าพร้อมกัน (คั่นด้วย space)

cout << "สวัสดี " << firstName << " " << lastName << endl;
\`\`\`

---

## endl vs \\n

ทั้งคู่ขึ้นบรรทัดใหม่ แต่ต่างกันที่:
- **\`endl\`** — ขึ้นบรรทัดใหม่ + flush buffer (ช้ากว่าเล็กน้อย)
- **\`"\\n"\`** — ขึ้นบรรทัดใหม่ (เร็วกว่า ใช้ในการแข่งขัน)

ในโจทย์ competitive programming **นิยมใช้ \`"\\n"\`** เพราะเร็วกว่า

\`\`\`cpp
cout << "บรรทัดที่ 1\\n";
cout << "บรรทัดที่ 2\\n";
// เทียบเท่ากับ
cout << "บรรทัดที่ 1" << endl;
cout << "บรรทัดที่ 2" << endl;
\`\`\`

---

## รับข้อความที่มีช่องว่าง

\`cin >>\` หยุดที่ space ดังนั้นถ้าต้องการรับทั้งประโยค ใช้ \`getline()\`:

\`\`\`cpp
string fullName;
getline(cin, fullName);  // รับทั้งบรรทัดรวมถึงช่องว่าง
cout << "ชื่อเต็ม: " << fullName << "\\n";
\`\`\``,
      },
      {
        type: "quiz",
        id: "L02Q1",
        question: "คำสั่งใดใช้รับข้อมูลจาก keyboard ใน C++?",
        options: ["cout << x", "cin >> x", "print(x)", "input(x)"],
        correct: 1,
        explanation: "`cin >> x` คือคำสั่งรับข้อมูลใน C++ โดย `>>` หมายถึงข้อมูลไหลจาก cin เข้าสู่ตัวแปร x ส่วน `cout << x` คือแสดงผล, `print()` และ `input()` คือของ Python",
      },
      {
        type: "coding",
        id: "L02C1",
        instruction: "เขียนโปรแกรมรับชื่อ 1 คำ (ไม่มี space) แล้วแสดงผล `Hello [ชื่อ]`\n\nตัวอย่าง: รับ `Somchai` → แสดง `Hello Somchai`",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    string name;
    // รับชื่อจาก cin

    // แสดงผล Hello [name]

    return 0;
}`,
          python: `name = input()
print("Hello", name)`,
        },
        testCases: [
          { input: "Somchai", expectedOutput: "Hello Somchai", label: "ตัวอย่าง 1" },
          { input: "Alice", expectedOutput: "Hello Alice", label: "ตัวอย่าง 2" },
          { input: "Bank", expectedOutput: "Hello Bank", label: "ตัวอย่าง 3" },
        ],
        hints: [
          "ประกาศตัวแปร string ก่อน: `string name;`",
          "รับค่าด้วย: `cin >> name;`",
          "แสดงผลด้วย: `cout << \"Hello \" << name << \"\\n\";`",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // L03 — การคำนวณและเศษหาร
  // ─────────────────────────────────────────
  {
    id: "L03",
    order: 3,
    title: "การคำนวณและเศษหาร",
    description: "ตัวดำเนินการ +,-,*,/,% และความเข้าใจการหารจำนวนเต็ม",
    estimatedMinutes: 25,
    relatedProblems: ["A1002", "A1005"],
    sections: [
      {
        type: "content",
        markdown: `## ตัวดำเนินการทางคณิตศาสตร์

C++ มีตัวดำเนินการพื้นฐาน 5 ตัว:

| ตัวดำเนินการ | ความหมาย | ตัวอย่าง |
|------------|---------|---------|
| \`+\` | บวก | \`5 + 3 = 8\` |
| \`-\` | ลบ | \`5 - 3 = 2\` |
| \`*\` | คูณ | \`5 * 3 = 15\` |
| \`/\` | หาร | \`7 / 2 = 3\` (ถ้า int!) |
| \`%\` | เศษจากการหาร (Modulo) | \`7 % 2 = 1\` |

---

## จุดสำคัญ: การหาร int

**นี่คือกับดักใหญ่ที่สุดสำหรับมือใหม่!**

เมื่อหาร \`int\` ด้วย \`int\` → ผลลัพธ์จะถูก **ตัดทศนิยมทิ้ง** (ไม่ใช่ปัดเศษ)

\`\`\`cpp
int a = 7, b = 2;
cout << a / b << "\\n";  // ได้ 3 (ไม่ใช่ 3.5!)
cout << a % b << "\\n";  // ได้ 1 (เศษจากการหาร 7÷2)
\`\`\`

ถ้าต้องการทศนิยม ต้องใช้ \`float\` หรือ \`double\`:

\`\`\`cpp
double a = 7.0, b = 2.0;
cout << a / b << "\\n";  // ได้ 3.5
// หรือ
cout << (double)7 / 2 << "\\n";  // cast เป็น double ก่อนหาร
\`\`\`

---

## Modulo (%) ใช้ทำอะไร?

\`%\` หาเศษจากการหาร มีประโยชน์มากในการแข่งขัน:

\`\`\`cpp
// ตรวจว่าเลขคู่หรือคี่
if (n % 2 == 0) cout << "คู่\\n";
else cout << "คี่\\n";

// วันในสัปดาห์ (0=อาทิตย์ ... 6=เสาร์)
int day = (today + 3) % 7;
\`\`\`

---

## ตัวอย่างโปรแกรมคำนวณ

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    cout << a + b << "\\n";  // ผลรวม
    cout << a - b << "\\n";  // ผลต่าง
    cout << a * b << "\\n";  // ผลคูณ
    cout << a / b << "\\n";  // ผลหาร (ตัดทศนิยม)
    cout << a % b << "\\n";  // เศษ

    return 0;
}
\`\`\``,
      },
      {
        type: "quiz",
        id: "L03Q1",
        question: "ในภาษา C++ ถ้า a = 10 และ b = 3 ผลของ a / b คืออะไร?",
        options: ["3.33", "3", "4", "1"],
        correct: 1,
        explanation: "เมื่อ `int / int` ใน C++ ผลลัพธ์จะเป็น int โดยตัดทศนิยมทิ้ง ดังนั้น 10 / 3 = 3 (ไม่ใช่ 3.33) ถ้าต้องการ 3.33 ต้องใช้ `(double)a / b` หรือประกาศ a, b เป็น double",
      },
      {
        type: "quiz",
        id: "L03Q2",
        question: "ผลของ 17 % 5 คืออะไร?",
        options: ["3", "2", "5", "0"],
        correct: 1,
        explanation: "17 % 5 หาเศษจาก 17 ÷ 5 คือ 17 = 5×3 + 2 ดังนั้นเศษคือ 2 `%` คือ Modulo operator หาเศษจากการหาร",
      },
      {
        type: "coding",
        id: "L03C1",
        instruction: "รับจำนวนเต็ม 2 จำนวน a และ b (บรรทัดเดียวคั่นด้วย space)\nแสดงผลรูม 5 บรรทัด: ผลรวม, ผลต่าง, ผลคูณ, ผลหาร (จำนวนเต็ม), เศษ\n\nตัวอย่าง: รับ `10 3` → แสดง:\n```\n13\n7\n30\n3\n1\n```",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;

    // แสดงผลรูม ผลต่าง ผลคูณ ผลหาร เศษ

    return 0;
}`,
          python: `a, b = map(int, input().split())
print(a + b)
print(a - b)
print(a * b)
print(a // b)
print(a % b)`,
        },
        testCases: [
          { input: "10 3", expectedOutput: "13\n7\n30\n3\n1", label: "ตัวอย่าง 1" },
          { input: "20 4", expectedOutput: "24\n16\n80\n5\n0", label: "ตัวอย่าง 2" },
          { input: "7 2", expectedOutput: "9\n5\n14\n3\n1", label: "ตัวอย่าง 3" },
        ],
        hints: [
          "ใช้ cout << a + b << \"\\n\"; สำหรับผลรวม",
          "ผลหารจำนวนเต็มคือ a / b (ตัดทศนิยม)",
          "เศษจากการหารคือ a % b",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // L04 — เงื่อนไข if / else if / else
  // ─────────────────────────────────────────
  {
    id: "L04",
    order: 4,
    title: "เงื่อนไข if / else if / else",
    description: "เขียนโปรแกรมที่ตัดสินใจได้ด้วย if, else if, else และตัวดำเนินการเปรียบเทียบ",
    estimatedMinutes: 30,
    relatedProblems: ["A1007", "A1008", "A1009", "A1010"],
    sections: [
      {
        type: "content",
        markdown: `## โปรแกรมที่ตัดสินใจได้

ในชีวิตจริง เราตัดสินใจตามเงื่อนไขอยู่ตลอด เช่น "ถ้าฝนตก ก็กางร่ม ไม่อย่างนั้นก็ไม่ต้องกาง"

ใน C++ เราใช้ **\`if\`** เพื่อบอกโปรแกรมให้ทำอะไรขึ้นอยู่กับเงื่อนไข

\`\`\`cpp
if (เงื่อนไข) {
    // ทำสิ่งนี้ถ้าเงื่อนไขเป็นจริง
} else if (เงื่อนไขอื่น) {
    // ทำสิ่งนี้ถ้าเงื่อนไขแรกเท็จ แต่อันนี้จริง
} else {
    // ทำสิ่งนี้ถ้าไม่มีเงื่อนไขใดเป็นจริงเลย
}
\`\`\`

---

## ตัวดำเนินการเปรียบเทียบ

| ตัวดำเนินการ | ความหมาย | ตัวอย่าง |
|------------|---------|---------|
| \`==\` | เท่ากัน | \`a == b\` |
| \`!=\` | ไม่เท่ากัน | \`a != b\` |
| \`<\` | น้อยกว่า | \`a < b\` |
| \`>\` | มากกว่า | \`a > b\` |
| \`<=\` | น้อยกว่าหรือเท่ากัน | \`a <= b\` |
| \`>=\` | มากกว่าหรือเท่ากัน | \`a >= b\` |

**ระวัง!** \`==\` คือเปรียบเทียบ แต่ \`=\` คือกำหนดค่า (ต่างกัน!)

---

## ตัวดำเนินการตรรกะ

| ตัวดำเนินการ | ความหมาย | ตัวอย่าง |
|------------|---------|---------|
| \`&&\` | AND (และ) | \`a > 0 && a < 10\` |
| \`||\` | OR (หรือ) | \`a < 0 || a > 100\` |
| \`!\` | NOT (ไม่) | \`!found\` |

---

## ตัวอย่าง: ตรวจเกรด

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;

    if (score >= 80) {
        cout << "A\\n";
    } else if (score >= 70) {
        cout << "B\\n";
    } else if (score >= 60) {
        cout << "C\\n";
    } else {
        cout << "F\\n";
    }

    return 0;
}
\`\`\`

โปรแกรมตรวจจากบนลงล่าง พอเจอเงื่อนไขแรกที่เป็นจริงก็หยุดทันที`,
      },
      {
        type: "quiz",
        id: "L04Q1",
        question: "ตัวดำเนินการใดใช้ตรวจสอบว่า a 'เท่ากับ' b ในภาษา C++?",
        options: ["a = b", "a == b", "a === b", "a.equals(b)"],
        correct: 1,
        explanation: "`==` คือตัวดำเนินการเปรียบเทียบความเท่ากัน ส่วน `=` คือการกำหนดค่า (assignment) ซึ่งต่างกัน! `===` ไม่มีใน C++ (มีเฉพาะ JavaScript) และ `.equals()` เป็นของ Java",
      },
      {
        type: "coding",
        id: "L04C1",
        instruction: "รับจำนวนเต็ม n หนึ่งจำนวน\nถ้า n หารด้วย 2 ลงตัว (เลขคู่) ให้แสดง `EVEN`\nถ้าไม่ใช่ (เลขคี่) ให้แสดง `ODD`\n\nตัวอย่าง: รับ `4` → แสดง `EVEN` | รับ `7` → แสดง `ODD`",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // ตรวจสอบว่า n เป็นเลขคู่หรือเลขคี่
    // ใช้ n % 2 เพื่อหาเศษ

    return 0;
}`,
          python: `n = int(input())
if n % 2 == 0:
    print("EVEN")
else:
    print("ODD")`,
        },
        testCases: [
          { input: "4", expectedOutput: "EVEN", label: "เลขคู่" },
          { input: "7", expectedOutput: "ODD", label: "เลขคี่" },
          { input: "0", expectedOutput: "EVEN", label: "ศูนย์" },
          { input: "999", expectedOutput: "ODD", label: "เลขคี่ใหญ่" },
        ],
        hints: [
          "ถ้า n % 2 == 0 แสดงว่า n หารด้วย 2 ลงตัว = เลขคู่",
          "ถ้า n % 2 != 0 (หรือ n % 2 == 1) แสดงว่าเป็นเลขคี่",
          "ใช้โครงสร้าง: if (n % 2 == 0) { cout << \"EVEN\"; } else { cout << \"ODD\"; }",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // L05 — วนซ้ำด้วย for
  // ─────────────────────────────────────────
  {
    id: "L05",
    order: 5,
    title: "วนซ้ำด้วย for",
    description: "ทำสิ่งเดิมซ้ำๆ ด้วย for loop ลดโค้ดซ้ำซ้อนอย่างมีพลัง",
    estimatedMinutes: 30,
    relatedProblems: ["A1013", "A1014", "A1015", "A1016"],
    sections: [
      {
        type: "content",
        markdown: `## ทำไมต้องมี Loop?

สมมติต้องพิมพ์ตัวเลข 1 ถึง 100 ถ้าไม่มี loop ต้องเขียน \`cout\` 100 บรรทัด!

**Loop** แก้ปัญหานี้ด้วยการ "วนซ้ำ" โค้ดชุดเดิมหลายๆ รอบ

---

## โครงสร้าง for loop

\`\`\`cpp
for (ตั้งค่าเริ่มต้น; เงื่อนไขหยุด; การอัพเดต) {
    // โค้ดที่วนซ้ำ
}
\`\`\`

**ตัวอย่าง: พิมพ์ 1 ถึง 5**

\`\`\`cpp
for (int i = 1; i <= 5; i++) {
    cout << i << "\\n";
}
\`\`\`

ลำดับการทำงาน:
1. \`int i = 1\` — ตั้งค่า i เป็น 1 (ทำครั้งเดียว)
2. \`i <= 5\` — ตรวจเงื่อนไข ถ้าจริงทำโค้ดข้างใน ถ้าเท็จออกจาก loop
3. พิมพ์ค่า i
4. \`i++\` — เพิ่ม i ทีละ 1 (i++ คือ i = i + 1)
5. กลับไปข้อ 2

---

## นับจาก 0 vs นับจาก 1

Programmer นิยมเริ่มนับจาก 0 มากกว่าจาก 1:

\`\`\`cpp
// นับจาก 0 ถึง n-1 (พิมพ์ n ค่า)
for (int i = 0; i < n; i++) {
    cout << i << "\\n";
}

// นับจาก 1 ถึง n
for (int i = 1; i <= n; i++) {
    cout << i << "\\n";
}
\`\`\`

---

## for loop ซ้อนกัน (Nested Loop)

\`\`\`cpp
// พิมพ์ตาราง 3x3
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        cout << i << "," << j << " ";
    }
    cout << "\\n";  // ขึ้นบรรทัดใหม่หลังแต่ละแถว
}
// Output:
// 1,1 1,2 1,3
// 2,1 2,2 2,3
// 3,1 3,2 3,3
\`\`\`

---

## ตัวอย่างสรุปผลใน loop

\`\`\`cpp
int n = 5;
int sum = 0;           // ตัวสะสมผลรวม
for (int i = 1; i <= n; i++) {
    sum += i;          // sum = sum + i
}
cout << sum << "\\n";  // 15 (= 1+2+3+4+5)
\`\`\``,
      },
      {
        type: "quiz",
        id: "L05Q1",
        question: "for loop ด้านล่างวนกี่รอบ?\n```cpp\nfor (int i = 0; i < 5; i++) { ... }\n```",
        options: ["4 รอบ", "5 รอบ", "6 รอบ", "ไม่แน่นอน"],
        correct: 1,
        explanation: "i เริ่มที่ 0, หยุดเมื่อ i >= 5 ดังนั้น i มีค่า 0,1,2,3,4 รวม 5 ค่า = วน 5 รอบ จำสูตร: `i < n` เริ่มจาก 0 = n รอบ",
      },
      {
        type: "coding",
        id: "L05C1",
        instruction: "รับจำนวนเต็ม n (n >= 1)\nพิมพ์ตัวเลข 1 ถึง n แต่ละตัวในบรรทัดใหม่\n\nตัวอย่าง: รับ `5` → แสดง:\n```\n1\n2\n3\n4\n5\n```",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // วน loop พิมพ์ 1 ถึง n

    return 0;
}`,
          python: `n = int(input())
for i in range(1, n + 1):
    print(i)`,
        },
        testCases: [
          { input: "5", expectedOutput: "1\n2\n3\n4\n5", label: "n=5" },
          { input: "1", expectedOutput: "1", label: "n=1" },
          { input: "3", expectedOutput: "1\n2\n3", label: "n=3" },
        ],
        hints: [
          "ใช้ for loop: `for (int i = 1; i <= n; i++)`",
          "ข้างใน loop ใช้: `cout << i << \"\\n\";`",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // L06 — วนซ้ำด้วย while และ do-while
  // ─────────────────────────────────────────
  {
    id: "L06",
    order: 6,
    title: "วนซ้ำด้วย while และ do-while",
    description: "while loop เมื่อไม่รู้จำนวนรอบ, break และ continue สำหรับควบคุม loop",
    estimatedMinutes: 30,
    relatedProblems: ["A1017", "A1018", "A1019", "A1020"],
    sections: [
      {
        type: "content",
        markdown: `## while loop — วนซ้ำเมื่อไม่รู้จำนวนรอบ

บางครั้งเราไม่รู้ว่าจะวนกี่รอบ เช่น "วนจนกว่าผู้ใช้จะพิมพ์ 0" ในกรณีนี้ใช้ \`while\` ดีกว่า \`for\`

\`\`\`cpp
while (เงื่อนไข) {
    // วนซ้ำตราบที่เงื่อนไขเป็นจริง
}
\`\`\`

**ตัวอย่าง: รับตัวเลขจนกว่าจะได้ 0**

\`\`\`cpp
int n;
cin >> n;
while (n != 0) {
    cout << n << "\\n";
    cin >> n;  // รับค่าใหม่ทุกรอบ
}
\`\`\`

---

## for vs while — ใช้อันไหนดี?

- ใช้ **\`for\`** เมื่อรู้จำนวนรอบล่วงหน้า เช่น วน n รอบ
- ใช้ **\`while\`** เมื่อวนตามเงื่อนไขที่ไม่แน่นอน

ทั้งสองสามารถใช้แทนกันได้เสมอ แต่อ่านง่ายกว่าต่างกัน

---

## do-while — ทำก่อนแล้วค่อยตรวจ

\`do-while\` คล้าย \`while\` แต่ทำโค้ดอย่างน้อย 1 ครั้งเสมอ แม้เงื่อนไขเท็จตั้งแต่แรก

\`\`\`cpp
do {
    // ทำสิ่งนี้ก่อน
} while (เงื่อนไข);  // ตรวจทีหลัง
\`\`\`

---

## break และ continue

**\`break\`** — หยุด loop ทันที ออกจาก loop เลย

\`\`\`cpp
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;   // หยุดที่ 5
    cout << i << "\\n";  // พิมพ์ 1, 2, 3, 4
}
\`\`\`

**\`continue\`** — ข้ามรอบนี้ ไปรอบถัดไป

\`\`\`cpp
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;  // ข้ามรอบที่ i=3
    cout << i << "\\n";    // พิมพ์ 1, 2, 4, 5 (ไม่มี 3)
}
\`\`\`

---

## ตัวอย่าง: หาผลรวมด้วย while

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int sum = 0, i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    cout << sum << "\\n";
    return 0;
}
\`\`\``,
      },
      {
        type: "quiz",
        id: "L06Q1",
        question: "คำสั่ง `break` ใน loop มีผลอย่างไร?",
        options: [
          "หยุดโปรแกรมทั้งหมด",
          "ข้ามรอบปัจจุบัน ไปรอบถัดไป",
          "ออกจาก loop ทันที",
          "เริ่ม loop ใหม่จากต้น",
        ],
        correct: 2,
        explanation: "`break` ออกจาก loop ทันที โดยไม่สนว่าเงื่อนไขยังเป็นจริงอยู่หรือไม่ ส่วน `continue` คือข้ามรอบปัจจุบัน และ `return` คือออกจาก function",
      },
      {
        type: "coding",
        id: "L06C1",
        instruction: "รับจำนวนเต็ม n\nหาผลรวมของ 1 + 2 + 3 + ... + n แล้วแสดงผล\n\nตัวอย่าง: รับ `5` → แสดง `15` (เพราะ 1+2+3+4+5 = 15)",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int sum = 0;
    // ใช้ while loop สะสมผลรวม 1 ถึง n

    cout << sum << "\\n";
    return 0;
}`,
          python: `n = int(input())
print(n * (n + 1) // 2)`,
        },
        testCases: [
          { input: "5", expectedOutput: "15", label: "1+2+3+4+5=15" },
          { input: "1", expectedOutput: "1", label: "n=1" },
          { input: "10", expectedOutput: "55", label: "1+2+...+10=55" },
          { input: "100", expectedOutput: "5050", label: "n=100" },
        ],
        hints: [
          "ประกาศ `int sum = 0;` และ `int i = 1;`",
          "ใช้ `while (i <= n) { sum += i; i++; }`",
          "หรือจะใช้ for loop ก็ได้เช่นกัน",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // L07 — String และการจัดการข้อความ
  // ─────────────────────────────────────────
  {
    id: "L07",
    order: 7,
    title: "String และการจัดการข้อความ",
    description: "การเข้าถึงอักขระ, length(), substr() และการวนซ้ำใน string",
    estimatedMinutes: 30,
    relatedProblems: ["A1001", "A1021", "A1022", "A1023", "A1024", "A1025"],
    sections: [
      {
        type: "content",
        markdown: `## String คืออะไร?

**String** คือลำดับของอักขระต่อกัน เหมือนสายสร้อยที่แต่ละลูกคืออักขระ 1 ตัว

\`\`\`cpp
string s = "Hello";
//          01234   ← ตำแหน่ง (index) เริ่มจาก 0 เสมอ!
\`\`\`

---

## การเข้าถึงอักขระ (Indexing)

ใช้ \`s[i]\` เพื่อเข้าถึงอักขระที่ตำแหน่ง \`i\` (เริ่มจาก 0):

\`\`\`cpp
string s = "Hello";
cout << s[0] << "\\n";  // H (ตัวแรก)
cout << s[4] << "\\n";  // o (ตัวสุดท้าย)
\`\`\`

**ตัวสุดท้ายอยู่ที่ตำแหน่ง \`s.length() - 1\`**

---

## ฟังก์ชันพื้นฐานของ string

\`\`\`cpp
string s = "Hello World";

// ความยาว
cout << s.length() << "\\n";     // 11
cout << s.size() << "\\n";       // 11 (เหมือนกัน)

// ตัดส่วนของ string
// s.substr(เริ่มต้น, จำนวนตัวอักษร)
cout << s.substr(0, 5) << "\\n"; // Hello
cout << s.substr(6) << "\\n";    // World (ถึงท้าย)

// เปรียบเทียบ string
if (s == "Hello World") cout << "เหมือนกัน\\n";

// ต่อ string
string a = "Hello";
string b = " World";
string c = a + b;   // "Hello World"
\`\`\`

---

## วนซ้ำผ่าน string

\`\`\`cpp
string s = "Hello";

// วิธีที่ 1: ใช้ index
for (int i = 0; i < s.length(); i++) {
    cout << s[i] << "\\n";
}

// วิธีที่ 2: range-based for (C++11 ขึ้นไป)
for (char c : s) {
    cout << c << "\\n";
}
\`\`\`

---

## ตัวอย่าง: นับสระ

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    int count = 0;
    for (char c : s) {
        if (c=='a' || c=='e' || c=='i' || c=='o' || c=='u') {
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}
\`\`\``,
      },
      {
        type: "quiz",
        id: "L07Q1",
        question: "ถ้า s = \"Thailand\" แล้ว s[0] และ s[s.length()-1] คืออะไร?",
        options: [
          "T และ d",
          "T และ n",
          "h และ d",
          "1 และ 8",
        ],
        correct: 0,
        explanation: "\"Thailand\" มี 8 ตัวอักษร index 0 = 'T' (ตัวแรก) และ index s.length()-1 = 8-1 = 7 = 'd' (ตัวสุดท้าย) จำ: index เริ่มจาก 0 เสมอ",
      },
      {
        type: "coding",
        id: "L07C1",
        instruction: "รับ string 1 คำ (ไม่มี space)\nพิมพ์อักษรตัวแรกในบรรทัดที่ 1\nพิมพ์อักษรตัวสุดท้ายในบรรทัดที่ 2\n\nตัวอย่าง: รับ `Hello` → แสดง:\n```\nH\no\n```",
        starterCode: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    // พิมพ์อักษรตัวแรก

    // พิมพ์อักษรตัวสุดท้าย

    return 0;
}`,
          python: `s = input()
print(s[0])
print(s[-1])`,
        },
        testCases: [
          { input: "Hello", expectedOutput: "H\no", label: "ตัวอย่าง 1" },
          { input: "Thailand", expectedOutput: "T\nd", label: "ตัวอย่าง 2" },
          { input: "A", expectedOutput: "A\nA", label: "1 ตัวอักษร" },
          { input: "programming", expectedOutput: "p\ng", label: "ตัวอย่าง 3" },
        ],
        hints: [
          "อักษรตัวแรกอยู่ที่ index 0: `s[0]`",
          "อักษรตัวสุดท้ายอยู่ที่ index s.length()-1: `s[s.length()-1]`",
          "ใช้ cout << s[0] << \"\\n\"; และ cout << s[s.length()-1] << \"\\n\";",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // L08 — Array และลำดับข้อมูล
  // ─────────────────────────────────────────
  {
    id: "L08",
    order: 8,
    title: "Array และลำดับข้อมูล",
    description: "เก็บข้อมูลหลายค่าในตัวแปรเดียว, การประกาศ array, index และการหา max/min",
    estimatedMinutes: 35,
    relatedProblems: ["A2003", "A2004", "A2005"],
    sections: [
      {
        type: "content",
        markdown: `## Array คืออะไร?

ลองนึกภาพ **ชั้นวางสินค้า** ที่มีหลายช่อง แต่ละช่องมีหมายเลข แทนที่จะตั้งชื่อแต่ละช่องว่า score1, score2, score3 ... เราใช้ **array** เก็บค่าทั้งหมดในชื่อเดียว

\`\`\`cpp
int scores[5];  // array ชื่อ scores มี 5 ช่อง (index 0-4)
\`\`\`

---

## ประกาศและกำหนดค่า

\`\`\`cpp
// วิธีที่ 1: ประกาศและกำหนดค่าพร้อมกัน
int a[5] = {10, 20, 30, 40, 50};
//  index:   0   1   2   3   4

// วิธีที่ 2: ประกาศก่อน กำหนดค่าทีหลัง
int b[3];
b[0] = 100;
b[1] = 200;
b[2] = 300;

// วิธีที่ 3: รับค่าจาก input
int n;
cin >> n;
int arr[1000];  // ประกาศขนาดสูงสุดไว้ก่อน
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}
\`\`\`

**ระวัง!** ถ้าประกาศ array ขนาด 5 (\`arr[5]\`) ใช้ได้แค่ index 0-4 เท่านั้น การเข้าถึง \`arr[5]\` จะเกิด error!

---

## วนซ้ำกับ Array

\`\`\`cpp
int arr[5] = {3, 1, 4, 1, 5};

// พิมพ์ทุกค่า
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
cout << "\\n";  // 3 1 4 1 5

// หาผลรวม
int sum = 0;
for (int i = 0; i < 5; i++) {
    sum += arr[i];
}
cout << sum << "\\n";  // 14
\`\`\`

---

## หาค่า Maximum และ Minimum

\`\`\`cpp
int arr[5] = {3, 1, 4, 1, 5};
int n = 5;

// สมมติว่าค่าแรกเป็น max/min ก่อน
int maxVal = arr[0];
int minVal = arr[0];

for (int i = 1; i < n; i++) {
    if (arr[i] > maxVal) maxVal = arr[i];  // อัพเดตถ้าเจอค่ามากกว่า
    if (arr[i] < minVal) minVal = arr[i];  // อัพเดตถ้าเจอค่าน้อยกว่า
}

cout << "Max = " << maxVal << "\\n";  // 5
cout << "Min = " << minVal << "\\n";  // 1
\`\`\`

---

## vector — Array ที่ยืดหดได้

ใน C++ มีสิ่งที่ดีกว่า array ธรรมดา คือ **vector** ที่ไม่ต้องระบุขนาดล่วงหน้า:

\`\`\`cpp
#include <vector>
vector<int> v;
v.push_back(10);  // เพิ่มค่า
v.push_back(20);
cout << v.size() << "\\n";  // 2
\`\`\``,
      },
      {
        type: "quiz",
        id: "L08Q1",
        question: "ถ้าประกาศ `int arr[5] = {10, 20, 30, 40, 50};` แล้ว arr[2] มีค่าเท่าไร?",
        options: ["10", "20", "30", "40"],
        correct: 2,
        explanation: "Index ของ array เริ่มจาก 0 ดังนั้น arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40, arr[4]=50 ดังนั้น arr[2] = 30",
      },
      {
        type: "coding",
        id: "L08C1",
        instruction: "รับจำนวนเต็ม n ในบรรทัดแรก\nจากนั้นรับตัวเลข n ตัว (คั่นด้วย space) ในบรรทัดที่ 2\nแสดงค่า maximum และ minimum แต่ละค่าในบรรทัดใหม่\n\nตัวอย่าง:\nInput:\n```\n5\n3 1 4 1 5\n```\nOutput:\n```\n5\n1\n```",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    // หาค่า max และ min
    int maxVal = arr[0];
    int minVal = arr[0];

    // วน loop ตรวจทุกค่า

    cout << maxVal << "\\n";
    cout << minVal << "\\n";
    return 0;
}`,
          python: `n = int(input())
a = list(map(int, input().split()))
print(max(a))
print(min(a))`,
        },
        testCases: [
          { input: "5\n3 1 4 1 5", expectedOutput: "5\n1", label: "ตัวอย่าง 1" },
          { input: "3\n10 20 30", expectedOutput: "30\n10", label: "เรียงน้อยไปมาก" },
          { input: "1\n42", expectedOutput: "42\n42", label: "n=1 ตัว" },
          { input: "4\n-5 3 -1 7", expectedOutput: "7\n-5", label: "มีเลขติดลบ" },
        ],
        hints: [
          "ตั้งต้น: `int maxVal = arr[0]; int minVal = arr[0];`",
          "วน loop จาก i=1 ถึง n-1",
          "ถ้า arr[i] > maxVal ให้ maxVal = arr[i]",
          "ถ้า arr[i] < minVal ให้ minVal = arr[i]",
        ],
      },
    ],
  },
];

export const LESSON_MAP = new Map<string, Lesson>(
  LESSONS.map((l) => [l.id, l])
);
