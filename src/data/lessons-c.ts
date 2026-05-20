import type { Lesson } from "./lessons";

export const LESSONS_C: Lesson[] = [

  // ═══════════════════════════════════════════════════════════════
  // C-L00 — Hello World และโครงสร้างโปรแกรม C
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L00",
    lang: "c" as const,
    order: 0,
    title: "Hello World และโครงสร้างโปรแกรม C",
    description: "เริ่มต้นกับภาษา C — เรียนรู้โครงสร้างพื้นฐาน #include, int main, printf, return 0 และกระบวนการ compile",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## Hello World ในภาษา C

โปรแกรมแรกที่นักเขียนโค้ดทุกคนเริ่มต้นคือ "Hello World" — แสดงข้อความออกหน้าจอ

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}
\`\`\`

---

## อธิบายทีละบรรทัด

**\`#include <stdio.h>\`**
- \`#include\` = "ขอยืม" ชุดเครื่องมือมาใช้
- \`<stdio.h>\` = Standard Input/Output — มีคำสั่ง \`printf\` และ \`scanf\`
- ถ้าไม่ include คอมพิวเตอร์จะไม่รู้จัก \`printf\` เลย

**\`int main() {\`**
- \`main()\` คือ "ประตูทางเข้า" ของโปรแกรม — ทุกโปรแกรม C ต้องมี
- \`int\` หน้า main บอกว่าฟังก์ชันจะคืนค่าตัวเลขกลับ
- \`{\` เปิดบล็อกของ main (ต้องปิดด้วย \`}\`)

**\`printf("Hello World\\n");\`**
- \`printf\` = print formatted — แสดงข้อความออกหน้าจอ
- \`\\n\` = ขึ้นบรรทัดใหม่ (newline)
- ทุกคำสั่งต้องจบด้วย \`;\` ถ้าลืมจะ error!

**\`return 0;\`**
- บอกระบบว่าโปรแกรมจบแล้ว ไม่มี error (0 = สำเร็จ)

---

## กระบวนการ Compile

ภาษา C ต้อง **compile** ก่อนรัน ซึ่งต่างจาก Python ที่รันได้ทันที

\`\`\`
source code (.c) → Compiler (gcc) → executable → รันได้
\`\`\`

คำสั่ง compile:
\`\`\`
gcc hello.c -o hello
./hello
\`\`\`

ใน competitive programming ระบบ judge จะ compile ให้อัตโนมัติ ไม่ต้องทำเอง`,
      },
      {
        type: "quiz",
        id: "C-L00-Q1",
        question: "ในภาษา C คำสั่ง `#include <stdio.h>` มีหน้าที่ทำอะไร?",
        options: [
          "กำหนดจุดเริ่มต้นของโปรแกรม",
          "นำเข้าชุดเครื่องมือที่มี printf และ scanf",
          "แสดงข้อความออกหน้าจอ",
          "ประกาศตัวแปรชนิด int",
        ],
        correct: 1,
        explanation: "`#include <stdio.h>` คือการนำเข้า Standard Input/Output library ซึ่งมีคำสั่ง `printf` (แสดงผล) และ `scanf` (รับข้อมูล) ถ้าไม่มีบรรทัดนี้ คอมไพเลอร์จะไม่รู้จัก printf เลย",
      },
      {
        type: "quiz",
        id: "C-L00-Q2",
        question: "ข้อใดถูกต้องเกี่ยวกับ `return 0;` ใน int main() ของภาษา C?",
        options: [
          "ใช้คืนค่า 0 ให้กับตัวแปร",
          "บอกระบบว่าโปรแกรมจบสำเร็จโดยไม่มี error",
          "ทำให้โปรแกรมวนซ้ำตั้งแต่ต้น",
          "ไม่จำเป็นต้องมีก็ได้ โปรแกรมรันได้เหมือนกัน",
        ],
        correct: 1,
        explanation: "`return 0;` ส่งค่า 0 กลับให้ระบบปฏิบัติการ ซึ่งหมายความว่าโปรแกรมทำงานสำเร็จ (exit code 0 = success) ถ้าเกิด error มักจะ return ค่าอื่น เช่น 1",
      },
      {
        type: "coding",
        id: "C-L00-C1",
        instruction: "เขียนโปรแกรมภาษา C ที่แสดงข้อความ `Hello TOI` ออกหน้าจอ",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    // แก้ไขให้แสดง Hello TOI
    printf("Hello World\\n");
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "", expectedOutput: "Hello TOI", label: "แสดงข้อความ Hello TOI" },
        ],
        hints: [
          'เปลี่ยน "Hello World" เป็น "Hello TOI" ใน printf',
          "อย่าลืม \\n ข้างในเพื่อขึ้นบรรทัดใหม่",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L01 — ตัวแปรและชนิดข้อมูลใน C
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L01",
    lang: "c" as const,
    order: 1,
    title: "ตัวแปรและชนิดข้อมูลใน C",
    description: "เรียนรู้ชนิดข้อมูลพื้นฐาน int, long, long long, double, float, char และ format specifiers %d %f %c %lld",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## ตัวแปรคืออะไร?

**ตัวแปร (Variable)** คือกล่องเก็บข้อมูล เราตั้งชื่อกล่องแล้วใส่ค่าได้

ใน C **ต้องประกาศชนิดข้อมูลก่อนใช้เสมอ**:

\`\`\`c
int age = 17;
double gpa = 3.95;
char grade = 'A';
\`\`\`

---

## ชนิดข้อมูลพื้นฐาน

| ชนิด | ขนาด | ช่วงค่า | ตัวอย่าง |
|------|------|---------|---------|
| \`int\` | 4 bytes | −2,147,483,648 ถึง 2,147,483,647 | \`int x = 100;\` |
| \`long\` | 4–8 bytes | ขึ้นกับระบบ | \`long y = 100000L;\` |
| \`long long\` | 8 bytes | −9.2×10¹⁸ ถึง 9.2×10¹⁸ | \`long long z = 1e18;\` |
| \`float\` | 4 bytes | ทศนิยม ~7 หลัก | \`float f = 3.14f;\` |
| \`double\` | 8 bytes | ทศนิยม ~15 หลัก | \`double d = 3.14159;\` |
| \`char\` | 1 byte | ตัวอักษรหนึ่งตัว | \`char c = 'A';\` |

> ใน competitive programming: ใช้ **\`long long\`** เมื่อตัวเลขใหญ่เกิน int, ใช้ **\`double\`** สำหรับทศนิยม

---

## Format Specifiers

ใช้กับ \`printf\` และ \`scanf\` เพื่อบอกชนิดข้อมูล:

| Specifier | ชนิด | ตัวอย่าง printf |
|-----------|------|----------------|
| \`%d\` | int | \`printf("%d", x);\` |
| \`%lld\` | long long | \`printf("%lld", z);\` |
| \`%f\` | float / double | \`printf("%f", d);\` |
| \`%.2f\` | ทศนิยม 2 ตำแหน่ง | \`printf("%.2f", d);\` |
| \`%c\` | char | \`printf("%c", c);\` |
| \`%s\` | string (char array) | \`printf("%s", str);\` |

---

## ตัวอย่างโปรแกรม

\`\`\`c
#include <stdio.h>

int main() {
    int age = 17;
    double gpa = 3.95;
    char grade = 'A';
    long long bigNum = 1000000000LL;

    printf("อายุ: %d ปี\\n", age);
    printf("เกรด: %.2f\\n", gpa);
    printf("ระดับ: %c\\n", grade);
    printf("ตัวเลขใหญ่: %lld\\n", bigNum);

    return 0;
}
\`\`\`

ผลลัพธ์:
\`\`\`
อายุ: 17 ปี
เกรด: 3.95
ระดับ: A
ตัวเลขใหญ่: 1000000000
\`\`\``,
      },
      {
        type: "quiz",
        id: "C-L01-Q1",
        question: "ถ้าต้องการเก็บตัวเลข 5,000,000,000 (5 พันล้าน) ในภาษา C ควรใช้ชนิดข้อมูลใด?",
        options: [
          "int เพราะรองรับตัวเลขทุกชนิด",
          "float เพราะรองรับตัวเลขขนาดใหญ่",
          "long long เพราะ int รองรับสูงสุดแค่ประมาณ 2.1 พันล้าน",
          "char เพราะใช้หน่วยความจำน้อยที่สุด",
        ],
        correct: 2,
        explanation: "`int` รองรับสูงสุดประมาณ 2,147,483,647 (2.1 พันล้าน) ดังนั้น 5 พันล้านจะ overflow ต้องใช้ `long long` ที่รองรับได้ถึงประมาณ 9.2×10¹⁸ และใช้ `%lld` กับ printf/scanf",
      },
      {
        type: "quiz",
        id: "C-L01-Q2",
        question: "ในภาษา C ถ้าต้องการพิมพ์ตัวแปร `double pi = 3.14159;` แบบทศนิยม 2 ตำแหน่ง ต้องใช้ format specifier ใด?",
        options: [
          "%d",
          "%c",
          "%lld",
          "%.2f",
        ],
        correct: 3,
        explanation: "`%.2f` ใช้สำหรับพิมพ์เลขทศนิยม (float/double) โดย `.2` หมายถึงแสดง 2 ตำแหน่งหลังจุดทศนิยม ส่วน `%d` ใช้กับ int, `%lld` ใช้กับ long long, `%c` ใช้กับ char",
      },
      {
        type: "coding",
        id: "C-L01-C1",
        instruction: "ประกาศตัวแปร `int score = 95;` และ `double average = 87.5;` แล้วแสดงผลออกหน้าจอในรูปแบบ:\n```\n95\n87.50\n```",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int score = 95;
    double average = 87.5;
    // แสดง score ด้วย %d แล้วขึ้นบรรทัดใหม่
    // แสดง average ด้วย %.2f แล้วขึ้นบรรทัดใหม่
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "", expectedOutput: "95\n87.50", label: "แสดงค่า score และ average" },
        ],
        hints: [
          "ใช้ printf(\"%d\\n\", score); สำหรับ int",
          "ใช้ printf(\"%.2f\\n\", average); สำหรับทศนิยม 2 ตำแหน่ง",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L02 — รับและแสดงผลด้วย printf/scanf
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L02",
    lang: "c" as const,
    order: 2,
    title: "รับและแสดงผลด้วย printf/scanf",
    description: "เรียนรู้การรับข้อมูลจาก stdin ด้วย scanf (ใช้ & operator) และแสดงผลด้วย printf รวมถึงการรับหลายตัวแปรพร้อมกัน",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## printf — แสดงผลออกหน้าจอ

\`printf\` (print formatted) ใช้แสดงข้อความและค่าตัวแปร:

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;
    printf("ค่าของ x คือ %d\\n", x);
    printf("บวก 1 = %d\\n", x + 1);
    return 0;
}
\`\`\`

---

## scanf — รับข้อมูลจาก stdin

\`scanf\` ใช้รับข้อมูลที่ผู้ใช้พิมพ์เข้ามา **ต้องใส่ \`&\` หน้าตัวแปรเสมอ** (ยกเว้น string):

\`\`\`c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);   // & = "address of" — บอกตำแหน่งในหน่วยความจำ
    printf("%d\\n", n);
    return 0;
}
\`\`\`

> **ทำไมต้องใส่ \`&\`?** เพราะ \`scanf\` ต้องรู้ว่าจะเก็บค่าไว้ที่ไหนในหน่วยความจำ \`&n\` = "address ของตัวแปร n"

---

## รับหลายตัวแปรพร้อมกัน

\`\`\`c
#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);   // รับสองค่า คั่นด้วย space หรือ newline
    printf("%d\\n", a + b);
    return 0;
}
\`\`\`

Input: \`3 5\`
Output: \`8\`

---

## รับชนิดข้อมูลอื่น

\`\`\`c
#include <stdio.h>

int main() {
    long long big;
    double d;
    char c;

    scanf("%lld", &big);   // long long
    scanf("%lf", &d);      // double ใช้ %lf ใน scanf (ต่างจาก printf ที่ใช้ %f)
    scanf(" %c", &c);      // char (มี space ก่อน %c เพื่อ skip whitespace)

    printf("%lld\\n", big);
    printf("%.2f\\n", d);
    printf("%c\\n", c);
    return 0;
}
\`\`\`

> **จำ**: scanf double ใช้ \`%lf\` แต่ printf double ใช้ \`%f\` หรือ \`%.2f\``,
      },
      {
        type: "quiz",
        id: "C-L02-Q1",
        question: "ในภาษา C ทำไมต้องใส่ `&` หน้าตัวแปรใน scanf เช่น `scanf(\"%d\", &n);`?",
        options: [
          "เป็นแค่ syntax ของ scanf ไม่มีความหมายพิเศษ",
          "& ทำให้ scanf อ่านค่าได้เร็วขึ้น",
          "& คือ address ของตัวแปร บอก scanf ว่าจะเก็บค่าไว้ที่ไหนในหน่วยความจำ",
          "ถ้าไม่ใส่ & ค่าจะถูกเก็บเป็น string แทน",
        ],
        correct: 2,
        explanation: "`&` (address-of operator) คืนค่าตำแหน่ง (address) ของตัวแปรในหน่วยความจำ scanf ต้องการ address เพื่อจะได้เขียนค่าที่รับเข้ามาลงในตัวแปรนั้นโดยตรง ถ้าลืมใส่ & โปรแกรมจะ crash หรือให้ผลผิด",
      },
      {
        type: "quiz",
        id: "C-L02-Q2",
        question: "ในภาษา C ถ้าต้องการรับค่า double ด้วย scanf ต้องใช้ format specifier ใด?",
        options: [
          "%f",
          "%d",
          "%lf",
          "%ff",
        ],
        correct: 2,
        explanation: "ใน scanf ต้องใช้ `%lf` สำหรับ double (long float) แต่ใน printf ใช้ `%f` ได้เลย นี่เป็นความแตกต่างที่หลายคนสับสน — scanf และ printf ใช้ specifier ต่างกันสำหรับ double",
      },
      {
        type: "coding",
        id: "C-L02-C1",
        instruction: "รับจำนวนเต็ม 2 ตัว แล้วแสดงผลบวกของทั้งสอง",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    // เขียนโค้ดที่นี่
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "3 5", expectedOutput: "8", label: "3 + 5 = 8" },
          { input: "10 20", expectedOutput: "30", label: "10 + 20 = 30" },
          { input: "0 0", expectedOutput: "0", label: "0 + 0 = 0" },
        ],
        hints: [
          "ใช้ printf(\"%d\\n\", a + b); เพื่อแสดงผล",
          "ไม่ต้องประกาศตัวแปรเพิ่ม คำนวณตรงใน printf ได้เลย",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L03 — การคำนวณและตัวดำเนินการ
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L03",
    lang: "c" as const,
    order: 3,
    title: "การคำนวณและตัวดำเนินการ",
    description: "ตัวดำเนินการ +, -, *, /, % และ integer division, การใช้ math.h สำหรับ pow และ sqrt",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## ตัวดำเนินการพื้นฐาน

| ตัวดำเนินการ | ความหมาย | ตัวอย่าง | ผลลัพธ์ |
|-------------|---------|---------|--------|
| \`+\` | บวก | \`5 + 3\` | \`8\` |
| \`-\` | ลบ | \`5 - 3\` | \`2\` |
| \`*\` | คูณ | \`5 * 3\` | \`15\` |
| \`/\` | หาร | \`7 / 2\` | \`3\` (int division!) |
| \`%\` | modulo (เศษ) | \`7 % 2\` | \`1\` |

---

## Integer Division — ระวังให้ดี!

ถ้าหารระหว่าง int กับ int ผลลัพธ์จะเป็น **int เสมอ** (ตัดทศนิยมทิ้ง):

\`\`\`c
#include <stdio.h>

int main() {
    int a = 7, b = 2;
    printf("%d\\n", a / b);    // ได้ 3 ไม่ใช่ 3.5!

    // แก้ไขโดย cast เป็น double ก่อน
    printf("%.1f\\n", (double)a / b);  // ได้ 3.5
    return 0;
}
\`\`\`

---

## Modulo (%) — หาเศษการหาร

\`\`\`c
#include <stdio.h>

int main() {
    printf("%d\\n", 10 % 3);  // 1  (10 = 3*3 + 1)
    printf("%d\\n", 12 % 4);  // 0  (12 หาร 4 ลงตัว)
    printf("%d\\n", 7 % 2);   // 1  (เลขคี่จะ % 2 = 1)
    return 0;
}
\`\`\`

ใช้บ่อยใน competitive programming: ตรวจสอบเลขคู่/คี่, วนรอบ

---

## #include <math.h> — ฟังก์ชันทางคณิตศาสตร์

\`\`\`c
#include <stdio.h>
#include <math.h>

int main() {
    double x = 9.0;
    printf("%.2f\\n", sqrt(x));     // 3.00 (รากที่สอง)
    printf("%.2f\\n", pow(2, 10));  // 1024.00 (2^10)
    printf("%.2f\\n", fabs(-5.5));  // 5.50 (ค่าสัมบูรณ์)
    return 0;
}
\`\`\`

> Compile ด้วย: \`gcc prog.c -o prog -lm\` (ต้องใส่ \`-lm\` เพื่อ link math library)

---

## ลำดับการคำนวณ (Operator Precedence)

เหมือนคณิตศาสตร์ทั่วไป: \`()\` > \`* / %\` > \`+ -\`

\`\`\`c
int x = 2 + 3 * 4;    // 14 ไม่ใช่ 20
int y = (2 + 3) * 4;  // 20
\`\`\``,
      },
      {
        type: "quiz",
        id: "C-L03-Q1",
        question: "ในภาษา C ผลลัพธ์ของ `7 / 2` เมื่อทั้งสองเป็น int คือเท่าไร?",
        options: [
          "3.5",
          "3",
          "4",
          "3.0",
        ],
        correct: 1,
        explanation: "ใน C การหารระหว่าง int กับ int จะได้ผลลัพธ์เป็น int เสมอ โดยตัดส่วนทศนิยมทิ้ง (truncation) ดังนั้น 7/2 = 3 ไม่ใช่ 3.5 ถ้าต้องการ 3.5 ต้อง cast: (double)7/2 หรือใช้ 7.0/2",
      },
      {
        type: "quiz",
        id: "C-L03-Q2",
        question: "ต้องการใช้ฟังก์ชัน `sqrt()` ในภาษา C ต้อง include header ใด?",
        options: [
          "#include <stdio.h>",
          "#include <stdlib.h>",
          "#include <math.h>",
          "#include <sqrt.h>",
        ],
        correct: 2,
        explanation: "ฟังก์ชันทางคณิตศาสตร์เช่น `sqrt()`, `pow()`, `fabs()` อยู่ใน `<math.h>` และตอน compile ต้องใส่ flag `-lm` ด้วย เช่น `gcc prog.c -o prog -lm`",
      },
      {
        type: "coding",
        id: "C-L03-C1",
        instruction: "รับจำนวนเต็ม N แล้วแสดงผลลัพธ์:\n- บรรทัดแรก: N คูณ N\n- บรรทัดสอง: เศษที่เหลือเมื่อหาร N ด้วย 3",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    // แสดง n*n แล้วขึ้นบรรทัดใหม่
    // แสดง n%3 แล้วขึ้นบรรทัดใหม่
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "5", expectedOutput: "25\n2", label: "5*5=25, 5%3=2" },
          { input: "6", expectedOutput: "36\n0", label: "6*6=36, 6%3=0" },
          { input: "7", expectedOutput: "49\n1", label: "7*7=49, 7%3=1" },
        ],
        hints: [
          "ใช้ printf(\"%d\\n\", n * n); สำหรับบรรทัดแรก",
          "ใช้ printf(\"%d\\n\", n % 3); สำหรับบรรทัดสอง",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L04 — เงื่อนไข if/else if/else
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L04",
    lang: "c" as const,
    order: 4,
    title: "เงื่อนไข if/else if/else",
    description: "การตัดสินใจในโปรแกรม — comparison operators, logical operators &&/||/!, และ switch-case",
    estimatedMinutes: 30,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## if/else — การตัดสินใจ

\`\`\`c
#include <stdio.h>

int main() {
    int score;
    scanf("%d", &score);

    if (score >= 80) {
        printf("ผ่าน\\n");
    } else {
        printf("ไม่ผ่าน\\n");
    }
    return 0;
}
\`\`\`

---

## else if — หลายเงื่อนไข

\`\`\`c
#include <stdio.h>

int main() {
    int score;
    scanf("%d", &score);

    if (score >= 90) {
        printf("A\\n");
    } else if (score >= 80) {
        printf("B\\n");
    } else if (score >= 70) {
        printf("C\\n");
    } else {
        printf("F\\n");
    }
    return 0;
}
\`\`\`

---

## Comparison Operators

| Operator | ความหมาย | ตัวอย่าง |
|----------|---------|---------|
| \`==\` | เท่ากับ | \`x == 5\` |
| \`!=\` | ไม่เท่ากับ | \`x != 0\` |
| \`>\` | มากกว่า | \`x > 10\` |
| \`<\` | น้อยกว่า | \`x < 10\` |
| \`>=\` | มากกว่าหรือเท่ากับ | \`x >= 5\` |
| \`<=\` | น้อยกว่าหรือเท่ากับ | \`x <= 5\` |

---

## Logical Operators

| Operator | ความหมาย | ตัวอย่าง |
|----------|---------|---------|
| \`&&\` | AND (และ) | \`x > 0 && x < 10\` |
| \`\|\|\` | OR (หรือ) | \`x < 0 \|\| x > 100\` |
| \`!\` | NOT (ไม่) | \`!done\` |

\`\`\`c
#include <stdio.h>

int main() {
    int x;
    scanf("%d", &x);
    if (x > 0 && x % 2 == 0) {
        printf("บวกและเลขคู่\\n");
    }
    return 0;
}
\`\`\`

---

## switch-case

ใช้เมื่อเปรียบเทียบกับค่าคงที่หลายค่า:

\`\`\`c
#include <stdio.h>

int main() {
    int day;
    scanf("%d", &day);
    switch (day) {
        case 1: printf("จันทร์\\n"); break;
        case 2: printf("อังคาร\\n"); break;
        case 6:
        case 7: printf("วันหยุด\\n"); break;
        default: printf("วันธรรมดา\\n");
    }
    return 0;
}
\`\`\`

> อย่าลืม \`break;\` ไม่งั้นโค้ดจะ "fall through" ไป case ถัดไป`,
      },
      {
        type: "quiz",
        id: "C-L04-Q1",
        question: "ในภาษา C ข้อใดคือผลลัพธ์ของโค้ดนี้เมื่อ x = 15?\n```c\nif (x > 10 && x % 2 == 0) {\n    printf(\"A\");\n} else {\n    printf(\"B\");\n}\n```",
        options: [
          "A",
          "B",
          "AB",
          "Error",
        ],
        correct: 1,
        explanation: "x = 15 ทำให้ x > 10 เป็นจริง แต่ 15 % 2 == 1 (ไม่ใช่ 0) ดังนั้น 15 % 2 == 0 เป็นเท็จ เงื่อนไข AND ต้องจริงทั้งคู่ จึงเข้า else พิมพ์ B",
      },
      {
        type: "quiz",
        id: "C-L04-Q2",
        question: "ใน switch-case ของภาษา C ถ้าลืมใส่ `break;` ท้าย case จะเกิดอะไร?",
        options: [
          "โปรแกรมจะหยุดทำงานทันที",
          "โค้ดจะ 'fall through' ไปทำ case ถัดไปต่อเลย",
          "คอมไพเลอร์จะ error",
          "โปรแกรมจะกลับไปทำ case แรก",
        ],
        correct: 1,
        explanation: "ถ้าไม่มี `break;` ใน case โค้ดจะ fall through — คือทำงานต่อลงไปใน case ถัดไปโดยไม่ตรวจเงื่อนไข บางครั้งใช้ประโยชน์ได้ (เช่น case 6 และ 7 ทำสิ่งเดียวกัน) แต่ส่วนใหญ่ต้องใส่ break",
      },
      {
        type: "coding",
        id: "C-L04-C1",
        instruction: "รับจำนวนเต็ม N แล้วตรวจสอบว่าเป็นเลขคู่หรือเลขคี่ แสดงผล `even` หรือ `odd`",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    // ถ้า n % 2 == 0 แสดง "even" ไม่งั้นแสดง "odd"
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "4", expectedOutput: "even", label: "4 เป็นเลขคู่" },
          { input: "7", expectedOutput: "odd", label: "7 เป็นเลขคี่" },
          { input: "0", expectedOutput: "even", label: "0 เป็นเลขคู่" },
        ],
        hints: [
          "ใช้ n % 2 == 0 ตรวจสอบเลขคู่",
          "ใช้ if/else แสดงผลที่ถูกต้อง",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L05 — วนซ้ำด้วย for loop
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L05",
    lang: "c" as const,
    order: 5,
    title: "วนซ้ำด้วย for loop",
    description: "for loop พื้นฐาน, nested loop, break และ continue — เครื่องมือหลักของ competitive programming",
    estimatedMinutes: 30,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## for loop — โครงสร้างพื้นฐาน

\`\`\`c
for (เริ่มต้น; เงื่อนไข; ขยับ) {
    // โค้ดที่ทำซ้ำ
}
\`\`\`

ตัวอย่าง พิมพ์ 1 ถึง 5:

\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}
\`\`\`

ผลลัพธ์:
\`\`\`
1
2
3
4
5
\`\`\`

---

## วิเคราะห์การทำงาน

\`\`\`c
for (int i = 1; i <= 5; i++)
//        ^         ^      ^
//     เริ่มที่ 1  ทำถ้า i≤5  แต่ละรอบ +1
\`\`\`

1. \`int i = 1\` — กำหนดค่าเริ่มต้น (ทำแค่ครั้งเดียว)
2. \`i <= 5\` — ตรวจเงื่อนไข ถ้าจริงทำต่อ ถ้าเท็จออก
3. โค้ดในบล็อก \`{}\` ทำงาน
4. \`i++\` — เพิ่มค่า i แล้วกลับขั้น 2

---

## Nested Loop — ลูปซ้อนลูป

\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("%d*%d=%d  ", i, j, i * j);
        }
        printf("\\n");
    }
    return 0;
}
\`\`\`

---

## break และ continue

**\`break\`** — ออกจากลูปทันที:
\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 10; i++) {
        if (i == 5) break;    // หยุดเมื่อ i = 5
        printf("%d\\n", i);
    }
    return 0;
}
// แสดง: 1 2 3 4
\`\`\`

**\`continue\`** — ข้ามรอบนี้ไปรอบถัดไป:
\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;   // ข้ามรอบที่ i = 3
        printf("%d\\n", i);
    }
    return 0;
}
// แสดง: 1 2 4 5
\`\`\``,
      },
      {
        type: "quiz",
        id: "C-L05-Q1",
        question: "โค้ดต่อไปนี้จะแสดงผลอะไร?\n```c\nfor (int i = 0; i < 4; i++) {\n    printf(\"%d \", i);\n}\n```",
        options: [
          "1 2 3 4",
          "0 1 2 3",
          "0 1 2 3 4",
          "1 2 3",
        ],
        correct: 1,
        explanation: "i เริ่มที่ 0 และเงื่อนไขคือ i < 4 (ไม่ใช่ i <= 4) ดังนั้นลูปจะทำงานที่ i = 0, 1, 2, 3 แล้วหยุดเมื่อ i = 4 ผลลัพธ์คือ `0 1 2 3`",
      },
      {
        type: "quiz",
        id: "C-L05-Q2",
        question: "ในภาษา C `continue` ใน for loop ทำงานอย่างไร?",
        options: [
          "ออกจากลูปทันทีและไม่ทำรอบที่เหลือ",
          "ข้ามโค้ดที่เหลือในรอบปัจจุบันแล้วไปทำรอบถัดไป",
          "หยุดโปรแกรมทั้งหมด",
          "วนกลับไปเริ่มต้นที่ i = 0 ใหม่",
        ],
        correct: 1,
        explanation: "`continue` ข้ามโค้ดที่เหลือในรอบปัจจุบันแล้วไปขั้น update (i++) และตรวจเงื่อนไขใหม่ ต่างจาก `break` ที่ออกจากลูปทันที",
      },
      {
        type: "coding",
        id: "C-L05-C1",
        instruction: "รับจำนวนเต็ม N แล้วแสดงผลรวมตั้งแต่ 1 ถึง N (1 + 2 + 3 + ... + N)",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        // บวก i เข้า sum
    }
    printf("%d\\n", sum);
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "5", expectedOutput: "15", label: "1+2+3+4+5=15" },
          { input: "10", expectedOutput: "55", label: "1+...+10=55" },
          { input: "1", expectedOutput: "1", label: "N=1" },
        ],
        hints: [
          "ใช้ sum += i; ภายในลูป",
          "sum += i; คือย่อมาจาก sum = sum + i;",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L06 — while loop
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L06",
    lang: "c" as const,
    order: 6,
    title: "while loop และ do-while",
    description: "while loop, do-while, break, continue — ใช้เมื่อไม่รู้จำนวนรอบล่วงหน้า",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## while loop

ใช้เมื่อ **ไม่รู้จำนวนรอบล่วงหน้า** ทำซ้ำตราบเท่าที่เงื่อนไขเป็นจริง:

\`\`\`c
#include <stdio.h>

int main() {
    int n = 1;
    while (n <= 5) {
        printf("%d\\n", n);
        n++;
    }
    return 0;
}
\`\`\`

โครงสร้าง:
\`\`\`c
while (เงื่อนไข) {
    // โค้ด
    // ต้องมีอะไรที่ทำให้เงื่อนไขเป็นเท็จในที่สุด!
}
\`\`\`

> **อันตราย**: ถ้าเงื่อนไขเป็นจริงตลอดกาล จะได้ **infinite loop** — โปรแกรมค้าง!

---

## ตัวอย่าง: อ่านจนกว่าจะได้ 0

\`\`\`c
#include <stdio.h>

int main() {
    int x;
    scanf("%d", &x);
    while (x != 0) {
        printf("%d\\n", x);
        scanf("%d", &x);
    }
    return 0;
}
\`\`\`

---

## do-while — ทำก่อน ตรวจทีหลัง

ต่างจาก while ตรงที่ทำโค้ดอย่างน้อย **1 ครั้ง** ก่อนตรวจเงื่อนไข:

\`\`\`c
#include <stdio.h>

int main() {
    int n = 10;
    do {
        printf("%d\\n", n);
        n++;
    } while (n <= 5);   // เงื่อนไขเท็จตั้งแต่แรก แต่ก็พิมพ์ครั้งหนึ่ง
    return 0;
}
// แสดง: 10 (ทำครั้งเดียวแม้ 10 <= 5 จะเท็จ)
\`\`\`

---

## เปรียบเทียบ for กับ while

\`\`\`c
// for — รู้จำนวนรอบ
for (int i = 0; i < n; i++) { ... }

// while — ไม่รู้จำนวนรอบ
while (condition) { ... }
\`\`\`

ใน competitive programming: **for** ใช้บ่อยกว่า แต่ **while** เหมาะกับการอ่านจนกว่าจะเจอ EOF หรือ sentinel value`,
      },
      {
        type: "quiz",
        id: "C-L06-Q1",
        question: "ข้อใดคือความแตกต่างระหว่าง `while` และ `do-while` ในภาษา C?",
        options: [
          "ไม่มีความแตกต่าง ใช้แทนกันได้ทุกกรณี",
          "do-while ตรวจเงื่อนไขก่อนจึงทำโค้ด ส่วน while ทำโค้ดก่อนแล้วค่อยตรวจ",
          "while ตรวจเงื่อนไขก่อน ส่วน do-while ทำโค้ดอย่างน้อย 1 ครั้งก่อนตรวจเงื่อนไข",
          "do-while ใช้ได้เฉพาะกับ int เท่านั้น",
        ],
        correct: 2,
        explanation: "`while` ตรวจเงื่อนไขก่อนทุกครั้ง ถ้าเงื่อนไขเท็จตั้งแต่แรก จะไม่เข้าลูปเลย แต่ `do-while` ทำโค้ดก่อน 1 รอบ แล้วจึงตรวจเงื่อนไข ดังนั้นรับประกันว่าทำอย่างน้อย 1 ครั้งเสมอ",
      },
      {
        type: "quiz",
        id: "C-L06-Q2",
        question: "โค้ดต่อไปนี้มีปัญหาอะไร?\n```c\nint i = 0;\nwhile (i < 5) {\n    printf(\"%d\\n\", i);\n}\n```",
        options: [
          "ไม่มีปัญหา พิมพ์ 0 1 2 3 4 ตามปกติ",
          "เกิด infinite loop เพราะ i ไม่เพิ่มค่า เงื่อนไขจะเป็นจริงตลอดไป",
          "คอมไพเลอร์จะ error เพราะ i ไม่ได้ประกาศในลูป",
          "พิมพ์แค่ 0 แล้วหยุด",
        ],
        correct: 1,
        explanation: "ลืม `i++;` ในลูป ทำให้ i ยังคงเป็น 0 ตลอด เงื่อนไข `i < 5` จึงเป็นจริงตลอดไป เกิด infinite loop โปรแกรมจะค้างและไม่หยุด",
      },
      {
        type: "coding",
        id: "C-L06-C1",
        instruction: "รับจำนวนเต็ม N แล้วแสดงเลขจาก N ลงมาถึง 1 (countdown) ด้วย while loop",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    while (n >= 1) {
        // แสดง n แล้วลด n ลง 1
    }
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "5", expectedOutput: "5\n4\n3\n2\n1", label: "countdown จาก 5" },
          { input: "3", expectedOutput: "3\n2\n1", label: "countdown จาก 3" },
          { input: "1", expectedOutput: "1", label: "countdown จาก 1" },
        ],
        hints: [
          "ใช้ printf(\"%d\\n\", n); แสดงค่า",
          "ใช้ n--; หรือ n = n - 1; เพื่อลด n",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L07 — String ใน C
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L07",
    lang: "c" as const,
    order: 7,
    title: "String ใน C",
    description: "char array, scanf %s, fgets, strlen/strcpy/strcmp จาก <string.h> — string ใน C ไม่เหมือน C++ หรือ Python",
    estimatedMinutes: 35,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## String ใน C คือ char array

ภาษา C ไม่มี type \`string\` — string คือ **array ของ char ที่จบด้วย '\\0'** (null terminator):

\`\`\`c
char name[50] = "Alice";
// เก็บในหน่วยความจำ: ['A','l','i','c','e','\\0', ...]
\`\`\`

**ห้ามทำ**: \`char s = "hello";\` — ต้องเป็น array เสมอ!

---

## การประกาศและกำหนดค่า

\`\`\`c
char s1[50] = "hello";         // กำหนดตอนประกาศ — ทำได้
char s2[50];
s2 = "world";                  // ERROR! ห้ามใช้ = กับ array หลังประกาศ
strcpy(s2, "world");           // ถูกต้อง — ใช้ strcpy แทน
\`\`\`

---

## scanf และ fgets

**scanf %s** — อ่านจนเจอ space/newline:
\`\`\`c
#include <stdio.h>

int main() {
    char name[50];
    scanf("%s", name);    // ไม่ต้องใส่ & เพราะ array เป็น pointer อยู่แล้ว
    printf("สวัสดี %s\\n", name);
    return 0;
}
\`\`\`

**fgets** — อ่านทั้งบรรทัดรวมถึง space:
\`\`\`c
#include <stdio.h>

int main() {
    char line[100];
    fgets(line, 100, stdin);   // อ่านสูงสุด 99 ตัวอักษร + '\\0'
    printf("%s", line);        // fgets เก็บ '\\n' ด้วย
    return 0;
}
\`\`\`

---

## #include <string.h> — ฟังก์ชัน string

\`\`\`c
#include <stdio.h>
#include <string.h>

int main() {
    char s1[50] = "hello";
    char s2[50] = "world";

    printf("%d\\n", strlen(s1));          // 5 — ความยาว string
    strcpy(s2, s1);                       // copy s1 ไปใส่ s2
    printf("%d\\n", strcmp("abc","abc")); // 0 — เท่ากัน
    printf("%d\\n", strcmp("abc","abd")); // ลบ — abc < abd
    strcat(s1, "!");                      // ต่อท้าย: "hello!"
    printf("%s\\n", s1);
    return 0;
}
\`\`\`

| ฟังก์ชัน | หน้าที่ |
|---------|--------|
| \`strlen(s)\` | ความยาวของ string |
| \`strcpy(dst, src)\` | copy string |
| \`strcmp(s1, s2)\` | เปรียบเทียบ: 0=เท่ากัน, <0 หรือ >0=ไม่เท่า |
| \`strcat(dst, src)\` | ต่อ string |`,
      },
      {
        type: "quiz",
        id: "C-L07-Q1",
        question: "ในภาษา C ข้อใดถูกต้องในการกำหนดค่า string ให้กับตัวแปรหลังจากประกาศไปแล้ว?",
        options: [
          "s = \"hello\"; เพราะเป็น syntax มาตรฐาน",
          "s == \"hello\"; เพราะใช้ == แทน =",
          "strcpy(s, \"hello\"); เพราะ array ใช้ = ไม่ได้หลังประกาศ",
          "s = 'hello'; เพราะใช้ single quote",
        ],
        correct: 2,
        explanation: "ใน C หลังจากประกาศ char array แล้ว ไม่สามารถใช้ `=` กำหนดค่า string ใหม่ได้โดยตรง ต้องใช้ `strcpy(dst, src)` จาก `<string.h>` แทน ส่วน `s = \"hello\";` จะ compile error",
      },
      {
        type: "quiz",
        id: "C-L07-Q2",
        question: "ฟังก์ชัน `strcmp(s1, s2)` ในภาษา C คืนค่าอะไรเมื่อ s1 และ s2 เท่ากัน?",
        options: [
          "true",
          "1",
          "0",
          "-1",
        ],
        correct: 2,
        explanation: "`strcmp` คืน 0 เมื่อสองสตริงเท่ากัน, คืนค่าลบเมื่อ s1 < s2 (lexicographically), คืนค่าบวกเมื่อ s1 > s2 ดังนั้นตรวจสอบว่าเท่ากันต้องใช้ `if (strcmp(s1, s2) == 0)` ไม่ใช่ `if (s1 == s2)`",
      },
      {
        type: "coding",
        id: "C-L07-C1",
        instruction: "รับ string 1 คำ (ไม่มี space) แล้วแสดงความยาวของ string นั้น",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[200];
    scanf("%s", s);
    // แสดงความยาวของ s ด้วย strlen
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "hello", expectedOutput: "5", label: "hello มี 5 ตัวอักษร" },
          { input: "TOI", expectedOutput: "3", label: "TOI มี 3 ตัวอักษร" },
          { input: "a", expectedOutput: "1", label: "a มี 1 ตัวอักษร" },
        ],
        hints: [
          "ใช้ strlen(s) หาความยาว",
          "strlen คืนค่าชนิด size_t แต่ printf %d ก็ใช้ได้",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C-L08 — Array ใน C
  // ═══════════════════════════════════════════════════════════════
  {
    id: "C-L08",
    lang: "c" as const,
    order: 8,
    title: "Array ใน C",
    description: "ประกาศ int arr[10], การ index, การส่ง array เข้าฟังก์ชัน — ขนาดต้องคงที่ ไม่มี dynamic size",
    estimatedMinutes: 35,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## Array คืออะไร?

**Array** คือกลุ่มของตัวแปรชนิดเดียวกัน เก็บต่อเนื่องกันในหน่วยความจำ เข้าถึงด้วย index

\`\`\`c
int scores[5] = {90, 85, 92, 78, 88};
//          ^                         ^-- ต้องกำหนดขนาดตายตัว
//          ขนาด 5 = เก็บได้ 5 ตัว
\`\`\`

---

## ประกาศและ index

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("%d\\n", arr[0]);   // 10 (index เริ่มที่ 0)
    printf("%d\\n", arr[4]);   // 50 (index สุดท้าย = ขนาด - 1)

    arr[2] = 99;               // แก้ไขค่าที่ index 2
    printf("%d\\n", arr[2]);   // 99

    return 0;
}
\`\`\`

> **ระวัง**: Index เริ่มที่ **0** เสมอ! arr[5] สำหรับ array ขนาด 5 คือ out of bounds!

---

## วนลูปกับ Array

\`\`\`c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int arr[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // แสดงทุกตัว
    for (int i = 0; i < n; i++) {
        printf("%d\\n", arr[i]);
    }
    return 0;
}
\`\`\`

---

## Array กับฟังก์ชัน

ใน C เมื่อส่ง array เข้าฟังก์ชัน จะส่งเป็น pointer (ไม่ copy) ต้องบอกขนาดแยก:

\`\`\`c
#include <stdio.h>

int sumArray(int arr[], int n) {
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    return total;
}

int main() {
    int data[5] = {1, 2, 3, 4, 5};
    printf("%d\\n", sumArray(data, 5));  // 15
    return 0;
}
\`\`\`

---

## ข้อจำกัดของ Array ใน C

- ขนาดต้องคงที่ตอน compile: \`int arr[N];\` — N ต้องเป็นค่าคงที่หรือตัวเลขตรงๆ
- ไม่มี dynamic resize (ไม่เหมือน Python list หรือ C++ vector)
- ใน competitive programming มักประกาศขนาดใหญ่ไว้ก่อน เช่น \`int arr[100005];\`
- ไม่มีการตรวจ out of bounds — โปรแกรมอาจ crash หรือให้ผลผิดโดยไม่เตือน`,
      },
      {
        type: "quiz",
        id: "C-L08-Q1",
        question: "ใน C ถ้าประกาศ `int arr[6];` แล้วเข้าถึง `arr[6]` จะเกิดอะไร?",
        options: [
          "คอมไพเลอร์จะ error ทันที",
          "ได้ค่า 0 เพราะ C กำหนดค่า default",
          "เกิด out of bounds — พฤติกรรมไม่แน่นอน อาจ crash หรือให้ค่าผิด",
          "ได้ค่าเดียวกับ arr[0]",
        ],
        correct: 2,
        explanation: "ใน C ไม่มีการตรวจสอบ out of bounds ขณะ runtime `arr[6]` สำหรับ array ขนาด 6 (index 0-5) จะเข้าถึงหน่วยความจำนอก array ซึ่งเป็น undefined behavior — อาจ crash (segfault), อาจให้ค่าสุ่ม หรืออาจทำงานผิดพลาด",
      },
      {
        type: "quiz",
        id: "C-L08-Q2",
        question: "ในภาษา C เมื่อส่ง array เข้าฟังก์ชัน เช่น `void f(int arr[], int n)` ทำไมต้องส่งขนาด n แยกมาด้วย?",
        options: [
          "เพราะ C ต้องการ parameter อย่างน้อย 2 ตัวเสมอ",
          "เพราะฟังก์ชันรับ pointer ไม่รู้ขนาด array จึงต้องบอกแยก",
          "เพราะ n ใช้สำหรับ return ค่ากลับ",
          "เพราะ array ใน C ไม่สามารถรับค่าในฟังก์ชันได้",
        ],
        correct: 1,
        explanation: "เมื่อส่ง array เข้าฟังก์ชัน C จะส่งเป็น pointer ไปยังตัวแรกของ array ฟังก์ชันจึงไม่รู้ว่า array มีกี่ตัว ต้องบอกขนาดแยก ต่างจาก C++ vector ที่มี .size() หรือ Python list ที่มี len()",
      },
      {
        type: "coding",
        id: "C-L08-C1",
        instruction: "รับจำนวนเต็ม N ตามด้วยตัวเลข N ตัว แล้วแสดงค่าสูงสุดของ N ตัวนั้น",
        starterCode: {
          cpp: "",
          c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    int maxVal = arr[0];
    for (int i = 1; i < n; i++) {
        // ถ้า arr[i] มากกว่า maxVal ให้อัปเดต maxVal
    }
    printf("%d\\n", maxVal);
    return 0;
}`,
          python: "",
        },
        testCases: [
          { input: "5\n3 7 1 9 4", expectedOutput: "9", label: "max ของ 5 ตัว" },
          { input: "3\n-1 -5 -2", expectedOutput: "-1", label: "max ของเลขลบ" },
          { input: "1\n42", expectedOutput: "42", label: "1 ตัว" },
        ],
        hints: [
          "ใช้ if (arr[i] > maxVal) maxVal = arr[i]; ในลูป",
          "เริ่ม maxVal = arr[0] แล้วเปรียบเทียบตั้งแต่ index 1",
        ],
      },
    ],
  },
];
