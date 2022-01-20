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
