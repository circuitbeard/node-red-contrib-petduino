# node-red-contrib-petduino

A set of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for interacting with a <a href="http://circuitbeard.co.uk/petduino" target="_new">Petduino</a>.

## Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-petduino


## Usage

### pet-event

A node that listens to a serial connection for a specified Petduino event, parsing out any associated value.

### pet-action

A node to construct a Petduino serial command of the specified action type with the specified value payload.