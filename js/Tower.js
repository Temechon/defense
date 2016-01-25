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

        this.getScene().registerBeforeRender(()=> {
            this.attack();
        });
    }

    isInRadius(enemy) {
        return BABYLON.Vector3.DistanceSquared(enemy.position, this.position) < (this.radius*this.radius);
    }

    addToAttackList(enemy) {
        this._attackList.push(enemy);
    }

    removeFromAttackList(enemy) {
        let index = this._attackList.indexOf(enemy);
        if (index > -1) {
            this._attackList.splice(index, 1);
        }
    }

    attack() {

    }

}