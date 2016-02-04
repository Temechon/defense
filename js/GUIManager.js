class GUIManager {

    constructor(game) {
        this.game = game;

        this.level          = document.getElementById('level');
        this.gold           = document.getElementById('gold');
        this.numberEnemies  = document.getElementById('number');

    }

    nextLevel() {
        this.level.parentNode.classList.add('fadeout');
        setTimeout(() => {
            this.level.parentNode.classList.remove('fadeout');
        }, 500);
        this.level.innerHTML = this.game.level;
    }

    updateGui() {
        this.gold.innerHTML = this.game.gold;
        this.numberEnemies.innerHTML = this.game.enemies.length;
    }


}