const details = document.querySelector(".filmDetail-container");
var id = document.getElementById("temp").getAttribute("data-name");
fetch(
  `https://api.themoviedb.org/3/movie/${id}}?api_key=d8f8edbbdc27ab9a16942772f29aa16c&language=vi`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => detailsFilm(data, id));

// fetch("../../data/film.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => detailsFilm(data, id));
const detailsFilm = (data, id) => {
  console.log(data);

  details.innerHTML = `
      <div class="filmDetail-image">
        <img src="https://image.tmdb.org/t/p/w300/${data.poster_path}"></img>
      </div>    
      <div class="filmDetail-infor"> 
          <h2 className="filmDetail-name">
            ${data.title}
          </h2>
          <h4 className="filmDetail-originalName">
          ${data.original_title} (${data.release_date.slice(0, 4)})
          </h4>
      </div>
      `;
};
