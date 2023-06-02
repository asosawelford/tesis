import { setCookie } from "./cookies.js";

const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const volume = document.getElementById("volume");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

audio.src = "calibration_signals/volume_looped.wav";

// Functions for audio player controls
playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline-block";
    } else {
      audio.pause();
      pauseIcon.style.display = "none";
      playIcon.style.display = "inline-block";
    }
});

volume.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

document.getElementById("nextButton").onclick = function () {
    // Save volume setting
    const userVolume = audio.volume;
    setCookie("userVolume", userVolume);
    //console.log(userVolume);
    location.href = "consigna.html";
};