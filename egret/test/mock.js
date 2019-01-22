//初始化
Mock.mock('api/init',{
	"status":1, //1：请求成功 0：请求失败 -1:活动结束
	"isEnd":0, //1:活动结束 0:活动未结束
	"nickname":"缤果互动", //微信昵称
	"photo":"test/photo.jpg",//微信头像
	"score":0,//游戏得分,如果第一次玩没有分数返回0
	"name":"@cname",
	"tel":/^1[34578]\d{9}$/
});
//提交分数
Mock.mock('api/score',{
  	"status": 1, //1:请求成功 0:请求失败
});