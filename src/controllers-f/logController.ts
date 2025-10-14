export interface Exercise {
  _id?: string;
  övning: string;
  set: number;
  reps: number;
  vikt: number;
  kommentar?: string;
}

interface Session {
  _id?: string;
  split: string;
  date: string;
  exercises: Exercise[];
}

export function initLogController(
  sessionForm: HTMLFormElement,
  exerciseForm: HTMLFormElement,
  logList: HTMLElement | null
) {
  let logData: Session[] = []; 
  let currentEditId: string | null = null;
  let currentSession: Session | null = null;

  // Inaktivera inputs initialt
  exerciseForm.querySelectorAll("input, button").forEach(
    (el) => ((el as HTMLInputElement | HTMLButtonElement).disabled = true)
  );

  fetchSessions();

  // Starta nytt pass
  sessionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentSession = {
      _id: Date.now().toString(),
      split: (sessionForm.elements.namedItem("split") as HTMLInputElement).value,
      date: (sessionForm.elements.namedItem("date") as HTMLInputElement).value,
      exercises: [],
    };

    sessionForm.reset();
    exerciseForm.querySelectorAll("input, button").forEach(
      (el) => ((el as HTMLInputElement | HTMLButtonElement).disabled = false)
    );
    renderCurrentExercises();
  });

  // Lägga till övning
  exerciseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!currentSession) return;

    const newExercise: Exercise = {
      _id: Date.now().toString(),
      övning: (exerciseForm.exercise as HTMLInputElement).value,
      set: Number((exerciseForm.set as HTMLInputElement).value),
      reps: Number((exerciseForm.reps as HTMLInputElement).value),
      vikt: Number((exerciseForm.weight as HTMLInputElement).value),
      kommentar: (exerciseForm.comment as HTMLInputElement).value,
    };

    if (currentEditId) {
      currentSession.exercises = currentSession.exercises.map((ex) =>
        ex._id === currentEditId ? { ...ex, ...newExercise } : ex
      );
      currentEditId = null;
    } else {
      currentSession.exercises.push(newExercise);
    }

    renderCurrentExercises();
    exerciseForm.reset();
  });

  // Spara pass
  const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
  saveBtn.addEventListener("click", async () => {
    if (!currentSession || currentSession.exercises.length === 0) {
      alert("Inga övningar att spara! Lägg till minst en övning först.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSession),
      });
      const data: Session = await res.json();

      logData.push(data);

      // Töm högerkortet helt
      if (logList) logList.innerHTML = "";

      currentSession = null;
      renderCurrentExercises();

  
      sessionForm.reset();
      exerciseForm.reset();
      exerciseForm.querySelectorAll("input, button").forEach(
        (el) => ((el as HTMLInputElement | HTMLButtonElement).disabled = true)
      );

      alert("Passet sparat!");
    } catch (error) {
      console.error("Kunde inte spara pass:", error);
    }
  });

  // Hämta sessions
  async function fetchSessions(): Promise<void> {
    try {
     const res = await fetch("http://localhost:3000/api/exercises");
      if (res.ok) {
        logData = await res.json();
      }
    } catch (error) {
      console.error("Kunde inte hämta övningar:", error);
    }
  }

  // Rendera aktuella övningar i vänstra kortet
  function renderCurrentExercises(): void {
    const sessionInfoDiv = document.getElementById("current-session-info");
    const ul = document.getElementById("current-exercises-list");
    if (!ul) return;
    ul.innerHTML = "";

    if (!currentSession) {
      if (sessionInfoDiv) sessionInfoDiv.textContent = "";
      return;
    }

    if (sessionInfoDiv)
      sessionInfoDiv.textContent = `${currentSession.split} - ${currentSession.date}`;

    currentSession.exercises.forEach((exercise) => {
      const li = document.createElement("li");
      li.textContent = `${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${
        exercise.kommentar ? ": " + exercise.kommentar : ""
      }`;

      const actions = document.createElement("div");
      actions.classList.add("log-actions");

      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editBtn.addEventListener("click", () => {
        currentEditId = exercise._id || null;
        (exerciseForm.elements.namedItem("exercise") as HTMLInputElement).value = exercise.övning;
        (exerciseForm.elements.namedItem("set") as HTMLInputElement).value = String(exercise.set);
        (exerciseForm.elements.namedItem("reps") as HTMLInputElement).value = String(exercise.reps);
        (exerciseForm.elements.namedItem("weight") as HTMLInputElement).value = String(exercise.vikt);
        (exerciseForm.elements.namedItem("comment") as HTMLInputElement).value = exercise.kommentar || "";
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.addEventListener("click", () => {
        if (currentSession) {
          currentSession.exercises = currentSession.exercises.filter((ex) => ex._id !== exercise._id);
          renderCurrentExercises();
        }
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(actions);
      ul.appendChild(li);
    });
  }
}