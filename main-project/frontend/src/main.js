const form = document.getElementById("log-form");
const logList = document.getElementById("log-list");

const stats = document.getElementById("stats-container");
const passGenerator = document.getElementById("create-pass-generator");

let logData = []; // skapa array/lista
let currentEditId = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/exercises"); // GET förfrågan
    if (response.ok) {
      logData = await response.json();
      renderLogList();
    }
  } catch (error) {
    console.error("Kunde inte hämta övningar:", error);
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Hindra sidan från att ladda om

  // Hämta data från formuläret och skapa objekt
  const newExercise = {
    ID: Date.now(), // Unik ID för redigering och borttagning
    datum: form.date.value,
    övning: form.exercise.value,
    set: form.set.value,
    reps: form.reps.value,
    vikt: form.weight.value,
    kommentar: form.comment.value,
  };

  let responseData;
  if (currentEditId) {
    const response = await fetch(
      `http://localhost:3000/exercises/${currentEditId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      }
    );
    responseData = await response.json();
    console.log("övning uppdaterad");

    for (let i = 0; 1 < logData.length; i++) {
      if (logData[i].ID === currentEditId) {
        logData[i].datum = newExercise.datum;
        logData[i].övning = newExercise.övning;
        logData[i].set = newExercise.set;
        logData[i].reps = newExercise.reps;
        logData[i].vikt = newExercise.vikt;
        logData[i].kommentar = newExercise.kommentar;
        break;
      }
    }
  } else {
    const result = await fetch("http://localhost:3000/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExercise),
    });

    const responseData = await result.json(); // läs svaret från express-servern
    console.log("Nytt pass sparat:", responseData);

    logData.push(responseData.exercise || responseData);

    renderLogList();
    form.reset();
    currentEditId = null; // återställ "edit-läge"
  }
});

// Funktion för att rendera lista
function renderLogList() {
  logList.innerHTML = ""; // Tömmer listan
  console.log("Alla pass sparade:", logData);

  logData.forEach((exercise) => {
    const li = document.createElement("li"); // Skapa <li> för varje övning/pass
    li.textContent = `${exercise.datum} - ${exercise.övning} (${exercise.set}x${
      exercise.reps
    }) - ${exercise.vikt}kg${
      exercise.kommentar ? ": " + exercise.kommentar : ""
    }`;

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.addEventListener("click", () => {
      currentEditId = exercise.ID; // ID  för "edit läge"
      form.date.value = exercise.datum;
      form.exercise.value = exercise.övning;
      form.set.value = exercise.set;
      form.reps.value = exercise.reps;
      form.weight.value = exercise.vikt;
      form.comment.value = exercise.kommentar || "";
    });

    li.appendChild(editBtn);
    logList.appendChild(li);
  });
}
/*
    const editBtn = document.createElement('button'); 
    editBtn.textContent = "<i class="fa-solid fa-pen"></i>";
    
    editBtn.addEventListener('click', () =>{

    });
 */

// const removeBtn = document.createElement("button");
// removeBtn.innerText = "X";
// filter ID? -> För att hitta den övningen som ska tas bort
// removeBtn.addEventListener("click", () => {
//  logik
