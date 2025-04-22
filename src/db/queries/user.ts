import { prisma } from "@/db"
import bcrypt from 'bcryptjs';
import type { User } from "@prisma/client"

export async function fetchUsers(excludedUserId: string = ''): Promise<User[]> {
    let conds = {}
    if (excludedUserId) {
    conds = {
      where: {
        NOT: {
          id: excludedUserId
        }
      }
    }
  }
  return prisma.user.findMany(conds)
}
export async function fetchUserById(id: string): Promise<User | null> {
  if (!id) {
    return null;
  }
  return prisma.user.findFirst({
    where: {
      id
    }
  })
}

export async function fetchUserByEmail(email: string): Promise<User | null> {
  if (!email) {
    return null;
  }
  return prisma.user.findFirst({
    where: {
      email: email
    }
  })
}
export async function fetchUserByCredentials(email: string, password: string): Promise<User | null> {
  if (!email || !password) {
    return null
  }
  let user: User | null;
  try {
    user = await fetchUserByEmail(email);
    if (user && user.password) {
      const isMatch = await bcrypt.compare(password as string, user.password as string)
      if (isMatch) {
        return user;
      }
    }
  } catch (error: unknown) {
    console.log(error);
  }
  return null
}
