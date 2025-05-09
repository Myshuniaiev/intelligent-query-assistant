const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log('Starting Prisma tests...\n');

    // Test Users Model
    console.log('Testing Users Model:');
    console.log('-------------------');

    // Create a test user
    const testUser = await prisma.users.create({
      data: {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        signupDate: new Date(),
      },
    });
    console.log('Created test user:', testUser);

    // Query the created user
    const foundUser = await prisma.users.findUnique({
      where: { id: testUser.id },
    });
    console.log('Found user:', foundUser);

    // Test Sales Model
    console.log('\nTesting Sales Model:');
    console.log('-------------------');

    // Create a test sale
    const testSale = await prisma.sales.create({
      data: {
        date: new Date(),
        region: 'Test Region',
        product: 'Test Product',
        quantity: 5,
        revenue: 99.99,
      },
    });
    console.log('Created test sale:', testSale);

    // Get total sales count
    const salesCount = await prisma.sales.count();
    console.log('Total number of sales:', salesCount);

    // Get the first 5 sales
    const sales = await prisma.sales.findMany({
      take: 5,
      orderBy: {
        id: 'asc',
      },
    });
    console.log('\nFirst 5 sales:');
    console.log(JSON.stringify(sales, null, 2));

    // Test aggregation
    const salesByRegion = await prisma.sales.groupBy({
      by: ['region'],
      _sum: {
        quantity: true,
        revenue: true,
      },
    });
    console.log('\nSales by region:');
    console.log(JSON.stringify(salesByRegion, null, 2));

    // Cleanup test data
    console.log('\nCleaning up test data...');
    await prisma.sales.delete({
      where: { id: testSale.id },
    });
    await prisma.users.delete({
      where: { id: testUser.id },
    });
    console.log('Test data cleaned up successfully');
  } catch (error) {
    console.error('Error during Prisma tests:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('\nPrisma tests completed.');
  }
}

main();
