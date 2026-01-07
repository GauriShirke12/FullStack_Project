import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { badRequest, notFound } from "../../utils/errors";

export interface StoreFilters {
  name?: string;
  email?: string;
  address?: string;
  sortBy?: "name" | "email" | "address" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const createStore = async (input: {
  name: string;
  email?: string;
  address: string;
  ownerId?: number;
}) => {
  let ownerConnect: Prisma.StoreCreateInput["owner"] | undefined;
  if (input.ownerId) {
    const owner = await prisma.user.findUnique({ where: { id: input.ownerId } });
    if (!owner) {
      throw badRequest("Store owner not found");
    }
    if (owner.role !== "OWNER") {
      throw badRequest("Assigned user is not a store owner");
    }
    ownerConnect = { connect: { id: owner.id } };
  }

  const data: Prisma.StoreCreateInput = {
    name: input.name,
    email: input.email ?? null,
    address: input.address
  };

  if (ownerConnect) {
    data.owner = ownerConnect;
  }

  return prisma.store.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      ownerId: true
    }
  });
};

export const updateStore = async (
  storeId: number,
  input: {
    name?: string;
    email?: string;
    address?: string;
    ownerId?: number | null;
  }
) => {
  const existing = await prisma.store.findUnique({ where: { id: storeId } });
  if (!existing) {
    throw notFound("Store not found");
  }

  let ownerUpdate: Prisma.StoreUpdateInput["owner"] | undefined;
  if (input.ownerId !== undefined) {
    if (input.ownerId === null) {
      ownerUpdate = { disconnect: true };
    } else {
      const owner = await prisma.user.findUnique({ where: { id: input.ownerId } });
      if (!owner) {
        throw badRequest("Store owner not found");
      }
      if (owner.role !== "OWNER") {
        throw badRequest("Assigned user is not a store owner");
      }
      ownerUpdate = { connect: { id: owner.id } };
    }
  }

  const data: Prisma.StoreUpdateInput = {
    name: input.name ?? existing.name,
    email: input.email ?? existing.email ?? null,
    address: input.address ?? existing.address
  };

  if (ownerUpdate) {
    data.owner = ownerUpdate;
  }

  const updated = await prisma.store.update({
    where: { id: storeId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      ownerId: true
    }
  });

  return updated;
};

export const listStoresForAdmin = async (filters: StoreFilters) => {
  const where: Prisma.StoreWhereInput = {};

  if (filters.name) {
    where.name = { contains: filters.name };
  }

  if (filters.email) {
    where.email = { contains: filters.email };
  }

  if (filters.address) {
    where.address = { contains: filters.address };
  }

  const stores = await prisma.store.findMany({
    where,
    orderBy: {
      [filters.sortBy ?? "createdAt"]: filters.sortOrder ?? "desc"
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      ratings: {
        select: { score: true }
      }
    }
  });

  return stores.map((store) => {
    const avg = store.ratings.length
      ? Number((store.ratings.reduce((sum, rating) => sum + rating.score, 0) / store.ratings.length).toFixed(2))
      : null;
    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      owner: store.owner,
      averageRating: avg
    };
  });
};

export const listStoresForUser = async (filters: StoreFilters, userId: number) => {
  const where: Prisma.StoreWhereInput = {};

  if (filters.name) {
    where.name = { contains: filters.name };
  }

  if (filters.address) {
    where.address = { contains: filters.address };
  }

  const stores = await prisma.store.findMany({
    where,
    orderBy: {
      [filters.sortBy ?? "name"]: filters.sortOrder ?? "asc"
    },
    select: {
      id: true,
      name: true,
      address: true,
      ratings: {
        select: {
          score: true,
          userId: true
        }
      }
    }
  });

  return stores.map((store) => {
    const averageRating = store.ratings.length
      ? Number((store.ratings.reduce((sum, rating) => sum + rating.score, 0) / store.ratings.length).toFixed(2))
      : null;

    const userRating = store.ratings.find((rating) => rating.userId === userId)?.score ?? null;

    return {
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating,
      userRating
    };
  });
};

export const getOwnerDashboard = async (ownerId: number) => {
  const stores = await prisma.store.findMany({
    where: { ownerId },
    select: {
      id: true,
      name: true,
      ratings: {
        select: {
          score: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });

  if (!stores.length) {
    throw notFound("Store not found for owner");
  }

  return stores.map((store) => {
    const averageRating = store.ratings.length
      ? Number((store.ratings.reduce((sum, rating) => sum + rating.score, 0) / store.ratings.length).toFixed(2))
      : null;

    return {
      store: {
        id: store.id,
        name: store.name,
        averageRating
      },
      ratings: store.ratings.map((rating) => ({
        score: rating.score,
        user: rating.user
      }))
    };
  });
};
