// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hit_frame: cc.SpriteFrame,
        _sprite: null,
        _anim_down: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.setTouch()
        this._sprite = this.getComponent(cc.Sprite)
        this.colider = this.getComponent(cc.PolygonCollider)
        this._anim_down = this.getComponent(cc.Animation)

    },

    start() {

    },
    onCollisionEnter: function (other, self) {
        // cc.log(other.node.group)
        //cc.log(other.node.group)
        cc.log("hello")
        if (other.node.group == "enemy") {
            this._anim_down.play("hero_destroy")
            cc.tween(this.node)
                .delay(1)
                .call(() => { this.node.active = false; })
                .start()


            //cc.log(this.hp)

        }
    },

    // update (dt) {},
});
