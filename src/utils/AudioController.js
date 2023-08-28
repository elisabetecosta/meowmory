// Import the Audio module from Expo AV for handling audio playback
import { Audio } from "expo-av"

// Import audio files used in the game
import bgMusic from '../../assets/audio/music.mp3'
import flipSound from '../../assets/audio/flip.wav'
import matchSound from '../../assets/audio/match.wav'
import victorySound from '../../assets/audio/victory.wav'
import gameOverSound from '../../assets/audio/gameover.wav'


// Create a class for managing audio playback in the game
class AudioController {

    constructor() {

        // Initialize Audio objects for different sounds
        this.bgMusic = new Audio.Sound()
        this.flipSound = new Audio.Sound()
        this.matchSound = new Audio.Sound()
        this.victorySound = new Audio.Sound()
        this.gameOverSound = new Audio.Sound()
    }

    
    // Method for loading and playing an audio file with optional parameters
    loadAndPlay = async (audioObject, audioFile, loop = false, volume = 1.0) => {

        try {
            // Load the specified audio file into the provided audioObject
            await audioObject.loadAsync(audioFile);

            // Set looping and volume settings for the audio
            audioObject.setIsLoopingAsync(loop);
            audioObject.setVolumeAsync(volume);

            // Play the audio and manage unloading for non-looping sounds
            await audioObject
                .playAsync()
                .then(async playbackStatus => {

                    if (!loop) {

                        // Unload the audio file after its playback is finished
                        setTimeout(() => {
                            audioObject.unloadAsync()
                        }, playbackStatus.playableDurationMillis)
                    }


                })
                .catch(error => {
                    console.log(error)
                })

        } catch (error) {
            console.log(error);
        }
    }


    // Method for playing background music with loop and volume settings
    playBgMusic = async () => {

        // Loop and set the volume to 50%
        await this.loadAndPlay(this.bgMusic, bgMusic, true, 0.5); 
    }


    // Method for stopping and unloading background music
    stopBgMusic = async () => {
        try {
            console.log("stopping background music")
            await this.bgMusic.stopAsync();
            await this.bgMusic.unloadAsync();
        } catch (error) {
            console.log(error);
        }
    }


    // Methods for playing various game sounds (flip, match, victory and game over)
    playFlipSound = async () => {
        await this.loadAndPlay(this.flipSound, flipSound);
    }

    playMatchSound = async () => {
        await this.loadAndPlay(this.matchSound, matchSound);
    }

    playVictorySound = async () => {
        await this.loadAndPlay(this.victorySound, victorySound);
    }

    playGameOverSound = async () => {
        await this.loadAndPlay(this.gameOverSound, gameOverSound);
    }
}


export default AudioController