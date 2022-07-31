const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
const page = ["1", "2", "3"];
var filmId = "";
const url_search = new URL(window.location.href).searchParams.get("search");
const url_country = new URL(window.location.href).searchParams.get("country");
const url_category = new URL(window.location.href).searchParams.get("category");
const key_genres = new URL(window.location.href).searchParams.get("genres");
const key_release = new URL(window.location.href).searchParams.get("release");
const url_sort = new URL(window.location.href).searchParams.get("sort");
const key_sort = url_sort ? url_sort.toLowerCase() : "popularity.desc";
const key_search = url_search ? url_search : "";
const key_category = url_category ? url_category : "movie";
const key_country = url_country ? url_country : "en";
const apiTvGener = `https://api.themoviedb.org/3/genre/${key_category}/list?api_key=${key_api}&language=en`;
const idGenres = key_genres
  ? key_genres.slice(key_genres.length - 2, key_genres.length)
  : null;
const iso = key_country
  ? key_country.slice(key_country.length - 2, key_country.length)
  : null;
const func = new URL(window.location.href).searchParams.get("search")
  ? "search"
  : "discover";
const img = (poster_path) => `https://image.tmdb.org/t/p/w300${poster_path}`;

const urlFilms = `https://api.themoviedb.org/3/${func}/${key_category}?api_key=${key_api}&with_genres=${idGenres}&language=vi&sort_by=${key_sort}&page=1&primary_release_year=${key_release}&with_original_language=${iso}&query=${key_search}&include_adult=false`;

const getFilm = (callback) => {
  console.l
  fetch(urlFilms)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const displayShowSearch = async () => {
  console.log(urlFilms)
  const respon = await fetch(urlFilms);
  const data = await respon.json();
  viewFilm(data.results);
};
const formatDate = (date) => {
  if (date) {
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    const day = date.slice(8);
    return day + "-" + month + "-" + year;
  }
  return "Chưa cập nhập";
};
const viewFilm = (data) => {
  var filmItem = document.querySelector(".filmStore-list");
  for (var i = 0; i < data.length; i++) {
    filmId = `${data[i].id}`;
    var div = document.createElement("div");
    div.setAttribute("class", "filmStore-item");
    div.setAttribute("id", `${data[i].id}`);

    filmItem.appendChild(div);

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
const getGenres = async () => {
  const respon = await fetch(apiTvGener);
  const data = await respon.json();
  const tabGenres = document.querySelector(".filmSort-genres-list");
  data.genres.map((genres, index) => {
    let item = document.createElement("li");
    item.setAttribute("class", `filmSort-genres--${key_category}--item`);
    item.innerHTML = `
    <a href="kho-phim.html?category=${key_category}&genres=${genres.name}-${
      genres.id
    }">
        #${
          genres.name.slice(0, 12) == "Chương Trình"
            ? "CT " + genres.name.slice(13)
            : genres.name.length > 18
            ? genres.name.slice(5)
            : genres.name
        }
     
    </a>
`;
    tabGenres.appendChild(item);
  });
};
displayShowSearch();
getGenres();
