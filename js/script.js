const global = {
  currentPage: window.location.pathname,
};

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
    case 'index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTVShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('tv Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

async function fetchAPIData(endpoint) {
  const API_KEY = '0bc9de3e7dc77bc172b2b2b61ea07bbe';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

async function displayPopularTVShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((tvShow) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-details.html?id=${tvShow.id}">
    ${
      tvShow.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
      class="card-img-top"
      alt="${tvShow.name}"
    />`
        : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${tvShow.name}"
  />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${tvShow.name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${tvShow.first_air_date}</small>
    </p>
  </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
${
  movie.poster_path
    ? `<img
src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
class="card-img-top"
alt="${movie.title}"
/>`
    : `<img
src="images/no-image.jpg"
class="card-img-top"
alt="${movie.title}"
/>`
}
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
          `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}
