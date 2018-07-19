// JavaScript Document
//express_demo.js 文件
var express = require('express');
var app = express();
var data_p={Test1:{x:1,y:0},Test2:{x:0,y:0},Test3:{x:0,y:1}}
let indexof=[{"admin":1}]
let index=0
let state = false
app.get('/search', function (req, res) {
	 res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	 index=0
	 state = false
	var param = req.query.name;
	indexof.forEach((i)=>{ 
		if(i[param]!==undefined){
	    index=i[param]
		state=true
		callback='callback'
		str= '[\"'+param+'\",'+i[param]  + ',true]'
		
		res.send(str)
		console.log(JSON.stringify(i))
	}})
	
	if(!state){
			let	buff =param
			let buf =  JSON.parse("{\""+buff+"\":0}")  
			index=0
			indexof.push(buf)
			state=false
			callback='callback'
	    	str= '[\"'+param+'\",'+index  + ',false]'
			res.send(str)
			}	
	
	console.log(indexof)
	console.log(param);
	
})
app.get('/set', function (req, res) {
	   res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	 index=0
	 state = false
	var param = req.query.name;
	var storeI = req.query.To
	indexof.forEach((i)=>{ 
		if(i[param]!==undefined){
		console.log(i[param])
	    i[param]=Number(storeI)
		state=true
		callback='callback'
		str= '[\"'+param+'\",'+i[param]  + ',true]'
		res.send(str)
		console.log("修改成功！")
	}})
	
	if(!state){
	        console.log("无此参数！")  
			state=false
			}	
	console.log(indexof)
	console.log(param);

	
})
 
  var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})