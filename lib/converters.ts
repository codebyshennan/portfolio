export const distanceConverter = (
  value: number,
  decimalPlace: number,
  kmString: boolean
) => {
  let distanceInKm = value / 1000;
  let distanceToDecimal = distanceInKm.toFixed(decimalPlace);
  if (!kmString) {
    return distanceToDecimal;
  } else {
    return distanceToDecimal + "km";
  }
};

export const distanceReducer = (array: number[]) => {
  if (!array) return 0;

  let distanceRawTotal = array.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
  }, 0);

  let distanceKm = distanceConverter(distanceRawTotal, 2, false);

  return Number(distanceKm);
};

export const elevationConverter = (value: number) => {
  let elevationInKm = value / 1000;
  let elevationToDecimal = elevationInKm.toFixed(2);
  return elevationToDecimal + "km";
};

export const speedConverter = (value: number) => {
  const speedKmph = value * 3.6;
  const speed = speedKmph.toFixed(1);

  return speed;
};

export const hoursMinsConverter = (value: number) => {
  let hours = Math.floor(value / 3600);
  let minutes = Math.floor((value - hours * 3600) / 60);

  if (hours < 10) {
    hours = 0 + hours;
  }
  if (minutes < 10) {
    minutes = 0 + minutes;
  }

  return `${hours}h ${minutes}m`;
};
