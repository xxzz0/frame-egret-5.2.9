class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        // this.stage.maxTouches=1;
        //view命名空间初始化
        view.init(this.stage,this);
        //版本控制
        RES.getVirtualUrl = function(url:string):string {
            if(gdata.version){
                if(url.indexOf("?")==-1){
                    return url+'?v='+gdata.version;
                }else{
                    return url+'&v='+gdata.version;
                }
            }else{
                return url;
            }
        };
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("default.res.json?v=" + Math.random(), cdn+"resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.setMaxLoadingThread(6);//设置加载并发数
        egret.ImageLoader.crossOrigin="anonymous";//全局设置图片加载匿名模式,RES也是基于此设置
        //加载资源
        RES.loadGroup("loading");
        xx.mergeResGroup("merge",["preload","max"]);
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if(event.groupName=="loading"){
            view.to('Loading',1);
            sound.bgmActivate();

            //数据初始化 ajax init 成功后运行
            RES.loadGroup("merge");   

        }else if (event.groupName == "merge") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            //初始化
            dom.domDelayImg();
            element.init();
            // sound.activate();
            view.eNow.complete();
            egret.setTimeout(function(){
                this.stage.addChild(new sound.bgm());
                view.to('P1');
            },this,1000);
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "merge") {
            view.eNow.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}


