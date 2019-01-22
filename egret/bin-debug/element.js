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
/**元素 */
var element;
(function (element) {
    /**元素初始化 */
    function init() {
    }
    element.init = init;
    /**创建热点 */
    var hitarea = (function (_super) {
        __extends(hitarea, _super);
        function hitarea(x, y, w, h) {
            var _this = _super.call(this) || this;
            _this.graphics.beginFill(0x000000, 0);
            _this.graphics.drawRect(0, 0, w, h);
            _this.x = x;
            _this.y = y;
            _this.touchEnabled = true;
            return _this;
        }
        return hitarea;
    }(egret.Shape));
    element.hitarea = hitarea;
    __reflect(hitarea.prototype, "element.hitarea");
    ;
    /**元素淡出 */
    function moveFadeOut(obj, duration, complete) {
        var duration = duration || 400;
        egret.Tween.get(obj)
            .to({ alpha: 0 }, duration)
            .call(function () {
            obj.parent.removeChild(obj);
            if (complete)
                complete();
        }, this);
    }
    element.moveFadeOut = moveFadeOut;
    /**元素淡入 */
    function moveFadeIn(obj, duration, complete) {
        var duration = duration || 400;
        obj.alpha = 0;
        egret.Tween.get(obj)
            .to({ alpha: 1 }, duration)
            .call(function () {
            if (complete)
                complete();
        }, this);
    }
    element.moveFadeIn = moveFadeIn;
    /**元素缩放进入 */
    function moveScaleIn(obj, duration, complete) {
        var duration = duration || 500;
        obj.scaleX = obj.scaleY = 1.2;
        obj.alpha = 0;
        egret.Tween.get(obj)
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, duration, egret.Ease.quartOut)
            .call(function () {
            if (complete)
                complete();
        }, this);
    }
    element.moveScaleIn = moveScaleIn;
    /**元素缩放离开 */
    function moveScaleOut(obj, duration, complete) {
        var duration = duration || 500;
        egret.Tween.get(obj)
            .to({ alpha: 0, scaleX: 1.2, scaleY: 1.2 }, duration, egret.Ease.quartOut)
            .call(function () {
            xx.remove(obj);
            if (complete)
                complete();
        }, this);
    }
    element.moveScaleOut = moveScaleOut;
    /**按钮点击动画 */
    function moveBtn(disp) {
        egret.Tween.removeTweens(disp);
        egret.Tween.get(disp)
            .to({ scaleX: 0.9, scaleY: 0.9 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 100);
    }
    element.moveBtn = moveBtn;
    /**按钮提示动画 */
    function moveBtn2(disp) {
        egret.Tween.get(disp, { loop: true })
            .to({ scaleX: 0.95, scaleY: 0.95 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 100)
            .to({ scaleX: 0.95, scaleY: 0.95 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 100)
            .wait(1000);
    }
    element.moveBtn2 = moveBtn2;
    /**缩放动画 */
    function moveScale(disp, duration) {
        var duration = duration || 800;
        egret.Tween.get(disp, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, duration)
            .to({ scaleX: 1, scaleY: 1 }, duration);
    }
    element.moveScale = moveScale;
    /**旋转动画 */
    function moveRotation(disp, duration) {
        var duration = duration || 2500;
        egret.Tween.get(disp, { loop: true })
            .to({ rotation: 360 }, duration);
    }
    element.moveRotation = moveRotation;
    /**头像 */
    var Photo = (function (_super) {
        __extends(Photo, _super);
        function Photo(src, size, complete) {
            var _this = _super.call(this) || this;
            _this.src = src;
            _this.size = size;
            _this.complete = complete;
            _this.border = 4;
            var bg = new egret.Shape();
            bg.graphics.beginFill(0xffffff);
            bg.graphics.lineStyle(_this.border, 0x000000, 0.2);
            bg.graphics.drawRoundRect(_this.border / 2, _this.border / 2, _this.size - _this.border, _this.size - _this.border, 10);
            bg.graphics.endFill();
            bg.anchorOffsetX = bg.width / 2;
            bg.anchorOffsetY = bg.height / 2;
            _this.addChild(bg);
            var imgLoader = new egret.ImageLoader();
            // imgLoader.crossOrigin="anonymous";
            imgLoader.once(egret.Event.COMPLETE, _this.imgLoadHandler, _this);
            imgLoader.load(_this.src);
            return _this;
        }
        Photo.prototype.imgLoadHandler = function (e) {
            var size = this.size - this.border;
            var loader = e.currentTarget;
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bmp = new egret.Bitmap(texture);
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
            bmp.scaleX = bmp.scaleY = (bmp.width > bmp.height) ? size / bmp.height : size / bmp.width;
            this.addChild(bmp);
            var mask = new egret.Shape();
            mask.graphics.beginFill(0x000000);
            mask.graphics.drawRoundRect(-size / 2, -size / 2, size, size, 10);
            mask.graphics.endFill();
            this.addChild(mask);
            bmp.mask = mask;
            if (this.complete)
                this.complete();
        };
        return Photo;
    }(egret.DisplayObjectContainer));
    element.Photo = Photo;
    __reflect(Photo.prototype, "element.Photo");
})(element || (element = {}));
//# sourceMappingURL=element.js.map