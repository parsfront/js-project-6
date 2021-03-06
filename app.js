class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kurrentKick = "./sounds/kick-classic.wav";
        this.kurrentSnare = "./sounds/snare-acoustic01.wav";
        this.kurrentHihat = "./sounds/hihat-acoustic01.wav";
        this.KickAudio = document.querySelector(".kick-sound");
        this.SnareAudio = document.querySelector(".snare-sound");
        this.hiHatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop over the pads
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //check if pads are active
            if (bar.classList.contains("active")) {
                //check each sound
                if (bar.classList.contains("kick-pad")) {
                    this.KickAudio.currentTime = 0;
                    this.KickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.SnareAudio.currentTime = 0;
                    this.SnareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hiHatAudio.currentTime = 0;
                    this.hiHatAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        //check if its playing
        //Null
        if (this.isPlaying) {
            //clear the interval
            clearInterval(this.isPlaying);
            console.log(this.isPlaying);
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    updateBtn() {
        //Null
        if (!this.isPlaying) {
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case "kick-select":
                this.KickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.SnareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hiHatAudio.src = selectionValue;
                break;
        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.KickAudio.volume = 0;
                    break;
                case "1":
                    this.SnareAudio.volume = 0;
                    break;
                case "2":
                    this.hiHatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case "0":
                    this.KickAudio.volume = 1;
                    break;
                case "1":
                    this.SnareAudio.volume = 1;
                    break;
                case "2":
                    this.hiHatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector(".tempo-nr");
        tempoText.innerText = e.target.value;
    }
    updateTempo(e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}
const drumKit = new DrumKit();

//event listeners

drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});
drumKit.playBtn.addEventListener("click", function () {
    drumKit.updateBtn();
    drumKit.start();
});
drumKit.selects.forEach((select) => {
    select.addEventListener("change", (e) => {
        drumKit.changeSound(e);
    });
});
drumKit.muteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        drumKit.mute(e);
    });
});
drumKit.tempoSlider.addEventListener("input", (e) => {
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", (e) => {
    drumKit.updateTempo(e);
});
