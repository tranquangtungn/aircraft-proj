

cc.Class({
    extends: cc.Component,

    properties: {
        bg_1: cc.Node,
        bg_2: cc.Node,
        title: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isBgMove = false;
        this.bg_1.y = 0;
        this.bg_2.y = this.bg_1.y + this.bg_1.height;
        this.setTouch()
    },

    start() {

    },

    update(dt) {
        if (this.isBgMove) {
            this.setBg();
        }


    },
    setTouch() {
        this.node.on("touchstart", function (event) {
            cc.log("touchstart")
        }, this);
        this.node.on("touchmove", function (event) {
            cc.log("touchmove")
        }, this);
        this.node.on("touchend", function (event) {
            cc.log("touchend")
            this.title.node.active = false;
            this.isBgMove = true;
        }, this)
    },
    setBg() {
        this.bg_2.y -= 2;
        this.bg_1.y -= 2;
        if (this.bg_1.y <= -this.bg_1.height)
            this.bg_1.y = this.bg_2.y + this.bg_1.height;
        if (this.bg_2.y <= -this.bg_2.height)
            this.bg_2.y = this.bg_1.y + this.bg_2.height;

    },
});
