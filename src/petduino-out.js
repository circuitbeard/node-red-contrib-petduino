module.exports = function(RED) {

	var petduino_action_names = [
		"setState",
		"getState",
		"setLed",
		"toggleLed",
		"getLed",
		"getTemperature",
		"getLightLevel",
		"setData"
	];

	function PetduinoOut(n) {

        RED.nodes.createNode(this,n);
		
		var _self 	 = this;
		
		_self.format = n.format;
		_self.action = parseInt(n.action);
		_self.value  = n.value;

		_self.sendSerialAction = function(msg, value){

			var cmd   = _self.action;
			
			if(value){
				cmd += "," + value;
			}

			msg.payload = cmd + ";";

			_self.send(msg);

		}
		
		_self.sendJsonAction = function(msg, value){

			var json = { 
				type : "action", 
				name: petduino_action_names[_self.action] 
			};
			
			if(value){
				json.value = value;
			}
			
			msg.payload = json;

			_self.send(msg);
		}

		this.on("input", function(msg){

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
						value = intValue;
					}
					break;

				// Raw
				case 7: // Set Data
					value = value;
					break;

				// Empty
				case 1: // Get State
				case 3: // Toggle LED
				case 4: // Get LED
				case 5: // Get Temperature
				case 6: // Get Light Level
				default: 
					value = undefined;
					break;
			}

			switch(_self.format){
				case "serial":
					_self.sendSerialAction(msg, value);
					break;
				case "json":
					_self.sendJsonAction(msg, value);
					break;
			}

		});
    }
	
	RED.nodes.registerType("petduino-out", PetduinoOut);
	
}