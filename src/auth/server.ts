export type AppUser = {
  id: string;
  email?: string | null;
};

export async function createClient() {
  return null;
}

export async function getUser() {
  return {
    id: "local-user",
    email: "local@example.com",
  } satisfies AppUser;
}