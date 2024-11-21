// Gestione view Sidebars Amici e Sezione Annunci
const linkHideFriends = document.querySelector(".link-hideFriends");
const linkShowFriends = document.querySelector(".link-showFriends");
const linkShowAds = document.querySelector(".link-showAds");
const middleCol = document.querySelector(".middle-col");

linkHideFriends.onclick = () => {
  middleCol.classList.remove("col-xl-7");
  middleCol.classList.add("col-xl-9");
};

linkShowFriends.onclick = () => {
  middleCol.classList.remove("col-xl-9");
  middleCol.classList.add("col-xl-7");
  const hideFriends = document.getElementById("hideFriends");
  hideFriends.classList.remove("hide");
  hideFriends.classList.add("show");
};

linkShowAds.onclick = () => {
  const hideAds = document.getElementById("hideAds");
  hideAds.classList.remove("hide");
  hideAds.classList.add("show");
};
