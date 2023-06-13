import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const form = document.getElementById("rate1");

const audio2 = document.getElementById("audio2");
const playPause2 = document.getElementById("play-pause2");
const playIcon2 = document.getElementById("play-icon2");
const pauseIcon2 = document.getElementById("pause-icon2");
const form2 = document.getElementById("rate2");

const audio3 = document.getElementById("audio3");
const playPause3 = document.getElementById("play-pause3");
const playIcon3 = document.getElementById("play-icon3");
const pauseIcon3 = document.getElementById("pause-icon3");
const form3 = document.getElementById("rate3");

const audio4 = document.getElementById("audio4");
const playPause4 = document.getElementById("play-pause4");
const playIcon4 = document.getElementById("play-icon4");
const pauseIcon4 = document.getElementById("pause-icon4");
const form4 = document.getElementById("rate4");

const audio5 = document.getElementById("audio5");
const playPause5 = document.getElementById("play-pause5");
const playIcon5 = document.getElementById("play-icon5");
const pauseIcon5 = document.getElementById("pause-icon5");
const form5 = document.getElementById("rate5");

// audio.src = "calibration_signals/max_min_reference.wav";
audio.volume   = getCookie("userVolume");
audio2.volume   = getCookie("userVolume");
audio3.volume   = getCookie("userVolume");
audio4.volume   = getCookie("userVolume");
audio5.volume   = getCookie("userVolume");

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
// Functions for audio player controls
playPause2.addEventListener("click", () => {
    if (audio2.paused) {
      audio2.play();
      playIcon2.style.display = "none";
      pauseIcon2.style.display = "inline-block";
    } else {
      audio2.pause();
      pauseIcon2.style.display = "none";
      playIcon2.style.display = "inline-block";
    }
}); 
// Functions for audio player controls
playPause3.addEventListener("click", () => {
    if (audio3.paused) {
      audio3.play();
      playIcon3.style.display = "none";
      pauseIcon3.style.display = "inline-block";
    } else {
      audio3.pause();
      pauseIcon3.style.display = "none";
      playIcon3.style.display = "inline-block";
    }
});
// Functions for audio player controls
playPause4.addEventListener("click", () => {
    if (audio4.paused) {
      audio4.play();
      playIcon4.style.display = "none";
      pauseIcon4.style.display = "inline-block";
    } else {
      audio4.pause();
      pauseIcon4.style.display = "none";
      playIcon4.style.display = "inline-block";
    }
});
// Functions for audio player controls
playPause5.addEventListener("click", () => {
    if (audio5.paused) {
      audio5.play();
      playIcon5.style.display = "none";
      pauseIcon5.style.display = "inline-block";
    } else {
      audio5.pause();
      pauseIcon5.style.display = "none";
      playIcon5.style.display = "inline-block";
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
// Get the necessary elements
const audioElement2 = document.getElementById('audio2');
const progressBarFill2 = document.getElementById('progress-bar-fill2');

// Add an event listener to update the progress bar
audioElement2.addEventListener('timeupdate', () => {
  // Calculate the progress percentage
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  
  // Update the width of the progress bar fill
  progressBarFill2.style.width = `${progress}%`;
});
// Get the necessary elements
const audioElement3 = document.getElementById('audio3');
const progressBarFill3 = document.getElementById('progress-bar-fill3');

// Add an event listener to update the progress bar
audioElement3.addEventListener('timeupdate', () => {
  // Calculate the progress percentage
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  
  // Update the width of the progress bar fill
  progressBarFill3.style.width = `${progress}%`;
});
// Get the necessary elements
const audioElement4 = document.getElementById('audio4');
const progressBarFill4 = document.getElementById('progress-bar-fill4');

// Add an event listener to update the progress bar
audioElement4.addEventListener('timeupdate', () => {
  // Calculate the progress percentage
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  
  // Update the width of the progress bar fill
  progressBarFill4.style.width = `${progress}%`;
});
// Get the necessary elements
const audioElement5 = document.getElementById('audio5');
const progressBarFill5 = document.getElementById('progress-bar-fill5');

// Add an event listener to update the progress bar
audioElement5.addEventListener('timeupdate', () => {
  // Calculate the progress percentage
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  
  // Update the width of the progress bar fill
  progressBarFill5.style.width = `${progress}%`;
});

document.getElementById("nextButton").onclick = function () {
  
  const formData = new FormData(form);
  const formData2 = new FormData(form2);
  const formData3 = new FormData(form3);
  const formData4 = new FormData(form4);
  const formData5 = new FormData(form5);
  // Convert formData to JSON format
  const object = {};
  formData.forEach(function(value, key){
      object[key.concat('fp')] = audio.src;
      object[key] = value;
       
  });
  formData2.forEach(function(value, key){
      object[key.concat('fp')] = audio2.src;
      object[key] = value;
  });
  formData3.forEach(function(value, key){
      object[key.concat('fp')] = audio3.src;
      object[key] = value;
  });
  formData4.forEach(function(value, key){
      object[key.concat('fp')] = audio4.src;
      object[key] = value;
  });
  formData5.forEach(function(value, key){
      object[key.concat('fp')] = audio5.src;
      object[key] = value;
  });
  //get the UserID cookie
  object['userID'] = getCookie("userID");

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
    response.json().then(body => console.log(body)|| body);
  });

  // Increase the iteration count by 1
  const iterationCount = parseInt(getCookie("iterationCount") || "1");
  setCookie("iterationCount", (iterationCount + 1).toString(), 1); // Set the cookie for 1 day
  console.log(iterationCount);
  if (iterationCount < 10) {
    // Redirect the user to the same page
    window.location.href = "rate1.html";
  } else {
    // Redirect the user to the "finished" page and reset the iteration count
    setCookie("iterationCount", "1  ", 2);
    window.location.href = "finished.html";
  }
};

const extractPath = (str) => {
  const startIndex = str.indexOf('stimuli');
  return str.substring(startIndex);
};

// Function to load audios
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
  console.log(result);

  audio.src = extractPath(result['A']);
  audio2.src = extractPath(result['B']);
  audio3.src = extractPath(result['C']);
  audio4.src = extractPath(result['D']);
  audio5.src = extractPath(result['E']);
  return result;
}

window.onload = loadAudios;
const iterationCount = parseInt(getCookie("iterationCount") || "1");
console.log(iterationCount);
console.log("Audios loaded");

