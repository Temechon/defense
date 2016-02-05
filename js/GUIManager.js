class GUIManager {

    constructor(game) {
        this.game = game;

        this.level          = document.getElementById('level');
        this.gold           = document.getElementById('gold');
        this.numberEnemies  = document.getElementById('number');

        // The 'buy tower' icon
        this.buy            = document.getElementById('buy');
        this.addAction(this.buy, () => {
            this.game.buyTower();
        });

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

    addAction(element, callback) {
        let eventPrefix = BABYLON.Tools.GetPointerPrefix();
        element.addEventListener(eventPrefix + "down", callback);
    }
}