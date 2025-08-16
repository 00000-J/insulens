export function getTimeAgo(date: string): string {
  const now = new Date().getTime();
  const mealTime = new Date(date).getTime();
  const diff = Math.floor((now - mealTime) / 1000); // seconds

  if (diff < 3600) {
    // less than 1 hour
    const minutes = Math.floor(diff / 60);
    return `${minutes}m`;
  } else if (diff < 86400) {
    // less than 1 day
    const hours = Math.floor(diff / 3600);
    return `${hours}h`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days}d`;
  }
}
