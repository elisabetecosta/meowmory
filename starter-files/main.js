'use strict'

import { MixOrMatch } from "./modules/MixOrMatch.js"

function ready() {

    // Selects the DOM elements
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    const overlays = Array.from(document.getElementsByClassName('overlay-text'))

    const startButtons = document.querySelector('.start-buttons')
    const btnStart = document.getElementById('btn-start')
    const btnRules = document.getElementById('btn-rules')
    // const levelButtons = document.querySelector('.level-buttons')
    // const rules = document.querySelector('.rules')

    const btnEasy = document.getElementById('btn-easy')
    const btnMedium = document.getElementById('btn-medium')
    const btnHard = document.getElementById('btn-hard')

    // const btnNewGame = document.getElementById('btn-new-game')
    // const btnTryAgain = document.getElementById('btn-try-again')





    // Attaches event listeners to the "Close Modal" button and the overlay
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', closeModal)
    });


    // Attaches an event listener to the document for Escape key press, NOT WORKING
    // document.addEventListener('keydown', (e) => {

    //     // Checks if the Escape key was pressed and the modal is visible
    //     if (e.key === 'Escape' && !this.classList.contains('hidden')) {
    //         closeModal();
    //     }
    // });

    // Closes the Modal
    function closeModal() {

        // Checks that the required elements exist in the DOM
        if (modals) {

            // Adds the "hidden" class to the modals
            modals.forEach(modal => {
                modal.classList.add('hidden');
            })

            startButtons.classList.remove('hidden')

        } else {

            // Logs an error to the console if the required elements are not found
            console.error('Could not close modal: required elements not found.');
        }
    }


    btnStart.addEventListener('click', () => {

        const startScreen = document.querySelector('#start-screen')
        startButtons.classList.add('hidden')
        startScreen.classList.remove('hidden')
    })

    btnRules.addEventListener('click', () => {
        const rulesScreen = document.querySelector('#rules-screen')
        startButtons.classList.add('hidden')
        rulesScreen.classList.remove('hidden')
    })

    btnEasy.addEventListener('click', () => {
        const game = new MixOrMatch('easy')
        game.startGame()
        closeModal()
        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible')
            })
        })
    })

    btnMedium.addEventListener('click', () => {
        const game = new MixOrMatch('medium')
        game.startGame()
        closeModal()
        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible')
            })
        })
    })

    btnHard.addEventListener('click', () => {
        const game = new MixOrMatch('hard')
        game.startGame()
        closeModal()
        overlays.forEach(overlay => {
            overlay.addEventListener('click', () => {
                overlay.classList.remove('visible')
            })
        })
    })


    const endScreen = document.querySelector('#end-screen')

    endScreen.addEventListener('click', () => location.reload())


}






//If the page has not finished loading yet, wait for it to finish loading to call the ready function, else just call the ready function
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}