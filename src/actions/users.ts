"use server";

import { handleError } from "@/lib/utils";

export const loginAction = async (_email: string, _password: string) => {
  void _email;
  void _password;

  try {
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutAction = async () => {
  try {
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (_email: string, _password: string) => {
  void _email;
  void _password;

  try {
    return { errorMessage: null };
  } catch (error: unknown) {
    console.error("Sign-up error:", error);
    return handleError(error);
  }
};