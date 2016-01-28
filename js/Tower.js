class Tower extends GameObject {

    constructor(game) {
        super(game);

        this.addChildren(BABYLON.MeshBuilder.CreateBox('tower', {width:1, height:2, depth:1}, this.getScene()));

        this.radius = 5;

        let radiusSphere = BABYLON.Mesh.CreateSphere('radius', 16,this.radius*2, this.getScene());
        radiusSphere.material = new BABYLON.StandardMaterial('', this.getScene());
        radiusSphere.material.alpha = 0.2;
        radiusSphere.material.emissiveColor = BABYLON.Color3.Blue();

        radiusSphere.parent = this;

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

}