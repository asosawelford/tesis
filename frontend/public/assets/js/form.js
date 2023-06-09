const form = document.getElementById("form");
import { url } from "./config.js";

form.addEventListener('submit', function (e) {
    e.preventDefault();
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
            url + "/tts_sorter/receive_form/",
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
        //console.log(JSON.stringify(response));
        //console.log(response.json());
        response.json().then(body => console.log(body)|| body)
        .then(body => window.location.href = "start.html");
    });

});