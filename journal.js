import { renderNavbar } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  
  const container = document.querySelector('main');
  container.className = 'p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden';

    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" class="w-full h-auto">
      <div class="p-4">
        <h2 class="text-xl font-semibold">${movie.title}</h2>
        <p class="text-gray-600 text-sm">${movie.description}</p>
        <textarea class="mt-2 w-full border p-2 rounded note-area" rows="3" placeholder="Note...">${movie.note || ''}</textarea>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded save-note">Save note</button>
      </div>
    `;

    const noteArea = card.querySelector('.note-area');
    const saveButton = card.querySelector('.save-note');

    saveButton.addEventListener('click', () => {
      const updatedNote = noteArea.value;
      const updatedFavorites = favorites.map(f =>
        f.id === movie.id ? { ...f, note: updatedNote } : f
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert('Note saved successfully');
    });

    container.appendChild(card);
  });
});
