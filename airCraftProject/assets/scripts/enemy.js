
cc.Class({
    extends: cc.Component,

    properties: {
        hit_frame: cc.SpriteFrame,
        hp: 5,
        speed: 0,
        _sprite: null,
        _anim_down: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //cc.log(this)
        this._sprite = this.getComponent(cc.Sprite)
        this.colider = this.getComponent(cc.PolygonCollider)
        this._anim_down = this.getComponent(cc.Animation)
        //cc.log(this.colider)

    },
    onCollisionEnter: function (other, self) {
        // cc.log(other.node.group)
        //cc.log(other.node.group)
        if (other.node.group == "bullet") {
            this.hp -= 1;
            if (this.hp == 0) {
                //cc.log(this.hp)
                //cc.log("test")
                this._anim_down.play(this._anim_down._clips[0]._name)
                cc.tween(this.node)
                    .delay(1)
                    .call(() => { this.node.active = false; })
                    .start()
            }
            else if (this._sprite.spriteFrame !== this.hit_frame && this.hp > 0) {
                this._sprite.spriteFrame = this.hit_frame
                this._anim_down.stop()
            }
            //cc.log(this.hp)

        }
    },
    start() {

    },

    update(dt) {
        this.node.y -= this.speed
    },
});
