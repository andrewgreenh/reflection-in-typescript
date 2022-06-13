import { number, object, string } from "zod";

type FormState = typeof initialFormState;

type FormStateOverwrites = {
  [Key in keyof FormState]?:
    | FormState[Key]
    | null;
};

type FormStateSetters = {
  [Key in keyof FormState as `set${Capitalize<Key>}`]: (
    value: FormState[Key]
  ) => void;
};

const initialFormState = {
  age: 5,
  name: "Peter",
};

function openModal(
  customState: FormStateOverwrites
) {
  //
}

openModal({ age: 10 });

type Validator<T> = (input: any) => string | null;
type FromValidator<TValidator> =
  TValidator extends Validator<infer U>
    ? U
    : never;

// const number: Validator<number> = (input) =>
//   typeof input !== "number"
//     ? "Should be a number!"
//     : null;

// const string: Validator<string> = (input) =>
//   typeof input !== "string"
//     ? "Should be a string!"
//     : null;

// const object = <
//   TObject extends Record<string, Validator<any>>
// >(
//   object: TObject
// ): Validator<{
//   [Key in keyof TObject]: FromValidator<
//     TObject[Key]
//   >;
// }> => {
//   return () => null;
// };

const person = object({
  age: number(),
  name: string(),

  // friends: lazy(() => array(person))
});

type Person = FromValidator<typeof person>;
