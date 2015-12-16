module.exports = function(RED) {

	var path = require('path');

	var petduino_action_names = [
		"setState",
		"getState",
		"setLed",
		"toggleLed",
		"getLed",
		"getTemperature",
		"getLightLevel",
		"setData",
		"setScreen"
	];

	function PetduinoOut(n) {

        RED.nodes.createNode(this,n);
		
		var _self 	 	= this;
		
		_self.action 	= parseInt(n.action);
		_self.str  		= n.str;
		_self.mtrx 		= n.mtrx;

		this.on("input", function(msg){

			var cmd   = _self.action;
			var value = _self.str;
			
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

				case 8: // Set Screen
					cmd = "7," + _self.mtrx;
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
			
			// Append the terminator char
			msg.payload = cmd + ";";

			// Send the message
			_self.send(msg);

		});
    }
	
	RED.nodes.registerType("petduino-out", PetduinoOut);

	RED.httpAdmin.get('/petduino/static/*', function(req, res){
        var filename = path.join(__dirname , 'static', req.params[0]);
        res.sendFile(filename);
    });
}