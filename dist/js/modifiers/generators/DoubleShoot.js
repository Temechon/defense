/**
 * A generator is used by a tower to generate bullets.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DoubleShoot = (function () {
    function DoubleShoot(game, cadency) {
        _classCallCheck(this, DoubleShoot);

        this.game = game;
        this._delay = 0;
        this._towerCadency = cadency;

        this.nbShoot = 2;
    }

    /* GETTER SETTERS */

    _createClass(DoubleShoot, [{
        key: '_computeDelay',

        /* METHODS */

        /**
         * Compute the generator delay between nbShoots
         * @private
         */
        value: function _computeDelay() {
            return this._towerCadency / (this.nbShoot * 2);
        }

        /**
         * Generates bullets. Should returns an array of two Bullet object
         */
    }, {
        key: 'generate',
        value: function generate(position, enemyPosition, radius, damage, modifier) {
            var _this = this;

            var timer = new Timer(this._delay, this.game.scene, {
                autostart: true,
                repeat: this.nbShoot,
                immediate: true,
                autodestroy: true
            });
            timer.callback = function () {
                var b = new Bullet(_this.game, position, enemyPosition, radius, damage, modifier);
                b.fire();
                console.log('fire');
            };
        }
    }, {
        key: 'upgrade',
        value: function upgrade() {
            this.nbShoot++;
        }
    }, {
        key: 'nbShoot',
        set: function set(value) {
            this._nbShoot = value;
            this._delay = this._computeDelay();
        },
        get: function get() {
            return this._nbShoot;
        }
    }]);

    return DoubleShoot;
})();
//# sourceMappingURL=DoubleShoot.js.map
