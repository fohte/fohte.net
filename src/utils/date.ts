import { formatInTimeZone } from 'date-fns-tz'

export const formatDate = (date: string): string => {
  return formatInTimeZone(date, 'Asia/Tokyo', 'yyyy-MM-dd')
}
