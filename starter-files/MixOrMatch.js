import { AudioController } from "./AudioController.js"

class MixOrMatch {
    constructor(level) {

        this.cardsImagesArray = [
            { name: 'card-01', path: 'Assets/Images/card-01.png' },
            { name: 'card-02', path: 'Assets/Images/card-02.png' },
            { name: 'card-03', path: 'Assets/Images/card-03.png' },
            { name: 'card-04', path: 'Assets/Images/card-04.png' },
            { name: 'card-05', path: 'Assets/Images/card-05.png' },
            { name: 'card-06', path: 'Assets/Images/card-06.png' },
            { name: 'card-01', path: 'Assets/Images/card-01.png' },
            { name: 'card-02', path: 'Assets/Images/card-02.png' },
            { name: 'card-03', path: 'Assets/Images/card-03.png' },
            { name: 'card-04', path: 'Assets/Images/card-04.png' },
            { name: 'card-05', path: 'Assets/Images/card-05.png' },
            { name: 'card-06', path: 'Assets/Images/card-06.png' }
        ]

        this.level = level
        this.totalTime = this.setTimer()
        this.timeRemaining = this.totalTime
        this.timer = document.getElementById('time-remaining')
        this.flips = document.getElementById('flips')
        this.audioController = new AudioController()
    }


    setTimer() {
        if (this.level === 'easy') return 100
        if (this.level === 'medium') return 60
        if (this.level === 'hard') return 30
    }

    startGame() {

        this.cardsArray = []
        this.selectedCards = []
        this.selectedCardsIds = []
        this.matchedCards = []
        this.totalClicks = 0
        this.timeRemaining = this.totalTime
        this.busy = true

        this.clearCards()
        this.createCards()
        this.shuffleCards()
        this.audioController.startMusic()

        setTimeout(() => {
            this.countdown = this.startCountdown()
            this.busy = false
        }, 500)

        this.timer.innerText = this.timeRemaining
        this.flips.innerText = this.totalClicks
    }


    createCards() {
        const gameContainer = document.querySelector('.game-container')

        for (let i = 0; i < this.cardsImagesArray.length; i++) {

            const card = document.createElement('div')
            card.classList.add('card')
            card.setAttribute('data-id', i)

            
            const cardBack = document.createElement('div')
            cardBack.classList.add('card-back', 'card-face')
            const cardBackImg = document.createElement('img')
            cardBackImg.setAttribute('src', 'Assets/Images/card-back.png')

            const cardFront = document.createElement('div')
            cardFront.classList.add('card-front', 'card-face')
            const cardFrontImg = document.createElement('img')
            cardFrontImg.setAttribute('src', this.cardsImagesArray[i].path)
            cardFrontImg.classList.add('card-value')

            cardBack.append(cardBackImg)
            cardFront.append(cardFrontImg)
            card.append(cardBack, cardFront)
            gameContainer.append(card)

            this.cardsArray.push(card)
        }

        this.clickCards()
    }


    clickCards() {
        this.cardsArray.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card))
        })
    }


    shuffleCards() {
        this.cardsImagesArray.sort(() => Math.random() - 0.5)
    }


    startCountdown() {

        return setInterval(() => {
            this.timeRemaining--
            this.timer.innerText = this.timeRemaining

            if (this.timeRemaining === 0) {
                this.gameOver()
            }
        }, 1000)
    }


    flipCard(card) {

        if (this.canFlipCard(card)) {

            const cardId = card.getAttribute('data-id')

            if (this.selectedCards.length < 2 && !this.selectedCardsIds.includes(cardId)) {

                this.selectedCards.push(this.cardsImagesArray[cardId].name)
                this.selectedCardsIds.push(cardId)

                card.querySelector('.card-value').setAttribute('src', this.cardsImagesArray[cardId].path)
            }

            this.audioController.flip()
            this.totalClicks++
            this.flips.innerText = this.totalClicks
            card.classList.add('visible')
        }

        if (this.selectedCards.length === 2) {

            setTimeout(() => this.checkForCardMatch(), 500)
        }

        if (this.level === 'hard' && this.totalClicks > 20) this.gameOver()
    }


    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && this.selectedCards.length < 2
    }


    checkForCardMatch() {
        const firstCardId = this.selectedCardsIds[0]
        const secondCardId = this.selectedCardsIds[1]

        if (this.selectedCards[0] === this.selectedCards[1]) {

            this.cardsArray[firstCardId].classList.add('matched')
            this.cardsArray[secondCardId].classList.add('matched')

            this.matchedCards.push(this.selectedCards)
            this.audioController.match()

        } else {

            this.busy = true

            setTimeout(() => {
                this.cardsArray[firstCardId].classList.remove('visible')
                this.cardsArray[secondCardId].classList.remove('visible')
                this.busy = false
            }, 1000)
        }

        this.selectedCards = []
        this.selectedCardsIds = []

        if (this.matchedCards.length === this.cardsArray.length / 2) {
            this.victory()
        }
    }


    clearCards() {
        const cards = document.querySelectorAll('.card')
        cards.forEach(card => {
            card.remove();
        })
    }


    gameOver() {
        clearInterval(this.countdown)
        this.audioController.gameOver()
        document.getElementById('game-over-screen').classList.add('visible')
    }


    victory() {
        clearInterval(this.countdown)
        this.audioController.victory()
        document.getElementById('victory-screen').classList.add('visible')
    }
}

export { MixOrMatch }