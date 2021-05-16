const mEmitter = require("./mEmitter");
const config = require("./config");
cc.Class({
    extends: cc.Component,

    properties: {
        damage: 1,
        speed: 5,
        _gameState: config.gameState.PLAYING,
        _updateGameState: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //cc.log(this.node.y)
        //let manager = cc.director.getCollisionManager();
        //manager.enabled = true;
        this._updateGameState = this.updateGameState.bind(this)
        mEmitter.instance.registerEvent(config.event.UPDATE_GAMESTATE, this._updateGameState)
    },
    updateGameState(data) {
        this._gameState = data
        //cc.log("change state")
        // this._anim.stop()
    },
    start() {

    },
    onCollisionEnter: function (other, self) {
        //cc.log(other.node.group)
        let a = other.node.group == "enemy"
        //cc.log(a)
        //cc.log("hello")
        if (other.node.group == "enemy") {
            this.onBulletKilled()

        }
    },
    onBulletKilled() {
        mEmitter.instance.removeEvent(config.event.UPDATE_GAMESTATE, this._updateGameState)
        this.node.destroy();

    },
    update(dt) {
        // cc.log(this.node.y)
        // cc.log(this._gameState)
        if (this._gameState == config.gameState.PLAYING)
            this.node.y += this.speed;
        if (this.node.y >= 460) {
            this.onBulletKilled()
        }
    },
});
