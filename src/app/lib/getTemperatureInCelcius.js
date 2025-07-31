export function getTemperatureInCelcius(tempInKelvin) {
  return Math.round(tempInKelvin - 273.15);
}