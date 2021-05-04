

cc.Class({
    extends: cc.Component,

    properties: {
        bg_1: cc.Node,
        bg_2: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bg_1.y = 0;
        this.bg_2.y = this.bg_1.y + this.bg_1.height;
    },

    start() {

    },

    update(dt) {
        this.bg_2.y -= 2;
        this.bg_1.y -= 2;
        if (this.bg_1.y <= -this.bg_1.height)
            this.bg_1.y = this.bg_2.y + this.bg_1.height;
        if (this.bg_2.y <= -this.bg_2.height)
            this.bg_2.y = this.bg_1.y + this.bg_2.height;



    },
});
