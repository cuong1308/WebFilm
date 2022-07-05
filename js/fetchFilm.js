fetch("./data/film.json")
.then(response => {
   return response.json();
})
.then(data => display(data));
const display = (data)=> {
    console.log(data);
    var filmItem = document.querySelector('.film-list');
    for(var i = 0;i<data.length;i++){ 
        console.log(data[i]);
        var box = document.createElement("div");
        box.setAttribute("class","film-item");
        box.setAttribute("id",`${data[i].id}`);
        console.log(box)
        
        filmItem.appendChild(box) ;
    console.log(`film?id=${data[i].id}`)
    
    box.innerHTML =`<img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}"></img>
                      <div class="info">
                          <a href="film/${data[i].id}">
                              <h2 class="filmUpdate-name">${data[i].title}</h2>    
                          </a>
                          
                      </div>`;
    
    const filmHotList = document.querySelector(".filmHot-list") ; 
    var li = document.createElement("li");
    li.setAttribute("class", "filmHot-item") ; 
    filmHotList.appendChild(li)
   li.innerHTML =`
   <a href="film/${data[i].id}">
      <div class="filmHot-image"> 
      <img src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}"></img>  
      </div>
      <div class="filmHot-name">${data[i].title}</div>
   </a>
   
   `
  }
    // film Hot list 
   

    //slick slide
  $('.filmHot-list').slick({
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 4,
  autoplaySpeed: 1000,
  prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
  nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }

  ]
});
  // fetch tren film 

  
}