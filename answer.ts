import { date, email, map, z } from "zod";

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
let schema5 = z.coerce.date().refine((date) => date < new Date(), {
  message: "date cant be in the future",
});
console.log(schema5.parse("2026-01-01"));

// soal 6
let schema6 = z.object({
  username: z
    .string("must containt string")
    .min(3, "must greaten than 3 characters"),
  age: z.number("must containt numberr").min(18, "must greater than 18"),
});

console.log(schema6.parse({ username: "jowjo", age: 20 }));

// soal 7
let schema7 = z.object({
  email: z.email().nullish(),
  username: z
    .string("must containt string")
    .min(3, "must greaten than 3 characters"),
  age: z.number("must containt numberr").min(18, "must greater than 18"),
});

console.log(schema7.parse({ username: "jowjo", age: 21 }));

// soal 8
let schema8 = z
  .array(z.string("must containt string"))
  .min(3, "must more than 3 arrays");

console.log(schema8.parse(["roger", "mampu", "rejeki"]));

// soal 9
let schema9 = z
  .set(z.number("must containt number").positive("must greater than zero"))
  .min(2, "must greater than 2 characters");

console.log(schema9.parse(new Set([1, 2, 3, 4, 5])));

// soal 10
let schema10 = z
  .map(
    z.string("must containt string").min(3, "must more than 3 characters"),
    z.number("must containt number"),
  )
  .min(1, "value must at least had one value");

console.log(
  schema10.parse(
    new Map([
      ["jowjo", 22],
      ["roger", 21],
      ["darren", 20],
    ]),
  ),
);

// soal 11
let schema11 = z.object({
  name: z.string("must containt string"),
  address: z.object(
    {
      street: z.string("must containt string"),
      city: z.string("must containt string"),
      postalCode: z.string().max(5, "cant more than 5 digits"),
    },
    "must include all the field",
  ),
});

console.log(
  schema11.parse({
    name: "jowjo",
    address: {
      street: "jalan tebet dalam",
      city: "jakarta",
      postalCode: "AJK12",
    },
  }),
);

// soal 12
let schema12 = z.object({
  username: z
    .string("must containt string")
    .min(3, "must greater than 3 characters")
    .max(10, "must less than 10 characters")
    .transform((val) => val.toUpperCase()),
});
console.log(schema12.parse({ username: "jowjo" }));

// soal 13
let schema13 = z.object({
  password: z
    .string()
    .refine((value) => value.length >= 8 && /\d/.test(value), {
      message:
        "must containt minimun one number and must containt minimum eight characters",
    }),
});

console.log(schema13.parse({ password: "ajajqw123sdjdc" }));
