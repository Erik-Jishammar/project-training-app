const BASE_URL = "http://localhost:3000"; 


export async function getExercises() { 
    const res = await fetch(`${BASE_URL}/exercises`);
    return res.json();
}

export async function addExercise(exercise) {
    const res = await fetch(`${BASE_URL}/exercises`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exercise),
    });
    return res.json(); 
}
export async function deleteExercise(id) {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, { method: 'DELETE' });
  return res.json();
}
