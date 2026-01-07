import { prisma } from "../../lib/prisma";
import { badRequest, notFound } from "../../utils/errors";

export const upsertRating = async (input: {
  userId: number;
  storeId: number;
  score: number;
}) => {
  if (input.score < 1 || input.score > 5) {
    throw badRequest("Rating must be between 1 and 5");
  }

  const store = await prisma.store.findUnique({ where: { id: input.storeId } });
  if (!store) {
    throw notFound("Store not found");
  }

  const rating = await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: input.userId,
        storeId: input.storeId
      }
    },
    update: {
      score: input.score
    },
    create: {
      userId: input.userId,
      storeId: input.storeId,
      score: input.score
    },
    select: {
      id: true,
      score: true,
      storeId: true,
      userId: true,
      updatedAt: true
    }
  });

  return rating;
};

export const getUserRatings = async (userId: number) => {
  return prisma.rating.findMany({
    where: { userId },
    include: {
      store: {
        select: {
          id: true,
          name: true,
          address: true
        }
      }
    }
  });
};
