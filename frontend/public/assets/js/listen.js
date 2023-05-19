import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";

const id_melody_set = getCookie('id_melody_set');
const iteration = getCookie('iteration');
const melody_order = 1;
const iteration_mod = iteration % 3 || 3;  // This sets iteration interval between 1 and 3 always

// Get id_melody and set sound source
fetch('melody_set.csv')
  .then(response => response.text())
  .then(text => {
    let column_name = "_".concat(id_melody_set);
    let row_number = (2 * iteration_mod - 2) + melody_order - 1;
    const data = Papa.parse(text, { header: true }).data;
    const id_melody = data[row_number][column_name];
    setCookie('id_melody', id_melody);
    sound.src = "music/".concat(id_melody,".mp3");
    console.log(sound.src);
  });

const sound = document.createElement('audio');
sound.id       = 'audio-player';
sound.type     = 'audio/mpeg';
sound.volume   = getCookie("userVolume");

var timeleft = 3;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Reproduciendo...";
    // play audio
    sound.load()
    sound.play()
  } else {
    document.getElementById("countdown").innerHTML = "La melodía comienza en " + timeleft + " segundos";
  }
  timeleft -= 1;
}, 1000);

sound.onended = function() {
  //alert("Espere a la instrucción del guía para continuar.");
  window.location.href = "text_input.html";
};