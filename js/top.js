// TOP
/**
 * 
 * This function is used to generate the top 25 anime list.
 * It takes the API route parameter as parameter and return nothing
 */
import { API_URL } from './api.js';

export async function generateAnimeTop() { 
    const animesList = document.getElementById("animes-list");
    if (!animesList) return;

    let endpoint = "top/anime";

    try {
        const response = await fetch(API_URL + endpoint);
        if (!response.ok) {
          throw new Error(`Erreur ${ response.status }`);
        }    
        const topAnime = await response.json();
        console.log(topAnime)
        topAnime.data.forEach(anime => {
            
            const animeUrl = document.createElement("a");
            animeUrl.href = anime.url;
            animeUrl.title = "Lien vers la page MyAnimeList de l'anime " + anime.title; 
            animeUrl.target = "_blank";
            
            const animeCard = document.createElement("article");
            animeCard.classList.add("anime-card");

            const imgContainer = document.createElement("div");
            imgContainer.classList.add("card-img-container");

            const animeImg = document.createElement("img");
            animeImg.classList.add("anime-image");
            animeImg.src = anime.images.jpg.image_url;
            animeImg.alt = "${anime.title}";
            imgContainer.appendChild(animeImg);
            animeCard.appendChild(imgContainer);

            
            const animeInfo = document.createElement("div");
            animeInfo.classList.add("anime-info");
            animeCard.appendChild(animeInfo);
            
            const animeMeta = document.createElement("div");
            animeMeta.classList.add("anime-meta")
            animeInfo.appendChild(animeMeta);

            const animeDate = document.createElement("span");
            const animeSeason = anime.season ? (anime.season.charAt(0).toUpperCase() + anime.season.slice(1)) : "";
            const animeSource = anime.source || "?";
            animeDate.textContent = animeSeason + " " + animeSource;
            animeMeta.appendChild(animeDate)

            
            const jpTitle = document.createElement("h2");
            jpTitle.textContent = anime.title_japanese;
            jpTitle.classList.add("jp-title");
            animeMeta.appendChild(jpTitle);
            
            const enTitle = document.createElement("h3");
            enTitle.textContent = anime.title_english;
            enTitle.classList.add("en-title");
            animeMeta.appendChild(enTitle);
            
            const animeEpisodes = document.createElement("p");
            animeEpisodes.classList.add("anime-episodes")
            animeEpisodes.textContent = " Episodes: "+ anime.episodes
            animeInfo.appendChild(animeEpisodes);
            
            const animeScore = document.createElement("p");
            animeScore.classList.add("anime-score");
            animeScore.textContent = "Score : " + anime.score+ " ⭐"; 
            animeInfo.appendChild(animeScore);
            
            
            const animeGenres = document.createElement("ul");
            animeGenres.classList.add("anime-genres")
            animeInfo.appendChild(animeGenres);

            if (anime.genres) { 
                anime.genres.slice(0, 3).forEach(genre => { 
                    const animeGenre = document.createElement("li");
                    animeGenre.textContent = genre.name;
                    animeGenres.appendChild(animeGenre); 
                }); 
            }
            
            animeUrl.appendChild(animeCard);
            animesList.append(animeUrl);
        });
    } catch {
        animesList.textContent = "Impossible de charger la liste des animes." 
    }
}