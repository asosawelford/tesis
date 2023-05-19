//initialize elements we'll use
const playButton = document.getElementById('playButton');
const playButtonImage = playButton.firstElementChild;
//const recordedAudioContainer = document.getElementById('recordedAudioContainer');


const sound    = document.createElement('audio');
sound.id       = 'audio-player';
//sound.controls = 'controls';
sound.src      = 'music/IONIAN_1.mp3';
sound.type     = 'audio/mpeg';
//sound.autoplay = true;
//document.getElementById('song').appendChild(sound);

//let mediaStream = null; //will be used later to play audio
//let audioBlob = null; //the blob that will hold the selected audio

function play() {
    //check if browser supports getUserMedia
    //if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    //    alert('El navegador o dispositivo no permite acceso al micrófono.');
    //    return;
    //}
    // browser supports getUserMedia
    // change image in button
    //playButtonImage.src = `/images/${mediaStream && mediaStream.state === 'playing' ? 'play' : 'stop'}.png`;
    //if (!mediaStream) {
        // start playing
    //    navigator.mediaDevices.getUserMedia({
    //    audio: true,
    //    })
    //   .then((stream) => {
    //        mediaStream = new MediaStream(stream);
    //        mediaStream.addTrack()
    //        mediaStream.start();
    //        //mediaStream.ondataavailable = mediaRecorderDataAvailable;
    //        mediaStream.onstop = mediaRecorderStop;
    //    })
    //    .catch((err) => {
    //        alert(`The following error occurred: ${err}`);
    //        // change image in button
    //        playButtonImage.src = '/images/play.png';
    //    });
    //} else {
        // stop playing
    //    mediaStream.stop();
    //}
    
    //create a new audio element that will hold the recorded audio
    //const audioElm = document.createElement('audio');
    //audioElm.setAttribute('controls', ''); //add controls
    //create the Blob from the chunks
    //audioBlob = new Blob(chunks, { type: 'audio/mp3' });
    //const audioURL = window.URL.createObjectURL(audioBlob);
    //audioElm.src = audioURL;
    
    // check if audio is playing
    if (sound.duration > 0 && !sound.paused) {
        sound.pause();
        sound.currentTime = 0;
        playButtonImage.src = '/images/play.png';
    } else {
        // // change image in button
        playButtonImage.src = '/images/stop.png';
        // play audio
        sound.load()
        sound.play()
    }

    //show audio
    //recordedAudioContainer.insertBefore(sound, recordedAudioContainer.firstElementChild);
    //recordedAudioContainer.classList.add('d-flex');
    //recordedAudioContainer.classList.remove('d-none');
    //reset to default
    //mediaStream = null;
    //chunks = [];
}

playButton.addEventListener('click', play);

sound.onended = function() {
    alert("El audio a finalizado. Redirigiendo a la página de grabación...");
    window.location.href = "record.html";
};