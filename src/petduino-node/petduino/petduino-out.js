module.exports = function(RED) {

	function PetduinoOut(n) {

        RED.nodes.createNode(this,n);
		
		var _self 	 = this;
		
		_self.action = parseInt(n.action);
		_self.value  = n.value;
		
		this.on("input", function(msg){

			var cmd   = _self.action;
			var value = _self.value;
			
			if(value.length == 0){
				value = msg.payload;
			}

			if(typeof(value) === "boolean"){
				value = value ? 1 : 0;
			}
			
			switch(_self.action){

				// Integer
				case 0: // Set State
				case 2: // Set LED
					var intValue = parseInt(value);
					if(!isNaN(intValue)){
						cmd += "," + intValue;
					}
					break;

				// Raw
				case 7: // Set Data
					cmd += "," + value;
					break;

				// Empty
				case 1: // Get State
				case 3: // Toggle LED
				case 4: // Get LED
				case 5: // Get Temperature
				case 6: // Get Light Level
				default: 
					break;
			}

			msg.payload = cmd + ";";

			_self.send(msg);
		});
    }
	
	RED.nodes.registerType("petduino-out", PetduinoOut);
	
}