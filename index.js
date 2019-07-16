const mqtt = require('mqtt')
const picoSpeaker = require('pico-speaker')
const _get = require('lodash.get')
const chalk = require('chalk')
const getUnits = require('./getUnits')
const getMeasurementDisplay = require('./getMeasurementDisplay')
const config = require('./config')
const HOST = config.host
const client  = mqtt.connect('mqtt://' + HOST, { port: 1883 })
const request = require('request-promise-native')
const appIp = config.appIp

// Initialize speach for TTS
picoSpeaker.init({
  AUDIO_DEVICE: null,
  LANGUAGE: 'en-US',
  NAME: null
})

// Say hello
picoSpeaker.speak('Welcome to Smart Terrarium!')

const getMeasurementByType = (message) => {
  let slot = _get(message, 'slots', [])[0]
  let measurementType = _get(slot, 'value.value')

  console.log(`Get measurement by type: ${chalk.blue(measurementType)}`)

  request(`http://${appIp}/measurement`, { json: true })
    .then(measurement => {
      let units = getUnits(measurementType)
      console.log(`The ${getMeasurementDisplay(measurementType)} is ${measurement[measurementType]} ${units}.`)
      picoSpeaker.speak(`The current ${measurementType} is ${measurement.measurementType}`)
    })
    .catch(error => console.log(error))
}

const toggleLights = () => {
  console.log("Toggle Lights")
  request(`http://${appIp}/toggleLights`, { method: 'POST'})
}

const toggleMister = () => {
  console.log("Toggle Mister")
  request(`http://${appIp}/toggleMister`, { method: 'POST'})
}

client.on('connect', function () {
    console.log("Connected to " + HOST)
    client.subscribe('hermes/#')
})

client.on('message', function (topic, message) {
    switch (topic) {
      case 'hermes/hotword/default/detected':
        console.log(chalk.green("Hotword detected!"))
        break
      case 'hermes/intent/ryanjgill:ToggleLights':
        toggleLights()
        break
      case 'hermes/intent/ryanjgill:ToggleMister':
        toggleMister()
        break
      case 'hermes/intent/ryanjgill:GetMeasurementByType':
        getMeasurementByType(JSON.parse(message))
        break
      case 'hermes/dialogueManager/sessionEnded':
        console.log(chalk.yellow('waiting for wake word ...'))
      default:
        break
    }  
})