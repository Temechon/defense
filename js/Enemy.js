class Enemy extends GameObject {

    constructor(game, health) {
        super(game);

        let b = BABYLON.MeshBuilder.CreateBox('box', {width:1, height:1, depth:1}, this.getScene());
        BABYLON.Tags.AddTagsTo(b, 'enemy');
        this.addChildren(b);

        this.position.y = 1;

        this.getScene().registerBeforeRender(() => {
            // move
            this.move();
        });

        // enemy direction along x and Z axis
        this.direction          = new BABYLON.Vector3(0,0,0);

        // Helpers to choose a random direction
        this._mainDirection     = new BABYLON.Vector3(0,0,0);
        this._randomDirection   = new BABYLON.Vector3(0,0,0);

        this.destination    = new BABYLON.Vector3(20,0,20);

        // Enemy health
        this.healthMax      = health;
        this.health         = health;
        this.healthBar      = this.createHealthBar();

        // Enemy speed
        this.speed = 1;

        // This parameter will be updated by modifiers in order to update the enemy speed.
        this.speedMultiplier = 1;

        // Every X seconds, the enemy update its position
        this.timer = new Timer(Game.randomInt(250,500), this.getScene(), {autostart:true, repeat:-1});
        this.timer.callback = () => {
            this.changeDirection();
        }
    }

    /**
     * Called in render loop. Move this enemy
     */
    move() {
        this.position.addInPlace(this.direction);
    }

    /**
     * Damage this enemy with the given value.
     * If health is below 0, kill this enemy
     * @param value
     */
    damage(value) {
        this.health -= value;
        // Compute health bar
        this.healthBar.scaling.x = this.health / this.healthMax;
        if (this.healthBar.scaling.x < 0.5) {
            this.healthBar.material.diffuseColor = BABYLON.Color3.FromInts(255, 182, 0); // orange
        }
        if (this.healthBar.scaling.x < 0.25) {
            this.healthBar.material.diffuseColor = BABYLON.Color3.Red();
        }

        if (this.health <=0 ) {
            this.dispose();
        }

    }

    /**
     * Remove this enemy from the scene and from the game
     */
    dispose() {
        this.timer.stop(true);
        // remove this enemy from the tower attack list
        this.game.removeEnemy(this);
        // dispose the health bar
        this.healthBar.dispose();
        super.dispose();
    }

    /**
     * Get a random direction, although the enemy is goind forward its destination
     */
    changeDirection() {
        // main direction
        this.destination.subtractToRef(this.position, this._mainDirection);
        this._mainDirection.normalize();

        // random direction
        this._randomDirection.copyFromFloats(Game.randomNumber(-1,1), 0, Game.randomNumber(-1,1));
        this._randomDirection.normalize().scaleInPlace(3);

        this._mainDirection.addToRef(this._randomDirection, this.direction);
        this.direction.normalize().scaleInPlace(0.05*this.speed*this.speedMultiplier);

        this.direction.y = 0;

    }

    /**
     * Create the health bar
     */
    createHealthBar() {
        let plane = BABYLON.Mesh.CreatePlane('p', 2, this.getScene());
        plane.lookAt(this.getScene().activeCamera.position);
        plane.scaling.y = 0.1;

        plane.position.z = 0.5;
        plane.position.y = 1.5;

        let mat = new BABYLON.StandardMaterial('', this.getScene());
        mat.diffuseColor = BABYLON.Color3.Green();
        mat.specularColor = BABYLON.Color3.Black();
        plane.material = mat;

        plane.parent = this;
        return plane;
    }
}