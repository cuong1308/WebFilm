var id = new URL(window.location.href).searchParams.get("id");
const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
const detailTv = `https://api.themoviedb.org/3/tv/${id}?api_key=d8f8edbbdc27ab9a16942772f29aa16c&language=vi`;
const urlTV = (sessionNumber) =>
  `https://api.themoviedb.org/3/tv/${id}/season/${sessionNumber}?api_key=${api_key}&language=vi`;
const img300 = (poster_path) =>
  `https://image.tmdb.org/t/p/w300/${poster_path}`;
const img = (poster_path) =>
  `https://image.tmdb.org/t/p/original/${poster_path}`;
const image = ``;

var sessionNumber = "";
async function getSeasons() {
  const respon = await fetch(detailTv);
  const data = await respon.json();
  console.log(data);
  const seasonsNew = data.seasons[data.seasons.length - 1];
  const seasonNumber = data.seasons.length ;
  var tvHeader = document.querySelector(".tvSeason-header");

  tvHeader.innerHTML = `
        <div class="tvSeason-bg" style="background-image: url(${img(
          data.backdrop_path
        )})"> 

            <div class="tvSeason-child" >
                 <div class="tvSeason-poster">
                        <img src=${img300(
                          seasonsNew.poster_path
                            ? seasonsNew.poster_path
                            : data.poster_path
                        )} alt="bg" />
                </div>
                <div class="tvSeason-infor">
                    <div class="tvSeason-name">
                        ${data.original_name} - ${seasonsNew.name}
                     </div>
                    <div class="tvSeason-overview">
                        ${
                          seasonsNew.overview
                            ? seasonsNew.overview
                            : data.overview
                        }
                    </div>
                    <div class="tvSeason-button">
                        <a href="">
                          Xem ngay
                        </a>
                    </div>
                </div>
            </div>
        </div>

    `;
    async function getSeasons() {
      console.log(seasonNumber)
      var tvMain = document.querySelector(".tvSeason-main");
      const respon = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${api_key}&language=vi`
      );
      const data = await respon.json();
      console.log(data);
    }
    getSeasons()
}

getSeasons();
