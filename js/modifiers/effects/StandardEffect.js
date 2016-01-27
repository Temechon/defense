/**
 * A standard effect does nothing
 */
class StandardEffect extends Effect {

    constructor(scene) {
        super(scene);
    }

    /**
     * Method updating the bullet : color change, shape change...
     */
    affectBullet(bullet) {
        // update bullet color
    }

    /**
     * The fire effect double the damage done to the enmy
     */
    affectEnemy(damage, enemy) {
        return damage;
    }

    upgrade() {
    }
}