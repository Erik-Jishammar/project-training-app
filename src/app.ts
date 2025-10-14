import { renderLogPage } from "./pages/logPage.js";
import { renderTrainingHistoryPage } from "./pages/TrainingHistoryPage.js";
import { renderPassGeneratorPage } from "./pages/passGeneratorPage.js";
import { renderProfilePage } from "./pages/profilePage.js";

const views: any = {
  log: renderLogPage,
  history: renderTrainingHistoryPage,
  generator: renderPassGeneratorPage,
  profile: renderProfilePage,
};

export function navigateTo(page: string) {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";
  const render = views[page as keyof typeof views];
  if (render) {
    render(app);
  } else {
    app.innerHTML = "<h2>Sidan hittades inte</h2>";
  }
}
// binda ihop frontenddelarna -> projektets "ingång" se till att appen laddas in korrekt
