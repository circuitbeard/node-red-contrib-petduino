# node-red-contrib-petduino

A set of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for interacting with a <a href="http://circuitbeard.co.uk/petduino" target="_new">Petduino</a>.

## Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-petduino


## Usage

### pet-event

A node to process incoming events from a Petduino and their associated values.

Input can be either a serial or JSON formatted payload *(serial if the Petduino is directly connected to Node-RED server, or JSON if connected to an online API)*, **msg.payload** containse the event payload (if any).

Node will only trigger if the incoming event matches the selected event in config.

### pet-action

A node to construct a Petduino action payload.

Output can be either a serial or JSON formatted payload *(serial if the Petduino is directly connected to Node-RED server, or JSON if connected to an online API)*.

On trigger the node will generate an action payload object for the selected action in config, with the configured value, or the **msg.payload** value if no config value is defined.

### screen

A node to design screen layouts to display on the Petduino screen.

Click the screen LEDs on or off to define your screen layout, **msg.payload** will contain the hex encoded value.