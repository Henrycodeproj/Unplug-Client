import { format } from "date-fns"

export function handleEventTimeandDate (timeAndDate) {
    if (!timeAndDate) return null

    const timeDate = new Date(timeAndDate)
    const changedDate = format(timeDate, "E, LLL d, y, h:mm a")

    return `${changedDate}`
  }