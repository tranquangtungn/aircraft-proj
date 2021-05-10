

cc.Class({
    extends: cc.Component,

    properties: {
        bg_1: cc.Node,
        bg_2: cc.Node,
        title: cc.Label,
        gamePlaying: cc.Node,
        gamePause: cc.Node,
        gameReady: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isBgMove = false;
        this.bg_1.y = 0;
        this.bg_2.y = this.bg_1.y + this.bg_1.height;
        this.setTouch()
        this.gameReady.active = true;
        this.gamePlaying.active = false;
        this.gamePause.active = false;
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
            this.gameReady.active = false;
            this.gamePlaying.active = true;
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
    clickBtn(sender, str) {
        switch (str) {
            case "resume":
                cc.log("resume")
                this.isBgMove = true;
                this.gamePause.active = false;
                this.gamePlaying.active = true;
                break;
            case "pause":
                cc.log("pause")
                this.gamePause.active = true;
                this.gamePlaying.active = false;
                this.isBgMove = false;
                break;

            case "restart":
                this.onLoad();
                cc.log("restart")
                break;
        }
    },
});
