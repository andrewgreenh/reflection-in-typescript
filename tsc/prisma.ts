import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.person.findFirst({
  where: { age: 5 },
});
