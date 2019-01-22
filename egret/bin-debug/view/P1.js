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
    var P1 = (function (_super) {
        __extends(P1, _super);
        function P1() {
            var _this = _super.call(this, true) || this;
            //成员变量
            _this.pid = "P1";
            _this.tweenLoop = [];
            _this.createScene();
            return _this;
        }
        //###创建场景###
        P1.prototype.createScene = function () {
            var bg = new xx.Img("bg_jpg");
            bg.height = 1450;
            this.addChild(bg);
        };
        //###页面离开(动画)###
        P1.prototype.out = function () {
            for (var i = 0; i < this.tweenLoop.length; i++) {
                egret.Tween.removeTweens(this.tweenLoop[i]);
            }
        };
        return P1;
    }(view.Base));
    view.P1 = P1;
    __reflect(P1.prototype, "view.P1");
})(view || (view = {}));
//# sourceMappingURL=P1.js.map