const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return rtf.format(-seconds, "second")
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return rtf.format(-minutes, "minute")
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return rtf.format(-hours, "hour")
  const days = Math.floor(hours / 24)
  if (days < 30) return rtf.format(-days, "day")
  const months = Math.floor(days / 30)
  if (months < 12) return rtf.format(-months, "month")
  return rtf.format(-Math.floor(months / 12), "year")
}
