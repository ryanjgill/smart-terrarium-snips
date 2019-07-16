const mqtt = require('mqtt')
const _get = require('lodash.get')
const chalk = require('chalk')
const getUnits = require('./getUnits')
const speak = require('./speak')
const endSession = require('./endSession')
const getMeasurementDisplay = require('./getMeasurementDisplay')
const config = require('./config')
const HOST = config.host
const client  = mqtt.connect('mqtt://' + HOST, { port: 1883 })
const request = require('request-promise-native')
const appIp = config.appIp

const getMeasurementByType = (client, message) => {
  let slot = _get(message, 'slots', [])[0]
  let measurementType = _get(slot, 'value.value')

  console.log(`Get measurement by type: ${chalk.blue(measurementType)}`)

  request(`http://${appIp}/measurement`, { json: true })
    .then(measurement => {
      let units = getUnits(measurementType)
      let text = `The ${getMeasurementDisplay(measurementType)} is ${measurement[measurementType]} ${units}.`;

      endSession(client, message.sessionId, text)
    })
    .catch(error => console.log(error))
}

const toggleLights = (client, message) => {
  console.log("Toggle Lights")
  endSession(client, message.sessionId, 'Toggling Lights')
  request(`http://${appIp}/toggleLights`, { method: 'POST'})
}

const toggleMister = (client, message) => {
  console.log("Toggle Mister")
  endSession(client, message.sessionId, 'Toggling Mister')
  request(`http://${appIp}/toggleMister`, { method: 'POST'})
}

client.on('connect', function () {
    console.log("Connected to " + HOST)

    // welcome message
    speak(client, "Welcome to Smart Terrarium!")

    client.subscribe('hermes/#')
})

client.on('message', function (topic, message) {
    switch (topic) {
      case 'hermes/hotword/default/detected':
        console.log(chalk.green("Hotword detected!"))
        break
      case 'hermes/intent/ryanjgill:ToggleLights':
        toggleLights(client, JSON.parse(message))
        break
      case 'hermes/intent/ryanjgill:ToggleMister':
        toggleMister(client, JSON.parse(message))
        break
      case 'hermes/intent/ryanjgill:GetMeasurementByType':
        getMeasurementByType(client, JSON.parse(message))
        break
      case 'hermes/dialogueManager/sessionEnded':
        console.log(chalk.yellow('waiting for wake word ...'))
      default:
        break
    }  
})