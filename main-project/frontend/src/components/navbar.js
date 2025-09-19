export function renderNavbar() {
    const nav = document.getElementById("navbar");  
    nav.innerHTML = `
      <ul class="navbar">
        <li><button class="nav-button" data-view="log"><i class="fa-solid fa-dumbbell"></i> Träningslogg</button></li>
        <li><button class="nav-button" data-view="history"><i class="fa-solid fa-chart-line"></i> Statistik</button></li>
        <li><button class="nav-button" data-view="profile"><i class="fa-solid fa-user"></i> Profil</button></li>
        <li><button class="nav-button" data-view="generator"><i class="fa-solid fa-plus"></i> Skapa pass</button></li>
      </ul>
    `;
  
    // Eventlisteners
    nav.querySelectorAll(".nav-button").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        navigateTo(btn.dataset.view);
      });
    });
  }