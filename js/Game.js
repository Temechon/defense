window.addEventListener("DOMContentLoaded", () => {

    new Game('game-canvas');
});


class Game {
    constructor(canvasId) {

        let canvas          = document.getElementById(canvasId);
        this.engine         = new BABYLON.Engine(canvas, true);

        // Contains all loaded assets needed for this state
        this.assets         = [];

        // The state scene
        this.scene          = null;

        this.towers = [];

        this.enemies = [];

        this.enemiesToSend = 10;
        this.enemiesHealth = 10;

        this.level = 0;

        this.gold = 100;

        // Resize window event
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.run();

    }

    _initScene() {
        let scene = new BABYLON.Scene(this.engine);

        // Hemispheric light to light the scene
        let h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
        //h.intensity = 0.4;

        let camera = new BABYLON.FreeCamera("camera",new BABYLON.Vector3(0,50,-10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(scene.getEngine().getRenderingCanvas());

        return scene;
    }

    run() {

        this.scene = this._initScene();

        // The loader
        let loader =  new BABYLON.AssetsManager(this.scene);

        //let meshTask = loader.addMeshTask("bug", "", "./assets/bug/", "bug.babylon");
        //meshTask.onSuccess = (t) => {
        //    for (let m of t.loadedMeshes) {
        //        m.setEnabled (false);
        //    }
        //    this.assets['bug'] = {
        //        meshes : t.loadedMeshes
        //    }
        //};

        loader.onFinish = () => {

            this.scene.executeWhenReady(() => {

                this.engine.runRenderLoop(() => {
                    this.scene.render();
                });
            });

            // Load first level
            this._initGame();

        };

        loader.load();
    }

    _initGame() {

        let ground = BABYLON.Mesh.CreateGround('ground', 100, 100, 1, this.scene);
        ground.material = new BABYLON.StandardMaterial('', this.scene);
        ground.material.diffuseTexture = new BABYLON.Texture('assets/ground.jpg', this.scene);
        ground.material.diffuseTexture.uScale = 5;
        ground.material.diffuseTexture.vScale = 5;
        ground.material.specularColor = BABYLON.Color3.Black();
        ground.receiveShadows = true;

        // destination
        let s = BABYLON.Mesh.CreateSphere('', 10, 1, this.scene);
        s.position = new BABYLON.Vector3(20,0,20);

        this.guiManager = new GUIManager(this);

        // add action on pointer
        let eventPrefix = BABYLON.Tools.GetPointerPrefix();
        this.scene.getEngine().getRenderingCanvas().addEventListener(eventPrefix + "down", () => {

            let pickInfo = this.scene.pick(
                this.scene.pointerX,
                this.scene.pointerY,
                (mesh) => { return mesh.name == 'ground'});


            if (pickInfo.hit) {
                // If the picked mesh is a tower
                // todo here, change its material

                // if the picked mesh is the ground
                let pos = pickInfo.pickedPoint;
                let t = new Tower(this);
                t.position = pos;
                this.towers.push(t);
            }
        });

        this.scene.debugLayer.show();

        this.sendWave();

        // Sort each enemy to the nearest tower
        this.scene.registerBeforeRender(() => {
            // For each towers
            for (let t of this.towers) {
                for (let e of this.enemies) {
                    if (t.isInRadius(e)) {
                        t.addToAttackList(e);
                    } else {
                        t.removeFromAttackList(e);
                    }

                }
            }
        });
    }

    removeEnemy(enemy) {
        // remove from tower
        for (let t of this.towers) {
            t.removeFromAttackList(enemy);
        }

        // remove from enemy list
        let index = this.enemies.indexOf(enemy);
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
    sendWave() {
        this.level++;

        // Update GUI
        this.guiManager.nextLevel();

        // increase minions health
        this.enemiesHealth += 20;

        // Increase enemies number
        //this.enemiesToSend += 10;

        // send X enemies
        for (let i = 0 ; i<this.enemiesToSend; i++) {
            let e = new Enemy(this, this.enemiesHealth);
            this.enemies.push(e);
        }

    }


    /**
     * Returns an integer in [min, max[
     */
    static randomInt(min, max) {
        if (min === max) {
            return (min);
        }
        let random = Math.random();
        return Math.floor(((random * (max - min)) + min));
    }

    static randomNumber(min, max) {
        if (min === max) {
            return (min);
        }
        let random = Math.random();
        return (random * (max - min)) + min;
    }

    /**
     * Create an instance model from the given name.
     */
    createModel(name, parent) {
        if (! this.assets[name]) {
            console.warn('No asset corresponding.');
        } else {
            if (!parent) {
                parent = new GameObject(this);
            }

            let obj = this.assets[name];
            //parent._animations = obj.animations;
            let meshes = obj.meshes;

            for (let i=0; i<meshes.length; i++ ){
                // Don't clone mesh without any vertices
                if (meshes[i].getTotalVertices() > 0) {

                    let newmesh = meshes[i].clone(meshes[i].name, null, true);
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
}
