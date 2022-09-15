// 1100 -> 18:20

export function convertMinuteStringToHours(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}