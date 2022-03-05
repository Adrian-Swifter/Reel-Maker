

export default function filterDatesByOffset(timestamps, offsetInMs) {

  const entries = timestamps
    .map((timestamp) => ({ timestamp: timestamp.time, time: new Date(timestamp.time).getTime() }))
    .sort((a, b) => a.time - b.time);
  const result = [entries[0].timestamp];
  let previous = entries[0].time;
  let index = 1;
  while (index < entries.length) {
    if (entries[index].time - previous > offsetInMs) {
      previous = entries[index].time;
      result.push(entries[index].timestamp);
    }
    index++;
  }
  return result.length;
}
