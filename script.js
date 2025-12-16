const API_URL = "https://api.jikan.moe/v4/";

const animesList = document.getElementById("animes-list");

let endpoint = "top/anime";

/**
 * @param { string } endpoint 
 */
async function generateAnimeTop(endpoint) { 
    try {
        const response = await fetch(API_URL + endpoint);
        if (!response.ok) {
          throw new Error(`Erreur ${ response.status }`);
        }    
        const topAnime = await response.json();
        console.log(topAnime)
        topAnime.data.forEach(anime => {
            const animeCard = document.createElement("article");
            animeCard.classList.add("anime-card");
            
            const animeUrl = document.createElement("a");
            animeUrl.href = anime.url;
            
            const animeImg = document.createElement("img");
            animeImg.classList.add("anime-image");
            animeImg.src = anime.images.jpg.image_url;
            animeImg.alt = "";
            animeCard.appendChild(animeImg);
            
            const animeInfo = document.createElement("div");
            animeInfo.classList.add("anime-info");
            animeCard.appendChild(animeInfo);
            
            const animeMeta = document.createElement("div");
            animeMeta.classList.add("anime-meta")
            animeInfo.appendChild(animeMeta);
            
            const jpTitle = document.createElement("h1");
            jpTitle.textContent = anime.title_japanese;
            jpTitle.classList.add("jp-title");
            animeMeta.appendChild(jpTitle);
            
            const enTitle = document.createElement("h2");
            enTitle.textContent = anime.title_english;
            enTitle.classList.add("en-title");
            animeMeta.appendChild(enTitle);
            
            const animeGenres = document.createElement("ul");
            animeGenres.classList.add("anime-genres")
            animeInfo.appendChild(animeGenres);

            anime.genres.forEach(genre =>{ 
                const animeGenre = document.createElement("li");
                animeGenre.textContent = genre.name;
                animeGenres.appendChild(animeGenre);
            
            const animeEpisode = document.createElement("p")
            anime

            }   
            )
            animeUrl.appendChild(animeCard);
            animesList.append(animeUrl);
        });
    } catch {
        animesList.textContent = "Impossible de charger la liste des animes." 
    }
}
generateAnimeTop(endpoint);