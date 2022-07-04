const details = document.querySelector(".filmDetail-container");
const key_api = "d8f8edbbdc27ab9a16942772f29aa16c";
var id = document.getElementById("temp").getAttribute("data-name");
fetch(
  `https://api.themoviedb.org/3/movie/${id}}?api_key=${key_api}&language=vi`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => detailsFilm(data, id));

// var trailerdata =[] ;
fetch(
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key_api}&language=en`
)
  .then((response) => {
    return response.json();
  })

  .then((data) => showTrailer(data));

const detailsFilm = (data, id) => {
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
            Thế loại: 
            ${data.genres.map((item) => item.name)}
          </h4>
          <h4 class="filmDetail-productioncountry">
            Nước sản xuất: 
            ${data.production_countries[0].name}
          </h4>
          <h4 class="filmDetail-originalName">
            Năm sản xuất:
            ${data.release_date.slice(0, 4)}
          </h4>
          <h4 class="filmDetail-vote">
          Điểm:
            ${data.vote_average}/10
          </h4>
          <h4 class="filmDetail-votecount">
          Số lượt đánh giá:
            ${data.vote_count} 
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
  // Dung video
  var stopVideo = function (e) {
    var iframe = document.querySelector("iframe");
    var video = document.querySelector("video");
    if (iframe) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if (video) {
      video.pause();
    }
  };
  var modal = document.getElementById("myModal");
  var btnTrailer = document.querySelector(".button--trailer");
  var btnClose = document.querySelector(".close");
  var video = document.querySelector(".html5-main-video");
  console.log(video);
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
};

const showTrailer = (data) => {
  console.log(data.results[0].key);
  const modalTrailer = document.querySelector(".modal-content");
  const div = document.createElement("div");
  div.setAttribute("class", "filmDetail-showTrailer");
  div.innerHTML = `
 <iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 `;
  modalTrailer.appendChild(div);
};
