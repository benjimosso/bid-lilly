import { formatDistance } from "date-fns";

export function formatDate(date: string) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  })
}