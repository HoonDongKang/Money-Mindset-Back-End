import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const Kim = await prisma.user.upsert({
    where: { email: 'Kim@naver.com' },
    update: {},
    create: {
      email: 'Kim@naver.com',
      password: 'Kim password',
      nickname: 'Kim Nickname',
      refreshToken: 'Kim refresh token',
      maginot: {
        create: {
          ranking: 1,
          goal: `Kim's first goal`,
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
          fixed_expenditure: `Kim's first fixed expenditure`,
          expenditure_amount: 100,
          expenditure_date: '15',
        },
      },
      flow: {
        create: {
          flow_id: 1,
          amount: 1000,
          flow_date: new Date('2023-04-26'),
          flowDetail: {
            create: {
              detail: `Kim's first flow detail`,
              lat: 35.891374797181705,
              lng: 128.6151231834401,
            },
          },
        },
      },
    },
  });

  const Kang = await prisma.user.upsert({
    where: { email: 'Kang@naver.com' },
    update: {},
    create: {
      email: 'Kang@naver.com',
      password: 'Kang password',
      nickname: 'Kang Nickname',
      refreshToken: 'Kang refresh token',
      maginot: {
        create: {
          ranking: 1,
          goal: `Kang's first goal`,
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
          fixed_expenditure: `Kang's first fixed expenditure`,
          expenditure_amount: 100,
          expenditure_date: '15',
        },
      },
      flow: {
        create: {
          flow_id: 1,
          amount: 1000,
          flow_date: new Date('2023-04-26'),
          flowDetail: {
            create: {
              detail: `Kang's first flow detail`,
              lat: 35.891374797181705,
              lng: 128.6151231834401,
            },
          },
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
