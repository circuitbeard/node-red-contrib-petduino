module.exports = function(RED) {

    function PetduinoIn(n) {

        RED.nodes.createNode(this,n);
		
		var _self	= this;
		
		_self.event  = parseInt(n.event);
		
		_self.on('input', function(msg) {

			msg.raw = msg.payload;

			var payload = msg.payload.toString();
			var evts = msg.payload.split(';');

			for(var e = 0; e < evts.length; e++){

				var evt = evts[e];
				var evtParts = evt.split(',');

				if(evtParts.length > 0){
					var evtId = parseInt(evtParts[0]);
					if(!isNaN(evtId) && evtId === _self.event){
						switch(evtId){

							// Integers
							case 0: // State
							case 3: // Light Level
								if(evtParts.length >= 2){
									msg.payload = parseInt(evtParts[1]);
								}
								break;

							// Decimals
							case 2: // Temperature
								if(evtParts.length >= 2){
									msg.payload = parseFloat(evtParts[1]);
								}
								break;

							// Booleans
							case 1: // LED
							case 4: // Btn 1
							case 5: // Btn 2
								if(evtParts.length >= 2){
									msg.payload = parseInt(evtParts[1]) === 1;
								}
								break;

							// Empty
							default:
								msg.payload = undefined;
								break;
						}

						_self.send(msg);
					}
				}
			}

		});

    }
	
    RED.nodes.registerType("petduino-in", PetduinoIn);
	
}