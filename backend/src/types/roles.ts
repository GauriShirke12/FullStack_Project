export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
  OWNER: "OWNER"
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export const roleValues = [Roles.ADMIN, Roles.USER, Roles.OWNER] as const;

export const isRole = (value: unknown): value is Role =>
  typeof value === "string" && (roleValues as readonly string[]).includes(value);

export const toRole = (value: unknown): Role => {
  if (!isRole(value)) {
    throw new Error(`Invalid role value: ${value}`);
  }
  return value;
};
