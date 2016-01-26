class Bullet extends GameObject {

    constructor(game, position, destination, distancemax, damage) {
        super(game);

        this.addChildren(BABYLON.Mesh.CreateBox('bullet', 0.2, this.getScene()));

        this.position       = position;
        this._lastPosition  = position.clone();
        this._startingPosition = position.clone();
        this.destination    = destination;

        // direction
        this._direction     = destination.subtract(this.position);
        this._direction.y = 0;
        this._direction.normalize().scaleInPlace(0.20);


        this.distanceMax = distancemax*distancemax;

        // The predicate to collide only against enemies
        this.predicate = function(m) {
            return BABYLON.Tags.MatchesQuery(m, 'enemy');
        };


        this.damage = damage;

        this._move = this.move.bind(this);

        this.getScene().registerBeforeRender(this._move);
    }

    move() {
        // Increase position
        this.position.addInPlace(this._direction);
        if (BABYLON.Vector3.DistanceSquared(this._startingPosition, this.position) > this.distanceMax) {
            this.dispose();
        }
        // Throw ray between last position and position to check if there is an intersection
        let vec = this.position.subtract(this._lastPosition);
        let length = vec.length();
        vec.normalize();

        let res = this.getScene().pickWithRay(new BABYLON.Ray(this._lastPosition, vec, length), this.predicate, false);
        if (res.hit) {
            res.pickedMesh.parent.dispose();
            this.dispose();
        }


        this._lastPosition.copyFrom(this.position);
    }

    dispose() {
        this.getScene().unregisterBeforeRender(this._move);
        super.dispose();
    }
}