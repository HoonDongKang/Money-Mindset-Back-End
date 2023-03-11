import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstSeed = await prisma.user.upsert({
    where: { email: 'First Email' },
    update: {},
    create: {
      email: 'First Email',
      password: 'First password',
      nickname: 'First Nickname',
    },
  });
  const secondSeed = await prisma.user.upsert({
    where: { email: 'Second email' },
    update: {},
    create: {
      email: 'Second Email',
      password: 'Second password',
      nickname: 'Second Nickname',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
