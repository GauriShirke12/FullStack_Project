import { Prisma, PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { Role, Roles } from "../src/types/roles";

const prisma = new PrismaClient();

type SeedUser = {
  name: string;
  email: string;
  role: Role;
  address?: string;
  password: string;
};

const demoUsers: SeedUser[] = [
  {
    name: "Demo Administrator",
    email: "admin@demo.dev",
    role: Roles.ADMIN,
    address: "99 Platform Way, Suite 100",
    password: "Demo!123"
  },
  {
    name: "Olivia Carter",
    email: "owner@demo.dev",
    role: Roles.OWNER,
    address: "18 Market Street, Portland, OR",
    password: "Owner!123"
  },
  {
    name: "Marcus Lee",
    email: "user@demo.dev",
    role: Roles.USER,
    address: "742 Evergreen Terrace, Springfield",
    password: "User!123"
  }
];

const demoStores: Array<Prisma.StoreCreateInput & { uniqueEmail: string }> = [
  {
    uniqueEmail: "hello@brewbean.demo",
    name: "Brew & Bean Roastery",
    email: "hello@brewbean.demo",
    address: "500 Roastery Ave, Seattle, WA",
    owner: {
      connect: {
        email: "owner@demo.dev"
      }
    }
  },
  {
    uniqueEmail: "freshfare@market.demo",
    name: "Fresh Fare Market",
    email: "freshfare@market.demo",
    address: "215 Garden Blvd, Austin, TX",
    owner: {
      connect: {
        email: "owner@demo.dev"
      }
    }
  }
];

const demoRatings = [
  {
    userEmail: "user@demo.dev",
    storeEmail: "hello@brewbean.demo",
    score: 5,
    comment: "Fantastic espresso, cozy space, and friendly staff!"
  },
  {
    userEmail: "user@demo.dev",
    storeEmail: "freshfare@market.demo",
    score: 4,
    comment: "Great produce selection, but weekend lines get long."
  }
];

async function seedUsers() {
  for (const seedUser of demoUsers) {
    const passwordHash = await hashPassword(seedUser.password);
    await prisma.user.upsert({
      where: { email: seedUser.email },
      update: {},
      create: {
        name: seedUser.name,
        email: seedUser.email,
        address: seedUser.address ?? null,
        role: seedUser.role,
        passwordHash
      }
    });
  }
}

async function seedStores() {
  for (const store of demoStores) {
    await prisma.store.upsert({
      where: { email: store.uniqueEmail },
      update: {},
      create: {
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner
      }
    });
  }
}

async function seedRatings() {
  for (const rating of demoRatings) {
    const user = await prisma.user.findUnique({ where: { email: rating.userEmail } });
    const store = await prisma.store.findUnique({ where: { email: rating.storeEmail } });
    if (!user || !store) {
      continue;
    }

    await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId: user.id,
          storeId: store.id
        }
      },
      update: {
        score: rating.score,
        comment: rating.comment
      },
      create: {
        score: rating.score,
        comment: rating.comment,
        user: { connect: { id: user.id } },
        store: { connect: { id: store.id } }
      }
    });
  }
}

async function main() {
  console.log("🌱 Seeding demo data...");
  await seedUsers();
  await seedStores();
  await seedRatings();
  console.log("✅ Demo data ready. Use admin@demo.dev / Demo!123 to log in as admin.");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
