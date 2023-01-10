const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const currencyKey = Object.keys(data.currencies)[0];
  const languageKey = Object.keys(data.languages)[0];
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data?.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[languageKey]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[currencyKey].name
        }</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

function whereAmI(lat, lng) {
  const url = `https://geocode.xyz/${lat},${lng}?json=1`;
  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `There is a limit that you can send a request, please wait a little more ${response.status}`
        );
      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.region}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((err) => console.error(err.message));
}

whereAmI(52.508, 13.381);
//whereAmI(-33.933, 18.474);
