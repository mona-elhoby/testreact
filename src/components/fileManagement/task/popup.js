import React, { useCallback, useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CButton,
  CFormInput,
  CFormTextarea,
  CTableBody,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSpreadsheet, cilPlus, cilTrash } from "@coreui/icons";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { TaskConstantType } from "./taskConstraint";
import { getTaskType } from "../../../store/reducers/constants/task";
import { getAllStages } from "../../../store/reducers/stage";
import {
  getTasksData,
  addNewTasks,
  updateTasks,
  getTasksAttachment,
  getTasksAttachmentData,
  deleteAttachment,
} from "../../../store/reducers/task";
import AttachedHeadTable from "../../../features/attachedFileHaed";
import { getSessionData } from "../../../store/reducers/session";
import AttachedPopup from "../../../features/attachment";
import translation from "../../../i18n/translate";
import DeletePopup from "../../../features/delete";

const ReturnedPopup = (props) => {
  const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] =
    useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [deleteAttacmentId, setDeleteAttacmentId] = useState("");
  const [durationFrom, setDurationFrom] = useState(undefined);
  const [durationTo, setDurationTo] = useState(undefined);
  const [workDuration, setWorkDuration] = useState("");
  const [constantAdd, setConstantAdd] = useState("");
  const [attacmentId, setAttacmentId] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [employee, setEmployee] = useState("");
  const [stageNum, setStageNum] = useState("");
  const [attached, setAttached] = useState([]);
  const [sesDate, setSesDate] = useState("");
  const [theDate, setTheDate] = useState("");
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { allEmployee } = useSelector((state) => state.employee);
  const { theAllStages } = useSelector((state) => state.stage);
  const { allSessions } = useSelector((state) => state.session);
  const { theTaskTypeCompo } = useSelector((state) => state.taskContant);
  //TODO form / to not update
  useEffect(() => {
    dispatch(getAllStages({ theparams: { id: id } }));
    dispatch(getTaskType());
    console.log("props.selectedCriterai: ", props.selectedCriterai);
    if (props.editCriterai) {
      console.log("props.editCriterai: ", props.editCriterai);
      if (props.editCriterai.STG_ID_PK) {
        dispatch(
          getSessionData({
            theParams: { id: id, stgNumSearch: props.editCriterai.STG_ID_PK },
          })
        ).then((res) => {
          setSesDate(props.editCriterai.SES_ID_PK);
        });
      } else {
        setSesDate("");
      }
      dispatch(
        getTasksAttachment(
          props.editCriterai.TSK_ID_PK || props.selectedCriteria.TSK_ID_PK
        )
      ).then((res) => setAttachment(res?.payload));
      setTheDate(
        props.editCriterai.TSK_DATE
          ? new Date(props.editCriterai.TSK_DATE).toISOString().split("T")[0]
          : ""
      );
      setEmployee(props.editCriterai.EMP_ID_PK);
      setType(props.editCriterai?.TSK_TYPE_NAME);
      setStageNum(props.editCriterai.CAS_NUMBER);
      setWorkDuration(props.editCriterai.TSK_DURATION);
      setDurationFrom(
        props.editCriterai.TSK_FROM
          ? `2014-08-18T${props.editCriterai.TSK_FROM}:00`
          : ""
      );
      setDurationTo(
        props.editCriterai.TSK_TO
          ? `2014-08-18T${props.editCriterai.TSK_TO}:00`
          : ""
      );
      setAmount(props.editCriterai?.TSK_COST);
      setNotes(props.editCriterai?.TSK_NOTES);
    }
  }, []);

  const emptyInputsVals = () => {
    setSesDate("");
    setTheDate("");
    setEmployee("");
    setType("");
    setStageNum("");
    setWorkDuration("");
    setDurationFrom(undefined);
    setDurationTo(undefined);
    setAmount("");
    setType("");
  };

  const addConsult = () => {
    let theTimeDurationTo =
      durationTo && new Date(durationTo).toLocaleTimeString();
    if (theTimeDurationTo) {
      if (theTimeDurationTo.slice(0, 2).includes(":")) {
        theTimeDurationTo = `0${theTimeDurationTo}`;
      }
    }
    let theTimeDurationFrom =
      durationFrom && new Date(durationFrom).toLocaleTimeString();
    if (theTimeDurationFrom) {
      if (theTimeDurationFrom.slice(0, 2).includes(":")) {
        theTimeDurationFrom = `0${theTimeDurationFrom}`;
      }
    }
    console.log({
      TSK_FROM: durationFrom
        ? theTimeDurationFrom
            .slice(0, 5)
            .concat(" ")
            .concat(theTimeDurationFrom.slice(9))
        : undefined,
      TSK_TO: durationTo
        ? theTimeDurationTo
            .slice(0, 5)
            .concat(" ")
            .concat(theTimeDurationTo.slice(9))
        : undefined,
    });
    dispatch(
      addNewTasks({
        CAS_ID_PK: Number(id),
        TSK_DATE: theDate ? theDate : undefined,
        EMP_ID_PK: employee ? employee : undefined,
        TSK_TYPE_ID_PK: type
          ? theTaskTypeCompo?.find((ele) => ele?.TSK_TYPE_NAME == type)
              ?.TSK_TYPE_ID_PK
          : undefined,
        TSK_DURATION: workDuration ? Number(workDuration) : undefined,
        TSK_FROM: durationFrom
          ? theTimeDurationFrom
              .slice(0, 5)
              .concat(" ")
              .concat(theTimeDurationFrom.slice(9))
          : undefined,
        TSK_TO: durationTo
          ? theTimeDurationTo
              .slice(0, 5)
              .concat(" ")
              .concat(theTimeDurationTo.slice(9))
          : undefined,
        TSK_COST: amount ? Number(amount) : undefined,
        STG_ID_PK: stageNum ? stageNum : undefined,
        SES_ID_PK: sesDate ? sesDate : undefined,
        TSK_NOTES: notes ? notes : undefined,
        TSK_NOTES_EN: undefined,
      })
    ).then((res) => {
      if (res?.payload?.res?.data?.code) {
        // console.log(res?.payload?.res?.data?.code);
        setError(res?.payload?.res?.data);
      } else {
        props.setOpenAddSnack(true);
        props.exitSelectModal();
        emptyInputsVals();
        dispatch(getTasksData({ theParams: { id: id } }));
      }
    });
  };

  const updateConsult = () => {
    // console.log(editId);
    let theTimeDurationTo =
      durationTo && new Date(durationTo).toLocaleTimeString();
    if (theTimeDurationTo) {
      if (theTimeDurationTo.slice(0, 2).includes(":")) {
        theTimeDurationTo = `0${theTimeDurationTo}`;
      }
    }
    let theTimeDurationFrom =
      durationFrom && new Date(durationFrom).toLocaleTimeString();
    if (theTimeDurationFrom) {
      if (theTimeDurationFrom.slice(0, 2).includes(":")) {
        theTimeDurationFrom = `0${theTimeDurationFrom}`;
      }
    }

    dispatch(
      updateTasks({
        data: {
          CAS_ID_PK: Number(id),
          TSK_DATE: theDate ? theDate : undefined,
          EMP_ID_PK: employee ? employee : undefined,
          TSK_TYPE_ID_PK: type
            ? theTaskTypeCompo?.find((ele) => ele?.TSK_TYPE_NAME == type)
                ?.TSK_TYPE_ID_PK
            : undefined,
          TSK_DURATION: workDuration ? Number(workDuration) : undefined,
          TSK_FROM: durationFrom
            ? theTimeDurationFrom
                .slice(0, 5)
                .concat(" ")
                .concat(theTimeDurationFrom.slice(9))
            : undefined,
          TSK_TO: durationTo
            ? theTimeDurationTo
                .slice(0, 5)
                .concat(" ")
                .concat(theTimeDurationTo.slice(9))
            : undefined,
          TSK_COST: amount ? Number(amount) : undefined,
          STG_ID_PK: stageNum ? stageNum : undefined,
          SES_ID_PK: sesDate ? sesDate : undefined,
          TSK_NOTES: notes ? notes : undefined,
          TSK_NOTES_EN: undefined,
        },
        id: props.editCriterai?.TSK_ID_PK,
      })
    ).then((res) => {
      console.log(res.payload);
      if (res?.payload?.res?.data?.code) {
        // console.log(res?.payload?.res?.data?.code)
        setError(res?.payload?.res?.data);
      } else {
        props.setOpenAddSnack(true);
        props.setOpenEditSnack(true);
        props.exitSelectModal();
        emptyInputsVals();
        dispatch(getTasksData({ theParams: { id: id } }));
      }
    });
  };

  const handelChangeStage = useCallback(
    (e) => {
      setStageNum(e.target.value);
      dispatch(
        getSessionData({ theParams: { id: id, stgNumSearch: e.target.value } })
      );
    },
    [stageNum]
  );
  const handleChangeType = (e, value) => {
    setType(value);
    theTaskTypeCompo.map((ele) => {
      if (ele.TSK_TYPE_NAME == value && ele.TSK_TYPE_PRICE) {
        setAmount(ele.TSK_TYPE_PRICE);
      } else {
        setAmount("");
      }
    });
  };

  const handelAddAttachment = (id) => {
    // console.log(id);
    setConstantAdd(2);
    setAttacmentId(id);
  };
  const handleDeleteAttachment = (id, criteriaId) => {
    // console.log(id);
    setVisibleDeleteModal(true);
    setDeleteAttacmentId(id);
    setCriteriaForDeletedAttached(criteriaId);
  };

  const deleteTheAttachment = () => {
    dispatch(
      deleteAttachment({
        id: criteriaForDeletedAttached,
        deletedId: deleteAttacmentId,
      })
    ).then((res) => {
      if (res?.payload?.res?.status == 200) {
        props.setOpenDelSnack(true);
        setVisibleDeleteModal(false);
        dispatch(getTasksAttachment(criteriaForDeletedAttached)).then((res) =>
          setAttachment(res.payload)
        );
        setAttacmentId("");
      } else {
        props.setOpenAttachedSnack(true);
      }
    });
  };
  return (
    <div>
      <CModal
        visible={true}
        onClose={() => props.exitSelectModal()}
        className={`task-modal ${
          document.body.getAttribute("dir") == "ltr" ? "enTextLeftPopup" : null
        }`}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon
              style={{ height: "20px" }}
              icon={cilSpreadsheet}
              customClassName="nav-icon"
            />
            {props.editCriterai || props.selectedCriteria ? (
              <span>
                {translation("fileNum")}{" "}
                {props.selectedCriteria?.CAS_NUMBER ||
                  props.editCriterai?.CAS_NUMBER}
              </span>
            ) : (
              <span>{translation("add")} </span>
            )}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* {console.log(allAppiontments,sortAppiontment ,)} */}
          <CRow>
            <CCol md={6}>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {" "}
                  {translation("stageNum")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {props.selectedCriteria?.STG_NUMBER
                      ? props.selectedCriteria?.STG_NUMBER
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={handelChangeStage}
                      value={stageNum}
                      // error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
                    >
                      {theAllStages?.data?.map((ele) => (
                        <MenuItem
                          value={ele.STG_ID_PK}
                          key={Math.random() + ele.STG_ID_PK}
                        >
                          {ele.STG_NUMBER}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
                  </FormControl>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {" "}
                  {translation("sessionDate")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p style={{ width: "45%" }}>
                    {props.selectedCriteria.SES_DATE
                      ? new Date(
                          props.selectedCriteria?.SES_DATE
                        ).toLocaleDateString()
                      : translation("notFound")}
                  </p>
                ) : (
                  <>
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => setSesDate(e.target.value)}
                        value={sesDate}
                        // error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
                      >
                        {allSessions?.data?.map((ele) => (
                          <MenuItem
                            value={ele.SES_ID_PK}
                            key={Math.random() + ele.SES_ID_PK}
                          >
                            {ele.SES_DATE
                              ? new Date(ele.SES_DATE).toLocaleDateString()
                              : null}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
                    </FormControl>
                  </>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {translation("theDate")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p style={{ width: "45%" }}>
                    {props.selectedCriteria?.TSK_DATE
                      ? new Date(
                          props.selectedCriteria?.TSK_DATE
                        ).toLocaleDateString()
                      : translation("notFound")}
                  </p>
                ) : (
                  <>
                    <CFormInput
                      type="date"
                      defaultValue={theDate}
                      onChange={(e) => setTheDate(e.target.value)}
                      required
                      className={`${!theDate ? "is-invalid" : null}`}
                    />
                  </>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {" "}
                  {translation("theEmployee")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {document.body.getAttribute("dir") == "ltr" &&
                    props.selectedCriteria.EMP_NAME_ENGLISH
                      ? props.selectedCriteria.EMP_NAME_ENGLISH
                      : props.selectedCriteria.EMP_NAME
                      ? props.selectedCriteria.EMP_NAME
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e) => setEmployee(e.target.value)}
                      value={employee}
                    >
                      {allEmployee.map((ele) => (
                        <MenuItem
                          value={ele.EMP_ID_PK}
                          key={Math.random() + ele.EMP_ID_PK}
                        >
                          {document.body.getAttribute("dir") == "ltr" &&
                          ele.EMP_NAME_ENGLISH
                            ? ele.EMP_NAME_ENGLISH
                            : ele.EMP_NAME}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel
                  style={{ cursor: "pointer" }}
                  onClick={() => setConstantAdd(1)}
                >
                  {translation("taskType")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {document.body.getAttribute("dir") == "ltr" &&
                    props.selectedCriteria.TSK_TYPE_NAME_EN
                      ? props.selectedCriteria.TSK_TYPE_NAME_EN
                      : props.selectedCriteria.TSK_TYPE_NAME
                      ? props.selectedCriteria.TSK_TYPE_NAME
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth sx={{ minWidth: "100%" }}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      value={type}
                      onChange={handleChangeType}
                      options={theTaskTypeCompo?.map((option) =>
                        document.body.getAttribute("dir") == "ltr" &&
                        option.TSK_TYPE_NAME_EN
                          ? option.TSK_TYPE_NAME_EN
                          : option.TSK_TYPE_NAME
                      )}
                      renderInput={(params) => <TextField {...params} />}
                      getOptionLabel={(option) => option}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option + Math.random()}>
                            {option}
                          </li>
                        );
                      }}
                    />
                  </FormControl>
                )}
              </CCol>
            </CCol>
            <CCol md={6}>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {translation("period")}{" "}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {props.selectedCriteria.TSK_DURATION
                      ? props.selectedCriteria.TSK_DURATION
                      : translation("notFound")}
                  </p>
                ) : (
                  <TextField
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    value={workDuration}
                    onChange={(e) => setWorkDuration(e.target.value)}
                  />
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel style={{ display: "block", marginTop: "25px" }}>
                  {translation("from")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {props.selectedCriteria.TSK_FROM
                      ? props.selectedCriteria.TSK_FROM
                      : translation("notFound")}
                  </p>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={durationFrom}
                      onChange={setDurationFrom}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={
                            !durationFrom ||
                            error?.args?.find((ele) =>
                              ele?.includes("body.TSK_FROM with value Inval")
                            )
                              ? true
                              : false
                          }
                          // helperText={`${!durationFrom ? 'موعد الجلسه غير صحيح' : null}`}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel style={{ display: "block", marginTop: "25px" }}>
                  {translation("to")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {props.selectedCriteria.TSK_TO
                      ? props.selectedCriteria.TSK_TO
                      : translation("notFound")}
                  </p>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={durationTo}
                      onChange={setDurationTo}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={
                            !durationFrom ||
                            error?.args?.find((ele) =>
                              ele?.includes("body.TSK_TO with value Inval")
                            )
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel style={{ marginTop: "20px" }}>
                  {" "}
                  {translation("amount")}
                </CFormLabel>
                {props.selectedCriteria ? (
                  <p>
                    {props.selectedCriteria.TSK_COST
                      ? props.selectedCriteria.TSK_COST
                      : translation("notFound")}
                  </p>
                ) : (
                  <TextField
                    fullWidth
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                )}
              </CCol>
            </CCol>
            <hr style={{ marginTop: "20px" }} />
            {props.selectedCriteria || props.editCriterai ? (
              <CCol md={12}>
                <CFormLabel style={{ cursor: "pointer" }}>
                  {" "}
                  {translation("attachments")}
                  {props.editCriterai?.TSK_ID_PK ? (
                    <CIcon
                      size={"sm"}
                      icon={cilPlus}
                      customClassName="nav-icon"
                      style={{ height: "16px", width: "16px" }}
                      onClick={() =>
                        handelAddAttachment(props.editCriterai?.TSK_ID_PK)
                      }
                    />
                  ) : null}
                </CFormLabel>
                {props.editCriterai?._FILE > 0 ||
                props.selectedCriteria?._FILE > 0 ? (
                  <CTable bordered>
                    <AttachedHeadTable />
                    <CTableBody>
                      {attachment?.map((ele, i) => (
                        <CTableRow
                          key={i}
                          onClick={() => {
                            dispatch(
                              getTasksAttachmentData({
                                id: props.selectedCriteria?.TSK_ID_PK,
                                attachedId: ele?.ATH_ID_PK,
                                fileName: ele?.ATH_NAME,
                              })
                            ).then((res) => {
                              if (res?.payload.status == 404) {
                                // console.log(res);
                                props.setOpenAttachedSnack(true);
                              }
                            });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <CTableHeaderCell scope="row">{i}</CTableHeaderCell>
                          <CTableDataCell>{ele?.ATH_NAME}</CTableDataCell>
                          <CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
                          <CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
                          <CTableDataCell>
                            {new Date(ele?.ATH_DATE).toLocaleDateString()}
                          </CTableDataCell>
                          <CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
                          {props.editCriterai?.TSK_ID_PK ? (
                            <CTableDataCell>
                              <CButton
                                color={"danger"}
                                onClick={() =>
                                  handleDeleteAttachment(
                                    ele?.ATH_ID_PK,
                                    props.editCriterai?.TSK_ID_PK
                                  )
                                }
                              >
                                <CIcon
                                  style={{
                                    height: "16px",
                                    marginRight: "-3px",
                                  }}
                                  icon={cilTrash}
                                  customClassName="nav-icon"
                                />
                              </CButton>
                            </CTableDataCell>
                          ) : null}
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <p> {translation("notFound")} </p>
                )}
              </CCol>
            ) : (
              <p>{translation("notFound")}</p>
            )}
            <CCol md={12}>
              <CFormLabel htmlFor="inputEmail4">
                {translation("notes")}
              </CFormLabel>
              {props.selectedCriteria ? (
                <p>
                  {props.selectedCriteria?.TSK_NOTES
                    ? props.selectedCriteria?.TSK_NOTES
                    : translation("notFound")}
                </p>
              ) : (
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="4"
                  onChange={(e) => setNotes(e.target.value)}
                  defaultValue={notes}
                ></CFormTextarea>
              )}
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          {props.selectedCriteria ? null : props.editCriterai ? (
            <CButton
              className="btn-modal-save"
              color="primary"
              onClick={updateConsult}
            >
              {translation("saveChanges")}
            </CButton>
          ) : (
            <CButton
              className="btn-modal-save"
              color="primary"
              onClick={addConsult}
            >
              {translation("add")}
            </CButton>
          )}
          <CButton
            color="danger"
            className="btn-modal-close"
            onClick={() => props.exitSelectModal()}
          >
            {translation("close")}
          </CButton>
        </CModalFooter>
      </CModal>
      {visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
        <DeletePopup
          exitSelectModal={() => setVisibleDeleteModal(false)}
          handleDelete={deleteTheAttachment}
        />
      ) : null}
      {constantAdd == 1 ? (
        <TaskConstantType
          exitSelectModal={() => setConstantAdd("")}
          setOpenAddSnack={props.setOpenAddSnack}
        />
      ) : constantAdd == 2 ? (
        <AttachedPopup
          exitSelectModal={() => setConstantAdd("")}
          url={`task/${attacmentId}/attachment`}
          id={attacmentId}
          setOpenAddSnack={props.setOpenAddSnack}
          setOpenAttachedSnack={props.setOpenAttachedSnack}
          setOpenLargeAttachement={props.setOpenLargeAttachement}
          callback={() =>
            dispatch(
              getTasksAttachment(props.editCriterai?.TSK_ID_PK)
            ).then((res) => setAttachment(res.payload))
          }
        />
      ) : null}
    </div>
  );
};

export default ReturnedPopup;
