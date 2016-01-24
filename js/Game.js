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
        h.intensity = 0.4;

        let camera = new BABYLON.ArcRotateCamera("camera",Math.PI/2, 0, 30, BABYLON.Vector3.Zero(), scene);

        let ground = BABYLON.Mesh.CreateBox('box', 1, scene);

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
