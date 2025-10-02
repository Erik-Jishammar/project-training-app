interface Exercise {
  _id: number;
  övning: string;
  set: number;
  reps: number;
  vikt: number;
  kommentar?: string;
}
interface Session{
  _id: number | null;
  split: string;
  date: string; 
  exercises: Exercise[];
}


export function initLogController(
  
  sessionForm:HTMLFormElement, logForm:HTMLFormElement, logList: HTMLElement | null ){
  let logData: Session[] = []; // pass/historik från backend
  let currentEditId: number | null = null;
  let currentSession: Session | null = null;
  
  logForm.querySelectorAll("input, button").forEach(el => (el as HTMLInputElement | HTMLButtonElement).disabled = true);


  const sessionInfoDiv = document.getElementById("current-session-info");

  fetchExercises(); // hjälpfunktion getExercises -> api.js

  sessionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentSession = {
      _id: null, // sätts när vi sparar
      split: (sessionForm.elements.namedItem("split") as HTMLInputElement).value,
      date: (sessionForm.elements. namedItem("date") as HTMLInputElement).value,
      exercises: [],
    };

    sessionForm.reset();
    logForm.querySelectorAll("input, button").forEach(el => (el as HTMLInputElement | HTMLButtonElement).disabled = false);
    renderCurrentExercises();
  })

  logForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      logForm.requestSubmit();
    }
  });

  logForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!currentSession) return; // skydd mot att lägga till övningar när ingen "session" är startad

    const newExercise = {
      _id: Date.now(), 
      övning: (logForm.exercise as HTMLInputElement).value,
      set: Number((logForm.set as HTMLInputElement).value),
      reps: Number((logForm.reps as HTMLInputElement).value),
      vikt: Number((logForm.weight as HTMLInputElement).value),
      kommentar: (logForm.comment as HTMLInputElement).value,
    };

    if (currentEditId) { // Om currentEdit finns -> uppdatera rätt övning annars -> ny
      currentSession.exercises = currentSession.exercises.map(ex =>
        ex._id === currentEditId ? { ...ex, ...newExercise } : ex
      );
      currentEditId = null;
    } else {
      currentSession.exercises.push(newExercise);
    }

    renderCurrentExercises();
    logForm.reset();
  });

  const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
  saveBtn.addEventListener("click", async () => {
    if (!currentSession || currentSession.exercises.length === 0) {
      alert("Inga övningar att spara! Lägg till minst en övning först.");
      return;
    }
        
    try {
      const res = await fetch("http://localhost:3000/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSession),
      });
      const data = await res.json();

      currentSession._id = data.exercise._id;
      logData.push(data.exercise);

      alert("Passet sparat!");
      currentSession = null;
      
      logForm.querySelectorAll("input, button").forEach(el => (el as HTMLInputElement | HTMLButtonElement).disabled = true);
      renderCurrentExercises();
      renderLogList();
    } catch (error) {
      console.error("Kunde inte spara pass:", error);
   
    }
  });

  async function fetchExercises(): Promise<void> {
    try {
      const res = await fetch("http://localhost:3000/exercises");
      if (res.ok) {
        logData = await res.json() as Session[];
        renderLogList();
      }
    } catch (error) {
      console.error("Kunde inte hämta övningar:", error);
    }
    // Hämtar historiken via getExercises i api.js -> backend GET
  }

  function renderCurrentExercises():void {
    const sessionInfoDiv = document.getElementById("current-session-info");
    const ul = document.getElementById("current-exercises-list");
    if(!ul) return;
    ul.innerHTML = "";

    if (!currentSession) {
      if(sessionInfoDiv) sessionInfoDiv.textContent = "";
      return;
    }

    if(sessionInfoDiv) sessionInfoDiv.textContent = `${currentSession.split} - ${currentSession.date}`;

    currentSession.exercises.forEach((exercise) => {
      const li = document.createElement("li");
      li.textContent = `${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${exercise.kommentar ? ": " + exercise.kommentar : ""}`;

      const actions = document.createElement("div");
      actions.classList.add("log-actions");

      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editBtn.addEventListener("click", () => {
        currentEditId = exercise._id;
        (logForm.elements.namedItem('exercise') as HTMLInputElement).value = exercise.övning;
        (logForm.elements.namedItem('set') as HTMLInputElement).value =String(exercise.set);
        (logForm.elements.namedItem('reps') as HTMLInputElement).value = String(exercise.reps);
        (logForm.elements.namedItem('weight') as HTMLInputElement).value = String(exercise.vikt);
        (logForm.elements.namedItem('comment') as HTMLInputElement).value = exercise.kommentar || "";
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.addEventListener("click", () => {
       if(currentSession){
        currentSession.exercises = currentSession.exercises.filter(ex => ex._id !== exercise._id);
        renderCurrentExercises();
      }});

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn); // Lägger till knapparna i actions-behållaren 
      li.appendChild(actions); // action behållaren i list-el
      ul.appendChild(li);
    });
  }

  function renderLogList(): void { // historik över tidigare sparade pass 
    if (!logList) return;

    logList.innerHTML = "";

    logData.forEach((session) => {
      session.exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = `${session.date || "okänt datum"} - ${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${exercise.kommentar ? ": " + exercise.kommentar : ""}`;

        const actions = document.createElement("div");
        actions.classList.add("log-actions");

        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.addEventListener("click", () => {
          (logForm.elements.namedItem("exercise") as HTMLInputElement).value = exercise.övning;
          (logForm.elements.namedItem("set") as HTMLInputElement).value = String(exercise.set);
          (logForm.elements.namedItem("reps") as HTMLInputElement).value = String(exercise.reps);
          (logForm.elements.namedItem("weight") as HTMLInputElement).value = String(exercise.vikt);
          (logForm.elements.namedItem("comment") as HTMLInputElement).value = exercise.kommentar || "";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener("click", async () => {
          try {
            await fetch(`http://localhost:3000/exercises/${exercise._id}`, { method: "DELETE" });
            logData = logData.filter(s => s._id !== session._id);
            renderLogList();
          } catch (err) {
            console.error("Kunde inte radera övning:", err);
          }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);
        logList.appendChild(li);
      });
    });
  }
}
