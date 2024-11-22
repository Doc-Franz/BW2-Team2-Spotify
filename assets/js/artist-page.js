const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get("appId");

const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";
const artistUrl = "artist/";
const searchUrl = "/search?q=";

let footerMusicImg = "";
let footerMusicImgLink = "";
let footerMusicTitle = "";
let footerMusicArtist = "";
let footerMusicArtistLink = "";

// Funzione che dato un numero inserisce il punto nella posizione delle migliaia
const nbFans = (nFans) => {
  let arr = nFans.toString().split("");
  let i = arr.length - 3;
  while (i > 0) {
    arr.splice(i, 0, ".");
    i -= 3;
  }
  return arr.join("");
};

const changeContent = (song) => {
  const songImgLink = document.querySelectorAll(".songImgLink");
  const songImg = document.querySelectorAll(".songImgLink img");
  const songTitle = document.querySelectorAll(".songTitle");
  const songFans = document.querySelectorAll(".songFans");
  const songDuration = document.querySelectorAll(".songDuration");
  const songArtist = document.getElementById("artistTitle");
  const artistImgBG = document.querySelector(".image-bg").style.backgroundImage;
  const artistImg = artistImgBG.slice(artistImgBG.indexOf('("') + 2, artistImgBG.lastIndexOf('")')); //Immagine di BG senza l'url, ma con il contenuto HTTPS

  console.log();
  for (let i = 0; i < 10; i++) {
    const artistMusic = song.data[i];
    songImgLink[i].href = `./album-page.html?appId=${artistMusic.album.id}`;
    songImg[i].src = artistMusic.album.cover;
    songTitle[i].innerText = artistMusic.title;
    songFans[i].innerText = nbFans(artistMusic.rank);
    songDuration[i].innerText = `${Math.floor(artistMusic.duration / 60)}:${artistMusic.duration % 60}`;
  }
  const likesArtist = document.getElementById("likesArtist");
  const likesImg = document.getElementById("likesImg");
  likesArtist.innerText = `Di ${songArtist.innerText}!`;
  likesImg.src = artistImg;
  console.log(song);
  const musics = document.querySelectorAll("#music");
  musics.forEach(
    (music, index) =>
      (music.onclick = () => {
        // console.log(preview[titleSong[index].innerText]);

        const imgFooter = document.querySelector(".footerImg");
        imgFooter.src = songImg[index].src;
        const footerImgLink = document.querySelector(".footerImgLink");
        footerImgLink.href = songImgLink[index].href;
        const footerTitle = document.querySelector(".footerTitle");
        footerTitle.innerText = songTitle[index].innerText;
        const footerArtist = document.querySelector(".footerArtist");
        footerArtist.innerText = songArtist.innerText;
        footerArtist.href = `./artist-page.html?appId=${artistId}`;

        sessionStorage.setItem("storageMusicImg", imgFooter.src);
        sessionStorage.setItem("storageMusicImgLink", footerImgLink.href);
        sessionStorage.setItem("storageMusicTitle", footerTitle.innerText);
        sessionStorage.setItem("storageMusicArtist", footerArtist.innerText);
        sessionStorage.setItem("storageMusicArtistLink", footerArtist.href);
      })
  );
};

// Cambiamento contenuto della pagina
const getContentArtist = (artistName) => {
  if (artistId) {
    fetch(URL + searchUrl + artistName, {
      headers: {
        "x-rapidapi-key": tokenAPI,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        q: artistName
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
        changeContent(musicObj);
      });
  }
};

// Inserimento artista e chiamata alla funzione per cambiare il contenuto della pagina
const getArtist = () => {
  if (artistId) {
    fetch(`${URL + artistUrl}${artistId}`, {
      headers: {
        "x-rapidapi-key": tokenAPI,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
      .then((resp) => resp.json())
      .then((artist) => {
        document.getElementById("artistTitle").innerText = artist.name;
        document.getElementById("artistFans").innerText = `${nbFans(artist.nb_fan)} ascoltatori mensili`;
        document.querySelector(".image-bg").style.backgroundImage = `url(${artist.picture_big})`;
        // Inserimento canzoni
        getContentArtist(artist.name);
      })
      .catch((err) => {
        console.error("Errore nel recupero del prodotto:", err);
      });
  }
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
        const a = document.createElement("a");
        a.className = "text-decoration-none text-secondary";
        a.href = `./album-page.html?appId=${musicObj.id}`;
        a.innerText = musicObj.title;
        li.appendChild(a);
        ul.appendChild(li);
      });
  });
};

const setFooterMusicBar = () => {
  footerMusicImg = sessionStorage.getItem("storageMusicImg");
  footerMusicImgLink = sessionStorage.getItem("storageMusicImgLink");
  footerMusicTitle = sessionStorage.getItem("storageMusicTitle");
  footerMusicArtist = sessionStorage.getItem("storageMusicArtist");
  footerMusicArtistLink = sessionStorage.getItem("storageMusicArtistLink");

  const imgFooter = document.querySelector(".footerImg");
  imgFooter.src = footerMusicImg;
  const footerImgLink = document.querySelector(".footerImgLink");
  footerImgLink.href = footerMusicImgLink;
  const footerTitle = document.querySelector(".footerTitle");
  footerTitle.innerText = footerMusicTitle;
  const footerArtist = document.querySelector(".footerArtist");
  footerArtist.innerText = footerMusicArtist;
  footerArtist.href = footerMusicArtistLink;
};
// Caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  setFooterMusicBar();
  getArtist();
  getPlaylist(albumUrl, arrs);
});
