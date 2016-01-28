'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tower = (function (_GameObject) {
    _inherits(Tower, _GameObject);

    function Tower(game) {
        var _this = this;

        _classCallCheck(this, Tower);

        _get(Object.getPrototypeOf(Tower.prototype), 'constructor', this).call(this, game);

        this.addChildren(BABYLON.MeshBuilder.CreateBox('tower', { width: 1, height: 2, depth: 1 }, this.getScene()));

        this.radius = 5;

        var radiusSphere = BABYLON.Mesh.CreateSphere('radius', 16, this.radius * 2, this.getScene());
        radiusSphere.material = new BABYLON.StandardMaterial('', this.getScene());
        radiusSphere.material.alpha = 0.2;
        radiusSphere.material.emissiveColor = BABYLON.Color3.Blue();

        radiusSphere.parent = this;

        this._attackList = [];

        // This tower will shoot every xx ms
        this.shootCadency = 500;

        this.timer = new Timer(this.shootCadency, this.getScene(), { repeat: -1, autostart: true });
        this.timer.callback = function () {
            _this.attack();
        };

        //this.modifier = new ThunderEffect(this.getScene());
        this.modifier = new StandardEffect(this.getScene());

        this.generator = new DoubleShoot(this.game, this.shootCadency);
    }

    _createClass(Tower, [{
        key: 'isInRadius',
        value: function isInRadius(enemy) {
            return BABYLON.Vector3.DistanceSquared(enemy.position, this.position) < this.radius * this.radius;
        }

        /**
         * Add to attack list if not already present
         * @param enemy
         */
    }, {
        key: 'addToAttackList',
        value: function addToAttackList(enemy) {
            var index = this._attackList.indexOf(enemy);
            if (index == -1) {
                this._attackList.push(enemy);
            }
        }
    }, {
        key: 'removeFromAttackList',
        value: function removeFromAttackList(enemy) {
            var index = this._attackList.indexOf(enemy);
            if (index > -1) {
                this._attackList.splice(index, 1);
            }
        }
    }, {
        key: 'attack',
        value: function attack() {
            if (this._attackList.length > 0) {
                var enemyPos = this._attackList[0].position;
                var pos = this.position.clone();
                pos.y = 1;
                this.generator.generate(pos, enemyPos, this.radius, 10, this.modifier);
            }
        }
    }]);

    return Tower;
})(GameObject);
//# sourceMappingURL=Tower.js.map
