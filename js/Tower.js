class Tower extends GameObject {

    constructor(game) {
        super(game);

        this.addChildren(BABYLON.MeshBuilder.CreateBox('tower', {width:1, height:2, depth:1}, this.getScene()));

        this.radius = 5;

        let mat = this.getScene().getMaterialByName('radiusDecal');
        if (!mat) {
            mat = new BABYLON.StandardMaterial('radiusDecal', this.getScene());
            mat.emissiveTexture = new BABYLON.Texture('assets/radius.png' ,this.getScene());
            mat.opacityTexture = mat.emissiveTexture;
            mat.emissiveTexture.hasAlpha = true;
            mat.zOffset = -1;
        }

        // Create radius decal
        let ground = this.getScene().getMeshByName('ground');
        this.radiusDecal = BABYLON.Mesh.CreateDecal("decal", ground, this.position, BABYLON.Vector3.Up(), new BABYLON.Vector3(10,10,10));
        this.radiusDecal.material = mat;
        this.radiusDecal.parent = this;
        this.radiusDecal.isVisible = false;

        this._attackList = [];

        // This tower will shoot every xx ms
        this.shootCadency = 500;

        this.timer = new Timer(this.shootCadency, this.getScene(), {repeat:-1, autostart:true});
        this.timer.callback = () => {
            this.attack();
        };

        //this.modifier = new ThunderEffect(this.getScene());
        this.modifier = new StandardEffect(this.getScene());

        this.generator = new DoubleShoot(this.game, this.shootCadency);

        // set tags as tower
        BABYLON.Tags.AddTagsTo(this, 'tower');

    }

    isInRadius(enemy) {
        return BABYLON.Vector3.DistanceSquared(enemy.position, this.position) < (this.radius*this.radius);
    }

    /**
     * Add to attack list if not already present
     * @param enemy
     */
    addToAttackList(enemy) {
        let index = this._attackList.indexOf(enemy);
        if (index == -1) {
            this._attackList.push(enemy);
        }
    }

    removeFromAttackList(enemy) {
        let index = this._attackList.indexOf(enemy);
        if (index > -1) {
            this._attackList.splice(index, 1);
        }
    }

    attack() {
        if (this._attackList.length > 0) {
            let enemyPos = this._attackList[0].position;
            let pos = this.position.clone();
            pos.y = 1;
            this.generator.generate(pos, enemyPos, this.radius, 10, this.modifier);
        }
    }

    // Called when this tower is clicked
    highlight() {
        this.radiusDecal.isVisible = true;
    }

    // Called when this tower is not clicked anymore
    unhighlight() {
        this.radiusDecal.isVisible = false;
    }



}