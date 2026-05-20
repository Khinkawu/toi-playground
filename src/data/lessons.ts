export type SectionContent = { type: "content"; markdown: string };
export type SectionQuiz = {
  type: "quiz";
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};
export type SectionCoding = {
  type: "coding";
  id: string;
  instruction: string;
  starterCode: { cpp: string; c: string; python: string };
  testCases: Array<{ input: string; expectedOutput: string; label?: string }>;
  hints?: string[];
};
export type Section = SectionContent | SectionQuiz | SectionCoding;

export type Lang = "c" | "cpp" | "python";

export type Lesson = {
  id: string;
  lang?: Lang;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  sections: Section[];
  relatedProblems: string[];
};

export const LESSONS: Lesson[] = [

  // ═══════════════════════════════════════════════════════════════
  // L00 — โปรแกรมคืออะไร? และโครงสร้างพื้นฐาน
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L00",
    order: 0,
    title: "โปรแกรมคืออะไร? และโครงสร้างพื้นฐาน",
    description: "เริ่มต้นจากศูนย์ — เข้าใจว่าโปรแกรมคืออะไร ภาษา C, C++, Python ต่างกันยังไง และโครงสร้างพื้นฐานของแต่ละภาษา",
    estimatedMinutes: 20,
    relatedProblems: ["A1001"],
    sections: [
      {
        type: "content",
        markdown: `## โปรแกรมคืออะไร?

**โปรแกรม (Program)** คือชุดคำสั่งที่เราเขียนให้คอมพิวเตอร์ทำตาม ทีละขั้น ทีละขั้น เหมือนสูตรทำอาหาร — ถ้าสูตรบอกว่า "ใส่เกลือ 1 ช้อน" คอมพิวเตอร์ก็จะทำแค่นั้น ไม่เพิ่ม ไม่ลด ไม่คิดเองว่าควรใส่เท่าไร

**ภาษาโปรแกรมมิ่ง (Programming Language)** คือ "ภาษา" ที่ใช้เขียนคำสั่งเหล่านั้น เหมือนกับภาษาไทย ภาษาอังกฤษ แต่ไว้คุยกับคอมพิวเตอร์

---

## 3 ภาษาที่เราใช้ในคอร์สนี้

| ภาษา | จุดเด่น | ใช้ทำอะไร |
|------|---------|----------|
| **C** | เร็ว ควบคุมหน่วยความจำได้ | ระบบปฏิบัติการ, embedded systems |
| **C++** | เร็ว + มีเครื่องมือเพิ่ม | competitive programming, เกม, ซอฟต์แวร์ |
| **Python** | เขียนง่าย สั้น | data science, AI, scripting |

ทั้ง 3 ภาษาใช้แก้โจทย์ได้หมด แต่ใน **สอวน.** นิยมใช้ C++ มากที่สุด

---

## Hello World — โปรแกรมแรกใน 3 ภาษา

"Hello World" คือโปรแกรมที่ง่ายที่สุด — แสดงข้อความออกหน้าจอ เป็นประเพณีของนักเขียนโปรแกรมมาตั้งแต่ปี 1974

**ภาษา C:**
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}
\`\`\`

**ภาษา C++:**
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}
\`\`\`

**ภาษา Python:**
\`\`\`python
print("Hello World")
\`\`\`

สังเกตว่า Python สั้นที่สุด — แค่บรรทัดเดียว! แต่ C และ C++ ต้องมีโครงสร้างมากกว่า`,
      },
      {
        type: "content",
        markdown: `## อธิบายทุกบรรทัดของ C และ C++

มาแกะแต่ละบรรทัดของ C++ ให้เข้าใจจริงๆ:

\`\`\`cpp
#include <iostream>      // 1. บอกว่าขอใช้ iostream
using namespace std;     // 2. ย่อชื่อคำสั่ง
                         //
int main() {             // 3. จุดเริ่มต้นของโปรแกรม
    cout << "Hello";     // 4. แสดงผล
    return 0;            // 5. บอกว่าโปรแกรมจบปกติ
}                        // 6. ปิดบล็อก main
\`\`\`

**บรรทัดที่ 1: \`#include <iostream>\`**
- \`#include\` = "ขอยืม" ชุดเครื่องมือมาใช้
- \`<iostream>\` = ชื่อชุดเครื่องมือที่มีคำสั่ง \`cout\` และ \`cin\`
- C ใช้ \`#include <stdio.h>\` แทน ซึ่งมีคำสั่ง \`printf\` และ \`scanf\`
- **ถ้าไม่ include** คอมพิวเตอร์จะไม่รู้จัก cout เลย ต้องใส่ทุกครั้ง!

**บรรทัดที่ 2: \`using namespace std;\`**
- เป็นของ C++ เท่านั้น (C ไม่มี)
- โดยปกติต้องพิมพ์ \`std::cout\` แต่พอใส่บรรทัดนี้ ย่อเป็น \`cout\` ได้เลย

**บรรทัดที่ 3: \`int main() {\`**
- \`main()\` คือ "ประตูทางเข้า" ของโปรแกรม — คอมพิวเตอร์เริ่มทำงานที่นี่เสมอ
- \`int\` ข้างหน้าหมายความว่า main จะส่งค่าตัวเลขกลับ (คือ return 0)
- \`{\` เปิดบล็อก (เหมือนเปิดวงเล็บ ต้องปิดด้วย \`}\`)

**บรรทัดที่ 4: \`cout << "Hello";\`** (C++) หรือ **\`printf("Hello\\n");\`** (C)
- \`cout\` = Console Output = ส่งข้อความออกหน้าจอ
- \`<<\` = ทิศทางของข้อมูล (ไหลจาก \`"Hello"\` ไปที่ \`cout\`)
- \`printf\` ของ C = print formatted, ใช้ \`%d %s %f\` ระบุชนิดข้อมูล
- **ทุกคำสั่งต้องจบด้วย \`;\`** (semicolon) — ถ้าลืม จะ error!

**บรรทัดที่ 5: \`return 0;\`**
- บอกระบบว่า "โปรแกรมจบแล้ว ไม่มี error" (0 = สำเร็จ)
- Python ไม่ต้องมี เพราะจบโปรแกรมเองอัตโนมัติ

---

## โครงสร้างเปรียบเทียบ

| ส่วน | C | C++ | Python |
|------|---|-----|--------|
| นำเข้าเครื่องมือ | \`#include <stdio.h>\` | \`#include <iostream>\` | \`import ...\` (ถ้าต้องการ) |
| จุดเริ่มต้น | \`int main()\` | \`int main()\` | ไม่มี (รันจากบรรทัดแรก) |
| แสดงผล | \`printf("...\\n")\` | \`cout << "..."\` | \`print("...")\` |
| รับข้อมูล | \`scanf("%d", &x)\` | \`cin >> x\` | \`x = input()\` |
| จบโปรแกรม | \`return 0;\` | \`return 0;\` | (อัตโนมัติ) |
| ท้ายทุกคำสั่ง | \`;\` | \`;\` | ไม่มี (ขึ้นบรรทัดใหม่) |`,
      },
      {
        type: "quiz",
        id: "L00Q1",
        question: "ใน C++ คำสั่ง `#include <iostream>` มีหน้าที่ทำอะไร?",
        options: [
          "กำหนดจุดเริ่มต้นของโปรแกรม",
          "นำเข้าชุดเครื่องมือที่มี cout และ cin",
          "แสดงผลข้อความออกหน้าจอ",
          "ประกาศตัวแปร",
        ],
        correct: 1,
        explanation: "`#include <iostream>` คือการ 'ยืม' ชุดเครื่องมือชื่อ iostream มาใช้ ซึ่งข้างในมีคำสั่ง cout (แสดงผล) และ cin (รับข้อมูล) ถ้าไม่มีบรรทัดนี้ คอมพิวเตอร์จะไม่รู้จัก cout เลย",
      },
      {
        type: "quiz",
        id: "L00Q2",
        question: "ข้อใดถูกต้องเกี่ยวกับฟังก์ชัน main() ใน C และ C++?",
        options: [
          "main() ใช้ได้แค่ใน Python เท่านั้น",
          "main() คือจุดเริ่มต้นที่คอมพิวเตอร์เริ่มทำงาน",
          "main() สามารถละไว้ได้ถ้าโปรแกรมสั้น",
          "main() ต้องอยู่ท้ายสุดของไฟล์",
        ],
        correct: 1,
        explanation: "ใน C และ C++ ทุกโปรแกรมต้องมีฟังก์ชัน `main()` เพราะคอมพิวเตอร์จะเริ่มทำงานจากจุดนี้เสมอ ถ้าไม่มีจะ error ส่วน Python ไม่บังคับ เพราะรันจากบรรทัดแรกเลย",
      },
      {
        type: "coding",
        id: "L00C1",
        instruction: "เขียนโปรแกรมแสดงข้อความ `Hello TOI` ออกหน้าจอ\n\nทดลองใช้ทั้ง C++ และ Python ดูว่าต่างกันอย่างไร",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    // แก้ไขบรรทัดนี้ให้แสดง Hello TOI
    cout << "Hello World" << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    /* แก้ไขบรรทัดนี้ให้แสดง Hello TOI */
    printf("Hello World\\n");
    return 0;
}`,
          python: `# แก้ไขบรรทัดนี้ให้แสดง Hello TOI
print("Hello World")`,
        },
        testCases: [
          { input: "", expectedOutput: "Hello TOI", label: "ทดสอบ" },
        ],
        hints: [
          "แก้แค่ข้อความในเครื่องหมายคำพูดเป็น Hello TOI",
          "C++: `cout << \"Hello TOI\" << \"\\n\";`",
          "Python: `print(\"Hello TOI\")`",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L01 — ตัวแปรและชนิดข้อมูล
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L01",
    order: 1,
    title: "ตัวแปรและชนิดข้อมูล",
    description: "ตัวแปรคืออะไร ชนิดข้อมูลใน C/C++/Python มีอะไรบ้าง ใช้เมื่อไร",
    estimatedMinutes: 25,
    relatedProblems: ["A1001", "A1002"],
    sections: [
      {
        type: "content",
        markdown: `## ตัวแปร (Variable) คืออะไร?

**ตัวแปร** คือพื้นที่ในหน่วยความจำที่เราตั้งชื่อขึ้นมา เพื่อเก็บข้อมูล เหมือน **กล่องที่มีป้ายชื่อ**

ลองนึกภาพห้องเก็บของมีกล่อง 3 ใบ:
- กล่องชื่อ "score" ข้างในมีตัวเลข 95
- กล่องชื่อ "name" ข้างในมีข้อความ "สมชาย"
- กล่องชื่อ "passed" ข้างในมีคำตอบว่า true/false

เราสามารถ **เปิดดูค่า** หรือ **เปลี่ยนค่า** ในกล่องได้ตลอดเวลา

---

## ชนิดข้อมูลใน C และ C++

C และ C++ บังคับให้ระบุ "ชนิด" ของกล่องก่อนเสมอ เพราะแต่ละชนิดใช้หน่วยความจำต่างกัน

| ชนิด | เก็บอะไร | ขนาด | ตัวอย่าง |
|------|---------|------|---------|
| \`int\` | เลขจำนวนเต็ม | 4 bytes | \`42\`, \`-7\`, \`0\` |
| \`long long\` | เลขจำนวนเต็มใหญ่มาก | 8 bytes | \`9223372036854775807\` |
| \`float\` | เลขทศนิยม (ความแม่น ~7 หลัก) | 4 bytes | \`3.14f\` |
| \`double\` | เลขทศนิยม (ความแม่นสูง) | 8 bytes | \`3.14159265\` |
| \`char\` | อักขระ 1 ตัว | 1 byte | \`'A'\`, \`'z'\` |
| \`string\` | ข้อความ (C++ เท่านั้น) | แปรผัน | \`"สวัสดี"\` |
| \`bool\` | จริง/เท็จ | 1 byte | \`true\`, \`false\` |

**C ใช้ \`char[]\` แทน string:**
\`\`\`c
char name[50] = "สมชาย";   // C ใช้ array ของ char
\`\`\`

---

## วิธีสร้างตัวแปรใน C และ C++

**รูปแบบ: \`ชนิด ชื่อตัวแปร = ค่าเริ่มต้น;\`**

\`\`\`cpp
// C++ (ใช้ string ได้)
#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 17;               // เลขจำนวนเต็ม
    double gpa = 3.85;          // เลขทศนิยม
    char grade = 'A';           // อักขระ 1 ตัว (ใช้ ' ')
    string name = "สมชาย";     // ข้อความ (ใช้ " ")
    bool isStudent = true;      // จริง/เท็จ

    cout << name << " อายุ " << age << " ปี" << "\\n";
    cout << "GPA: " << gpa << "\\n";
    return 0;
}
\`\`\`

\`\`\`c
// C (ไม่มี string ต้องใช้ char[])
#include <stdio.h>

int main() {
    int age = 17;
    double gpa = 3.85;
    char grade = 'A';
    char name[50] = "สมชาย";   // ต้องระบุขนาด array

    printf("%s อายุ %d ปี\\n", name, age);
    printf("GPA: %.2f\\n", gpa);   // .2f = ทศนิยม 2 ตำแหน่ง
    return 0;
}
\`\`\`

---

## ชนิดข้อมูลใน Python

**Python ไม่ต้องระบุชนิด** — Python เดาให้เองอัตโนมัติ!

\`\`\`python
age = 17           # int (เดาจากตัวเลขที่ไม่มีจุด)
gpa = 3.85         # float (เดาจากจุดทศนิยม)
grade = 'A'        # str (เดาจากเครื่องหมายคำพูด)
name = "สมชาย"    # str
is_student = True  # bool (T ต้องพิมพ์ใหญ่!)

print(name, "อายุ", age, "ปี")
print("GPA:", gpa)
\`\`\`

| ชนิด Python | เทียบกับ C/C++ | ตัวอย่าง |
|------------|--------------|---------|
| \`int\` | \`int\` / \`long long\` | \`42\` |
| \`float\` | \`double\` | \`3.14\` |
| \`str\` | \`string\` / \`char[]\` | \`"hello"\` |
| \`bool\` | \`bool\` | \`True\` / \`False\` |

---

## กฎการตั้งชื่อตัวแปร (ทุกภาษา)

✅ **ถูกต้อง:** \`score\`, \`myAge\`, \`total_sum\`, \`x1\`
❌ **ผิด:** \`1score\` (ขึ้นด้วยตัวเลข), \`my age\` (มีช่องว่าง), \`int\` (เป็น keyword สงวน)

**ข้อควรระวัง:**
- \`int\` เก็บทศนิยมไม่ได้ ถ้าเก็บ \`3.7\` จะได้ \`3\` ทันที!
- C/C++ ตัวเล็กตัวใหญ่ต่างกัน: \`Score\` ≠ \`score\`
- Python bool ใช้ \`True\`/\`False\` (T,F ต้องพิมพ์ใหญ่)`,
      },
      {
        type: "quiz",
        id: "L01Q1",
        question: "ถ้าต้องการเก็บ 'คะแนนสอบ' เป็นเลขจำนวนเต็ม ควรใช้ชนิดข้อมูลใดใน C++?",
        options: ["`double`", "`int`", "`string`", "`char`"],
        correct: 1,
        explanation: "`int` ใช้เก็บเลขจำนวนเต็ม เช่น 0, 42, 100 เหมาะกับคะแนนสอบที่ไม่มีทศนิยม `double` ใช้เมื่อต้องการทศนิยม `string` ใช้เก็บข้อความ `char` ใช้เก็บอักขระ 1 ตัว",
      },
      {
        type: "quiz",
        id: "L01Q2",
        question: "ใน Python ถ้าเขียน `x = 5` แล้วตามด้วย `x = 3.14` ค่าของ x จะเป็นอะไร?",
        options: ["5 (ค่าเดิม)", "3.14 (ค่าใหม่)", "Error เพราะชนิดข้อมูลเปลี่ยน", "5 + 3.14 = 8.14"],
        correct: 1,
        explanation: "Python อนุญาตให้เปลี่ยนชนิดของตัวแปรได้ตลอด x จะมีค่าเป็น 3.14 (ค่าใหม่ทับค่าเก่า) ต่างจาก C/C++ ที่ถ้าประกาศ int x แล้ว x จะเก็บได้แค่ int เท่านั้น",
      },
      {
        type: "coding",
        id: "L01C1",
        instruction: "ประกาศตัวแปร 3 ตัว:\n- `age` เป็นจำนวนเต็ม มีค่า 16\n- `score` เป็นทศนิยม มีค่า 89.5\n- `name` เป็นข้อความ มีค่า \"TOI\"\n\nแล้วแสดงผลตามรูปแบบ:\n```\nชื่อ: TOI\nอายุ: 16\nคะแนน: 89.5\n```",
        starterCode: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // ประกาศตัวแปร 3 ตัว
    int age = ???;
    double score = ???;
    string name = "???";

    cout << "ชื่อ: " << name << "\\n";
    cout << "อายุ: " << age << "\\n";
    cout << "คะแนน: " << score << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    int age = ???;
    double score = ???;
    char name[] = "???";

    printf("ชื่อ: %s\\n", name);
    printf("อายุ: %d\\n", age);
    printf("คะแนน: %.1f\\n", score);
    return 0;
}`,
          python: `age = ???
score = ???
name = "???"

print("ชื่อ:", name)
print("อายุ:", age)
print("คะแนน:", score)`,
        },
        testCases: [
          { input: "", expectedOutput: "ชื่อ: TOI\nอายุ: 16\nคะแนน: 89.5", label: "ทดสอบ" },
        ],
        hints: [
          "แทน ??? ด้วยค่าที่ถูกต้อง: age=16, score=89.5, name=\"TOI\"",
          "C++: `int age = 16;` และ `double score = 89.5;`",
          "Python: `age = 16` และ `score = 89.5` (ไม่ต้องระบุชนิด)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L02 — รับและแสดงผล
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L02",
    order: 2,
    title: "รับและแสดงผล (Input / Output)",
    description: "เรียนรู้ printf/scanf ใน C, cout/cin ใน C++ และ print/input ใน Python พร้อมเปรียบเทียบ",
    estimatedMinutes: 30,
    relatedProblems: ["A1001", "A1003"],
    sections: [
      {
        type: "content",
        markdown: `## การแสดงผล (Output)

### C — ใช้ \`printf()\`

\`printf\` ย่อมาจาก **print formatted** — แสดงผลตามรูปแบบที่กำหนด

\`\`\`c
#include <stdio.h>

int main() {
    int score = 95;
    double gpa = 3.85;
    char name[] = "สมชาย";

    printf("สวัสดี\\n");                    // แสดงข้อความ
    printf("คะแนน: %d\\n", score);          // %d = integer
    printf("GPA: %.2f\\n", gpa);            // %.2f = float 2 ตำแหน่ง
    printf("ชื่อ: %s\\n", name);            // %s = string
    printf("%s คะแนน %d\\n", name, score); // หลายค่าพร้อมกัน
    return 0;
}
\`\`\`

**Format specifiers ที่ใช้บ่อย:**

| Specifier | ใช้กับชนิด | ตัวอย่าง |
|-----------|----------|---------|
| \`%d\` | int | \`printf("%d", 42)\` → \`42\` |
| \`%lld\` | long long | \`printf("%lld", 9999999999LL)\` |
| \`%f\` | float/double | \`printf("%f", 3.14)\` → \`3.140000\` |
| \`%.2f\` | float/double (2 ทศนิยม) | \`printf("%.2f", 3.14)\` → \`3.14\` |
| \`%s\` | char[] | \`printf("%s", "hello")\` → \`hello\` |
| \`%c\` | char | \`printf("%c", 'A')\` → \`A\` |

### C++ — ใช้ \`cout\`

\`cout\` ย่อมาจาก **console output** — ง่ายกว่า printf ไม่ต้องระบุชนิด

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int score = 95;
    double gpa = 3.85;
    string name = "สมชาย";

    cout << "สวัสดี" << "\\n";
    cout << "คะแนน: " << score << "\\n";    // ไม่ต้องใส่ %d
    cout << "GPA: " << gpa << "\\n";        // ไม่ต้องใส่ %f
    cout << "ชื่อ: " << name << "\\n";
    cout << name << " คะแนน " << score << "\\n";  // ต่อกันด้วย <<
    return 0;
}
\`\`\`

**\`endl\` vs \`"\\n"\`:**
- \`endl\` = ขึ้นบรรทัดใหม่ + flush buffer (ช้ากว่า)
- \`"\\n"\` = ขึ้นบรรทัดใหม่อย่างเดียว (เร็วกว่า นิยมใน competitive programming)

### Python — ใช้ \`print()\`

\`\`\`python
score = 95
gpa = 3.85
name = "สมชาย"

print("สวัสดี")
print("คะแนน:", score)       # เว้นวรรคให้อัตโนมัติ
print("GPA:", gpa)
print("ชื่อ:", name)
print(name, "คะแนน", score)  # ต่อหลายค่าด้วย comma
print(f"GPA = {gpa:.2f}")    # f-string: ควบคุมรูปแบบ
\`\`\``,
      },
      {
        type: "content",
        markdown: `## การรับข้อมูล (Input)

### C — ใช้ \`scanf()\`

\`scanf\` ย่อมาจาก **scan formatted** — รับข้อมูลตามชนิดที่ระบุ

\`\`\`c
#include <stdio.h>

int main() {
    int age;
    double salary;
    char name[50];

    scanf("%d", &age);         // & ต้องมีเสมอ! (ยกเว้น array)
    scanf("%lf", &salary);     // double ใช้ %lf ตอน scan
    scanf("%s", name);         // array ไม่ต้องใส่ & เพราะเป็น pointer อยู่แล้ว

    printf("อายุ: %d\\n", age);
    return 0;
}
\`\`\`

⚠️ **ระวัง:** ต้องใส่ \`&\` หน้าตัวแปรเสมอใน scanf (ยกเว้น array/string) ถ้าลืมโปรแกรมจะ crash!

### C++ — ใช้ \`cin\`

\`cin\` ย่อมาจาก **console input** — ง่ายกว่า scanf มาก

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    double salary;
    string name;

    cin >> age;           // ไม่ต้องใส่ & และไม่ต้องระบุ %d
    cin >> salary;        // ง่ายกว่า scanf มาก
    cin >> name;          // รับคำเดียว (หยุดที่ space)

    // รับหลายค่าพร้อมกัน
    int a, b;
    cin >> a >> b;        // รับ 2 ค่าในบรรทัดเดียวกันได้เลย

    cout << "อายุ: " << age << "\\n";
    return 0;
}
\`\`\`

**รับทั้งบรรทัดที่มีช่องว่าง:**
\`\`\`cpp
string fullName;
getline(cin, fullName);   // รับทั้งบรรทัดรวมถึงช่องว่าง
\`\`\`

### Python — ใช้ \`input()\`

\`\`\`python
# รับข้อความ
name = input()            # รับทั้งบรรทัด (เป็น string เสมอ)

# รับตัวเลข ต้องแปลงชนิดด้วย int() หรือ float()
age = int(input())        # แปลงเป็น int
salary = float(input())   # แปลงเป็น float

# รับหลายค่าในบรรทัดเดียว (คั่นด้วย space)
a, b = map(int, input().split())   # รับ 2 int

# รับ n ตัวเลขในบรรทัดเดียวเป็น list
nums = list(map(int, input().split()))
\`\`\`

---

## ตารางเปรียบเทียบ Input/Output

| การทำงาน | C | C++ | Python |
|---------|---|-----|--------|
| แสดงข้อความ | \`printf("Hi\\n")\` | \`cout << "Hi\\n"\` | \`print("Hi")\` |
| แสดงตัวเลข int | \`printf("%d\\n", x)\` | \`cout << x << "\\n"\` | \`print(x)\` |
| รับ int | \`scanf("%d", &x)\` | \`cin >> x\` | \`x = int(input())\` |
| รับ 2 ints | \`scanf("%d %d", &a, &b)\` | \`cin >> a >> b\` | \`a, b = map(int, input().split())\` |
| รับ string | \`scanf("%s", s)\` | \`cin >> s\` | \`s = input()\` |`,
      },
      {
        type: "quiz",
        id: "L02Q1",
        question: "ใน C ถ้าต้องการรับตัวเลขจำนวนเต็มด้วย scanf ข้อใดถูกต้อง?",
        options: [
          "`scanf(\"%d\", x);`",
          "`scanf(\"%d\", &x);`",
          "`cin >> x;`",
          "`x = int(input())`",
        ],
        correct: 1,
        explanation: "ใน C ต้องใส่ `&` หน้าตัวแปรใน scanf เสมอ (ยกเว้น array) เพราะ `&` คือ 'address of' บอก scanf ว่าจะเก็บค่าไว้ที่ตำแหน่งไหนในหน่วยความจำ ถ้าลืม & โปรแกรมจะ crash ทันที `cin >>` เป็นของ C++ ไม่ใช่ C",
      },
      {
        type: "quiz",
        id: "L02Q2",
        question: "ใน Python ถ้าต้องการรับตัวเลข 2 ตัวในบรรทัดเดียว (คั่นด้วย space) เช่น `3 5` ข้อใดถูกต้อง?",
        options: [
          "`a, b = input()`",
          "`a = input(); b = input()`",
          "`a, b = map(int, input().split())`",
          "`scanf(\"%d %d\", &a, &b)`",
        ],
        correct: 2,
        explanation: "`input().split()` แยก string ด้วย space ได้ `['3', '5']` แล้ว `map(int, ...)` แปลงแต่ละตัวเป็น int และ `a, b = ...` แยกค่า ผล: a=3, b=5 นิยมมากใน Python competitive programming",
      },
      {
        type: "coding",
        id: "L02C1",
        instruction: "รับชื่อ 1 คำ แล้วแสดง `Hello [ชื่อ]`\n\nตัวอย่าง: รับ `Somchai` → แสดง `Hello Somchai`",
        starterCode: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cin >> name;
    cout << "Hello " << name << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    char name[100];
    scanf("%s", name);
    printf("Hello %s\\n", name);
    return 0;
}`,
          python: `name = input()
print("Hello", name)`,
        },
        testCases: [
          { input: "Somchai", expectedOutput: "Hello Somchai", label: "ชื่อไทย" },
          { input: "Alice", expectedOutput: "Hello Alice", label: "ชื่ออังกฤษ" },
          { input: "Bank", expectedOutput: "Hello Bank", label: "ชื่อสั้น" },
        ],
        hints: [
          "C++: `string name; cin >> name; cout << \"Hello \" << name << \"\\n\";`",
          "C: `char name[100]; scanf(\"%s\", name); printf(\"Hello %s\\n\", name);`",
          "Python: `name = input(); print(\"Hello\", name)`",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L03 — การคำนวณและตัวดำเนินการ
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L03",
    order: 3,
    title: "การคำนวณและตัวดำเนินการ",
    description: "บวก ลบ คูณ หาร เศษ ใน C/C++/Python พร้อมกับดักการหาร int ที่ผิดพลาดได้ง่าย",
    estimatedMinutes: 25,
    relatedProblems: ["A1002", "A1005"],
    sections: [
      {
        type: "content",
        markdown: `## ตัวดำเนินการทางคณิตศาสตร์

ทั้ง C, C++, Python ใช้สัญลักษณ์เหมือนกันเกือบหมด ยกเว้น 2 อย่าง

| ตัวดำเนินการ | ความหมาย | C/C++ | Python | ตัวอย่าง |
|------------|---------|-------|--------|---------|
| \`+\` | บวก | ✅ | ✅ | \`5 + 3 = 8\` |
| \`-\` | ลบ | ✅ | ✅ | \`5 - 3 = 2\` |
| \`*\` | คูณ | ✅ | ✅ | \`5 * 3 = 15\` |
| \`/\` | หาร | ✅ (ตัดทศนิยมถ้า int) | ✅ (ได้ทศนิยมเสมอ) | \`7/2\` → C: \`3\`, Python: \`3.5\` |
| \`//\` | หารเอาผลจำนวนเต็ม | ❌ (ใช้ \`/\` กับ int) | ✅ | Python: \`7//2 = 3\` |
| \`%\` | เศษจากการหาร | ✅ | ✅ | \`7 % 2 = 1\` |
| \`**\` | ยกกำลัง | ❌ (ต้องใช้ \`pow()\`) | ✅ | Python: \`2**3 = 8\` |

---

## กับดักใหญ่: การหาร int ใน C และ C++

**นี่คือสิ่งที่มือใหม่พลาดมากที่สุด!**

เมื่อ \`int\` หารด้วย \`int\` ใน C/C++ → ผลลัพธ์จะ **ตัดทศนิยมทิ้ง** ทันที (ไม่ใช่ปัดเศษ)

\`\`\`cpp
int a = 7, b = 2;
cout << a / b << "\\n";   // ได้ 3 ไม่ใช่ 3.5!
cout << 7 / 2 << "\\n";   // ได้ 3
cout << -7 / 2 << "\\n";  // ได้ -3 (ตัดทศนิยมทิ้ง ไม่ใช่ -4)
\`\`\`

**วิธีแก้ — ถ้าต้องการทศนิยม:**
\`\`\`cpp
// วิธีที่ 1: ประกาศเป็น double
double a = 7, b = 2;
cout << a / b << "\\n";   // ได้ 3.5 ✅

// วิธีที่ 2: cast (แปลง) ชั่วคราว
int a = 7, b = 2;
cout << (double)a / b << "\\n";   // ได้ 3.5 ✅
cout << 1.0 * a / b << "\\n";     // ได้ 3.5 ✅ (คูณ 1.0 ก่อน)
\`\`\`

**Python ต่างกัน:** \`/\` ให้ทศนิยมเสมอ ถ้าต้องการ int ต้องใช้ \`//\`
\`\`\`python
print(7 / 2)    # 3.5 (เสมอ)
print(7 // 2)   # 3 (ตัดทศนิยม)
\`\`\`

---

## Modulo (%) — เศษจากการหาร

\`%\` หาเศษ มีประโยชน์มากในการแข่งขัน:

\`\`\`cpp
cout << 7 % 2 << "\\n";    // 1 (7 = 2×3 + 1)
cout << 10 % 3 << "\\n";   // 1 (10 = 3×3 + 1)
cout << 15 % 5 << "\\n";   // 0 (15 = 5×3 + 0) → หารลงตัว!
\`\`\`

**ตัวอย่างการใช้ %:**
\`\`\`cpp
// ตรวจเลขคู่/คี่
if (n % 2 == 0) cout << "คู่\\n";
else cout << "คี่\\n";

// แตกเหรียญ: เงิน 37 บาท ได้เหรียญ 10 กี่เหรียญ?
int coins10 = 37 / 10;    // = 3 (ตัดทศนิยม)
int remain  = 37 % 10;    // = 7 (เศษที่เหลือ)
\`\`\`

---

## ตัวดำเนินการย่อ (Compound Assignment)

| เขียนยาว | เขียนย่อ | ความหมาย |
|---------|---------|---------|
| \`x = x + 5\` | \`x += 5\` | บวกแล้วเก็บกลับ |
| \`x = x - 3\` | \`x -= 3\` | ลบแล้วเก็บกลับ |
| \`x = x * 2\` | \`x *= 2\` | คูณแล้วเก็บกลับ |
| \`x = x + 1\` | \`x++\` | เพิ่มทีละ 1 (C/C++) |
| \`x = x - 1\` | \`x--\` | ลดทีละ 1 (C/C++) |

Python ไม่มี \`x++\` ต้องใช้ \`x += 1\` แทน`,
      },
      {
        type: "quiz",
        id: "L03Q1",
        question: "ใน C++ ถ้า `int a = 10, b = 3;` แล้ว `a / b` มีค่าเท่าไร?",
        options: ["3.333...", "3", "4", "Error"],
        correct: 1,
        explanation: "ใน C/C++ เมื่อ int หารด้วย int ผลลัพธ์จะเป็น int โดยตัดทศนิยมทิ้ง ดังนั้น 10/3 = 3 (ไม่ใช่ 3.33) ถ้าต้องการ 3.33 ต้องใช้ `(double)a / b` หรือประกาศ a หรือ b เป็น double",
      },
      {
        type: "quiz",
        id: "L03Q2",
        question: "ผลของ `17 % 5` คืออะไร?",
        options: ["3", "2", "5", "0"],
        correct: 1,
        explanation: "17 % 5 หาเศษจากการหาร: 17 = 5×3 + 2 ดังนั้นเศษ = 2 สูตรคิด: ลบทวีคูณของ b ที่มากที่สุดที่ไม่เกิน a: 17 - 15 = 2",
      },
      {
        type: "coding",
        id: "L03C1",
        instruction: "รับจำนวนเต็ม 2 จำนวน a และ b (บรรทัดเดียวคั่น space)\nแสดงผล 5 บรรทัด: ผลรวม, ผลต่าง, ผลคูณ, ผลหาร(จำนวนเต็ม), เศษ\n\nInput: `10 3` → Output:\n```\n13\n7\n30\n3\n1\n```",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << "\\n";
    cout << a - b << "\\n";
    cout << a * b << "\\n";
    cout << a / b << "\\n";
    cout << a % b << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a + b);
    printf("%d\\n", a - b);
    printf("%d\\n", a * b);
    printf("%d\\n", a / b);
    printf("%d\\n", a % b);
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
          "C: ใช้ scanf(\"%d %d\", &a, &b) รับ 2 ค่า",
          "C++: ใช้ cin >> a >> b",
          "Python: ใช้ a, b = map(int, input().split())",
          "Python หารจำนวนเต็มต้องใช้ // ไม่ใช่ /",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L04 — เงื่อนไข if / else if / else
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L04",
    order: 4,
    title: "เงื่อนไข if / else if / else",
    description: "เขียนโปรแกรมที่ตัดสินใจได้ — ตัวดำเนินการเปรียบเทียบ, AND, OR, NOT ใน 3 ภาษา",
    estimatedMinutes: 30,
    relatedProblems: ["A1007", "A1008", "A1009", "A1010"],
    sections: [
      {
        type: "content",
        markdown: `## if/else — โปรแกรมที่ตัดสินใจได้

ในชีวิตจริงเราตัดสินใจตลอดเวลา: "ถ้าฝนตกก็กางร่ม ไม่งั้นก็ไม่ต้องกาง"

ใน C, C++ ใช้ \`if/else\` และ Python ใช้ \`if/elif/else\` (ไม่มี \`else if\`)

**โครงสร้างใน C และ C++:**
\`\`\`cpp
if (เงื่อนไข) {
    // ทำเมื่อเงื่อนไขจริง (true)
} else if (เงื่อนไขอื่น) {
    // ทำเมื่อเงื่อนไขแรกเท็จ แต่อันนี้จริง
} else {
    // ทำเมื่อไม่มีเงื่อนไขใดเป็นจริง
}
\`\`\`

**โครงสร้างใน Python:**
\`\`\`python
if เงื่อนไข:
    # ทำเมื่อเงื่อนไขจริง (indent 4 spaces)
elif เงื่อนไขอื่น:    # Python ใช้ elif ไม่ใช่ else if
    # ทำเมื่อเงื่อนไขแรกเท็จ
else:
    # ทำเมื่อไม่มีเงื่อนไขใดเป็นจริง
\`\`\`

⚠️ **Python ใช้ Indentation (ย่อหน้า) แทน {}** — ถ้า indent ผิดโปรแกรมจะ error!

---

## ตัวดำเนินการเปรียบเทียบ

ใช้เหมือนกันทุกภาษา:

| ตัวดำเนินการ | ความหมาย | ตัวอย่าง |
|------------|---------|---------|
| \`==\` | เท่ากัน | \`a == b\` |
| \`!=\` | ไม่เท่ากัน | \`a != b\` |
| \`<\` | น้อยกว่า | \`a < b\` |
| \`>\` | มากกว่า | \`a > b\` |
| \`<=\` | น้อยกว่าหรือเท่ากัน | \`a <= 100\` |
| \`>=\` | มากกว่าหรือเท่ากัน | \`score >= 80\` |

⚠️ **\`==\` คือเปรียบเทียบ, \`=\` คือกำหนดค่า — ต่างกันมาก!**

---

## ตัวดำเนินการตรรกะ

| ความหมาย | C / C++ | Python |
|---------|---------|--------|
| AND (และ — ทั้งสองต้องจริง) | \`&&\` | \`and\` |
| OR (หรือ — อย่างน้อยหนึ่งอันต้องจริง) | \`\|\|\` | \`or\` |
| NOT (ไม่ — กลับจริงเป็นเท็จ) | \`!\` | \`not\` |

\`\`\`cpp
// C++
if (age >= 18 && age <= 60) { cout << "วัยทำงาน\\n"; }
if (score < 0 || score > 100) { cout << "คะแนนไม่ถูกต้อง\\n"; }
\`\`\`

\`\`\`python
# Python
if age >= 18 and age <= 60:
    print("วัยทำงาน")
if score < 0 or score > 100:
    print("คะแนนไม่ถูกต้อง")
\`\`\`

---

## ตัวอย่าง: ตรวจเกรดใน 3 ภาษา

\`\`\`c
// C
int score;
scanf("%d", &score);
if (score >= 80) printf("A\\n");
else if (score >= 70) printf("B\\n");
else if (score >= 60) printf("C\\n");
else printf("F\\n");
\`\`\`

\`\`\`cpp
// C++
int score;
cin >> score;
if (score >= 80) cout << "A\\n";
else if (score >= 70) cout << "B\\n";
else if (score >= 60) cout << "C\\n";
else cout << "F\\n";
\`\`\`

\`\`\`python
# Python
score = int(input())
if score >= 80:
    print("A")
elif score >= 70:
    print("B")
elif score >= 60:
    print("C")
else:
    print("F")
\`\`\`

**หลักการ:** if/else if ตรวจจากบนลงล่าง พอเจอเงื่อนไขแรกที่จริงก็หยุดทันที`,
      },
      {
        type: "quiz",
        id: "L04Q1",
        question: "ใน Python คำสั่งที่ใช้แทน `else if` ใน C++ คือข้อใด?",
        options: ["`else if`", "`elseif`", "`elif`", "`or if`"],
        correct: 2,
        explanation: "Python ใช้ `elif` (ย่อจาก else if) ไม่ใช่ `else if` แบบ C/C++ นี่เป็นความแตกต่างที่สำคัญ ถ้าเขียน `else if` ใน Python จะ error",
      },
      {
        type: "quiz",
        id: "L04Q2",
        question: "โค้ด C++ ต่อไปนี้จะแสดงผลอะไร เมื่อ score = 75?\n```cpp\nif (score >= 80) cout << \"A\";\nelse if (score >= 70) cout << \"B\";\nelse if (score >= 60) cout << \"C\";\nelse cout << \"F\";\n```",
        options: ["A", "B", "C", "F"],
        correct: 1,
        explanation: "75 ไม่ผ่าน score >= 80 (เท็จ) แต่ผ่าน score >= 70 (75 >= 70 = จริง) จึงแสดง B แล้วหยุด ไม่ตรวจเงื่อนไขที่เหลืออีก",
      },
      {
        type: "coding",
        id: "L04C1",
        instruction: "รับจำนวนเต็ม n หนึ่งจำนวน\nถ้า n หารด้วย 2 ลงตัว → แสดง `EVEN`\nถ้าไม่ใช่ → แสดง `ODD`\n\nInput: `4` → `EVEN` | Input: `7` → `ODD`",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) {
        cout << "EVEN\\n";
    } else {
        cout << "ODD\\n";
    }
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    if (n % 2 == 0) {
        printf("EVEN\\n");
    } else {
        printf("ODD\\n");
    }
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
          "ใช้ % 2 ตรวจว่าหารด้วย 2 ลงตัวไหม",
          "ถ้า n % 2 == 0 → เลขคู่ (EVEN)",
          "ถ้า n % 2 != 0 → เลขคี่ (ODD)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L05 — วนซ้ำด้วย for
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L05",
    order: 5,
    title: "วนซ้ำด้วย for loop",
    description: "for loop ใน C/C++/Python — ทำสิ่งเดิมซ้ำๆ ลดโค้ดซ้ำซ้อน",
    estimatedMinutes: 30,
    relatedProblems: ["A1013", "A1014", "A1015", "A1016"],
    sections: [
      {
        type: "content",
        markdown: `## ทำไมต้องมี Loop?

ถ้าต้องพิมพ์ตัวเลข 1 ถึง 1000 — จะเขียน \`cout << 1\`, \`cout << 2\`, ... 1000 บรรทัดไหม?

**Loop (การวนซ้ำ)** แก้ปัญหานี้ด้วยการให้โปรแกรมทำสิ่งเดิมซ้ำๆ โดยอัตโนมัติ

---

## for loop ใน C และ C++

\`\`\`
for (ตั้งค่าเริ่มต้น; เงื่อนไขหยุด; การอัพเดต) {
    // โค้ดที่วนซ้ำ
}
\`\`\`

**ตัวอย่าง: พิมพ์ 1 ถึง 5**

\`\`\`cpp
for (int i = 1; i <= 5; i++) {
    cout << i << "\\n";
}
// Output: 1 2 3 4 5 (แต่ละตัวแยกบรรทัด)
\`\`\`

ลำดับการทำงาน:
1. \`int i = 1\` — ตั้งค่าเริ่มต้น (ทำแค่ครั้งเดียว)
2. ตรวจ \`i <= 5\` — ถ้าจริงทำโค้ดข้างใน, ถ้าเท็จออกจาก loop
3. ทำโค้ดข้างใน (พิมพ์ i)
4. \`i++\` — เพิ่ม i ทีละ 1
5. กลับไปข้อ 2

---

## for loop ใน Python

Python ใช้ \`range()\` แทนการกำหนด i เอง:

\`\`\`python
# พิมพ์ 1 ถึง 5
for i in range(1, 6):    # range(เริ่ม, หยุดก่อน)
    print(i)

# range(5) = 0,1,2,3,4 (เริ่มจาก 0, หยุดก่อน 5)
for i in range(5):
    print(i)

# range(1, 10, 2) = 1,3,5,7,9 (step 2)
for i in range(1, 10, 2):
    print(i)
\`\`\`

---

## เปรียบเทียบ for loop ทั้ง 3 ภาษา

**พิมพ์ 1 ถึง n:**

\`\`\`c
// C
for (int i = 1; i <= n; i++) {
    printf("%d\\n", i);
}
\`\`\`

\`\`\`cpp
// C++
for (int i = 1; i <= n; i++) {
    cout << i << "\\n";
}
\`\`\`

\`\`\`python
# Python
for i in range(1, n + 1):
    print(i)
\`\`\`

---

## Pattern ที่ใช้บ่อยใน loop

**สะสมผลรวม:**
\`\`\`cpp
int sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;   // sum = sum + i
}
cout << sum << "\\n";
\`\`\`

**หาค่ามากที่สุด:**
\`\`\`cpp
int maxVal = arr[0];
for (int i = 1; i < n; i++) {
    if (arr[i] > maxVal) maxVal = arr[i];
}
\`\`\`

**for loop ซ้อนกัน (Nested):**
\`\`\`cpp
// ตาราง 3×3
for (int i = 1; i <= 3; i++) {       // loop นอก: แถว
    for (int j = 1; j <= 3; j++) {   // loop ใน: คอลัมน์
        cout << i * j << " ";
    }
    cout << "\\n";
}
// Output:
// 1 2 3
// 2 4 6
// 3 6 9
\`\`\``,
      },
      {
        type: "quiz",
        id: "L05Q1",
        question: "Python `range(2, 8, 2)` จะให้ค่าอะไรบ้าง?",
        options: [
          "2, 4, 6, 8",
          "2, 4, 6",
          "2, 3, 4, 5, 6, 7",
          "1, 3, 5, 7",
        ],
        correct: 1,
        explanation: "range(start, stop, step) = range(2, 8, 2) เริ่มจาก 2 เพิ่มทีละ 2 หยุดก่อน 8 → ได้ 2, 4, 6 (8 ไม่รวม เพราะ stop คือ 'หยุดก่อน')",
      },
      {
        type: "quiz",
        id: "L05Q2",
        question: "ใน C++ `for (int i = 0; i < 5; i++)` วนกี่รอบ?",
        options: ["4 รอบ", "5 รอบ", "6 รอบ", "ไม่จำกัด"],
        correct: 1,
        explanation: "i มีค่า 0, 1, 2, 3, 4 รวม 5 ค่า = 5 รอบ สูตรจำ: `i < n` เริ่มจาก 0 = n รอบ, `i <= n` เริ่มจาก 1 = n รอบ",
      },
      {
        type: "coding",
        id: "L05C1",
        instruction: "รับจำนวนเต็ม n (n ≥ 1)\nพิมพ์ตัวเลข 1 ถึง n แต่ละตัวในบรรทัดใหม่\n\nInput: `5` → Output:\n```\n1\n2\n3\n4\n5\n```",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cout << i << "\\n";
    }
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        printf("%d\\n", i);
    }
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
          "C++: for (int i = 1; i <= n; i++) { cout << i << \"\\n\"; }",
          "C: for (int i = 1; i <= n; i++) { printf(\"%d\\n\", i); }",
          "Python: for i in range(1, n + 1): print(i)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L06 — while loop, break, continue
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L06",
    order: 6,
    title: "while loop, break และ continue",
    description: "วนซ้ำเมื่อไม่รู้จำนวนรอบด้วย while และควบคุม loop ด้วย break/continue",
    estimatedMinutes: 30,
    relatedProblems: ["A1017", "A1018", "A1019", "A1020"],
    sections: [
      {
        type: "content",
        markdown: `## while loop — วนซ้ำตามเงื่อนไข

บางครั้งเราไม่รู้ว่าจะวนกี่รอบ เช่น "วนรับตัวเลขจนกว่าจะได้ 0"
ในกรณีนี้ \`while\` เหมาะกว่า \`for\`

**C และ C++:**
\`\`\`cpp
while (เงื่อนไข) {
    // วนซ้ำตราบที่เงื่อนไขเป็นจริง
}
\`\`\`

**Python:**
\`\`\`python
while เงื่อนไข:
    # วนซ้ำ (indent 4 spaces)
\`\`\`

---

## ตัวอย่าง while loop ใน 3 ภาษา

**รับตัวเลขจนกว่าจะได้ 0:**

\`\`\`c
// C
int n;
scanf("%d", &n);
while (n != 0) {
    printf("%d\\n", n);
    scanf("%d", &n);
}
\`\`\`

\`\`\`cpp
// C++
int n;
cin >> n;
while (n != 0) {
    cout << n << "\\n";
    cin >> n;
}
\`\`\`

\`\`\`python
# Python
n = int(input())
while n != 0:
    print(n)
    n = int(input())
\`\`\`

---

## for vs while — ใช้อันไหน?

| ใช้ \`for\` เมื่อ | ใช้ \`while\` เมื่อ |
|----------------|-----------------|
| รู้จำนวนรอบล่วงหน้า | ไม่รู้จำนวนรอบ |
| วน 1 ถึง n | วนจนกว่าจะพบเงื่อนไข |
| วนผ่าน array/list | รับ input จนกว่าจะหยุด |

---

## break — หยุด loop ทันที

\`\`\`cpp
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;        // หยุดที่ i=5
    cout << i << " ";          // พิมพ์ 1 2 3 4
}
\`\`\`

\`\`\`python
for i in range(1, 11):
    if i == 5:
        break
    print(i, end=" ")   # 1 2 3 4
\`\`\`

## continue — ข้ามรอบนี้ ไปรอบถัดไป

\`\`\`cpp
for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;     // ข้ามรอบที่ i=3
    cout << i << " ";          // พิมพ์ 1 2 4 5 (ไม่มี 3)
}
\`\`\`

\`\`\`python
for i in range(1, 6):
    if i == 3:
        continue
    print(i, end=" ")   # 1 2 4 5
\`\`\`

---

## do-while — ทำก่อนแล้วค่อยตรวจ (C/C++ เท่านั้น)

\`do-while\` ต่างจาก \`while\` ตรงที่ทำโค้ดอย่างน้อย **1 ครั้งเสมอ** แม้เงื่อนไขเท็จตั้งแต่ต้น

\`\`\`cpp
int n;
do {
    cin >> n;           // รับ input ก่อน
} while (n < 0);        // ถ้า n < 0 รับใหม่

// Python ไม่มี do-while ต้องจำลอง:
// while True:
//     n = int(input())
//     if n >= 0: break
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
          "วน loop ใหม่จากต้น",
        ],
        correct: 2,
        explanation: "`break` ออกจาก loop ทันที โปรแกรมไปทำคำสั่งหลัง loop เลย ส่วน `continue` คือข้ามรอบปัจจุบันแล้วไปรอบถัดไป และ `return` คือออกจากฟังก์ชัน",
      },
      {
        type: "coding",
        id: "L06C1",
        instruction: "รับจำนวนเต็ม n\nหาผลรวมของ 1 + 2 + ... + n\n\nInput: `5` → Output: `15` (1+2+3+4+5=15)",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    int i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    cout << sum << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int sum = 0;
    int i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    printf("%d\\n", sum);
    return 0;
}`,
          python: `n = int(input())
total = 0
i = 1
while i <= n:
    total += i
    i += 1
print(total)`,
        },
        testCases: [
          { input: "5", expectedOutput: "15", label: "1+2+3+4+5=15" },
          { input: "1", expectedOutput: "1", label: "n=1" },
          { input: "10", expectedOutput: "55", label: "1+...+10=55" },
          { input: "100", expectedOutput: "5050", label: "n=100" },
        ],
        hints: [
          "ตั้งต้น: sum = 0, i = 1",
          "วนจนกว่า i > n: sum += i, แล้ว i++",
          "Python: ใช้ i += 1 แทน i++ (Python ไม่มี ++)",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L07 — String และการจัดการข้อความ
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L07",
    order: 7,
    title: "String และการจัดการข้อความ",
    description: "การเข้าถึงอักขระ, ความยาว, ตัดและต่อ string ใน C/C++/Python",
    estimatedMinutes: 30,
    relatedProblems: ["A1001", "A1021", "A1022", "A1023"],
    sections: [
      {
        type: "content",
        markdown: `## String คืออะไร?

**String** คือลำดับของอักขระต่อกัน เหมือนสายสร้อยที่แต่ละลูกคืออักขระ 1 ตัว

\`\`\`
"Hello"
 H e l l o
 0 1 2 3 4    ← index (ตำแหน่ง) เริ่มจาก 0 เสมอ!
\`\`\`

---

## String ใน C — ใช้ char[]

C ไม่มี string type ต้องใช้ **array ของ char** แทน

\`\`\`c
#include <stdio.h>
#include <string.h>   // ต้อง include เพื่อใช้ strlen, strcpy ฯลฯ

int main() {
    char s[50] = "Hello";

    printf("ความยาว: %lu\\n", strlen(s));    // 5
    printf("ตัวแรก: %c\\n", s[0]);           // H
    printf("ตัวสุดท้าย: %c\\n", s[strlen(s)-1]);  // o

    // วนซ้ำ
    for (int i = 0; i < strlen(s); i++) {
        printf("%c\\n", s[i]);
    }
    return 0;
}
\`\`\`

**ฟังก์ชัน string ของ C (ต้อง include <string.h>):**
| ฟังก์ชัน | หน้าที่ | ตัวอย่าง |
|---------|---------|---------|
| \`strlen(s)\` | ความยาว | \`strlen("Hello") = 5\` |
| \`strcpy(dst, src)\` | คัดลอก | \`strcpy(a, b)\` คัดลอก b ไป a |
| \`strcat(dst, src)\` | ต่อกัน | \`strcat(a, b)\` ต่อ b ท้าย a |
| \`strcmp(a, b)\` | เปรียบเทียบ | 0=เท่ากัน, <0 หรือ >0=ไม่เท่า |

---

## String ใน C++

C++ มี \`string\` type ที่ใช้งานง่ายกว่ามาก:

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello World";

    cout << s.length() << "\\n";      // 11 (ความยาว)
    cout << s[0] << "\\n";            // H (ตัวแรก)
    cout << s[s.length()-1] << "\\n"; // d (ตัวสุดท้าย)

    // substr(ตำแหน่งเริ่ม, จำนวนตัว)
    cout << s.substr(0, 5) << "\\n";  // Hello
    cout << s.substr(6) << "\\n";     // World (ถึงท้าย)

    // ต่อ string ด้วย +
    string a = "Hello";
    string b = " World";
    string c = a + b;    // "Hello World"

    // เปรียบเทียบ
    if (a == "Hello") cout << "เท่ากัน\\n";

    // วนซ้ำ
    for (char ch : s) {
        cout << ch << " ";
    }
    return 0;
}
\`\`\`

---

## String ใน Python

Python ทำได้ง่ายและมีฟีเจอร์เยอะมาก:

\`\`\`python
s = "Hello World"

print(len(s))         # 11
print(s[0])           # H
print(s[-1])          # d (index ติดลบ: นับจากท้าย!)
print(s[0:5])         # Hello (slicing)
print(s[6:])          # World
print(s[::-1])        # dlroW olleH (กลับหลัง!)

# ต่อ string
a = "Hello"
b = " World"
c = a + b             # "Hello World"

# ทำซ้ำ
print("Ha" * 3)       # HaHaHa

# ฟังก์ชัน string ของ Python
print("hello".upper())       # HELLO
print("HELLO".lower())       # hello
print("  hello  ".strip())   # hello (ตัด space)
print("a,b,c".split(","))    # ['a', 'b', 'c']
\`\`\`

**Index ติดลบ (Python เท่านั้น):**
- \`s[-1]\` = ตัวสุดท้าย (เหมือน \`s[len(s)-1]\`)
- \`s[-2]\` = ตัวก่อนสุดท้าย`,
      },
      {
        type: "quiz",
        id: "L07Q1",
        question: "ถ้า `s = \"Thailand\"` แล้ว `s[0]` และตัวสุดท้ายคืออะไร?",
        options: ["T และ d", "T และ n", "h และ d", "1 และ 8"],
        correct: 0,
        explanation: "\"Thailand\" มี 8 ตัวอักษร: T-h-a-i-l-a-n-d  index 0 = 'T' (ตัวแรก)  ตัวสุดท้าย index 7 (หรือ length-1) = 'd'  จำ: index เริ่มจาก 0 เสมอ!",
      },
      {
        type: "coding",
        id: "L07C1",
        instruction: "รับ string 1 คำ\nพิมพ์อักษรตัวแรกในบรรทัดที่ 1\nพิมพ์อักษรตัวสุดท้ายในบรรทัดที่ 2\n\nInput: `Hello` → Output:\n```\nH\no\n```",
        starterCode: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    cout << s[0] << "\\n";
    cout << s[s.length()-1] << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[200];
    scanf("%s", s);
    printf("%c\\n", s[0]);
    printf("%c\\n", s[strlen(s)-1]);
    return 0;
}`,
          python: `s = input()
print(s[0])
print(s[-1])`,
        },
        testCases: [
          { input: "Hello", expectedOutput: "H\no", label: "Hello" },
          { input: "Thailand", expectedOutput: "T\nd", label: "Thailand" },
          { input: "A", expectedOutput: "A\nA", label: "1 ตัว" },
          { input: "programming", expectedOutput: "p\ng", label: "programming" },
        ],
        hints: [
          "C++: s[0] = ตัวแรก, s[s.length()-1] = ตัวสุดท้าย",
          "C: s[0] = ตัวแรก, s[strlen(s)-1] = ตัวสุดท้าย",
          "Python: s[0] = ตัวแรก, s[-1] = ตัวสุดท้าย",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // L08 — Array และลำดับข้อมูล
  // ═══════════════════════════════════════════════════════════════
  {
    id: "L08",
    order: 8,
    title: "Array และลำดับข้อมูล",
    description: "Array ใน C/C++ และ List ใน Python — เก็บข้อมูลหลายค่า หา max/min วนซ้ำ",
    estimatedMinutes: 35,
    relatedProblems: ["A2003", "A2004", "A2005"],
    sections: [
      {
        type: "content",
        markdown: `## Array คืออะไร?

แทนที่จะประกาศ \`score1, score2, score3, ..., score100\` แยกกัน เราใช้ **Array** เก็บค่าทั้งหมดในชื่อเดียว

ลองนึกภาพ **ชั้นวางสินค้าที่มีหมายเลขช่อง**:
- ช่อง 0: 85
- ช่อง 1: 92
- ช่อง 2: 78
- ช่อง 3: 95

---

## Array ใน C และ C++

**ประกาศ:** \`ชนิด ชื่อ[ขนาด];\`

\`\`\`c
// C และ C++ ใช้ syntax เหมือนกัน
int scores[5] = {85, 92, 78, 95, 88};
//  index:        0   1   2   3   4

// เข้าถึงค่า
printf("%d\\n", scores[0]);   // 85
printf("%d\\n", scores[3]);   // 95

// กำหนดค่าใหม่
scores[2] = 80;

// ประกาศขนาดใหญ่ไว้ก่อน รับ n ค่า
int n;
scanf("%d", &n);
int arr[1000];
for (int i = 0; i < n; i++) {
    scanf("%d", &arr[i]);
}
\`\`\`

⚠️ **ระวัง:** array ขนาด 5 ใช้ index 0-4 เท่านั้น การเข้าถึง arr[5] จะ error หรือ undefined behavior!

---

## List ใน Python (เทียบเท่า Array)

Python ใช้ **list** แทน array — ยืดหยุ่นกว่าและใช้งานง่ายกว่า:

\`\`\`python
# สร้าง list
scores = [85, 92, 78, 95, 88]

# เข้าถึงค่า
print(scores[0])    # 85
print(scores[-1])   # 88 (ตัวสุดท้าย)

# รับ n ค่าจาก input (1 บรรทัด คั่น space)
n = int(input())
nums = list(map(int, input().split()))

# ฟังก์ชัน built-in ที่สะดวก
print(len(nums))    # จำนวนสมาชิก
print(max(nums))    # ค่ามากสุด
print(min(nums))    # ค่าน้อยสุด
print(sum(nums))    # ผลรวม
nums.append(99)     # เพิ่มค่าท้าย list
\`\`\`

---

## วนซ้ำกับ Array

\`\`\`cpp
// C++: วน n ค่า
int arr[5] = {3, 1, 4, 1, 5};
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}

// C++: range-based for (C++11)
for (int x : arr) {
    cout << x << " ";
}
\`\`\`

\`\`\`python
# Python: วน list
nums = [3, 1, 4, 1, 5]
for x in nums:
    print(x)

# วนพร้อม index
for i, x in enumerate(nums):
    print(i, x)
\`\`\`

---

## หาค่า Max/Min ด้วย Loop

\`\`\`cpp
int arr[] = {3, 1, 4, 1, 5};
int n = 5;

int maxVal = arr[0];    // สมมติว่าตัวแรกเป็น max
int minVal = arr[0];    // สมมติว่าตัวแรกเป็น min

for (int i = 1; i < n; i++) {
    if (arr[i] > maxVal) maxVal = arr[i];
    if (arr[i] < minVal) minVal = arr[i];
}

cout << "Max = " << maxVal << "\\n";   // 5
cout << "Min = " << minVal << "\\n";   // 1
\`\`\`

\`\`\`python
nums = [3, 1, 4, 1, 5]
print("Max =", max(nums))   # Python มี built-in max/min
print("Min =", min(nums))
\`\`\``,
      },
      {
        type: "quiz",
        id: "L08Q1",
        question: "ถ้า `int arr[5] = {10, 20, 30, 40, 50};` แล้ว arr[2] มีค่าเท่าไร?",
        options: ["10", "20", "30", "40"],
        correct: 2,
        explanation: "Index เริ่มจาก 0: arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40, arr[4]=50 ดังนั้น arr[2] = 30",
      },
      {
        type: "quiz",
        id: "L08Q2",
        question: "ใน Python ถ้า `nums = [5, 2, 8, 1, 9]` แล้วต้องการหาค่ามากสุด ควรใช้คำสั่งใด?",
        options: [
          "`nums.max()`",
          "`max(nums)`",
          "`nums[0]`",
          "`len(nums)`",
        ],
        correct: 1,
        explanation: "`max(nums)` คือ built-in function ของ Python ที่หาค่ามากสุดใน list ส่วน `nums.max()` ไม่มีใน Python (มีใน numpy), `nums[0]` คือค่าแรก, `len(nums)` คือขนาด",
      },
      {
        type: "coding",
        id: "L08C1",
        instruction: "รับจำนวนเต็ม n ในบรรทัดแรก\nรับตัวเลข n ตัว (คั่น space) ในบรรทัดที่ 2\nแสดงค่ามากสุดและน้อยสุดแต่ละค่าในบรรทัดใหม่\n\nInput:\n```\n5\n3 1 4 1 5\n```\nOutput:\n```\n5\n1\n```",
        starterCode: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) cin >> arr[i];

    int maxVal = arr[0], minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }
    cout << maxVal << "\\n" << minVal << "\\n";
    return 0;
}`,
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int maxVal = arr[0], minVal = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
        if (arr[i] < minVal) minVal = arr[i];
    }
    printf("%d\\n%d\\n", maxVal, minVal);
    return 0;
}`,
          python: `n = int(input())
nums = list(map(int, input().split()))
print(max(nums))
print(min(nums))`,
        },
        testCases: [
          { input: "5\n3 1 4 1 5", expectedOutput: "5\n1", label: "ตัวอย่าง 1" },
          { input: "3\n10 20 30", expectedOutput: "30\n10", label: "เรียงน้อยไปมาก" },
          { input: "1\n42", expectedOutput: "42\n42", label: "n=1" },
          { input: "4\n-5 3 -1 7", expectedOutput: "7\n-5", label: "มีเลขติดลบ" },
        ],
        hints: [
          "ตั้งต้น: maxVal = arr[0], minVal = arr[0]",
          "วน i จาก 1 ถึง n-1 ตรวจแต่ละตัว",
          "Python: max(nums) และ min(nums) ทำให้เองได้เลย",
        ],
      },
    ],
  },
];

export const LESSON_MAP = new Map<string, Lesson>(
  LESSONS.map((l) => [l.id, l])
);

// ─── Per-language lesson maps (lazy-imported in pages) ────────────────────────
export { LESSONS_CPP } from "./lessons-cpp";
export { LESSONS_C } from "./lessons-c";
export { LESSONS_PYTHON } from "./lessons-python";

export function getLessonsByLang(lang: Lang): Lesson[] {
  // Imported dynamically to avoid circular deps — pages import directly
  return [];
}

export const LANG_LESSON_MAP: Record<Lang, () => Promise<Lesson[]>> = {
  cpp: () => import("./lessons-cpp").then((m) => m.LESSONS_CPP),
  c:   () => import("./lessons-c").then((m) => m.LESSONS_C),
  python: () => import("./lessons-python").then((m) => m.LESSONS_PYTHON),
};
