class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.KickAudio = document.querySelector(".kick-sound");
        this.SnareAudio = document.querySelector(".snare-sound");
        this.hiHatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 105;
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        console.log(step);
        this.index++;
    }
    start() {
        console.log(start);
        const interval = (60 / this.bpm) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval);
    }
}
const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
    pad.addEventListener("click", drumKit.activePad);
});
drumKit.playBtn.addEventListener("click", function () {
    drumKit.start();
});
