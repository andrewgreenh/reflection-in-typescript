import {
  intArg,
  makeSchema,
  objectType,
  queryType,
  stringArg,
} from "nexus";
import { join } from "path";

const Person = objectType({
  name: "Person",
  definition(t) {
    t.string("name");
    t.int("age");
  },
});

const Query = queryType({
  definition(t) {
    t.field("person", {
      type: Person,
      args: {
        name: stringArg(),
        id: intArg(),
      },
      resolve(_, args) {
        console.log(args.name);

        return {
          age: 1,
          name: "Peter",
        };
      },
    });
  },
});

const schema = makeSchema({
  types: [Query],
  shouldGenerateArtifacts: true,
  outputs: {
    typegen: join(
      __dirname,
      "..",
      "nexus-typegen.ts"
    ),
    schema: join(
      __dirname,
      "..",
      "schema.graphql"
    ),
  },
});
