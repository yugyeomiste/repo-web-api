const API_URL = "https://api.jikan.moe/v4/";
const animesList = document.getElementById("animes-list");
let endpoint = "top/anime";

/**
 * @param { string } endpoint 
 * 
 * This function is used to generate the top 25 anime list.
 * It takes the API route parameter as parameter and return nothing
 */

//JS page top
async function generateAnimeTop(endpoint) { 
    const animesList = document.getElementById("animes-list");
    if (!animesList) return;

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
generateAnimeTop(endpoint);

// JS page random

/*
*
* This function is used to generate a random anime
* It takes no parameter and returns nothing, only used to write in the DOM
*/

async function randomAnime() {
    const container = document.getElementById("random-result");
    if (!container) return;
    
    try {
        const response = await fetch(API_URL + "random/anime?sfw");
        if (!response.ok) {
          throw new Error(`Erreur ${ response.status }`);
        }    
        const anime = (await response.json()).data;

        const container = document.getElementById("random-result");

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
    const reloadBtn = document.getElementById("btn-reload");
}
    const reloadBtn = document.getElementById("btn-reload");
    if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
            randomAnime();
        });
}
randomAnime();
