/**基础库 */
namespace xx{
    export class Event{
        static COMPLETE="complete";
        static LOOP="loop";
        static PLAY="play";
        static STOP="stop";
    }
    export class MovieClipData{
        public name:string;
        public imgType:string;
        public start:number;
        public end:number;
        public frames:string[]=[];
        public totalFrames:number;
        /**
         * name: "name_#.png"
         */
        public constructor(name:string,start:number,end:number){
            let names=name.split("#.");
            this.name=names[0];
            this.imgType=names[1];
            this.start=start;
            this.end=end;
            this.totalFrames=Math.abs(this.end-this.start+1);
            //frame:"name_n.png"
            if(this.start<this.end){
                for(var i=this.start;i<=this.end;i++){
                    this.frames.push(this.name+i+"_"+this.imgType);
                };
            }else{
                //倒序播放
                for(var i=this.start;i>=this.end;i--){
                    this.frames.push(this.name+i+"_"+this.imgType);
                };
            }
        }
    }
    export class MovieClip extends egret.Bitmap{
        public constructor(public movieClipData:MovieClipData) {
            super();
            this.init();
        }
        public currentFrame:number=0;//当前播放的帧
        public lastFrame:number;
        public frameRate:number=12;//帧频
        public isPlaying:boolean=false;//是否正在播放
        
        private startFrame:number;
        private loopNum:number=0;//>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(不循环播放)
        private nowLoopNum:number=0;//当前循环次数
        private init(){
            this.startFrame=this.currentFrame;
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addTick,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeTick,this);
            this.frameUpdate();
        }
        private frameUpdate(){
            if(this.currentFrame>=this.movieClipData.totalFrames-1){
                if(this.loopNum==0){
                    //不循环播放
                    this.stop();
                    this.dispatchEvent(new egret.Event(Event.COMPLETE));
                }else{
                    //循环播放
                    this.nowLoopNum++;
                    this.dispatchEvent(new egret.Event(Event.LOOP));
                    if(this.nowLoopNum==this.loopNum){
                        this.stop();
                        this.dispatchEvent(new egret.Event(Event.COMPLETE));
                    }
                };
            }
            if(this.currentFrame>=this.movieClipData.totalFrames){
                this.currentFrame=this.startFrame;
            }
            this.texture=RES.getRes(this.movieClipData.frames[this.currentFrame]);
        }
        private lastTime=0;
        private tick(timeStamp){
            var self = this;
            var advancedTime = timeStamp - this.lastTime;
            if(!this.isPlaying||advancedTime<1000/this.frameRate){
                return false;
            }
            this.lastFrame=this.currentFrame;
            this.currentFrame++;
            if(this.lastFrame!=this.currentFrame){
                this.frameUpdate();
            }
            this.lastTime=timeStamp;
            return true;
        }
        private addTick(){
            this.lastTime = egret.getTimer();
            egret.startTick(this.tick,this);
        }
        private removeTick(){
            egret.stopTick(this.tick,this);
        }
        public gotoAndPlay(frame:number,playTimes?:number):void{
            this.loopNum=playTimes||0;
            this.nowLoopNum=0;
            this.startFrame=frame;
            this.lastFrame=this.currentFrame;
            this.currentFrame=frame;
            this.frameUpdate();
            this.play();
        }
        public gotoAndStop(frame:number):void{
            this.lastFrame=this.currentFrame;
            this.currentFrame=frame;
            this.frameUpdate();
            this.stop();
        }
        public play():void{
            if(this.currentFrame==this.movieClipData.totalFrames-1){
                this.currentFrame=this.startFrame;
            }
            this.isPlaying=true;
            this.dispatchEvent(new egret.Event(Event.PLAY));
        }
        public stop():void{
            this.isPlaying=false;
            this.dispatchEvent(new egret.Event(Event.STOP));
        }
    }
    /**
     * 合并加载资源组
     * @param newName 合并后的组名
     * @param names 需要合并的组
     */
    export function mergeResGroup(newName:string,names:string[]){
        let keys:string[]=[];
        for(var i=0;i<names.length;i++){
            var items=RES.getGroupByName(names[i]);
            for(var k=0;k<items.length;k++){
                keys.push(items[k].name);
            };
        };
        RES.createGroup(newName,keys);
    }
    /**文本 */
    export class Text extends egret.TextField{
        public constructor(private xText:string,private xSize:number,private xColor?:number,private xFontFamily?:string,private xCenter?:boolean,private w?:number) {
			super();
            this.text=this.xText;
            this.size=this.xSize;
            if(this.xColor==0||this.xColor){
                this.textColor=this.xColor;
            }else{
                this.textColor=egret.TextField.default_textColor
            }
            this.fontFamily=this.xFontFamily||'Microsoft YaHei';
            this.width=this.w?this.w:this.textWidth;
            if(this.xCenter){
                //是否居中
                this.anchorOffsetX=this.width/2;
                this.anchorOffsetY=this.textHeight/2;
                this.textAlign = "center";
            };
		}
    }
    /**图片 */
    export class Img extends egret.Bitmap{
        constructor(resName:string,center?:boolean){
            super(RES.getRes(resName));
            if(center){
                this.anchorOffsetX=this.width/2;
                this.anchorOffsetY=this.height/2;
            }
        }
    }
    let lastHintText:string;
    /**文字提示 */
    export function hint(text:string){
        if(lastHintText==text){
            return;
        }
        lastHintText=text;
        var w=580,h=70;
        var eBox=new egret.DisplayObjectContainer();
        eBox.anchorOffsetX=w/2;
        eBox.anchorOffsetY=h/2;
        eBox.x=view.stage.stageWidth/2;
        eBox.y=view.stage.stageHeight/2;
        view.mainBox.addChild(eBox);

        var eBg=new egret.Shape();
        eBg.graphics.beginFill(0x000000,0.6);
        eBg.graphics.drawRoundRect(0,0,w,h,40);
        eBg.graphics.endFill();
        eBox.addChild(eBg);

        var eObj=new Text(text,30,0xFFFFFF,null,true);
        eObj.x=w/2;
        eObj.y=h/2;
        eBox.addChild(eObj);

        //###动画###
        eBox.scaleX=eBox.scaleY=1.3;
        eBox.alpha=0;
        
        egret.Tween.get(eBox)
            .to({scaleX:1,scaleY:1,alpha:1},400,egret.Ease.quartOut)
            .wait(1000)
            .to({scaleX:0.8,scaleY:0.8,alpha:0},400,egret.Ease.quartOut)
            .call(function(){
                this.parent.removeChild(this);
                lastHintText=null;
            },eBox);
    }
    /**限制字符串长度 */
    export function textLimit(text:string,num:number):string{
        var t:string=text;
        if(t.length>num){
            t=t.substr(0,num)+"...";
        }
        return t;
    }
    /**
     * 随机挑选
     * @param source 源数组
     * @param num 挑选个数
     */
    export function randomSelect(source:any[],num:number):any[]{
        //浅复制
        // var array=source.concat();
        //深复制
        var array=JSON.parse(JSON.stringify(source));
        var selected=[];
        for(var i=0;i<num;i++){
            var r=Math.floor(Math.random()*array.length);
            selected.push(array[r]);
            array.splice(r,1);
        };
        return selected;
    }
    /**时间格式化 00:00:00 */
    export function timeFormat(t:number):string{
        var t=t||0;
        // t=Math.round(t/1000);
        function format(n){
            var k=n.toString();
            if(k.length<=1) k="0"+k;
            return k;
        }
        var h="00",m="00",s="00";
        h=format(parseInt(t/3600+''));
        m=format(parseInt(t/60+'')%60);
        s=format(t%60);
        return h+":"+m+":"+s;
    }
    /**移除元素 */
    export function remove(theObj:egret.DisplayObject){
        if(theObj.parent)
            theObj.parent.removeChild(theObj);
    }
}