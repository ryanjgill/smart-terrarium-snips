module.exports = (measurementType) => {
  switch (measurementType) {
    case 'temperature':
      return 'temperature'
    case 'humidity':
      return 'humidity'
    case 'soilMoisture':
      return 'soild moisture'
    case 'drainWaterLevel':
      return 'drain water level'
    case 'misterWaterLevel':
      return 'mister water level'
    case 'uvIndex':
      return 'u v index' 
    default:
      return ''
  }
}