
const apiFilm = "./data/film.json";
const img = (poster_path) => `https://image.tmdb.org/t/p/w500/${poster_path}`;
var filmItem = document.querySelector(".film-list");

const getFilm = (callback) => {
  fetch(apiFilm)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const displayFilm = () => {
  getFilm((data) => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var div = document.createElement("div");
      div.setAttribute("class", "film-item");
      div.setAttribute("id", `${data[i].id}`);

      filmItem.appendChild(div);
      console.log(`film?id=${data[i].id}`);
      div.innerHTML = `<img src=${img(data[i].poster_path)}></img>
                      <div class="info">
                          <a href="film/${data[i].id}">
                              <h2 class="filmUpdate-name">${data[i].title}</h2>
                          </a>

                      </div>`;
    }
  });
};

const displayFilmHot = () => {
  const filmHotList = document.querySelector(".filmHot-list");
  getFilm((data) => {
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement("li");
      li.setAttribute("class", "filmHot-item");
      filmHotList.appendChild(li);
      li.innerHTML = `
       <a href="film/${data[i].id}">
          <div class="filmHot-image">
          <img src=${img(data[i].poster_path)}></img>
          </div>
          <div class="filmHot-name">${data[i].title}</div>
       </a>
    
       `;
    }
    slickSlide();
  });
};

const slickSlide = () => {
  $(".filmHot-list").slick({
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplaySpeed: 1000,
    prevArrow:
      '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow:
      '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
};
displayFilmHot();
displayFilm();
