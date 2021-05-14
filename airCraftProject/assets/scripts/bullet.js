
cc.Class({
    extends: cc.Component,

    properties: {
        damage: 1,
        speed: 5
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //let manager = cc.director.getCollisionManager();
        //manager.enabled = true;
    },

    start() {

    },
    onCollisionEnter: function (other, self) {
        //cc.log(other.node.group)
        let a = other.node.group == "enemy"
        //cc.log(a)
        //cc.log("hello")
        if (other.node.group == "enemy") {

            //cc.log("test")
            this.node.active = false
            //cc.log(this.hp)

        }
    },
    update(dt) {
        // cc.log(this.node.y)
        this.node.y += this.speed;
    },
});
