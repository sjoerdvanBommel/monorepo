// If there's a compile error here, make sure to run `pnpm run db:generate` first, so the client gets generated
// Still an error? Ctrl + Shift + P -> Restart TS Server
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
