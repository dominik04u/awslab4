var AWS = require("aws-sdk");
var helpers = require("../helpers");
var simpleDb = require("./simpleDb");

AWS.config.loadFromPath('./config.json');

var task =  function(request, callback){
		
		var params ={
		Bucket: request.query.bucket,
		Key: request.query.key
		}
		var s3=new AWS.S3();


	//callback(null, "Dodano do bucket: " + bucket + " " + "za pomoca klucza: " + key);

	s3.getObject(params, function(err, data) {
		if(err) {callback(err); return;}
		var doc = data.Body;
		var algorithms=['md5','sha1','sha256','sha512'];
		var loopCount=1;

			helpers.calculateMultiDigest(doc, 
		algorithms, 
		function(err, digests) {
			callback(null, digests.join("<br>"));
 simpleDb.createDomain(function(){
			
		    var AttributesPut = [ 
				 {		
					 Name: 'MD5', /* required */
					 Value: 'TEST' /* required */
				 },
			 ];			
			 simpleDb.putAttributes('Plik1', AttributesPut, function(){
			   
			   	 
			    });
			 });		
			simpleDb.getFromDb('Plik1');			
		}, 
		loopCount);
			
	});

		
}
exports.action = task