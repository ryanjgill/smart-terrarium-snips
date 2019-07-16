module.exports = (measurementType) => {
  switch (measurementType) {
    case 'temperature':
      return 'degres celsius'
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