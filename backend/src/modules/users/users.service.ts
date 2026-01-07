import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { notFound } from "../../utils/errors";
import { Role, Roles } from "../../types/roles";

export interface UserListFilters {
  name?: string;
  email?: string;
  address?: string;
  role?: Role;
  sortBy?: "name" | "email" | "address" | "role" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const listUsers = async (filters: UserListFilters) => {
  const where: Prisma.UserWhereInput = {};

  if (filters.name) {
    where.name = { contains: filters.name };
  }

  if (filters.email) {
    where.email = { contains: filters.email };
  }

  if (filters.address) {
    where.address = { contains: filters.address };
  }

  if (filters.role) {
    where.role = filters.role;
  }

  const orderBy: Prisma.UserOrderByWithRelationInput = {
    [filters.sortBy ?? "createdAt"]: filters.sortOrder ?? "desc"
  };

  return prisma.user.findMany({
    where,
    orderBy,
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true
    }
  });
};

export const getUserDetail = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      stores: {
        select: {
          id: true,
          name: true,
          ratings: {
            select: { score: true }
          }
        }
      }
    }
  });

  if (!user) {
    throw notFound("User not found");
  }

  let ownerRating: number | null = null;
  if (user.role === Roles.OWNER) {
    const scores = user.stores.flatMap((store) => store.ratings.map((rating) => rating.score));
    ownerRating = scores.length ? Number((scores.reduce((acc, curr) => acc + curr, 0) / scores.length).toFixed(2)) : null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
    ownerRating,
    stores: user.stores.map((store) => ({
      id: store.id,
      name: store.name
    }))
  };
};
