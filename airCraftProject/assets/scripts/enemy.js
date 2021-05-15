const mEmitter = require("./mEmitter");
const config = require("./config");

cc.Class({
    extends: cc.Component,

    properties: {
        hit_frame: cc.SpriteFrame,
        hp: 5,
        speed: 0,
        score: 1,
        _sprite: null,
        _anim: null,
        _gameState: config.gameState.PLAYING
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //cc.log(this)
        this._sprite = this.getComponent(cc.Sprite)
        this.colider = this.getComponent(cc.PolygonCollider)
        this._anim = this.getComponent(cc.Animation)
        mEmitter.instance.registerEvent(config.event.UPDATE_GAMESTATE, this.updateGameState.bind(this))
        //cc.log(this.colider)

    },
    updateGameState(data) {
        this._gameState = data
        //cc.log("change state")
        if (data == config.gameState.PAUSE)
            this._anim.stop()
        else
            this._anim.start()
    },
    onCollisionEnter: function (other, self) {
        // cc.log(other.node.group)
        //cc.log(other.node.group)
        if (other.node.group == "bullet") {
            this.hp -= 1;
            if (this.hp == 0) {
                //cc.log(this.hp)
                //cc.log("test")
                this._anim.play(this._anim._clips[0]._name)
                cc.tween(this.node)
                    .delay(1)
                    .call(() => {
                        this.node.active = false;
                        mEmitter.instance.emit(config.event.UPDATE_SCORE, this.score)
                    })
                    .start()
            }
            else if (this._sprite.spriteFrame !== this.hit_frame && this.hp > 0) {
                this._sprite.spriteFrame = this.hit_frame
                this._anim.stop()
            }
            //cc.log(this.hp)

        }
    },
    start() {

    },

    update(dt) {
        if (this._gameState == config.gameState.PLAYING)
            this.node.y -= this.speed

    },
});
