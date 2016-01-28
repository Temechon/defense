/**
 * A generator is used by a tower to generate bullets.
 */
class DoubleShoot {

    constructor(game, cadency) {
        this.game           = game;
        this._delay         = 0;
        this._towerCadency  = cadency;

        this.nbShoot        = 2;

    }

    /* GETTER SETTERS */
    set nbShoot(value) {
        this._nbShoot = value;
        this._delay = this._computeDelay();
    }
    get nbShoot() {
        return this._nbShoot;
    }

    /* METHODS */

    /**
     * Compute the generator delay between nbShoots
     * @private
     */
    _computeDelay() {
        return this._towerCadency / (this.nbShoot*2);
    }

    /**
     * Generates bullets. Should returns an array of two Bullet object
     */
    generate(position, enemyPosition, radius, damage, modifier) {

        let timer = new Timer(this._delay, this.game.scene, {
            autostart:true,
            repeat:this.nbShoot,
            immediate:true,
            autodestroy:true
        });
        timer.callback = () => {
            let b = new Bullet(this.game, position, enemyPosition, radius, damage, modifier);
            b.fire();
            console.log('fire')
        };
    }


    upgrade() {
        this.nbShoot++;
    }

}