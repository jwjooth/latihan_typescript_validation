# PENILAIAN UJIAN AKHIR
## TypeScript Validation using Zod
**Program Studi:** Teknik Informatika
**Penilai:** Dosen Pengampu
**Tanggal:** 18 Februari 2026

---

## REKAP NILAI PER SOAL

| No | Soal | Bobot | Nilai | Catatan |
|----|------|-------|-------|---------|
| 1 | Username validation + fungsi | 3 | 3 | ✅ Benar, fungsi validateUsername() tepat |
| 2 | Number schema (age) | 3 | 3 | ✅ Benar |
| 3 | z.coerce.number() | 3 | 3 | ✅ Benar |
| 4 | z.coerce.boolean() | 3 | 3 | ✅ Benar |
| 5 | Date schema (tidak boleh masa depan) | 3 | 3 | ✅ Benar |
| 6 | Object schema User | 3 | 3 | ✅ Benar |
| 7 | Optional field email | 3 | 3 | ✅ Benar, menggunakan `.nullish()` |
| 8 | Array string min 3 item | 3 | 2 | ⚠️ Tidak ada validasi "tidak boleh string kosong" (`z.string().min(1)`) |
| 9 | Set number positif | 3 | 3 | ✅ Benar |
| 10 | Map schema | 3 | 2 | ⚠️ `.min(1)` pada Map tidak valid di Zod — Map tidak memiliki method `.min()` |
| 11 | Nested object | 3 | 3 | ✅ Benar |
| 12 | Transform uppercase | 3 | 3 | ✅ Benar |
| 13 | Custom refinement password | 3 | 3 | ✅ Benar |
| 14 | Array object Product | 3 | 3 | ✅ Benar |
| 15 | safeParse + flatten() | 3 | 3 | ✅ Benar |
| 16 | Confirm password refinement | 3 | 3 | ✅ Benar, path ditentukan dengan tepat |
| 17 | z.coerce.date() + validasi | 3 | 3 | ✅ Benar |
| 18 | Unique number array | 3 | 3 | ✅ Logika Set untuk cek unique sudah tepat |
| 19 | Transform currency | 3 | 1 | ❌ Output `"Rp10000"` — tidak sesuai format `"Rp10.000"`. Tidak menggunakan `Intl.NumberFormat` |
| 20 | Nested array object Order | 3 | 2 | ⚠️ `items` didefinisikan sebagai `z.object()` bukan `z.array(z.object())` — tidak sesuai soal |
| 21 | Login validation + error | 4 | 1 | ❌ Penggunaan `.transform()` salah total — `ctx.value` tidak ada, dan `ZodIssueCode` tidak dipakai dengan benar dalam transform |
| 22 | Union schema | 4 | 4 | ✅ Benar |
| 23 | Discriminated union | 4 | 3 | ⚠️ Tidak menggunakan Zod schema (`z.discriminatedUnion`) — hanya TypeScript interface biasa, tidak memenuhi ketentuan "semua validasi harus menggunakan schema" |
| 24 | RefinementCtx custom validation | 4 | 3 | ⚠️ `path: ["age", "country"]` kurang tepat — seharusnya dua `addIssue` terpisah per field, atau satu path spesifik |
| 25 | Transform pipeline + currency | 4 | 4 | ✅ Benar, `.format(val)` digunakan dengan tepat |
| 26 | Schema kompleks Customer-Order | 4 | 2 | ❌ `id` UUID tidak divalidasi (`z.string()` biasa, bukan `.uuid()`). `registeredAt` menggunakan string bukan `z.date()` — akan gagal parse |
| 27 | Map<string, Array<number>> | 4 | 2 | ❌ Input yang di-parse adalah plain object `{}` bukan `Map` — `z.map()` hanya menerima instance `new Map()` |
| 28 | Reusable schema + extend | 4 | 3 | ✅ Struktur `.extend()` benar. ⚠️ `id` tidak menggunakan `.uuid()` sesuai konvensi BaseUser yang ideal |
| 29 | Global error handler | 4 | 1 | ❌ Hanya mengubah `error.message` — tidak memformat output `{ message, errors: [...] }` yang diminta soal |
| 30 | Final Boss Transaction | 5 | 2 | ❌ Banyak constraint belum diimplementasi (lihat detail di bawah) |

---

## DETAIL KOREKSI SOAL KRITIS

### Soal 21 — Login Validation
Penggunaan `.transform()` untuk menangani error adalah pendekatan yang **salah secara konseptual**. Transform berjalan setelah validasi berhasil, bukan saat validasi gagal. Seharusnya menggunakan `.superRefine()` atau membiarkan Zod melempar error secara alami, lalu menangkapnya di try-catch.

### Soal 26 — Customer Schema
```typescript
// ❌ Yang ditulis:
id: z.string()           // tidak validasi UUID format
registeredAt: "2022-12-12" // string akan gagal di z.date()

// ✅ Seharusnya:
id: z.string().uuid()
registeredAt: z.coerce.date() // atau gunakan coerce agar bisa terima string
```

### Soal 27 — Map Validation
```typescript
// ❌ Input yang dipakai adalah plain object — akan selalu gagal
schema27.parse({ "kelahiran tahun 2000": 26 })

// ✅ Seharusnya:
schema27.parse(new Map([["kelahiran tahun 2000", [26, 27, 28]]]))
```

### Soal 29 — Global Error Handler
```typescript
// ❌ Yang ditulis: hanya ubah message string
error.message = "Validation Failed"

// ✅ Seharusnya return struktur JSON standar:
return {
  message: "Validation Failed",
  errors: error.errors.map(e => ({ field: e.path.join("."), message: e.message }))
}
```

### Soal 30 — Final Boss
Constraint yang **tidak diimplementasi:**
- ❌ `items` tidak memiliki `.min(1)` atau pengecekan `length < 1` (kondisi `<= 1` salah — artinya 1 item pun akan error)
- ❌ Total `price * quantity > 10000` tidak ada
- ❌ `CREDIT_CARD → paidAt tidak null` tidak ada
- ❌ `paidAt` tidak menggunakan `.nullable()` padahal BANK_TRANSFER boleh null
- ❌ Tidak ada global error handler dengan format JSON standar

---

## REKAPITULASI AKHIR

| Kategori | Soal | Bobot Total | Nilai Diperoleh |
|----------|------|-------------|-----------------|
| Section A (Easy-Medium) | 1–10 | 30 | 28 |
| Section B (Medium-Hard) | 11–20 | 30 | 22 |
| Section C (Hard-Advanced) | 21–30 | 40 | 23 |
| **TOTAL** | **30 soal** | **100** | **73** |

---

## NILAI AKHIR

```
NILAI: 73 / 100  →  C+  (Cukup Memuaskan)
STATUS: LULUS ✅
```

---

## CATATAN DOSEN

> Mahasiswa menunjukkan pemahaman yang **solid pada konsep dasar Zod** (Section A hampir sempurna) dan **cukup baik pada level menengah** (Section B). Kelemahan utama terletak pada pemahaman **alur eksekusi Zod** — khususnya perbedaan antara `transform` (post-validation) dan `superRefine` (mid-validation), serta penanganan error yang belum terstruktur.
>
> Disarankan untuk memperdalam: (1) `superRefine` vs `refine` vs `transform`, (2) perbedaan `z.map()` dengan plain object, dan (3) arsitektur global error handler yang konsisten untuk production API.
>
> Secara keseluruhan, kemampuan problem-solving terlihat baik dan mahasiswa mampu mengerjakan soal-soal kompleks dengan pendekatan yang benar secara struktural meski ada bug implementasi.

---
*Dokumen ini dibuat secara otomatis berdasarkan review kode answer.ts terhadap task.md*
