import React, { useEffect, useState } from "react";

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CProgressBar,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowTop, cilArrowBottom } from "@coreui/icons";
import { getStyle } from "@coreui/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { MDBDataTable } from "mdbreact";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import NotificationsPausedRoundedIcon from "@mui/icons-material/NotificationsPausedRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import { Doughnut } from "react-chartjs-2";

import { FormattedMessage, useIntl } from "react-intl";

import {
  chartOptions,
  WorksOptions,
  sesColumn,
  filterAgency,
} from "../components/home/chartOptions";
import { getReminderCases } from "../store/reducers/reminderData";
import { getAllStages } from "../store/reducers/stage";
import {
  getAgencyData,
  getAgencyEndInMonth,
  getAgencyWithOpenFile,
  getAgencyWithClosedFile,
  getAgencyUnAttached,
} from "../store/reducers/agency";
import { getContracts } from "../store/reducers/contract";
import { getLatestSchedule } from "../store/reducers/schedule";
import { getSessionData } from "../store/reducers/session";
import { getAllWorks, getWorkData } from "../store/reducers/work";
import { getContacts } from "../store/reducers/contacts";
import { monthLabels } from "../contraints/convertMonthNum";
import { getChart } from "../store/reducers/chart";
import { colorsChart } from "../contraints/colorChart";
import "../components/home/home.css";
import translation from "../i18n/translate";

ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  const [showSession, setShowSession] = useState(true);
  const [allCases, setAllCases] = useState({});
  const [allAgencies, setAllAgencies] = useState([]);
  const [allCritariaEndMonth, setAllCritariaEndMonth] = useState([]);
  const [allCritariaOpenFile, setAllCritariaOpenFile] = useState([]);
  const [allCritariaClosedFile, setAllCritariaClosedFile] = useState([]);
  const [allCritariaNotAttached, setAllCritariaNotAttached] = useState([]);
  const [stages, setStages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [notDoneWork, setNotDoneWork] = useState([]);
  const [declinedWork, setDeclinedWork] = useState([]);
  const [donWork, setDonWork] = useState([]);
  const [workPerEmployee, setWorkPerEmployee] = useState([]);
  const [workMonthLable, setWorkMonthLable] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [ants, setAnts] = useState([]);
  const [lawersAnts, setLawersAnts] = useState([]);
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);
  const [geniusContact, setGeniusContact] = useState([]);
  const [workStatusChart, setWorkStatusChart] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { Latestchedules } = useSelector((state) => state.schedule);
  const { allTheWorks } = useSelector((state) => state.work);
  const { formatMessage } = useIntl();
  const dateAfterMonth = Date.now() + 2592000000;
  const date = new Date(dateAfterMonth).toLocaleString();
  useEffect(() => {
    dispatch(getLatestSchedule());
    dispatch(getReminderCases()).then((res) => setAllCases(res.payload));
    dispatch(getAllStages()).then((res) => setStages(res.payload));
    dispatch(getAgencyData({ theParams: null })).then((res) =>
      setAllAgencies(res.payload?.data)
    );
    dispatch(getContracts({ theParams: null })).then((res) =>
      setContracts(res.payload?.data)
    );
    dispatch(getAgencyUnAttached()).then((res) =>
      setAllCritariaNotAttached(res.payload)
    );
    dispatch(getAgencyWithClosedFile()).then((res) =>
      setAllCritariaClosedFile(res.payload)
    );
    dispatch(getAgencyEndInMonth(date)).then((res) =>
      setAllCritariaEndMonth(res.payload)
    );
    dispatch(getAgencyWithOpenFile()).then((res) =>
      setAllCritariaOpenFile(res.payload)
    );
    dispatch(
      getSessionData({
        theParams: {
          sesSearchDateFrom: new Date(Date.now()).toLocaleString(),
          sesSearchDateTo: new Date(Date.now() + 604800000).toLocaleString(),
        },
      })
    ).then((res) => setSessions(res.payload.data));
    dispatch(getAllWorks());
    dispatch(getWorkData({ theParams: { statusWorkSearch: 2 } })).then((res) =>
      setNotDoneWork(res.payload)
    );
    dispatch(getWorkData({ theParams: { statusWorkSearch: 1 } })).then((res) =>
      setDeclinedWork(res.payload)
    );
    dispatch(getWorkData({ theParams: { statusWorkSearch: 0 } })).then((res) =>
      setDonWork(res.payload)
    );
    const dateNow = new Date();
    dateNow.setFullYear(dateNow.getFullYear() - 1);
    dispatch(
      getChart({
        mainNameChart: "work",
        chartType: "work_employee",
        durationType: "monthly",
        fromDate: new Date(dateNow).toISOString().split("T")[0],
        toDate: new Date().toISOString().split("T")[0],
      })
    ).then((res) => {
      setWorkPerEmployee(res.payload);
      setWorkMonthLable(monthLabels(res.payload, "monthly"));
    });
    dispatch(
      getChart({
        mainNameChart: "work",
        chartType: "work_status",
        durationType: "monthly",
        fromDate: new Date(dateNow).toISOString().split("T")[0],
        toDate: new Date().toISOString().split("T")[0],
      })
    ).then((res) => {
      setWorkStatusChart(res.payload);
    });
    dispatch(getContacts({ theParams: null })).then((res) =>
      setAllContacts(res.payload)
    );
    dispatch(getContacts({ theParams: { classification0: 7 } })).then((res) =>
      setAnts(res.payload)
    );
    dispatch(getContacts({ theParams: { classification0: 4 } })).then((res) =>
      setLawersAnts(res.payload)
    );
    dispatch(getContacts({ theParams: { classification0: 2 } })).then((res) =>
      setAgents(res.payload)
    );
    dispatch(getContacts({ theParams: { classification0: 1 } })).then((res) =>
      setClients(res.payload)
    );
    dispatch(getContacts({ theParams: { classification0: 5 } })).then((res) =>
      setGeniusContact(res.payload)
    );
  }, []);

  //label for agency chart
  const labels =
    allAgencies?.length > 0
      ? [
          ...new Set(
            allAgencies
              ?.filter((criteria, i) =>
                criteria?.AGE_TYPE_NAME ? criteria?.AGE_TYPE_NAME : null
              )
              .map((ele) => ele?.AGE_TYPE_NAME)
          ),
        ]
      : [];
  const enLabels =
    allAgencies?.length > 0
      ? [
          ...new Set(
            allAgencies
              ?.filter((criteria, i) =>
                criteria?.AGE_TYPE_NAME_EN
                  ? criteria?.AGE_TYPE_NAME_EN
                  : criteria?.AGE_TYPE_NAME
              )
              .map((ele) =>
                ele?.AGE_TYPE_NAME_EN
                  ? ele?.AGE_TYPE_NAME_EN
                  : ele?.AGE_TYPE_NAME
              )
          ),
        ]
      : [];

  const allendOneMonth = filterAgency(allCritariaEndMonth);

  const allclosedFile = filterAgency(allCritariaClosedFile);

  const allOpenFile = filterAgency(allCritariaOpenFile);

  const allNotAttached = filterAgency(allCritariaNotAttached);

  // console.log(labels, allCritariaEndMonth);

  // agency chart
  const databarChart = {
    labels: document.body.getAttribute("dir") == "rtl" ? labels : enLabels,
    datasets: [
      {
        label: formatMessage({ id: "endInMonth" }),
        data: labels.map((ele, i) => allendOneMonth[ele]?.data?.length),
        backgroundColor: "rgba(255, 168, 0, 0.9)",
        borderRadius: "20",
        barPercentage: ".6",
      },
      {
        label: formatMessage({ id: "expirenInClosedFile" }),
        data: labels.map((ele, i) => allclosedFile[ele]?.data?.length),
        backgroundColor: "rgba(53, 162, 235, 0.9)",
        borderRadius: "20",
        barPercentage: ".6",
      },
      {
        label: formatMessage({ id: "expirenInOpenFile" }),
        data: labels.map((ele, i) => allOpenFile[ele]?.data?.length),
        backgroundColor: "rgba(255, 99, 132, 0.9)",
        borderRadius: "20",
        barPercentage: ".6",
      },
      {
        label: formatMessage({ id: "notAttached" }),
        data: labels.map((ele, i) => allNotAttached[ele]?.data?.length),
        backgroundColor: "rgba(30, 66, 160, 0.9)",
        borderRadius: "20",
        barPercentage: ".6",
      },
    ],
  };

  // session in week
  const sessionInWeek = sessions?.reduce(
    (acc, curr) =>
      (acc[curr.SES_DATE] = acc[curr.SES_DATE] || []).push(curr) && acc,
    {}
  );
  const sortSessionInWeek = sessionInWeek
    ? Object.entries(sessionInWeek)?.sort((a, b) => (a[0] > b[0] ? 1 : -1))
    : [];
  // console.log(sortSessionInWeek);
  //session in week table
  const sesRows = (sesPerDay) =>
    sesPerDay.map((ele, i) => {
      return {
        // sessDate: (
        // 	<div style={{ display: 'flex', alignItems: 'center' }} key={i}>
        // 		<span className="circle"></span>
        // 		<div>
        // 			<small> تاريخ الجلسه</small>
        // 			<h6>{ele.SES_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele.SES_DATE)) : null}</h6>
        // 		</div>
        // 	</div>
        // ),
        fileNum: (
          <div
            style={{ display: "flex", alignItems: "baseline" }}
            key={i + Math.random()}
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <span className="circle"></span>
            <div>
              <small>{translation("fileNum")} </small>
              <h6>{ele?.CAS_NUMBER ? ele?.CAS_NUMBER : null}</h6>
            </div>
          </div>
        ),
        stgNum: (
          <div
            style={{ display: "flex" }}
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <div style={{ marginLeft: "15px" }}>
              <small>{translation("stageNum")}</small>
              <h6>{ele?.STG_NUMBER ? ele?.STG_NUMBER : null}</h6>
            </div>
          </div>
        ),
        stgType: (
          <div
            style={{ marginLeft: "15px" }}
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <small>{translation("sessionType")}</small>
            <h6>
              {document.body.getAttribute("dir") == "rtl" && ele?.SES_TYPE_NAME
                ? ele?.SES_TYPE_NAME
                : document.body.getAttribute("dir") == "ltr"
                ? ele?.SES_TYPE_NAME_EN
                : null}
            </h6>
          </div>
        ),
        courtName: (
          <div
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <small>{translation("court")}</small>
            <h6>
              {document.body.getAttribute("dir") == "rtl" && ele?.COU_NAME
                ? ele?.COU_NAME
                : document.body.getAttribute("dir") == "ltr"
                ? ele.COU_NAME_EN
                : null}
            </h6>
          </div>
        ),
        agents: (
          <div
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <small>{translation("agents")}</small>
            <h6>
              {document.body.getAttribute("dir") == "rtl" && ele?.AGENTS
                ? ele?.AGENTS
                : document.body.getAttribute("dir") == "ltr"
                ? ele?.AGENTS_EN
                : null}
            </h6>
          </div>
        ),
        ants: (
          <div
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <small>{translation("ants")}</small>
            <h6>
              {document.body.getAttribute("dir") == "rtl" && ele?.ANTS
                ? ele?.ANTS
                : document.body.getAttribute("dir") == "ltr"
                ? ele?.ANTS_EN
                : null}
            </h6>
          </div>
        ),
        // lastSesDetails: (
        // 	<div>
        // 		<small style={{ display: 'block' }}> الجلسه السابقه</small>
        // 		<CPopover
        // 			title=""
        // 			content="pldbk/m/fc,imbkt,poljhwdfgkhlkolptyiux,mpovpo,mjhrwqwertyuiopcfceqhziuxoim\/.,mnbgvdfghjkl;"
        // 			placement="top"
        // 		>
        // 			<h6 color="danger" size="lg" style={{ cursor: 'pointer' }}>
        // 				{'pldbk/m/fc,imbkt,poljhwdfgkhlkolptyiux,mpovpo,mjhrwqwertyuiopcfceqhziuxoim/.,mnbgvdfghjkl;'.slice(0, 12) + '...'}
        // 			</h6>
        // 		</CPopover>
        // 	</div>
        // ),
        // notes: (
        // 	<div onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>
        // 		<small>الملاحظات</small>
        // 		<h6>{ele?.SES_NOTES ? ele?.SES_NOTES : null}</h6>
        // 	</div>
        // ),
        adjSes: (
          <div
            onClick={() =>
              Navigate(
                `/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`
              )
            }
          >
            <small style={{ color: "transparent" }}>
              {translation("judgement")}
            </small>
            <p
              className={`adjButton ${
                ele?.ADJ_TYPE_NAME ? "colorActive" : "colorNotActive"
              }`}
            >
              {document.body.getAttribute("dir") == "rtl" && ele?.ADJ_TYPE_NAME
                ? ele?.ADJ_TYPE_NAME
                : document.body.getAttribute("dir") == "ltr"
                ? ele.ADJ_TYPE_NAME_EN
                : translation("noJudgement")}
            </p>
          </div>
        ),
      };
    });

  // cases Chart
  const notUsed = allCases?.FILE_USE;
  const withOuthContract = allCases?.FILE_WITHOUT_CONTRACT;
  const casesWithOutAgency = allCases?.FILE_WITHOUT_AGENCY;
  const newCases = allCases?.FILE_NEW;
  const notUsedInMonth = notUsed?.data.map(
    (ele) => new Date(ele.LAST_DATE).getMonth() + 1
  );
  const newCasesPerMonth = newCases?.data.map(
    (ele) => new Date(ele.LAST_DATE).getMonth() + 1
  );
  const notContractPerMonth = withOuthContract?.data.map(
    (ele) => new Date(ele.LAST_DATE).getMonth() + 1
  );
  const notAgencyPerMonth = casesWithOutAgency?.data.map(
    (ele) => new Date(ele.LAST_DATE).getMonth() + 1
  );
  //format work
  const workChart = allTheWorks.data
    ?.filter((ele) => ele?.CLI_NAME)
    .map((ele) => ({
      name: ele.CLI_NAME,
      month: new Date(ele?.CREATE_DATE).getMonth() + 1,
    }));
  const notWorkChart = notDoneWork.data
    ?.filter((ele) => ele?.CLI_NAME)
    .map((ele) => ({
      name: ele.CLI_NAME,
      month: new Date(ele?.CREATE_DATE).getMonth() + 1,
    }));

  // progress for contacts
  const allContactTotal = allContacts.total;
  // console.log("allContacts: ", allContacts.total, agents.total, Math.floor(agents.total / allContactTotal))
  const progressExample = [
    {
      title: translation("agents"),
      value: agents?.total + " " + formatMessage({ id: "client" }),
      percent: ((agents.total / allContactTotal) * 100).toFixed(2),
      color: "success",
    },
    {
      title: translation("ants"),
      value: ants?.total + " " + formatMessage({ id: "client" }),
      percent: ((ants.total / allContactTotal) * 100).toFixed(2),
      color: "info",
    },
    {
      title: translation("clients"),
      value: clients?.total + " " + formatMessage({ id: "client" }),
      percent: ((clients.total / allContactTotal) * 100).toFixed(2),
      color: "warning",
    },
    {
      title: translation("experts"),
      value: geniusContact?.total + " " + formatMessage({ id: "client" }),
      percent: ((geniusContact.total / allContactTotal) * 100).toFixed(2),
      color: "danger",
    },
    {
      title: translation("antsLawyers"),
      value: lawersAnts?.total + " " + formatMessage({ id: "client" }),
      percent: ((lawersAnts.total / allContactTotal) * 100).toFixed(2),
      color: "primary",
    },
  ];
  // console.log("workPerEmployee: ", workPerEmployee.map(ele => [...new Set(ele._NAME.split('-').flat())]))
  //works for employees chart
  const workLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];
  const workEmployeeLabel = [
    ...new Set(workPerEmployee.map((ele) => ele._NAME.split("-")).flat(1)),
  ];
  console.log();
  const workEmployeeChartdata = {
    labels: workLabels,
    datasets: workEmployeeLabel.map((ele, index) => ({
      label: ele,
      data: [
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 1 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 2 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 3 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 4 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 5 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 6 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 7 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 8 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 1) == 9 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
        workPerEmployee.find(
          (ele2, i) =>
            ele2._DATE &&
            ele2._DATE.slice(0, 2) == 10 &&
            ele2._NAME.split("-").includes(ele)
        )?._VALUE,
      ].map((ele) => (ele == undefined ? 0 : ele)),
      backgroundColor: colorsChart[index],
    })),
  };
  // done work
  const doneWorkArr = [
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 1
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 2
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 3
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 4
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 5
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 6
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 7
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 8
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 1) == 9
        )?._VALUE
      : 0,
    workStatusChart?.length > 0
      ? workStatusChart?.find(
          (ele) => ele._NAME == "منفذ" && ele?._DATE.slice(0, 2) == 10
        )?._VALUE
      : 0,
  ];
  // console.log(workEmployeeChartdata);
  return (
    <div className="homeDashboard">
      <CRow>
        <CCol md={4}>
          <CCard className="mb-4 cases-chart fileChart">
            <CCardHeader>
              {translation("all")} {translation("files")} ( {allCases?.total} )
            </CCardHeader>
            <CCardBody>
              <Line
                style={{ height: "130px !important", marginTop: "40px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: formatMessage({ id: "new" }),
                      backgroundColor: "transparent",
                      borderColor: "rgb(52 85 169)",
                      pointHoverBackgroundColor: "#1e42a0",
                      borderWidth: 2,
                      data: [
                        newCasesPerMonth?.filter((ele) => ele == 1).length,
                        newCasesPerMonth?.filter((ele) => ele == 2).length,
                        newCasesPerMonth?.filter((ele) => ele == 3).length,
                        newCasesPerMonth?.filter((ele) => ele == 4).length,
                        newCasesPerMonth?.filter((ele) => ele == 5).length,
                        newCasesPerMonth?.filter((ele) => ele == 6).length,
                        newCasesPerMonth?.filter((ele) => ele == 7).length,
                      ],
                    },
                    {
                      label: formatMessage({ id: "expired" }),
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-danger"),
                      pointHoverBackgroundColor: getStyle("--cui-danger"),
                      borderWidth: 2,
                      data: [
                        notUsedInMonth?.filter((ele) => ele == 1).length,
                        notUsedInMonth?.filter((ele) => ele == 2).length,
                        notUsedInMonth?.filter((ele) => ele == 3).length,
                        notUsedInMonth?.filter((ele) => ele == 4).length,
                        notUsedInMonth?.filter((ele) => ele == 5).length,
                        notUsedInMonth?.filter((ele) => ele == 6).length,
                        notUsedInMonth?.filter((ele) => ele == 7).length,
                      ],
                    },
                    {
                      label: formatMessage({ id: "withoutAgency" }),
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-info"),
                      pointHoverBackgroundColor: getStyle("--cui-info"),
                      borderWidth: 2,
                      borderDash: [8, 5],
                      data: [
                        notAgencyPerMonth?.filter((ele) => ele == 1).length,
                        notAgencyPerMonth?.filter((ele) => ele == 2).length,
                        notAgencyPerMonth?.filter((ele) => ele == 3).length,
                        notAgencyPerMonth?.filter((ele) => ele == 4).length,
                        notAgencyPerMonth?.filter((ele) => ele == 5).length,
                        notAgencyPerMonth?.filter((ele) => ele == 6).length,
                        notAgencyPerMonth?.filter((ele) => ele == 7).length,
                      ],
                    },
                    {
                      label: formatMessage({ id: "withoutContract" }),
                      backgroundColor: "transparent",
                      borderColor: getStyle("--cui-warning"),
                      pointHoverBackgroundColor: getStyle("--cui-warning"),
                      borderWidth: 2,
                      borderDash: [8, 5],
                      data: [
                        notContractPerMonth?.filter((ele) => ele == 1).length,
                        notContractPerMonth?.filter((ele) => ele == 2).length,
                        notContractPerMonth?.filter((ele) => ele == 3).length,
                        notContractPerMonth?.filter((ele) => ele == 4).length,
                        notContractPerMonth?.filter((ele) => ele == 5).length,
                        notContractPerMonth?.filter((ele) => ele == 6).length,
                        notContractPerMonth?.filter((ele) => ele == 7).length,
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  stacked: false,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      fullWidth: true,
                      maxHeigh: 20,
                      Position: "top",
                      align: "start",
                      labels: {
                        boxWidth: 8,
                        boxHeight: 8,
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 10,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.7,
                    },
                    point: {
                      radius: 1,
                      hitRadius: 10,
                      hoverRadius: 1,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
                plugins={[
                  {
                    id: "legendMargin",
                    beforeInit(chart, legend, options) {
                      const fitVal = chart.legend.fit;
                      chart.legend.fit = function fit() {
                        fitVal.bind(chart.legend)();
                        // console.log((this.height += 20));
                        return (this.heigth += 20);
                      };
                    },
                  },
                ]}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="mb-4 home-contracts">
            <CCardHeader>
              {translation("all")} {translation("contracts")} ({" "}
              {contracts?.length} )
            </CCardHeader>
            <CCardBody>
              <Doughnut
                data={{
                  labels: [
                    formatMessage({ id: "using" }),
                    formatMessage({ id: "expired" }),
                  ],
                  datasets: [
                    {
                      //   label: "# of Votes",
                      data: [
                        contracts?.filter(
                          (ele) =>
                            new Date(Date.now()).toLocaleString() >
                            new Date(ele.COR_TO_DATE).toLocaleString()
                        ).length,
                        contracts?.filter(
                          (ele) =>
                            new Date(Date.now()).toLocaleString() <
                            new Date(ele.COR_TO_DATE).toLocaleString()
                        ).length,
                      ],
                      backgroundColor: ["#FFCE56", "rgb(255 99 132)"],
                      hoverBackgroundColor: ["#FFCE56", "rgb(255 99 132)"],
                      borderColor: ["#FFCE56", "rgb(255 99 132)"],

                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    labels: {
                      render: "percentage",
                      fontColor: ["green", "white"],
                      precision: 2,
                      arc: true,
                    },
                  },
                  maintainAspectRatio: true,
                }}
              />

              <div
                style={{
                  display: "flex",
                  fontSize: "10px",
                  justifyContent: "space-between",
                  paddingBottom: "3px",
                }}
              >
                <div>
                  <span className="allChart secondSpeicified"></span>
                  <span> {translation("using")} </span>
                </div>
                <div>
                  <span className="allChart thirdSpecified"></span>
                  <span> {translation("expired")} </span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="home-appiontment">
            <CCardHeader>
              <h5>{translation("latestAppiontments")} </h5>
            </CCardHeader>
            <CCardBody>
              {Latestchedules?.slice(0, 3)?.map((ele, i) => (
                <div className="scheduleCard" key={i}>
                  <div style={{ display: "flex", width: "calc(100% - 30px)" }}>
                    <div className="icon">
                      <DateRangeIcon />
                    </div>
                    <div className="time">
                      <h6>{translation("appiontment")}</h6>
                      <p>
                        {ele?.StartDate
                          ? new Date(ele?.StartDate).toDateString()
                          : null}
                      </p>
                    </div>
                  </div>
                  <div>
                    <AccessAlarmsIcon sx={{ color: "#ffbb33" }} />
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <WidgetsDropdown /> */}
      <CRow>
        <CCol md={8}>
          <CCard className="mb-4 home-chart">
            <CCardHeader>{translation("worksManagement")}</CCardHeader>
            <CCardBody>
              <Bar options={WorksOptions} data={workEmployeeChartdata} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <div className="workDeclinedReminder">
            <div className="declineWork">
              <strong>{translation("delayedWork")}</strong>
              <div style={{ height: "45px" }}>
                <NotificationsPausedRoundedIcon fontSize="large" />
              </div>
              <strong>{declinedWork.data?.length}</strong>
              <div className="percentage">
                <p>
                  {Math.floor(
                    (declinedWork.data?.length / allTheWorks.total) * 100
                  )}
                  %
                </p>
              </div>
            </div>
            <div className="reminderWork">
              <strong>{translation("remiderWork")} </strong>
              <div style={{ height: "45px" }}>
                <NotificationsActiveRoundedIcon fontSize="large" />
              </div>
              <strong>{donWork.data?.length}</strong>
              <div>
                <p className="percentage">
                  {Math.floor(
                    (donWork?.data?.length / allTheWorks?.total) * 100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
          <div className="notDoneWork">
            <div>
              <strong>{translation("notDoneWork")}</strong>
              <div>
                <strong className="strong">{notDoneWork.data?.length}</strong>
              </div>
            </div>
            <div>
              <ReportProblemRoundedIcon fontSize="large" />
              <div>
                <p className="percentage">
                  {Math.floor(
                    (notDoneWork.data?.length / allTheWorks.total) * 100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CCard
        style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}
      >
        <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
          {progressExample.map((item, index) => (
            <CCol className="mb-sm-2 mb-0" key={index}>
              <div
                className="text-medium-emphasis"
                style={{ fontSize: "12px", fontWeight: 500 }}
              >
                {item.title}
              </div>
              <strong style={{ fontSize: "14px" }}>
                {item.value} ({item.percent}%)
              </strong>
              <CProgress className="mt-2">
                <CProgressBar
                  variant="striped"
                  animated
                  color={item?.color}
                  value={item?.percent ? item?.percent : 0}
                />
              </CProgress>
            </CCol>
          ))}
        </CRow>
      </CCard>
      <CRow>
        <CCol md={6}>
          <CCard className="mb-4 home-chart">
            <CCardHeader>{translation("agencies")}</CCardHeader>
            <CCardBody>
              <Bar options={chartOptions} data={databarChart} />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard className="mb-4 home-chart">
            <CCardHeader>
              {translation("worksManagement")} (
              <small>
                {workStatusChart.length > 0
                  ? workStatusChart
                      .filter((ele) => ele._NAME == "منفذ")
                      ?.reduce((acc, cur) => cur._VALUE + acc, 0)
                  : null}{" "}
                {translation("done")}
              </small>
              <CIcon icon={cilArrowTop} style={{ color: "#1e42a0" }} />)
            </CCardHeader>
            <CCardBody>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.6,
                    },
                    point: {
                      radius: 5,
                      hitRadius: 1,
                      hoverRadius: 4,
                      hoverBorderWidth: 4,
                    },
                  },
                }}
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                  ],
                  datasets: [
                    {
                      label: translation("executedWork"),
                      backgroundColor: "transparent",
                      borderColor: "#3455a9",
                      pointHoverBackgroundColor: "#FFF",
                      pointBackgroundColor: "#FFF",
                      borderWidth: 3,
                      data: doneWorkArr.map((ele) =>
                        ele == undefined ? 0 : ele
                      ),
                      fill: true,
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={4}></CCol>
        {/* <CCol md={4}>
					<CCard className="home-appiontment">
						<CCardHeader>
							<h5> أعضاء جدد</h5>
						</CCardHeader>
						<CCardBody>
							{[
								{ name: 'أحمد', rel: 'عميل' },
								{ name: 'محمد', rel: 'محامي خصم' },
								{ name: 'شركه', rel: 'وكاله' },
								{ name: 'علي', rel: 'خصم' },
							]?.map((ele, i) => (
								<div className="scheduleCard clientCard" key={i}>
									<div style={{ display: 'flex', width: 'calc(100% - 30px)' }}>
										<div className="icon">
											<div className="img">
												<img src={Avatar} width="100%" />
											</div>
										</div>
										<div className="time">
											<h6>{ele?.name}</h6>
											<p>{ele?.rel}</p>
										</div>
									</div>
									<div>
										<AssignmentIndIcon sx={{ color: '#ffbb33' }} />
									</div>
								</div>
							))}
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={4}>
					<CCard className="home-appiontment">
						<CCardHeader>
							<h5>أخر التحديثات</h5>
						</CCardHeader>
						<CCardBody>
							{[
								{ name: 'عمل إدارى', icon: WorkHistoryIcon, stgNum: '325' },
								{ name: 'جلسه', icon: LanIcon, stgNum: '325' },
								{ name: 'عمل إدارى', icon: WorkHistoryIcon, stgNum: '325' },
								{ name: 'جلسه', icon: LanIcon, stgNum: '325' },
							]?.map((ele, i) => (
								<div className="scheduleCard dailyCard" key={i}>
									<div style={{ display: 'flex' }}>
										<div className="icon">
											{ele.icon == WorkHistoryIcon ? (
												<WorkHistoryIcon sx={{ color: '#1e42a0' }} />
											) : (
												<LanIcon sx={{ color: '#1e42a0' }} />
											)}
										</div>
										<div className="time">
											<h6>{ele?.name}</h6>
											<p> قضيه رقم {ele?.stgNum}</p>
										</div>
									</div>
									<div> <AssignmentIndIcon sx={{ color: '#ffbb33' }} /> </div>
								</div>
							))}
						</CCardBody>
					</CCard>
				</CCol> */}
      </CRow>
      <CRow>
        <CCol sm={12}>
          <div className="onGoingStage">
            <h5
              className="onGoingStgaeInWeek"
              onClick={() => setShowSession(!showSession)}
            >
              {translation("nextWeekSession")} ( {sessions?.length} )
            </h5>
            <CAccordion
              activeItemKey={1}
              className={`collapse ${showSession ? "show" : "hide"}`}
            >
              {sortSessionInWeek.map(([key, value], index) => {
                return (
                  <CAccordionItem itemKey={(index += 1)} key={(index += 1)}>
                    <CAccordionHeader style={{ display: "flex" }}>
                      <p key={key} className="nextWeekbtn">
                        {new Date(key).toDateString().slice(0, 3) == "Wed"
                          ? translation("wen")
                          : new Date(key).toDateString().slice(0, 3) == "Thu"
                          ? translation("thu")
                          : new Date(key).toDateString().slice(0, 3) == "Fri"
                          ? translation("fri")
                          : new Date(key).toDateString().slice(0, 3) == "Sat"
                          ? translation("sat")
                          : new Date(key).toDateString().slice(0, 3) == "Sun"
                          ? translation("sun")
                          : new Date(key).toDateString().slice(0, 3) == "Mon"
                          ? translation("mon")
                          : translation("tue")}
                        ، {new Date(key).getFullYear()}/
                        {new Date(key).getUTCMonth() + 1}/
                        {new Date(key).getUTCDate()}
                      </p>
                      <p style={{ marginRight: "10px" }}>( {value.length} )</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <MDBDataTable
                        responsive
                        //   scrollX
                        //   scrollY
                        small
                        data={{ columns: sesColumn, rows: sesRows(value) }}
                        searching={false}
                      />
                    </CAccordionBody>
                  </CAccordionItem>
                );
              })}
            </CAccordion>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default React.memo(Dashboard);
