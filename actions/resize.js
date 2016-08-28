var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var INDEX_TEMPLATE = "sentPhoto.ejs";

var sqs = new AWS.SQS();

var task = function (request, callback) {
	var resizeValue = parseInt(request.body.resizeValue);
	var fileList = JSON.parse(request.body.files);

	for (var i = 0; i < fileList.length; i++) {
		var params = {
			MessageBody : JSON.stringify({
				file : fileList[i],
				scaleValue : resizeValue
			}),
			QueueURL : 'https://sqs.us-west-2.amazonaws.com/983680736795/AdamskiSQS'
		};
		sqs.sendMessage(params, function (err, data) {
			if (err) {
				console.log(err, err.stact);
			} else {
				callback(null, {
					template : INDEX_TEMPLATE,
					params : {
						fields : null,
						bucket : null
					}
				} );
			}
		});
	}
}

exports.action = task;
