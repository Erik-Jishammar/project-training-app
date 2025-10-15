import type { Session } from "../models/types.js";


export const BASE_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api";

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getSessions(): Promise<Session[]> {
  const res = await fetch(`${BASE_URL}/exercises`);
  return handleJson<Session[]>(res);
}

export async function addSession(session: Session): Promise<Session> {
  const res = await fetch(`${BASE_URL}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(session),
  });
  return handleJson<Session>(res);
}

export async function updateSession(id: string, data: Partial<Session>): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleJson<{ message: string }>(res);
}

export async function deleteSession(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, {
    method: "DELETE",
  });
  return handleJson<{ message: string }>(res);
}