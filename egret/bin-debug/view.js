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
//视图命名空间
var view;
(function (view) {
    view.egretPlayer = document.querySelector('.egret-player');
    /**预设的高度 */
    view.contentHeight = eval(view.egretPlayer.dataset.contentHeight);
    /**页面间距 */
    view.margin = 0;
    //初始化
    function init(stage, main) {
        view.stage = stage;
        view.mainBox = main;
        view.margin = (stage.stageHeight - view.contentHeight) / 2;
    }
    view.init = init;
    //视图基类
    var Base = (function (_super) {
        __extends(Base, _super);
        /**
         * @param isFixedHeight {boolean} 是否固定高度
         */
        function Base(isFixedHeight) {
            var _this = _super.call(this) || this;
            if (isFixedHeight) {
                _this.height = view.contentHeight;
            }
            else {
                _this.height = view.stage.stageHeight;
            }
            ;
            _this.x = _this.anchorOffsetX = view.stage.stageWidth / 2;
            _this.anchorOffsetY = _this.height / 2;
            _this.y = view.stage.stageHeight / 2;
            return _this;
        }
        return Base;
    }(egret.DisplayObjectContainer));
    view.Base = Base;
    __reflect(Base.prototype, "view.Base");
    /**视图切换 */
    function to(pid, animationTypes, duration) {
        if (view.eNow && pid == view.eNow.pid)
            return;
        var duration = duration || 700;
        view.eLast = view.eNow;
        // egret.Tween.removeAllTweens();
        view.eNow = new view[pid]();
        view.mainBox.addChild(view.eNow);
        view.eNow.touchEnabled = view.eNow.touchChildren = false;
        //上个页面退出
        if (view.eLast) {
            view.eLast.touchEnabled = view.eLast.touchChildren = false;
            view.eLast.out();
        }
        if (animationTypes == 0) {
            //无切换动画
            changeComplete();
        }
        else if (animationTypes == 1) {
            //渐隐
            view.eNow.alpha = 0;
            egret.Tween.get(view.eNow)
                .to({ alpha: 1 }, duration)
                .call(function () {
                changeComplete();
            }, this);
        }
        else if (animationTypes == 2) {
            //moveScaleIn
            var theObj = view.eNow;
            theObj.alpha = 0;
            theObj.scaleX = view.eNow.scaleY = 1.5;
            egret.Tween.get(view.eNow)
                .to({ alpha: 1, scaleX: 1, scaleY: 1 }, duration, egret.Ease.quartOut)
                .call(function () {
                changeComplete();
            }, this);
        }
        else {
            //遮罩切换
            var radius = Math.sqrt(Math.pow(view.stage.stageWidth, 2) + Math.pow(view.stage.stageHeight, 2)) / 2;
            var oMask_1 = new egret.Shape();
            oMask_1.graphics.beginFill(0xFF0000, 1);
            oMask_1.graphics.drawCircle(0, 0, radius);
            oMask_1.graphics.endFill();
            oMask_1.x = view.stage.stageWidth / 2;
            oMask_1.y = view.stage.stageHeight / 2;
            view.eNow.mask = oMask_1;
            oMask_1.scaleX = oMask_1.scaleY = 0;
            view.mainBox.addChild(oMask_1);
            //页面切换动画(遮罩)
            egret.Tween.get(oMask_1)
                .to({ scaleX: 1, scaleY: 1 }, duration, egret.Ease.quadOut)
                .call(function () {
                changeComplete();
                view.eNow.mask = null;
                view.mainBox.removeChild(oMask_1);
            }, oMask_1);
        }
        ;
    }
    view.to = to;
    /**页面切换完成 */
    function changeComplete() {
        view.eNow.touchEnabled = view.eNow.touchChildren = true;
        if (view.eLast) {
            view.mainBox.removeChild(view.eLast);
        }
    }
    /**当前视图退出 */
    function out(complete) {
        if (!view.eNow)
            return;
        view.eNow.out();
        egret.Tween.get(view.eNow)
            .to({ alpha: 0 }, 500)
            .call(function () {
            view.mainBox.removeChild(view.eNow);
            view.eNow = null;
            if (complete)
                complete();
        }, this);
    }
    view.out = out;
    /**当前视图移除 无动画*/
    function remove() {
        view.eNow.out();
        view.mainBox.removeChild(view.eNow);
        view.eNow = null;
    }
    view.remove = remove;
})(view || (view = {}));
//# sourceMappingURL=view.js.map