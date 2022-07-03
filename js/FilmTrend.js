fetch("https://api.themoviedb.org/3/trending/all/day?api_key=d8f8edbbdc27ab9a16942772f29aa16c&language=vi")
.then(response => response.json()) 
.then(trendData => showFilmTrend(trendData))


const showFilmTrend= (trendData) =>{
  trendData= trendData.results ;
  for(var i = 0 ; i<10 ; i++) {
    console.log(trendData[i].poster_path)
    const filmTrendList = document.querySelector(".filmTrend-list") ; 
    var li = document.createElement("li");
    li.setAttribute("class", "filmTrend-item") ; 
    filmTrendList.appendChild(li) ; 
    li.innerHTML = `
    <div class="filmTrend-image"> 
      <img src="https://image.tmdb.org/t/p/w300${trendData[i].poster_path}"></img>   
    </div>
    <div class="filmTrend-infor">
      <h4 class="filmTrend-name">${!trendData[i].original_name?trendData[i].original_title:trendData[i].original_name} </h4>
     
       <h4 class="filmTrend-popularity">
        Lượt xem: ${trendData[i].popularity} 
       </h4>
       <h4 class="filmTrend-vote">
        Điểm: ${trendData[i].vote_average}/10
       </h4>
       <h4 class="filmTrend-${trendData[i].media_type}">
      ${trendData[i].media_type==="tv" ?"TV Show" :"Movies"}
       </h4>  
    </div>
    
    `

  }
}