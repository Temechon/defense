'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = (function (_GameObject) {
        _inherits(Bullet, _GameObject);

        function Bullet(game, position, destination, distancemax, damage) {
                _classCallCheck(this, Bullet);

                _get(Object.getPrototypeOf(Bullet.prototype), 'constructor', this).call(this, game);

                this.addChildren(BABYLON.Mesh.CreateBox('bullet', 0.2, this.getScene()));

                this.position = position;
                this._lastPosition = position.clone();
                this._startingPosition = position.clone();
                this.destination = destination;

                // direction
                this._direction = destination.subtract(this.position);
                this._direction.y = 0;
                this._direction.normalize().scaleInPlace(0.20);

                this.distanceMax = distancemax * distancemax;

                // The predicate to collide only against enemies
                this.predicate = function (m) {
                        return BABYLON.Tags.MatchesQuery(m, 'enemy');
                };

                this.damage = damage;

                this._move = this.move.bind(this);

                this.getScene().registerBeforeRender(this._move);
        }

        _createClass(Bullet, [{
                key: 'move',
                value: function move() {
                        // Increase position
                        this.position.addInPlace(this._direction);
                        if (BABYLON.Vector3.DistanceSquared(this._startingPosition, this.position) > this.distanceMax) {
                                this.dispose();
                        }
                        // Throw ray between last position and position to check if there is an intersection
                        var vec = this.position.subtract(this._lastPosition);
                        var length = vec.length();
                        vec.normalize();

                        // If pick, damage this enemy
                        var res = this.getScene().pickWithRay(new BABYLON.Ray(this._lastPosition, vec, length), this.predicate, false);
                        if (res.hit) {
                                var go = res.pickedMesh.parent;
                                go.damage(this.damage);
                                this.dispose();
                        }

                        this._lastPosition.copyFrom(this.position);
                }
        }, {
                key: 'dispose',
                value: function dispose() {
                        this.getScene().unregisterBeforeRender(this._move);
                        _get(Object.getPrototypeOf(Bullet.prototype), 'dispose', this).call(this);
                }
        }]);

        return Bullet;
})(GameObject);
//# sourceMappingURL=Bullet.js.map
