window.addEventListener('DOMContentLoaded', () => {
    const audioControls = document.querySelectorAll('.audio-control');
    const nextButton = document.getElementById('next-button');
    
    let soundIndex = 0;
    const soundFiles = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3', 'sound4.mp3', 'sound5.mp3'];
    
    function loadSound(element) {
        const audioPlayer = element.querySelector('.audio-player');
        const startButton = element.querySelector('.start-button');
        const stopButton = element.querySelector('.stop-button');
        const progressBar = element.querySelector('.progress-bar');
        
        const soundFile = soundFiles[soundIndex];
        audioPlayer.src = soundFile;
        audioPlayer.load();
        
        startButton.addEventListener('click', () => {
            audioPlayer.play();
        });
        
        stopButton.addEventListener('click', () => {
            audioPlayer.pause();
        });
        
        audioPlayer.addEventListener('timeupdate', () => {
            const duration = audioPlayer.duration;
            const currentTime = audioPlayer.currentTime;
            const progress = (currentTime / duration) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
    
    function saveRating(element) {
        const ratingSelect = element.querySelector('.rating');
        const rating = ratingSelect.value;
        
        // Send an AJAX request to your backend to save the rating
        // Example using fetch:
        fetch('/save-rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        })
        .then(response => {
            // Handle the response
            // For example, show a success message or move to the next sound
            soundIndex++;
            if (soundIndex < soundFiles.length) {
                loadSound(element);
            } else {
                alert('Thank you for rating all the sounds!');
                // Redirect or perform any other action after rating all sounds
            }
        })
        .catch(error => {
            // Handle the error
            console.error('Error saving rating:', error);
            // Display an error message or retry the request
        });
    }
    
    audioControls.forEach(control => {
        const nextButton = control.querySelector('.next-button');
        nextButton.addEventListener('click', () => {
            saveRating(control);
        });
        
        loadSound(control);
    });
});
