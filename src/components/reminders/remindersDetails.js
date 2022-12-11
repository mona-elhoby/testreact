import React, { useState } from "react";
import {
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTableRow,
  CTable,
  CTableHead,
  CTableBody
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const RemindersDetails = (props) => {
  const [show, setShow] = useState("item1");

  const handelClick = (e) => setShow(e.target.title);

  return (
    <CModal visible={props.visible} onClose={props.onClose} className={`reminderModal ${document.body.getAttribute("dir") == 'ltr' ? 'enTextLeftPopup' : null}`}>
      <CModalHeader>
        <CModalTitle>
          <CIcon
            style={{ height: "20px" }}
            icon={props.icon}
            customClassName="nav-icon"
          />
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="reminderDetails-wrapper">
          <div className="title">{props.title}</div>
          <div className="reminderDetails">
            <div className="accordian-tabs">
              <h5
                onClick={(e) => handelClick(e)}
                title="item1"
                className={`${show == "item1" ? "active" : null}`}
              >
                {props.tab1}
              </h5>
              <h5
                onClick={(e) => handelClick(e)}
                title="item2"
                className={`${show == "item2" ? "active" : null}`}
              >
              {props.tab2}
              </h5>
              <h5
                onClick={(e) => handelClick(e)}
                title="item3"
                className={`${show == "item3" ? "active" : null}`}
              >
              {props.tab3}
              </h5>
              <h5
                onClick={(e) => handelClick(e)}
                title="item4"
                className={`${show == "item4" ? "active" : null}`}
              >
              {props.tab4}
              </h5>
              <h5
                onClick={(e) => handelClick(e)}
                title="item5"
                className={`${show == "item5" ? "active" : null}`}
              >
              {props.tab5}
              </h5>
            </div>
            <div className="accordian-details">
              <div>
              <CTable bordered responsive>
                <CTableHead>{props.header}</CTableHead>
                {show == "item1" ? <CTableBody className={`details ${show == "item1" ? "show" : null}`}>{props.tableBody1}</CTableBody> :
                show == "item2" ? <CTableBody className={`details ${show == "item2" ? "show" : null}`}>{props.tableBody2}</CTableBody> :
                show == "item3" ? <CTableBody className={`details ${show == "item3" ? "show" : null}`}>{props.tableBody3}</CTableBody> :
                show == "item4" ? <CTableBody className={`details ${show == "item4" ? "show" : null}`}>{props.tableBody4}</CTableBody> :
                <CTableBody className={`details ${show == "item5" ? "show" : null}`}>{props.tableBody5}</CTableBody>}
              </CTable>
              </div>
            </div>
          </div>
        </div>
      </CModalBody>
    
    </CModal>
  );
};

export default RemindersDetails;
