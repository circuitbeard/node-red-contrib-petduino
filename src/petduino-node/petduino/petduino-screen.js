module.exports = function(RED) {

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
	
}