/**
 * Uses MQTT to ask TTS to say the text
 */
module.exports = (client, text) => {
  let message = JSON.stringify({
    init: {
      type: "notification",
      text
    }
  })
  
  client.publish(`hermes/dialogueManager/startSession`, message)
}