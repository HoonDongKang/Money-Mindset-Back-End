import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstSeed = await prisma.user.upsert({
    where: { id: 'First id' },
    update: {},
    create: {
      id: 'First id',
      password: 'First password',
      email: 'First Email',
      nickname: 'First Nickname',
    },
  });
  const secondSeed = await prisma.user.upsert({
    where: { id: 'Second id' },
    update: {},
    create: {
      id: 'Second id',
      password: 'Second password',
      email: 'Second Email',
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
