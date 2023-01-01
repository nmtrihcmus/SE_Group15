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

async function list(){
    console.log("list movie ============");
    const res = await fetch('/list');
    const data = await res.json();
    console.log(data.total);
    console.log(data.listMovie);
    data.listMovie.forEach(e => {
        console.log("id = ", e.id);
    });
    var listMovies = document.getElementsByClassName('list-movies')[0];

    var card = `<div class="card position-relative col-3" style="width: 18rem">
    <img src="https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg" class="card-img-top" alt="poster">
    
    <div class="episode">
                99+
    </div>
    
    </div>
    <h5 class=""> Mặc dịnh tên phim</h5>`;
   
    for (let i = 0; i < 1; i++) {
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
    for (let i = 0; i < data.total - 30 ; i+=3) {
        var row = document.createElement('div');
        row.classList.add('d-flex');
        row.classList.add('flex-row');
        row.classList.add('justify-content-around');
        listMovies.appendChild(row);
        var r = listMovies.childNodes[1];
       
        for (let index = 0; index < 3; index++) {
            var j = i + index;
            if( j >= data.total - 30){
                break;
            }
            var newcard = `<div class="card position-relative col-3" style="width: 18rem">
            <img src="${data.listMovie[j].img}" class="card-img-top" alt="${data.listMovie[j].id}"> <div class="episode"> ${data.listMovie[j].id}</div> </div>
            <h5 class=""> ${data.listMovie[j].title}</h5>`;
            var item = document.createElement('div');
            item.innerHTML = newcard;
            row.appendChild(item);

        }
    }

};

async function loadPage(page){
    
    const res = await fetch(`/topRating/page/?page=${page}`);
    const data = await res.json();
    console.log(data.total);
   
    data.listMovie.forEach(e => {
        console.log("id = ", e.id);
    });
    var listMovies = document.getElementsByClassName('cur-page')[0];
    listMovies.innerHTML='';

    var card = `<div class="card position-relative" style="width: 18rem">
    <img src="https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg" class="card-img-top" alt="poster">
    <div class="episode">  99+</div></div> <h5 class=""> Mặc dịnh tên phim</h5>`;
   
    
    for (let i = 0; i < data.listMovie.length ; i+=3) {
        var row = document.createElement('div');
        row.classList.add('d-flex');
        row.classList.add('flex-row');
        row.classList.add('justify-content-around');
        listMovies.appendChild(row);
        var r = listMovies.childNodes[1];
       
        for (let index = 0; index < 3; index++) {
            var j = i + index;
            if( j >= data.listMovie.length){
                break;
            }
            var newcard = `<div class="card position-relative" style="width: 18rem">
            <img src="${data.listMovie[j].img}" class="card-img-top" alt="${data.listMovie[j].id}"> <div class="episode"> ${data.listMovie[j].id}</div> </div>
            <h5 class=""> ${data.listMovie[j].title}</h5>`;
            var item = document.createElement('div');
            item.innerHTML = newcard;
            row.appendChild(item);

        }
    }
}
