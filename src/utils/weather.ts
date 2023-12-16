export function convertUnixToDate(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000);
}

export function kelvinToFahrenheit(kelvin: number): number {
  return ((kelvin - 273.15) * 9/5 + 32);
}

export function kelvinToCelsius(kelvin: number): number {
  return (kelvin - 273.15);
}