const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get("appId");

const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";
const artistUrl = "artist/";

window.addEventListener("DOMContentLoaded", () => {
  if (artistId) {
    fetch(`${URL + artistUrl}${artistId}`, {
      headers: {
        "x-rapidapi-key": tokenAPI,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
      .then((resp) => resp.json())
      .then((artist) => {
        console.log(artist);
        document.getElementById("artistTitle").innerText = artist.name;
        document.getElementById("artistFans").innerText = `${artist.nb_fan} ascoltatori mensili`;
        document.querySelector(".image-bg").style.backgroundImage = `url(${artist.picture_big})`;
      })
      .catch((err) => {
        console.error("Errore nel recupero del prodotto:", err);
      });
  }
});
