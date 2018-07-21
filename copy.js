var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var url = "mongodb://localhost:27017/user";
var Q = require('q');
/**
/register?name=&&password=&&email
 
 
 
*/
/**************************连接服务器*******************************/
function searchtDatabase(param, storeI, address, res) {
	//连接服务器

	var deferred = Q.defer();
	//res.send("hello");
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		//console.log(db)
		let dbo = db.db("uesrs");
		let userObj = {
			name: param,
			password: storeI,
			address: address
		};

		let ifRepeat = {
			name: param
		};
		let results = false;

		dbo.collection("site").find(ifRepeat).toArray(function (err, result) {
			if (err) deferred.reject(err);;
			//console.log(result[0].password)
			if (result.length == 0) {
				results = true;
			}

			deferred.resolve([results, param, storeI, address, ifRepeat, res]);
			db.close();
		});
	})
	return deferred.promise;
}
/*************************咨询页数********************************* */
function ask(param, res) {

	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		//console.log(db)
		let time = new Date();
		let dbo = db.db("uesrs");
		let user = {
			name: param
		};
		dbo.collection("site").find(user).toArray(function (err, result) {
			if (err) throw err;
			//console.log(result[0].password)
			if (result.length !== 0) {
				res.send('[' + result[0].To + ']')
			}


			db.close();
		});
	})



}
/*********************************更改页数******************************************/
function changeTo(param, Tor, res) {

	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		//console.log(db)
		let time = new Date();
		let dbo = db.db("uesrs");
		let user = {
			name: param
		};
		let changtto = {
			$set: {
				To: Tor
			}
		}
		dbo.collection("site").updateOne(user, changtto, function (err, result) {
			if (err) throw err;
			console.log("文档更新成功");
			db.close();
			res.send('[true]')
		});
	})



}



/********************************************************** */
/**************************TO LOG IN*******************************/
function logIn(param, storeI, res) {


	var deferred = Q.defer();
	//res.send("hello");
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		//console.log(db)
		let dbo = db.db("uesrs");

		let ifRepeat = {
			name: param
		};
		let results = false;

		dbo.collection("site").find(ifRepeat).toArray(function (err, result) {
			if (err) deferred.reject(err);;
			//console.log(result[0].password)
			if (result.length !== 0 && result[0].password === storeI) {
				
				res.send('[true,'+result[0].To+']');
			} else {
				res.send('[false]');
			}
		   let status=result.length !== 0 && result[0].password === storeI;
		   
			deferred.resolve([status]);
			db.close();
		});
	})
	return deferred.promise;
}

function con(a) {
	console.log(1);
}
/***************************TO Register******************************/
function toRegister(a, param, storeI, address, res) {
	//	res.send("hello");
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		//console.log(db)
		let time = new Date();
		let dbo = db.db("uesrs");
		let userObj = {
			name: param,
			password: storeI,
			address: address,
			To: 0
		};
		console.log(a);
		if (a) {
			dbo.collection("site").insertOne(userObj, function (err, result) {
				if (err) throw err;
				console.log("注册成功！");
				//state = true
				db.close();
			})
			console.log("[\"" + time + "注册成功\"," + true + "]")
			res.send("[\"" + time + "注册成功\"," + true + "]")
		} else {
			console.log("[\"" + time + "已有该用户名\"," + false + "]")
			res.send("[\"" + time + "已有该用户名\"," + false + "]")
		}
	})

}
/*******************************ASK ROUNTER**************************/

app.get('/ask', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		index = 0
		state = true

		let param = req.query.name;

		let time = new Date();






		ask(param, res);
	})
	/******************************CHANGE ROUNTER****************************************** */

app.get('/changeTo', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	index = 0
	state = true

	let param = req.query.name;
	let to = req.query.To;
	let time = new Date();






	changeTo(param, to, res);
})





/*********************************************************/
app.get('/register', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		index = 0
		state = true

		let param = req.query.name;
		let storeI = req.query.password;
		let address = req.query.email;
		let time = new Date();






		searchtDatabase(param, storeI, address, res)
			.then(function (data) {
				//console.log(data);
				return toRegister(data[0], data[1], data[2], data[3], data[5]);

			})
			.done(function (data) {
				console.log(data);
			}, function (err) {
				console.log("promise执行失败:" + err);
			});

	})
	/****************************login**********************************/
app.get('/login', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		index = 0
		state = true

		let param = req.query.name;
		let storeI = req.query.password;
		let time = new Date();
		logIn(param, storeI, res)
			.then(function (data) {
				//console.log(data);
				return con(data)

			})
			.done(function (data) {
				//console.log(data);
			}, function (err) {
				console.log("promise执行失败:" + err);
			});




		// searchtDatabase(param, storeI, address,res)
		// 	.then(function (data) {
		// 		//console.log(data);
		// 		return toRegister(data[0], data[1], data[2], data[3], data[5]);

		// 	})
		// 	.done(function (data) {
		// 		console.log(data);
		// 	}, function (err) {
		// 		console.log("promise执行失败:" + err);
		// 	});

	})
	/**************************************************************/
var server = app.listen(8081, function () {

		var host = server.address().address
		var port = server.address().port

		console.log("应用实例，访问地址为 http://%s:%s", host, port)
	})
	/*********************************************************/
	// app.get('/register', function (req, res) {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
	// 	index = 0
	// 	state = false
	//     results =[];
	// 	let param = req.query.name;
	// 	let storeI = req.query.password;
	// 	let address = req.query.email;
	// 	let time = new Date();
	// MongoClient.connect(url, function (err, db) {
	// 	if (err) throw err;
	// 	let dbo = db.db("uesrs");
	// 	let userObj = {
	// 		name: param,
	// 		password: storeI,
	// 		address: address
	// 	};

// 	let ifRepeat = {
// 		name: param
// 	};


//		dbo.collection("site").find(ifRepeat).toArray(function (err, result) {
//			if (err) throw err;
//
//			if (result.length == 0) results = true;
//			db.close();
//		});
//		console.log(results);
//		if (results) {
//			dbo.collection("site").insertOne(userObj, function (err, res) {
//				if (err) throw err;
//				console.log(time + "注册成功！");
//				state = true
//				db.close();
//			})
//			res.send("[\"" + time + "注册成功\"," + true + "]")
//		} else {
//			res.send("[\"" + time + "已有该用户名\"," + false + "]")
//		}
/**************************************************************/
// async.series实现同步调用,失败
/**************************************************************/

//async.series([
//    function(callback) {
//       	dbo.collection("site").find(ifRepeat).toArray(function (err, result) {
//			if (err) throw err;
//			console.log("1");
//             console.log(result);
//			 results = true;
//			db.close();
//		});
//		console.log(results+"1");
//        callback(null, 1);
//    },
//    function(callback) {
//       console.log(results+"2");
//		if (true) {
//			dbo.collection("site").insertOne(userObj, function (err, res) {
//				if (err) throw err;
//				console.log(time + "注册成功！");
//				state = true
//				db.close();
//			})
//			res.send("[\"" + time + "注册成功\"," + true + "]")
//		} else {
//			res.send("[\"" + time + "已有该用户名\"," + false + "]")
//		}
//        callback(null, 2); // callback with a error parameter  
//    }
//], function(error, results1) {
//    if (error) {
//        console.error("error happend: ",error);
//    }
//    console.log(results1); // [1, 2]  
//});





/**************************************************************/
// async.waterfall实现同步调用,也失败了，这是假的同步，并没有同步回调函数
/***********************************************************/

//		async.waterfall([
//    function(callback) {
//		dbo.collection("site").find(ifRepeat).toArray(function (err, result) {
//			if (err) throw err;
//			//console.log("1");
//             console.log(result);
//			results = result;
//			console.log(results);
//			db.close();
//			 
//		});
//		//console.log(results+"1");
//		callback(null, results);
//       
//    },
//    function(result, callback) {
//        // arg1 now equals 'one' and arg2 now equals 'two'
//		console.log(result);
//		if (result.length==0) {
//			dbo.collection("site").insertOne(userObj, function (err, res) {
//				if (err) throw err;
//				console.log(time + "注册成功！");
//				state = true
//				db.close();
//			})
//			res.send("[\"" + time + "注册成功\"," + true + "]")
//		} else {
//			res.send("[\"" + time + "已有该用户名\"," + false + "]")
//		}
//        callback(null, 'two');
//    }
//], function(err, result) {
//    // result now equals 'done'    
//});
//		




/***********************************************************/

// 	})
// // })
// /**************************************************************/
// var server = app.listen(8081, function () {

// 	var host = server.address().address
// 	var port = server.address().port

// 	console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })
