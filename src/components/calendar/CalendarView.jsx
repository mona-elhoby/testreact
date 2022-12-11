
import React, { useEffect, useState, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { eventsArray } from "./events";

import { EventDialog } from "./EventDialog";
//https://codesandbox.io/s/react-fullcalendar-zu2ss?file=/src/App.js:26-93
// @mui/material components
import { makeStyles } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import {
  CFormInput
} from "@coreui/react";

import { useStyles } from "./Style";
import {getData} from "../../config"

export const CalendarView = () => {
  const classes = useStyles();

  const calanderRef = useRef();

  const [events, setEvents] = useState([]);
  const [event, setEvent] = React.useState({});
  const [isEditModal, setIsEditModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [allDay, setAllDay] = React.useState(false);
  const [eventModal, setEventModal] = React.useState(false);
  const [eventTitle, setEventTitle] = React.useState("");
  const [radios, setRadios] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState(null);
  const [spicifiedDate, setSpicifiedDate] = React.useState(null);

  useEffect(() => {
    // Use Effect On first Render
    // refill Events with dump Data or Api Call
    setEvents(eventsArray);
    let calendar = calanderRef.current.getApi();
    setCurrentDate(calendar.view.title);
    const theDate = `${new Date(calendar.view.title).toLocaleDateString().slice(6,10)}-${new Date(calendar.view.title).toLocaleDateString().slice(3,5)}-${new Date(calendar.view.title).toLocaleDateString().slice(0,2)}`
    // console.log(theDate)
    setSpicifiedDate(theDate);
  }, []);

  const addNewEvent = () => {
    let newEvents = {
      id: events.length + 1,
      title: eventTitle,
      start: startDate,
      end: endDate,
      allDay: allDay,
      className: radios,
      description: eventDescription
    };
    setEvents([...events, newEvents]);
    setEventModal(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setRadios("bg-info");
    setEventTitle("");
    setEventDescription("");
  };

  const editEvent = (event) => {
    let newEvents = events.map((ev) => {
      if (ev.id.toString() === event.id) {
        console.log("Matche found on ID: ", ev.id);
        event.remove();
        let saveNewEvent = {
          ...ev,
          title: eventTitle,
          className: radios,
          description: eventDescription
        };
        return saveNewEvent;
      } else {
        return ev;
      }
    });
    console.log(newEvents);
    setEvents(newEvents);
    setStartDate(undefined);
    setEndDate(undefined);
    setIsEditModal(false);
    setRadios("bg-info");
    setEventTitle("");
    setEventDescription("");
    setEventModal(false);
  };

  const handleEventClick = (info) => {
    // bind with an arrow function
    console.log(`Event ID: ${info.event.id} Selected!`);
    setEvent(info.event);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventTitle(info.event.title);
    setIsEditModal(true);
    setEventDescription(info.event.extendedProps.description);
    setRadios(info.event.className);
    setEventModal(true);
    let calendar = calanderRef.current.getApi();
    setCurrentDate(calendar.view.title);
    calendar.select({start: new Date(calendar.view.title).toUTCString, allDay: false})
    changeView("timeGridDay")
  };

  const handleDateSelect = (info) => {
    console.log("handleDateSelect");
    setStartDate(info.start);
    setEndDate(info.end);
    setRadios("bg-info");
    setIsEditModal(false);
    setEventModal(true);
  };

  const renderEventContent = () => {
    console.log("renderEventContent");
  };

  const changeView = (newView) => {
    let calendar = calanderRef.current.getApi();
    calendar.changeView(newView);
    setCurrentDate(calendar.view.title);
  };

  const handleDateClick = () => {
    console.log("handleDateClick");
  };

  const handleEvents = () => {
    console.log("handleEvents");
  };

  const getScheduleData = e => {
    console.log(e)
   setSpicifiedDate(e);
    // console.log(theDate)
    setCurrentDate(e);
    changeView("timeGridDay")
    // getData(`schedule?month=${e.slice(5,7)}&year=${e.slice(0,4)}&lang=0&emp=1`,setSchedule)
    // let calendar = calanderRef.current.getApi();
    // calendar.select({start: new Date(e).toUTCString, allDay: false})
 }
  return (
    <div className={classes.root}>
      <div className={classes.calendarCtr}>
        <Container maxWidth={false} component={Box}>
          <Grid
            container
            component={Box}
            alignItems="center"
            paddingTop=".5rem"
            paddingBottom=".5rem"
            back
          >
            <Grid item xss={12} lg={6}>
              <Typography variant="h4" className={classes.currentDate}>
                {currentDate}
              </Typography>
              <Breadcrumbs separator="-" aria-label="breadcrumb">
                {/* <Link
                  color="inherit"
                  href="/getting-started/installation/"
                  onClick={(e) => e.preventDefault()}
                >
                  Calendar
                </Link> */}
                <Typography component="span" className={classes.currentDate}>
                  {/* {currentDate} */}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xss={12} lg={6} className={classes.rowFlex}>{console.log("currentDate", currentDate)}
            <CFormInput type="date" id="inputEmail4" value={spicifiedDate} onChange={e => getScheduleData(e.target.value)}/>
          {/* new Date("July 11, 2022").toLocaleDateString().toString().replaceAll("/" , "-").split("").reverse().join("") */}
              <Button
                variant="contained"
                size="small"
                className={classes.ctrButton1}
                onClick={() => {
                  let calendar = calanderRef.current.getApi();
                  calendar.next();
                  setCurrentDate(calendar.view.title)
                }}
              >
                <NavigateNext className={classes.arrow}/>
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.ctrButton}
                onClick={() => {
                  let calendar = calanderRef.current.getApi();
                  calendar.prev();
                  setCurrentDate(calendar.view.title)
                }}
              >
                <NavigateBefore  className={classes.arrow}/>
              </Button>
              <div style={{display: "inline-block"}}> 
        <select className={`browser-default custom-select ${classes.selectBox}`} onClick={e => changeView(e.target.value)}>
          <option>شهر</option>
          <option value="dayGridMonth"><Button
                variant="contained"
                size="small"
                className={classes.ctrButton}
                onClick={() => changeView("dayGridMonth")}
              >
                شهر
              </Button></option>
          <option value="dayGridWeek"> <Button
                variant="contained"
                size="small"
                className={classes.ctrButton}
                onClick={() => changeView("dayGridWeek")}
              >
                اسبوع
              </Button></option>
          <option value="timeGridDay"> <Button
                variant="contained"
                size="small"
                className={classes.ctrButton}
                onClick={() => {
                  let calendar = calanderRef.current.getApi();
                  calendar.today();
                }}
              >
                يوم
              </Button></option>
        </select>
      </div>
              
             
              {/* <Button
                variant="contained"
                size="small"
                className={classes.ctrButton}
                onClick={() => changeView("timeGridDay")}
              >
                يوم
              </Button> */}
             
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className={classes.calendar}>
        <FullCalendar
          ref={calanderRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={5}
          weekends={true}
          // selectable= {true}
          //themeSystem= "bootstrap"
          initialView="dayGridMonth"
          //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed

          events={events}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          select={handleDateSelect}
          eventsSet={handleEvents}
          // called after events are initialized/added/changed/removed
          // you can update a remote database when these fire:
          eventAdd={function () {
            console.log("Event Added");
          }}
          eventChange={function () {
            console.log("Event Changed");
          }}
          eventRemove={function () {
            console.log("Event Removed");
          }}
          headerToolbar={
            false /*{
          left: "title",
          center: "",
          right: "prev,next today dayGridMonth,timeGridWeek,timeGridDay"
        }*/
          }
        />
      </div>

      <EventDialog
        eventModal={eventModal}
        setEventModal={setEventModal}
        event={event}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        radios={radios}
        setRadios={setRadios}
        eventDescription={radios}
        setEventDescription={setEventDescription}
        addNewEvent={addNewEvent}
        editEvent={editEvent}
        isEditModal={isEditModal}
      />
    </div>
  );
};
