/**元素 */
namespace element{
    /**元素初始化 */
    export function init(){
        
    }
    /**创建热点 */
    export class hitarea extends egret.Shape{
        constructor(x:number,y:number,w:number,h:number){
            super();
            this.graphics.beginFill(0x000000,0);
            this.graphics.drawRect(0,0,w,h);
            this.x=x;
            this.y=y;
            this.touchEnabled=true;
        }
    };
    /**元素淡出 */
    export function moveFadeOut(obj,duration?:number,complete?:Function){
        var duration=duration||400;
        egret.Tween.get(obj)
            .to({alpha:0},duration)
            .call(function(){
                obj.parent.removeChild(obj);
                if(complete) complete();
            },this);
    }
    /**元素淡入 */
    export function moveFadeIn(obj:egret.DisplayObject,duration?:number,complete?:Function){
        var duration=duration||400;
        obj.alpha=0;
        egret.Tween.get(obj)
            .to({alpha:1},duration)
            .call(function(){
                if(complete) complete();
            },this);
    }
    /**元素缩放进入 */
    export function moveScaleIn(obj:egret.DisplayObject,duration?:number,complete?:Function){
        var duration=duration||500;
        obj.scaleX=obj.scaleY=1.2;
        obj.alpha=0;
        egret.Tween.get(obj)
            .to({alpha:1,scaleX:1,scaleY:1},duration,egret.Ease.quartOut)
            .call(function(){
                if(complete) complete();
            },this);
    }
    /**元素缩放离开 */
    export function moveScaleOut(obj:egret.DisplayObject,duration?:number,complete?:Function){
        var duration=duration||500;
        egret.Tween.get(obj)
            .to({alpha:0,scaleX:1.2,scaleY:1.2},duration,egret.Ease.quartOut)
            .call(function(){
                xx.remove(obj);
                if(complete) complete();
            },this);
    }
    /**按钮点击动画 */
    export function moveBtn(disp:egret.DisplayObject){
        egret.Tween.removeTweens(disp);
        egret.Tween.get(disp)
            .to({scaleX:0.9,scaleY:0.9},100)
            .to({scaleX:1,scaleY:1},100);
    }
    /**按钮提示动画 */
    export function moveBtn2(disp:egret.DisplayObject){
        egret.Tween.get(disp,{loop:true})
            .to({scaleX:0.95,scaleY:0.95},100)
            .to({scaleX:1,scaleY:1},100)
            .to({scaleX:0.95,scaleY:0.95},100)
            .to({scaleX:1,scaleY:1},100)
            .wait(1000);
    }
    /**缩放动画 */
    export function moveScale(disp:egret.DisplayObject,duration?:number){
        var duration=duration||800;
        egret.Tween.get(disp,{loop:true})
            .to({scaleX:0.9,scaleY:0.9},duration)
            .to({scaleX:1,scaleY:1},duration);
    }
    /**旋转动画 */
    export function moveRotation(disp:egret.DisplayObject,duration?:number){
        var duration=duration||2500;
        egret.Tween.get(disp,{loop:true})
                .to({rotation:360},duration);
    }
    /**头像 */
    export class Photo extends egret.DisplayObjectContainer{
        private border:number;
        public constructor(private src:string,private size:number,private complete?:()=>void) {
			super();
            
            this.border=4;
            let bg=new egret.Shape();
            bg.graphics.beginFill(0xffffff);
            bg.graphics.lineStyle(this.border,0x000000,0.2);
            bg.graphics.drawRoundRect(this.border/2,this.border/2,this.size-this.border,this.size-this.border,10);
            bg.graphics.endFill();
            bg.anchorOffsetX=bg.width/2;
            bg.anchorOffsetY=bg.height/2;
            this.addChild(bg);

            var imgLoader:egret.ImageLoader = new egret.ImageLoader();
            // imgLoader.crossOrigin="anonymous";
            imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this ); 
            imgLoader.load(this.src);
		}
        private imgLoadHandler(e:egret.Event){
            var size=this.size-this.border;
            var loader:egret.ImageLoader = e.currentTarget;
            var bmd:egret.BitmapData = loader.data;
            var texture=new egret.Texture();
            texture.bitmapData=bmd;
            var bmp:egret.Bitmap=new egret.Bitmap(texture);
            bmp.anchorOffsetX=bmp.width/2;
            bmp.anchorOffsetY=bmp.height/2;
            bmp.scaleX=bmp.scaleY=(bmp.width>bmp.height)?size/bmp.height:size/bmp.width;
            this.addChild(bmp);
            var mask=new egret.Shape();
            mask.graphics.beginFill(0x000000);
            mask.graphics.drawRoundRect(-size/2,-size/2,size,size,10);
            mask.graphics.endFill();
            this.addChild(mask);
            bmp.mask=mask;
            if(this.complete) this.complete();
        }
    }
}