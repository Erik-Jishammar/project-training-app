import { navigateTo } from "./app.js";
import { initLogController } from "./controllers-f/logController.js";

navigateTo("log"); // rendera startsidan


// Navigation-knappar
document.querySelectorAll<HTMLButtonElement>(".nav-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll<HTMLButtonElement>(".nav-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const view = btn.dataset.view;
    if(view){
      navigateTo(view);
    }
    
  });
});

// entry point för vite, se till att appen körs i browser
