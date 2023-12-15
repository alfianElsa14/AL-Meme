export function calculateTimeDifference(createdAt) {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);
  const timeDifference = Math.abs(currentTime - createdTime);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return { value: days, unit: 'days' };
  } else if (hours > 0) {
    return { value: hours, unit: 'hours' };
  } else if (minutes > 0) {
    return { value: minutes, unit: 'minutes' };
  } else {
    return { value: seconds, unit: 'seconds' };
  }
}