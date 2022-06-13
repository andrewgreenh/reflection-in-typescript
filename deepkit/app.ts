import { ReflectionClass, stringifyType } from "@deepkit/type";

class User {
  name?: string;
  age?: number;

  friends?: User[];
}

const userReflection = ReflectionClass.from(User);

for (const property of userReflection.getProperties()) {
  console.log(property.name, stringifyType(property.getType()));
}

export {};

type CssMode = "darkmode" | "lightmode" | "twilight";
