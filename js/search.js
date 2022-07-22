const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
const page = ["1", "2", "3"];
var filmId = "";
const key_search = new URL(window.location.href).searchParams.get("search");
const urlFilm = (page) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${key_api}&language=vi&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
const img = (poster_path) => `https://image.tmdb.org/t/p/w300${poster_path}`;
const urlSearch = encodeURI(
  `https://api.themoviedb.org/3/search/movie?api_key=${key_api}&language=vi&query=${key_search}&page=1&include_adult=false`
);
const apiDetailFilm = (id) =>
  `https://api.themoviedb.org/3/movie/${id}}?api_key=${key_api}&language=vi`;
const getSearch = (callback) => {
  fetch(urlSearch)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const getFilm = (callback) => {
  page.map((index) => {
    fetch(urlFilm(index))
      .then((response) => {
        return response.json();
      })
      .then(callback);
  });
};
function displayShowSearch() {
  if (key_search) {
    getSearch((data) => {
      data = data.results;
      viewFilm(data);
    });
  } else {
    getFilm((data) => {
      console.log(data);
      viewFilm(data.results);
    });
  }
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
    
        <a href="film.html?id=${data[i].id}">
            <div class="filmStore-image">
              <img src=${img(data[i].poster_path)}></img>
            </div>
            <div class="filmStore-info">        
                <h2 class="filmStore-name">${data[i].title}</h2>     
                <h5 class="filmStore-release"> ${formatDate(
                  data[i].release_date
                )}</h5>      
                <h4 class="filmStore-review">
                  ${data[i].overview}
                </h4>
             </div>
         </a>`;
  }
};

displayShowSearch();
