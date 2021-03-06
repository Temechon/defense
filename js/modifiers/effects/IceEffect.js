/**
 * Ice effect slow the enemy, but damage are divided by 2
 */
class IceEffect extends Effect {

    constructor(scene) {
        super(scene);

        // fire material
        let mat = scene.getMaterialByName('_glassEffectMaterial_');
        if (!mat) {
            mat = new BABYLON.StandardMaterial('_glassEffectMaterial_', scene);
            mat.emissiveColor = BABYLON.Color3.Blue();
            mat.specularColor = BABYLON.Color3.Black();
        }
        this.glassMaterial = mat;

        // The slow effect
        this.mult = 0.5;
        // The slow time in ms
        this.slowTime = 1000;

        this.scene = scene;
    }

    /**
     * Method updating the bullet : color change, shape change...
     */
    affectBullet(bullet) {
        // update bullet color
        bullet.material = this.glassMaterial;
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

        return damage/2;
    }

    upgrade() {
        this.mult = this.mult/2;
    }
}