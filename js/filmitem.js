const details = document.querySelector(".filmDetail-container");
var id = document.getElementById("temp").getAttribute("data-name");
const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
const apiDetailFilm = `https://api.themoviedb.org/3/movie/${id}}?api_key=${key_api}&language=vi`;
const apiTrendFilm = `https://api.themoviedb.org/3/trending/all/day?api_key=${key_api}&language=vi`;
const apiTrailerFilm = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key_api}&language=en`;
const img = (poster_path) => `https://image.tmdb.org/t/p/w500/${poster_path}`;
const getTrendFilm = (callback) => {
  fetch(apiTrendFilm)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const getFilmDetail = (callback) => {
  fetch(apiDetailFilm)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};

const getTrailer = (callback) => {
  fetch(apiTrailerFilm)
    .then((response) => {
      return response.json();
    })
    .then(callback);
};
var stopVideo = () => {
  var iframe = document.querySelector("iframe");
  var video = document.querySelector("video");
  if (iframe) {
    // var iframeSrc = iframe.src;
    // iframe.src = iframeSrc;
  }
  if (video) {
    video.pause();
  }
};
// const modalTrailers = () => {
//   var modal = document.getElementById("myModal");
//   var btnTrailer = document.querySelector(".button--trailer");
//   var btnClose = document.querySelector(".close");
//   btnTrailer.addEventListener("click", function (e) {
//     modal.style.display = "block";
//   });
//   btnClose.addEventListener("click", function (e) {
//     modal.style.display = "none";

//     stopVideo();
//   });
//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//       stopVideo();
//     }
//   };
// };
const detailsFilm = () => {
  getFilmDetail((data) => {
    console.log(data);
    details.innerHTML = `
      <div class="filmDetail-image">
        <img src="https://image.tmdb.org/t/p/w300/${data.poster_path}"></img>
      </div>
      <div class="filmDetail-infor">
          <h2 class="filmDetail-name">
            ${data.title}
          </h2>
          <h4 class="filmDetail-originalName">
          ${data.original_title} (${data.release_date.slice(0, 4)})
          </h4>
          <h4 class="filmDetail-status">Trạng thái: <span>${
            data.video === false ? "Sắp ra mắt" : "Đang diễn ra"
          }</span></h4>
          <h4 class="filmDetail-genres">
            Thể loại:
              <span >
              ${data.genres.map((item) => " " + item.name.slice(5) + " ")}
              </span>
          </h4>
          <h4 class="filmDetail-productioncountry">
            Nước sản xuất:
           <span> ${data.production_countries[0].name}</span>
          </h4>
          <h4 class="filmDetail-date">
            Năm sản xuất:
            <span>${data.release_date.slice(0, 4)}</span>
          </h4>
          <h4 class="filmDetail-vote">
          Điểm:
           <span> ${data.vote_average}/10</span>
          </h4>
          <h4 class="filmDetail-votecount">
          Số lượt đánh giá:
            <span>  ${data.vote_count} </span>
          </h4>
          <h4 class="filmDetail-review"> Nội dung phim:
            <span>${data.overview}</span>
          </h4>
      </div>
      <div class="filmDetail-button">
      <div class="filmDetail-trailer">
      <div class="button button--trailer">
          Trailer
          </div>
      <div id="myModal" class="modal-trailer">
         <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
         </div>
      </div>
      </div>
      <div class="filmDetail-play button ${!data.video ? "disabled" : ""}">
        Xem phim
      </div>
      </div>
      `;
    trailerFilm();

    var modal = document.getElementById("myModal");
    var btnTrailer = document.querySelector(".button--trailer");
    var btnClose = document.querySelector(".close");
    btnTrailer.addEventListener("click", function (e) {
      modal.style.display = "block";
    });
    btnClose.addEventListener("click", function (e) {
      modal.style.display = "none";

      stopVideo();
    });
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        stopVideo();
      }
    };
  });
};

const trailerFilm = () => {
  getTrailer((data) => {
    console.log(data);
    const modalTrailer = document.querySelector(".modal-content");
    const div = document.createElement("div");
    div.setAttribute("class", "filmDetail-showTrailer");
    div.innerHTML = `
     <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${data.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     `;
    modalTrailer.appendChild(div);
  });
};

detailsFilm();

// modalTrailers();

// fetch(
//   `https://api.themoviedb.org/3/movie/${id}}?api_key=${key_api}&language=vi`
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => detailsFilm(data, id));

// var trailerdata =[] ;
// fetch(
//   `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key_api}&language=en`
// )
//   .then((response) => {
//     return response.json();
//   })

//   .then((data) => setTimeout(showTrailer(data), 5000));

// const detailsFilm = (data, id) => {
//   console.log(data);

//   details.innerHTML = `
//       <div class="filmDetail-image">
//         <img src="https://image.tmdb.org/t/p/w300/${data.poster_path}"></img>
//       </div>
//       <div class="filmDetail-infor">
//           <h2 class="filmDetail-name">
//             ${data.title}
//           </h2>
//           <h4 class="filmDetail-originalName">
//           ${data.original_title} (${data.release_date.slice(0, 4)})
//           </h4>
//           <h4 class="filmDetail-status">Trạng thái: <span>${
//             data.video === false ? "Sắp ra mắt" : "Đang diễn ra"
//           }</span></h4>
//           <h4 class="filmDetail-genres">
//             Thể loại:
//               <span >
//               ${data.genres.map((item) => " " + item.name.slice(5) + " ")}
//               </span>
//           </h4>
//           <h4 class="filmDetail-productioncountry">
//             Nước sản xuất:
//            <span> ${data.production_countries[0].name}</span>
//           </h4>
//           <h4 class="filmDetail-date">
//             Năm sản xuất:
//             <span>${data.release_date.slice(0, 4)}</span>
//           </h4>
//           <h4 class="filmDetail-vote">
//           Điểm:
//            <span> ${data.vote_average}/10</span>
//           </h4>
//           <h4 class="filmDetail-votecount">
//           Số lượt đánh giá:
//             <span>  ${data.vote_count} </span>
//           </h4>
//           <h4 class="filmDetail-review"> Nội dung phim:
//             <span>${data.overview}</span>
//           </h4>
//       </div>
//       <div class="filmDetail-button">
//       <div class="filmDetail-trailer">
//       <div class="button button--trailer">
//           Trailer
//           </div>
//       <div id="myModal" class="modal-trailer">
//          <!-- Modal content -->
//           <div class="modal-content">
//             <span class="close">&times;</span>
//          </div>
//       </div>
//       </div>
//       <div class="filmDetail-play button ${!data.video ? "disabled" : ""}">
//         Xem phim
//       </div>
//       </div>
//       `;
//   // Dung video
//
//   var modal = document.getElementById("myModal");
//   var btnTrailer = document.querySelector(".button--trailer");
//   var btnClose = document.querySelector(".close");
//   btnTrailer.addEventListener("click", function (e) {
//     modal.style.display = "block";
//   });
//   btnClose.addEventListener("click", function (e) {
//     modal.style.display = "none";

//     stopVideo();
//   });
//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//       stopVideo();
//     }
//   };
// };

// const showTrailer = (data) => {
//   console.log(data.results[0].key);
//   const modalTrailer = document.querySelector(".modal-content");
//   const div = document.createElement("div");
//   div.setAttribute("class", "filmDetail-showTrailer");
//   div.innerHTML = `
//  <iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//  `;
//   modalTrailer.appendChild(div);
// };
