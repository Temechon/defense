/**
 * Represents an effect that will affect a bullet.
 */
class Effect {

    constructor(scene) {
    }

    /**
     * Method updating the bullet : color change, shape change...
     */
    affectBullet(bullet) {
        // see implementation in subclasses
    }

    /**
     * Method affecting the enemy: more damage, slow, stuns...
     * damage parameter is the initial damage, before the multiplier
     * This method should return the damage that affect the enemy
     */
    affectEnemy(damage, enemy) {
        // see implementation in subclasses
    }

    /**
     * Upgrade this effect.
     */
    upgrade() {
        // see implementation in subclasses
    }
}