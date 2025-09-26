import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

import { renderLogPage } from "./pages/logPage.js";
import { renderTrainingHistoryPage } from "./pages/TrainingHistoryPage.js";
import { renderPassGeneratorPage } from "./pages/passGeneratorPage.js";
import { renderProfilePage } from "./pages/profilePage.js";

renderNavbar();
renderFooter();

const views = {
    log: renderLogPage, 
    history: renderTrainingHistoryPage, 
    generator: renderPassGeneratorPage, 
    profile: renderProfilePage,
}
export function navigateTo(page){
    const app = document.getElementById("app"); 
    app.innerHTML ="";

    const render = views[page];

    if(render){
        render(app)
    } else {
        app.innerHTML = "<h2> Sidan hittades inte </h2>";
    }

}
// binda ihop frontenddelarna -> projektets "ingång" se till att appen laddas in korrekt
