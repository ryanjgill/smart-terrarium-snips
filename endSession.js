/**
 * Uses MQTT to ask TTS to say the text and end session
 */
module.exports = (client, sessionId, text) => {
  let message = JSON.stringify({
    sessionId: sessionId,
    text
  })
  
  client.publish(`hermes/dialogueManager/endSession`, message)
}