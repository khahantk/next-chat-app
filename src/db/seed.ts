import { PrismaClient } from '@prisma/client';
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function seed() {
  // await prisma.user.createMany({
  //   data: sampleData.users
  // });
  await prisma.product.createMany({
    data: sampleData.products
  });
}
async function main() {
  try {
    console.log('-- run seed data --');
    // await prisma.account.deleteMany();
    // await prisma.session.deleteMany();
    // await prisma.verificationToken.deleteMany();
    // await prisma.user.deleteMany();

    await prisma.product.deleteMany();
    
    await seed();
    await prisma.$disconnect();
    console.log('-- run seed data successful --');
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();