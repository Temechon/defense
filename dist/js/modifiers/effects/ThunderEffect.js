/**
 * Thunder effect stun the enemy, but does divide the original damage by 4.
 * A bullet doesn't have any effect on an enemy already stunned.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThunderEffect = (function (_Effect) {
    _inherits(ThunderEffect, _Effect);

    function ThunderEffect(scene) {
        _classCallCheck(this, ThunderEffect);

        _get(Object.getPrototypeOf(ThunderEffect.prototype), 'constructor', this).call(this, scene);

        // fire material
        var mat = scene.getMaterialByName('_thunderEffectMaterial_');
        if (!mat) {
            mat = new BABYLON.StandardMaterial('_thunderEffectMaterial_', scene);
            mat.emissiveColor = BABYLON.Color3.Yellow();
            mat.specularColor = BABYLON.Color3.Black();
        }
        this.thunderMaterial = mat;

        // The slow effect
        this.mult = 0.0;
        // The slow time in ms
        this.slowTime = 500;

        this.scene = scene;
    }

    /**
     * Method updating the bullet : color change, shape change...
     */

    _createClass(ThunderEffect, [{
        key: 'affectBullet',
        value: function affectBullet(bullet) {
            // update bullet color
            bullet.material = this.thunderMaterial;
        }

        /**
         * The fire effect double the damage done to the enmy
         */
    }, {
        key: 'affectEnemy',
        value: function affectEnemy(damage, enemy) {
            enemy.speedMultiplier = this.mult;
            var t = new Timer(this.slowTime, this.scene, { autostart: true, repeat: 1, autodestroy: true });
            t.callback = function () {
                enemy.speedMultiplier = 1;
            };

            return damage / 4;
        }
    }, {
        key: 'upgrade',
        value: function upgrade() {
            this.slowTime = 1000;
        }
    }]);

    return ThunderEffect;
})(Effect);
//# sourceMappingURL=ThunderEffect.js.map
