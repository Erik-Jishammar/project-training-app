export function initLogController(form, logList) {
    let logData = []; // array för loggade övningar
    let currentEditId = null;
  
    // Hämta alla övningar från servern när sidan laddas
    fetchExercises();
  
    // Hindra Enter från att submit direkt
    form.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        form.requestSubmit();
      }
    });
  
    // Submit för formulär
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const newExercise = {
        ID: Date.now(),
        datum: form.date.value,
        övning: form.exercise.value,
        set: form.set.value,
        reps: form.reps.value,
        vikt: form.weight.value,
        kommentar: form.comment.value,
      };
  
      if (currentEditId) {
        await updateExercise(currentEditId, newExercise);
      } else {
        await createExercise(newExercise);
      }
  
      renderLogList();
      form.reset();
      currentEditId = null;
    });
  
    
    async function fetchExercises() {
      try {
        const res = await fetch("http://localhost:3000/exercises");
        if (res.ok) {
          logData = await res.json();
          renderLogList();
        }
      } catch (error) {
        console.error("Kunde inte hämta övningar:", error);
      }
    }
  
    async function createExercise(exercise) {
      try {
        const res = await fetch("http://localhost:3000/form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exercise),
        });
        const data = await res.json();
        logData.push(data.exercise || data);
        console.log("Nytt pass sparat:", data);
      } catch (error) {
        console.error("Kunde inte spara övning:", error);
      }
    }
  
    async function updateExercise(id, updatedExercise) {
      try {
        const res = await fetch(`http://localhost:3000/exercises/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedExercise),
        });
        await res.json();
  
        // Uppdatera lokalt logData
        logData = logData.map((ex) =>
          ex.ID === id ? { ...ex, ...updatedExercise } : ex
        );
  
        console.log("Övning uppdaterad");
      } catch (error) {
        console.error("Kunde inte uppdatera övning:", error);
      }
    }
  
    async function deleteExercise(id) {
      try {
        await fetch(`http://localhost:3000/exercises/${id}`, { method: "DELETE" });
        logData = logData.filter((ex) => ex.ID !== id);
        console.log("Övning raderad:", id);
      } catch (error) {
        console.error("Kunde inte radera övning:", error);
      }
    }
  
    function renderLogList() {
      logList.innerHTML = "";
      logData.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = `${exercise.datum} - ${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${exercise.kommentar ? ": " + exercise.kommentar : ""}`;
        
        const actions =  document.createElement("div"); 
        actions.classList.add("log-actions"); 

        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.addEventListener("click", () => {
          currentEditId = exercise.ID;
          form.date.value = exercise.datum;
          form.exercise.value = exercise.övning;
          form.set.value = exercise.set;
          form.reps.value = exercise.reps;
          form.weight.value = exercise.vikt;
          form.comment.value = exercise.kommentar || "";
        });
  
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener("click", () => deleteExercise(exercise.ID).then(renderLogList));
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        li.appendChild(actions);
        logList.appendChild(li);
      });
    }
  }