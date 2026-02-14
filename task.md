# FINAL EXAM
## TypeScript Validation using Zod
Program Studi Teknik Informatika

Durasi: 180 Menit  
Tipe Ujian: Praktik Coding  
Ketentuan:
- Gunakan TypeScript
- Gunakan library Zod
- Semua validasi harus menggunakan schema
- Dilarang menggunakan library validation selain Zod
- Error harus ditangani dengan ZodError
- Setiap soal dibuat dalam file terpisah sesuai nomor soal
- Wajib menggunakan parse() atau safeParse() sesuai kebutuhan

------------------------------------------------------------
SECTION A — EASY to MEDIUM (10 Soal)
------------------------------------------------------------

### Soal 1
Buat schema untuk validasi string username dengan ketentuan:
- Minimal 5 karakter
- Maksimal 20 karakter
- Tidak boleh kosong
- Custom error message untuk masing-masing constraint

Buat fungsi validateUsername(input: unknown): string

---

### Soal 2
Buat schema number untuk umur:
- Minimal 18
- Maksimal 60
- Harus number (tidak boleh string)
Gunakan parse()

---

### Soal 3
Gunakan z.coerce.number() untuk menerima input:
"25" → harus dikonversi menjadi number
Validasi minimal 21

---

### Soal 4
Buat schema boolean menggunakan z.coerce.boolean()
Input yang diterima:
"true", "false", true, false

---

### Soal 5
Buat schema Date untuk tanggal lahir
- Tidak boleh masa depan
- Jika invalid, throw error

---

### Soal 6
Buat schema object User:
{
  username: string (min 3)
  age: number (min 18)
}

---

### Soal 7
Tambahkan optional field email pada schema User
email boleh kosong atau undefined

---

### Soal 8
Buat schema array string:
- Minimal 3 item
- Tidak boleh ada string kosong

---

### Soal 9
Buat schema Set<number>
- Minimal 2 angka
- Semua angka harus positif

---

### Soal 10
Buat schema Map<string, number>
- Key minimal 3 karakter
- Value minimal 1

------------------------------------------------------------
SECTION B — MEDIUM to HARD (10 Soal)
------------------------------------------------------------

### Soal 11
Buat nested object:

{
  name: string
  address: {
    street: string
    city: string
    postalCode: string (5 digit)
  }
}

---

### Soal 12
Tambahkan transform pada field name:
- Setelah validasi, ubah menjadi uppercase

---

### Soal 13
Buat custom validation menggunakan refinement:
- Password minimal 8 karakter
- Harus mengandung minimal 1 angka

---

### Soal 14
Buat schema array object Product:
{
  name: string
  price: number (> 0)
}
Minimal 1 product

---

### Soal 15
Tangani error menggunakan safeParse()
Jika gagal, return error.flatten()

---

### Soal 16
Buat schema untuk registration form:
{
  username
  password
  confirmPassword
}
Gunakan refinement:
- password dan confirmPassword harus sama

---

### Soal 17
Gunakan z.coerce.date() untuk menerima input string ISO
Validasi tidak boleh lebih dari hari ini

---

### Soal 18
Buat schema array number:
- Semua number harus unique
Gunakan custom validation

---

### Soal 19
Buat transform untuk number:
Input harga 10000
Output: "Rp10.000"

---

### Soal 20
Buat nested array object:
Order:
{
  id: string
  items: [
    {
      name: string
      qty: number (>0)
    }
  ]
}
Minimal 1 item

------------------------------------------------------------
SECTION C — HARD to ADVANCED (Spesial Kelulusan)
------------------------------------------------------------

### Soal 21
Buat sistem validasi login:
- email harus valid email format
- password minimal 8
- Jika gagal, lempar custom message global

---

### Soal 22
Buat schema union:
Input bisa:
- string
- number
Jika number → harus > 0
Jika string → minimal 3 karakter

---

### Soal 23
Buat discriminated union:
{
  type: "admin" | "user"
  data: berbeda tergantung type
}

Jika admin:
{
  accessLevel: number (1-5)
}

Jika user:
{
  subscription: "FREE" | "PRO"
}

---

### Soal 24
Buat custom validation menggunakan RefinementCtx:
- Jika age < 21 dan country = "US", maka error

---

### Soal 25
Buat transform pipeline:
- Input string number
- Coerce ke number
- Validasi minimal 100
- Transform ke format currency

---

### Soal 26
Buat schema kompleks:

Customer:
{
  id: UUID
  name: string
  registeredAt: Date
  orders: Array<Order>
}

Order:
{
  id: UUID
  total: number (> 0)
}

---

### Soal 27
Buat validasi Map<string, Array<number>>
- Key minimal 3 karakter
- Array minimal 2 number
- Semua number positif

---

### Soal 28
Buat reusable schema BaseUser
Lalu extend menjadi:
AdminUser
CustomerUser

---

### Soal 29
Buat global error handler:
Tangkap ZodError
Format output:
{
  message: "Validation Failed",
  errors: [...]
}

---

### Soal 30 (FINAL BOSS)
Buat sistem validasi lengkap untuk API Create Transaction:

{
  transactionId: UUID
  userId: UUID
  items: [
    {
      productId: UUID
      price: number (>0)
      quantity: number (>0)
    }
  ]
  payment: {
    method: "CREDIT_CARD" | "BANK_TRANSFER"
    paidAt: Date
  }
  createdAt: Date (tidak boleh masa depan)
}

Constraint tambahan:
- Minimal 1 item
- total (price * quantity) seluruh item harus > 10000
- Jika payment.method = CREDIT_CARD, maka paidAt tidak boleh null
- Gunakan refinement dan transform jika diperlukan
- Tangani error dengan struktur JSON standar

------------------------------------------------------------
END OF EXAM
------------------------------------------------------------
