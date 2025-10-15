import { BASE_URL } from "../utilities/api.js";
import type { Exercise, Session } from "../models/types.js";

export function initHistoryController(container: HTMLElement) {

  // Hämta alla sessions
  async function fetchSessions(): Promise<Session[]> {
    try {
      const res = await fetch(`${BASE_URL}/exercises`);
      if (!res.ok) throw new Error("Kunde inte hämta träningspass");
      return await res.json();
    } catch (error) {
      console.error("Fel vid hämtning av passen", error);
      return [];
    }
  }

  // Ta bort session
  async function deleteSession(id: string): Promise<void> {
    if (!confirm("Är du säker på att du vill ta bort detta pass?")) return;

    try {
      const res = await fetch(`${BASE_URL}/exercises/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Passet har raderats.");
         await renderSessions(); // uppdatera listan
      } else {
        alert("Kunde inte ta bort passet.");
      }
    } catch (error) {
      console.error("Fel vid borttagning av pass:", error);
    }
  }

  // Rendera alla sessions
  async function renderSessions(): Promise<void> {
    const sessions = await fetchSessions();
    container.innerHTML = "";

    if (sessions.length === 0) {
      container.textContent = "Inga sparade pass ännu";
      return;
    }

    sessions.reverse().forEach((session) => {
      const historyCard = document.createElement("div");
      historyCard.classList.add("history-card");

      const header = document.createElement("div");
      header.classList.add("history-header");

      const title = document.createElement("h3");
      title.textContent = `${session.split} - ${session.date}`;

      const deleteSessionButton = document.createElement("button");
      deleteSessionButton.classList.add("delete-session-btn");
      deleteSessionButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteSessionButton.addEventListener("click", () => {
        if (session._id) deleteSession(session._id);
      });

      header.appendChild(title);
      header.appendChild(deleteSessionButton);
      historyCard.appendChild(header);

      const ul = document.createElement("ul");
      session.exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = `${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${
          exercise.kommentar ? ": " + exercise.kommentar : ""
        }`;
        ul.appendChild(li);
      });
      historyCard.appendChild(ul);

      container.appendChild(historyCard);
    });
  }
  renderSessions();
}