import { prisma } from "../../lib/prisma";

export const getDashboardStats = async () => {
  const [userCount, storeCount, ratingCount] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count()
  ]);

  return {
    users: userCount,
    stores: storeCount,
    ratings: ratingCount
  };
};
