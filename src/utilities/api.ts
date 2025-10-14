import type { Session } from "../models/sessionModel.js";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? ""
    : "http://localhost:3000/api";

export async function getSessions(): Promise<Session[]> {
  const res = await fetch(`${BASE_URL}/sessions`);
  if (!res.ok) throw new Error("Kunde inte hämta sessions");
  return res.json() as Promise<Session[]>;
}

export async function addSession(session: Session): Promise<Session> {
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(session),
  });
  return res.json();
}

export async function updateSession(id: string, data: Partial<Session>): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/sessions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteSession(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/sessions/${id}`, {
    method: "DELETE",
  });
  return res.json();
}