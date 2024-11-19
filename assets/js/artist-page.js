// Gestione view Sidebars Amici e Sezione Annunci
const linkHideFriends = document.querySelector(".link-hideFriends");
const linkShowFriends = document.querySelector(".link-showFriends");
const middleCol = document.querySelector(".middle-col");

linkHideFriends.onclick = () => {
  middleCol.classList.remove("col-7");
  middleCol.classList.add("col-9");
};

linkShowFriends.onclick = () => {
  middleCol.classList.remove("col-9");
  middleCol.classList.add("col-7");
  const hideFriends = document.getElementById("hideFriends");
  hideFriends.classList.remove("hide");
  hideFriends.classList.add("show");
};
