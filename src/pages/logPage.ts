import { initLogController } from "../controllers-f/logController.js";

export function renderLogPage(container: HTMLElement): void {
  container.innerHTML = `
    <div class="main-container">
    
      <!-- Vänstra kortet -->
      <section id="form-section" class="card">
        
        <form id="session-form">
          <label for="split">Split/fokus</label>
          <input type="text" id="split" name="split" class="session-input" required placeholder="ex Rygg/biceps /underkropp /helkropp" />
          
          <label for="date">Datum</label>
          <input type="date" id="date" name="date" class="session-input" required />
          <button type="submit" id="start-session-btn">Lägg till träningspass</button>
        </form>

        <form id="exercise-form" method="post">
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

          <button type="submit" id=exercise-form-btn >Lägg till övning</button>
        </form>
      </section>

      <!-- Högra kortet: träningsloggen -->
      <section id="log-section" class="card">
        <h2 id="log-title">Träningslogg</h2>
        <div id="current-session-info"></div>
        <ul id="current-exercises-list"></ul>
        <ul id="log-list"></ul>
        <div class="save-btn-wrapper">
        <button id="save-btn" class="save-btn">Spara pass</button>
        </div>
      </section>
    </div>
  `;

  const sessionForm = document.getElementById("session-form") as HTMLFormElement | null;
  const exerciseForm = document.getElementById("exercise-form") as HTMLFormElement | null;
  const logList = document.getElementById("log-list") as HTMLElement | null;

  if (sessionForm && exerciseForm && !(window as any)['logControllerInitialized']) {
    initLogController(sessionForm, exerciseForm, logList);
    (window as any)['logControllerInitialized'] = true;
  }
}