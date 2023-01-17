import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./EventCalendar.css";
import axios from "axios";
import { Truncating } from "../../ReusablesComponents/Truncating";
import { useEffect, useState, useContext } from "react";
import { accountContext } from "../../Contexts/appContext";

export const EventCalendar = () => {
  const { user, lastPostIndex, setPosts, posts } = useContext(accountContext);

  const [event, setEvent] = useState();
  //format is {title:, start:}
  useEffect(() => {
    async function getData() {
      const url = "https://unplug-server.herokuapp.com/posts/all/posts";
      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      });
      setEvent({ events: response.data });
    }
    getData();
  }, []);

  function changeDefaultName(event) {
    return (event.text = event.shortText);
  }
  const header = {
    end: "prev,next",
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <div style={{ padding: "5px", width: "100%" }}>
          <div className="see">
            <h3
              style={{
                marginRight: "5px",
                width: "100%",
                display: "inline",
                color: "black",
              }}
            >
              {(eventInfo.timeText = eventInfo.timeText + "m")}
            </h3>
          </div>
          <div style={{ textTransform: "capitalize", width: "100%", fontSize:"1rem" }}>
            <Truncating
              postDescription={eventInfo.event.title}
              truncateNumber={25}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {event && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          initialEvents={event}
          eventContent={renderEventContent}
          editable={false}
          headerToolbar={header}
          height="400px"
          dayMaxEvents={0}
          moreLinkClassNames={changeDefaultName}
          eventMaxStack={-1}
        />
      )}
    </div>
  );
};
