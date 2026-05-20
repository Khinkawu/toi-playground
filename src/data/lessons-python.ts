import type { Lesson } from "./lessons";

export const LESSONS_PYTHON: Lesson[] = [

  // ═══════════════════════════════════════════════════════════════
  // PY-L00 — Hello World และโครงสร้างโปรแกรม Python
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L00",
    lang: "python" as const,
    order: 0,
    title: "Hello World และโครงสร้างโปรแกรม Python",
    description: "เริ่มต้นกับ Python — ทำไม Python ถึงไม่ต้องมี main(), indentation คืออะไร และวิธีใช้ print() กับ comment",
    estimatedMinutes: 15,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## Python ต่างจากภาษาอื่นยังไง?

Python เป็นภาษาที่ออกแบบมาให้ **อ่านง่าย เขียนสั้น** ต่างจาก C/C++ ตรงที่:

- **ไม่ต้องมี \`main()\`** — เขียนโค้ดลงไปตรงๆ ได้เลย
- **ไม่มีวงเล็บปีกกา \`{}\`** — ใช้ **indentation (การย่อบรรทัด)** แทน
- **ไม่ต้องมี semicolon \`;'\`** — จบบรรทัดก็จบคำสั่ง
- **ไม่ต้องประกาศชนิดตัวแปร** — Python รู้เองอัตโนมัติ

---

## Hello World ใน Python

\`\`\`python
print("Hello World")
\`\`\`

แค่บรรทัดเดียว! ไม่ต้อง \`#include\` ไม่ต้อง \`int main()\` ไม่ต้อง \`return 0\`

---

## Indentation — สำคัญมาก!

ใน Python **การย่อบรรทัด (indentation) มีความหมาย** ต้องใช้ให้ถูกต้องเสมอ

\`\`\`python
# ถูก — เว้นวรรค 4 ช่อง ภายใน if
if True:
    print("อยู่ข้างใน if")
print("อยู่ข้างนอก if")
\`\`\`

\`\`\`python
# ผิด — IndentationError!
if True:
print("ไม่มี indent")
\`\`\`

**กฎ**: ใช้ **4 spaces** เสมอ (หรือ Tab แต่ห้ามผสมกัน)

---

## Comment ใน Python

ใช้เครื่องหมาย \`#\` เพื่อเขียน comment — Python จะไม่ประมวลผลบรรทัดนั้น

\`\`\`python
# นี่คือ comment — Python ไม่อ่านบรรทัดนี้
print("Hello")  # comment ต่อท้ายโค้ดได้ด้วย

# comment ใช้อธิบายโค้ด
# หรือปิดโค้ดชั่วคราว
\`\`\`

---

## โปรแกรมแรกของเรา

\`\`\`python
# โปรแกรมแรก — Hello World
print("Hello, World!")
print("ยินดีต้อนรับสู่ Python!")
print("สอวน. เส้นทางสู่ IOI")
\`\`\`

ผลลัพธ์:
\`\`\`
Hello, World!
ยินดีต้อนรับสู่ Python!
สอวน. เส้นทางสู่ IOI
\`\`\`

Python รันโค้ดจาก **บนลงล่าง** ทีละบรรทัด เหมือนการอ่านหนังสือ`,
      },
      {
        type: "quiz",
        id: "PY-L00-Q1",
        question: "ข้อใดคือโปรแกรม Python ที่ถูกต้องที่สุดสำหรับแสดงข้อความ 'Hello'?",
        options: [
          "int main() { print(\"Hello\"); }",
          "print(\"Hello\")",
          "System.out.println(\"Hello\");",
          "printf(\"Hello\");"
        ],
        correct: 1,
        explanation: "Python ไม่ต้องการ main() หรือ {} — เขียน print(\"Hello\") ตรงๆ ได้เลย ง่ายกว่า C/C++ และ Java มาก",
      },
      {
        type: "quiz",
        id: "PY-L00-Q2",
        question: "ใน Python ถ้าลืม indent โค้ดข้างใน if จะเกิดอะไรขึ้น?",
        options: [
          "โปรแกรมรันได้ปกติ แต่ผลลัพธ์อาจผิด",
          "Python แก้ให้อัตโนมัติ",
          "เกิด IndentationError โปรแกรมรันไม่ได้",
          "เกิด warning แต่ยังรันได้"
        ],
        correct: 2,
        explanation: "Python ใช้ indentation แทน {} เพื่อกำหนดขอบเขตของบล็อกโค้ด ถ้าลืม indent จะเกิด IndentationError ทันที ต่างจาก C/C++ ที่ {} เป็นตัวกำหนด",
      },
      {
        type: "coding",
        id: "PY-L00-C1",
        instruction: "เขียนโปรแกรม Python แสดงข้อความ 3 บรรทัดตามลำดับ:\n1. Hello TOI\n2. Python is fun\n3. Let's code!",
        starterCode: {
          python: `# แสดงข้อความ 3 บรรทัด
# เขียนโค้ดที่นี่
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "", expectedOutput: "Hello TOI\nPython is fun\nLet's code!", label: "แสดง 3 บรรทัด" },
        ],
        hints: [
          "ใช้ print() 3 ครั้ง แต่ละครั้งแสดง 1 ข้อความ",
          "print() จะขึ้นบรรทัดใหม่ให้อัตโนมัติ",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L01 — ตัวแปรและชนิดข้อมูลใน Python
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L01",
    lang: "python" as const,
    order: 1,
    title: "ตัวแปรและชนิดข้อมูลใน Python",
    description: "Dynamic typing คืออะไร, ชนิดข้อมูลพื้นฐาน int/float/str/bool, ตรวจสอบชนิดด้วย type(), แปลงชนิดด้วย int()/float()/str()",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## ตัวแปรใน Python — Dynamic Typing

ใน Python **ไม่ต้องประกาศชนิดตัวแปร** ล่วงหน้า — Python รู้เองอัตโนมัติจากค่าที่กำหนด

\`\`\`python
# ใน C++ ต้องเขียน: int x = 10;
# ใน Python แค่:
x = 10          # Python รู้ว่า x เป็น int
name = "Bank"   # Python รู้ว่า name เป็น str
pi = 3.14       # Python รู้ว่า pi เป็น float
active = True   # Python รู้ว่า active เป็น bool
\`\`\`

คุณสมบัตินี้เรียกว่า **Dynamic Typing** — ชนิดตัวแปรเปลี่ยนได้ตามค่าที่กำหนด

---

## ชนิดข้อมูลพื้นฐาน 4 ชนิด

| ชนิด | ตัวอย่าง | ความหมาย |
|------|---------|----------|
| \`int\` | \`42\`, \`-7\`, \`0\` | จำนวนเต็ม |
| \`float\` | \`3.14\`, \`-2.5\` | จำนวนทศนิยม |
| \`str\` | \`"Hello"\`, \`'สวัสดี'\` | ข้อความ |
| \`bool\` | \`True\`, \`False\` | ค่าจริง/เท็จ (ต้องตัวใหญ่!) |

\`\`\`python
age = 17          # int
gpa = 3.85        # float
school = "POSN"   # str
passed = True     # bool
\`\`\`

---

## ตรวจสอบชนิดด้วย type()

\`\`\`python
x = 42
print(type(x))       # <class 'int'>

y = 3.14
print(type(y))       # <class 'float'>

s = "Hello"
print(type(s))       # <class 'str'>

b = True
print(type(b))       # <class 'bool'>
\`\`\`

---

## แปลงชนิดข้อมูล (Type Conversion)

บางครั้งต้องแปลงชนิดข้อมูลให้ตรงกัน:

\`\`\`python
# str → int
s = "42"
n = int(s)      # n = 42
print(type(n))  # <class 'int'>

# int → float
x = 10
y = float(x)    # y = 10.0

# int → str
n = 100
s = str(n)      # s = "100"

# float → int (ตัดทศนิยม ไม่ปัด)
f = 3.99
n = int(f)      # n = 3 (ไม่ใช่ 4!)
\`\`\`

---

## ตัวอย่างการใช้งานจริง

\`\`\`python
# ตัวแปรหลายตัวในบรรทัดเดียว
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

# swap ค่าใน Python — ง่ายมาก!
a = 5
b = 10
a, b = b, a
print(a, b)  # 10 5

# ดูชนิดข้อมูล
score = 95
print(f"score = {score}, ชนิด = {type(score)}")
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L01-Q1",
        question: "โค้ด Python ต่อไปนี้แสดงผลอะไร?\n```python\nx = 7\nx = \"seven\"\nprint(type(x))\n```",
        options: [
          "<class 'int'>",
          "<class 'str'>",
          "Error: ไม่สามารถเปลี่ยนชนิดตัวแปรได้",
          "<class 'int'> และ <class 'str'>"
        ],
        correct: 1,
        explanation: "Python ใช้ Dynamic Typing — ตัวแปร x เริ่มต้นเป็น int แต่เมื่อกำหนดค่าใหม่เป็น 'seven' ชนิดจะเปลี่ยนเป็น str ทันที จึงแสดง <class 'str'>",
      },
      {
        type: "quiz",
        id: "PY-L01-Q2",
        question: "ผลของ int(3.99) ใน Python คืออะไร?",
        options: [
          "4 (ปัดขึ้น)",
          "3 (ตัดทศนิยมออก)",
          "3.99 (ไม่เปลี่ยน)",
          "Error"
        ],
        correct: 1,
        explanation: "int() ใน Python ทำการ truncate (ตัดทศนิยมออก) ไม่ใช่ปัดเศษ ดังนั้น int(3.99) = 3 และ int(-3.99) = -3 ถ้าต้องการปัดเศษให้ใช้ round() แทน",
      },
      {
        type: "coding",
        id: "PY-L01-C1",
        instruction: "รับจำนวนเต็ม 1 ตัว แล้วแสดงผลว่าเป็นเลขคู่หรือเลขคี่ พร้อมแสดงชนิดข้อมูลหลัง int() conversion\nเอาต์พุตบรรทัดที่ 1: ค่าตัวเลข\nเอาต์พุตบรรทัดที่ 2: ชนิดข้อมูล เช่น <class 'int'>",
        starterCode: {
          python: `n = int(input())
# แสดงค่า n และชนิดข้อมูลของ n
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "42", expectedOutput: "42\n<class 'int'>", label: "จำนวนเต็มบวก" },
          { input: "7", expectedOutput: "7\n<class 'int'>", label: "จำนวนเต็มคี่" },
        ],
        hints: [
          "ใช้ print(n) แสดงค่า แล้ว print(type(n)) แสดงชนิด",
          "type() คืนค่าเป็น object แต่ print() แสดงได้เลย",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L02 — รับและแสดงผลด้วย print/input
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L02",
    lang: "python" as const,
    order: 2,
    title: "รับและแสดงผลด้วย print/input",
    description: "การใช้ print() และ input() สำหรับ I/O พื้นฐาน, แปลง input เป็นตัวเลข, รับหลายค่าในบรรทัดเดียวด้วย map()",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## input() — รับข้อมูลจากผู้ใช้

ฟังก์ชัน \`input()\` รับข้อความจากผู้ใช้และ **คืนค่าเป็น str เสมอ**

\`\`\`python
name = input()        # รอให้ผู้ใช้พิมพ์แล้วกด Enter
print("สวัสดี", name)
\`\`\`

\`\`\`python
# ใส่ข้อความแจ้งเตือน (ใช้ในโปรแกรมทั่วไป แต่ใน judge ไม่ควรใส่)
name = input("ชื่อของคุณ: ")
\`\`\`

> **สำคัญสำหรับ Competitive Programming**: ใน judge ไม่ต้องใส่ข้อความใน input() เพราะ judge ส่งข้อมูลตรงๆ

---

## แปลง input เป็นตัวเลข

เนื่องจาก input() คืนค่าเป็น str เสมอ ถ้าต้องการใช้คำนวณต้องแปลงก่อน:

\`\`\`python
# รับจำนวนเต็ม
n = int(input())
print(n + 1)

# รับจำนวนทศนิยม
x = float(input())
print(x * 2)
\`\`\`

---

## รับหลายค่าในบรรทัดเดียว

ใน competitive programming มักส่งข้อมูลแบบ "3 5" ในบรรทัดเดียว

\`\`\`python
# วิธีที่ 1: split() แล้วแปลงทีละตัว
line = input()      # "3 5"
parts = line.split()  # ["3", "5"]
a = int(parts[0])   # 3
b = int(parts[1])   # 5

# วิธีที่ 2 (นิยมที่สุด): map()
a, b = map(int, input().split())

# รับ 3 ค่า
x, y, z = map(int, input().split())

# รับ float
p, q = map(float, input().split())
\`\`\`

---

## print() — ตัวเลือกที่มีประโยชน์

\`\`\`python
# พิมพ์หลายค่าด้วยคั่นด้วยช่องว่าง
print(1, 2, 3)        # 1 2 3

# เปลี่ยนตัวคั่น (sep)
print(1, 2, 3, sep=",")  # 1,2,3
print(1, 2, 3, sep="-")  # 1-2-3

# ไม่ขึ้นบรรทัดใหม่ (end)
print("Hello", end=" ")
print("World")        # Hello World (บรรทัดเดียว)

# พิมพ์บรรทัดเปล่า
print()               # แค่ขึ้นบรรทัดใหม่
\`\`\`

---

## ตัวอย่างโปรแกรม I/O แบบ competitive programming

\`\`\`python
# โจทย์: รับ 2 จำนวนเต็ม แสดงผลรวม
a, b = map(int, input().split())
print(a + b)
\`\`\`

Input: \`3 5\`
Output: \`8\`

\`\`\`python
# โจทย์: รับ n แล้วรับ n จำนวน
n = int(input())
numbers = list(map(int, input().split()))
print(sum(numbers))
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L02-Q1",
        question: "โค้ดต่อไปนี้มีปัญหาอะไร?\n```python\nx = input()\nprint(x + 1)\n```",
        options: [
          "ไม่มีปัญหา — รันได้ปกติ",
          "TypeError: input() คืนค่าเป็น str ไม่สามารถบวกกับ int ได้",
          "SyntaxError: input ใช้ไม่ได้แบบนี้",
          "ผลลัพธ์จะเป็น x1 (ต่อสตริง)"
        ],
        correct: 1,
        explanation: "input() คืนค่าเป็น str เสมอ การนำ str บวกกับ int จะเกิด TypeError ต้องแปลงก่อนด้วย int(input()) จึงจะบวกตัวเลขได้",
      },
      {
        type: "quiz",
        id: "PY-L02-Q2",
        question: "ถ้า input ส่งมาว่า '10 20 30' จะต้องเขียนโค้ดแบบใดเพื่อรับเป็น 3 ตัวแปร int?",
        options: [
          "a, b, c = int(input())",
          "a, b, c = map(int, input().split())",
          "a, b, c = input().split(int)",
          "a = int(input()); b = int(input()); c = int(input())"
        ],
        correct: 1,
        explanation: "map(int, input().split()) คือวิธีมาตรฐานใน Python สำหรับรับหลายค่าในบรรทัดเดียว: input().split() แยกเป็น list ของ str แล้ว map(int, ...) แปลงทุกตัวเป็น int",
      },
      {
        type: "coding",
        id: "PY-L02-C1",
        instruction: "รับจำนวนเต็ม 2 ตัวในบรรทัดเดียว แล้วแสดงผลรวมของทั้งสอง",
        starterCode: {
          python: `a, b = map(int, input().split())
# เขียนโค้ดที่นี่
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "3 5", expectedOutput: "8", label: "รวม 3+5" },
          { input: "10 20", expectedOutput: "30", label: "รวม 10+20" },
          { input: "0 100", expectedOutput: "100", label: "รวมกับ 0" },
          { input: "-5 5", expectedOutput: "0", label: "รวมลบกับบวก" },
        ],
        hints: [
          "ใช้ print(a + b) เพื่อแสดงผล",
          "map(int, input().split()) รับ 2 ค่าในบรรทัดเดียวแล้วแปลงเป็น int ทั้งคู่",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L03 — การคำนวณและตัวดำเนินการ
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L03",
    lang: "python" as const,
    order: 3,
    title: "การคำนวณและตัวดำเนินการ",
    description: "ตัวดำเนินการทางคณิตศาสตร์ใน Python: +,-,*,/,//,%,** พร้อมความแตกต่างระหว่าง / (float division) และ // (integer division)",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## ตัวดำเนินการทางคณิตศาสตร์ใน Python

| ตัวดำเนินการ | ชื่อ | ตัวอย่าง | ผลลัพธ์ |
|---|---|---|---|
| \`+\` | บวก | \`3 + 5\` | \`8\` |
| \`-\` | ลบ | \`10 - 3\` | \`7\` |
| \`*\` | คูณ | \`4 * 6\` | \`24\` |
| \`/\` | หาร (float) | \`7 / 2\` | \`3.5\` |
| \`//\` | หารปัดลง (int) | \`7 // 2\` | \`3\` |
| \`%\` | เศษหาร (modulo) | \`7 % 2\` | \`1\` |
| \`**\` | ยกกำลัง | \`2 ** 10\` | \`1024\` |

---

## / vs // — ความแตกต่างสำคัญ!

\`\`\`python
# / คือ float division — ได้ผลเป็น float เสมอ
print(7 / 2)    # 3.5
print(6 / 2)    # 3.0 (ไม่ใช่ 3!)
print(10 / 5)   # 2.0

# // คือ integer division (floor division) — ปัดลงเสมอ
print(7 // 2)   # 3
print(6 // 2)   # 3
print(-7 // 2)  # -4 (ปัดลง ไม่ใช่ -3!)
\`\`\`

> ใน C/C++ การหาร int ด้วย int ได้ int อยู่แล้ว แต่ Python ใช้ \`//\` แทน

---

## % (Modulo) — เศษหาร

ใช้บ่อยมากใน competitive programming โดยเฉพาะ "เลขคู่/คี่"

\`\`\`python
print(10 % 3)   # 1 (10 = 3*3 + 1)
print(15 % 5)   # 0 (หารลงตัว)
print(7 % 2)    # 1 (เลขคี่)
print(8 % 2)    # 0 (เลขคู่)

# ตรวจสอบเลขคู่/คี่
n = 17
if n % 2 == 0:
    print("เลขคู่")
else:
    print("เลขคี่")
\`\`\`

---

## ** (ยกกำลัง)

\`\`\`python
print(2 ** 10)   # 1024
print(3 ** 3)    # 27
print(4 ** 0.5)  # 2.0 (รากที่สอง!)
print(9 ** 0.5)  # 3.0

# ระวัง: Python จัดการเลขใหญ่ได้ไม่จำกัด!
print(2 ** 100)  # 1267650600228229401496703205376
\`\`\`

---

## ลำดับการคำนวณ (Operator Precedence)

เหมือนคณิตศาสตร์ปกติ: \`**\` → \`*//%\` → \`+-\`

\`\`\`python
print(2 + 3 * 4)      # 14 (ไม่ใช่ 20)
print((2 + 3) * 4)    # 20
print(2 ** 3 + 1)     # 9 (ไม่ใช่ 16)
print(10 - 2 ** 2)    # 6
\`\`\`

---

## ตัวอย่างการใช้งานจริง

\`\`\`python
# หาผลรวม 1 ถึง n ด้วยสูตร Gauss
n = int(input())
total = n * (n + 1) // 2
print(total)

# แปลงวินาทีเป็นชั่วโมง นาที วินาที
t = int(input())
h = t // 3600
m = (t % 3600) // 60
s = t % 60
print(h, m, s)
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L03-Q1",
        question: "ผลของ 7 / 2 ใน Python คืออะไร?",
        options: [
          "3 (int)",
          "3.5 (float)",
          "3.0 (float)",
          "Error"
        ],
        correct: 1,
        explanation: "ใน Python 3, / คือ float division เสมอ ดังนั้น 7 / 2 = 3.5 ถ้าต้องการผลลัพธ์เป็น int ต้องใช้ // แทน: 7 // 2 = 3 นี่คือความแตกต่างจาก C/C++ ที่ int/int = int",
      },
      {
        type: "quiz",
        id: "PY-L03-Q2",
        question: "ใน Python จะคำนวณ 2^10 (2 ยกกำลัง 10) อย่างไร?",
        options: [
          "2 ^ 10",
          "pow(2, 10) เท่านั้น",
          "2 ** 10",
          "2 ^^ 10"
        ],
        correct: 2,
        explanation: "ใน Python ใช้ ** สำหรับยกกำลัง ดังนั้น 2 ** 10 = 1024 (^ ใน Python คือ XOR ไม่ใช่ยกกำลัง!) pow(2, 10) ก็ได้เช่นกัน แต่ ** ใช้บ่อยกว่าใน competitive programming",
      },
      {
        type: "coding",
        id: "PY-L03-C1",
        instruction: "รับจำนวนวินาที t (0 ≤ t ≤ 86399) แล้วแสดงผลเป็น ชั่วโมง นาที วินาที คั่นด้วยช่องว่าง\nตัวอย่าง: input '3661' → output '1 1 1'",
        starterCode: {
          python: `t = int(input())
# แปลงวินาทีเป็น ชั่วโมง นาที วินาที
# ใช้ // และ %
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "3661", expectedOutput: "1 1 1", label: "1 ชม 1 นาที 1 วิ" },
          { input: "0", expectedOutput: "0 0 0", label: "เริ่มจากศูนย์" },
          { input: "86399", expectedOutput: "23 59 59", label: "ก่อนเที่ยงคืน" },
          { input: "3600", expectedOutput: "1 0 0", label: "1 ชั่วโมงพอดี" },
        ],
        hints: [
          "ชั่วโมง = t // 3600",
          "นาที = (t % 3600) // 60",
          "วินาที = t % 60",
          "ใช้ print(h, m, s) แสดงพร้อมกัน คั่นด้วย space อัตโนมัติ",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L04 — เงื่อนไข if/elif/else
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L04",
    lang: "python" as const,
    order: 4,
    title: "เงื่อนไข if/elif/else",
    description: "การใช้ if/elif/else ใน Python ด้วย colon + indentation แทน {}, ตัวดำเนินการเปรียบเทียบ, and/or/not",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## if/elif/else ใน Python

ใน Python ใช้ colon (\`:\`) และ **indentation** แทนวงเล็บปีกกา \`{}\` ของ C/C++

**โครงสร้าง:**
\`\`\`python
if เงื่อนไข:
    # โค้ดที่รัน ถ้าเงื่อนไขเป็นจริง
elif เงื่อนไข2:
    # โค้ดที่รัน ถ้าเงื่อนไข2 เป็นจริง
else:
    # โค้ดที่รัน ถ้าทุกเงื่อนไขเป็นเท็จ
\`\`\`

\`\`\`python
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

---

## ตัวดำเนินการเปรียบเทียบ

| ตัวดำเนินการ | ความหมาย |
|---|---|
| \`==\` | เท่ากับ |
| \`!=\` | ไม่เท่ากับ |
| \`>\` | มากกว่า |
| \`<\` | น้อยกว่า |
| \`>=\` | มากกว่าหรือเท่ากับ |
| \`<=\` | น้อยกว่าหรือเท่ากับ |

---

## and, or, not — ตัวดำเนินการตรรกะ

\`\`\`python
# ใน C/C++ ใช้ &&, ||, !
# ใน Python ใช้ and, or, not (ชัดเจนกว่ามาก!)

x = 15

# and: ทั้งสองเงื่อนไขต้องจริง
if x > 10 and x < 20:
    print("x อยู่ระหว่าง 10 ถึง 20")

# or: อย่างน้อยหนึ่งเงื่อนไขต้องจริง
if x < 0 or x > 100:
    print("x อยู่นอกช่วง")

# not: กลับค่า
if not (x == 0):
    print("x ไม่ใช่ศูนย์")
\`\`\`

---

## Chained Comparison (Python เท่านั้น!)

\`\`\`python
# ใน C/C++ ต้องเขียน: 0 < x && x < 10
# Python เขียนได้แบบนี้:
x = 5
if 0 < x < 10:
    print("x อยู่ระหว่าง 0 ถึง 9")

# ใช้กับ 3 ค่าก็ได้
if 1 <= x <= 100:
    print("x อยู่ใน 1-100")
\`\`\`

---

## ตัวอย่าง — หาค่าสัมบูรณ์

\`\`\`python
n = int(input())
if n < 0:
    print(-n)
else:
    print(n)

# หรือใช้ built-in
print(abs(n))
\`\`\`

---

## one-liner if (ternary)

\`\`\`python
# โครงสร้าง: value_true if เงื่อนไข else value_false
x = 10
result = "คู่" if x % 2 == 0 else "คี่"
print(result)  # คู่
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L04-Q1",
        question: "โค้ด Python ต่อไปนี้ถูกต้องหรือไม่?\n```python\nif x > 0\n    print(x)\n```",
        options: [
          "ถูกต้อง",
          "ผิด — ขาด colon (:) หลัง if",
          "ผิด — ต้องมี () รอบเงื่อนไข",
          "ผิด — ต้องมี {} รอบ body"
        ],
        correct: 1,
        explanation: "Python ต้องการ colon (:) ต่อท้ายเงื่อนไขทุกครั้ง โครงสร้างที่ถูกต้องคือ 'if x > 0:' (มี : ต่อท้าย) และไม่ต้องมี () รอบเงื่อนไข และไม่ต้องมี {} รอบ body",
      },
      {
        type: "quiz",
        id: "PY-L04-Q2",
        question: "โค้ดต่อไปนี้แสดงอะไรเมื่อ x = 15?\n```python\nif 10 < x < 20:\n    print(\"A\")\nelse:\n    print(\"B\")\n```",
        options: [
          "B",
          "A",
          "AB",
          "Error — Python ไม่รองรับ chained comparison"
        ],
        correct: 1,
        explanation: "Python รองรับ chained comparison (10 < x < 20) ซึ่งหมายถึง x > 10 AND x < 20 เมื่อ x = 15 เงื่อนไขเป็นจริง จึงแสดง A นี่เป็น Python feature พิเศษที่ C/C++ ไม่มี",
      },
      {
        type: "coding",
        id: "PY-L04-C1",
        instruction: "รับจำนวนเต็ม n แล้วบอกว่าเป็น 'positive', 'negative', หรือ 'zero'",
        starterCode: {
          python: `n = int(input())
# ตรวจสอบและแสดงผล positive, negative, หรือ zero
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "5", expectedOutput: "positive", label: "บวก" },
          { input: "-3", expectedOutput: "negative", label: "ลบ" },
          { input: "0", expectedOutput: "zero", label: "ศูนย์" },
          { input: "100", expectedOutput: "positive", label: "บวกใหญ่" },
        ],
        hints: [
          "ใช้ if/elif/else ตรวจสอบทีละกรณี",
          "ตรวจสอบ n > 0, n < 0, แล้วค่อย else สำหรับ 0",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L05 — วนซ้ำด้วย for loop
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L05",
    lang: "python" as const,
    order: 5,
    title: "วนซ้ำด้วย for loop",
    description: "การใช้ for loop ใน Python ด้วย range(), วนซ้ำใน list, break และ continue",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## for loop ใน Python

Python ใช้ for loop แตกต่างจาก C/C++ — ไม่ใช้ \`for(int i=0; i<n; i++)\` แต่ใช้ range()

---

## range() — สร้างลำดับตัวเลข

\`\`\`python
# range(n) — 0 ถึง n-1
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4

# range(start, stop) — start ถึง stop-1
for i in range(1, 6):
    print(i)
# Output: 1, 2, 3, 4, 5

# range(start, stop, step) — กระโดดทีละ step
for i in range(0, 10, 2):
    print(i)
# Output: 0, 2, 4, 6, 8

# นับถอยหลัง
for i in range(5, 0, -1):
    print(i)
# Output: 5, 4, 3, 2, 1
\`\`\`

---

## for วนใน list/string

\`\`\`python
# วนใน list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# วนใน string
for ch in "Hello":
    print(ch)
# Output: H, e, l, l, o

# enumerate() — ได้ index พร้อมค่า
for i, fruit in enumerate(fruits):
    print(i, fruit)
# Output: 0 apple, 1 banana, 2 cherry
\`\`\`

---

## break และ continue

\`\`\`python
# break — ออกจาก loop ทันที
for i in range(10):
    if i == 5:
        break
    print(i)
# Output: 0, 1, 2, 3, 4

# continue — ข้ามรอบนี้ ไปรอบถัดไป
for i in range(10):
    if i % 2 == 0:
        continue    # ข้ามเลขคู่
    print(i)
# Output: 1, 3, 5, 7, 9
\`\`\`

---

## ตัวอย่างการใช้งานจริง

\`\`\`python
# หาผลรวม 1 ถึง n
n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print(total)

# แสดงตารางสูตรคูณ
n = int(input())
for i in range(1, 13):
    print(f"{n} x {i} = {n * i}")

# หาค่า max ใน list
numbers = list(map(int, input().split()))
max_val = numbers[0]
for x in numbers:
    if x > max_val:
        max_val = x
print(max_val)
\`\`\`

---

## Nested loop (วนซ้อน)

\`\`\`python
# พิมพ์ตารางคูณ
for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end=" ")
    print()  # ขึ้นบรรทัดใหม่
\`\`\`

Output:
\`\`\`
1 2 3
2 4 6
3 6 9
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L05-Q1",
        question: "range(2, 10, 3) สร้างตัวเลขอะไรบ้าง?",
        options: [
          "2, 3, 4, 5, 6, 7, 8, 9",
          "2, 5, 8",
          "2, 4, 6, 8",
          "3, 6, 9"
        ],
        correct: 1,
        explanation: "range(start, stop, step) สร้างตัวเลขเริ่มจาก 2, กระโดดทีละ 3, จนถึงก่อน 10 ดังนั้นได้ 2, 5, 8 (ตัวถัดไปคือ 11 ซึ่ง >= 10 จึงหยุด)",
      },
      {
        type: "quiz",
        id: "PY-L05-Q2",
        question: "ต้องการวนเฉพาะเลขคี่จาก 1 ถึง 9 โดยใช้ range เพียงอย่างเดียว ควรเขียนอย่างไร?",
        options: [
          "for i in range(9): if i % 2 != 0:",
          "for i in range(1, 10, 2):",
          "for i in range(1, 10, 1) if odd:",
          "for i in range(odd, 10):"
        ],
        correct: 1,
        explanation: "range(1, 10, 2) สร้างเลข 1, 3, 5, 7, 9 ซึ่งเป็นเลขคี่ทั้งหมด การใช้ step=2 เริ่มจาก 1 ทำให้ได้เลขคี่โดยตรง มีประสิทธิภาพกว่าการใช้ if ตรวจสอบทุกรอบ",
      },
      {
        type: "coding",
        id: "PY-L05-C1",
        instruction: "รับจำนวนเต็ม n แล้วแสดงผลรวมของเลข 1 ถึง n (Inclusive)\nตัวอย่าง: n=5 → 1+2+3+4+5 = 15",
        starterCode: {
          python: `n = int(input())
total = 0
# วนบวกด้วย for loop
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "5", expectedOutput: "15", label: "1+2+3+4+5" },
          { input: "1", expectedOutput: "1", label: "แค่ 1" },
          { input: "10", expectedOutput: "55", label: "1 ถึง 10" },
          { input: "100", expectedOutput: "5050", label: "สูตร Gauss" },
        ],
        hints: [
          "ใช้ for i in range(1, n+1) เพื่อวนตั้งแต่ 1 ถึง n",
          "บวกสะสมด้วย total += i ทุกรอบ",
          "print(total) หลังจบ loop",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L06 — while loop
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L06",
    lang: "python" as const,
    order: 6,
    title: "while loop",
    description: "การใช้ while loop ใน Python, รูปแบบ while True: สำหรับ infinite loop, break และ continue",
    estimatedMinutes: 20,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## while loop ใน Python

\`while\` ใช้เมื่อไม่รู้ว่าจะวนกี่รอบ — วนจนเงื่อนไขเป็นเท็จ

\`\`\`python
# โครงสร้าง
while เงื่อนไข:
    # โค้ดที่วนซ้ำ

# ตัวอย่าง: นับ 1 ถึง 5
i = 1
while i <= 5:
    print(i)
    i += 1
# Output: 1, 2, 3, 4, 5
\`\`\`

---

## เปรียบเทียบ for vs while

\`\`\`python
# for — รู้จำนวนรอบล่วงหน้า
for i in range(1, 6):
    print(i)

# while — เทียบเท่า
i = 1
while i <= 5:
    print(i)
    i += 1
\`\`\`

ใช้ \`for\` เมื่อรู้จำนวนรอบ ใช้ \`while\` เมื่อวนจนเงื่อนไขเปลี่ยน

---

## while True — Infinite Loop Pattern

\`\`\`python
# วนไปเรื่อยๆ จนกว่าจะ break
while True:
    s = input()
    if s == "quit":
        break
    print("คุณพิมพ์:", s)
\`\`\`

---

## break และ continue ใน while

\`\`\`python
# break — ออกจาก loop ทันที
i = 0
while True:
    i += 1
    if i == 5:
        break
print("หยุดที่", i)  # หยุดที่ 5

# continue — ข้ามรอบนี้
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue    # ข้ามเลขคู่
    print(i)
# Output: 1, 3, 5, 7, 9
\`\`\`

---

## ตัวอย่างที่ใช้บ่อยใน Competitive Programming

\`\`\`python
# อ่าน input จนหมด (EOF) — รูปแบบที่พบบ่อย
import sys
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    n = int(line)
    print(n * 2)
\`\`\`

\`\`\`python
# อัลกอริทึม Euclidean GCD
a = int(input())
b = int(input())
while b != 0:
    a, b = b, a % b
print(a)  # GCD
\`\`\`

\`\`\`python
# Binary search แบบ while
arr = [1, 3, 5, 7, 9, 11, 13]
target = 7
lo, hi = 0, len(arr) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if arr[mid] == target:
        print("พบที่ index", mid)
        break
    elif arr[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1
\`\`\`

---

## ระวัง: Infinite Loop

\`\`\`python
# อันตราย! ถ้าลืม i += 1 จะวนไม่มีจบ
i = 0
while i < 10:
    print(i)
    # ลืม i += 1 !!!
\`\`\`

ถ้าโปรแกรมค้าง กด **Ctrl+C** เพื่อหยุด`,
      },
      {
        type: "quiz",
        id: "PY-L06-Q1",
        question: "โค้ดต่อไปนี้แสดงอะไร?\n```python\ni = 10\nwhile i > 0:\n    i -= 3\nprint(i)\n```",
        options: [
          "0",
          "-2",
          "1",
          "วนไม่จบ"
        ],
        correct: 1,
        explanation: "เริ่มจาก i=10: ลบ 3 → 7 → 4 → 1 → -2 เมื่อ i=-2 เงื่อนไข i>0 เป็นเท็จ loop หยุด จึงแสดง -2 สังเกตว่า loop ไม่หยุดที่ 0 เพราะก้าวกระโดดเกิน",
      },
      {
        type: "quiz",
        id: "PY-L06-Q2",
        question: "รูปแบบ 'while True:' ใช้ทำอะไร และหยุดได้อย่างไร?",
        options: [
          "ใช้สำหรับ loop ที่มีจำนวนรอบแน่นอน หยุดด้วย return",
          "ใช้สำหรับ loop ที่ไม่รู้จำนวนรอบล่วงหน้า หยุดด้วย break",
          "ไม่ควรใช้ — เป็น pattern ที่ผิด",
          "หยุดได้เองเมื่อรันครบ 1000 รอบ"
        ],
        correct: 1,
        explanation: "while True: สร้าง infinite loop ที่ไม่มีจุดสิ้นสุดโดยตัวเอง นิยมใช้เมื่อต้องการควบคุมเงื่อนไขออกจาก loop ภายใน body เช่น อ่าน input จนกว่าจะพบ 'quit' แล้วใช้ break ออก",
      },
      {
        type: "coding",
        id: "PY-L06-C1",
        instruction: "รับจำนวนเต็ม n แล้วหา GCD (ห.ร.ม.) ของ n กับ 100 โดยใช้ while loop และอัลกอริทึม Euclidean\nตัวอย่าง: n=75 → GCD(75,100) = 25",
        starterCode: {
          python: `n = int(input())
a, b = n, 100
# ใช้ Euclidean algorithm: while b != 0: a, b = b, a % b
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "75", expectedOutput: "25", label: "GCD(75,100)" },
          { input: "50", expectedOutput: "50", label: "GCD(50,100)" },
          { input: "7", expectedOutput: "1", label: "GCD(7,100)=1" },
          { input: "100", expectedOutput: "100", label: "GCD(100,100)" },
        ],
        hints: [
          "Euclidean: while b != 0: a, b = b, a % b",
          "หลัง loop จบ a คือ GCD",
          "print(a) เมื่อ loop จบ",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L07 — String ใน Python
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L07",
    lang: "python" as const,
    order: 7,
    title: "String ใน Python",
    description: "การทำงานกับ string: indexing, slicing, len(), split(), join(), f-string, และ string methods",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## String ใน Python

String คือลำดับของ character มองได้เหมือน list ของตัวอักษร

\`\`\`python
s = "Hello"
print(s[0])    # H — index เริ่มจาก 0
print(s[1])    # e
print(s[-1])   # o — index ลบ = นับจากท้าย
print(s[-2])   # l
\`\`\`

---

## Slicing — ตัดส่วนของ string

\`\`\`python
s = "Hello World"
#    01234567890

print(s[0:5])    # Hello (index 0 ถึง 4)
print(s[6:11])   # World
print(s[:5])     # Hello (ตั้งแต่ต้น)
print(s[6:])     # World (จนถึงท้าย)
print(s[::-1])   # dlroW olleH (กลับด้าน!)
print(s[::2])    # HloWrd (ทุก 2 ตัว)
\`\`\`

---

## len() — ความยาวของ string

\`\`\`python
s = "Hello"
print(len(s))    # 5

# วนอ่านทุก character
for i in range(len(s)):
    print(s[i])

# หรือง่ายกว่า
for ch in s:
    print(ch)
\`\`\`

---

## split() และ join()

\`\`\`python
# split() — แยก string เป็น list
s = "apple banana cherry"
words = s.split()           # ["apple", "banana", "cherry"]
words2 = s.split(",")       # ถ้า "a,b,c" → ["a", "b", "c"]

# join() — รวม list เป็น string
words = ["Hello", "World"]
s = " ".join(words)         # "Hello World"
s2 = ",".join(words)        # "Hello,World"
s3 = "".join(words)         # "HelloWorld"
\`\`\`

---

## f-string — การแทรกค่าใน string

\`\`\`python
name = "Bank"
score = 95

# f-string (Python 3.6+) — นิยมที่สุด
print(f"ชื่อ: {name}, คะแนน: {score}")

# จัดรูปแบบตัวเลข
pi = 3.14159
print(f"pi = {pi:.2f}")     # pi = 3.14 (ทศนิยม 2 ตำแหน่ง)
print(f"{score:5d}")        # "   95" (ความกว้าง 5)
\`\`\`

---

## String Methods ที่ใช้บ่อย

\`\`\`python
s = "  Hello World  "

print(s.upper())      # "  HELLO WORLD  "
print(s.lower())      # "  hello world  "
print(s.strip())      # "Hello World" (ตัด whitespace)
print(s.lstrip())     # "Hello World  " (ตัดซ้าย)
print(s.rstrip())     # "  Hello World" (ตัดขวา)

s2 = "Hello World"
print(s2.replace("World", "Python"))  # "Hello Python"
print(s2.find("World"))               # 6 (ตำแหน่งที่พบ)
print(s2.count("l"))                  # 3 (จำนวนครั้ง)
print(s2.startswith("Hello"))         # True
print(s2.endswith("World"))           # True
\`\`\`

---

## ตัวอย่าง — Palindrome

\`\`\`python
s = input().lower().strip()
if s == s[::-1]:
    print("palindrome")
else:
    print("not palindrome")
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L07-Q1",
        question: "ผลของ 'Hello'[::-1] ใน Python คืออะไร?",
        options: [
          "'Hello' (ไม่เปลี่ยน)",
          "'olleH' (กลับด้าน)",
          "Error",
          "['H','e','l','l','o'] (แปลงเป็น list)"
        ],
        correct: 1,
        explanation: "Slice แบบ s[::-1] หมายถึง step=-1 คือวิ่งจากท้ายมาหน้า ทำให้ string กลับด้าน 'Hello'[::-1] = 'olleH' นี่เป็น Python trick ที่ใช้บ่อยใน competitive programming สำหรับตรวจ palindrome",
      },
      {
        type: "quiz",
        id: "PY-L07-Q2",
        question: "โค้ดต่อไปนี้แสดงผลอะไร?\n```python\nwords = ['a', 'b', 'c']\nprint('-'.join(words))\n```",
        options: [
          "['a', 'b', 'c']",
          "a b c",
          "a-b-c",
          "abc"
        ],
        correct: 2,
        explanation: "join() รวม elements ใน list เป็น string โดยใช้ตัวคั่นที่กำหนด '-'.join(['a','b','c']) ใช้ '-' เป็นตัวคั่น ได้ผล 'a-b-c' ถ้าใช้ ' '.join() ได้ 'a b c' และ ''.join() ได้ 'abc'",
      },
      {
        type: "coding",
        id: "PY-L07-C1",
        instruction: "รับ string 1 บรรทัด แล้วแสดงผล:\n1. ความยาวของ string\n2. string กลับด้าน\n3. string ในรูปตัวพิมพ์ใหญ่ทั้งหมด",
        starterCode: {
          python: `s = input()
# แสดง 3 บรรทัด: len, reversed, upper
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "hello", expectedOutput: "5\nolleh\nHELLO", label: "hello" },
          { input: "Python", expectedOutput: "6\nnohtyP\nPYTHON", label: "Python" },
          { input: "a", expectedOutput: "1\na\nA", label: "single char" },
        ],
        hints: [
          "print(len(s)) สำหรับความยาว",
          "print(s[::-1]) สำหรับกลับด้าน",
          "print(s.upper()) สำหรับตัวพิมพ์ใหญ่",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PY-L08 — List ใน Python
  // ═══════════════════════════════════════════════════════════════
  {
    id: "PY-L08",
    lang: "python" as const,
    order: 8,
    title: "List ใน Python",
    description: "การสร้างและใช้งาน List: append, len, sorted/sort, indexing, list comprehension",
    estimatedMinutes: 25,
    relatedProblems: [],
    sections: [
      {
        type: "content",
        markdown: `## List ใน Python

List คือ array ใน Python — เก็บหลายค่าในตัวแปรเดียว สามารถเปลี่ยนแปลงได้ (mutable)

\`\`\`python
# สร้าง list
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

# เข้าถึงข้อมูล
print(numbers[0])   # 1
print(numbers[-1])  # 5 (ท้ายสุด)
print(numbers[1:4]) # [2, 3, 4] (slicing)
\`\`\`

---

## เพิ่ม/แก้ไข/ลบ

\`\`\`python
lst = [1, 2, 3]

# เพิ่มข้อมูล
lst.append(4)       # [1, 2, 3, 4]
lst.insert(0, 0)    # [0, 1, 2, 3, 4]

# แก้ไข
lst[0] = 10         # [10, 1, 2, 3, 4]

# ลบ
lst.pop()           # ลบตัวท้าย → [10, 1, 2, 3]
lst.pop(0)          # ลบ index 0 → [1, 2, 3]
lst.remove(2)       # ลบค่า 2 → [1, 3]

# ความยาว
print(len(lst))     # 2
\`\`\`

---

## การเรียงลำดับ

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sorted() — คืนค่า list ใหม่ (ไม่เปลี่ยน original)
sorted_nums = sorted(numbers)           # [1, 1, 2, 3, 4, 5, 6, 9]
desc = sorted(numbers, reverse=True)    # [9, 6, 5, 4, 3, 2, 1, 1]

# sort() — เรียงใน place (เปลี่ยน original)
numbers.sort()
print(numbers)      # [1, 1, 2, 3, 4, 5, 6, 9]
\`\`\`

---

## List Comprehension — Python เท่านั้น!

สร้าง list ด้วยสูตรใน 1 บรรทัด ได้ผลเหมือน for loop แต่กระทัดรัดกว่า

\`\`\`python
# for loop ธรรมดา
squares = []
for x in range(1, 6):
    squares.append(x * x)
# squares = [1, 4, 9, 16, 25]

# list comprehension (เทียบเท่า แต่สั้นกว่า)
squares = [x * x for x in range(1, 6)]
# [1, 4, 9, 16, 25]

# กรองด้วย if
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# แปลงข้อมูล
words = ["hello", "world"]
upper = [w.upper() for w in words]
# ["HELLO", "WORLD"]
\`\`\`

---

## Built-in Functions กับ List

\`\`\`python
numbers = [3, 1, 4, 1, 5, 9]

print(sum(numbers))     # 23
print(min(numbers))     # 1
print(max(numbers))     # 9
print(len(numbers))     # 6
print(5 in numbers)     # True (ตรวจสอบว่ามีค่านี้ไหม)
print(7 in numbers)     # False
\`\`\`

---

## รับ List จาก input

\`\`\`python
# รับ n ตัวในบรรทัดเดียว
numbers = list(map(int, input().split()))

# รับทีละบรรทัด n บรรทัด
n = int(input())
numbers = [int(input()) for _ in range(n)]
\`\`\`

---

## ตัวอย่างจริง — หาค่า max

\`\`\`python
numbers = list(map(int, input().split()))
print(max(numbers))  # ง่ายมาก!

# หรือถ้าต้องทำเอง
max_val = numbers[0]
for x in numbers:
    if x > max_val:
        max_val = x
print(max_val)
\`\`\``,
      },
      {
        type: "quiz",
        id: "PY-L08-Q1",
        question: "ความแตกต่างระหว่าง sorted(lst) และ lst.sort() คืออะไร?",
        options: [
          "ไม่มีความแตกต่าง — ทั้งคู่ให้ผลเหมือนกัน",
          "sorted() คืนค่า list ใหม่ ส่วน sort() แก้ไข list เดิม",
          "sorted() เร็วกว่า sort()",
          "sort() คืนค่า list ใหม่ ส่วน sorted() แก้ไข list เดิม"
        ],
        correct: 1,
        explanation: "sorted(lst) คืนค่า list ใหม่ที่เรียงแล้วโดยไม่เปลี่ยน lst เดิม ส่วน lst.sort() เรียงลำดับ lst เดิมทันทีและคืนค่า None ดังนั้น a = lst.sort() จะทำให้ a เป็น None!",
      },
      {
        type: "quiz",
        id: "PY-L08-Q2",
        question: "List comprehension ต่อไปนี้แสดงผลอะไร?\n```python\nresult = [x**2 for x in range(5) if x % 2 != 0]\nprint(result)\n```",
        options: [
          "[0, 1, 4, 9, 16]",
          "[1, 9]",
          "[1, 3]",
          "[0, 4, 16]"
        ],
        correct: 1,
        explanation: "range(5) สร้าง 0,1,2,3,4 กรองเฉพาะที่ x%2 != 0 (เลขคี่) ได้ 1 และ 3 แล้วยกกำลัง 2 ได้ [1, 9] list comprehension [x**2 for x in range(5) if x%2!=0] อ่านจากซ้ายไปขวา: ค่าที่เก็บ → for loop → เงื่อนไข",
      },
      {
        type: "coding",
        id: "PY-L08-C1",
        instruction: "รับจำนวนเต็ม n ตัวในบรรทัดเดียว แล้วแสดงผลรวม ค่าน้อยสุด และค่ามากสุด (แต่ละค่าอยู่คนละบรรทัด)\nตัวอย่าง: '3 1 4 1 5' → sum=14, min=1, max=5",
        starterCode: {
          python: `numbers = list(map(int, input().split()))
# แสดง sum, min, max แต่ละบรรทัด
`,
          cpp: "",
          c: "",
        },
        testCases: [
          { input: "3 1 4 1 5", expectedOutput: "14\n1\n5", label: "ทั่วไป" },
          { input: "10", expectedOutput: "10\n10\n10", label: "ค่าเดียว" },
          { input: "5 5 5 5", expectedOutput: "20\n5\n5", label: "ค่าซ้ำ" },
          { input: "-3 0 3", expectedOutput: "0\n-3\n3", label: "มีค่าลบ" },
        ],
        hints: [
          "ใช้ sum(numbers), min(numbers), max(numbers)",
          "print แต่ละค่าแยกบรรทัด",
          "list(map(int, input().split())) รับหลายค่าในบรรทัดเดียว",
        ],
      },
    ],
  },

];
