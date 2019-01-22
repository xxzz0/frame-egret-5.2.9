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
var view;
(function (view) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            var _this = _super.call(this) || this;
            //成员变量
            _this.pid = "Loading";
            _this.tweenLoop = [];
            _this.createScene();
            return _this;
        }
        //###功能###
        Loading.prototype.setProgress = function (current, total) {
            var progress = Math.ceil(current / total * 100);
            this.eProgress.text = progress + "%";
        };
        //###创建场景###
        Loading.prototype.createScene = function () {
            //###元素布局###
            //背景
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x08e2c0);
            bg.graphics.drawRect(0, 0, view.stage.stageWidth, view.stage.stageHeight);
            bg.graphics.endFill();
            this.addChild(bg);
            //进度
            this.eProgress = new xx.Text('0%', 30, 0xffffff, null, true, 300);
            this.eProgress.x = view.stage.stageWidth / 2;
            this.eProgress.y = view.stage.stageHeight / 2;
            this.addChild(this.eProgress);
        };
        /**加载完成 */
        Loading.prototype.complete = function () {
        };
        //###页面离开(动画)###
        Loading.prototype.out = function () {
            for (var i = 0; i < this.tweenLoop.length; i++) {
                egret.Tween.removeTweens(this.tweenLoop[i]);
            }
        };
        return Loading;
    }(view.Base));
    view.Loading = Loading;
    __reflect(Loading.prototype, "view.Loading");
})(view || (view = {}));
//# sourceMappingURL=Loading.js.map