class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.KickAudio = document.querySelector(".kick-sound");
        this.SnareAudio = document.querySelector(".snare-sound");
        this.hiHatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
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
        setInterval(() => {
            this.repeat();
        }, interval);
    }
}
const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});
drumKit.playBtn.addEventListener("click", function () {
    drumKit.start();
});
