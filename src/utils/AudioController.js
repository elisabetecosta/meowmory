// import Sound from "react-native-sound"

class AudioController {
    
    constructor() {
        
        Sound.setCategory('Playback'); // Set audio category for background playback

        this.bgMusic = new Sound('../../assets/audio/music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Error loading background music:', error);
            }
        });

        this.bgMusic.setVolume(0.5);
        this.bgMusic.setNumberOfLoops(-1); // Infinite loop

        this.flipSound = new Sound('../../assets/audio/flip.wav', Sound.MAIN_BUNDLE);
        this.matchSound = new Sound('../../assets/audio/match.wav', Sound.MAIN_BUNDLE);
        this.victorySound = new Sound('../../assets/audio/victory.wav', Sound.MAIN_BUNDLE);
        this.gameOverSound = new Sound('../../assets/audio/gameover.wav', Sound.MAIN_BUNDLE);
    }

    // Start playing background music
    startMusic = () => {
        this.bgMusic.play();
    }

    // Stop playing background music and reset to the beginning
    stopMusic = () => {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }

    // Play flip sound
    flip = () => {
        this.flipSound.play();
    }

    // Play match sound
    match = () => {
        this.matchSound.play();
    }

    // Play victory sound and stop background music
    victory = () => {
        this.stopMusic();
        this.victorySound.play();
    }

    // Play game over sound and stop background music
    gameOver = () => {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

export default AudioController