const circleBorder = document.querySelector('#circle-border');
const circle = document.querySelector('#circle');
const animateContainer = document.querySelector('.animate-container');
const pointerContainer = document.querySelector('.pointer-container');
const timeToggleButton = document.getElementsByClassName('time-toggle-button')[0]
const ambientToggleButton = document.getElementsByClassName('ambient-toggle-button')[0]
const timeNavbarLinks = document.getElementsByClassName('time-navbar-links')[0]
const ambientNavbarLinks = document.getElementsByClassName('ambient-navbar-links')[0]
const breatheINTextAnimation = document.querySelector(".breatheIN-text-animation");
const holdTextAnimation = document.querySelector(".hold-text-animation");
const breatheOutTextAnimation = document.querySelector(".breatheOUT-text-animation");







timeToggleButton.addEventListener('click', () => {
    timeNavbarLinks.classList.toggle('active')
})

ambientToggleButton.addEventListener('click', () => {
    ambientNavbarLinks.classList.toggle('active')
});
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const video = document.getElementById('video');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#lcurrTime');
const durTime = document.querySelector('#durTime');
const breatheOutTEXT = document.getElementById("breatheOUT");
const holdTEXT = document.getElementById("hold");

// Song titles
const songs = ['bonfire', 'sun', 'rain'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `svg/${song}.svg`;
    video.src = `video/${song}.mp4`;
}

playBtn.addEventListener("click", function() {

    pointerContainer.style.transformOrigin = "bottom center";
    pointerContainer.style.animation = "rotate 12s linear forwards infinite";
    document.getElementById("starter-text").style.visibility = "hidden";

    startBreathing();

}, { once: true });



// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    circle.style.animationPlayState = "running";
    circleBorder.style.animationPlayState = "running";
    animateContainer.style.animationPlayState = "running";
    pointerContainer.style.animationPlayState = "running";


    breatheINTextAnimation.style.animationPlayState = "running";
    holdTextAnimation.style.animationPlayState = "running";
    breatheOutTextAnimation.style.animationPlayState = "running";


    audio.play();
    video.play();

}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    circle.style.animationPlayState = "paused";
    circleBorder.style.animationPlayState = "paused";
    animateContainer.style.animationPlayState = "paused";
    pointerContainer.style.animationPlayState = "paused";


    breatheINTextAnimation.style.animationPlayState = "paused";
    holdTextAnimation.style.animationPlayState = "paused";
    breatheOutTextAnimation.style.animationPlayState = "paused";

    audio.pause();
    video.pause();
}

var ended = 0;
var testEl = $('#circle')
testEl.on('webkitAnimationEnd oanimationend msAnimationEnd animationend ', function() {
    ended++;
    if (ended % 3 === 0) {
        startBreathing();
    }
});




function startBreathing() {

    if ($("#circle").hasClass("animate"))
        $("#circle").removeClass("animate");
    $("#circle").width();
    $("#circle").addClass("animate");

    if ($("#circle-border").hasClass("animate"))
        $("#circle-border").removeClass("animate");
    $("#circle-border").width();
    $("#circle-border").addClass("animate");

    if ($(".animate-container").hasClass("animate"))
        $(".animate-container").removeClass("animate");
    $(".animate-container").width();
    $(".animate-container").addClass("animate");

    if ($("#breatheIN").hasClass("breatheIN-text-animation"))
        $("#breatheIN").removeClass("breatheIN-text-animation");
    $("#breatheIN").width();
    $("#breatheIN").addClass("breatheIN-text-animation");


    if ($("#hold").hasClass("hold-text-animation"))
        $("#hold").removeClass("hold-text-animation");
    $("#hold").width();
    $("#hold").addClass("hold-text-animation");

    if ($("#breatheOUT").hasClass("breatheOUT-text-animation"))
        $("#breatheOUT").removeClass("breatheOUT-text-animation");
    $("#breatheOUT").width();
    $("#breatheOUT").addClass("breatheOUT-text-animation");




}



// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);


}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);


}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = (currentTime == null) ? 0 :
        Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    // define seconds currentTime
    function get_sec(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    // change currentTime DOM
    currTime.innerHTML = min + ':' + sec;

    // define minutes duration
    let min_d = (isNaN(duration) === true) ? '0' :
        Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }

    // define seconds duration

    get_sec_d(duration);


    // change duration DOM
    // durTime.innerHTML = min_d + ':' + sec_d;

};

// Event listeners


playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);