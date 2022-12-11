import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormFeedback,
} from "@coreui/react";

import { useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getChart } from "../store/reducers/chart";
import { colorsChart } from "../contraints/colorChart";
import translation from "../i18n/translate";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Charts = () => {
  const [mainNameChart, setMainNameChart] = useState("account");
  const [chartType, setChartType] = useState("account_contract");
  const [durationType, setDurationType] = useState("all");
  const [fromDate, setFromDate] = useState(
    new Date("2022/01/05").toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(
    new Date("2022/05/06").toISOString().split("T")[0]
  );
  const [labels, setLabels] = useState("file");
  const [fullChart, setFullChart] = useState([]);
  const [classifiedValidation, setClassifiedValidation] = useState(false);
  const dispatch = useDispatch();

  const accountType = ["account_pv", "account_contract", "account_rv"];
  const fileType = [
    "file_status",
    "file_source",
    "file_subject",
    "file_closetype",
    " file_meditor",
    "file_type",
  ];
  const sessionType = [
    "session_type",
    "session_employee",
    "session_role",
    "session_descsion",
    "session_adj",
  ];
  const stageType = [
    "stage_status",
    "stage_employee",
    "stage_office",
    "stage_stage",
    "stage_type",
    "stage_court",
    "stage_result",
  ];
  const workType = ["work_status", "work_employee", "work_type"];

  useEffect(() => {
    dispatch(
      getChart({ mainNameChart, chartType, durationType, fromDate, toDate })
    ).then((res) => {
      setFullChart(res.payload);
      setLabels(mainNameChart);
    });
  }, [dispatch]);
  console.log("durationType", durationType);
  const monthLabels = fullChart?.map((c, i) => {
    return durationType == "monthly"
      ? c._DATE?.split("-")?.slice(0, 1).toString() == "1"
        ? ["Jan", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "2"
        ? ["Feb", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "3"
        ? ["Mar", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "4"
        ? ["Apr", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "5"
        ? ["May", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "6"
        ? ["Jun", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "7"
        ? ["Jul", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "8"
        ? ["Aug", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "9"
        ? ["Sep", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "10"
        ? ["Oct", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "11"
        ? ["Nov", c._NAME]
        : c._DATE?.split("-")?.slice(0, 1).toString() == "12"
        ? ["Dec", c._NAME]
        : null
      : durationType == "all"
      ? // ? [c._DATE?.split('-')?.slice(2).toString(), c._NAME]
        c._NAME
      : [c._DATE, c._NAME];
  });
  const handelSubmitchart = () => {
    // console.log(mainNameChart, chartType, durationType, fromDate, toDate, labels);
    if (fromDate?.getTime() > toDate.getTime()) {
      setClassifiedValidation(true);
    }
    dispatch(
      getChart({ mainNameChart, chartType, durationType, fromDate, toDate })
    ).then((res) => {
      setFullChart(res.payload);
      setLabels(mainNameChart);
    });
  };

  return (
    <div className="theChart">
      {/* {console.log([...new Set(monthLabels)], monthLabels)} */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {/* {console.log(chartType, durationType, fromDate, toDate, labels)} */}
            <CCardHeader>
              <CRow style={{ width: "100%" }}>
                <CCol lg={2} sm={3} xs={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    <span>{translation("charts")}</span>
                  </CFormLabel>
                  <div className="classification">
                    <CFormSelect
                      aria-label="select example"
                      onClick={(e) => setMainNameChart(e.target.value)}
                    >
                      <option value="account">{translation("account")}</option>
                      <option value="stage"> {translation("stage")}</option>
                      <option value="file"> {translation("file")}</option>
                      <option value="session"> {translation("session")}</option>
                      <option value="work">
                        {translation("worksManagement")}
                      </option>
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol lg={2} sm={3} xs={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    {translation("chartType")}
                  </CFormLabel>
                  <div className="classification">
                    <CFormSelect
                      aria-label="select example"
                      onClick={(e) => setChartType(e.target.value)}
                    >
                      {mainNameChart == "account"
                        ? accountType.map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))
                        : mainNameChart == "file"
                        ? fileType.map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))
                        : mainNameChart == "session"
                        ? sessionType.map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))
                        : mainNameChart == "stage"
                        ? stageType.map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))
                        : workType.map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))}
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol lg={2} sm={3} xs={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    {translation("period")}
                  </CFormLabel>
                  <div className="classification">
                    <CFormSelect
                      aria-label="select example"
                      onClick={(e) => setDurationType(e.target.value)}
                    >
                      <option value="all">{translation("theAll")}</option>
                      <option value="monthly">{translation("monthly")}</option>
                      <option value="yearly">{translation("yearly")}</option>
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol lg={2} sm={3} xs={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    {translation("from")}{" "}
                  </CFormLabel>
                  <div className="classification">
                    <CFormInput
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                    <CFormFeedback
                      invalid={classifiedValidation ? true : false}
                      valid={classifiedValidation ? false : true}
                    >
                      {translation("notCorrect")}
                    </CFormFeedback>
                  </div>
                </CCol>
                <CCol lg={2} sm={3} xs={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    {translation("to")}
                  </CFormLabel>
                  <div className="classification">
                    <CFormInput
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                    <CFormFeedback
                      invalid={classifiedValidation ? true : false}
                      valid={classifiedValidation ? false : true}
                    >
                      {translation("notCorrect")}
                    </CFormFeedback>
                  </div>
                </CCol>
                <CCol lg={2} sm={3} xs={6}>
                  <CButton color={"custom"} onClick={() => handelSubmitchart()}>
                    {translation("apply")}
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            {console.log("monthLabels", monthLabels, "..monthLabels", [
              ...new Set(monthLabels),
            ])}
            <CCardBody>
              {console.log("fullChart", fullChart, "monthLabels", monthLabels)}
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      display: true,
                    },
                    title: {
                      display: false,
                      text: "Chart.js Bar Chart",
                    },
                  },
                }}
                data={{
                  labels: [...new Set(monthLabels)],
                  datasets: fullChart?.map((c, i) => {
                    console.log(i);
                    let newArr = [
                      ...Array([...new Set(monthLabels)].length).fill(0),
                    ];
                    newArr[i] = c._VALUE;
                    while (i > 0) {
                      i--;
                      newArr[i] = 0;
                      break;
                    }
                    return {
                      label: c._NAME,
                      backgroundColor: colorsChart[i],
                      data: newArr,
                      barPercentage: 0.2,
                    };
                  }),
                }}
                labels={`${durationType == "monthly" ? "months" : "years"}`}
                type="column"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default React.memo(Charts);
