import { initLogController } from "../controllers/logController.js";

export function renderLogPage(container) {
  container.innerHTML = `
    <div class="main-container">
    <section id="form-section" class="card">
      <h2>Lägg till träningspass</h2>
      <form id="log-form" method="post">
        <label for="date">Datum</label>
        <input type="date" id="date" name="date" required />

        <label for="övning">Övning</label>
        <input type="text" id="exercise" name="exercise" required />

        <div class="form-row">
          <div class="form-group">
            <label for="set">Set</label>
            <input type="number" id="set" name="set" min="1" max="20" required />
          </div>

          <div class="form-group">
            <label for="reps">Reps</label>
            <input type="number" id="reps" name="reps" min="1" max="100" required />
          </div>

          <div class="form-group">
            <label for="vikt">Vikt (kg)</label>
            <input type="number" id="weight" name="weight" min="0" step="0.5" />
          </div>
        </div>

        <label for="kommentar">Kommentar</label>
        <textarea id="comment" name="comment"></textarea>

        <button type="submit">Lägg till</button>
      </form>
    </section>

    <section id="log-section" class="card">
      <h2>Träningslogg</h2>
      <ul id="log-list"></ul>
    </section>
  </div>
`;

  const form = document.getElementById("log-form");
  const logList = document.getElementById("log-list");
  initLogController(form, logList);
}