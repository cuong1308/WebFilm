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

const displayAccount = () => {
  var auth = document.querySelector(".header-auth");
  var authWork = document.querySelector(".header-auth-work");
  var account = document.querySelector(".header-account");
  var login = JSON.parse(localStorage.getItem("login"));
  console.log(account);
  if (login) {
    auth.style.display = "none";
    authWork.style.display = "block";

    const name = document.createElement("div");
    const dropdown = document.createElement("div");
    name.setAttribute("class", "header-name");
    dropdown.setAttribute("class", "header-dropdown");
    name.innerHTML = `
    <i class="fa-solid fa-user-tie"></i>
      ${login.fullname}
      <ul className="dropdown-menu">
      <li className="dropdown-item">
        Đăng xuất
      </li>
  </ul>
    `;
    // dropdown.innerHTML = `
    //   <ul className="dropdown-menu">
    //       <li className="dropdown-item">
    //         Đăng xuất
    //       </li>
    //   </ul>
    // `;
    account.appendChild(name);
    account.appendChild(dropdown);
    console.log(account);
  }
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

const logout = () => {
  const btnLogout = document.querySelector(".header-logout");
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("login");
    window.location.reload();
  });
};

displayFilmHot();
displayFilm();
displayAccount();
logout();
// backgroundLogin() ;
