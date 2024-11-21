const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";

const changeHero = (albumObj) => {
  // HERO
  const imgHero = document.querySelector("#hideAds img");
  imgHero.src = albumObj.cover;
  const linkHeroImg = document.querySelector("#hideAds a");
  linkHeroImg.href = `./album-page.html?appId=${albumObj.id}`;
  const heroTitle = document.querySelector(".heroTitle");
  heroTitle.innerText = albumObj.title;
  const heroArtist = document.querySelector(".heroArtist");
  heroArtist.innerText = albumObj.artist.name;
  heroArtist.href = `./artist-page.html?appId=${albumObj.artist.id}`;
  const heroTxt = document.querySelector(".heroTxt");
  heroTxt.innerText = `Ascolta il nuovo singolo di ${albumObj.artist.name}`;

  // FOOTER
  const imgFooter = document.querySelector(".footerImg");
  imgFooter.src = albumObj.cover;
  const footerImgLink = document.querySelector(".footerImgLink");
  footerImgLink.href = `./album-page.html?appId=${albumObj.id}`;
  const footerTitle = document.querySelector(".footerTitle");
  footerTitle.innerText = albumObj.title;
  const footerArtist = document.querySelector(".footerArtist");
  footerArtist.innerText = albumObj.artist.name;
  footerArtist.href = `./artist-page.html?appId=${albumObj.artist.id}`;

  // MusicBAR
  // E' corretto ma bisogna cambiare l'albumOBJ con l'oggetto della canzone presa singolarmente ("singolaCanzone".duration)
  // const durationMusicTotal = document.querySelector(".minuteSong");
  // durationMusicTotal.innerText = `${albumObj.duration / 60}:${albumObj.duration % 60}`;
};

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

const randomMusicID = () => {
  return arrs[Math.floor(Math.random() * arrs.length)];
};

// CreatePlaylist
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
        const a = document.createElement("a");
        a.className = "text-decoration-none text-secondary";
        a.href = `./album-page.html?appId=${musicObj.id}`;
        a.innerText = musicObj.title;
        li.appendChild(a);
        ul.appendChild(li);
      });
  });
};

// ChangeHero
const getHero = (endpoint) => {
  fetch(URL + endpoint + randomMusicID(), {
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
      changeHero(musicObj);
    });
};

// Caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  getPlaylist(albumUrl, arrs);
  getHero(albumUrl);
});
