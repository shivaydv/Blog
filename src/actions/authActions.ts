"use server";
import { signIn, signOut } from "@/auth";

export async function LoginbyGoogle() {
  await signIn("google");
}
export async function LoginbyGithub() {
  await signIn("github");
}

export async function Logout() {
  await signOut();
}
