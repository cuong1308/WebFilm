const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
const page = ["1", "2", "3"];
var filmId = "";
const key_search = new URL(window.location.href).searchParams.get("search");
const key_country = new URL(window.location.href).searchParams.get("country");
const key_category = new URL(window.location.href).searchParams.get("category");
const key_genres = new URL(window.location.href).searchParams.get("genres");
const idGenres = key_genres
  ? key_genres.slice(key_genres.length - 2, key_genres.length)
  : null;
const iso = key_country
  ? key_country.slice(key_country.length - 2, key_country.length)
  : null;

const tvFilm = `
https://api.themoviedb.org/3/discover/tv?api_key=${key_api}&language=vi&sort_by=popularity.desc`;
const urlFilm = `https://api.themoviedb.org/3/discover/movie?api_key=${key_api}&language=vi&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
const img = (poster_path) => `https://image.tmdb.org/t/p/w300${poster_path}`;
const urlSearch = encodeURI(
  `https://api.themoviedb.org/3/search/movie?api_key=${key_api}&language=vi&query=${key_search}&page=1&include_adult=false`
);
const countrySearch = encodeURI(
  `https://api.themoviedb.org/3/discover/movie?api_key=d8f8edbbdc27ab9a16942772f29aa16c&language=vi&sort_by=release_date.desc&page=1&with_original_language=${iso}`
);
const apiDetailFilm = (id) =>
  `https://api.themoviedb.org/3/movie/${id}}?api_key=${key_api}&language=vi`;
const searchTv = `https://api.themoviedb.org/3/search/tv?api_key=${key_api}&language=vi&page=1&query=${key_search}&include_adult=false`;

const filmGenres = (category) =>
  `https://api.themoviedb.org/3/discover/${category}?api_key=${key_api}&with_genres=${idGenres}&language=vi`;
const apiFilter = () => {
  if (key_category == "tv") {
    if (key_search) {
      return searchTv;
    }
    if (idGenres) {
      return filmGenres("tv");
    }
    return tvFilm;
  } else if (key_category == "movie") {
    if (key_search) {
      return urlSearch;
    }
    if (idGenres) {
      return filmGenres("movie");
    }
    return urlFilm;
  } else if (iso) {
    return countrySearch;
  } else if (key_search) {
    return urlSearch;
  }
  return urlFilm;
};

console.log(apiFilter());
const getSearch = (callback) => {
  fetch(apiFilter())
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const getFilm = (callback) => {
  fetch(apiFilter())
    .then((response) => {
      return response.json();
    })
    .then(callback);
};
function displayShowSearch() {
  // if (key_search) {
  getSearch((data) => {
    data = data.results;
    viewFilm(data);
  });
  // } else {
  getFilm((data) => {
    console.log(data);
    viewFilm(data.results);
  });
  // }
}
const formatDate = (date) => {
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);
  const day = date.slice(8);
  return day + "-" + month + "-" + year;
};
const viewFilm = (data) => {
  var filmItem = document.querySelector(".filmStore-list");
  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
    filmId = `${data[i].id}`;
    var div = document.createElement("div");
    div.setAttribute("class", "filmStore-item");
    div.setAttribute("id", `${data[i].id}`);

    filmItem.appendChild(div);
    console.log(`film?id=${data[i].id}`);

    div.innerHTML = `
    
        <a href="${
          key_category == "tv"
            ? `chi-tiet-tivi-shows.html?id=${data[i].id}`
            : `film.html?id=${data[i].id}`
        }">
            <div class="filmStore-image">
              <img src=${img(data[i].poster_path)}></img>
            </div>
            <div class="filmStore-info">        
                <h2 class="filmStore-name">${
                  data[i].title ? data[i].title : data[i].name
                }</h2>     
                <h5 class="filmStore-release"> ${formatDate(
                  data[i].release_date
                    ? data[i].release_date
                    : data[i].first_air_date
                )}</h5>      
                <h4 class="filmStore-review">
                  ${data[i].overview}
                </h4>
             </div>
         </a>`;
  }
};

displayShowSearch();
