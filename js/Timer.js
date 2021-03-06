/**
* Builds a new timer. A timer can delay an action, and repeat this action X times
* @param time The time in milliseconds
* @param scene The scene
* @param callback The callback function called when the timer is finished
* @param options.autostart If set to true, the timer will autostart. False by default.
 *@param options.autodestroy If set to true, the timer will autodestroy at the end of all callback functions. False by default
 *@param options.repeat If set, the callback action will be repeated the specified number of times. 1 by default. Set to -1 if repeat infinitely
 *@param options.immediate If set, the callback action will be called before waiting 'time' ms. false by default.
*/
class Timer {

    constructor(time, scene, options={}) {

        this._scene = scene;

        this.maxTime = this.currentTime = time;

        // True if the timer is finished, false otherwise
        this.isOver = false;

        // True if the timer is paused, false otherwise
        this.paused = false;

        // True if the timer has been started, false otherwise
        this.started = false;

        // Function to be repeated when the timer is finished
        this.callback = null;

        // Function to be called when the timer is finished (no more repeat counts)
        this.onFinish = null;

        //If set, the callback action will be repeated the specified number of times
        this.repeat = options.repeat || 1;

        // Should the timer start directly after its creation ?
        this.autostart = options.autostart || false;

        // Should the timer destroy itself after completion ?
        this.autodestroy = options.autodestroy || false;

        // Should the timer call 'callback function' immediately after starting ?
        this.immediate = options.immediate || false;

        this._registeredFunction = () => {
            if (this.started && !this.isOver && !this.paused) {
                this._update();
            }
        };
        scene.registerBeforeRender(this._registeredFunction);

        // Start the timer is set to autostart
        if (this.autostart) {
            this.start();
        }
    }

    /**
     * Reset the timer. Do not reset its options!
     */
    reset() {
        this.currentTime = this.maxTime;
        this.isOver = false;
        this.started = false;
        this.paused = false;
    }

    /**
     * Start the timer
     */
    start() {
        this.started = true;
    }

    /**
     * Pause the timer
     */
    pause() {
        this.paused = true;
    }

    /**
     * Stop the timer, and reset it.
     * @param destroy If set to true, the timer is deleted.
     */
    stop(destroy) {
        this.started = false;
        this.reset();
        if (this.autodestroy || destroy) {
            this._destroy();
        }
    }

    /**
     * Destory the timer
     * @private
     */
    _destroy() {
        // Unregister update function
        this._scene.unregisterBeforeRender(this._registeredFunction);
    }

    /**
     * Unpause the timer
     */
    resume() {
        this.paused = false;
    }

    /**
     * The update function
     * @private
     */
    _update() {

        this.currentTime -= this._scene.getEngine().getDeltaTime();

        if (this.currentTime <= 0 || this.immediate) {
            // reset immediate
            this.immediate = false;

            // The delay is finished, run the callback
            this.isOver = true;
            if (this.repeat != -1) {
                this.repeat--;
            }
            if (this.callback) {
                this.callback();
            }

            if (this.repeat > 0 || this.repeat == -1) {
                this.reset();
                this.start();
            } else {
                // Call the onFinish action
                if (this.onFinish) {
                    this.onFinish();
                }
                // Autodestroy
                if (this.autodestroy) {
                    this._destroy();
                }
            }
        }
    }
}