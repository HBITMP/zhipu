//引入express中间件
var express = require('express');
var multer  = require('multer');//用express的第三方中间件 multer 实现文件上传功能。
var md5=require("md5")  
var bodyParser = require('body-parser');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use("/",express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('public', options));

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        //文件上传成功后会放入public下的upload文件夹
        cb(null, './public')
    },
    filename: function (req, file, cb){
        //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

app.use('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
  if (req.method == 'OPTIONS') {
    res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  }
  else {
    next();
  }
});
//监听端口为3000
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.post('/upload', upload.single('file'), function (req, res) {
    var url = 'http://' + req.headers.host + "/"+req.file.originalname;
	var str=md5(req.file.originalname)  
    res.json({
		"result":{
			message: "文件上传成功!",
			id: str,
			filename: req.file.originalname,
			url: url 
		}
	});
});

app.post('/user/login', function(req, res){
console.log(req.body)
	res.json({
		username:"12313",
		userid:'1231231',
		message:'success',
		status:200,
	})
});

app.post('/user/register', function(req, res){
	console.log(req.body)
	res.json({
		status:200,
		message: "123456",
	})
})


app.get('/system/musics', function(req, res){
	res.json({
		catelog:[
		{
			type:'1', //风格编号 
		    name: "古典", //风格名
			catelog: [{
						type:1,
						id:'00000001',
						name:'generated_chord_0.mp3',
						address:'http://123.207.24.223:3000/generated_chord_0.mp3',
					},
					{
						type:1,
						id:'00000002',
						name:'generated_chord_1.mp3',
						address:'http://123.207.24.223:3000/generated_chord_1.mp3',
					},
					{
						type:1,
						id:'00000003',
						name:'generated_chord_2.mp3',
						address:'http://123.207.24.223:3000/generated_chord_2.mp3',
					},
					{
						type:1,
						id:'00000004',
						name:'generated_chord_3.mp3',
						address:'http://123.207.24.223:3000/generated_chord_3.mp3',
					},
					{
						type:1,
						id:'00000005',
						name:'generated_chord_4.mp3',
						address:'http://123.207.24.223:3000/generated_chord_4.mp3',
					},
					{
						type:1,
						id:'00000006',
						name:'generated_chord_5.mp3',
						address:'http://123.207.24.223:3000/generated_chord_5.mp3',
					},
					{
						type:1,
						id:'00000007',
						name:'generated_chord_6.mp3',
						address:'http://123.207.24.223:3000/generated_chord_6.mp3',
					},
					{
						type:1,
						id:'00000008',
						name:'generated_chord_7.mp3',
						address:'http://123.207.24.223:3000/generated_chord_7.mp3',
					},
					{
						type:1,
						id:'00000009',
						name:'generated_chord_8.mp3',
						address:'http://123.207.24.223:3000/generated_chord_8.mp3',
					},
					
				]
		},
		{
			type:'2', //风格编号 
		    name: "古典", //风格名
			catelog: [{
						type:1,
						id:'00000001',
						name:'generated_chord_0.mp3',
						address:'http://123.207.24.223:3000/generated_chord_0.mp3',
					},
					{
						type:1,
						id:'00000002',
						name:'generated_chord_1.mp3',
						address:'http://123.207.24.223:3000/generated_chord_1.mp3',
					},
					{
						type:1,
						id:'00000003',
						name:'generated_chord_2.mp3',
						address:'http://123.207.24.223:3000/generated_chord_2.mp3',
					},
					{
						type:1,
						id:'00000004',
						name:'generated_chord_3.mp3',
						address:'http://123.207.24.223:3000/generated_chord_3.mp3',
					},
					{
						type:1,
						id:'00000005',
						name:'generated_chord_4.mp3',
						address:'http://123.207.24.223:3000/generated_chord_4.mp3',
					},
					{
						type:1,
						id:'00000006',
						name:'generated_chord_5.mp3',
						address:'http://123.207.24.223:3000/generated_chord_5.mp3',
					},
					{
						type:1,
						id:'00000007',
						name:'generated_chord_6.mp3',
						address:'http://123.207.24.223:3000/generated_chord_6.mp3',
					},
					{
						type:1,
						id:'00000008',
						name:'generated_chord_7.mp3',
						address:'http://123.207.24.223:3000/generated_chord_7.mp3',
					},
					{
						type:1,
						id:'00000009',
						name:'generated_chord_8.mp3',
						address:'http://123.207.24.223:3000/generated_chord_8.mp3',
					},
					
				]
		},
		{
			type:'3', //风格编号 
		    name: "古典", //风格名
			catelog: [{
						type:1,
						id:'00000001',
						name:'generated_chord_0.mp3',
						address:'http://123.207.24.223:3000/generated_chord_0.mp3',
					},
					{
						type:1,
						id:'00000002',
						name:'generated_chord_1.mp3',
						address:'http://123.207.24.223:3000/generated_chord_1.mp3',
					},
					{
						type:1,
						id:'00000003',
						name:'generated_chord_2.mp3',
						address:'http://123.207.24.223:3000/generated_chord_2.mp3',
					},
					{
						type:1,
						id:'00000004',
						name:'generated_chord_3.mp3',
						address:'http://123.207.24.223:3000/generated_chord_3.mp3',
					},
					{
						type:1,
						id:'00000005',
						name:'generated_chord_4.mp3',
						address:'http://123.207.24.223:3000/generated_chord_4.mp3',
					},
					{
						type:1,
						id:'00000006',
						name:'generated_chord_5.mp3',
						address:'http://123.207.24.223:3000/generated_chord_5.mp3',
					},
					{
						type:1,
						id:'00000007',
						name:'generated_chord_6.mp3',
						address:'http://123.207.24.223:3000/generated_chord_6.mp3',
					},
					{
						type:1,
						id:'00000008',
						name:'generated_chord_7.mp3',
						address:'http://123.207.24.223:3000/generated_chord_7.mp3',
					},
					{
						type:1,
						id:'00000009',
						name:'generated_chord_8.mp3',
						address:'http://123.207.24.223:3000/generated_chord_8.mp3',
					},
					
				]
		},
		]
		
		
	})
})

app.post('/createmusic', function(req, res){
	console.log(req.body)
	res.json({
		"status": 201,         //状态码
		"message": "学习失败", //消息
		"newMusic": false,
		"time": 12,
	});
})

app.post('/getnewmusic', function(req, res){
	console.log(req.body);
	res.json({
		status: 200,         //状态码
		newMusic: true,
		music:{
			id: "musicno1",
			name: "final.mp3",
			address: 'http://localhost:3000/123.mp3',
			wavesurfer: null,
		},
		time:12,
	})
})
