import { getCookie } from "./cookies.js";
import { url } from "./config.js";

var text_page_load = new Date().toISOString().slice(0, 19).replace('T', ' ');
var text_start;

const sendButton = document.getElementById("sendButton");

var timeleft = 180; // 3 minutos
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Tiempo finalizado.";
    document.getElementById('text_input').disabled = true;
    // tiempito
    //window.location.href = "finalize1.html";
  } else {
    if(timeleft <= 60){
    document.getElementById("countdown").innerHTML = "Quedan " + timeleft + " segundos para escribir";
    }
  }
  timeleft -= 1;
}, 1000);

const saveText = (e) => {
  e.preventDefault();
  const text_submit = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const text = document.getElementById('text_input').value;
  const object = {};
  object['id_participant'] = getCookie('id_participant');
  object['id_melody'] = getCookie('id_melody');
  object['iteration'] = getCookie('iteration');
  object['melody_order'] = 1;
  object['text_input'] = text;
  object['text_page_load'] = text_page_load;
  object['text_start'] = text_start;
  if (text_start === undefined){ // if text_start is undefined, set text_start as text_submit
    object['text_start'] = text_submit; 
  };
  console.log(object['text_start']);
  object['text_submit'] = text_submit;

  const textJSON = JSON.stringify(object);
  console.log(textJSON);

  async function query(text_data) {
    const response = await fetch(
        //"http://localhost:8000/profiles_api/receive_text/",
        url + "/profiles_api/receive_text/",
        {
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: "POST",
            body: text_data,
        }
    );
    //const result = await response.json();
    const result = await response;
    return result;
}

query(textJSON).then((response) => {
    //console.log(JSON.stringify(response));
    //console.log(response.json());
    response.json().then(body => console.log(body));
});
  window.location.href = "finalize1.html"
  
}

var eventHandler = function(event){
  text_start = new Date().toISOString().slice(0, 19).replace('T', ' ');
  //alert(`Text start timestamp: ${text_start}`);
  document.getElementById('text_input').removeEventListener('keypress', eventHandler);
}

document.getElementById('text_input').addEventListener('keypress', eventHandler);
document.getElementById('sendButton').addEventListener('click', saveText);
