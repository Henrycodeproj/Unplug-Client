import PropTypes from 'prop-types'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import axios from 'axios'
import {useMemo, useState, useEffect, useContext} from 'react'
import { Navigate } from 'react-big-calendar'
import { accountContext } from '../../../Contexts/appContext'

export default function PersonalEvents({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => PersonalEvents.range(date, { localizer }),
    [date, localizer]
  )
  const { user } = useContext(accountContext)
  const [individualEvents, setIndividualEvents] = useState([])

  useEffect(() => {
    async function getIndividualEvents () {
      const url = 'https://unplug-server.herokuapp.com/posts/all/self/events'
      const data = { userID: user.id }
      const response = await axios.post(url, data, {
        headers: {
          authorization: localStorage.getItem("Token"),
        }
      })
      if (response){
      function eventDateFormat() {
        response.data.forEach((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
        });
      }
      eventDateFormat();
      setIndividualEvents(response.data)
      }
    }
    getIndividualEvents()
  },[])

  props.events = individualEvents 

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

PersonalEvents.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

PersonalEvents.range = (date, { localizer }) => {
  const start = date
  const end = localizer.add(start, 1, 'day')

  let current = start
  const range = []
  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}

PersonalEvents.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 1, 'day')

    default:
      return date
  }
}

PersonalEvents.title = (date, { localizer }) => {
  const [start, ...rest] = PersonalEvents.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}