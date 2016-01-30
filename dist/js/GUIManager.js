'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GUIManager = (function () {
    function GUIManager(game) {
        _classCallCheck(this, GUIManager);

        this.game = game;

        this.level = document.getElementById('level');
    }

    _createClass(GUIManager, [{
        key: 'nextLevel',
        value: function nextLevel() {
            var _this = this;

            this.level.parentNode.classList.add('fadeout');
            setTimeout(function () {
                _this.level.parentNode.classList.remove('fadeout');
            }, 500);
            this.level.innerHTML = this.game.level;
        }
    }]);

    return GUIManager;
})();
//# sourceMappingURL=GUIManager.js.map
