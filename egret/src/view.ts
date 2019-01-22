//视图命名空间
namespace view{
    export let stage:egret.Stage;//舞台
    export let mainBox:Main;//文档类容器
    export let eLast:any;//上一页
    export let eNow:any;//当前页
    export let egretPlayer:any=document.querySelector('.egret-player');
    /**预设的高度 */
    export let contentHeight:number=eval(egretPlayer.dataset.contentHeight);
    /**页面间距 */
    export let margin:number=0;
    //初始化
    export function init(stage:egret.Stage,main:Main){
        view.stage=stage;
        view.mainBox=main;
        margin=(stage.stageHeight-contentHeight)/2;
    }
    //视图基类
    export abstract class Base extends egret.DisplayObjectContainer{
        /**
         * @param isFixedHeight {boolean} 是否固定高度
         */
        public constructor(isFixedHeight?:boolean) {
            super();
            if(isFixedHeight){
                this.height=contentHeight;
            }else{
                this.height=stage.stageHeight;
            };
            this.x=this.anchorOffsetX=stage.stageWidth/2;
            this.anchorOffsetY=this.height/2;
            this.y=stage.stageHeight/2;
        }
        abstract pid:string;
        abstract out():void;
    }
    /**视图切换 */
    export function to(pid:string,animationTypes?:number,duration?:number){
        if(eNow&&pid==eNow.pid) return;
        var duration=duration||700;
        eLast=eNow;
        // egret.Tween.removeAllTweens();
        eNow=new view[pid]();
        mainBox.addChild(eNow);
        eNow.touchEnabled=eNow.touchChildren=false;
        //上个页面退出
        if(eLast){
            eLast.touchEnabled=eLast.touchChildren=false;
            eLast.out();
        }
        if(animationTypes==0){
            //无切换动画
            changeComplete();
        }else if(animationTypes==1){
            //渐隐
            eNow.alpha=0;
            egret.Tween.get(eNow)
                .to({alpha:1},duration)
                .call(function(){
                    changeComplete();
                },this);
        }else if(animationTypes==2){
            //moveScaleIn
            var theObj:egret.DisplayObject=eNow;
            theObj.alpha=0;
            theObj.scaleX=eNow.scaleY=1.5;
            egret.Tween.get(eNow)
                .to({alpha:1,scaleX:1,scaleY:1},duration,egret.Ease.quartOut)
                .call(function(){
                    changeComplete();
                },this);
        }else{
            //遮罩切换
            let radius=Math.sqrt(Math.pow(stage.stageWidth,2)+Math.pow(stage.stageHeight,2))/2;
            let oMask=new egret.Shape();
            oMask.graphics.beginFill( 0xFF0000, 1);
            oMask.graphics.drawCircle(0,0,radius);
            oMask.graphics.endFill();
            oMask.x=stage.stageWidth/2;
            oMask.y=stage.stageHeight/2;
            eNow.mask=oMask;
            oMask.scaleX=oMask.scaleY=0;
            mainBox.addChild(oMask);
            //页面切换动画(遮罩)
            egret.Tween.get(oMask)
                .to({scaleX:1,scaleY:1},duration,egret.Ease.quadOut)
                .call(function(){   
                    changeComplete();
                    eNow.mask=null;
                    mainBox.removeChild(oMask);
                },oMask);
        };
    }
    /**页面切换完成 */
    function changeComplete(){
        eNow.touchEnabled=eNow.touchChildren=true;
        if(eLast){
            mainBox.removeChild(eLast);
        }
    }
    /**当前视图退出 */
    export function out(complete?:()=>void){
        if(!eNow) return;
        eNow.out();
        egret.Tween.get(eNow)
            .to({alpha:0},500)
            .call(function(){
                mainBox.removeChild(eNow);
                eNow=null;
                if(complete) complete();
            },this);
    }
    /**当前视图移除 无动画*/
    export function remove(){
        eNow.out();
        mainBox.removeChild(eNow);
        eNow=null;
    }
}