const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("appId");

const URL = "https://striveschool-api.herokuapp.com/api/deezer/";
const albumUrl = "album/";

let footerMusicImg = "";
let footerMusicImgLink = "";
let footerMusicTitle = "";
let footerMusicArtist = "";
let footerMusicArtistLink = "";
let checkStatusMusic = true;

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

const getContentAlbum = (album) => {
  const preview = {};
  const imgHero = document.getElementById("mainImg");
  imgHero.setAttribute("crossorigin", "anonymous");

  document.getElementById("albumTitle").innerText = album.title;
  document.getElementById("mainImg").src = album.cover_big;
  document.getElementById("imgSubtitle").src = album.artist.picture;
  document.getElementById("albumSubtitle").innerText = `${album.artist.name} • ${album.release_date}  • ${album.nb_tracks} brani, ${Math.floor(
    album.duration / 60
  )} min ${album.duration % 60} sec`;

  const heroContainer = document.querySelector(".hero");
  const colorThief = new ColorThief();

  if (imgHero.complete) {
    const colors = colorThief.getColor(imgHero);
    heroContainer.style.backgroundColor = `rgb(${colors})`;
  } else {
    imgHero.addEventListener("load", function () {
      const colors = colorThief.getColor(imgHero);
      heroContainer.style.backgroundColor = `rgb(${colors})`;
    });
  }

  // Creazione contenuto pagina (canzoni)
  for (let i = 0; i < album.tracks.data.length; i++) {
    const tracks = album.tracks.data[i];
    preview[tracks.title] = tracks.preview;
    const albumContent = document.querySelector(".albumListContent");

    const row = document.createElement("div");
    row.className = "row mb-3 ciao";

    const numSong = document.createElement("div");
    numSong.className = "col-1";
    numSong.innerText = i + 1;

    const contentSong = document.createElement("div");
    contentSong.className = "col-5 ps-0";
    contentSong.id = "song";
    const titleSong = document.createElement("h5");
    titleSong.className = "m-0";
    titleSong.style.fontSize = "0.9rem";
    titleSong.innerText = tracks.title;
    titleSong.id = "titleSong";
    const artistSong = document.createElement("a");
    artistSong.className = "text-secondary text-decoration-none";
    artistSong.href = `./artist-page.html?appId=${album.artist.id}`;
    artistSong.style.fontSize = "0.8rem";
    artistSong.innerText = album.artist.name;
    artistSong.id = "artistSong";

    const fansSongs = document.createElement("div");
    fansSongs.className = "col-4 text-secondary";
    fansSongs.style.fontSize = "0.7rem";
    fansSongs.innerText = nbFans(tracks.rank);

    const durationSong = document.createElement("div");
    durationSong.className = "col-2 text-secondary";
    durationSong.style.fontSize = "0.7rem";
    durationSong.innerText = `${Math.floor(tracks.duration / 60)}:${tracks.duration % 60}`;

    contentSong.append(titleSong, artistSong);
    row.append(numSong, contentSong, fansSongs, durationSong);
    albumContent.appendChild(row);
  }
  const songs = document.querySelectorAll("#song");
  songs.forEach(
    (song, index) =>
      (song.onclick = () => {
        const titleSong = document.querySelectorAll("#titleSong");
        const artistSong = document.querySelectorAll("#artistSong");
        const albumImg = document.getElementById("mainImg");

        const imgFooter = document.querySelector(".footerImg");
        imgFooter.src = albumImg.src;
        const footerImgLink = document.querySelector(".footerImgLink");
        footerImgLink.href = `./album-page.html?appId=${album.id}`;
        const footerTitle = document.querySelector(".footerTitle");
        footerTitle.innerText = titleSong[index].innerText;
        const footerArtist = document.querySelector(".footerArtist");
        footerArtist.innerText = artistSong[index].innerText;
        footerArtist.href = artistSong[index].href;

        // mobile
        const mobileBarTitle = document.getElementById("musicBarMobileTitle");
        mobileBarTitle.innerText = `${footerTitle.innerText} -`;
        mobileBarTitle.href = footerImgLink.href;
        const mobileBarArtist = document.getElementById("musicBarMobileArtist");
        mobileBarArtist.innerText = footerArtist.innerText;
        mobileBarArtist.href = footerArtist.href;

        sessionStorage.setItem("storageMusicImg", imgFooter.src);
        sessionStorage.setItem("storageMusicImgLink", footerImgLink.href);
        sessionStorage.setItem("storageMusicTitle", footerTitle.innerText);
        sessionStorage.setItem("storageMusicArtist", footerArtist.innerText);
        sessionStorage.setItem("storageMusicArtistLink", footerArtist.href);
        sessionStorage.setItem("storageMobileBarTitle", mobileBarTitle.innerText);
        sessionStorage.setItem("storageMobileBarTitleLink", mobileBarTitle.href);
        sessionStorage.setItem("storageMobileBarArtist", mobileBarArtist.innerText);
        sessionStorage.setItem("storageMobileBarArtistLink", mobileBarArtist.href);

        let audio = new Audio(preview[titleSong[index].innerText]);
        audio.play();

        const playBtn = document.querySelector(".playBtn");
        playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
</svg>`;
        playBtn.onclick = () => {
          audio.pause();
          playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                      </svg>`;
        };
        const playBtn2 = document.querySelector(".playBtn2");
        playBtn2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
</svg>`;
        playBtn2.onclick = () => {
          audio.pause();
          playBtn2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                      </svg>`;
        };
      })
  );
};

// Inserimento artista e chiamata alla funzione per cambiare il contenuto della pagina
const getAlbum = () => {
  if (albumId) {
    fetch(`${URL + albumUrl}${albumId}`, {
      headers: {
        "x-rapidapi-key": tokenAPI,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
      }
    })
      .then((resp) => resp.json())
      .then((album) => {
        // Inserimento canzoni
        getContentAlbum(album);
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
  // mobile
  const mobileBarTitle = document.getElementById("musicBarMobileTitle");
  mobileBarTitle.innerText = sessionStorage.getItem("storageMobileBarTitle");
  mobileBarTitle.href = sessionStorage.getItem("storageMobileBarTitleLink");
  const mobileBarArtist = document.getElementById("musicBarMobileArtist");
  mobileBarArtist.innerText = sessionStorage.getItem("storageMobileBarArtist");
  mobileBarArtist.href = sessionStorage.getItem("storageMobileBarArtistLink");
};

// Caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  setFooterMusicBar();
  getAlbum();
  getPlaylist(albumUrl, arrs);
});
