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
        },
      },
      income_Expense: {
        create: {
          type: 'income',
          category: 'salary',
          amount: 1000,
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
