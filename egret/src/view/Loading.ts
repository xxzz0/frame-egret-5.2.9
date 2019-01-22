namespace view{
	export class Loading extends Base{
		public constructor() {
			super();
			this.createScene();
		}
		//成员变量
		public pid="Loading";
		private eProgress:egret.TextField;
		private tweenLoop:egret.DisplayObject[]=[];
		//###功能###
        public setProgress(current:number, total:number):void {
			var progress=Math.ceil(current/total*100);
			this.eProgress.text=progress+"%";
        }
		//###创建场景###
		private createScene() {
			//###元素布局###
			//背景
			let bg=new egret.Shape();
			bg.graphics.beginFill(0x08e2c0);
			bg.graphics.drawRect(0,0,view.stage.stageWidth,view.stage.stageHeight);
			bg.graphics.endFill();
            this.addChild(bg);
			//进度
			this.eProgress=new xx.Text('0%',30,0xffffff,null,true,300);
			this.eProgress.x=view.stage.stageWidth/2;
			this.eProgress.y=view.stage.stageHeight/2;
			this.addChild(this.eProgress);
		}
		/**加载完成 */
		public complete(){
			
		}
		//###页面离开(动画)###
		public out(){
			for(var i=0;i<this.tweenLoop.length;i++){
				egret.Tween.removeTweens(this.tweenLoop[i]);
			}
		}
	}
}