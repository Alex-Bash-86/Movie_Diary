let allMovies = [];
let currentIndex = 0;
const moviesPerPage = 6;

const heading = document.createElement('h2');
heading.className = 'text-2xl font-bold mb-4';
heading.textContent = 'Popular Movies';

const moviesContainer = document.createElement('div');
moviesContainer.id = 'movies-container';
moviesContainer.className =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6';

const loadButton = document.createElement('button');
loadButton.textContent = 'Load more...';
loadButton.className =
  'mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600';

loadButton.addEventListener('click', () => {
  renderNextMovies();
});

const main = document.querySelector('main');
main.className = 'p-10';
main.appendChild(heading);
main.appendChild(moviesContainer);
main.appendChild(loadButton);

const fetchPopularMovies = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjRlYjkxY2YxOWYwYjhlMWEyZDhkMmY0NWI2N2MyZiIsIm5iZiI6MTc1MjA2MzEyMy4wMDcsInN1YiI6IjY4NmU1YzkzZjNkODA1MDU2MDUxZWIwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZkiK_RSBrSOpikqDnUMdYQ8crMU53z4htqMsW_wBGc4',
      },
    });
    const data = await response.json();
    allMovies = data.results;
    renderNextMovies();
  } catch (error) {
    console.log(error);
  }
};

fetchPopularMovies();

function renderNextMovies() {
  const nextMovies = allMovies.slice(
    currentIndex,
    currentIndex + moviesPerPage
  );
  renderMovies(nextMovies);
  currentIndex += moviesPerPage;

  if (currentIndex >= allMovies.length) {
    loadButton.style.display = 'none';
  }
}

function renderMovies(movies) {
  const container = document.getElementById('movies-container');

  movies.forEach((movie) => {
    if (!movie.poster_path) return;

    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-md overflow-hidden';

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto">
      <div class="p-4">
        <h2 class="text-xl font-semibold">${movie.title}</h2>
        <p class="text-gray-600 text-sm">Rating: ${movie.vote_average}</p>
        <p class="text-gray-500 text-sm">${movie.release_date}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
