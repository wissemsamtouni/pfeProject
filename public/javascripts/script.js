  // // import the Azure IoT Hub SDK
  // const Client  = require('azure-iot-device').Client;

  // // replace this with your IoT hub connection string
  // const connectionString = 'HostName=wsiothub.azure-devices.net;DeviceId=MyPi;SharedAccessKeyName=iothubowner;SharedAccessKey=4FnQwgJyZp7fnUAvMqLrPE894qfNKMC5ObhMTo8M8II=';
  
  // // create a client
  // const client = Client.fromConnectionString(connectionString);
  
  
  // // connect to the IoT hub
  // client.open((err) => {
  //   if (err) {
  //     console.error('Could not connect: ' + err.message);
  //   } else {
  //     console.log('Client connected');
      
  //     // create a function to handle incoming messages
  //     const onMessage = (message) => {
  //       // parse the message payload to get the temperature value
  //       const temperature = JSON.parse(message.getData()).temperature;
  //       // update the temperature display element with the new value
  //       document.getElementById('temperature-display').innerHTML = temperature + '°F';
  //     }
      
  //     // register the message callback
  //     client.on('message', onMessage);
      
  //     // subscribe to the temperature telemetry topic
  //     client.subscribe('temperature');
      
  //     // create a function to handle the water pump status
  //     const updateWaterPumpStatus = (status) => {
  //       document.getElementById('water-pump-status').innerHTML = status;
  //     };
      
  //     // send a command to the device to get the initial water pump status
  //     client.sendEvent({ command: 'getStatus' }, (err) => {
  //       if (err) {
  //         console.error('Error sending command: ' + err.message);
  //       } else {
  //         console.log('Command sent: getStatus');
  //       }
  //     });
  //   }
  // });
  
  // // add event listeners for the water pump buttons
  // document.getElementById('water-pump-on').addEventListener('click', () => {
  //   client.sendEvent({ command: 'on' }, (err) => {
  //     if (err) {
  //       console.error('Error sending command: ' + err.message);
  //     } else {
  //       console.log('Command sent: on');
  //       updateWaterPumpStatus('on');
  //     }
  //   });
  // });
  // document.getElementById('water-pump-off').addEventListener
  

  // import the Azure IoT Hub SDK
  
  // const util = require('util');

  // const Client = require('azure-iot-device-mqtt').Client;
  // const Message = require('azure-iot-device').Message;


  const util = require('util');
const Mqtt = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;

  // replace this with your IoT hub connection string
// const connectionString = 'HostName=wsiothub.azure-devices.net;DeviceId=MyPi;SharedAccessKeyName=iothubowner;SharedAccessKey=4FnQwgJyZp7fnUAvMqLrPE894qfNKMC5ObhMTo8M8II=';
const connectionString ='HostName=wsiothub.azure-devices.net;DeviceId=MyPi;SharedAccessKey=V91BWiTxsaAsxItFxK3ge5ITcI+OFBwyIv81HdW9YVo='
console.log('Client connecting to IoT Hub');
  // create a client
const client = Client.fromConnectionString(connectionString,Mqtt);
console.log('Client connected to IoT Hub 22');
 // connect to the IoT hub
client.open((err) => {
  if (err) {
    console.error(`Could not connect: ${err.message}`);
  } else {
    console.log('Client connected');
// create a function to handle incoming messages
    const onMessage = (message) => {
       // parse the message payload to get the temperature value
      const temperature = JSON.parse(message.getData()).temperature;
      // update the temperature display element with the new value
      document.getElementById('temperature-display').innerHTML = `${temperature}°F`;
    };


 // register the message callback
    client.on('message', onMessage);
     // subscribe to the temperature telemetry topic
    client.subscribe('temperature');
 // create a function to handle the water pump status
    const updateWaterPumpStatus = (status) => {
      document.getElementById('water-pump-status').innerHTML = status;
    };
// send a command to the device to get the initial water pump status
    client.sendEvent({ command: 'getStatus' }, (err) => {
      if (err) {
        console.error(`Error sending command: ${err.message}`);
      } else {
        console.log('Command sent: getStatus');
      }
    });
  }
});
// add event listeners for the water pump buttons
document.getElementById('water-pump-on').addEventListener('click', () => {
  client.sendEvent({ command: 'on' }, (err) => {
    if (err) {
      console.error(`Error sending command: ${err.message}`);
    } else {
      console.log('Command sent: on');
      updateWaterPumpStatus('on');
    }
  });
});

document.getElementById('water-pump-off').addEventListener('click', () => {
  client.sendEvent({ command: 'off' }, (err) => {
    if (err) {
      console.error(`Error sending command: ${err.message}`);
    } else {
      console.log('Command sent: off');
      updateWaterPumpStatus('off');
    }
  });
});
