const cardsCountainer = document.querySelector(".cards");

const gameURL = "https://debuggers-games-api.duckdns.org/api/games"
let games =[];

async function fetchGames(){
    try{
        const response = await fetch(gameURL)
        let data = await response.json()
         games = data.results;
         console.log(games)
    }catch (err){
        console.error(err)
    }
}

// fetchGames();



fetchGames();