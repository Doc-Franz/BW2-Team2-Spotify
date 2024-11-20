// FAI UNA PROVA COMMENTANDO DA RIGA 76 A RIGA 108 E TOGLI IL COMMENTO DA RIGA 10 A 34!!!!
// GUARDA CHE FIGATA!! DOVREMMO COLLEGARE SOLAMENTE LA CONST PROVA =... ALL'INPUT NELLA BARRA DI RICERCA ED HAI ACCESSO A TUTTI I CONTENUTI!!!!!

const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";
const artistUrl = "artist/";
const searchUrl = "search/";
let updateHero = true; //Con questa condizione verifico se chiamare ChangeHeroAlbum() oppure createPlaylists()

// const prova = "i pinguini tattici nucleari";

// const getMusic = () => {
//   fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + prova, {
//     headers: {
//       "x-rapidapi-key": tokenAPI,
//       "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//       q: prova
//     }
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(`Error data not found ${resp.statusText}`);
//       }
//     })
//     .then((musicObj) => {
//       musicObj.data.forEach((element) => console.log(element.album.title));
//     });
// };

// window.addEventListener("DOMContentLoaded", () => {
//   getMusic();
// });

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

  updateHero = false; //Aggiorno la condizione per fare in modo che il contenuto dell'hero non venga refreshato
  createPlaylists(); //Una volta caricato il contenuto dell'hero invoco la funzione che gestirà il contenuto delle playlist

  // MusicBAR
  // E' corretto ma bisogna cambiare l'albumOBJ con l'oggetto della canzone presa singolarmente ("singolaCanzone".duration)
  // const durationMusicTotal = document.querySelector(".minuteSong");
  // durationMusicTotal.innerText = `${albumObj.duration / 60}:${albumObj.duration % 60}`;
};

const arr = ["594581752", "119606", "595243", "7090505", "103248"]; //Array con id delle canzoni

const randomMusicID = () => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createPlaylists = () => {
  arr.forEach((element) => {
    getMusic(albumUrl, element); //Ad ogni ciclo dell'array chiamo una fetch per aggiornare il contenuto della barra Playlist
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
        throw new Error(`Error data ${response.statusText}`);
      }
    })
    .then((musicObj) => {
      if (updateHero) {
        changeHeroAlbum(musicObj);
      } else {
        const ul = document.querySelector(".random-playlist");
        const li = document.createElement("li");
        li.className = "nav-item";
        const a = document.createElement("a");
        a.className = "text-decoration-none text-secondary";
        a.innerText = musicObj.title;
        li.appendChild(a);
        ul.appendChild(li);
      }
    });
};

window.addEventListener("DOMContentLoaded", function () {
  getMusic(albumUrl, randomMusicID());
});
