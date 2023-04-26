import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const fistUser = await prisma.user.upsert({
    where: { email: 'First Email' },
    update: {},
    create: {
      email: 'First Email',
      password: 'First password',
      nickname: 'First Nickname',
      maginot: {
        create: {
          ranking: 1,
          goal: 'mac',
          amount: 1000,
          line: 1,
        },
      },
      asset: {
        create: {
          amount: 100000,
        },
      },
      expenditure: {
        create: {
          fixed_expenditure: 'food',
          expenditure_amount: 100,
          expenditure_date: '15',
        },
      },
      flow: {
        create: {
          flow_id: 1,
          amount: 1000,
          flow_date: new Date('2023-04-26'),
        },
      },
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
