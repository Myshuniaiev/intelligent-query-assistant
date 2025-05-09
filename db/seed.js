const { Client } = require("pg");
const { faker } = require("@faker-js/faker");

async function seed() {
  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://user:pass@localhost:5432/analytics",
  });
  await client.connect();

  // Generate 200 sales rows
  for (let i = 0; i < 200; i++) {
    const date = faker.date.between({
      from: "2024-01-01",
      to: "2024-12-31",
    });
    const region = faker.helpers.arrayElement([
      "North",
      "South",
      "East",
      "West",
    ]);
    const product = faker.commerce.productName();
    const quantity = faker.number.int({ min: 1, max: 100 });
    const revenue = faker.number.float({ min: 10, max: 1000, precision: 0.01 });
    await client.query(
      "INSERT INTO sales(date, region, product, quantity, revenue) VALUES($1,$2,$3,$4,$5)",
      [date, region, product, quantity, revenue]
    );
  }

  console.log("Seed completed");
  await client.end();
}

seed().catch(console.error);
