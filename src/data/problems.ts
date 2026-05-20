export type Level = "A1" | "A2" | "A3";
export type Language = "cpp" | "c" | "python";

export interface TestCase {
  input: string;
  expectedOutput: string;
  label?: string;
}

export interface Problem {
  id: string;
  level: Level;
  title: string;
  description: string;
  inputSpec: string;
  outputSpec: string;
  examples: TestCase[];
  testCases: TestCase[];
  hints?: string[];
  tags?: string[];
}

export const PROBLEMS: Problem[] = [
  {
    id: "A1001",
    level: "A1",
    title: "Hello Name",
    description:
      "รับชื่อและนามสกุลของผู้ใช้ แล้วทักทายและแสดงอักษรย่อ\n\nบรรทัดแรกให้พิมพ์ `Hello [name] [surname]` และบรรทัดที่สองให้พิมพ์ตัวอักษร **2 ตัวแรก** ของชื่อ ตามด้วยตัวอักษร **2 ตัวแรก** ของนามสกุล รวมกันเป็นตัวย่อ 4 ตัว",
    inputSpec: "2 บรรทัด: บรรทัดแรกคือชื่อ บรรทัดที่สองคือนามสกุล",
    outputSpec:
      "บรรทัดแรก: `Hello name surname`\nบรรทัดที่สอง: อักษร 2 ตัวแรกของชื่อ + อักษร 2 ตัวแรกของนามสกุล",
    examples: [
      {
        input: "Kawin\nKawee",
        expectedOutput: "Hello Kawin Kawee\nKaKa",
        label: "ตัวอย่าง 1",
      },
      {
        input: "Bank\nOracle",
        expectedOutput: "Hello Bank Oracle\nBaOr",
        label: "ตัวอย่าง 2",
      },
    ],
    testCases: [
      { input: "Alice\nWonder", expectedOutput: "Hello Alice Wonder\nAlWo" },
      { input: "Jo\nLi", expectedOutput: "Hello Jo Li\nJoLi" },
    ],
    tags: ["string", "input/output"],
  },
  {
    id: "A1002",
    level: "A1",
    title: "Coin Change",
    description:
      "รับจำนวนเงิน (บาท) แล้วแตกออกเป็นเหรียญ **10, 5, 2, 1** บาท โดยใช้เหรียญมูลค่าสูงก่อน\n\nตัวอย่าง: เงิน 37 บาท → 10×3, 5×1, 2×1, 1×0",
    inputSpec: "จำนวนเต็ม 1 ค่า (0 ≤ money ≤ 10,000)",
    outputSpec:
      "4 บรรทัด:\n```\n10 = X\n5 = X\n2 = X\n1 = X\n```",
    examples: [
      {
        input: "37",
        expectedOutput: "10 = 3\n5 = 1\n2 = 1\n1 = 0",
        label: "เงิน 37 บาท",
      },
      {
        input: "100",
        expectedOutput: "10 = 10\n5 = 0\n2 = 0\n1 = 0",
        label: "เงิน 100 บาท",
      },
    ],
    testCases: [
      { input: "23", expectedOutput: "10 = 2\n5 = 0\n2 = 1\n1 = 1" },
      { input: "7", expectedOutput: "10 = 0\n5 = 1\n2 = 1\n1 = 0" },
    ],
    tags: ["math", "modulo"],
  },
  {
    id: "A1003",
    level: "A1",
    title: "Max of Three",
    description:
      "รับตัวเลข 3 ค่า แล้วหาและแสดงค่าที่มากที่สุด",
    inputSpec: "ทศนิยม 3 ค่า แต่ละค่าอยู่บรรทัดแยกกัน",
    outputSpec: "ค่าที่มากที่สุด",
    examples: [
      { input: "3.5\n7.2\n1.0", expectedOutput: "7.2", label: "ตัวอย่าง 1" },
      { input: "100\n50\n100", expectedOutput: "100", label: "ค่าเท่ากัน" },
    ],
    testCases: [
      { input: "0\n-5\n3", expectedOutput: "3" },
      { input: "99.9\n100.0\n50.5", expectedOutput: "100" },
    ],
    tags: ["if-else", "comparison"],
  },
  {
    id: "A1004",
    level: "A1",
    title: "Exam Pass/Fail",
    description:
      "ตัดสินผลการสอบจาก 3 เงื่อนไข:\n- คะแนนงาน ≥ 5\n- คะแนนกลางภาค ≥ 20\n- คะแนนปลายภาค ≥ 25\n\nถ้าผ่านทุกเงื่อนไขพิมพ์ `pass` ถ้าไม่ผ่านแม้เงื่อนไขเดียวพิมพ์ `fail`",
    inputSpec: "จำนวนเต็ม 3 ค่า: work, mid, final (แต่ละค่าอยู่บรรทัดแยกกัน)",
    outputSpec: "`pass` หรือ `fail`",
    examples: [
      { input: "5\n20\n25", expectedOutput: "pass", label: "ผ่านพอดี" },
      { input: "5\n19\n30", expectedOutput: "fail", label: "กลางภาคไม่ผ่าน" },
    ],
    testCases: [
      { input: "10\n40\n45", expectedOutput: "pass" },
      { input: "4\n25\n30", expectedOutput: "fail" },
    ],
    tags: ["if-else", "logical"],
  },
  {
    id: "A1005",
    level: "A1",
    title: "Season",
    description:
      "ระบุฤดูกาลจากเดือนและวัน (ระบบ Western)\n- **Winter**: ม.ค.–ก.พ. และ มี.ค. วันที่ 1–20\n- **Spring**: มี.ค. 21+ – พ.ค. 20\n- **Summer**: พ.ค. 21+ – ส.ค. 20\n- **Fall**: ส.ค. 21+ – พ.ย. 20",
    inputSpec: "2 ค่า: month (1-12), day (1-31)",
    outputSpec: "`winter` / `spring` / `summer` / `fall`",
    examples: [
      { input: "1\n15", expectedOutput: "winter", label: "มกราคม" },
      { input: "6\n10", expectedOutput: "summer", label: "มิถุนายน" },
    ],
    testCases: [
      { input: "3\n20", expectedOutput: "winter" },
      { input: "4\n1", expectedOutput: "spring" },
    ],
    tags: ["if-else", "logical"],
  },
  {
    id: "A1006",
    level: "A1",
    title: "Divisible",
    description: "ตรวจสอบว่า `number1` หาร `number2` ได้ลงตัวหรือไม่",
    inputSpec: "จำนวนเต็ม 2 ค่า: number1 และ number2 (แต่ละบรรทัด)",
    outputSpec: "`yes` หรือ `no`",
    examples: [
      { input: "10\n2", expectedOutput: "yes" },
      { input: "7\n3", expectedOutput: "no" },
    ],
    testCases: [
      { input: "100\n10", expectedOutput: "yes" },
      { input: "13\n5", expectedOutput: "no" },
    ],
    tags: ["modulo", "if-else"],
  },
  {
    id: "A1007",
    level: "A1",
    title: "Vowel Check",
    description: "ตรวจสอบว่าตัวอักษรที่รับมาเป็นสระภาษาอังกฤษหรือไม่ (a, e, i, o, u)",
    inputSpec: "ตัวอักษร 1 ตัว (ตัวพิมพ์เล็ก)",
    outputSpec: "`yes` หรือ `no`",
    examples: [
      { input: "a", expectedOutput: "yes" },
      { input: "b", expectedOutput: "no" },
    ],
    testCases: [
      { input: "u", expectedOutput: "yes" },
      { input: "z", expectedOutput: "no" },
    ],
    tags: ["if-else", "char"],
  },
  {
    id: "A1008",
    level: "A1",
    title: "ID Card Check",
    description: "ตรวจสอบว่าหมายเลขบัตรประชาชนที่รับมามี **13 ตัวอักษร** หรือไม่",
    inputSpec: "string 1 ค่า",
    outputSpec: "`yes` หรือ `no`",
    examples: [
      { input: "1234567890123", expectedOutput: "yes" },
      { input: "123456", expectedOutput: "no" },
    ],
    testCases: [
      { input: "1111111111111", expectedOutput: "yes" },
      { input: "11111111111", expectedOutput: "no" },
    ],
    tags: ["string", "length"],
  },
  {
    id: "A1009",
    level: "A1",
    title: "Score Total",
    description:
      "รับคะแนนสอบ 2 ครั้ง (กลางภาค max 50, ปลายภาค max 50) บวกรวมกัน แล้วตัดสินผล\n- รวม ≥ 50 → pass\n- รวม < 50 → fail",
    inputSpec: "จำนวนเต็ม 2 ค่า: กลางภาค และ ปลายภาค",
    outputSpec: "บรรทัดแรก: คะแนนรวม\nบรรทัดที่สอง: `pass` หรือ `fail`",
    examples: [
      { input: "25\n25", expectedOutput: "50\npass" },
      { input: "20\n20", expectedOutput: "40\nfail" },
    ],
    testCases: [
      { input: "30\n25", expectedOutput: "55\npass" },
      { input: "10\n35", expectedOutput: "45\nfail" },
    ],
    tags: ["if-else", "math"],
  },
  {
    id: "A1010",
    level: "A1",
    title: "Ticket Price",
    description:
      "คำนวณราคาตั๋วตามเงื่อนไข:\n- อายุ ≤ 17 **หรือ** เป็นนักเรียน (s/S) → 20 บาท\n- อื่นๆ → 50 บาท",
    inputSpec: "2 ค่า: age (int), student (char: s/S/n)",
    outputSpec: "ราคาตั๋ว (20 หรือ 50)",
    examples: [
      { input: "15\nn", expectedOutput: "20", label: "ผู้เยาว์" },
      { input: "25\nS", expectedOutput: "20", label: "นักเรียน" },
      { input: "25\nn", expectedOutput: "50", label: "ผู้ใหญ่" },
    ],
    testCases: [
      { input: "17\nn", expectedOutput: "20" },
      { input: "18\nn", expectedOutput: "50" },
    ],
    tags: ["if-else", "logical"],
  },
  {
    id: "A1011",
    level: "A1",
    title: "Run-Length Encoding",
    description:
      "บีบอัดข้อความโดยแทนตัวอักษรซ้ำติดกันด้วยจำนวนนับ\n\nตัวอย่าง: `aabbbcc` → `2a3b2c`",
    inputSpec: "string 1 ค่า (ตัวอักษรพิมพ์เล็ก)",
    outputSpec: "string ที่บีบอัดแล้ว",
    examples: [
      { input: "aabbbcc", expectedOutput: "2a3b2c" },
      { input: "aaaa", expectedOutput: "4a" },
      { input: "abc", expectedOutput: "1a1b1c" },
    ],
    testCases: [
      { input: "zzzzz", expectedOutput: "5z" },
      { input: "aabb", expectedOutput: "2a2b" },
    ],
    tags: ["string", "loop"],
  },
  {
    id: "A1012",
    level: "A1",
    title: "Reverse Two-Digit",
    description:
      "รับเลข 2 หลักและตัวดำเนินการ (+/*) แล้วสลับตัวเลขและคำนวณ\n\nเช่น: `12 +` → พลิกเป็น 21 แล้วคำนวณ `12 + 21 = 33`",
    inputSpec: "บรรทัดแรก: เลข 2 หลัก (int)\nบรรทัดที่สอง: operator (+ หรือ *)",
    outputSpec: "`A op B = C` (พร้อม spaces)",
    examples: [
      { input: "12\n+", expectedOutput: "12 + 21 = 33" },
      { input: "12\n*", expectedOutput: "12 * 21 = 252" },
    ],
    testCases: [
      { input: "34\n+", expectedOutput: "34 + 43 = 77" },
      { input: "23\n*", expectedOutput: "23 * 32 = 736" },
    ],
    tags: ["string", "math", "if-else"],
  },
  {
    id: "A1013",
    level: "A1",
    title: "Safe Code",
    description:
      "ตรวจสอบรหัสเซฟ ซึ่งประกอบด้วยตัวอักษร (ต้องเป็น H) และตัวเลข (ต้องเป็น 4567)\n\n| ตัวอักษร | ตัวเลข | ผลลัพธ์ |\n|---|---|---|\n| H | 4567 | safe unlocked |\n| H | ≠ 4567 | safe locked - change digit |\n| ≠ H | 4567 | safe locked - change char |\n| ≠ H | ≠ 4567 | safe locked |",
    inputSpec: "2 ค่า: char, int",
    outputSpec: "ข้อความผลลัพธ์",
    examples: [
      { input: "H\n4567", expectedOutput: "safe unlocked" },
      { input: "H\n1234", expectedOutput: "safe locked - change digit" },
      { input: "X\n4567", expectedOutput: "safe locked - change char" },
      { input: "X\n1234", expectedOutput: "safe locked" },
    ],
    testCases: [
      { input: "H\n4567", expectedOutput: "safe unlocked" },
      { input: "A\n0000", expectedOutput: "safe locked" },
    ],
    tags: ["if-else", "nested conditions"],
  },
  {
    id: "A1014",
    level: "A1",
    title: "Min of Three",
    description: "รับตัวเลข 3 ค่า แล้วหาและแสดงค่าที่น้อยที่สุด",
    inputSpec: "จำนวนเต็ม 3 ค่า แต่ละค่าอยู่บรรทัดแยกกัน",
    outputSpec: "ค่าที่น้อยที่สุด",
    examples: [
      { input: "5\n3\n8", expectedOutput: "3" },
      { input: "-1\n-5\n0", expectedOutput: "-5" },
    ],
    testCases: [
      { input: "100\n200\n50", expectedOutput: "50" },
      { input: "0\n0\n0", expectedOutput: "0" },
    ],
    tags: ["if-else", "comparison"],
  },
  {
    id: "A1015",
    level: "A1",
    title: "Password Generator",
    description:
      "สร้างรหัสผ่านจากชื่อ นามสกุล และอายุ\n\n**กฎ:** ถ้าความยาวชื่อ + นามสกุล **> 10** ตัว:\n- ตัวที่ 1-2 ของชื่อ + ตัวสุดท้ายของนามสกุล + หลักหน่วยของอายุ\n\nถ้า **≤ 10** ตัว:\n- ตัวแรกของชื่อ + อายุ + ตัวสุดท้ายของนามสกุล",
    inputSpec: "3 บรรทัด: firstName, lastName, age",
    outputSpec: "รหัสผ่าน",
    examples: [
      { input: "Kawin\nKaweesin\n25", expectedOutput: "Kan5" },
      { input: "Jo\nLi\n20", expectedOutput: "J20i" },
    ],
    testCases: [
      { input: "Alexander\nGraham\n30", expectedOutput: "Alm0" },
      { input: "Ann\nBee\n15", expectedOutput: "A15e" },
    ],
    tags: ["string", "if-else"],
  },
  {
    id: "A1016",
    level: "A1",
    title: "Student ID Check",
    description:
      "ตรวจสอบว่า Student ID (string) มีตัวอักษรที่ **ตำแหน่งที่ 3** เป็น `1` และ **ตำแหน่งที่ 4** เป็น `6` หรือไม่\n\n(นับตำแหน่งจาก 1, หรือ index 2 และ 3 ในภาษาโปรแกรม)",
    inputSpec: "string (student ID)",
    outputSpec: "`yes` หรือ `no`",
    examples: [
      { input: "AB16XY", expectedOutput: "yes" },
      { input: "AB26XY", expectedOutput: "no" },
    ],
    testCases: [
      { input: "XX16ZZZZ", expectedOutput: "yes" },
      { input: "1116ABCD", expectedOutput: "yes" },
      { input: "ABCDEFG", expectedOutput: "no" },
    ],
    tags: ["string", "index"],
  },
  {
    id: "A1017",
    level: "A1",
    title: "Who's Older",
    description:
      "เปรียบเทียบวันเกิดของบุคคล 2 คน แล้วบอกว่าใครเกิดก่อน\n- พิมพ์ `1` ถ้าคนที่ 1 เกิดก่อน\n- พิมพ์ `2` ถ้าคนที่ 2 เกิดก่อน\n- พิมพ์ `0` ถ้าเกิดวันเดียวกัน\n\nเปรียบเทียบตามลำดับ: **ปี → เดือน → วัน**",
    inputSpec: "6 ค่า: y1 m1 d1 y2 m2 d2 (แต่ละค่าคั่นด้วยช่องว่างหรือบรรทัดใหม่)",
    outputSpec: "`0`, `1`, หรือ `2`",
    examples: [
      { input: "2005\n3\n15\n2006\n1\n1", expectedOutput: "1" },
      { input: "2006\n1\n1\n2005\n3\n15", expectedOutput: "2" },
      { input: "2000\n1\n1\n2000\n1\n1", expectedOutput: "0" },
    ],
    testCases: [
      { input: "2000\n12\n31\n2001\n1\n1", expectedOutput: "1" },
      { input: "2005\n6\n15\n2005\n6\n10", expectedOutput: "2" },
    ],
    tags: ["if-else", "comparison", "nested"],
  },
  {
    id: "A1018",
    level: "A1",
    title: "Roman Numerals",
    description:
      "แปลงตัวเลข 1-9 เป็นเลขโรมัน\n\n| เลข | โรมัน |\n|---|---|\n| 1 | I |\n| 2 | II |\n| 3 | III |\n| 4 | IV |\n| 5 | V |\n| 6 | VI |\n| 7 | VII |\n| 8 | VIII |\n| 9 | IX |\n\n**Error cases:**\n- ตัวเลขน้อยกว่า 0: `Error : Please input positive number`\n- 0 หรือ > 9: `Error : Out of range`",
    inputSpec: "จำนวนเต็ม 1 ค่า",
    outputSpec: "เลขโรมัน หรือ Error message",
    examples: [
      { input: "5", expectedOutput: "V" },
      { input: "4", expectedOutput: "IV" },
      { input: "-1", expectedOutput: "Error : Please input positive number" },
      { input: "0", expectedOutput: "Error : Out of range" },
    ],
    testCases: [
      { input: "9", expectedOutput: "IX" },
      { input: "10", expectedOutput: "Error : Out of range" },
    ],
    tags: ["switch", "if-else"],
  },
  {
    id: "A1019",
    level: "A1",
    title: "Three Numbers Check",
    description:
      "รับตัวเลข 3 ค่า แล้วตรวจสอบว่าเหมือนกันทั้งหมด ต่างกันทั้งหมด หรืออื่นๆ\n- ถ้าทั้ง 3 เท่ากัน: `all the same`\n- ถ้าทั้ง 3 ต่างกัน: `all different`\n- มีบางคู่เหมือน: `neither`",
    inputSpec: "จำนวนเต็ม 3 ค่า",
    outputSpec: "`all the same` / `all different` / `neither`",
    examples: [
      { input: "5\n5\n5", expectedOutput: "all the same" },
      { input: "1\n2\n3", expectedOutput: "all different" },
      { input: "3\n3\n4", expectedOutput: "neither" },
    ],
    testCases: [
      { input: "0\n0\n0", expectedOutput: "all the same" },
      { input: "1\n1\n2", expectedOutput: "neither" },
    ],
    tags: ["if-else", "logical"],
  },
  {
    id: "A1020",
    level: "A1",
    title: "Increasing or Decreasing",
    description:
      "รับตัวเลข 3 ค่า ตรวจสอบว่าเรียงเพิ่ม เรียงลด หรือไม่ใช่ทั้งคู่\n- a < b < c: `increasing`\n- a > b > c: `decreasing`\n- อื่นๆ: `neither`",
    inputSpec: "จำนวนเต็ม 3 ค่า",
    outputSpec: "`increasing` / `decreasing` / `neither`",
    examples: [
      { input: "1\n2\n3", expectedOutput: "increasing" },
      { input: "9\n5\n2", expectedOutput: "decreasing" },
      { input: "1\n3\n2", expectedOutput: "neither" },
    ],
    testCases: [
      { input: "10\n20\n30", expectedOutput: "increasing" },
      { input: "5\n5\n5", expectedOutput: "neither" },
    ],
    tags: ["if-else", "comparison"],
  },
  {
    id: "A1021",
    level: "A1",
    title: "Leap Year",
    description:
      "ตรวจสอบว่าปีที่รับมาเป็นปีอธิกสุรทิน (Leap Year) หรือไม่\n\n**กฎปฏิทินเกรโกเรียน (ตั้งแต่ปี 1582):**\n- หาร 400 ลงตัว → ปีอธิกสุรทิน\n- หาร 4 ลงตัว แต่ไม่หาร 100 ลงตัว → ปีอธิกสุรทิน\n- อื่นๆ → ไม่ใช่\n\n**กฎปฏิทินจูเลียน (ก่อนปี 1582):**\n- หาร 4 ลงตัว → ปีอธิกสุรทิน",
    inputSpec: "จำนวนเต็ม 1 ค่า (ปี ค.ศ.)",
    outputSpec: "`yes` หรือ `no`",
    examples: [
      { input: "2000", expectedOutput: "yes", label: "หาร 400 ลงตัว" },
      { input: "1900", expectedOutput: "no", label: "หาร 100 แต่ไม่หาร 400" },
      { input: "2024", expectedOutput: "yes" },
      { input: "1500", expectedOutput: "yes", label: "จูเลียน หาร 4 ลงตัว" },
    ],
    testCases: [
      { input: "2023", expectedOutput: "no" },
      { input: "400", expectedOutput: "yes" },
    ],
    tags: ["if-else", "modulo"],
  },
  {
    id: "A1022",
    level: "A1",
    title: "Zodiac Sign",
    description:
      "คำนวณราศีจักรจากวันและเดือนเกิด\n\n| ราศี | ช่วงวันที่ |\n|---|---|\n| capricorn | 22 ธ.ค. – 19 ม.ค. |\n| aquarius | 20 ม.ค. – 18 ก.พ. |\n| pisces | 19 ก.พ. – 20 มี.ค. |\n| aries | 21 มี.ค. – 19 เม.ย. |\n| taurus | 20 เม.ย. – 20 พ.ค. |\n| gemini | 21 พ.ค. – 21 มิ.ย. |\n| cancer | 22 มิ.ย. – 22 ก.ค. |\n| leo | 23 ก.ค. – 22 ส.ค. |\n| virgo | 23 ส.ค. – 22 ก.ย. |\n| libra | 23 ก.ย. – 23 ต.ค. |\n| scorpio | 24 ต.ค. – 21 พ.ย. |\n| sagittarius | 22 พ.ย. – 21 ธ.ค. |",
    inputSpec: "2 บรรทัด: day, month",
    outputSpec: "ชื่อราศีเป็นภาษาอังกฤษตัวพิมพ์เล็ก",
    examples: [
      { input: "15\n1", expectedOutput: "capricorn" },
      { input: "14\n6", expectedOutput: "gemini" },
    ],
    testCases: [
      { input: "1\n8", expectedOutput: "leo" },
      { input: "25\n12", expectedOutput: "capricorn" },
    ],
    tags: ["if-else", "nested"],
  },
  {
    id: "A1023",
    level: "A1",
    title: "Water State",
    description:
      "ระบุสถานะของน้ำจากอุณหภูมิและหน่วย\n\n**หน่วยเซลเซียส (C/c):**\n- ≤ 0°C → solid\n- 0°C < T < 100°C → liquid\n- ≥ 100°C → gas\n\n**หน่วยฟาเรนไฮต์ (F/f):**\n- ≤ 32°F → solid\n- 32°F < T < 212°F → liquid\n- ≥ 212°F → gas",
    inputSpec: "2 ค่าในบรรทัดเดียว: temp (int) unit (C/c/F/f)",
    outputSpec: "`solid` / `liquid` / `gas`",
    examples: [
      { input: "100 C", expectedOutput: "gas" },
      { input: "0 C", expectedOutput: "solid" },
      { input: "100 F", expectedOutput: "liquid" },
      { input: "212 F", expectedOutput: "gas" },
    ],
    testCases: [
      { input: "50 c", expectedOutput: "liquid" },
      { input: "32 F", expectedOutput: "solid" },
    ],
    tags: ["if-else", "char"],
  },
  {
    id: "A1024",
    level: "A1",
    title: "Car Tax",
    description:
      "คำนวณภาษีรถยนต์ตามปีและ CC\n\n| ปี | ≤1500cc | ≤2000cc | >2000cc |\n|---|---|---|---|\n| ≤ 1990 | 1250 | 1400 | 2000 |\n| 1991–1999 | 1100 | 1300 | 1700 |\n| ≥ 2000 | 1000 | 1200 | 1500 |",
    inputSpec: "2 ค่า: year (int), cc (int)",
    outputSpec: "ภาษี (int)",
    examples: [
      { input: "1990\n1500", expectedOutput: "1250" },
      { input: "1995\n2000", expectedOutput: "1300" },
      { input: "2010\n3000", expectedOutput: "1500" },
    ],
    testCases: [
      { input: "1985\n2500", expectedOutput: "2000" },
      { input: "2020\n1200", expectedOutput: "1000" },
    ],
    tags: ["if-else", "nested", "table"],
  },
  {
    id: "A1025",
    level: "A1",
    title: "Playing Card",
    description:
      "แปลงรหัสไพ่เป็นชื่อเต็ม\n\n**รหัส:** `[แต้ม][สัญลักษณ์]`\n- แต้ม: A=ace, 2-10=ตัวเลข, J=jack, Q=queen, K=king\n- สัญลักษณ์: d=diamonds, h=hearts, s=spades, c=clubs\n\nตัวอย่าง: `Ah` → `ace of hearts`, `5d` → `5 of diamonds`",
    inputSpec: "string 1 ค่า (รหัสไพ่)",
    outputSpec: "`rank of suit`",
    examples: [
      { input: "Ah", expectedOutput: "ace of hearts" },
      { input: "5d", expectedOutput: "5 of diamonds" },
      { input: "Ks", expectedOutput: "king of spades" },
      { input: "10c", expectedOutput: "10 of clubs" },
    ],
    testCases: [
      { input: "Qh", expectedOutput: "queen of hearts" },
      { input: "Jd", expectedOutput: "jack of diamonds" },
    ],
    tags: ["string", "if-else"],
  },
  {
    id: "A1026",
    level: "A1",
    title: "Even/Odd Count",
    description: "รับตัวเลข 3 ค่า นับว่ามีจำนวนคู่กี่ตัว คี่กี่ตัว",
    inputSpec: "จำนวนเต็ม 3 ค่า แต่ละค่าอยู่บรรทัดแยกกัน",
    outputSpec: "2 บรรทัด:\n```\neven X\nodd Y\n```",
    examples: [
      { input: "2\n3\n4", expectedOutput: "even 2\nodd 1" },
      { input: "1\n3\n5", expectedOutput: "even 0\nodd 3" },
    ],
    testCases: [
      { input: "10\n20\n30", expectedOutput: "even 3\nodd 0" },
      { input: "7\n8\n9", expectedOutput: "even 1\nodd 2" },
    ],
    tags: ["loop", "modulo"],
  },
  {
    id: "A1027",
    level: "A1",
    title: "Reverse 5 Chars",
    description:
      "รับข้อความ 5 ตัวอักษร แล้วพิมพ์กลับหลังและแปลงเป็นตัวพิมพ์เล็กทั้งหมด\n\nเช่น: `HeLLo` → `olleh`",
    inputSpec: "string 5 ตัวอักษร",
    outputSpec: "string ที่พลิกกลับและเป็นตัวพิมพ์เล็ก",
    examples: [
      { input: "HeLLo", expectedOutput: "olleh" },
      { input: "ABCDE", expectedOutput: "edcba" },
    ],
    testCases: [
      { input: "12345", expectedOutput: "54321" },
      { input: "XyZaB", expectedOutput: "bazyx" },
    ],
    tags: ["string", "loop", "lowercase"],
  },
  {
    id: "A1028",
    level: "A1",
    title: "Reverse 4-Digit",
    description: "รับตัวเลข 4 หลัก (เป็น string) แล้วพิมพ์กลับหลัง",
    inputSpec: "string 4 หลัก",
    outputSpec: "เลขที่พลิกกลับ",
    examples: [
      { input: "1234", expectedOutput: "4321" },
      { input: "1000", expectedOutput: "0001" },
    ],
    testCases: [
      { input: "9876", expectedOutput: "6789" },
      { input: "1111", expectedOutput: "1111" },
    ],
    tags: ["string", "loop"],
  },
  {
    id: "A1029",
    level: "A1",
    title: "Count Vowels",
    description: "รับข้อความ แล้วนับจำนวนสระภาษาอังกฤษ (a, e, i, o, u) ในข้อความนั้น",
    inputSpec: "string 1 ค่า",
    outputSpec: "จำนวนสระ (int)",
    examples: [
      { input: "hello", expectedOutput: "2" },
      { input: "aeiou", expectedOutput: "5" },
      { input: "bcdfg", expectedOutput: "0" },
    ],
    testCases: [
      { input: "programming", expectedOutput: "3" },
      { input: "xyz", expectedOutput: "0" },
    ],
    tags: ["string", "loop"],
  },
  {
    id: "A1030",
    level: "A1",
    title: "Sum of Max Pairs",
    description:
      "รับคู่ตัวเลข N คู่ จากแต่ละคู่ให้เลือกค่าที่มากกว่า แล้วรวมทั้งหมด\n\n**รูปแบบ output:**\n- N = 1: พิมพ์แค่ผลรวม\n- N > 1: `X1 + X2 + ... = total`",
    inputSpec: "บรรทัดแรก: N\nจากนั้น N บรรทัด แต่ละบรรทัดมีตัวเลข 2 ค่า",
    outputSpec: "ผลรวม (หรือนิพจน์ + ผลรวม)",
    examples: [
      { input: "3\n5 3\n8 2\n7 9", expectedOutput: "5 + 8 + 9 = 22" },
      { input: "1\n4 7", expectedOutput: "7" },
    ],
    testCases: [
      { input: "2\n10 5\n3 8", expectedOutput: "10 + 8 = 18" },
      { input: "4\n1 2\n3 4\n5 6\n7 8", expectedOutput: "2 + 4 + 6 + 8 = 20" },
    ],
    tags: ["loop", "array", "format"],
  },
  // A2 Problems
  {
    id: "A2003",
    level: "A2",
    title: "Local Maxima",
    description:
      "นับจำนวน **local maximum** ในอาร์เรย์ h[] ขนาด n\n\nตำแหน่ง i เป็น local maximum เมื่อ:\n- h[i] ≥ h[i-1] (ถ้ามี)\n- h[i] ≥ h[i+1] (ถ้ามี)\n\n(ตำแหน่งแรกและสุดท้ายเทียบแค่ข้างเดียว)",
    inputSpec: "บรรทัดแรก: n\nบรรทัดที่สอง: ความสูง n ค่าคั่นด้วยช่องว่าง",
    outputSpec: "จำนวน local maximum",
    examples: [
      { input: "5\n1 3 2 4 2", expectedOutput: "2", label: "peak ที่ 3 และ 4" },
      { input: "4\n5 5 5 5", expectedOutput: "4", label: "ทุกตัวเท่ากัน" },
    ],
    testCases: [
      { input: "1\n42", expectedOutput: "1" },
      { input: "3\n1 2 3", expectedOutput: "1" },
    ],
    tags: ["array", "loop", "logic"],
  },
  {
    id: "A2004",
    level: "A2",
    title: "Stack Puzzle",
    description:
      "มีกล่องหลายกล่อง แต่ละกล่องมีขนาด (size) กล่องขนาดเดียวกันวางซ้อนกันได้\nหาว่า **กองที่สูงที่สุด** มีกี่กล่อง",
    inputSpec: "บรรทัดแรก: n (จำนวนกล่อง)\nบรรทัดที่สอง: ขนาดของแต่ละกล่องคั่นด้วยช่องว่าง (1 ≤ size ≤ 300)",
    outputSpec: "ความสูงสูงสุด (int)",
    examples: [
      { input: "5\n1 2 1 3 1", expectedOutput: "3", label: "ขนาด 1 มี 3 กล่อง" },
      { input: "4\n2 2 3 3", expectedOutput: "2" },
    ],
    testCases: [
      { input: "3\n5 5 5", expectedOutput: "3" },
      { input: "4\n1 2 3 4", expectedOutput: "1" },
    ],
    tags: ["array", "counting", "hash"],
  },
  {
    id: "A2005",
    level: "A2",
    title: "Rectangle Cutting",
    description:
      "กระดาษขนาด W×H ถูกตัดด้วยเส้นแนวตั้ง M เส้น และเส้นแนวนอน N เส้น\nหาพื้นที่ของสี่เหลี่ยมที่ **ใหญ่ที่สุด** และ **ใหญ่ที่สุดอันดับที่สอง**",
    inputSpec:
      "บรรทัด 1: W H M N\nบรรทัด 2: ตำแหน่งตัดแนวตั้ง M ค่า\nบรรทัด 3: ตำแหน่งตัดแนวนอน N ค่า",
    outputSpec: "largest_area second_largest_area",
    examples: [
      {
        input: "10 10 1 1\n5\n5",
        expectedOutput: "25 25",
        label: "ตัดครึ่ง → 4 ชิ้น 5x5",
      },
    ],
    testCases: [
      { input: "10 10 1 0\n3\n", expectedOutput: "70 30" },
    ],
    hints: ["เรียง widths และ heights จากมากไปน้อย แล้วคิดจากคู่ที่ใหญ่สุด"],
    tags: ["array", "sort", "geometry"],
  },
  // A3 Problems
  {
    id: "A3002",
    level: "A3",
    title: "Spiral Distance",
    description:
      "ตัวเลข 1, 2, 3, ... เรียงในรูปแบบก้นหอยจากจุดศูนย์กลางออกมา\n\nหาว่าตัวเลข n อยู่ห่างจากตัวเลข **1** (ศูนย์กลาง) กี่ก้าว\n\nตัวอย่างรูปแบบก้นหอย:\n```\n5 4 3\n6 1 2\n7 8 9\n```",
    inputSpec: "จำนวนเต็ม n (1 ≤ n)",
    outputSpec: "จำนวนก้าว",
    examples: [
      { input: "1", expectedOutput: "0", label: "ศูนย์กลาง" },
      { input: "2", expectedOutput: "1" },
      { input: "9", expectedOutput: "2" },
    ],
    testCases: [
      { input: "25", expectedOutput: "4" },
      { input: "10", expectedOutput: "3" },
    ],
    hints: ["ลองหา pattern จาก sqrt(n)", "แต่ละชั้นก้นหอยครอบคลุมตัวเลขในช่วง (2k-1)² ถึง (2k+1)²"],
    tags: ["math", "pattern", "spiral"],
  },
  {
    id: "A3003",
    level: "A3",
    title: "Path Crossing",
    description:
      "มีบุคคล 2 คน แต่ละคนเดินทางใน sequence ของ nodes\nหาจำนวนครั้งที่เส้นทาง (edge) ของทั้งสองคนตัดกัน\n\nEdge ของคนที่ 1: u1→v1, ของคนที่ 2: u2→v2\nEdge ตัดกันเมื่อ: ช่วง [min,max] ของ u1,v1 และ u2,v2 ซ้อนกันแบบตัดกัน (ไม่ใช่แค่ซ้อนทับหรือ nested)",
    inputSpec: "บรรทัด 1: n\nบรรทัด 2: sequence ของคนที่ 1 (n+1 nodes)\nบรรทัด 3: sequence ของคนที่ 2 (n+1 nodes)",
    outputSpec: "จำนวนครั้งที่เส้นทางตัดกัน",
    examples: [
      {
        input: "2\n1 3 2\n1 2 3",
        expectedOutput: "1",
      },
    ],
    testCases: [
      { input: "1\n1 2\n1 2", expectedOutput: "0" },
    ],
    hints: ["เส้นตัดกัน ≠ เส้นซ้อนทับ", "ลองวาด timeline ของแต่ละ edge"],
    tags: ["array", "interval", "logic"],
  },
];

export const PROBLEM_MAP = new Map<string, Problem>(
  PROBLEMS.map((p) => [p.id, p])
);

export const LEVELS: Level[] = ["A1", "A2", "A3"];

export function getProblemsByLevel(level: Level) {
  return PROBLEMS.filter((p) => p.level === level);
}
