import { date, email, map, number, string, uuid, z, ZodError } from "zod";

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

// soal 14
let schema14 = z.object({
  name: z.string("must containt string"),
  price: z.number("must containt number").min(1, "must greater than 0"),
});

let schema14v2 = z.array(schema14).min(1, "must had minimum one object");

console.log(
  schema14v2.parse([
    {
      name: "nike air shoes",
      price: 10000,
    },
    {
      name: "jordan air shoes",
      price: 20000,
    },
    {
      name: "skechers shoes",
      price: 30000,
    },
  ]),
);

// soal 15
let test = schema14v2.safeParse([
  {
    username: "advan ai gen",
    price: 10000000,
  },
  {
    username: "advan ai gen",
    price: 10000000,
  },
  {
    username: "advan ai gen",
    price: 10000000,
  },
  {
    username: "advan ai gen",
    price: 10000000,
  },
]);

console.log(test.error?.flatten());

// soal 16
let schema16 = z
  .object({
    username: z.string(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((val) => val.password === val.confirm_password, {
    message: "confirm password must same like password",
    path: ["confirm_password"],
  });

console.log(
  schema16.parse({
    username: "jowjo",
    password: "sandi123",
    confirm_password: "sandi123",
  }),
);

// soal 17
let schema17 = z.coerce.date().refine((date) => date < new Date(), {
  message: "date cant more than today",
});
console.log(schema17.parse("2025-12-12"));

// soal 18
let schema18v2 = z
  .array(z.number())
  .refine((val) => new Set(val).size === val.length, {
    message: "cant adding the same input",
  });

console.log(schema18v2.parse([1, 2, 3, 4, 5]));

// soal 19
let schema19 = z.number().transform((value) => "Rp" + value);
console.log(schema19.parse(10000));

// soal 20
let schema20 = z
  .array(
    z.object({
      id: z.string("must containt string"),
      items: z.object({
        name: z.string("must containt string"),
        qty: z
          .number("must containt number")
          .min(1, "must containt at least one value"),
      }),
    }),
  )
  .min(1, "must containt at least one value");

console.log(
  schema20.parse([
    {
      id: "1",
      items: {
        name: "shoes",
        qty: 12,
      },
    },
    {
      id: "2",
      items: {
        name: "tables",
        qty: 10,
      },
    },
    {
      id: "3",
      items: {
        name: "books",
        qty: 4,
      },
    },
  ]),
);

// soal 21
let schema21 = z
  .object({
    email: z.email("format email is not valid"),
    password: z.string().min(8, "minimum 8 characters"),
  })
  .transform((issue, ctx) => {
    if (issue.password === z.ZodIssueCode.too_small) {
      return {
        message: "minimum 8 characters",
      };
    }
    return ctx.value;
  });

console.log(
  schema21.parse({
    email: "jordan@gmail.com",
    password: "12345678",
  }),
);

// soal 22
let schema22 = z.union([
  z.string().min(3, "must more than 3 characters"),
  z.number().min(1, "must greater than 0"),
]);

console.log(schema22.parse("jowjo"));
console.log(schema22.parse(2));

// soal 23
interface Admin {
  type: "admin";
  data: { accessLevel: 1 | 2 | 3 | 4 | 5 };
}

interface User {
  type: "user";
  data: { subscription: "FREE" | "PRO" };
}

type Person = Admin | User;

function fPerson(value: Person) {
  if (value.type === "admin") {
    return value.data.accessLevel;
  } else if (value.type === "user") {
    return value.data.subscription;
  }
}

let Admin1: Admin = {
  type: "admin",
  data: {
    accessLevel: 1,
  },
};

let User1: User = {
  type: "user",
  data: {
    subscription: "PRO",
  },
};

console.log(fPerson(Admin1));
console.log(fPerson(User1));

// soal 24
let schema24 = z
  .object({
    age: z.number(),
    country: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.age < 21 && data.country.toUpperCase() === "US")
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "minimum age is 21 and country cant be US",
        path: ["age", "country"],
      });
  });

console.log(
  schema24.parse({
    age: 20,
    country: "US",
  }),
);

// soal 25
let schema25 = z.coerce
  .number()
  .min(100)
  .transform((val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(val),
  );

console.log(schema25.parse("100000"));

// soal 26
let schema26Order = z.object({
  id: z.string().uuid(),
  total: z.number().gt(0, "must greater than 1"),
});

let schema26Customer = z.object({
  id: z.string().uuid(),
  name: z.string(),
  registeredAt: z.date(),
  orders: z.array(schema26Order),
});

console.log(
  schema26Customer.parse({
    id: "1",
    name: "jowjo",
    registeredAt: "2022-12-12",
    orders: [{ id: "2", total: 2 }],
  }),
);

// soal 27
let schema27 = z.map(
  z.string().min(3, "must more than 3 characters"),
  z
    .array(z.number().positive("the number must be positive"))
    .min(2, "array must have at least 2 numbers"),
);

console.log(
  schema27.parse({
    "kelahiran tahun 2000": 26,
    "kelahiran tahun 2001": 25,
    "kelahiran tahun 2002": 24,
    "kelahiran tahun 2003": 23,
    "kelahiran tahun 2004": 22,
  }),
);

// soal 28
let schema28 = z.object({
  id: z.string().uuid(),
  username: z.string(),
  password: z.string().min(5),
});

let AdminUser = schema28.extend({
  accessLevel: z.string(),
  permission: z.boolean(),
});

let CustomerUser = schema28.extend({
  subscription: z.string(),
  address: z.string(),
});

console.log(
  AdminUser.parse({
    id: "1",
    username: "nama admin",
    password: "password admin",
    accessLevel: "free",
    permission: true,
  }),
);

console.log(
  CustomerUser.parse({
    id: "2",
    username: "nama customer",
    password: "password customer",
    subscription: "subscribe",
    address: "alamat customer",
  }),
);

// soal 29
let schema29 = z.object({
  name: z.string(),
  age: z.number(),
});

try {
  schema29.parse({
    name: "jowjo",
    age: "12",
  });
} catch (error: any) {
  if (error instanceof z.ZodError) {
    error.message = "Validation Failed";
  }
} finally {
  console.log("processed successful!");
}

// soal 30
let schema30 = z
  .object({
    transactionId: z.string().uuid(),
    userId: z.string().uuid(),
    items: z.array(
      z.object({
        productId: z.string().uuid(),
        price: z.number().gt(0),
        quantity: z.number().gt(0),
      }),
    ),
    payment: z.object({
      method: z.enum(["CREDIT_CARD", "BANK_TRANSFER"]),
      paidAt: z.date(),
    }),
    createdAt: z.date().refine((val) => val < new Date(), "cant in the future"),
  })
  .superRefine((data, ctx) => {
    if (data.items.length <= 1)
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "data items cant be empty",
        path: ["items"],
      });
  });
