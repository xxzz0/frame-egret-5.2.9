var dom;
(function (dom) {
    //rem
    ;
    (function () {
        /**
         * css元素尺寸=设计稿元素尺寸/100;
         */
        var psw = 750; //设计稿尺寸
        var change = 'orientationchange' in window ? 'orientationchange' : 'resize';
        function calculate() {
            var deviceWidth = document.documentElement.clientWidth;
            document.documentElement.style.fontSize = deviceWidth / psw * 100 + 'px';
        }
        ;
        var timer;
        window.addEventListener(change, function () {
            clearTimeout(timer);
            timer = setTimeout(calculate, 300);
        }, false);
        calculate();
    })();
    var event = ('ontouchstart' in window) ? { start: 'touchstart', move: 'touchmove', end: 'touchend' } : { start: 'mousedown', move: 'mousemove', end: 'mouseup' };
    /**dom图片延迟加载 */
    function domDelayImg() {
        var domImgs = document.querySelectorAll('img[data-src]');
        for (var i = 0; i < domImgs.length; i++) {
            domImgs[i].src = cdn + domImgs[i].dataset.src + "?v=" + gdata.version;
        }
    }
    dom.domDelayImg = domDelayImg;
})(dom || (dom = {}));
//# sourceMappingURL=dom.js.map