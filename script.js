const cardsCountainer = document.querySelector(".cards");
// const cards =    document.querySelectorAll(".card");
const modal = document.querySelector(".modal");
const closeBtns = document.querySelectorAll(".closeBtn");



const modalTitle = document.querySelector(".modalTitle");
const modalPublisher = document.querySelector(".publisher");
const modalImg = document.querySelector(".modalImg");
const modalReleased = document.querySelector(".modalReleased");
const modalGenres = document.querySelector(".modalGenres");
const modalDescription = document.querySelector(".modalDescription");
const modalRating = document.querySelector(".modalRating");


const gameURL = "https://debuggers-games-api.duckdns.org/api/games";
let games = [];

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

async function fetchGames() {
  try {
    const response = await fetch(gameURL);
    let data = await response.json();
    games = data.results;
    console.log(games);
    displayCards();

    
  } catch (err) {
    console.error(err);
  }
}

// fetchGames();

function displayCards() {
  games.forEach(game => {
    const card = document.createElement("div");

    card.innerHTML = `<div class="card flex items-center justify-center p-4" data-id ="${game.id}">
  <div class="w-95 h-96 bg-gray-800 border-2 border-blue-600 rounded-xl overflow-hidden shadow-2xl flex flex-col">
    

    <div class="relative h-48 w-full">
      <img src="${game.background_image}" alt="" class="w-full h-full object-cover">
      
      <label for="favorit" class="absolute top-3 left-3 cursor-pointer p-2 bg-black bg-opacity-50 rounded-full transition duration-300 hover:bg-opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
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

   const cardDiv = card.querySelector(".card"); 
cardDiv.addEventListener("click", () => {
  const id = cardDiv.getAttribute("data-id");
  console.log("test")
    console.log(id)
  displayModal(id);
});



  });
   
}

function displayModal(id){
    const selectedGame = games.find((game)=> id == game.id);

    // if(!selectedGame) return;

    modalTitle.innerText = selectedGame.name;
    modalPublisher.innerText = selectedGame.name_original;
    modalImg.src = selectedGame.background_image;
    modalReleased.innerText = selectedGame.released;
    modalGenres.innerText = selectedGame.genres.map((game)=>game.name).join(", ");
    modalDescription.innerText = selectedGame.description;
    modalRating.innerText = selectedGame.rating || 0;


modal.classList.remove("hidden");
}

closeBtns.forEach(btn => btn.addEventListener("click", () => modal.classList.add("hidden")));

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});


fetchGames();

