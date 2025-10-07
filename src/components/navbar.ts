import { navigateTo } from "../app";

export function renderNavbar():void {
    const nav = document.getElementById("navbar") as HTMLElement;  
    nav.innerHTML = `
      <ul class="navbar">
        <li><button class="nav-button" data-view="log"><i class="fa-solid fa-dumbbell"></i> Träningslogg</button></li>
        <li><button class="nav-button" data-view="history"><i class="fa-solid fa-chart-line"></i> Historik</button></li>
        <li><button class="nav-button" data-view="profile"><i class="fa-solid fa-user"></i> Profil</button></li>
        <li><button class="nav-button" data-view="generator"><i class="fa-solid fa-plus"></i> Passgenerator</button></li>
      </ul>
    `;
  

    nav.querySelectorAll<HTMLButtonElement>(".nav-button").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll<HTMLButtonElement>(".nav-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const view = btn.dataset.view;
        if(view){
          navigateTo(view)
        }
        
      });
    });
  }