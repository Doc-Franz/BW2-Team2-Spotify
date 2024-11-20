const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";
const artistUrl = "artist/";
const searchUrl = "search/";

const changeHeroAlbum = (albumObj) => {
  // HERO
  const imgHero = document.querySelector("#hideAds img");
  imgHero.src = albumObj.cover;
  const heroTitle = document.querySelector(".heroTitle");
  heroTitle.innerText = albumObj.title;
  const heroArtist = document.querySelector(".heroArtist");
  heroArtist.innerText = albumObj.artist.name;
  const heroTxt = document.querySelector(".heroTxt");
  heroTxt.innerText = `Ascolta il nuovo singolo di ${albumObj.artist.name}`;

  // FOOTER
  const imgFooter = document.querySelector(".footerImg");
  imgFooter.src = albumObj.cover;
  const footerTitle = document.querySelector(".footerTitle");
  footerTitle.innerText = albumObj.title;
  const footerArtist = document.querySelector(".footerArtist");
  footerArtist.innerText = albumObj.artist.name;

  // MusicBAR
  // E' corretto ma bisogna cambiare l'albumOBJ con l'oggetto della canzone presa singolarmente ("singolaCanzone".duration)
  // const durationMusicTotal = document.querySelector(".minuteSong");
  // durationMusicTotal.innerText = `${albumObj.duration / 60}:${albumObj.duration % 60}`;
};
const randomMusicID = () => {
  const arr = ["594581752", "119606", "595243", "7090505", "103248"];
  return arr[Math.floor(Math.random() * arr.length)];
};

const createPlaylists = () => {
  const arrs = ["594581752", "119606", "595243", "7090505", "103248"];
  const ul = document.querySelector(".random-playlist");
  arrs.forEach((arr) => {
    const musicObj = getMusic(arr);
    const li = document.createElement("li");
    li.className = "nav-item";
    const a = document.createElement("a");
    a.className = "text-decoration-none text-secondary";
    a.innerText = musicObj.title;
    li.appendChild(a);
    ul.appendChild(li);
  });
};

const getMusic = (endpoint, urlID) => {
  fetch(URL + endpoint + urlID, {
    headers: {
      "x-rapidapi-key": tokenAPI,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error data not found ${resp.statusText}`);
      }
    })
    .then((musicObj) => {
      //   console.log(musicObj);
      return musicObj;
    });
};

window.addEventListener("DOMContentLoaded", function () {
  console.log(getMusic(albumUrl, randomMusicID()));
  //   changeHeroAlbum();
  //   createPlaylists();
  //   getMusic(artistUrl, randomMusicID());
});
