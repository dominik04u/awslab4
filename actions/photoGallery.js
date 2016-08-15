var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');

var simpleDB = require("./simpleDB");
var INDEX_TEMPLATE = "photoGallery.ejs";
var s3 = new AWS.S3();
var bucketName = "adamski-lab4";

var task = function (request, callback) {
	var params = {
		Bucket : bucketName
	};

	s3.listObjects(params, function (err, data) {
		if (err) {
			console.log(err, err.stact);
		} else {
			callback(null, {
				template : TEMPLATE_NAME,
				params : {
					bucket : bucketName,
					files : data.Contents
				}
			});
		}
	});

};