import { format } from 'date-fns-tz'

export const formatDate = (date: string): string => {
  return format(new Date(date), 'yyyy-MM-dd', { timeZone: 'Asia/Tokyo' })
}
