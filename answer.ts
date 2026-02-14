import { date, z } from "zod";

// soal 1
let schema = z
  .string("value must containt string")
  .min(5, "must more than 5 characters")
  .max(20, "must less than 20 characters");

function validateUsername(input: unknown): string {
  return schema.parse(input);
}

console.log(validateUsername("jordan"));

// soal 2
let schema2 = z
  .number("must a number")
  .min(18, "must more than 18")
  .max(60, "must less than 60");

console.log(schema2.parse(19));

// soal 3
let schema3 = z.coerce.number().min(21, "must greater than 21");
console.log(schema3.parse("22"));

// soal 4
let schema4 = z.coerce.boolean();
console.log(schema4.parse("true"));

// soal 5
let schema5 = z.coerce
  .date()
  .refine((date) => date < new Date(), {
    message: "date cant be in the future",
  });
console.log(schema5.parse("2026-01-01"));

// soal 6
let schema6 = z.object({
  username: z.string("must containt string").min(3, "must greaten than 3 characters"),
  age: z.number("must containt numberr").min(18, "must greater than 18")
})