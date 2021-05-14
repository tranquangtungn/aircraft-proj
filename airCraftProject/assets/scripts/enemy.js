
cc.Class({
    extends: cc.Component,

    properties: {
        hit_frame: cc.SpriteFrame,
        hp: 5,
        speed: 0,
        sprite: null,
        anim_down: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //cc.log(this)
        this.sprite = this.getComponent(cc.Sprite)
        this.colider = this.getComponent(cc.PolygonCollider)
        this.anim_down = this.getComponent(cc.Animation)
        //cc.log(this.colider)
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },
    onCollisionEnter: function (other, self) {
        // cc.log(other.node.group)
        //cc.log(other.node.group)
        if (other.node.group === "bullet") {
            this.hp -= 1;
            cc.log(this.hp)
            if (this.sprite.spriteFrame !== this.hit_frame) {

                this.sprite.spriteFrame = this.hit_frame

            }
            else if (this.hp == 0) {
                //cc.log(this.hp)
                //cc.log("test")
                this.anim_down.play()
                cc.tween(this.node)
                    .delay(1)
                    .call(() => { this.node.active = false; })
                    .start()

            }
            //cc.log(this.hp)

        }
    },
    start() {

    },

    // update (dt) {},
});
