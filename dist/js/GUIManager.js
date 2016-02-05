'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GUIManager = (function () {
    function GUIManager(game) {
        var _this = this;

        _classCallCheck(this, GUIManager);

        this.game = game;

        this.level = document.getElementById('level');
        this.gold = document.getElementById('gold');
        this.numberEnemies = document.getElementById('number');

        // The 'buy tower' icon
        this.buy = document.getElementById('buy');
        this.addAction(this.buy, function () {
            _this.game.buyTower();
        });
    }

    _createClass(GUIManager, [{
        key: 'nextLevel',
        value: function nextLevel() {
            var _this2 = this;

            this.level.parentNode.classList.add('fadeout');
            setTimeout(function () {
                _this2.level.parentNode.classList.remove('fadeout');
            }, 500);
            this.level.innerHTML = this.game.level;
        }
    }, {
        key: 'updateGui',
        value: function updateGui() {
            this.gold.innerHTML = this.game.gold;
            this.numberEnemies.innerHTML = this.game.enemies.length;
        }
    }, {
        key: 'addAction',
        value: function addAction(element, callback) {
            var eventPrefix = BABYLON.Tools.GetPointerPrefix();
            element.addEventListener(eventPrefix + "down", callback);
        }
    }]);

    return GUIManager;
})();
//# sourceMappingURL=GUIManager.js.map
