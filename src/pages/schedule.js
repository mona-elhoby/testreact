import React, { useState, useEffect, useRef } from "react";
import {
  CRow,
  CFormInput,
  CCol,
  CCard,
  CCardBody,
  CWidgetStatsA,
} from "@coreui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Tooltip } from "bootstrap";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	// Tooltip,
	Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

import { EventDialog } from "../components/calendar/EventDialog";
//https://codesandbox.io/s/react-fullcalendar-zu2ss?file=/src/App.js:26-93
// @mui/material components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";

import "../components/calendar/Style.css";
import { getSchedule, getLatestSchedule } from "../store/reducers/schedule";
import translation from "../i18n/translate";
import "../assets/style/schedule.css";
import { useIntl } from "react-intl";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	// Tooltip,
	Legend
  );
const Schedule = () => {
  const [date, setDate] = useState("2022-05-13");
  const [schdule, setSchedule] = useState([]);
  const navigate = useNavigate();
  const calanderRef = useRef();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [events, setEvents] = useState([]);
  const [event, setEvent] = React.useState({});
  const [isEditModal, setIsEditModal] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [allDay, setAllDay] = React.useState(false);
  const [eventModal, setEventModal] = React.useState(false);
  const [hoverModal, setHoverModal] = React.useState(false);
  const [eventTitle, setEventTitle] = React.useState("");
  const [radios, setRadios] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState("");
  const [spicifiedDate, setSpicifiedDate] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventTime, setEventTime] = React.useState("");
  const [currentView, setCurrentView] = React.useState("dayGridMonth");
  const { schedules, Latestchedules } = useSelector((state) => state.schedule);

  const theEventArray = (data) =>
    data?.map((ele, i) => {
      return {
        id: ele.UniqueID,
        title: ele.Subject,
        start: ele.StartDate,
        end: ele.EndDate,
        allDay: true,
        className: "bg-bink",
        // className: "bg-primary",
        time: new Date(ele.StartDate).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        location: ele.Location,
        description: ele.Description,
        caseId: ele.CAS_ID_PK,
      };
    });

  useEffect(() => {
    dispatch(
      getSchedule({
        month: date.slice(5, 7),
        year: date.slice(0, 4),
        lang: 0,
        emp: 1,
      })
    ).then((res) => {
      setSchedule(res.payload.data);
      setEvents(theEventArray(res.payload.data));
    });
    let calendar = calanderRef.current.getApi();
    setCurrentDate(calendar.view.title);
    const theDate = `${new Date(calendar.view.title)
      .toLocaleDateString()
      .slice(6, 10)}-${new Date(calendar.view.title)
      .toLocaleDateString()
      .slice(3, 5)}-${new Date(calendar.view.title)
      .toLocaleDateString()
      .slice(0, 2)}`;
    // console.log(theDate)
    setSpicifiedDate(new Date().toISOString().split("T")[0]);
    // dispatch(getLatestSchedule())
  }, []);
  const schduleByDate = schdule?.reduce(
    (acc, curr) =>
      (acc[curr.StartDate] = acc[curr.StartDate] || []).push(curr) && acc,
    {}
  );
  // console.log(schduleByDate)
  const sortedSchduleByDate = Object.entries(schduleByDate).sort((a, b) =>
    a[0] > b[0] ? 1 : -1
  );
  // console.log(sortedSchduleByDate);

  const addNewEvent = () => {
    let newEvents = {
      id: events.length + 1,
      title: eventTitle,
      start: startDate,
      end: endDate,
      allDay: allDay,
      className: radios,
      description: eventDescription,
    };
    setEvents([...events, newEvents]);
    setEventModal(false);
    setStartDate(undefined);
    setEndDate(undefined);
    setRadios("bg-info");
    setEventTitle("");
    setEventTime("");
    setEventLocation("");
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
          description: eventDescription,
          location: eventLocation,
          time: eventLocation,
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
    console.log(`Event ID: ${info.event.extendedProps.caseId} Selected!`);
    navigate(`/file-management/${info.event.extendedProps.caseId}`, {
      replace: true,
    });
    setEvent(info.event);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventTitle(info.event.title);
    setEventTime(info.event.extendedProps.time);
    setEventLocation(info.event.extendedProps.location);
    setIsEditModal(true);
    setEventDescription(info.event.extendedProps.description);
    setRadios(info.event.className);
    // setEventModal(true);
  };

  const handleAddEvent = (info) => {
    // console.log(`Event ID: ${info.event.extendedProps.time} Selected!`);
    setEvent(info.event);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventTitle(info.event.title);
    setEventTime(info.event.extendedProps.time);
    setEventLocation(info.event.extendedProps.location);
    setIsEditModal(false);
    setEventDescription(info.event.extendedProps.description);
    setRadios(info.event.className);
    setEventModal(true);
  };

  const handleDateSelect = (info) => {
    // console.log('handleDateSelect');
    setStartDate(info.start);
    setEndDate(info.end);
    setRadios("bg-info");
    setIsEditModal(false);
    setEventModal(true);
  };

  const renderEventContent = () => {
    // console.log('renderEventContent');
  };

  const changeView = (newView) => {
    let calendar = calanderRef.current.getApi();
    calendar.changeView(newView);
    setCurrentDate(calendar.view.title);
  };

  const handleDateClick = () => {
    // console.log('handleDateClick');
  };

  const handleEvents = () => {
    // console.log('handleEvents');
  };

  const getScheduleData = (e) => {
    setDate(e);
    setSpicifiedDate(e);
    // console.log(theDate)
    setCurrentDate(e);
    changeView("dayGridMonth");
    setCurrentView("dayGridMonth");
    dispatch(
      getSchedule({
        month: e.slice(5, 7),
        year: e.slice(0, 4),
        lang: 0,
        emp: 1,
      })
    ).then((res) => {
      setSchedule(res.payload.data);
      setEvents(theEventArray(res.payload.data));
    });
  };

  return (
    <div className="schedule">
      <CRow>
        <CCol lg={"9"}>
          <div className="main-wrapper">
            <div className="calendarctr">
              <Container maxWidth={false} component={Box}>
                <Grid
                  container
                  component={Box}
                  alignItems="center"
                  paddingTop=".5rem"
                  paddingBottom=".5rem"
				  justifyContent="space-between"
                  // back
                >
                  <Grid item xss={12} lg={5}>
                    <Typography variant="h6" sx={{ color: "#FFF !important" }}>
                      {currentDate}
                    </Typography>
                    <Breadcrumbs separator="-" aria-label="breadcrumb">
                      <Typography
                        component="span"
                        sx={{ color: "#FFF !important" }}
                      ></Typography>
                    </Breadcrumbs>
                  </Grid>
                  <Grid item xss={12} lg={7} sx={{ textAlign: "left" }}>
                    <CFormInput
                      type="date"
                      id="inputEmail4"
                      value={spicifiedDate}
                      onChange={(e) => getScheduleData(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      className="CtrButton1"
                      onClick={() => {
                        let calendar = calanderRef.current.getApi();
                        calendar.next();
                        setCurrentDate(calendar.view.title);
                        currentView == "dayGridMonth" &&
                          dispatch(
                            getSchedule({
                              month: new Date(calendar.view.title)
                                .toLocaleDateString()
                                .slice(0, 2)
                                .replace("/", ""),
                              year: new Date(calendar.view.title)
                                .toLocaleDateString()
                                .slice(-4)
                                .replace("/", ""),
                              lang: 0,
                              emp: 1,
                            })
                          ).then((res) => {
                            setSchedule(res.payload.data);
                            setEvents(theEventArray(res.payload.data));
                          });
                      }}
                    >
                      <NavigateNext
                        sx={{
                          height: "1.5em !important",
                          width: "1.5em !important",
                        }}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      className="ctrButton"
					  sx={{
						margin: 0,
						color: '#F0F0F0',
						backgroundColor: '#163075',
						padding: 0,
						borderRadius: '.3rem',
						border: 'none !important',
						boxShadow: 'none !important',
					  }}
                      onClick={() => {
                        let calendar = calanderRef.current.getApi();
                        calendar.prev();
                        setCurrentDate(calendar.view.title);
                        currentView == "dayGridMonth" &&
                          dispatch(
                            getSchedule({
                              month: new Date(calendar.view.title)
                                .toLocaleDateString()
                                .slice(0, 2)
                                .replace("/", ""),
                              year: new Date(calendar.view.title)
                                .toLocaleDateString()
                                .slice(-4)
                                .replace("/", ""),
                              lang: 0,
                              emp: 1,
                            })
                          ).then((res) => {
                            setSchedule(res.payload.data);
                            setEvents(theEventArray(res.payload.data));
                          });
                      }}
                    >
                      <NavigateBefore
                        sx={{
                          height: "1.5em !important",
                          width: "1.5em !important",
                        }}
                      />
                    </Button>
                    <div style={{ display: "inline-block" }}>
                      <select
                        className={`browser-default custom-select SelectBox`}
                        onClick={(e) => {
                          changeView(e.target.value);
                          setCurrentView(e.target.value);
                        }}
                      >
                        <option
                          value="dayGridMonth"
                          variant="contained"
                          size="small"
                          className="ctrButton"
                          onClick={() => changeView("dayGridMonth")}
                        >
                          {translation("month")}
                        </option>
                        <option
                          value="dayGridWeek"
                          variant="contained"
                          size="small"
                          className="ctrButton"
                          onClick={() => changeView("dayGridWeek")}
                        >
                          {translation("week")}
                        </option>
                        <option
                          value="timeGridDay"
                          variant="contained"
                          size="small"
                          className="ctrButton"
                          onClick={() => {
                            let calendar = calanderRef.current.getApi();
                            calendar.today();
                          }}
                        >
                          {translation("day")}
                        </option>
                      </select>
                    </div>

                    {/* <Button
											variant="contained"
											size="small"
											className="ctrButton"
											onClick={() => changeView("timeGridDay")}
										>
											يوم
										</Button> */}
                  </Grid>
                </Grid>
              </Container>
            </div>

            <div className="calendar">
              <FullCalendar
                ref={calanderRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={5}
                weekends={true}
               initialView="dayGridMonth"
                eventDidMount={function (info) {
                   new Tooltip(info.el, {
                    title:
                      formatMessage({ id: "appiontment" }) +
                      info.event.extendedProps.time,
                    placement: "right",
                    trigger: "hover",
                    container: "body",
                  });
                }}
                events={events}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                select={handleDateSelect}
                eventsSet={handleEvents}
                eventAdd={function () {
                  console.log("Event Added");
                  handleAddEvent();
                }}
                eventChange={function () {
                  console.log("Event Changed");
                }}
                eventRemove={function () {
                  console.log("Event Removed");
                }}
                headerToolbar={
                  false 
                }
              />
            </div>

            <EventDialog
              eventModal={false}
              // setEventModal={setEventModal}
              event={event}
              eventTitle={eventTitle}
              setEventTitle={setEventTitle}
              eventTime={eventTime}
              setEventTime={setEventTime}
              eventLocation={eventLocation}
              setEventLocation={setEventLocation}
              radios={radios}
              setRadios={setRadios}
              eventDescription={eventDescription}
              setEventDescription={setEventDescription}
              // addNewEvent={addNewEvent}
              // editEvent={editEvent}
              isEditModal={isEditModal}
            />
          </div>
        </CCol>
        <CCol lg={"3"}>
          <CCard style={{ width: "90%", overflow: "hidden" }}>
            <CCardBody>
              <h5> {translation("avaliableApps")}</h5>
              {Latestchedules?.slice(0, 4)?.map((ele, i) => (
                <div className="scheduleCard" key={i}>
                  <div className="icon">
                    <DateRangeIcon />
                  </div>
                  <div className="time">
                    <h6>{ele?.Subject}</h6>
                    <p>{new Date(ele?.StartDate).toDateString()}</p>
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
          <CCard style={{ width: "90%" }} className="mt-3">
            <CWidgetStatsA
              color="warning"
              style={{ borderColor: "transparent" }}
              value={
                <>
                  {translation("charts")}
                  <span className="fs-6 fw-normal">
                    <CIcon icon={cilArrowTop} />
                  </span>
                </>
              }
              title={`${formatMessage({
                id: "forYear",
              })} ${new Date().getFullYear()}`}

              chart={
				<Line options={{
					responsive: true,
					interaction: {
					  mode: 'index',
					  intersect: false,
					},
					stacked: false,
              			plugins: {
              				legend: {
              					display: false,
              				},
              			},
              			// maintainAspectRatio: false,
              			scales: {
              				x: {
              					display: false,
              				},
              				y: {
								type: 'linear',
              					display: false,
              				},
              			},
              			elements: {
              				line: {
              					borderWidth: 2,
              					tension: 0.4,
              				},
              				point: {
              					radius: 0,
              					hitRadius: 10,
              					hoverRadius: 4,
              				},
              			},
              		}} data={{
						labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
						datasets: [
							{
								label: 'dataset',
								backgroundColor: 'rgba(255,255,255,.2)',
								borderColor: 'rgba(255,255,255,.55)',
								data: [78, 81, 80, 45, 34, 12, 40],
								fill: false,
							},
						],
					}} />}
			/>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default React.memo(Schedule);
