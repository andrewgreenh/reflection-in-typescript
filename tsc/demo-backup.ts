import { number, object, string } from "zod";

const defaultState = {
  name: "",
  age: 0,
};

type State = typeof defaultState;

type StateOverwrites = {
  [Key in keyof State]?: State[Key];
};

type Setters<T> = {
  [Key in keyof T as `set${Capitalize<Key & string>}`]: (
    newValue: T[Key]
  ) => void;
};

type JavaState = Setters<State>;

type Validator<T> = (value: any) => string | null;
type ValidatedValue<TValidator> =
  TValidator extends Validator<infer TValue>
    ? TValue
    : never;

// const number: Validator<number> = (value) => {
//   if (typeof value !== "number") return `Expected number, retrieved ${value}`;
//   return null;
// };

// const string: Validator<string> = (value) => {
//   if (typeof value !== "string") return `Expected string, retrieved ${value}`;
//   return null;
// };

// const object = <TObject extends Record<any, Validator<any>>>(
//   shape: TObject
// ): Validator<{
//   [Key in keyof TObject]: ValidatedValue<TObject[Key]>;
// }> => {
//   return function validate(input: any) {
//     const errors =
//       Object.entries(shape)
//         .map(([key, value]) => value(input[key]))
//         .filter(Boolean)
//         .join("\n") || null;
//     return errors;
//   };
// };

const Person = object({
  age: number(),
  name: string(),
});
type Person = ValidatedValue<typeof Person>;

const person = Person.safeParse({ age: 1 });
if (!person.success) console.log(person.error.format());
