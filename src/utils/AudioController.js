import { Audio } from "expo-av"

import bgMusic from '../../assets/audio/music.mp3'
import flipSound from '../../assets/audio/flip.wav'
import matchSound from '../../assets/audio/match.wav'
import victorySound from '../../assets/audio/victory.wav'
import gameOverSound from '../../assets/audio/gameover.wav'


class AudioController {

    constructor() {

        this.bgMusic = new Audio.Sound()
        this.flipSound = new Audio.Sound()
        this.matchSound = new Audio.Sound()
        this.victorySound = new Audio.Sound()
        this.gameOverSound = new Audio.Sound()
    }

    
    loadAndPlay = async (audioObject, audioFile, loop = false, volume = 1.0) => {

        try {
            await audioObject.loadAsync(audioFile);
            audioObject.setIsLoopingAsync(loop);
            audioObject.setVolumeAsync(volume);
            await audioObject
                .playAsync()
                .then(async playbackStatus => {

                    if (!loop) {
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


    playBgMusic = async () => {
        await this.loadAndPlay(this.bgMusic, bgMusic, true, 0.5); // Loop and set the volume to 50%
    }


    stopBgMusic = async () => {
        try {
            console.log("stopping background music")
            await this.bgMusic.stopAsync();
            await this.bgMusic.unloadAsync();
        } catch (error) {
            console.log(error);
        }
    }

    unloadBgMusic = async () => {
        try {
            console.log("cleaning up background music")
            await this.bgMusic.unloadAsync();
        } catch (error) {
            console.log(error);
        }
    }

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