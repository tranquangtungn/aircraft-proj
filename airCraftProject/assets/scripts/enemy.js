const mEmitter = require("mEmitter");
const config = require("config");

cc.Class({
    extends: cc.Component,

    properties: {
        hit_frame: cc.SpriteFrame,
        hp: 5,
        speed: {
            default: 1,
            serializable: false
        },

        score: 1,
        _sprite: null,
        _anim: null,
        _gameState: null,
        _updateGameState: null,
        _speed: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //cc.log(this)
        this._gameState = config.gameState.PLAYING
        this._sprite = this.getComponent(cc.Sprite)
        this.colider = this.getComponent(cc.PolygonCollider)
        this._anim = this.getComponent(cc.Animation)
        this._updateGameState = this.updateGameState.bind(this)
        mEmitter.instance.registerEvent(config.event.UPDATE_GAMESTATE, this._updateGameState)
        //cc.log(this.colider)
        this.speed = Math.floor(Math.random() * 5) + 2;
    },
    updateGameState(data) {
        this._gameState = data
        //cc.log("change state")
        if (data == config.gameState.PAUSE)
            this._anim.stop()
        else
            this._anim.start()
    },
    onEnemyKilled() {
        mEmitter.instance.removeEvent(config.event.UPDATE_GAMESTATE, this._updateGameState)
        this.node.destroy();

    },
    onCollisionEnter: function (other, self) {
        if (other.node.group == "bullet") {
            this.hp -= 1;
            if (this.hp == 0) {
                this._anim.play(this._anim._clips[0]._name)
                cc.tween(this.node)
                    .delay(1)
                    .call(() => {

                        mEmitter.instance.emit(config.event.UPDATE_SCORE, this.score)
                        this.onEnemyKilled()
                    })
                    .start()
            }
            else if (this._sprite.spriteFrame !== this.hit_frame && this.hp > 0) {
                this._sprite.spriteFrame = this.hit_frame
                this._anim.stop()
            }
        }
    },
    start() {

    },

    update(dt) {
        if (this._gameState == config.gameState.PLAYING)
            this.node.y -= this.speed;
        if (this.node.y <= -550) {
            this.onEnemyKilled()
        }
    },
});
