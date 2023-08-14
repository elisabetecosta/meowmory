class AudioController {
    constructor() {
        this.bgMusic = new Audio('Assets/Audio/music.mp3')
        this.bgMusic.volume = 0.5
        this.bgMusic.loop = true
        this.flipSound = new Audio('Assets/Audio/flip.wav')
        this.matchSound = new Audio('Assets/Audio/match.wav')
        this.victorySound = new Audio('Assets/Audio/victory.wav')
        this.gameOverSound = new Audio('Assets/Audio/gameover.wav')
    }

    startMusic() {
        this.bgMusic.play()
    }

    stopMusic() {
        this.bgMusic.pause()
        this.bgMusic.currentTime = 0
    }

    flip() {
        this.flipSound.play()
    }

    match() {
        this.matchSound.play()
    }

    victory() {
        this.stopMusic()
        this.victorySound.play()
    }

    gameOver() {
        this.stopMusic()
        this.gameOverSound.play()
    }
}

export { AudioController }