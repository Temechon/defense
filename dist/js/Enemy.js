'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = (function (_GameObject) {
        _inherits(Enemy, _GameObject);

        function Enemy(game, health) {
                var _this = this;

                _classCallCheck(this, Enemy);

                _get(Object.getPrototypeOf(Enemy.prototype), 'constructor', this).call(this, game);

                var b = BABYLON.MeshBuilder.CreateBox('box', { width: 1, height: 1, depth: 1 }, this.getScene());
                BABYLON.Tags.AddTagsTo(b, 'enemy');
                this.addChildren(b);

                this.position.y = 1;

                this.getScene().registerBeforeRender(function () {
                        // move
                        _this.move();
                });

                // enemy direction along x and Z axis
                this.direction = new BABYLON.Vector3(0, 0, 0);

                // Helpers to choose a random direction
                this._mainDirection = new BABYLON.Vector3(0, 0, 0);
                this._randomDirection = new BABYLON.Vector3(0, 0, 0);

                this.destination = new BABYLON.Vector3(20, 0, 20);

                // Enemy health
                this.healthMax = health;
                this.health = health;
                this.healthBar = this.createHealthBar();

                // Enemy speed
                this.speed = 1;

                // This parameter will be updated by modifiers in order to update the enemy speed.
                this.speedMultiplier = 1;

                // Every X seconds, the enemy update its position
                this.timer = new Timer(Game.randomInt(250, 500), this.getScene(), { autostart: true, repeat: -1 });
                this.timer.callback = function () {
                        _this.changeDirection();
                };
        }

        /**
         * Called in render loop. Move this enemy
         */

        _createClass(Enemy, [{
                key: 'move',
                value: function move() {
                        this.position.addInPlace(this.direction);
                }

                /**
                 * Damage this enemy with the given value.
                 * If health is below 0, kill this enemy
                 * @param value
                 */
        }, {
                key: 'damage',
                value: function damage(value) {
                        this.health -= value;
                        // Compute health bar
                        this.healthBar.scaling.x = this.health / this.healthMax;
                        if (this.healthBar.scaling.x < 0.5) {
                                this.healthBar.material.diffuseColor = BABYLON.Color3.FromInts(255, 182, 0); // orange
                        }
                        if (this.healthBar.scaling.x < 0.25) {
                                this.healthBar.material.diffuseColor = BABYLON.Color3.Red();
                        }

                        if (this.health <= 0) {
                                this.dispose();
                        }
                }

                /**
                 * Remove this enemy from the scene and from the game
                 */
        }, {
                key: 'dispose',
                value: function dispose() {
                        this.timer.stop(true);
                        // remove this enemy from the tower attack list
                        this.game.removeEnemy(this);
                        // dispose the health bar
                        this.healthBar.dispose();
                        _get(Object.getPrototypeOf(Enemy.prototype), 'dispose', this).call(this);
                }

                /**
                 * Get a random direction, although the enemy is goind forward its destination
                 */
        }, {
                key: 'changeDirection',
                value: function changeDirection() {
                        // main direction
                        this.destination.subtractToRef(this.position, this._mainDirection);
                        this._mainDirection.normalize();

                        // random direction
                        this._randomDirection.copyFromFloats(Game.randomNumber(-1, 1), 0, Game.randomNumber(-1, 1));
                        this._randomDirection.normalize().scaleInPlace(3);

                        this._mainDirection.addToRef(this._randomDirection, this.direction);
                        this.direction.normalize().scaleInPlace(0.05 * this.speed * this.speedMultiplier);

                        this.direction.y = 0;
                }

                /**
                 * Create the health bar
                 */
        }, {
                key: 'createHealthBar',
                value: function createHealthBar() {
                        var plane = BABYLON.Mesh.CreatePlane('p', 2, this.getScene());
                        plane.lookAt(this.getScene().activeCamera.position);
                        plane.scaling.y = 0.1;

                        plane.position.z = 0.5;
                        plane.position.y = 1.5;

                        var mat = new BABYLON.StandardMaterial('', this.getScene());
                        mat.diffuseColor = BABYLON.Color3.Green();
                        mat.specularColor = BABYLON.Color3.Black();
                        plane.material = mat;

                        plane.parent = this;
                        return plane;
                }
        }]);

        return Enemy;
})(GameObject);
//# sourceMappingURL=Enemy.js.map
