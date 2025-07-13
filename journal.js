function renderNavbar() {
  const currentPath = window.location.pathname;

  const nav = document.createElement("nav");
  nav.className = "bg-gray-900 text-white px-6 py-4 shadow";

  const container = document.createElement("div");
  container.className = "flex justify-between items-center max-w-5xl mx-auto";

  const logo = document.createElement("span");
  logo.textContent = "Movie Diary";
  logo.className = "text-2xl font-bold tracking-wide";

  const button = document.createElement("button");
  button.className =
    "bg-white text-gray-900 font-medium px-4 py-2 rounded hover:bg-gray-200 transition";

  if (currentPath.endsWith("index.html") || currentPath === "/") {
    button.textContent = "Favorite";
    button.addEventListener("click", () => {
      window.location.href = "journal.html";
    });
  } else if (currentPath.endsWith("journal.html")) {
    button.textContent = "Home";
    button.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  container.appendChild(logo);
  container.appendChild(button);
  nav.appendChild(container);

  document.body.prepend(nav);
}

renderNavbar();
