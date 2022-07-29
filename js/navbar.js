const navbar = () => {
  const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
  const apiTvGener = (category) =>
    `https://api.themoviedb.org/3/genre/${category}/list?api_key=${api_key}&language=vi`;

  const getGenres = async (category) => {
    const respon = await fetch(apiTvGener(category));
    const data = await respon.json();
    data.genres.map((genres, index) => {
      console.log(
        genres.name.slice(0, 12) == "Chương Trình"
          ? "CT " + genres.name.slice(13)
          : genres.name
      );
      let navGenres = document.querySelector(
        `.header-nav-genres--${category}_list`
      );
      console.log(genres);
      let item = document.createElement("li");
      item.setAttribute("class", `header-nav-genres--${category}_item`);
      item.innerHTML = `
        <a href="#">
            ${
              genres.name.slice(0, 12) == "Chương Trình"
                ? "CT " + genres.name.slice(13)
                : genres.name.length > 18
                ? genres.name.slice(5)
                : genres.name
            }
         
        </a>
    `;
      navGenres.appendChild(item);
    });
  };
  getGenres("movie");
  getGenres("tv");
};

document.addEventListener("DOMContentLoaded", navbar);
const temp ="https://api.themoviedb.org/3/discover/movie?api_key=d8f8edbbdc27ab9a16942772f29aa16c&language=vi&sort_by=popularity.desc&page=1&with_original_language=cn"