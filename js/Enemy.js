class Enemy extends GameObject {

    constructor(game) {
        super(game);

        this.addChildren(BABYLON.MeshBuilder.CreateBox('box', {width:1, height:1, depth:1}, this.getScene()));

        this.getScene().registerBeforeRender(() => {

            // move
            this.move();

        });

        // enemy direction along x and Z axis
        this.direction = new BABYLON.Vector3(0,0,0);

        this._mainDirection = new BABYLON.Vector3(0,0,0);
        this._randomDirection = new BABYLON.Vector3(0,0,0);


        this.destination = new BABYLON.Vector3(20,0,20);

        this.health = 1;

        this.timer = new Timer(Game.randomInt(250,500), this.getScene(), {autostart:true, repeat:-1});
        this.timer.callback = () => {
            this.changeDirection();
        }
    }

    move() {
        this.position.addInPlace(this.direction)

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
        this.direction.normalize().scaleInPlace(0.05);


    }
}