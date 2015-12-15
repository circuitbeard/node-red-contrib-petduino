module.exports = function(RED) {

    var path = require('path');

	function PetduinoScreen(n) {

        RED.nodes.createNode(this,n);
		
		var _self 	 = this;
		
		_self.value  = n.value;
		
		this.on("input", function(msg){

			msg.payload = _self.value;

			_self.send(msg);

		});
    }
	
	RED.nodes.registerType("petduino-screen", PetduinoScreen);

	RED.httpAdmin.get('/petduino/static/*', function(req, res){
        var filename = path.join(__dirname , 'static', req.params[0]);
        res.sendfile(filename);
    });
	
}