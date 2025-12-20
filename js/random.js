// random.js
/*
*
* This function is used to generate a random anime
* It takes no parameter and returns nothing, only used to write in the DOM
*
*/
import { API_URL } from './api.js';

export async function randomAnime() {
    const container = document.getElementById("random-result");
    if (!container) return;
    
    try {
        const response = await fetch(API_URL + "random/anime?sfw");
        if (!response.ok) {
          throw new Error(`Erreur ${ response.status }`);
        }    
        const anime = (await response.json()).data;

        
        container.innerHTML = "";

        const img = document.createElement("img");
        img.src = anime.images.jpg.large_image_url;
        img.alt = anime.title;
        container.appendChild(img);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("anime-info");

        const title = document.createElement("h2");
        title.textContent = anime.title;
        infoDiv.appendChild(title);

        const score = document.createElement("p");
        score.textContent = `Score : ${anime.score + " ⭐ " ?? "N/A"}`;
        infoDiv.appendChild(score);

        const episodes = document.createElement("p");
        episodes.textContent = `Episodes : ${anime.episodes ?? "?"}`;
        infoDiv.appendChild(episodes);

        if (anime.genres && anime.genres.length > 0) {
            const genresDiv = document.createElement("div");
            genresDiv.classList.add("anime-genres");
            anime.genres.forEach(g => {
                const genre = document.createElement("p");
                genre.textContent = g.name;
                genresDiv.appendChild(genre);
            });
            infoDiv.appendChild(genresDiv);
        }

        const synopsis = document.createElement("p");
        synopsis.textContent = anime.synopsis ?? "Pas de synopsis disponible.";
        infoDiv.appendChild(synopsis);

        const link = document.createElement("a");
        link.href = anime.url;
        link.target = "_blank";
        link.textContent = "Voir sur MyAnimeList";
        link.title = "Lien vers la page MyAnimeList de l'anime " + anime.title; 
        infoDiv.appendChild(link);

        container.appendChild(infoDiv);

    } catch(error) {
        container.innerHTML = "";

        const errorMsg = document.createElement("p");
        errorMsg.textContent = "Erreur lors du chargement 😕";
        container.appendChild(errorMsg);

        console.error(error);
    }
}

// Reload
export function initRandomBtn() {
    const reloadBtn = document.getElementById("btn-reload");
    if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
            randomAnime();
        });
    }
}