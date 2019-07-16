/**
 * Example Topics
 */

// hermes/hotword/default/detected
// Hotword detected!
// hermes/asr/stopListening
// hermes/hotword/toggleOff
// asr TOGGLE ON
// hermes/dialogueManager/sessionStarted
// dialog session started
// hermes/audioServer/default/playBytes/9110433c-0607-4971-821b-51906360a78c
// hermes/audioServer/default/playFinished
// hermes/asr/startListening
// hermes/asr/textCaptured
// hermes/asr/stopListening
// hermes/audioServer/default/playBytes/e50af2e8-05d6-400f-a99c-9b5f80c6abac
// hermes/audioServer/default/playFinished
// hermes/nlu/query
// hermes/nlu/intentParsed
// hermes/intent/ryanjgill:ToggleMister
// hermes/dialogueManager/sessionEnded

/**
 * Example Message
 */

const exampleMessage = {
  "sessionId": "f6889cdd-b51f-497d-9858-3da68c765954",
  "customData": null,
  "siteId": "default",
  "input": "whats the humidity",
  "asrTokens": [
    [
      {
        "value": "whats",
        "confidence": 1,
        "rangeStart": 0,
        "rangeEnd": 5,
        "time": {
          "start": 0,
          "end": 1.5899999
        }
      },
      {
        "value": "the",
        "confidence": 1,
        "rangeStart": 6,
        "rangeEnd": 9,
        "time": {
          "start": 1.5899999,
          "end": 1.74
        }
      },
      {
        "value": "humidity",
        "confidence": 1,
        "rangeStart": 10,
        "rangeEnd": 18,
        "time": {
          "start": 1.74,
          "end": 3.1499999
        }
      }
    ]
  ],
  "asrConfidence": 1,
  "intent": {
    "intentName": "ryanjgill:GetMeasurementByType",
    "confidenceScore": 1
  },
  "slots": [
    {
      "rawValue": "humidity",
      "value": {
        "kind": "Custom",
        "value": "humidity"
      },
      "range": {
        "start": 10,
        "end": 18
      },
      "entity": "SensorsForSmartTerrarium",
      "slotName": "sensorType",
      "confidenceScore": 1
    }
  ]
}