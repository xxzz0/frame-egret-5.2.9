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
/**基础库 */
var xx;
(function (xx) {
    var Event = (function () {
        function Event() {
        }
        Event.COMPLETE = "complete";
        Event.LOOP = "loop";
        Event.PLAY = "play";
        Event.STOP = "stop";
        return Event;
    }());
    xx.Event = Event;
    __reflect(Event.prototype, "xx.Event");
    var MovieClipData = (function () {
        /**
         * name: "name_#.png"
         */
        function MovieClipData(name, start, end) {
            this.frames = [];
            var names = name.split("#.");
            this.name = names[0];
            this.imgType = names[1];
            this.start = start;
            this.end = end;
            this.totalFrames = Math.abs(this.end - this.start + 1);
            //frame:"name_n.png"
            if (this.start < this.end) {
                for (var i = this.start; i <= this.end; i++) {
                    this.frames.push(this.name + i + "_" + this.imgType);
                }
                ;
            }
            else {
                //倒序播放
                for (var i = this.start; i >= this.end; i--) {
                    this.frames.push(this.name + i + "_" + this.imgType);
                }
                ;
            }
        }
        return MovieClipData;
    }());
    xx.MovieClipData = MovieClipData;
    __reflect(MovieClipData.prototype, "xx.MovieClipData");
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(movieClipData) {
            var _this = _super.call(this) || this;
            _this.movieClipData = movieClipData;
            _this.currentFrame = 0; //当前播放的帧
            _this.frameRate = 12; //帧频
            _this.isPlaying = false; //是否正在播放
            _this.loopNum = 0; //>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(不循环播放)
            _this.nowLoopNum = 0; //当前循环次数
            _this.lastTime = 0;
            _this.init();
            return _this;
        }
        MovieClip.prototype.init = function () {
            this.startFrame = this.currentFrame;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addTick, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTick, this);
            this.frameUpdate();
        };
        MovieClip.prototype.frameUpdate = function () {
            if (this.currentFrame >= this.movieClipData.totalFrames - 1) {
                if (this.loopNum == 0) {
                    //不循环播放
                    this.stop();
                    this.dispatchEvent(new egret.Event(Event.COMPLETE));
                }
                else {
                    //循环播放
                    this.nowLoopNum++;
                    this.dispatchEvent(new egret.Event(Event.LOOP));
                    if (this.nowLoopNum == this.loopNum) {
                        this.stop();
                        this.dispatchEvent(new egret.Event(Event.COMPLETE));
                    }
                }
                ;
            }
            if (this.currentFrame >= this.movieClipData.totalFrames) {
                this.currentFrame = this.startFrame;
            }
            this.texture = RES.getRes(this.movieClipData.frames[this.currentFrame]);
        };
        MovieClip.prototype.tick = function (timeStamp) {
            var self = this;
            var advancedTime = timeStamp - this.lastTime;
            if (!this.isPlaying || advancedTime < 1000 / this.frameRate) {
                return false;
            }
            this.lastFrame = this.currentFrame;
            this.currentFrame++;
            if (this.lastFrame != this.currentFrame) {
                this.frameUpdate();
            }
            this.lastTime = timeStamp;
            return true;
        };
        MovieClip.prototype.addTick = function () {
            this.lastTime = egret.getTimer();
            egret.startTick(this.tick, this);
        };
        MovieClip.prototype.removeTick = function () {
            egret.stopTick(this.tick, this);
        };
        MovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
            this.loopNum = playTimes || 0;
            this.nowLoopNum = 0;
            this.startFrame = frame;
            this.lastFrame = this.currentFrame;
            this.currentFrame = frame;
            this.frameUpdate();
            this.play();
        };
        MovieClip.prototype.gotoAndStop = function (frame) {
            this.lastFrame = this.currentFrame;
            this.currentFrame = frame;
            this.frameUpdate();
            this.stop();
        };
        MovieClip.prototype.play = function () {
            if (this.currentFrame == this.movieClipData.totalFrames - 1) {
                this.currentFrame = this.startFrame;
            }
            this.isPlaying = true;
            this.dispatchEvent(new egret.Event(Event.PLAY));
        };
        MovieClip.prototype.stop = function () {
            this.isPlaying = false;
            this.dispatchEvent(new egret.Event(Event.STOP));
        };
        return MovieClip;
    }(egret.Bitmap));
    xx.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "xx.MovieClip");
    /**
     * 合并加载资源组
     * @param newName 合并后的组名
     * @param names 需要合并的组
     */
    function mergeResGroup(newName, names) {
        var keys = [];
        for (var i = 0; i < names.length; i++) {
            var items = RES.getGroupByName(names[i]);
            for (var k = 0; k < items.length; k++) {
                keys.push(items[k].name);
            }
            ;
        }
        ;
        RES.createGroup(newName, keys);
    }
    xx.mergeResGroup = mergeResGroup;
    /**文本 */
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(xText, xSize, xColor, xFontFamily, xCenter, w) {
            var _this = _super.call(this) || this;
            _this.xText = xText;
            _this.xSize = xSize;
            _this.xColor = xColor;
            _this.xFontFamily = xFontFamily;
            _this.xCenter = xCenter;
            _this.w = w;
            _this.text = _this.xText;
            _this.size = _this.xSize;
            if (_this.xColor == 0 || _this.xColor) {
                _this.textColor = _this.xColor;
            }
            else {
                _this.textColor = egret.TextField.default_textColor;
            }
            _this.fontFamily = _this.xFontFamily || 'Microsoft YaHei';
            _this.width = _this.w ? _this.w : _this.textWidth;
            if (_this.xCenter) {
                //是否居中
                _this.anchorOffsetX = _this.width / 2;
                _this.anchorOffsetY = _this.textHeight / 2;
                _this.textAlign = "center";
            }
            ;
            return _this;
        }
        return Text;
    }(egret.TextField));
    xx.Text = Text;
    __reflect(Text.prototype, "xx.Text");
    /**图片 */
    var Img = (function (_super) {
        __extends(Img, _super);
        function Img(resName, center) {
            var _this = _super.call(this, RES.getRes(resName)) || this;
            if (center) {
                _this.anchorOffsetX = _this.width / 2;
                _this.anchorOffsetY = _this.height / 2;
            }
            return _this;
        }
        return Img;
    }(egret.Bitmap));
    xx.Img = Img;
    __reflect(Img.prototype, "xx.Img");
    var lastHintText;
    /**文字提示 */
    function hint(text) {
        if (lastHintText == text) {
            return;
        }
        lastHintText = text;
        var w = 580, h = 70;
        var eBox = new egret.DisplayObjectContainer();
        eBox.anchorOffsetX = w / 2;
        eBox.anchorOffsetY = h / 2;
        eBox.x = view.stage.stageWidth / 2;
        eBox.y = view.stage.stageHeight / 2;
        view.mainBox.addChild(eBox);
        var eBg = new egret.Shape();
        eBg.graphics.beginFill(0x000000, 0.6);
        eBg.graphics.drawRoundRect(0, 0, w, h, 40);
        eBg.graphics.endFill();
        eBox.addChild(eBg);
        var eObj = new Text(text, 30, 0xFFFFFF, null, true);
        eObj.x = w / 2;
        eObj.y = h / 2;
        eBox.addChild(eObj);
        //###动画###
        eBox.scaleX = eBox.scaleY = 1.3;
        eBox.alpha = 0;
        egret.Tween.get(eBox)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, egret.Ease.quartOut)
            .wait(1000)
            .to({ scaleX: 0.8, scaleY: 0.8, alpha: 0 }, 400, egret.Ease.quartOut)
            .call(function () {
            this.parent.removeChild(this);
            lastHintText = null;
        }, eBox);
    }
    xx.hint = hint;
    /**限制字符串长度 */
    function textLimit(text, num) {
        var t = text;
        if (t.length > num) {
            t = t.substr(0, num) + "...";
        }
        return t;
    }
    xx.textLimit = textLimit;
    /**
     * 随机挑选
     * @param source 源数组
     * @param num 挑选个数
     */
    function randomSelect(source, num) {
        //浅复制
        // var array=source.concat();
        //深复制
        var array = JSON.parse(JSON.stringify(source));
        var selected = [];
        for (var i = 0; i < num; i++) {
            var r = Math.floor(Math.random() * array.length);
            selected.push(array[r]);
            array.splice(r, 1);
        }
        ;
        return selected;
    }
    xx.randomSelect = randomSelect;
    /**时间格式化 00:00:00 */
    function timeFormat(t) {
        var t = t || 0;
        // t=Math.round(t/1000);
        function format(n) {
            var k = n.toString();
            if (k.length <= 1)
                k = "0" + k;
            return k;
        }
        var h = "00", m = "00", s = "00";
        h = format(parseInt(t / 3600 + ''));
        m = format(parseInt(t / 60 + '') % 60);
        s = format(t % 60);
        return h + ":" + m + ":" + s;
    }
    xx.timeFormat = timeFormat;
    /**移除元素 */
    function remove(theObj) {
        if (theObj.parent)
            theObj.parent.removeChild(theObj);
    }
    xx.remove = remove;
})(xx || (xx = {}));
//# sourceMappingURL=xx.js.map