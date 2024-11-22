const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";
const searchUrl = "/search?q=";

const getSearchName = (searchParam) => {
  if (searchParam) {
    fetch(URL + searchUrl + searchParam, {
      headers: {
        "x-rapidapi-key": tokenAPI,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        q: searchParam
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          const searchAlert = document.querySelector(".alert");
          searchAlert.innerText = `Error: ${searchParam} not found!!!`;
          searchAlert.classList.remove("d-none");
          throw new Error(`Error data not found ${resp.statusText}`);
        }
      })
      .then((song) => {
        if (song.data.length !== 0) {
          window.open(`../../artist-page.html?appId=${song.data[0].artist.id}`, "_self");
        } else {
          const searchAlert = document.querySelector(".alert");
          searchAlert.innerText = `Error: ${searchParam} not found!!!`;
          searchAlert.classList.remove("d-none");
        }
      });
  }
};

const form = document.querySelector("form");
form.onsubmit = (e) => {
  e.preventDefault();
  const searchText = document.getElementById("searchText");
  searchText.onfocus = () => {
    const searchAlert = document.querySelector(".alert");
    searchAlert.classList.add("d-none");
  };
  getSearchName(searchText.value);
  form.reset();
};

// Creazione Playlist
const arrs = [
  "119606",
  "595243",
  "7090505",
  "103248",
  "670261311",
  "185484062",
  "129682552",
  "129682632",
  "12047958",
  "12047952",
  "12047956",
  "507149371",
  "12047934",
  "1603030"
];

const getPlaylist = (endpoint, arrsUrlID) => {
  arrsUrlID.forEach((arrUrl) => {
    fetch(URL + endpoint + arrUrl, {
      headers: {
        "x-rapidapi-key": tokenAPI,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error data ${response.statusText}`);
        }
      })
      .then((musicObj) => {
        const ul = document.querySelector(".random-playlist");
        const li = document.createElement("li");
        li.className = "nav-item";
        li.className = "liColor";
        const a = document.createElement("a");
        a.className = "text-decoration-none text-secondary";
        a.href = `./album-page.html?appId=${musicObj.id}`;
        a.innerText = musicObj.title;
        li.appendChild(a);
        ul.appendChild(li);
      });
  });
};

// Caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  getPlaylist(albumUrl, arrs);
});
