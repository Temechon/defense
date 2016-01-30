class GUIManager {

    constructor(game) {
        this.game = game;

        this.level = document.getElementById('level');
    }

    nextLevel() {
        this.level.parentNode.classList.add('fadeout');
        setTimeout(() => {
            this.level.parentNode.classList.remove('fadeout');
        }, 500);
        this.level.innerHTML = this.game.level;
    }


}