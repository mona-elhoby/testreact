import React from "react";
import { CCard, CCardHeader } from "@coreui/react";
import CIcon from '@coreui/icons-react';

const Reminders = ({ withCharts, ...props }) => {
  return (
    <div className="reminders-card" onClick={props.onClick}>
        <CCard>
          <CCardHeader>
            <span>{props.title}</span> <small></small>
          </CCardHeader>
            <div className="card-head">
            <div
            style={{
              textAlign: "right",
            }}
          >
            <div className="staticsCard">
              {props.titleVals?.map((val, i) => {
                return (
                  <div
                  className="child-staticsCard"
                    key={i}
                  >
                    <strong> {val.value} </strong>
                    <small className="titleFoot">  {val.title}  </small>
                  </div>
                );
              })}
                {props.values?.map((val,i) => {
                        return (<div key={i} className="child-staticsCard"><strong>{val.value}</strong><small className="titleFoot">{val.title}</small></div>)
                    })}
            </div>
          </div>
            </div>
            <div className="card-foot">
                <div className="card-footer-absolute">
                <CIcon style={{ height: '24px' }} icon={props.icon} customClassName="nav-icon" />
                </div>
            </div>
        </CCard>
     
    </div>
  );
};

export default Reminders;
