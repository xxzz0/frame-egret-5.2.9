var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var sound;
(function (sound) {
    /**背景音乐 */
    sound.domMusic = document.querySelector('#bgm');
    /**音乐激活 */
    function bgmActivate() {
        if (sound.domMusic.paused) {
            view.stage.once(egret.TouchEvent.TOUCH_BEGIN, function () {
                sound.domMusic.play();
            }, this);
        }
    }
    sound.bgmActivate = bgmActivate;
    /**音效激活 */
    function activate() {
        view.stage.once(egret.TouchEvent.TOUCH_BEGIN, function () {
            var soundChannel = RES.getRes('ball_mp3').play(0, 1);
            soundChannel.volume = 0;
        }, this);
    }
    sound.activate = activate;
    /**是否静音 */
    var isMute = false;
    /**背景音乐图标 */
    var bgm = (function (_super) {
        __extends(bgm, _super);
        function bgm() {
            var _this = _super.call(this, RES.getRes('music_png')) || this;
            _this.name = "bgm";
            var that = _this;
            _this.anchorOffsetX = _this.width / 2;
            _this.anchorOffsetY = _this.height / 2;
            _this.x = view.stage.stageWidth - 57;
            _this.y = 57;
            //事件
            _this.touchEnabled = true;
            sound.domMusic.addEventListener('play', function () {
                that.onPlay();
            });
            sound.domMusic.addEventListener('pause', function () {
                that.onPause();
            });
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (sound.domMusic.paused) {
                    sound.domMusic.play();
                }
                else {
                    sound.domMusic.pause();
                }
                ;
            }, _this);
            if (!sound.domMusic.paused) {
                _this.onPlay();
            }
            return _this;
        }
        bgm.prototype.onPlay = function () {
            isMute = false;
            egret.Tween.get(this, { loop: true })
                .to({ rotation: 360 }, 2500);
        };
        bgm.prototype.onPause = function () {
            isMute = true;
            egret.Tween.removeTweens(this);
            this.rotation = 0;
        };
        return bgm;
    }(egret.Bitmap));
    sound.bgm = bgm;
    __reflect(bgm.prototype, "sound.bgm");
    //音效
    function play(xtype) {
        if (!isMute) {
            RES.getRes(xtype + '_mp3').play(0, 1);
        }
        ;
    }
    sound.play = play;
})(sound || (sound = {}));
//# sourceMappingURL=sound.js.map