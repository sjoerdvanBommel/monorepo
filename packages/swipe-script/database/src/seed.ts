import { prisma, type User } from "./client";

const DEFAULT_USERS = [
  {
    name: "Sjoerd van Bommel",
    email: "sjoerd.van.bommel@hotmail.com",
  },
] satisfies Partial<User>[];

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
