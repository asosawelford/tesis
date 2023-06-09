import { getCookie } from "./cookies.js";


const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const volume = document.getElementById("volume");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");


audio.src = "calibration_signals/max_min_reference.wav";
audio.volume   = getCookie("userVolume");

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

// Get the necessary elements
const audioElement = document.getElementById('audio');
const progressBarFill = document.getElementById('progress-bar-fill');

// Add an event listener to update the progress bar
audioElement.addEventListener('timeupdate', () => {
  // Calculate the progress percentage
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  
  // Update the width of the progress bar fill
  progressBarFill.style.width = `${progress}%`;
});

document.getElementById("nextButton").onclick = function () {
    location.href = "rate1.html";
};
