export const formatDate = (date: string): string => {
  const d = new Date(date)
  return `${d.getFullYear()}-${padZero(d.getMonth())}-${padZero(d.getDate())}`
}

const padZero = (num: number): string => num.toString().padStart(2, '0')
