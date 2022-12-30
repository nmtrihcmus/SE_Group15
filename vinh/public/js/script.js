function loadCard() {
    //var listMovies = document.getElementById('list');
    var listMovies = document.getElementsByClassName('list-movies')[0];
    console.log("list movie");
    console.log(listMovies);
    var title = "Tên phim";
    var detail = "Thông tin chi tiết";
    var card = `<div class="card position-relative col-3" style="width: 18rem">
    <img src="https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg" class="card-img-top" alt="poster">
    
    <div class="episode">
                99+
    </div>
    
    </div>
    <h5 class="">${title}</h5>
    
    
    `;
    

//     <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//     99+
//     <span class="visually-hidden">unread messages</span>
//   </span>
    
    for (let i = 0; i < 4; i++) {
        var row = document.createElement('div');
        row.classList.add('d-flex');
        row.classList.add('flex-row');
        row.classList.add('justify-content-around');
        listMovies.appendChild(row);
        var r = listMovies.childNodes[1];
        for (let index = 0; index < 3; index++) {
            var item = document.createElement('div');
            item.innerHTML = card;
            row.appendChild(item);
            
        }
        
        
        
    }
    
}

// window.onload = (event) => {
//     console.log("page is fully loaded");
//     loadCard();
// };

