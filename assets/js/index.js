// Allargamento contenuto centrale alla chiusura dell'attività amici.
const linkHideFriends = document.querySelector(".link-hideFriends");

linkHideFriends.onclick = () => {
  const middleCol = document.querySelector(".middle-col");
  middleCol.classList.remove("col-7");
  middleCol.classList.add("col-9");
};
