/**
 * Represents an effect that will affect a bullet.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Effect = (function () {
    function Effect(scene) {
        _classCallCheck(this, Effect);
    }

    /**
     * Method updating the bullet : color change, shape change...
     */

    _createClass(Effect, [{
        key: "affectBullet",
        value: function affectBullet(bullet) {}
        // see implementation in subclasses

        /**
         * Method affecting the enemy: more damage, slow, stuns...
         * damage parameter is the initial damage, before the multiplier
         * This method should return the damage that affect the enemy
         */

    }, {
        key: "affectEnemy",
        value: function affectEnemy(damage, enemy) {}
        // see implementation in subclasses

        /**
         * Upgrade this effect.
         */

    }, {
        key: "upgrade",
        value: function upgrade() {
            // see implementation in subclasses
        }
    }]);

    return Effect;
})();
//# sourceMappingURL=Effect.js.map
