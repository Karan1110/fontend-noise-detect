const SoundDetection = require("sound-detection")
const options = {
  url: "http://babymonitorcam/audio.cgi",
  triggerLevel: 30,
}
const detector = new SoundDetection(options)
detector
  .start()
  .then((dB) => console.log("Noise Detected at %sdB", dB))
  .catch((err) => console.log(err))
