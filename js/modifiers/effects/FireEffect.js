class FireEffect extends Effect {

    constructor(scene) {
        super(scene);

        // fire material
        let mat = scene.getMaterialByName('_fireEffectMaterial_');
        if (!mat) {
            mat = new BABYLON.StandardMaterial('_fireEffectMaterial_', scene);
            mat.emissiveColor = BABYLON.Color3.Red();
            mat.specularColor = BABYLON.Color3.Black();
        }
        this.fireMaterial = mat;

        // The damage multiplier
        this.mult = 2;
    }

    /**
     * Method updating the bullet : color change, shape change...
     */
    affectBullet(bullet) {
        // update bullet color
        bullet.material = this.fireMaterial;
        bullet.scaling.scaleInPlace(1.5);
    }

    /**
     * The fire effect double the damage done to the enmy
     */
    affectEnemy(damage, enemy) {
        return damage*this.mult;
    }

    upgrade() {
        this.mult ++;
    }
}