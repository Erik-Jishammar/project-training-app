import type  { Exercise } from "../models/sessionModel.js";


const BASE_URL = "http://localhost:3000"; 


export async function getExercises(): Promise <Exercise[]> { 
    const res = await fetch(`${BASE_URL}/exercises`);
    if (!res.ok) throw Error('Kunde inte hämta övningar')
    return (await res.json()) as Exercise[];
}

export async function addExercise(exercise: Exercise): Promise <Exercise> {
    const res = await fetch(`${BASE_URL}/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise),
    });
    return res.json(); 
}
export async function deleteExercise(id: string): Promise<{message: string}> {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, { method: 'DELETE' });
  return res.json();
}
