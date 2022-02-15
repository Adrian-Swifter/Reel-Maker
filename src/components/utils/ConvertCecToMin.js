const ConvertCecToMin = (timestamp) => {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - hours * 60;
  const seconds = Math.round(timestamp % 60);
  const formatted = `${minutes}:${seconds}`;
  return formatted;
};

export default ConvertCecToMin;
