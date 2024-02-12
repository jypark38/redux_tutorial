import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date, { locale: ko })
    timeAgo = `${timePeriod} 전`
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
