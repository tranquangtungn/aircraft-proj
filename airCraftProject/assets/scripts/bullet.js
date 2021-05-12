
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {

    },

    update(dt) {
        // cc.log(this.node.y)
        this.node.y += 5;
    },
});
