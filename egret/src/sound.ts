namespace sound{
    /**背景音乐 */
    export let domMusic:any=document.querySelector('#bgm');
    /**音乐激活 */
    export function bgmActivate(){
        if(domMusic.paused){
            view.stage.once(egret.TouchEvent.TOUCH_BEGIN,function(){
                domMusic.play();
            },this);
        }
    }
    /**音效激活 */
    export function activate(){
        view.stage.once(egret.TouchEvent.TOUCH_BEGIN,function(){
            var soundChannel:egret.SoundChannel=RES.getRes('ball_mp3').play(0,1);
            soundChannel.volume=0;
        },this);
    }
    /**是否静音 */
    let isMute:boolean=false;
    /**背景音乐图标 */
    export class bgm extends egret.Bitmap{
        constructor(){
            super(RES.getRes('music_png'));
            this.name="bgm";
            let that=this;
            this.anchorOffsetX=this.width/2;
            this.anchorOffsetY=this.height/2;
            this.x=view.stage.stageWidth-57;
            this.y=57;
            //事件
            this.touchEnabled=true;
            domMusic.addEventListener('play',function(){
                that.onPlay();
            });
            domMusic.addEventListener('pause',function(){
                that.onPause();
            });
            
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){        
                if(domMusic.paused){
                    domMusic.play();
                }else{
                    domMusic.pause();
                };
            },this);

            if(!domMusic.paused){
                this.onPlay();
            }
        }
        private onPlay(){
            isMute=false;
            egret.Tween.get(this,{loop:true})
                .to({rotation:360},2500);
        }
        private onPause(){
            isMute=true;
            egret.Tween.removeTweens(this);
            this.rotation=0;
        }
    }
    //音效
    export function play(xtype:string){
        if(!isMute){
            RES.getRes(xtype+'_mp3').play(0,1);
        };
    }
}