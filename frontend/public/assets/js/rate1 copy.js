import { getCookie } from "./cookies.js";
import { url } from "./config.js";

const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const volume = document.getElementById("volume");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const form = document.getElementById("rate1");


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
  console.log(form)
  const formData = new FormData(form);
  // Convert formData to JSON format
  const object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });

  const formJSON = JSON.stringify(object);
  console.log(formJSON);

  async function query(form_data) {
      const response = await fetch(
          url + "/tts_sorter/receive_rate/",
          {
              headers: new Headers({ 'Content-type': 'application/json' }),
              method: "POST",
              body: form_data,
          }
      );
      //const result = await response.json();
      const result = await response;
      return result;
  }

  query(formJSON).then((response) => {
    response.json().then(body => console.log(body)|| body)
    .then(body => window.location.href = "rate1.html");
  });
};

const extractPath = (str) => {
  const startIndex = str.indexOf('stimuli');
  return str.substring(startIndex);
};

// Function to load audios and print the reply
async function loadAudios() {
  // Call your backend function here and handle the response
  const response = await fetch(
    url + "/tts_sorter/load_audios/",
    {
        headers: new Headers({ 'Content-type': 'application/json' }),
        method: "GET",
        body: null,
    }
  );
  //const result = await response.json();
  const result = await response.json();
  const audio1 = document.getElementById("audio1");
  const audio2 = document.getElementById("audio2");
  const audio3 = document.getElementById("audio3");
  const audio4 = document.getElementById("audio4");
  const audio5 = document.getElementById("audio5");

  audio1.src = extractPath(result['A']);
  audio2.src = extractPath(result['B']);
  audio3.src = extractPath(result['C']);
  audio4.src = extractPath(result['D']);
  audio5.src = extractPath(result['E']);
  return result;
}

window.onload = loadAudios;
console.log("Audios loaded");
