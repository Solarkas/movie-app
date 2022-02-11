const divContainer = document.querySelector(".main");
const key = "eef50af7cd4e3e2be0f83c50db9c5e6b";
const filmUrl = "https://image.tmdb.org/t/p/w1280";
const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}&page=10`;
let value = "";
const form = document.querySelector(".form");
document.querySelector(".search").select();

async function getData(url) {
  const res = await fetch(url);
  const { results } = await res.json();

  results.map((film) => {
    const img = document.createElement("img"),
      divMovie = document.createElement("div"),
      divMovieInfo = document.createElement("div"),
      h3Title = document.createElement("h3"),
      span = document.createElement("span"),
      divOverview = document.createElement("div"),
      h3Overview = document.createElement("h3"),
      pOverview = document.createElement("p");
    divMovie.className = "movie";
    divMovieInfo.className = "movie-info";
    h3Title.innerHTML = film.title;
    span.className = "green";
    if (film.vote_average > 6.5) {
      span.className = "green";
    } else if (film.vote_average < 4) {
      span.className = "red";
    } else {
      span.className = "orange";
    }
    span.innerHTML = film.vote_average;
    divMovieInfo.append(h3Title, span);
    divOverview.className = "overview";
    h3Overview.innerHTML = "Overview";
    pOverview.innerHTML = film.overview;
    divOverview.append(h3Overview, pOverview);
    img.src = filmUrl + film.poster_path;
    img.alt = film.title;

    divMovie.append(img, divMovieInfo, divOverview);
    divContainer.append(divMovie);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("ok");
  value = document.querySelector(".search").value;
  const newUrl = `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${key}`;
  divContainer.innerHTML = "";
  getData(newUrl);
});

getData(url);
