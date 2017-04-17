/**
 * Created by CongNguyen on 4/13/17.
 */

var tmp_BestScore = 0;

var xPipe = cc.winSize.width;

var restartGame = false;
var introGame = true;
var gameStarted = true;

var groundSpeed = 100;
var pipeSpeed = 100;

var chim_angle = -3 / 40;
var chim_velocity = 400;

var gameover = false;
var tmp_playSoundSwooshing = true;

var tmp_collsion = false;

var check_gameoverTop = false;
var check_gameoverBot = false;

var diem = 0;

var tmp_time = 0;
var check_congdiem = false;

var tmp_playsoundDrop = 0;
var tmp_playsoundSwooshing = 0;

var minRandomBtm = 00;
var maxRandomBtm = 100;

var minRandomTop = 00;
var maxRandomTop = 130;

var minRandomDistance = 90;
var maxRandomDistance = 140;

var newScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        if ((JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("bestscore")))) != null) {
            console.log("ko null, Best score" + JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("bestscore"))));
        } else {
            cc.sys.localStorage.setItem(JSON.stringify("bestscore"), JSON.stringify(0));
            console.log("null roi");
        }

        var sprite = new cc.Sprite("#backgournd.png");
        sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        sprite.setScale(cc.winSize.height / sprite.height);
        this.addChild(sprite);

        this.enableKeyboard = true;
        var keyboardInterval = null;

        //================ong nuoc1==============================
        var pipeBtm = new cc.Sprite("res/pipeBtm.png");
        pipeBtm.setAnchorPoint(cc.p(0, 0));
        pipeBtm.setScale(1.5);
        pipeBtm.setPosition(xPipe, -100 + this.getRandom(minRandomBtm, maxRandomBtm));
        this.addChild(pipeBtm);
        this.pipeBtm = pipeBtm;

        var pipeTop = new cc.Sprite("res/pipeTop.png");
        pipeTop.setAnchorPoint(cc.p(0, 0));
        pipeTop.setScale(1.5);
        pipeTop.setPosition(xPipe, cc.winSize.height - this.getRandom(minRandomTop, maxRandomTop));
        this.addChild(pipeTop);
        this.pipeTop = pipeTop;

        //================ong nuoc2==============================
        var pipeBtm2 = new cc.Sprite("res/pipeBtm.png");
        pipeBtm2.setAnchorPoint(cc.p(0, 0));
        pipeBtm2.setScale(1.5);
        pipeBtm2.setPosition(pipeBtm.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance), -100 + this.getRandom(minRandomBtm, maxRandomBtm));
        this.addChild(pipeBtm2);
        this.pipeBtm2 = pipeBtm2;

        var pipeTop2 = new cc.Sprite("res/pipeTop.png");
        pipeTop2.setAnchorPoint(cc.p(0, 0));
        pipeTop2.setScale(1.5);
        pipeTop2.setPosition(pipeBtm2.getPositionX(), cc.winSize.height - this.getRandom(minRandomTop, maxRandomTop));
        this.addChild(pipeTop2);
        this.pipeTop2 = pipeTop2;

        //================ong nuoc3==============================
        var pipeBtm3 = new cc.Sprite("res/pipeBtm.png");
        pipeBtm3.setAnchorPoint(cc.p(0, 0));
        pipeBtm3.setScale(1.5);
        pipeBtm3.setPosition(pipeBtm2.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance), -100 + this.getRandom(minRandomBtm, maxRandomBtm));
        this.addChild(pipeBtm3);
        this.pipeBtm3 = pipeBtm3;

        var pipeTop3 = new cc.Sprite("res/pipeTop.png");
        pipeTop3.setAnchorPoint(cc.p(0, 0));
        pipeTop3.setScale(1.5);
        pipeTop3.setPosition(pipeBtm3.getPositionX(), cc.winSize.height - this.getRandom(minRandomTop, maxRandomTop));
        this.addChild(pipeTop3);
        this.pipeTop3 = pipeTop3;

        //=============Ve chim====================================
        var chim = new cc.Sprite("#bird.png");
        chim.setPosition(chim.width * 2, cc.winSize.height / 2);
        chim.setScale(1.5);
        this.chim = chim;
        chim.velocity = 0;
        chim.accelerator = -1500;
        this.addChild(chim);
        this.chim = chim;
        //chim.drawBouding

        //=======Ground===================================
        var ground = new cc.Sprite("res/ground.png");
        ground.setAnchorPoint(cc.p(0, 0));
        ground.setPosition(0, 0);
        ground.setScale(cc.winSize.width / ground.width);
        this.addChild(ground);
        this.ground = ground;

        var ground2 = new cc.Sprite("res/ground.png");
        ground2.setAnchorPoint(cc.p(0, 0));
        ground2.setPosition(cc.winSize.width - 2, 0);
        ground2.setScale(cc.winSize.width / ground.width);
        this.addChild(ground2);
        this.ground2 = ground2;

        //============diem luc choi game========================================
        var score1 = new cc.Sprite("res/0.png");
        score1.setAnchorPoint(cc.p(0, 0));
        score1.setScale(2);
        score1.setPosition(10, cc.winSize.height - score1.height * 2 - 5);
        this.addChild(score1);
        this.score1 = score1;

        var score2 = new cc.Sprite("res/0.png");
        score2.setAnchorPoint(cc.p(0, 0));
        score2.setScale(2);
        score2.setPosition(17 + score1.width, cc.winSize.height);
        this.addChild(score2);
        this.score2 = score2;

        //================GET START GAME==============================
        var getReady = new cc.Sprite("res/getReady.png");
        getReady.setScale(2.0);
        getReady.setPosition(cc.winSize.width / 2, cc.winSize.height * 3 / 4);
        this.addChild(getReady);
        this.getReady = getReady;


        //===========gameover Image===============================
        var gameoverImage = new cc.Sprite("res/gameover.png");
        //gameoverImage.setAnchorPoint(cc.p(0, 0));
        gameoverImage.setScale(2);
        gameoverImage.setPosition(cc.winSize.width / 2, cc.winSize.height + 50);
        this.addChild(gameoverImage);
        this.gameoverImage = gameoverImage;

        //=============popup when gameOver=============================
        var popup = new cc.Sprite("res/popup.png");
        //popup.setAnchorPoint(cc.p(0,0));
        popup.setScale(2.0);
        popup.setPosition(cc.winSize.width / 2, -popup.height);
        this.addChild(popup);
        this.popup = popup;

        //=============silver medal==============================
        var silverMedal = new cc.Sprite("res/silver.png");
        silverMedal.setScale(2.0);
        silverMedal.setPosition(cc.winSize.width / 2 - 65, -popup.height - 5);
        this.addChild(silverMedal);
        this.silverMedal = silverMedal;

        //=============gold medal==============================
        var goldMedal = new cc.Sprite("res/gold.png");
        goldMedal.setScale(2.0);
        goldMedal.setPosition(cc.winSize.width / 2 - 66, -popup.height - 8);
        this.addChild(goldMedal);
        this.goldMedal = goldMedal;

        //=============diem luc ket thuc game tong ket==========
        var endScore1 = new cc.Sprite("res/0.png");
        endScore1.setScale(1.5);
        endScore1.setPosition(cc.winSize.width / 2 + 70, -popup.height - 5);
        this.addChild(endScore1);
        this.endScore1 = endScore1;

        var endScore2 = new cc.Sprite("res/0.png");
        endScore2.setScale(1.5);
        endScore2.setPosition(cc.winSize.width / 2 + 2 + endScore1.width + 70, -popup.height - 5);
        this.addChild(endScore2);
        this.endScore2 = endScore2;

        //======================best score luc ket thuc game============
        var bestScoreNum1 = new cc.Sprite("res/0.png");
        bestScoreNum1.setScale(1.5);
        bestScoreNum1.setPosition(cc.winSize.width / 2 + 70, -popup.height - 5);
        this.addChild(bestScoreNum1);
        this.bestScoreNum1 = bestScoreNum1;

        var bestScoreNum2 = new cc.Sprite("res/0.png");
        bestScoreNum2.setScale(1.5);
        bestScoreNum2.setPosition(cc.winSize.width / 2 + 2 + bestScoreNum1.width + 70, -popup.height - 5);
        this.addChild(bestScoreNum2);
        this.bestScoreNum2 = bestScoreNum2;

        //======================btnPlay==================================
        var btnPlay = new ccui.Button();//("res/btnPlay.png");
        btnPlay.loadTextures("res/btnPlay.png", "res/btnPlay.png");
        btnPlay.setScale(2.0);
        btnPlay.setPosition(cc.winSize.width / 2, -btnPlay.height * 5 + 4);
        btnPlay.addClickEventListener(this.touchEventReplay, this);
        this.addChild(btnPlay);
        this.btnPlay = btnPlay;

        //=====================btnStart==============================
        var btnStart = new ccui.Button();
        btnStart.loadTextures("res/taptap.png", "res/taptap.png");
        btnStart.setScale(2);
        btnStart.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 + 50);
        btnStart.addClickEventListener(this.touchEventStart, this);
        this.addChild(btnStart);
        this.btnStart = btnStart;

        //=======listener Keyboard==============================
        var thiz = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode) {

                //cc.audioEngine.playEffect("res/rise.mp3");

                if (!thiz.enableKeyboard) {
                    return;
                }

                thiz.chim.velocity = chim_velocity;
                thiz.enableKeyboard = false;
                if (keyboardInterval) clearInterval(keyboardInterval);
                keyboardInterval = setInterval(function () {
                    thiz.enableKeyboard = true;
                }, 300);
            }
        }, this);
    },

    onEnter: function () {
        this._super();
        this.scheduleUpdate();
    },

    onExit: function () {
        this._super();
        this.unscheduleUpdate();
    },

    update: function (dt) {

        //ground di chuyen
        this.ground.x += -dt * groundSpeed;
        this.ground2.x += -dt * groundSpeed;

        if (this.ground.x < -this.ground.width * (cc.winSize.width / this.ground.width) + 5) {
            this.ground.x = cc.winSize.width;
        }

        if (this.ground2.x < -this.ground2.width * (cc.winSize.width / this.ground2.width) + 5) {
            this.ground2.x = cc.winSize.width;
        }

        if (introGame == false) {

            gameover = false;

            if (this.getReady.y < cc.winSize.height + this.getReady.height) {
                this.getReady.y += dt * 900;
            }

            if (this.btnStart.y > - this.btnStart.height) {
                this.btnStart.y += -dt * 900;
            }

            if (gameStarted == true) {
                //set lai vi tri cho cac Pipe
                this.pipeTop.x = xPipe;
                this.pipeBtm.x = xPipe;

                this.pipeTop2.x = this.pipeTop.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance);
                this.pipeBtm2.x = this.pipeTop2.x;

                this.pipeTop3.x = this.pipeTop2.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance);
                this.pipeBtm3.x = this.pipeTop3.x;

                // //An di getReady va TapTap
                // this.getReady.visible = false;
                // this.btnStart.visible = false;

                gameStarted = false;
            }


            this.pipeTop.visible = true;
            this.pipeBtm.visible = true;

            this.pipeTop2.visible = true;
            this.pipeBtm2.visible = true;

            this.pipeTop3.visible = true;
            this.pipeBtm3.visible = true;

            //ong1 di chuyen
            this.pipeBtm.x += -dt * pipeSpeed;
            this.pipeTop.x += -dt * pipeSpeed;

            //ong2 di chuyen
            this.pipeBtm2.x += -dt * pipeSpeed;
            this.pipeTop2.x += -dt * pipeSpeed;

            //ong3 di chuyen
            this.pipeBtm3.x += -dt * pipeSpeed;
            this.pipeTop3.x += -dt * pipeSpeed;


            //ong1
            if (this.pipeBtm.x <= -this.pipeBtm.width / 1.5 - 15) {
                this.pipeBtm.setPosition(cc.winSize.width, -100 + this.getRandom(minRandomBtm, maxRandomBtm));

            }
            if (this.pipeTop.x <= -this.pipeTop.width / 1.5 - 15) {
                this.pipeTop.setPosition(cc.winSize.width, cc.winSize.height - this.getRandom(minRandomTop, maxRandomTop));
            }

            //ong 2
            if (this.pipeBtm2.x <= -this.pipeBtm2.width / 1.5 - 15) {
                this.pipeBtm2.setPosition(cc.winSize.width, -100 + this.getRandom(minRandomBtm, maxRandomBtm));

            }
            if (this.pipeTop2.x <= -this.pipeTop2.width / 1.5 - 15) {
                this.pipeTop2.setPosition(cc.winSize.width, cc.winSize.height - this.getRandom(minRandomTop, maxRandomTop));
            }

            //ong 3
            if (this.pipeBtm3.x <= -this.pipeBtm3.width / 1.5 - 15) {
                this.pipeBtm3.setPosition(cc.winSize.width, -100 + this.getRandom(minRandomBtm, maxRandomBtm));

            }
            if (this.pipeTop3.x <= -this.pipeTop3.width / 1.5 - 15) {
                this.pipeTop3.setPosition(cc.winSize.width, cc.winSize.height - this.getRandom(minRandomTop, maxRandomTop));
            }


            this.chim.accelerator = -1500;

            this.setChimVelocity(this.chim.velocity + (dt * this.chim.accelerator));
            this.chim.y += (dt * this.chim.velocity);

            if (this.chim.y >= cc.winSize.height) {
                this.chim.y = cc.winSize.height
            }

            if (this.chim.y <= 125) {
                if (tmp_playsoundDrop == 0) {
                    cc.audioEngine.playEffect("res/drop.mp3");
                    tmp_playsoundDrop += 1;
                }
                this.chim.y = 125
                gameover = true;
            }

            //ong123 cham
            if (cc.rectIntersectsRect(this.chim.getBoundingBox(), this.pipeTop.getBoundingBox()) ||
                cc.rectIntersectsRect(this.chim.getBoundingBox(), this.pipeTop2.getBoundingBox()) ||
                cc.rectIntersectsRect(this.chim.getBoundingBox(), this.pipeTop3.getBoundingBox())) {
                if (tmp_collsion == false) {
                    cc.audioEngine.playEffect("res/collision.mp3");
                    tmp_collsion = true;
                }

                gameover = true;

                console.log("Cham Top rui");
            }

            if (cc.rectIntersectsRect(this.chim.getBoundingBox(), this.pipeBtm.getBoundingBox()) ||
                cc.rectIntersectsRect(this.chim.getBoundingBox(), this.pipeBtm2.getBoundingBox()) ||
                cc.rectIntersectsRect(this.chim.getBoundingBox(), this.pipeBtm3.getBoundingBox())) {
                if (tmp_collsion == false) {
                    cc.audioEngine.playEffect("res/collision.mp3");
                    tmp_collsion = true;
                }
                gameover = true;
                console.log("Cham Bot rui");
            }

            //check xem dc diem hay ko
            //check vs ong1
            if (this.chim.x + this.chim.width > this.pipeBtm.x && this.chim.x < this.pipeBtm.x + this.pipeBtm.width) {
                check_congdiem = true;
            }

            if (check_congdiem && this.pipeBtm.x + this.pipeBtm.width < this.chim.x) {

                diem += 1;

                if (diem < 10) {
                    var scoreImg = "res/" + diem + ".png";
                    //this.score1.setTexture(scoreImg);
                    this.score1.setTexture(scoreImg);
                } else {
                    var stringDiem = diem.toString();
                    //check diem <99
                    var score1Img = "res/" + stringDiem.substring(0, 1) + ".png";
                    this.score1.setTexture(score1Img);
                    var score2Img = "res/" + stringDiem.substring(1, 2) + ".png";
                    this.score2.setTexture(score2Img);
                    this.score2.setPosition(17 + this.score1.width, cc.winSize.height - this.score2.height * 2 - 5);

                }

                cc.audioEngine.playEffect("res/point.mp3");
                check_congdiem = false;
                //console.log(diem);

            }
            //check vs ong2
            if (this.chim.x + this.chim.width > this.pipeBtm2.x && this.chim.x < this.pipeBtm2.x + this.pipeBtm2.width) {
                check_congdiem = true;
            }

            if (check_congdiem && this.pipeBtm2.x + this.pipeBtm2.width < this.chim.x) {

                diem += 1;

                if (diem < 10) {
                    var scoreImg = "res/" + diem + ".png";
                    //this.score1.setTexture(scoreImg);
                    this.score1.setTexture(scoreImg);
                } else {
                    var stringDiem = diem.toString();
                    //check diem <99
                    var score1Img = "res/" + stringDiem.substring(0, 1) + ".png";
                    this.score1.setTexture(score1Img);
                    var score2Img = "res/" + stringDiem.substring(1, 2) + ".png";
                    this.score2.setTexture(score2Img);
                    this.score2.setPosition(17 + this.score1.width, cc.winSize.height - this.score2.height * 2 - 5);

                }

                cc.audioEngine.playEffect("res/point.mp3");
                check_congdiem = false;
                console.log(diem);

            }
            //check vs ong3
            if (this.chim.x + this.chim.width > this.pipeBtm3.x && this.chim.x < this.pipeBtm3.x + this.pipeBtm3.width) {
                check_congdiem = true;
            }

            if (check_congdiem && this.pipeBtm3.x + this.pipeBtm3.width < this.chim.x) {

                diem += 1;

                if (diem < 10) {
                    var scoreImg = "res/" + diem + ".png";
                    //this.score1.setTexture(scoreImg);
                    this.score1.setTexture(scoreImg);
                } else {
                    var stringDiem = diem.toString();
                    //check diem <99
                    var score1Img = "res/" + stringDiem.substring(0, 1) + ".png";
                    this.score1.setTexture(score1Img);
                    var score2Img = "res/" + stringDiem.substring(1, 2) + ".png";
                    this.score2.setTexture(score2Img);
                    this.score2.setPosition(17 + this.score1.width, cc.winSize.height - this.score2.height * 2 - 5);

                }

                cc.audioEngine.playEffect("res/point.mp3");
                check_congdiem = false;
                console.log(diem);

            }

        }


        //check gameOver
        if (gameover == true) {

            groundSpeed = 0;
            pipeSpeed = 0;

            chim_velocity = 0;
            chim_angle = 0;

            if (tmp_playsoundSwooshing == true) {
                cc.audioEngine.playEffect("res/swooshing.mp3");
                tmp_playsoundSwooshing = false;
            }

            //hien Image GameOver
            if (this.gameoverImage.y > cc.winSize.height / 2 + 125) {
                this.gameoverImage.y += -900 * dt;
            }
            //hien popup
            if (this.popup.y < cc.winSize.height / 2) {
                this.popup.y += 900 * dt;
            }
            //hien medal
            if (0 < diem && diem <= 3) {
                if (this.silverMedal.y < cc.winSize.height / 2) {
                    this.silverMedal.y += 900 * dt;
                }
            } else if (diem > 3) {
                if (this.goldMedal.y < cc.winSize.height / 2) {
                    this.goldMedal.y += 900 * dt;
                }
            }

            //hien diem so
            if (this.endScore2.y <= cc.winSize.height / 2 + 20) {
                if (diem < 10) {
                    var scoreImg = "res/" + diem + ".png";
                    this.endScore2.setTexture(scoreImg);
                    this.endScore2.y += 900 * dt;
                } else {
                    var stringDiem = diem.toString();
                    //check diem <99
                    var score1Img = "res/" + stringDiem.substring(0, 1) + ".png";
                    this.endScore1.setTexture(score1Img);
                    this.endScore1.y += 900 * dt;
                    var score2Img = "res/" + stringDiem.substring(1, 2) + ".png";
                    this.endScore2.setTexture(score2Img);
                    this.endScore2.y += 900 * dt;
                }

            }

            //hien best score
            if (this.bestScoreNum2.y <= cc.winSize.height / 2 - 22) {
                var bestScore = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("bestscore")));
                if (bestScore < 10) {
                    var scoreImg = "res/" + bestScore + ".png";
                    this.bestScoreNum2.setTexture(scoreImg);
                    this.bestScoreNum2.y += 900 * dt;
                } else {
                    var stringDiem = bestScore.toString();
                    //check diem <99
                    var score1Img = "res/" + stringDiem.substring(0, 1) + ".png";
                    this.bestScoreNum1.setTexture(score1Img);
                    this.bestScoreNum1.y += 900 * dt;
                    var score2Img = "res/" + stringDiem.substring(1, 2) + ".png";
                    this.bestScoreNum2.setTexture(score2Img);
                    this.bestScoreNum2.y += 900 * dt;

                }

            }

            //hien btnPlay luc GameOver
            if (this.btnPlay.y <= cc.winSize.height / 2 - this.btnPlay.height * 3) {
                this.btnPlay.y += 900 * dt;
            }

            //luu diem so
            if (diem > JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("bestscore")))) {
                cc.sys.localStorage.setItem(JSON.stringify("bestscore"), JSON.stringify(diem));
            }

        }


        //check restardGame
        if (restartGame == true) {
            this.chim.velocity = 300;
            console.log("chim velocity " + this.chim.velocity);

            //set lai cac thuoc tinh
            this.chim.y = cc.winSize.height;
            gameover = false;
            groundSpeed = 100;
            pipeSpeed = 100;
            chim_velocity = 400;
            chim_angle = -3 / 40;
            tmp_playsoundDrop = 0;
            tmp_playsoundSwooshing = 0;
            diem = 0;
            tmp_collsion = false;

            //set lai vi tri cho cac Pipe
            this.pipeTop.x = xPipe;
            this.pipeBtm.x = xPipe;

            this.pipeTop2.x = this.pipeTop.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance);
            this.pipeBtm2.x = this.pipeTop2.x;

            this.pipeTop3.x = this.pipeTop2.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance);
            this.pipeBtm3.x = this.pipeTop3.x;

            //set lai vi tri cho game over, popup, medal,score, bestscore
            this.gameoverImage.setPosition(cc.winSize.width / 2, cc.winSize.height + 50);
            this.popup.setPosition(cc.winSize.width / 2, -this.popup.height);
            this.silverMedal.setPosition(cc.winSize.width / 2 - 65, -this.popup.height - 5);
            this.goldMedal.setPosition(cc.winSize.width / 2 - 66, -this.popup.height - 8);
            this.endScore1.setPosition(cc.winSize.width / 2 + 70, -this.popup.height - 5);
            this.endScore2.setPosition(cc.winSize.width / 2 + 2 + this.endScore1.width + 70, -this.popup.height - 5);
            this.bestScoreNum1.setPosition(cc.winSize.width / 2 + 70, -this.popup.height - 5);
            this.bestScoreNum2.setPosition(cc.winSize.width / 2 + 2 + this.bestScoreNum1.width + 70, -this.popup.height - 5);
            this.btnPlay.setPosition(cc.winSize.width / 2, -this.btnPlay.height * 5 + 4);

            //set lai diem ve 0
            if (diem < 10) {
                var scoreImg = "res/" + diem + ".png";
                //this.score1.setTexture(scoreImg);
                this.score1.setTexture(scoreImg);
                this.score2.setPosition(17 + this.score1.width, cc.winSize.height);
            } else {
                var stringDiem = diem.toString();
                //check diem <99
                var score1Img = "res/" + stringDiem.substring(0, 1) + ".png";
                this.score1.setTexture(score1Img);
                var score2Img = "res/" + stringDiem.substring(1, 2) + ".png";
                this.score2.setTexture(score2Img);
                this.score2.setPosition(17 + this.score1.width, cc.winSize.height - this.score2.height * 2 - 5);

            }

            restartGame = false;
        }

        //================================check intro game===================================
        if (restartGame == false && introGame == true) {
            this.chim.y = cc.winSize.height * 2 / 3;
            this.chim.velocity = 0;
            this.chim.accelerator = 0;


            this.pipeTop.visible = false;
            this.pipeBtm.visible = false;

            this.pipeTop2.visible = false;
            this.pipeBtm2.visible = false;

            this.pipeTop3.visible = false;
            this.pipeBtm3.visible = false;
            // this.pipeTop.x = -500;
            // this.pipeBtm.x = -500;
            //
            // this.pipeTop2.x = this.pipeTop.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance);
            // this.pipeBtm2.x = this.pipeTop2.x;
            //
            // this.pipeTop3.x = this.pipeTop2.getPositionX() + this.getRandom(minRandomDistance, maxRandomDistance);
            // this.pipeBtm3.x = this.pipeTop3.x;
        }

    },

    setChimVelocity: function (v) {
        this.chim.velocity = v;
        var angle = v < -400 ? -400 : v;
        angle *= chim_angle;
        this.chim.setRotation(angle);
    },

    getRandom: function (min, max) {
        return Math.random() * (max - min) + min;
    },

    isCollision: function (a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        )
    },

    touchEventReplay: function () {
        console.log("da an button");
        restartGame = true;
    },

    touchEventStart: function () {
        console.log("start game");
        introGame = false;
    }

});
