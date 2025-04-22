'use server';

import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
import * as auth from '@/auth'
import { prisma } from "@/db"
import { changePasswordFormSchema, forgotPasswordFormSchema, profileFormSchema, resetPasswordFormSchema, signInFormSchema, signUpFormSchema } from '@/lib/validators'
import { fetchUserById } from "@/db/queries/user";

type SingUpFormState = {
  errors: {
    name?: string[],
    email?: string[],
    password?: string[],
    confirmPassword?: string[],
    _form?: string[]
  },
  status?: boolean,
  message?: string
}

type SignInFormState = {
  errors?: {
    email?: string[],
    password?: string[],
    _form?: string[]
  },
  status?: boolean,
  message?: string
}

type ForgotPasswordFormState = {
  errors?: {
    email?: string[],
    _form?: string[]
  },
  status?: boolean,
  message?: string
}

type ResetPasswordFormState = {
  errors?: {
    password?: string[],
    confirmPassword?: string[],
    _form?: string[]
  },
  status?: boolean,
  message?: string
}

type ChangePasswordFormState = {
  errors?: {
    currentPassword?: string[],
    password?: string[],
    confirmPassword?: string[],
    _form?: string[]
  },
  status?: boolean,
  message?: string
}

type UpdateProfileFormState = {
  errors?: {
    name?: string[],
    _form?: string[]
  },
  status?: boolean,
  message?: string
}

export async function signIn(formState: SignInFormState, formData: FormData): Promise<SignInFormState> {
  try {
    const result = signInFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }
    const { email, password } = result.data;
    await auth.signIn('credentials', { email, password, redirect: false });
    // return { status: true, message: 'Signed in successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      } 
    }
  }
  redirect('/');
  // return { status: false, message: 'Invalid email or password' };
}

export async function signOut() {
  return auth.signOut();
}


export async function signUp(formState: SingUpFormState, formData: FormData): Promise<SingUpFormState> {
  const result = signUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }
  const { name, email, password } = result.data;
  const user = await prisma.user.findUnique({ where: { email: email } })
  if (user) {
    return {
      errors: {
        email: ['Email taken, please enter another email']
      }
    }
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    })
    await auth.signIn('credentials', {
      email,
      password,
    });
  
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      } 
    }
  }
  redirect('/')
}


export async function forgotPassword(formState: ForgotPasswordFormState, formData: FormData): Promise<ForgotPasswordFormState> {
  try {
    const result = forgotPasswordFormSchema.safeParse({
      email: formData.get('email'),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }
    const { email } = result.data;
    await auth.signIn('credentials', { email, password, redirect: false });
    // return { status: true, message: 'Signed in successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      } 
    }
  }
  redirect('/');
  // return { status: false, message: 'Invalid email or password' };
}

export async function resetPassword(formState: ResetPasswordFormState, formData: FormData): Promise<ResetPasswordFormState> {
  try {
    const result = resetPasswordFormSchema.safeParse({
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }
    const { password, confirmPassword } = result.data;
    // return { status: true, message: 'Signed in successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      } 
    }
  }
  redirect('/');
  // return { status: false, message: 'Invalid email or password' };
}



export async function changePassword(formState: ChangePasswordFormState, formData: FormData): Promise<ChangePasswordFormState> {
  try {
    const result = changePasswordFormSchema.safeParse({
      currentPassword: formData.get('currentPassword'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }
    const { currentPassword, password, confirmPassword } = result.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      } 
    }
  }
  redirect('/');
}


export async function updateProfile(formState: UpdateProfileFormState, formData: FormData): Promise<UpdateProfileFormState> {
  try {
    const session = await auth.auth();
    if (!session || !session?.user?.id) {
      throw new Error('Not authorized');
    }

    const currentUser = await fetchUserById(session?.user?.id);
    if (!currentUser) {
      throw new Error('User not found');
    }
    const result = profileFormSchema.safeParse({
      name: formData.get('name'),
    });
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors
      }
    }
    const { name } = result.data;
    await prisma.user.update({
      where: {
        id: session.user?.id
      },
      data: {
        name
      }
    })
    return { status: true, message: 'Your profile has been updated successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      } 
    }
  }
}