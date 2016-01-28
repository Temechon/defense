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
        this.direction = new BABYLON.Vector3(0,0,0);

        this._mainDirection = new BABYLON.Vector3(0,0,0);
        this._randomDirection = new BABYLON.Vector3(0,0,0);


        this.destination = new BABYLON.Vector3(20,0,20);

        this.health = health;

        this.speed = 1;

        // This parameter will be updated by modifiers in order to update the enemy speed.
        this.speedMultiplier = 1;

        this.timer = new Timer(Game.randomInt(250,500), this.getScene(), {autostart:true, repeat:-1});
        this.timer.callback = () => {
            this.changeDirection();
        }
    }

    move() {
        this.position.addInPlace(this.direction);
    }

    /**
     * Removes value from
     * @param value
     */
    damage(value) {
        this.health -= value;
        if (this.health <=0 ) {
            this.dispose();
        }
    }

    dispose() {
        this.timer.stop(true);
        // remove this enemy from the tower attack list
        this.game.removeEnemy(this);
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
}