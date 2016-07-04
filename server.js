var http = require('http');
var path = require('path');
var captchapng = require('captchapng');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');

module.exports = (()=>{
	function inner(){
		this.start = whatToDo=>{
			app.use(bodyParser());
			app.use(express.static(__dirname + '/public'));
			app.get('/captcha', (req, res) => {
				res.sendFile(__dirname + '/public/index.html');
			});
			var num;
			function capture (req, res) {
				num = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
				var p = new captchapng(80,30, num);
				p.color(0, 0, 0, 0);
				p.color(80, 80, 80, 255);
 
				var img = p.getBase64();
				var imgbase64 = new Buffer(img,'base64');
				res.writeHead(200, {
					'Content-Type': 'image/png'
				});
				res.end(imgbase64);
			}
			app.get('/captchasrc', capture);
			
			app.post('/captcha', function(req, res){
				var lm = req.body.src;
				if(lm == num) {
					res.json({'answ' : 'Right!'});
				   }else{
					res.json({'answ' : 'Wrong!'});
				}
});
			server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Captcha server listening at", addr.address + ":" + addr.port);
});
		};
	}
	return new inner;
})();