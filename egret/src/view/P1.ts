namespace view{
	export class P1 extends Base{
		public constructor() {
			super(true);
			this.createScene();
		}
		//成员变量
		public pid="P1";
		private tweenLoop:egret.DisplayObject[]=[];
		//###创建场景###
		private createScene() {
			let bg=new xx.Img("bg_jpg");
			bg.height=1450;
			this.addChild(bg);
        }
		//###页面离开(动画)###
		public out(){
			for(var i=0;i<this.tweenLoop.length;i++){
				egret.Tween.removeTweens(this.tweenLoop[i]);
			}
		}
	}
}