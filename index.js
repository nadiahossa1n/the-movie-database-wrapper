const trendingEl = document.querySelector(".trending__list")
const resultsEl = document.querySelector(".results__list");

const searchBar = document.querySelector(".search__bar")
searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        renderResults()
    }
})

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWNiNzdiNDdiZGZkODliZjhjZTk1YmJiODFlMWI0YiIsIm5iZiI6MTcyNTEzMTU4NS44NjAxODcsInN1YiI6IjY2ZDM2OGViOWIyNjExNGZlMTAxZGE4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LhsgS2aTM-v8v85dhWcVfsCjhn_i_2FGf8F4n57aFRQ'
    }
  };

window.onload = async () => {
    const trendingList = document.querySelector(".trending__list")
    const trending = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const trendingData = await trending.json();
    const trendingDataArray = trendingData.results
    trendingEl.innerHTML = trendingDataArray.map((result) => trendingHtml(result)).join("")
  }

function trendingHtml(result) {
    return `<div class="trending__wrapper">
        <div class="trending__img__wrapper">
            <img src="https://image.tmdb.org/t/p/original/${result.poster_path}" alt="poster unavailable">
        </div>
            <div class="trending__title">
                ${result.title}
            </div>

    </div>`
    }

async function renderResults() {
    const trendingSection = document.getElementById("trending")
    trendingSection.style.display = "none";
    const resultsSection = document.getElementById("results")
    resultsSection.style.display = "block";

    const resultsList = document.querySelector(".results__list")
    resultsList.classList.toggle("results__list__loading");

    const searchString = document.querySelector(".search__bar").value;
    const heading = document.querySelector('.results__heading h3');
    heading.innerHTML += `<span>"${searchString}"</span>`

    const results = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchString}&language=en-US&page=1`, options)
    const resultsData = await results.json();
    const resultsDataArray = resultsData.results
    if (results) {
        resultsList.classList.toggle("results__list__loading");
    }    
    resultsEl.innerHTML = resultsDataArray.map((result) => resultHtml(result)).join("");
  }

function resultHtml(result) {
    return `<div class="result__wrapper">
        <div class="result__img__wrapper">
            <img src="https://image.tmdb.org/t/p/original/${result.poster_path}" alt="poster unavailable">
        </div>
        <div class="result__content__wrapper">
            <div class="result__title">
                ${result.title}
            </div>
            <div class="result__date">
                ${result.release_date}
            </div>
        </div>

    </div>`
}