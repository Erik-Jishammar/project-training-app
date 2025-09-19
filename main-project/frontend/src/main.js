import { navigateTo } from "./app.js";
import { initLogController } from "./controllers/logController.js";

navigateTo("log"); // rendera startsidan


// Navigation-knappar
document.querySelectorAll(".nav-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    navigateTo(btn.dataset.view);
  });
});

