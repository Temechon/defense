"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener("DOMContentLoaded", function () {

    new Game('game-canvas');
});

var Game = (function () {
    function Game(canvasId) {
        var _this = this;

        _classCallCheck(this, Game);

        var canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(canvas, true);

        // Contains all loaded assets needed for this state
        this.assets = [];

        // The state scene
        this.scene = null;

        this.towers = [];

        this.enemies = [];

        this.enemiesToSend = 10;
        this.enemiesHealth = 10;

        this.level = 0;

        this.gold = 100;

        // Resize window event
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });

        this.run();
    }

    _createClass(Game, [{
        key: "_initScene",
        value: function _initScene() {
            var scene = new BABYLON.Scene(this.engine);

            // Hemispheric light to light the scene
            var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
            //h.intensity = 0.4;

            var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 50, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(scene.getEngine().getRenderingCanvas());

            return scene;
        }
    }, {
        key: "run",
        value: function run() {
            var _this2 = this;

            this.scene = this._initScene();

            // The loader
            var loader = new BABYLON.AssetsManager(this.scene);

            //let meshTask = loader.addMeshTask("bug", "", "./assets/bug/", "bug.babylon");
            //meshTask.onSuccess = (t) => {
            //    for (let m of t.loadedMeshes) {
            //        m.setEnabled (false);
            //    }
            //    this.assets['bug'] = {
            //        meshes : t.loadedMeshes
            //    }
            //};

            loader.onFinish = function () {

                _this2.scene.executeWhenReady(function () {

                    _this2.engine.runRenderLoop(function () {
                        _this2.scene.render();
                    });
                });

                // Load first level
                _this2._initGame();
            };

            loader.load();
        }
    }, {
        key: "_initGame",
        value: function _initGame() {
            var _this3 = this;

            var ground = BABYLON.Mesh.CreateGround('ground', 100, 100, 1, this.scene);
            ground.material = new BABYLON.StandardMaterial('', this.scene);
            ground.material.diffuseTexture = new BABYLON.Texture('assets/ground.jpg', this.scene);
            ground.material.diffuseTexture.uScale = 5;
            ground.material.diffuseTexture.vScale = 5;
            ground.material.specularColor = BABYLON.Color3.Black();
            ground.receiveShadows = true;

            // destination
            var s = BABYLON.Mesh.CreateSphere('', 10, 1, this.scene);
            s.position = new BABYLON.Vector3(20, 0, 20);

            this.guiManager = new GUIManager(this);

            // add action on pointer
            var eventPrefix = BABYLON.Tools.GetPointerPrefix();
            this.scene.getEngine().getRenderingCanvas().addEventListener(eventPrefix + "down", function () {

                var pickInfo = _this3.scene.pick(_this3.scene.pointerX, _this3.scene.pointerY, function (mesh) {
                    return mesh.name == 'ground';
                });

                if (pickInfo.hit) {
                    // If the picked mesh is a tower
                    // todo here, change its material

                    // if the picked mesh is the ground
                    var pos = pickInfo.pickedPoint;
                    var t = new Tower(_this3);
                    t.position = pos;
                    _this3.towers.push(t);
                }
            });

            this.scene.debugLayer.show();

            this.sendWave();

            // Sort each enemy to the nearest tower
            this.scene.registerBeforeRender(function () {
                // For each towers
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this3.towers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var t = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = _this3.enemies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var e = _step2.value;

                                if (t.isInRadius(e)) {
                                    t.addToAttackList(e);
                                } else {
                                    t.removeFromAttackList(e);
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                    _iterator2["return"]();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            });
        }
    }, {
        key: "removeEnemy",
        value: function removeEnemy(enemy) {
            // remove from tower
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.towers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var t = _step3.value;

                    t.removeFromAttackList(enemy);
                }

                // remove from enemy list
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            var index = this.enemies.indexOf(enemy);
            if (index > -1) {
                this.enemies.splice(index, 1);
            }
            if (this.enemies.length == 0) {
                this.sendWave();
            }
        }

        /**
         * Send a new wave
         */
    }, {
        key: "sendWave",
        value: function sendWave() {
            this.level++;

            // Update GUI
            this.guiManager.nextLevel();

            // increase minions health
            this.enemiesHealth += 20;

            // Increase enemies number
            //this.enemiesToSend += 10;

            // send X enemies
            for (var i = 0; i < this.enemiesToSend; i++) {
                var e = new Enemy(this, this.enemiesHealth);
                this.enemies.push(e);
            }
        }

        /**
         * Returns an integer in [min, max[
         */
    }, {
        key: "createModel",

        /**
         * Create an instance model from the given name.
         */
        value: function createModel(name, parent) {
            if (!this.assets[name]) {
                console.warn('No asset corresponding.');
            } else {
                if (!parent) {
                    parent = new GameObject(this);
                }

                var obj = this.assets[name];
                //parent._animations = obj.animations;
                var meshes = obj.meshes;

                for (var i = 0; i < meshes.length; i++) {
                    // Don't clone mesh without any vertices
                    if (meshes[i].getTotalVertices() > 0) {

                        var newmesh = meshes[i].clone(meshes[i].name, null, true);
                        parent.addChildren(newmesh);

                        if (meshes[i].skeleton) {
                            newmesh.skeleton = meshes[i].skeleton.clone();
                            this.scene.stopAnimation(newmesh);
                        }
                    }
                }
            }
            return parent;
        }
    }], [{
        key: "randomInt",
        value: function randomInt(min, max) {
            if (min === max) {
                return min;
            }
            var random = Math.random();
            return Math.floor(random * (max - min) + min);
        }
    }, {
        key: "randomNumber",
        value: function randomNumber(min, max) {
            if (min === max) {
                return min;
            }
            var random = Math.random();
            return random * (max - min) + min;
        }
    }]);

    return Game;
})();
//# sourceMappingURL=Game.js.map
