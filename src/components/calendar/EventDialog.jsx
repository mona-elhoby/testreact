// @mui/material components
import React from "react";

import {Box, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import "./Calendar.css";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export const EventDialog = (props) => {
  const {
    eventModal,
    setEventModal,
    event,
    eventTitle,
    setEventTitle,
    radios,
    setRadios,
    eventDescription,
    setEventDescription,
    eventLocation,
    setEventLocation,
    eventTime,
    setEventTime,
    addNewEvent,
    editEvent,
    isEditModal,
    setModalAdd
  } = props;


  return (
    <Dialog
      open={eventModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setModalAdd(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        {isEditModal ? <h3>تعديل الموعد </h3> : <h3>إضافه موعد</h3>}
        {/* Title Section Group*/}
        <FormGroup>
          <TextField
            required
            label="الموعد"
            variant="outlined"
            placeholder="الموعد"
            type="text"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            required
            label="الموضوع"
            variant="outlined"
            placeholder="الموضوع"
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            required
            label="المكان"
            variant="outlined"
            placeholder="المكان"
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </FormGroup>
        {/* Event Description Section Group*/}
        <FormGroup>
          <TextField
            placeholder="Event Desctiption"
            label="الوصف "
            type="text"
            variant="outlined"
            multiline
            minRows="4"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" justifyContent="space-around">
          <Box>
            {isEditModal ? (
              <Button
                color="danger"
                variant="contained"
                onClick={() => editEvent(event)}
              >
                تعديل
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => addNewEvent}
              >
                إضافه
              </Button>
            )}
          </Box>
          <Button onClick={() => setEventModal(false)} color="primary">
            إغلاق
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
