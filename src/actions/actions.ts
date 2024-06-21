"use server";

import { signIn, signOut } from "@/auth";

export async function Login() {
  await signIn("google");
}

export async function Logout() {
  await signOut();
}
