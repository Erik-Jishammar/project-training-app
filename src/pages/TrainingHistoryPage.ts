import { initHistoryController } from "../controllers-f/historyController.js";

export function renderTrainingHistoryPage(container: HTMLElement):void  {
    container.innerHTML = `
      <div class = "main-container">
      <h2> Historik</h2>
      <div id="history-container"></div>
      </div>
    `;

    const historyContainer = document.getElementById('history-container') as HTMLElement | null;
      if (historyContainer) {
        initHistoryController(historyContainer); 
      }
  }