import zod, { number, object, string } from "zod";

const Person = object({
  name: string().min(5),
  age: number().int().max(150),
});

type Person = zod.infer<typeof Person>;

function handle(input: unknown) {
  const person = Person.parse(input);

  console.log(person.age);
}
