module.exports = (measurementType) => {
  switch (measurementType) {
    case 'temperature':
      return 'degress celcius'
    case 'humidity':
    case 'soilMoisture':
    case 'drainWaterLevel':
    case 'misterWaterLevel':
        return 'percent'
    case 'uvIndex':
      return '' 
    default:
      return ''
  }
}