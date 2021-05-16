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
        pre_hero: cc.Prefab,
        _hero: cc.Node,

        pre_creep: cc.Prefab,
        pre_assassin: cc.Prefab,
        pre_motherShip: cc.Prefab,
        pre_bullet: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        mEmitter.instance = new mEmitter();
        //cc.log(config.event.UPDATE_SCORE)
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        this.setTouch()
        this.spawnHero()


        mEmitter.instance.registerEvent(config.event.UPDATE_SCORE, this.updateScore.bind(this))

    },

    start() {
        this.init();
    },

    update(dt) {
        //cc.log(this.node.children.length)
        //cc.log(this.gameState)

        this.setBg();

        this.bulletTime++;
        if (this.bulletTime == 10) {
            this.bulletTime = 0;
            if (this.gameState == config.gameState.PLAYING) {

                this.createBullet();
            }
        }
        this.spawnCreeps(dt);
        this.spawnAssassins(dt);
        this.spawnMotherShips(dt);
    },
    spawnCreeps(dt) {
        this.spawnCreepTime += dt;
        if (this.spawnCreepTime >= 0.2) {
            this.spawnCreepTime = 0;
            if (this.gameState == config.gameState.PLAYING) {
                this.createEnemy(this.pre_creep)
            }
        }
    },
    spawnAssassins(dt) {
        this.spawnAssasinTime += dt;
        if (this.spawnAssasinTime >= 0.5) {
            this.spawnAssasinTime = 0;
            if (this.gameState == config.gameState.PLAYING) {
                this.createEnemy(this.pre_assassin)
            }
        }
    },
    spawnMotherShips(dt) {
        this.spawnMotherShipTime += dt;
        if (this.spawnMotherShipTime >= 2) {
            this.spawnMotherShipTime = 0;
            if (this.gameState == config.gameState.PLAYING) {
                this.createEnemy(this.pre_motherShip)
            }
        }
    },
    createEnemy(pre_enemy) {
        let x = Math.floor(Math.random() * 600) + 1 - 300; // 1-5
        let y = Math.floor(Math.random() * 900) + 1 + 550; // 1-5
        let enemy = cc.instantiate(pre_enemy)
        enemy.parent = this.node
        enemy.setPosition(cc.v2(x, y))
        enemy.speed = 10
    },
    spawnHero() {

        this._hero = cc.instantiate(this.pre_hero)
        this._hero.parent = this.node
        this._hero.setPosition(cc.v2(0, -300))
    },
    init() {
        this.isBgMove = false;
        this.bg_1.y = 0;
        this.bg_2.y = this.bg_1.y + this.bg_1.height;
        this.gameReady.zIndex = 1;
        this.gamePause.zIndex = 2;
        this.gameReady.active = true;
        this.gamePlaying.active = false;
        this.gamePause.active = false;

        this.bulletTime = 0;
        this.gameState = config.gameState.READY


        this.spawnCreepTime = 0;
        this.spawnAssasinTime = 0;
        this.spawnMotherShipTime = 0;
    },
    setTouch() {
        this.node.on("touchstart", function (event) {
            cc.log("touchstart")
            this.gameState = config.gameState.PLAYING;
            this.gameReady.active = false;
            this.gamePlaying.active = true;
            this.isBgMove = true;

        }, this);
        this.node.on("touchmove", function (event) {
            // cc.log("touchmove")
            let pos_hero = this._hero.getPosition()
            let pos_mov = event.getDelta()
            this._hero.setPosition(cc.v2(pos_hero.x + pos_mov.x, pos_hero.y + pos_mov.y))

        }, this);
        this.node.on("touchend", function (event) {
            cc.log("touchend")
            //this.gameState = config.gameState.PLAYING;
            // mEmitter.instance.emit(config.event.UPDATE_GAMESTATE, this.gameState)
            // cc.log(bullet.getPosition())
        }, this)
    },
    updateScore(score) {
        //cc.log("tets")
        this.score.string = Number(this.score.string) + score
    },
    setBg() {
        if (this.isBgMove) {
            this.bg_2.y -= 1;
            this.bg_1.y -= 1;
            if (this.bg_1.y <= -this.bg_1.height)
                this.bg_1.y = this.bg_2.y + this.bg_1.height;
            if (this.bg_2.y <= -this.bg_2.height)
                this.bg_2.y = this.bg_1.y + this.bg_2.height;
        }

    },
    createBullet() {

        let pos = this._hero.getPosition()
        let bullet = cc.instantiate(this.pre_bullet)
        bullet.parent = this.node;
        //cc.log(pos_hero.y)
        bullet.setPosition(cc.v2(pos.x, pos.y + this._hero.height / 2))
    },

    removeAllBullet() {

        let children = this.node.children
        //cc.log(children)
        for (let i = children.length - 1; i >= 0; i--) {
            let bullet = children[i].getComponent("bullet")
            if (bullet)
                bullet.onBulletKilled()
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
                //this.gamePlaying.active = false;
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
