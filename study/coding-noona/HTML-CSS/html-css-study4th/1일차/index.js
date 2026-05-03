const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

let searchInputStatus = false;

searchBtn.addEventListener("click", () => {
  searchInputStatus = !searchInputStatus;
  if (!searchInputStatus) {
    searchInput.style.display = "none";
  } else {
    searchInput.style.display = "block";
  }
});

const infoBtn = document.getElementById("info-btn");
const infoIcon = document.getElementById("info-icon");
const table = document.querySelector("table");

let infoStatus = false;

infoBtn.addEventListener("click", () => {
  infoStatus = !infoStatus;
  if (!infoStatus) {
    table.style.display = "none";
    infoIcon.textContent = "▶";
  } else {
    table.style.display = "table";
    infoIcon.textContent = "▼";
  }
});

const audio = document.querySelector("audio");
const audioBtn = document.getElementById("audio-btn");
const volumeController = document.getElementById("volume");
const volumeBtn = document.getElementById("volume-btn");
let volumeStatus = false;
volumeController.style.display = "none";

volumeBtn.addEventListener("click", () => {
  volumeStatus = !volumeStatus;
  if (!volumeStatus) {
    volumeController.style.display = "none";
  } else {
    volumeController.style.display = "block";
  }
});

audioBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    audioBtn.textContent = "⏸";
  } else {
    audio.pause();
    audioBtn.textContent = "▶";
  }
});

audio.addEventListener("ended", () => {
  audioBtn.textContent = "▶";
});

audio.volume = volumeController.value;
volumeController.addEventListener("input", () => {
  audio.volume = volumeController.value;
});
