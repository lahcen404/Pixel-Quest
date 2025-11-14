const cardsCountainer = document.querySelector(".cards");
const cardsFavsContainer = document.querySelector(".cardsFavs")
// const cards =    document.querySelectorAll(".card");
const modal = document.querySelector(".modal");
const closeBtns = document.querySelectorAll(".closeBtn");
const serachInput = document.querySelector(".searchInput");

const nextBtn = document.querySelector(".nextBtn")
const prevBtn = document.querySelector(".prevBtn")

const windowsBtn =document.querySelector(".windowsBtn")
const xboxBtn =document.querySelector(".xboxBtn")
const psBtn =document.querySelector(".psBtn")
const nintendoBtn =document.querySelector(".nintendoBtn")
const genreBtn =document.querySelector("#genreDropdown ul")
const dateBtn =document.querySelector("#dateDropdown a")

const modalTitle = document.querySelector(".modalTitle");
const modalPublisher = document.querySelector(".publisher");
const modalImg = document.querySelector(".modalImg");
const modalReleased = document.querySelector(".modalReleased");
const modalGenres = document.querySelector(".modalGenres");
const modalDescription = document.querySelector(".modalDescription");
const modalRating = document.querySelector(".modalRating");

// const gameURL = "https://debuggers-games-api.duckdns.org/api/games";

function getFavorites(){
return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites){
    localStorage.setItem("favorites" , JSON.stringify(favorites));
}


let allGames = [];
let games = [];

let nextPageUrl = null;
let prevPageUrl = null;


// array of platform with imgs 
let platformsData = {
  platforms: [
    {
      name: "PC",
      img: "./imgs/icons8-windows-50.png",
    },
    {
      name: "PlayStation",
      img: "./imgs/icons8-playstation-50.png",
    },
    {
      name: "Xbox",
      img: "./imgs/icons8-xbox-50.png",
    },
    {
      name: "Nintendo",
      img: "./imgs/icons8-nintendo-switch-50.png",
    },
    {
      name: "Linux",
      img: "./imgs/icons8-linux-50.png",
    },
    {
      name: "Apple Macintosh",
      img: "./imgs/icons8-apple-inc-30.png",
    }
  ],
};

// fetching games 

async function fetchGames(page = 1) {
  try {
    const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${page}`);
    let data = await response.json();
    allGames = data.results;
    games = [...allGames];
    console.log(games);

    nextPageUrl = data.next;
    console.log(nextPageUrl);

    prevPageUrl = data.previous;
    //console.log(prevPageUrl);
  } catch (err) {
    console.error(err);
  }
}

// genre 

async function fetchGenres(){
   try{
 const response = await fetch(`https://debuggers-games-api.duckdns.org/api/genres`)
 let data = await response.json();
 console.log("genres :" ,data);

renderGenres(data.genres);
 
   }catch(err){
    console.error(err)
   }
}



function renderGenres(genres) {
  

  genres.forEach(genre => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = genre.slug;      
    a.className = "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";

    li.appendChild(a);
    genreBtn.appendChild(li);
  });
}

fetchGenres()

// display cards 

function displayCards() {
    cardsCountainer.innerHTML = "";
  games.forEach(game => {
    const card = document.createElement("div");

    card.innerHTML = `<div class="card flex items-center justify-center p-4" data-id ="${game.id}">
  <div class="w-95 h-96 bg-gray-800 border-2 border-blue-600 rounded-xl overflow-hidden shadow-2xl flex flex-col">
    

    <div class="relative h-48 w-full">
      <img src="${game.background_image}" alt="" class="w-full h-full object-cover">
      
      <label for="favorit" class="favBtn absolute top-3 left-3 cursor-pointer p-2 bg-black bg-opacity-50 rounded-full transition duration-300 hover:bg-opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" class="loveIcon h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5c-1.933 0-3.57 1.258-4.312 3.25c-.742-1.992-2.379-3.25-4.313-3.25C5.099 3.75 3 5.765 3 8.25c0 7.22 8.75 12 9 12c.25 0 9-4.78 9-12z" />
        </svg>
      </label>
    </div>
    
    <div class="p-4 flex-1 flex flex-col justify-between">
      
      <div class="flex justify-between items-center mb-4">
        <div class="flex gap-2 items-center md:gap-1">
          ${game.parent_platforms
            .map((p) => {
              const platform = platformsData.platforms.find(
                (pl) => pl.name === p.platform.name
              );
              return platform
                ? `<img src="${platform.img}" alt="logo" class="h-6 w-6 md:h-4 w-2">`
                : "";
            })
            .join("")} 
        </div>

        <div class="bg-yellow-900  text-yellow-500 border border-amber-300 text-sm font-bold px-3 py-1 rounded-md">
          ${game.rating}
        </div>
      </div>
      
      <h2 class="text-white text-2xl font-serif mb-1 truncate">
        ${game.name}
      </h2>

      <p class="text-xl text-gray-300">Rated by ${game.ratings_count} users</p>

      <div class="flex gap-2 items-center mt-auto">
        <img src="./imgs/icons8-plus-24.png">
        <p class="text-gray-400 font-sans">
          ${game.added}
        </p>
      </div>
      
    </div>
  </div>
</div>
`;

    cardsCountainer.appendChild(card);

    const favBtn = card.querySelector(".favBtn");
const loveIcon = card.querySelector(".loveIcon");

let favorites = getFavorites()
if(favorites.includes(game.id)){
    loveIcon.style.color="red"
}

// favorite btn

favBtn.addEventListener("click", (e) => {
  e.stopPropagation(); 
  

  let id = game.id
let favorites = getFavorites()
  
   if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    loveIcon.style.color = "white";

    if (isFavoritesPage) {
      saveFavorites(favorites);
      window.location.reload(); 
    }

  } else {
    favorites.push(id);
    loveIcon.style.color = "red";
  }

  
  saveFavorites(favorites)
});

   const cardDiv = card.querySelector(".card"); 
cardDiv.addEventListener("click", () => {
  const id = cardDiv.getAttribute("data-id");
  displayModal(id);

});

  });
}



// display favorite cards

function displayFavoriteCards(){
    const favorites = getFavorites()
    const favGames = allGames.filter((fg)=> favorites.includes(fg.id))
    games = [...favGames]
    console.log(games);
    displayCards()
}

//display modal 

function displayModal(id){
    const selectedGame = games.find((game)=> id == game.id);

    modalTitle.innerText = selectedGame.name;
    modalPublisher.innerText = selectedGame.name_original;
    modalImg.src = selectedGame.background_image;
    modalReleased.innerText = selectedGame.released;
    modalGenres.innerText = selectedGame.genres.map((game)=>game.name).join(", ");
    modalDescription.innerText = selectedGame.description;
    modalRating.innerText = selectedGame.rating || 0;

modal.classList.remove("hidden");
}

//close btn 
closeBtns.forEach(btn => btn.addEventListener("click", () => modal.classList.add("hidden")));

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

if (serachInput) {
    let inputValue ;

serachInput.addEventListener("input",(e)=>{

   inputValue=  e.target.value.toLowerCase();

   const filtred = allGames.filter(g=>{
    return g.name.toLowerCase().includes(inputValue)
   })
   
   if(inputValue === ""){
    games = [...allGames];
    displayCards()
   }else if(filtred.length === 0){
        cardsCountainer.innerHTML=`<h2 class="text-center text-3xl text-white font-semibold mt-10">
 Nothing here ... </h2>`
   }else{
    games=filtred
displayCards()
   }

})
}


// filters 

//windows btn
windowsBtn.addEventListener("click",()=>{
    const arr = isFavoritesPage ? games : allGames;
  const winsGames = arr.filter(g => g.parent_platforms.some(ga => ga.platform.name == "PC"))
    games = [...winsGames]
    displayCards()
console.log(winsGames)
})

// xbox btn
xboxBtn.addEventListener("click",()=>{
    const arr = isFavoritesPage ? games : allGames;
  const xboxGames = arr.filter(g => g.parent_platforms.some(ga => ga.platform.name == "Xbox"))
    games=[...xboxGames]
    displayCards()
console.log(xboxGames)
})


//play station btn
psBtn.addEventListener("click",()=>{
    
 const arr = isFavoritesPage ? games : allGames;
  const psGames = arr.filter(g => g.parent_platforms.some(ga => ga.platform.name == "PlayStation"))
    games=[...psGames]
    displayCards()
console.log(psGames)
})

//nintendo btn
nintendoBtn.addEventListener("click",()=>{
    
  const arr = isFavoritesPage ? games : allGames;
  const nintendoGames = arr.filter(g => g.parent_platforms.some(ga => ga.platform.name == "Nintendo"))
    games=[...nintendoGames]
    displayCards()
console.log(nintendoGames)
})

// checkiing if the fav page
const isFavoritesPage = window.location.pathname.includes("favorite.html");

fetchGames(1).then(() => {
  if (isFavoritesPage) {
    displayFavoriteCards();
  } else {
    displayCards();
  }
});

// next btn
nextBtn.addEventListener("click", () => {
  if (nextPageUrl) {
    const link = nextPageUrl;
    const parts = link.split("page=");
    const p = parts[1];
    fetchGames(p).then(() => displayCards());
  }
});

// previous btn
prevBtn.addEventListener("click", () => {
  if (prevPageUrl) {
    const link = prevPageUrl;
    const parts = link.split("page=");
    const p = parts[1];
    fetchGames(p).then(() => displayCards());
  }
});

