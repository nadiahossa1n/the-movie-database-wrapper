const resultsEl = document.querySelector(".results__list");

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWNiNzdiNDdiZGZkODliZjhjZTk1YmJiODFlMWI0YiIsIm5iZiI6MTcyNTEzMTU4NS44NjAxODcsInN1YiI6IjY2ZDM2OGViOWIyNjExNGZlMTAxZGE4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LhsgS2aTM-v8v85dhWcVfsCjhn_i_2FGf8F4n57aFRQ'
    }
  };

async function renderResults() {
    const resultsList = document.querySelector(".results__list")
    resultsList.classList.toggle("results__list__loading");
    const searchString = document.querySelector(".search__bar").value;
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
