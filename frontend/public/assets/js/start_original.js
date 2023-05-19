import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

const form = document.getElementById("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    //console.log([...formData]);
    // Convert formData to JSON format
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(id_data) {
        const response = await fetch(
            //"http://localhost:8000/profiles_api/receive_id/",
            url + "/profiles_api/receive_id/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: id_data,
            }
        );
        //const result = await response.json();
        const result = await response;
        return result;
    }

    query(formJSON).then((response) => {
        //console.log(JSON.stringify(response));
        //console.log(response.json());
        response.json().then(body => console.log(body) || body)
        .then(body => setCookie('id_participant', body['id_participant'], 1) || body)
        .then(body => setCookie('id_exists', body['id_exists'], 1) || body)
        //.then(body => setCookie('id_melody_set', body['id_melody_set'], 1) || body)
        //.then(body => setCookie('iteration', body['iteration'], 1) || body)
        //.then(body => window.location.href = "form.html?" + getCookie('id_participant'))
        .then(body => checkID(body['id_exists']))
    });
    
});

function checkID(id_exists) {
    console.log(id_exists);
    if (id_exists) {
        window.location.href = "checkID.html?" + getCookie('id_participant');
    } else {
        window.location.href = "form.html?" + getCookie('id_participant');
    }
  }