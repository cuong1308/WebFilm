const watchInit = (e) => {
  const api_key = "d8f8edbbdc27ab9a16942772f29aa16c";
  const id = new URL(window.location.href).searchParams.get("id");
  const category = new URL(window.location.href).searchParams.get("category");
  const season = new URL(window.location.href).searchParams.get("season");
  const epi = new URL(window.location.href).searchParams.get("epi");
  const watchFrame = document.querySelector(".watch-iframe");
  const tvDetail = `
  https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${api_key}&language=vi`;
  const movieDetail = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=vi`;
  const watchTile = document.querySelector(".watch-infor");
  // const formatRuntime = (time) => {
  //   const h = Math.round(time / 60) ;
  //   if (h>0) {
  //     const m =time -60*h ;
  //     return h +"h" + m
  //   }
  // }
  const getTitle = async () => {
    const respon = await fetch(category == "movie" ? movieDetail : tvDetail);
    const data = await respon.json();
    console.log(data);
    watchTile.innerHTML = `
    
    <div class="watch-title">
    
    ${
      category == "movie"
        ? ` ${data.title}`
        : `
        ${data.episodes[epi - 1].name}
    `
    }
    
    </div>
    <div class="watch-runtime">
    Thời lượng: 
    ${
      category == "movie"
        ? ` ${data.runtime}`
        : `
        ${data.episodes[epi - 1].runtime}
    `
    }
    Phút
     
    </div>
   
    <div class="watch-overview">
    <span> Nội dung: </span>
    ${
      category == "movie"
        ? ` ${data.overview}`
        : `
        ${data.episodes[epi - 1].overview}
    `
    }
      
    </div>
    <div class="watch-vote_average">
    <span>Điểm đánh giá</span>
    ${
      category == "movie"
        ? ` ${data.vote_average}`
        : `
        ${data.episodes[epi - 1].vote_average}
    `
    }
     
    </div>
    <div class="watch-interac">
        <div class="bookmark">
          Bookmark
        </div>
        <div class="like"> Yêu thích </div>
    </div>

    `;

  };
  getTitle();
  watchFrame.innerHTML = `
    ${
      category == "movie"
        ? `
    <iframe id="ve-iframe" src="https://2embed.org/embed/${category}?tmdb=${id}" width="100%" height="600px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

    `
        : `<iframe src="https://2embed.org/embed/${
            category == "tv" ? "series" : ""
          }?tmdb=${id}&sea=${season}&epi=${epi}" width="600px" height="350px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>`
    }

    `;
};
document.addEventListener("DOMContentLoaded", watchInit());
