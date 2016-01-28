/**
 * Thunder effect stun the enemy, but does divide the original damage by 4.
 * A bullet doesn't have any effect on an enemy already stunned.
 */
class ThunderEffect extends Effect {

    constructor(scene) {
        super(scene);

        // fire material
        let mat = scene.getMaterialByName('_thunderEffectMaterial_');
        if (!mat) {
            mat = new BABYLON.StandardMaterial('_thunderEffectMaterial_', scene);
            mat.emissiveColor = BABYLON.Color3.Yellow();
            mat.specularColor = BABYLON.Color3.Black();
        }
        this.thunderMaterial = mat;

        // The slow effect
        this.mult = 0.0;
        // The slow time in ms
        this.slowTime = 500;

        this.scene = scene;
    }

    /**
     * Method updating the bullet : color change, shape change...
     */
    affectBullet(bullet) {
        // update bullet color
        bullet.material = this.thunderMaterial;
    }

    /**
     * The fire effect double the damage done to the enmy
     */
    affectEnemy(damage, enemy) {
        enemy.speedMultiplier = this.mult;
        let t = new Timer(this.slowTime, this.scene, {autostart:true, repeat:1, autodestroy:true});
        t.callback = () => {
            enemy.speedMultiplier = 1;
        };

        return damage /4;
    }

    upgrade() {
        this.slowTime = 1000;
    }
}