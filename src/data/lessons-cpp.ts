import type { Lesson } from "./lessons";

export const LESSONS_CPP: Lesson[] = [

  // ═══════════════════════════════════════════════════════════════
  // CPP-L00 — Hello World และโครงสร้างโปรแกรม C++
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L00",
    lang: "cpp" as const,
    order: 0,
    title: "Hello World และโครงสร้างโปรแกรม C++",
    description: "เรียนรู้โครงสร้างพื้นฐานของโปรแกรม C++ ตั้งแต่ #include <iostream> จนถึง return 0 — ก้าวแรกของนักแข่งขัน",
    estimatedMinutes: 15,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## โครงสร้างโปรแกรม C++ พื้นฐาน

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}
\`\`\`

**อธิบายทีละบรรทัด:**

- \`#include <iostream>\` — ดึงไลบรารีสำหรับ input/output (มี \`cin\` และ \`cout\`)
- \`using namespace std;\` — ย่อชื่อ เช่น ใช้ \`cout\` แทน \`std::cout\`
- \`int main() { ... }\` — ฟังก์ชันหลัก โปรแกรมเริ่มทำงานที่นี่เสมอ
- \`cout << "Hello World" << endl;\` — แสดงข้อความออกหน้าจอ พร้อมขึ้นบรรทัดใหม่
- \`return 0;\` — บอก OS ว่าโปรแกรมจบปกติ (0 = สำเร็จ)

> **\`endl\` vs \`"\\n"\`**: ทั้งคู่ขึ้นบรรทัดใหม่ แต่ \`endl\` flush buffer ด้วย (ช้ากว่าเล็กน้อย) — ในโจทย์แข่งขันแนะนำใช้ \`"\\n"\` เพื่อความเร็ว`,
      },
      {
        type: "quiz",
        id: "CPP-L00-Q1",
        question: "บรรทัด `using namespace std;` ใน C++ มีไว้เพื่ออะไร?",
        options: [
          "ดึงไลบรารีมาตรฐานเข้ามาใช้",
          "ย่อชื่อ เช่น ใช้ cout แทน std::cout",
          "ประกาศตัวแปร global",
          "กำหนดชื่อโปรแกรม",
        ],
        correct: 1,
        explanation: "`using namespace std;` ทำให้เราพิมพ์แค่ `cout` แทน `std::cout` ได้ — เป็นการย่อ namespace ที่ใช้บ่อยใน competitive programming",
      },
      {
        type: "quiz",
        id: "CPP-L00-Q2",
        question: "ถ้าโปรแกรม C++ ไม่มีบรรทัด `#include <iostream>` จะเกิดอะไรขึ้นเมื่อใช้ cout?",
        options: [
          "โปรแกรมทำงานได้ปกติ",
          "โปรแกรมช้าลง",
          "Compile error เพราะ compiler ไม่รู้จัก cout",
          "cout แสดงผลเป็น error message แทน",
        ],
        correct: 2,
        explanation: "`cout` อยู่ใน iostream ถ้าไม่ `#include <iostream>` compiler จะไม่รู้จัก `cout` เลย และ error ตั้งแต่ขั้น compile",
      },
      {
        type: "coding",
        id: "CPP-L00-C1",
        instruction: "เขียนโปรแกรมรับชื่อ 1 บรรทัด แล้วแสดงผล Hello, {ชื่อ}!",
        starterCode: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cin >> name;
    // เขียนโค้ดที่นี่
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "World", expectedOutput: "Hello, World!", label: "ตัวอย่างทั่วไป" },
          { input: "TOI", expectedOutput: "Hello, TOI!", label: "ชื่อย่อการแข่งขัน" },
          { input: "Bank", expectedOutput: "Hello, Bank!", label: "ชื่อคน" },
        ],
        hints: [
          "ใช้ cout << \"Hello, \" << name << \"!\" << endl;",
          "สังเกต comma และ ! ในผลลัพธ์",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L01 — ตัวแปรและชนิดข้อมูลใน C++
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L01",
    lang: "cpp" as const,
    order: 1,
    title: "ตัวแปรและชนิดข้อมูลใน C++",
    description: "ทำความรู้จัก int, long long, double, char, bool, string — ชนิดข้อมูลที่ใช้บ่อยในโจทย์แข่งขัน",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## ชนิดข้อมูลหลักใน C++

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int a = 42;              // จำนวนเต็ม: -2,147,483,648 ถึง 2,147,483,647
    long long b = 9e18;     // จำนวนเต็มขนาดใหญ่: ≈ ±9.2 × 10^18
    double c = 3.14;        // ทศนิยม (15 หลัก)
    char d = 'A';           // ตัวอักษร 1 ตัว (ใช้ single quote)
    bool e = true;          // จริง/เท็จ: true หรือ false
    string s = "Hello";     // ข้อความ (ต้อง #include <string>)
    return 0;
}
\`\`\`

**ข้อควรระวังในโจทย์แข่งขัน:**

| ชนิด | ขนาด | ใช้เมื่อ |
|------|------|---------|
| \`int\` | 32-bit | ตัวเลขไม่เกิน ~2×10⁹ |
| \`long long\` | 64-bit | ตัวเลขเกิน 2×10⁹ (เช่น ผลคูณขนาดใหญ่) |
| \`double\` | 64-bit | ทศนิยม แต่ระวัง floating-point error |

> **Tip:** ใน competitive programming ถ้าไม่แน่ใจ — ใช้ \`long long\` ปลอดภัยกว่าเสมอ`,
      },
      {
        type: "quiz",
        id: "CPP-L01-Q1",
        question: "ถ้าโจทย์ให้ตัวเลขสูงสุด 10^18 ควรใช้ชนิดข้อมูลใดใน C++?",
        options: [
          "int",
          "float",
          "long long",
          "short",
        ],
        correct: 2,
        explanation: "`int` เก็บได้แค่ ~2×10⁹ ส่วน `long long` เก็บได้ถึง ~9.2×10^18 — เหมาะกับตัวเลขขนาดใหญ่ในโจทย์แข่งขัน",
      },
      {
        type: "quiz",
        id: "CPP-L01-Q2",
        question: "คำสั่งใดประกาศตัวแปรตัวอักษร 1 ตัวใน C++ ได้ถูกต้อง?",
        options: [
          `string c = "A";`,
          `char c = 'A';`,
          `char c = "A";`,
          `letter c = 'A';`,
        ],
        correct: 1,
        explanation: "`char` เก็บตัวอักษร 1 ตัว และต้องใช้ single quote `'A'` ไม่ใช่ double quote `\"A\"` (double quote คือ string)",
      },
      {
        type: "coding",
        id: "CPP-L01-C1",
        instruction: "รับจำนวนเต็ม 2 ตัว (a และ b) แล้วแสดงผลรวม ผลต่าง และผลคูณ (แต่ละค่าขึ้นบรรทัดใหม่) — ค่า a,b อาจสูงถึง 10^9 ดังนั้นผลคูณอาจเกิน int",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    // แสดงผลรวม ผลต่าง ผลคูณ แต่ละบรรทัด
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "3 5", expectedOutput: "8\n-2\n15", label: "ตัวเลขเล็ก" },
          { input: "1000000000 1000000000", expectedOutput: "2000000000\n0\n1000000000000000000", label: "ตัวเลขใหญ่ (ทดสอบ long long)" },
        ],
        hints: [
          "ใช้ long long เพื่อป้องกัน overflow ของผลคูณ",
          "cout << (a+b) << \"\\n\" << (a-b) << \"\\n\" << (a*b) << \"\\n\";",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L02 — รับและแสดงผลด้วย cin/cout
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L02",
    lang: "cpp" as const,
    order: 2,
    title: "รับและแสดงผลด้วย cin/cout",
    description: "เรียนรู้วิธีรับ input หลายค่า ใช้ cin >> และ cout << อย่างมีประสิทธิภาพ รวมถึง endl vs \\n",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## cin และ cout ใน C++

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;          // รับ 3 ตัวเลขพร้อมกัน (คั่นด้วย space หรือ newline)
    cout << a + b + c << "\\n"; // แสดงผลรวม
    return 0;
}
\`\`\`

**รับ input หลายรูปแบบ:**

\`\`\`cpp
// รับทีละบรรทัด (มี space ในข้อความ)
#include <iostream>
#include <string>
using namespace std;
int main() {
    string line;
    getline(cin, line);   // รับทั้งบรรทัดรวม space
    cout << line << "\\n";
    return 0;
}
\`\`\`

**endl vs "\\n":**
- \`endl\` = ขึ้นบรรทัดใหม่ + flush buffer (ช้ากว่า)
- \`"\\n"\` = ขึ้นบรรทัดใหม่อย่างเดียว (เร็วกว่า ~10×)
- ในโจทย์แข่งขันที่ต้อง output เยอะ → ใช้ \`"\\n"\` เสมอ

> **เร่งความเร็ว I/O:** เพิ่ม \`ios::sync_with_stdio(false); cin.tie(NULL);\` หลัง \`int main()\` เพื่อ I/O เร็วขึ้น 3–5 เท่า`,
      },
      {
        type: "quiz",
        id: "CPP-L02-Q1",
        question: "ในโจทย์แข่งขันที่ต้องแสดงผลหลายพันบรรทัด ควรใช้อะไรแทน endl?",
        options: [
          `"\\t"`,
          `"\\n"`,
          `flush`,
          `print()`,
        ],
        correct: 1,
        explanation: `\`"\\n"\` เร็วกว่า endl เพราะไม่ flush buffer ทุกครั้ง ในโจทย์ที่มี output เยอะ การ flush บ่อยทำให้โปรแกรมช้าลงอย่างมาก`,
      },
      {
        type: "quiz",
        id: "CPP-L02-Q2",
        question: "คำสั่ง `cin >> a >> b` ใน C++ รับ input อย่างไร?",
        options: [
          "รับเฉพาะ a ก่อน แล้วต้องกด Enter ก่อนรับ b",
          "รับ a และ b พร้อมกัน คั่นด้วย space หรือ newline ก็ได้",
          "รับ a และ b ต้องอยู่บรรทัดเดียวกันเท่านั้น",
          "ต้องใช้ cin >> a; cin >> b; แยกบรรทัดเสมอ",
        ],
        correct: 1,
        explanation: "`cin >>` ข้ามช่องว่าง (space, tab, newline) โดยอัตโนมัติ ดังนั้น `cin >> a >> b` รับ input ที่คั่นด้วย space หรืออยู่คนละบรรทัดได้",
      },
      {
        type: "coding",
        id: "CPP-L02-C1",
        instruction: "รับจำนวนเต็ม n (1 ≤ n ≤ 100) แล้วรับตัวเลข n ตัว แสดงผลรวมของตัวเลขทั้งหมด",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sum = 0;
    // วนรับตัวเลข n ตัว แล้วบวกรวม
    cout << sum << "\\n";
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "3\n1 2 3", expectedOutput: "6", label: "3 ตัวเลข" },
          { input: "5\n10 20 30 40 50", expectedOutput: "150", label: "5 ตัวเลข" },
          { input: "1\n999", expectedOutput: "999", label: "ตัวเลขตัวเดียว" },
        ],
        hints: [
          "ใช้ for loop: for(int i = 0; i < n; i++)",
          "ประกาศตัวแปร x รับค่า แล้ว sum += x;",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L03 — การคำนวณและตัวดำเนินการ
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L03",
    lang: "cpp" as const,
    order: 3,
    title: "การคำนวณและตัวดำเนินการ",
    description: "เรียนรู้ +,-,*,/,% และ pitfall ของ integer division รวมถึงการใช้ cmath สำหรับฟังก์ชันคณิตศาสตร์",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## ตัวดำเนินการทางคณิตศาสตร์ใน C++

\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int a = 7, b = 3;
    cout << a + b << "\\n";  // 10  (บวก)
    cout << a - b << "\\n";  // 4   (ลบ)
    cout << a * b << "\\n";  // 21  (คูณ)
    cout << a / b << "\\n";  // 2   (หาร — ตัดทศนิยมทิ้ง!)
    cout << a % b << "\\n";  // 1   (เศษจากการหาร)
    return 0;
}
\`\`\`

**⚠️ Integer Division Pitfall — ระวังมาก!**

\`\`\`cpp
int a = 7, b = 2;
cout << a / b;          // ได้ 3 (ไม่ใช่ 3.5!)
cout << (double)a / b;  // ได้ 3.5 (cast เป็น double ก่อน)
\`\`\`

**ฟังก์ชัน cmath ที่ใช้บ่อย:**

\`\`\`cpp
#include <cmath>
sqrt(9.0)    // 3.0 — รากที่สอง
pow(2, 10)   // 1024.0 — ยกกำลัง
abs(-5)      // 5 — ค่าสัมบูรณ์
ceil(2.1)    // 3.0 — ปัดขึ้น
floor(2.9)   // 2.0 — ปัดลง
\`\`\``,
      },
      {
        type: "quiz",
        id: "CPP-L03-Q1",
        question: "ใน C++ ผลลัพธ์ของ `7 / 2` คือเท่าไร?",
        options: [
          "3.5",
          "3",
          "4",
          "Error",
        ],
        correct: 1,
        explanation: "เมื่อทั้งสองตัวเป็น `int` C++ จะทำ integer division ตัดทศนิยมทิ้ง — ได้ 3 ไม่ใช่ 3.5 ถ้าต้องการ 3.5 ต้องใช้ `(double)7 / 2`",
      },
      {
        type: "quiz",
        id: "CPP-L03-Q2",
        question: "ผลลัพธ์ของ `17 % 5` ใน C++ คือเท่าไร?",
        options: [
          "3",
          "2",
          "1",
          "0",
        ],
        correct: 1,
        explanation: "`17 % 5` คือเศษจากการหาร 17 ÷ 5 = 3 เศษ 2 ดังนั้นคำตอบคือ 2 — `%` ใช้บ่อยมากในโจทย์ที่ต้องเช็คคู่/คี่ หรือ modular arithmetic",
      },
      {
        type: "coding",
        id: "CPP-L03-C1",
        instruction: "รับจำนวนเต็ม n แสดงผลว่า n เป็นเลขคู่หรือเลขคี่ (แสดง \"even\" หรือ \"odd\")",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // ใช้ % เพื่อตรวจสอบ
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "4", expectedOutput: "even", label: "เลขคู่" },
          { input: "7", expectedOutput: "odd", label: "เลขคี่" },
          { input: "0", expectedOutput: "even", label: "ศูนย์เป็นเลขคู่" },
        ],
        hints: [
          "ถ้า n % 2 == 0 คือเลขคู่ ไม่งั้นคือเลขคี่",
          "ใช้ if-else แสดงผล",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L04 — เงื่อนไข if/else if/else
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L04",
    lang: "cpp" as const,
    order: 4,
    title: "เงื่อนไข if/else if/else",
    description: "ฝึกใช้ if, else if, else พร้อม comparison operators และ logical operators &&, ||, ! และ ternary operator",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## if / else if / else ใน C++

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

**Comparison Operators:**
- \`==\` เท่ากับ, \`!=\` ไม่เท่ากับ
- \`<\` \`>\` \`<=\` \`>=\`

**Logical Operators:**
\`\`\`cpp
if (x > 0 && x < 100)  // AND: x อยู่ระหว่าง 1-99
if (x < 0 || x > 100)  // OR: x น้อยกว่า 0 หรือมากกว่า 100
if (!flag)              // NOT: ถ้า flag เป็น false
\`\`\`

**Ternary Operator (เขียนสั้น):**
\`\`\`cpp
int max = (a > b) ? a : b;  // ถ้า a > b ใช้ a ไม่งั้นใช้ b
\`\`\``,
      },
      {
        type: "quiz",
        id: "CPP-L04-Q1",
        question: "นิพจน์ `(a > 0 && b > 0)` ใน C++ เป็นจริงเมื่อใด?",
        options: [
          "a > 0 หรือ b > 0 อย่างใดอย่างหนึ่ง",
          "a > 0 และ b > 0 ทั้งคู่",
          "a > 0 เท่านั้น",
          "ทุกกรณีเสมอ",
        ],
        correct: 1,
        explanation: "`&&` คือ AND — ทั้งสองเงื่อนไขต้องจริงพร้อมกัน ถ้าจะให้เป็นจริงเมื่ออย่างใดอย่างหนึ่ง ต้องใช้ `||` (OR)",
      },
      {
        type: "quiz",
        id: "CPP-L04-Q2",
        question: "Ternary operator `int x = (n % 2 == 0) ? 1 : 0;` ให้ค่า x เป็นอะไรเมื่อ n = 7?",
        options: [
          "1",
          "0",
          "7",
          "Error",
        ],
        correct: 1,
        explanation: "n = 7 → 7 % 2 = 1 ≠ 0 ดังนั้นเงื่อนไข `(n % 2 == 0)` เป็น false → x = 0 (ส่วน else)",
      },
      {
        type: "coding",
        id: "CPP-L04-C1",
        instruction: "รับจำนวนเต็ม 3 ตัว (a, b, c) แล้วแสดงค่าที่มากที่สุดในหนึ่งบรรทัด",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    // หาค่าสูงสุดแล้ว cout
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "3 7 5", expectedOutput: "7", label: "ค่ากลางมากสุด" },
          { input: "10 2 8", expectedOutput: "10", label: "ค่าแรกมากสุด" },
          { input: "1 4 9", expectedOutput: "9", label: "ค่าสุดท้ายมากสุด" },
        ],
        hints: [
          "ใช้ if-else เปรียบเทียบ a กับ b ก่อน แล้วเปรียบ winner กับ c",
          "หรือใช้ max() จาก <algorithm>: cout << max({a, b, c});",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L05 — วนซ้ำด้วย for loop
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L05",
    lang: "cpp" as const,
    order: 5,
    title: "วนซ้ำด้วย for loop",
    description: "ใช้ for loop พื้นฐาน nested for loop รวมถึง break และ continue ใน C++",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## for loop ใน C++

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // วนจาก 1 ถึง 5
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << "\\n";  // 1 2 3 4 5

    // Nested for: สร้างตาราง 3x3
    for (int r = 1; r <= 3; r++) {
        for (int c = 1; c <= 3; c++) {
            cout << r * c << " ";
        }
        cout << "\\n";
    }
    return 0;
}
\`\`\`

**break และ continue:**

\`\`\`cpp
for (int i = 1; i <= 10; i++) {
    if (i == 4) continue;  // ข้ามรอบ i=4
    if (i == 7) break;     // หยุด loop ที่ i=7
    cout << i << " ";
}
// แสดง: 1 2 3 5 6
\`\`\`

**รูปแบบ for loop ใน C++:**
- \`i++\` เพิ่มทีละ 1
- \`i += 2\` เพิ่มทีละ 2
- \`i--\` ลดทีละ 1 (loop ถอยหลัง)`,
      },
      {
        type: "quiz",
        id: "CPP-L05-Q1",
        question: "`for (int i = 0; i < 5; i++)` วนกี่รอบ และ i มีค่าอะไรบ้าง?",
        options: [
          "5 รอบ: i = 1, 2, 3, 4, 5",
          "5 รอบ: i = 0, 1, 2, 3, 4",
          "6 รอบ: i = 0, 1, 2, 3, 4, 5",
          "4 รอบ: i = 1, 2, 3, 4",
        ],
        correct: 1,
        explanation: "เริ่มที่ i=0 เงื่อนไข i<5 ดังนั้นวนเมื่อ i=0,1,2,3,4 รวม 5 รอบ หยุดก่อน i=5 (เพราะ 5 ไม่ < 5)",
      },
      {
        type: "quiz",
        id: "CPP-L05-Q2",
        question: "คำสั่ง `continue` ใน for loop ทำอะไร?",
        options: [
          "หยุด loop ทันที",
          "ข้ามคำสั่งที่เหลือในรอบนี้แล้วไปรอบถัดไป",
          "วนซ้ำรอบเดิมอีกครั้ง",
          "ออกจากโปรแกรม",
        ],
        correct: 1,
        explanation: "`continue` ข้ามโค้ดที่อยู่ต่ำกว่าในรอบปัจจุบัน แล้วไปเริ่มรอบใหม่ ต่างจาก `break` ที่หยุด loop เลย",
      },
      {
        type: "coding",
        id: "CPP-L05-C1",
        instruction: "รับจำนวนเต็ม n แล้วแสดงตาราง n×n โดยแต่ละช่องเป็นผลคูณของแถวและคอลัมน์ (เริ่มจาก 1) คั่นด้วย space แต่ละแถวขึ้นบรรทัดใหม่",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // nested for loop
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "3", expectedOutput: "1 2 3\n4 5 6\n7 8 9", label: "ตาราง 3x3" },
          { input: "2", expectedOutput: "1 2\n3 4", label: "ตาราง 2x2" },
        ],
        hints: [
          "คำนวณค่าแต่ละช่องด้วย (r-1)*n + c เมื่อ r=แถว, c=คอลัมน์ (เริ่มจาก 1)",
          "แสดง space ระหว่างตัวเลข แต่อย่าให้มี trailing space (ใช้ if c < n)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L06 — while loop และ do-while
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L06",
    lang: "cpp" as const,
    order: 6,
    title: "while loop และ do-while",
    description: "เรียนรู้ while loop สำหรับวนซ้ำตามเงื่อนไข และ do-while สำหรับทำงานอย่างน้อย 1 รอบ",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## while loop ใน C++

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1;
    while (n <= 5) {        // วนตราบใดที่ n <= 5
        cout << n << " ";
        n++;
    }
    // แสดง: 1 2 3 4 5

    // do-while — ทำก่อนแล้วค่อยเช็คเงื่อนไข
    int x = 10;
    do {
        cout << x << "\\n";
        x--;
    } while (x > 8);
    // แสดง: 10 9
    return 0;
}
\`\`\`

**ต่างกันอย่างไร?**
| | while | do-while |
|---|---|---|
| เช็คเงื่อนไข | ก่อนทำ | หลังทำ |
| ทำน้อยสุด | 0 รอบ | 1 รอบ |

**ใช้เมื่อไร:**
- **while** — ไม่รู้จำนวนรอบล่วงหน้า เช่น อ่านจนกว่า input จะหมด
- **do-while** — ต้องทำอย่างน้อย 1 รอบ เช่น เมนูให้ user เลือก

\`\`\`cpp
// อ่าน input จนหมด (EOF)
int x;
while (cin >> x) {
    cout << x * 2 << "\\n";
}
\`\`\``,
      },
      {
        type: "quiz",
        id: "CPP-L06-Q1",
        question: "do-while loop แตกต่างจาก while loop อย่างไร?",
        options: [
          "do-while วนได้เร็วกว่า",
          "do-while ทำคำสั่งก่อนเช็คเงื่อนไข จึงทำงานอย่างน้อย 1 รอบเสมอ",
          "do-while ใช้กับตัวเลขเท่านั้น",
          "do-while และ while ทำงานเหมือนกันทุกประการ",
        ],
        correct: 1,
        explanation: "do-while เช็คเงื่อนไขหลังจากทำงานรอบแรกเสร็จ ดังนั้นแม้เงื่อนไขจะเป็น false ตั้งแต่ต้น ก็ยังทำงานอย่างน้อย 1 รอบ",
      },
      {
        type: "quiz",
        id: "CPP-L06-Q2",
        question: "โค้ด `while (cin >> x)` ใน C++ หยุดทำงานเมื่อใด?",
        options: [
          "เมื่อ x มีค่าเป็น 0",
          "เมื่อ x มีค่าติดลบ",
          "เมื่อไม่มี input เหลือแล้ว (EOF)",
          "หลังวน 100 รอบ",
        ],
        correct: 2,
        explanation: "`cin >> x` คืนค่า false เมื่ออ่าน input ไม่ได้ (เช่น EOF หรือ input ผิดประเภท) — เป็น idiom ยอดนิยมในโจทย์ที่ไม่บอกจำนวน input",
      },
      {
        type: "coding",
        id: "CPP-L06-C1",
        instruction: "รับตัวเลขหลายตัวจนกว่าจะรับ 0 (0 ไม่นับ) แล้วแสดงผลรวมของตัวเลขที่รับมาทั้งหมด",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    long long sum = 0;
    int x;
    // วนรับจนกว่า x == 0
    cout << sum << "\\n";
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "3\n5\n2\n0", expectedOutput: "10", label: "3 ตัวเลขก่อนหยุด" },
          { input: "100\n200\n0", expectedOutput: "300", label: "2 ตัวเลข" },
          { input: "0", expectedOutput: "0", label: "หยุดทันที" },
        ],
        hints: [
          "ใช้ while: รับ x แล้วเช็ค if (x == 0) break;",
          "หรือ while (cin >> x && x != 0) { sum += x; }",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L07 — String ใน C++
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L07",
    lang: "cpp" as const,
    order: 7,
    title: "String ใน C++",
    description: "เรียนรู้ string class ใน C++ — length, substr, find, getline, การต่อ string และ char-by-char processing",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## string class ใน C++

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, TOI!";

    cout << s.length() << "\\n";          // 11 (ความยาว)
    cout << s[0] << "\\n";               // H (access ด้วย index)
    cout << s.substr(7, 3) << "\\n";     // TOI (เริ่มที่ index 7 ยาว 3)
    cout << s.find("TOI") << "\\n";      // 7 (position ที่เจอ)

    // ต่อ string
    string a = "Khai";
    string b = " Oracle";
    cout << a + b << "\\n";             // Khai Oracle

    // getline — รับทั้งบรรทัดรวม space
    string line;
    getline(cin, line);
    cout << line << "\\n";
    return 0;
}
\`\`\`

**วนอ่านทีละตัวอักษร:**

\`\`\`cpp
string s = "hello";
for (char c : s) {
    cout << c << " ";   // h e l l o
}
// หรือ
for (int i = 0; i < (int)s.length(); i++) {
    cout << s[i];
}
\`\`\`

> **Tip:** \`s.find()\` คืน \`string::npos\` ถ้าหาไม่เจอ`,
      },
      {
        type: "quiz",
        id: "CPP-L07-Q1",
        question: '`s.substr(2, 4)` เมื่อ s = "abcdefgh" ได้ผลลัพธ์อะไร?',
        options: [
          '"abcd"',
          '"cdef"',
          '"bcde"',
          '"cdefg"',
        ],
        correct: 1,
        explanation: '`substr(start, length)` เริ่มที่ index 2 (ตัว c) ยาว 4 ตัว → "cdef" — index เริ่มที่ 0 ดังนั้น a=0, b=1, c=2',
      },
      {
        type: "quiz",
        id: "CPP-L07-Q2",
        question: "ถ้า `s.find(\"xyz\")` หาไม่เจอ จะคืนค่าอะไรใน C++?",
        options: [
          "-1",
          "0",
          "string::npos",
          "null",
        ],
        correct: 2,
        explanation: '`s.find()` คืน `string::npos` (ซึ่งมีค่าเป็น `size_t` maximum) เมื่อหาไม่เจอ ควรเช็คด้วย `if (pos != string::npos)` ไม่ใช่ `if (pos == -1)`',
      },
      {
        type: "coding",
        id: "CPP-L07-C1",
        instruction: "รับ string 1 บรรทัด แล้วแสดงจำนวนสระภาษาอังกฤษ (a, e, i, o, u — ทั้งตัวพิมพ์เล็กและใหญ่) ในบรรทัดนั้น",
        starterCode: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    int count = 0;
    // วนนับสระ
    cout << count << "\\n";
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "Hello World", expectedOutput: "3", label: "มี e, o, o" },
          { input: "AEIOU", expectedOutput: "5", label: "สระทั้งหมด uppercase" },
          { input: "xyz", expectedOutput: "0", label: "ไม่มีสระ" },
        ],
        hints: [
          "ใช้ for(char c : s) วนทีละตัวอักษร",
          "เช็คด้วย: if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||c=='A'||c=='E'||c=='I'||c=='O'||c=='U')",
          "หรือแปลงเป็น lowercase ก่อน: c = tolower(c)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CPP-L08 — Array และ vector
  // ═══════════════════════════════════════════════════════════════
  {
    id: "CPP-L08",
    lang: "cpp" as const,
    order: 8,
    title: "Array และ vector",
    description: "เรียนรู้ raw array และ vector ใน C++ — push_back, size, sort และ range-based for loop",
    estimatedMinutes: 30,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## Array และ vector ใน C++

**Raw Array — ขนาดคงที่:**
\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    cout << arr[0] << "\\n";  // 10
    arr[2] = 99;              // แก้ค่าได้
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}
\`\`\`

**vector — ขนาดยืดหยุ่น (แนะนำใช้ในโจทย์):**
\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v;
    v.push_back(30);
    v.push_back(10);
    v.push_back(20);

    cout << v.size() << "\\n";  // 3

    sort(v.begin(), v.end());   // เรียงน้อยไปมาก

    for (int x : v) {           // range-based for
        cout << x << " ";       // 10 20 30
    }
    return 0;
}
\`\`\`

**เปรียบเทียบ:**
| | Array | vector |
|---|---|---|
| ขนาด | คงที่ | ยืดหยุ่น |
| push_back | ❌ | ✅ |
| sort | sort(arr, arr+n) | sort(v.begin(), v.end()) |`,
      },
      {
        type: "quiz",
        id: "CPP-L08-Q1",
        question: "คำสั่งใดเพิ่มค่า 42 ต่อท้าย vector<int> ชื่อ v ใน C++?",
        options: [
          "v.add(42)",
          "v.append(42)",
          "v.push_back(42)",
          "v.insert(42)",
        ],
        correct: 2,
        explanation: "`push_back()` เป็นฟังก์ชันมาตรฐานของ vector สำหรับเพิ่มค่าต่อท้าย — เป็นคำสั่งที่ใช้บ่อยที่สุดใน competitive programming",
      },
      {
        type: "quiz",
        id: "CPP-L08-Q2",
        question: "หลัง `sort(v.begin(), v.end())` เมื่อ v = {5, 2, 8, 1} ค่า v[0] คือเท่าไร?",
        options: [
          "5",
          "8",
          "1",
          "2",
        ],
        correct: 2,
        explanation: "`sort(v.begin(), v.end())` เรียงจากน้อยไปมาก ดังนั้น v กลายเป็น {1, 2, 5, 8} และ v[0] = 1 — ถ้าต้องการมากไปน้อยใช้ `sort(v.rbegin(), v.rend())`",
      },
      {
        type: "coding",
        id: "CPP-L08-C1",
        instruction: "รับจำนวนเต็ม n ตามด้วยตัวเลข n ตัว เก็บใน vector แล้วแสดงค่าสูงสุดและค่าต่ำสุด (แต่ละค่าในบรรทัดของตัวเอง)",
        starterCode: {
          cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i];
    }
    // แสดง max และ min
    return 0;
}`,
          c: "",
          python: "",
        },
        testCases: [
          { input: "5\n3 1 4 1 5", expectedOutput: "5\n1", label: "5 ตัวเลข" },
          { input: "3\n10 20 30", expectedOutput: "30\n10", label: "เรียงจากน้อยไปมาก" },
          { input: "1\n42", expectedOutput: "42\n42", label: "ตัวเลขเดียว" },
        ],
        hints: [
          "ใช้ *max_element(v.begin(), v.end()) และ *min_element(v.begin(), v.end())",
          "หรือ sort แล้วดู v.back() และ v[0]",
        ],
      },
    ],
  },

];
