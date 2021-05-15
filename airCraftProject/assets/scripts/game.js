const mEmitter = require("./mEmitter");
const config = require("config");

cc.Class({
    extends: cc.Component,

    properties: {
        bg_1: cc.Node,
        bg_2: cc.Node,
        title: cc.Label,
        gamePlaying: cc.Node,
        gamePause: cc.Node,
        gameReady: cc.Node,
        score: cc.Label,
        hero: cc.Node,
        pre_bullet: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.log(config.event.UPDATE_SCORE)
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        this.setTouch()

        mEmitter.instance = new mEmitter();
        mEmitter.instance.registerEvent(config.event.UPDATE_SCORE, this.updateScore.bind(this))

    },

    start() {
        this.init();
    },

    update(dt) {
        cc.log(mEmitter.instance._emiter._events)
        if (this.isBgMove) {
            this.setBg();
        }
        this.bulletTime++;
        if (this.bulletTime == 10) {
            this.bulletTime = 0;
            if (this.gameState == config.gameState.PLAYING) {

                this.createBullet();
            }
        }

    },
    init() {
        this.isBgMove = false;
        this.bg_1.y = 0;
        this.bg_2.y = this.bg_1.y + this.bg_1.height;
        this.gamePause.zIndex = 2;
        this.gameReady.active = true;
        this.gamePlaying.active = false;
        this.gamePause.active = false;
        this.bulletPool = new cc.NodePool();
        this.bulletTime = 0;
        this.gameState = config.gameState.READY //{0:ready , 1:playing, 2:pause, 3:over}
    },
    setTouch() {
        this.node.on("touchstart", function (event) {
            cc.log("touchstart")
            this.gameReady.active = false;
            this.gamePlaying.active = true;
            this.isBgMove = true;
        }, this);
        this.node.on("touchmove", function (event) {
            // cc.log("touchmove")
            let pos_hero = this.hero.getPosition()
            let pos_mov = event.getDelta()
            this.hero.setPosition(cc.v2(pos_hero.x + pos_mov.x, pos_hero.y + pos_mov.y))
        }, this);
        this.node.on("touchend", function (event) {
            cc.log("touchend")
            this.gameState = config.gameState.PLAYING;

            // cc.log(bullet.getPosition())
        }, this)
    },
    updateScore(score) {
        cc.log("tets")
        this.score.string = Number(this.score.string) + score
    },
    setBg() {
        this.bg_2.y -= 2;
        this.bg_1.y -= 2;
        if (this.bg_1.y <= -this.bg_1.height)
            this.bg_1.y = this.bg_2.y + this.bg_1.height;
        if (this.bg_2.y <= -this.bg_2.height)
            this.bg_2.y = this.bg_1.y + this.bg_2.height;

    },
    createBullet() {
        let bullet = null;
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get();
        } else {
            bullet = cc.instantiate(this.pre_bullet);
        }
        let pos = this.hero.getPosition()
        //bullet = cc.instantiate(this.pre_bullet)
        bullet.parent = this.node;
        //cc.log(pos_hero.y)
        bullet.setPosition(cc.v2(pos.x, pos.y + this.hero.height / 2))
    },
    onBulletKilled(bullet) {
        this.bulletPool.put(bullet);
    },
    removeAllBullet() {
        let children = this.node.children
        for (let i = children.length - 1; i >= 0; i--) {
            let js = children[i].getComponent("bullet")
            if (js)
                this.onBulletKilled(children[i])
        }
    },
    clickBtn(sender, str) {
        switch (str) {
            case "resume":
                cc.log("resume")
                this.isBgMove = true;
                this.gamePause.active = false;
                this.gamePlaying.active = true;
                this.gameState = config.gameState.PLAYING;
                mEmitter.instance.emit(config.event.UPDATE_GAMESTATE, this.gameState)
                break;
            case "pause":
                cc.log("pause")
                this.gamePause.active = true;
                this.gamePlaying.active = false;
                this.isBgMove = false;
                this.gameState = config.gameState.PAUSE;
                mEmitter.instance.emit(config.event.UPDATE_GAMESTATE, this.gameState)
                break;

            case "restart":
                this.init();
                cc.log("restart")
                //this.gamePlaying.active = false;
                this.gameState = config.gameState.READY;
                this.removeAllBullet()
                break;
        }
    },
});
