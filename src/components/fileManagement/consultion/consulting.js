import React, { useState, useRef, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
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
  CCarousel,
  CCarouselItem,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import { cilSpreadsheet, cilPlus, cilTrash, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import AttachedHeadTable from "../../../features/attachedFileHaed";
import {
  updateConsultions,
  deleteConsultions,
  addNewConsultions,
  getConsultionsById,
  getConsultionsData,
  deleteAttachment,
  getConsultionsAttachment,
  getConsultionsAttachmentData,
} from "../../../store/reducers/consultions";
import { getContracts } from "../../../store/reducers/contract";
import { ConsultionConstantType } from "./constantConsulting";
import { getConsultionsType } from "../../../store/reducers/constants/consultion";
import AttachedPopup from "../../../features/attachment";
import DeletePopup from "../../../features/delete";
import translation from "../../../i18n/translate";
import { convert24Hto12H } from "../../../features/convertTime";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const FileConsulting = () => {
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [classifiedName, setClassifiedName] = useState([]);
  const [searchedDiv, setSearchedDiv] = useState(null);
  const [theDate, setTheDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [type, setType] = useState("");
  const [consultNum, setConultNum] = useState("");
  const [durationFrom, setDurationFrom] = useState(undefined);
  const [durationTo, setDurationTo] = useState(undefined);
  const [amount, setAmount] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [editCriterai, setEditCriterai] = useState(null);
  const [attached, setAttached] = useState([]);
  const [conultCheck, setConultCheck] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [contractCheck, setContractCheck] = useState(false);
  const [openAddSnack, setOpenAddSnack] = useState(false);
  const [OpenEditSnack, setOpenEditSnack] = useState(false);
  const [openDelSnack, setOpenDelSnack] = useState(false);
  const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
  const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
  const [constantAdd, setConstantAdd] = useState("");
  const [consultCheck, setConsultCheck] = useState("consult");
  const [checkedAmountFree, setCheckedAmountFree] = useState(false);
  const [contractType, setContractType] = useState("");
  const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
  const [deleteAttacmentId, setDeleteAttacmentId] = useState("");
  const [attacmentId, setAttacmentId] = useState("");
  const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] =
    useState(false);
  const [brief, setBrief] = useState("");
  const [briefEn, setBriefEn] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectEn, setSubjectEn] = useState("");
  const [attachment, setAttachment] = useState("");
  const { allEmployee } = useSelector((state) => state.employee);
  const { allConsultions } = useSelector((state) => state.Consultion);
  const { allContrcts } = useSelector((state) => state.contract);
  const { theConsultionsTypeCompo } = useSelector(
    (state) => state.ConsultionsConstants
  );
  const [error, setError] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { formatMessage } = useIntl();

  useEffect(() => {
    dispatch(getConsultionsData({ theParams: { id: id } }));
    dispatch(getContracts({ theParams: null }));
    dispatch(getConsultionsType());
  }, []);

  // for snack alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const exitSelectModal = () => {
    setSelectedCriteria(null);
    setEditCriterai(null);
    setVisible(false);
  };
  // close snack alert
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAddSnack(false);
    setOpenEditSnack(false);
    setOpenDelSnack(false);
    setOpenDelErrorSnack(false);
    setOpenErrorSnack(false);
  };
  const showData = (id) => {
    setEditCriterai(null);
    dispatch(getConsultionsById(id))
      .then((res) => {
        setSelectedCriteria(res.payload);
        dispatch(getConsultionsAttachment(id));
      })
      .then((res) => setAttachment(res?.payload))
      .then(() => setVisible(true));
  };
  const emptyInputsVals = () => {
    setTheDate("");
    setEmployee("");
    setType("");
    setConultNum("");
    setDurationFrom(undefined);
    setDurationTo(undefined);
    setAmount("");
    setBrief("");
    setBriefEn("");
    setSubject("");
    setSubjectEn("");
  };
  const openAddPopup = () => {
    emptyInputsVals();
    setSelectedCriteria(null);
    setEditCriterai(null);
    setVisible(true);
    setOpenDelSnack(false);
    setOpenDelErrorSnack(false);
    setOpenEditSnack(false);
    setOpenAddSnack(false);
    setOpenAttachedSnack(false);
  };
  const addConsult = () => {
    dispatch(
      addNewConsultions({
        CAS_ID_PK: Number(id),
        CON_NUMBER: consultNum ? consultNum : undefined,
        CON_DATE: theDate ? theDate : undefined,
        CON_TYPE_ID_PK: type
          ? theConsultionsTypeCompo.find(
              (ele) => ele.CON_TYPE_NAME || ele.CON_TYPE_NAME_EN == type
            )?.CON_TYPE_ID_PK
          : undefined,
        CON_SUBJECT: subject ? subject : undefined,
        CON_SUBJECT_EN: subjectEn ? subjectEn : undefined,
        CON_DESCRIPTION: brief ? brief : undefined,
        CON_DESCRIPTION_EN: briefEn ? briefEn : undefined,
        CON_COST: amount ? Number(amount) : undefined,
        CON_TIME_FROM: durationFrom ? convert24Hto12H(durationFrom) : undefined,
        CON_TIME_TO: durationTo ? convert24Hto12H(durationTo) : undefined,
        CON_KIND: consultCheck == "consult" ? 1 : 0,
        EMP_ID_PK: employee ? employee : undefined,
        COR_ID_PK: contractType ? contractType : undefined,
      })
    ).then((res) => {
      // console.log('res: ', res);
      if (res?.payload.res.data?.code) {
        // console.log(res?.payload?.result);
        setError(res?.payload?.result);
      } else {
        setVisible(false);
        setOpenAddSnack(true);
        emptyInputsVals();
        dispatch(getConsultionsData({ theParams: { id: id } }));
      }
    });
  };
  const openUpdateModal = (id) => {
    setOpenDelSnack(false);
    setOpenDelErrorSnack(false);
    setOpenEditSnack(false);
    setOpenAddSnack(false);
    setOpenAttachedSnack(false);
    dispatch(getConsultionsAttachment(id)).then((res) =>
      setAttachment(res?.payload)
    );
    dispatch(getConsultionsById(id))
      .then((res) => {
        setEditCriterai(res.payload);
        dispatch(getConsultionsAttachment(id));
        setTheDate(
          res.payload.CON_DATE
            ? new Date(res.payload.CON_DATE).toISOString().split("T")[0]
            : null
        );
        setEmployee(
          res.payload.EMP_NAME
            ? allEmployee.find((ele) =>
                document.body.getAttribute("dir") == "ltr" &&
                ele.EMP_NAME_ENGLISH
                  ? ele.EMP_NAME_ENGLISH == res.payload.EMP_NAME_ENGLISH
                  : ele.EMP_NAME == res.payload.EMP_NAME
              )?.EMP_ID_PK
            : null
        );
        setType(
          document.body.getAttribute("dir") == "ltr" &&
            res.payload.CON_TYPE_NAME_EN
            ? res.payload.CON_TYPE_NAME_EN
            : res.payload.CON_TYPE_NAME
        );
        setConultNum(res.payload.CON_NUMBER);
        setDurationFrom(
          res.payload.CON_TIME_FROM
            ? `2014-08-18T${res.payload?.CON_TIME_FROM?.split("T")[1].slice(
                0,
                5
              )}:00`
            : ""
        );
        setDurationTo(
          res.payload.CON_TIME_TO
            ? `2014-08-18T${res.payload?.CON_TIME_TO?.split("T")[1].slice(
                0,
                5
              )}:00`
            : ""
        );
        setAmount(res.payload.CON_COST);
        setBrief(res.payload.CON_DESCRIPTION);
        setBriefEn(res.payload.CON_DESCRIPTION_EN);
        setSubject(res.payload.CON_SUBJECT);
        setSubjectEn(res.payload.CON_SUBJECT_EN);
      })
      .then(() => setVisible(true));
  };
  const updateConsult = (editId) => {
    console.log(consultCheck, type, editId, {
      CAS_ID_PK: Number(id),
      CON_NUMBER: consultNum ? consultNum : undefined,
      CON_DATE: theDate ? theDate : undefined,
      CON_TYPE_ID_PK: type
        ? theConsultionsTypeCompo.find(
            (ele) => ele.CON_TYPE_NAME || ele.CON_TYPE_NAME_EN == type
          )?.CON_TYPE_ID_PK
        : undefined,
      CON_SUBJECT: subject ? subject : undefined,
      CON_SUBJECT_EN: subjectEn ? subjectEn : undefined,
      CON_DESCRIPTION: brief ? brief : undefined,
      CON_DESCRIPTION_EN: briefEn ? briefEn : undefined,
      CON_COST: amount ? Number(amount) : undefined,
      CON_TIME_FROM: durationFrom ? convert24Hto12H(durationFrom) : undefined,
      CON_TIME_TO: durationTo ? convert24Hto12H(durationTo) : undefined,
      CON_KIND: consultCheck == "consult" ? 1 : 0,
      EMP_ID_PK: employee ? employee : undefined,
      COR_ID_PK:
        consultCheck == "contract" && contractType ? contractType : undefined,
    });
    dispatch(
      updateConsultions({
        id: Number(editId),
        data: {
          CAS_ID_PK: Number(id),
          CON_NUMBER: consultNum ? consultNum : undefined,
          CON_DATE: theDate ? theDate : undefined,
          CON_TYPE_ID_PK:
            consultCheck == "consult" && type
              ? theConsultionsTypeCompo.find((ele) => ele.CON_TYPE_NAME == type)
                  ?.CON_TYPE_ID_PK
              : undefined,
          CON_SUBJECT: subject ? subject : undefined,
          CON_SUBJECT_EN: "{{$randomLoremSentence}}",
          CON_DESCRIPTION: brief ? brief : undefined,
          CON_DESCRIPTION_EN: "{{$randomLoremSentence}}",
          CON_COST: amount ? Number(amount) : undefined,
          CON_TIME_FROM: durationFrom
            ? new Date(durationFrom).toLocaleTimeString()
            : undefined,
          CON_TIME_TO: durationTo
            ? new Date(durationTo).toLocaleTimeString()
            : undefined,
          CON_KIND: consultCheck == "consult" ? 1 : 0,
          EMP_ID_PK: employee ? employee : undefined,
          COR_ID_PK:
            consultCheck == "contract" && contractType
              ? contractType
              : undefined,
        },
      })
    ).then((res) => {
      // console.log(res);
      if (res?.payload.res.data?.code) {
        setError(res?.payload?.result);
        setOpenErrorSnack(true);
      } else {
        setOpenAddSnack(true);
        setVisible(false);
        setOpenEditSnack(true);
        emptyInputsVals();
        dispatch(getConsultionsData({ theParams: { id: id } }));
      }
    });
  };
  const handledeleteTheConsultion = (id) => {
    setDeletedItemId(id);
    setVisibleDeleteModal(true);
  };
  //delete deleteTheConsultion
  const deleteTheConsultion = () => {
    console.log(id);
    dispatch(deleteConsultions(deletedItemId)).then((res) => {
      if (res?.payload.result?.status == 200) {
        setOpenDelSnack(true);
        setVisibleDeleteModal(false);
      } else {
        setOpenDelErrorSnack(true);
      }
    });
  };

  const handelNextSlide = (active, dir) => {
    // console.log(active, dir);
    if (dir == "next" && active == 0) {
      // document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.setAttribute('id', 'carousel-control-next');
      document
        .querySelectorAll(".consultion-modal .carousel-control-next")[0]
        ?.setAttribute("disabled", true);
      document
        .querySelectorAll(".consultion-modal .carousel-control-prev")[0]
        ?.removeAttribute("disabled");
    } else if (dir == "prev" && active == 1) {
      document
        .querySelectorAll(".consultion-modal .carousel-control-prev")[0]
        ?.setAttribute("disabled", true);
      document
        .querySelectorAll(".consultion-modal .carousel-control-next")[0]
        ?.removeAttribute("disabled");
    }
  };
  const handelAddAttachment = (id) => {
    // console.log(id);
    setConstantAdd(4);
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
        setOpenDelSnack(true);
        setVisibleDeleteModal(false);
        dispatch(getConsultionsAttachment(criteriaForDeletedAttached)).then(
          (res) => setAttachment(res.payload)
        );
        setAttacmentId("");
      } else {
        setOpenAttachedSnack(true);
      }
    });
  };

  //  modal
  let ReturnedPopup = null;
  ReturnedPopup = () => (
    <CModal
      visible={visible}
      onClose={() => exitSelectModal()}
      className={`appiontment-modal consultion-modal ${
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
          {editCriterai || selectedCriteria ? (
            <span>
              {translation("fileNum")}{" "}
              {selectedCriteria?.CAS_NUMBER || editCriterai?.CAS_NUMBER}
            </span>
          ) : (
            <span>{translation("add")} </span>
          )}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* {console.log(allAppiontments,sortAppiontment ,)} */}
        <CCarousel
          controls
          interval={false}
          wrap={false}
          onSlide={handelNextSlide}
        >
          <CCarouselItem>
            <CRow>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">
                  {translation("number")}
                </CFormLabel>
                {selectedCriteria ? (
                  <p>
                    {selectedCriteria.CON_NUMBER
                      ? selectedCriteria.CON_NUMBER
                      : translation("notFound")}
                  </p>
                ) : (
                  <CFormInput
                    type="number"
                    defaultValue={consultNum}
                    onChange={(e) => setConultNum(e.target.value)}
                    required
                    className={`${!consultNum ? "is-invalid" : null}`}
                  />
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel>{translation("theDate")}</CFormLabel>
                {selectedCriteria ? (
                  <p style={{ width: "45%" }}>
                    {selectedCriteria
                      ? new Date(
                          selectedCriteria?.CON_DATE
                        ).toLocaleDateString()
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth>
                    <CFormInput
                      type="date"
                      id="inputEmail4"
                      value={
                        editCriterai
                          ? new Date(editCriterai?.CON_DATE)
                              .toISOString()
                              .split("T")[0]
                          : theDate
                      }
                      onChange={(e) => setTheDate(e.target.value)}
                    />
                  </FormControl>
                )}
              </CCol>
              <CCol md={12}>
                <FormControl>
                  <RadioGroup
                    row
                    value={consultCheck}
                    onChange={(event) => setConsultCheck(event.target.value)}
                  >
                    <CFormLabel style={{ display: "inline-block" }}>
                      {translation("con")}
                    </CFormLabel>
                    <FormControlLabel value="consult" control={<Radio />} />
                    <CFormLabel style={{ marginRight: "20px" }}>
                      {translation("contract")}
                    </CFormLabel>
                    <FormControlLabel value="contract" control={<Radio />} />
                  </RadioGroup>
                </FormControl>
                <hr />
              </CCol>
              {consultCheck == "contract" && (
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {translation("contractNum")}
                  </CFormLabel>
                  {selectedCriteria ? (
                    <p>
                      {selectedCriteria.COR_NUMBER
                        ? selectedCriteria.COR_NUMBER
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        error={
                          error?.args?.filter(
                            (ele) => ele == "body.COR_ID_PK is required"
                          )
                            ? true
                            : false
                        }
                      >
                        {allContrcts.data?.map((ele) => (
                          <MenuItem
                            value={ele.COR_ID_PK}
                            key={Math.random() + ele.COR_ID_PK}
                          >
                            {ele.COR_ID_PK}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
                    </FormControl>
                  )}
                </CCol>
              )}
              {consultCheck == "consult" && (
                <>
                  <CCol md={6}>
                    <CFormLabel
                      style={{ cursor: "pointer" }}
                      onClick={() => setConstantAdd(1)}
                    >
                      {translation("type")}
                    </CFormLabel>
                    {selectedCriteria ? (
                      <p>
                        {document.body.getAttribute("dir") == "ltr" &&
                        selectedCriteria.CON_TYPE_NAME_EN
                          ? selectedCriteria.CON_TYPE_NAME_EN
                          : selectedCriteria.CON_TYPE_NAME
                          ? selectedCriteria.CON_TYPE_NAME
                          : translation("notFound")}
                      </p>
                    ) : (
                      <FormControl fullWidth>
                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          value={type}
                          onChange={(e, value) => setType(value)}
                          options={theConsultionsTypeCompo.map((option) =>
                            document.body.getAttribute("dir") == "ltr" &&
                            option.CON_TYPE_NAME_EN
                              ? option.CON_TYPE_NAME_EN
                              : option.CON_TYPE_NAME
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={type?.length > 0 ? false : true}
                              // helperText="required"
                            />
                          )}
                          getOptionLabel={(option) => option || ""}
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
                  <CCol md={3} sm={6}>
                    <CFormLabel style={{ marginBottom: "2px" }}>
                      {" "}
                      {translation("theValue")}
                    </CFormLabel>
                    {selectedCriteria ? (
                      <p>
                        {selectedCriteria.CON_COST
                          ? selectedCriteria.CON_COST
                          : translation("notFound")}
                      </p>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <FormControl sx={{ m: 1, minWidth: `calc(100%)` }}>
                          <TextField
                            disabled={checkedAmountFree}
                            fullWidth
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            defaultValue={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </FormControl>
                        <Checkbox
                          {...label}
                          checked={checkedAmountFree}
                          // style={{marginTop: '-40px'}}
                          sx={{
                            color: "#4527a0",
                            "&.Mui-checked": {
                              color: "#5e35b1",
                            },
                          }}
                          onChange={(e) =>
                            setCheckedAmountFree(e.target.checked)
                          }
                        />
                        <CFormLabel
                          htmlFor="inputEmail4"
                          style={{ marginTop: "10px" }}
                        >
                          {translation("free")}
                        </CFormLabel>
                      </div>
                    )}
                  </CCol>
                </>
              )}
              <hr style={{ marginTop: "20px" }} />
              <CCol sm={6}>
                <CFormLabel htmlFor="inputEmail4" style={{ display: "block" }}>
                  {translation("from")}
                </CFormLabel>
                {selectedCriteria ? (
                  <p>
                    {selectedCriteria.CON_TIME_FROM
                      ? selectedCriteria.CON_TIME_FROM.split("T")[1].slice(0, 5)
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      fullWidth
                    >
                      <TimePicker
                        value={durationFrom}
                        onChange={setDurationFrom}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                )}
              </CCol>
              <CCol sm={6}>
                <CFormLabel style={{ display: "block" }}>
                  {translation("to")}
                </CFormLabel>
                {selectedCriteria ? (
                  <p>
                    {selectedCriteria.CON_TIME_TO
                      ? selectedCriteria.CON_TIME_TO.split("T")[1].slice(0, 5)
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      fullWidth
                    >
                      <TimePicker
                        value={durationTo}
                        onChange={setDurationTo}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel style={{ marginTop: "30px" }}>
                  {" "}
                  {translation("theEmployee")}
                </CFormLabel>
                {selectedCriteria ? (
                  <p>
                    {selectedCriteria.EMP_NAME
                      ? selectedCriteria.EMP_NAME
                      : translation("notFound")}
                  </p>
                ) : (
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={(e) => setEmployee(e.target.value)}
                      value={employee}
                      error={
                        error?.args?.filter(
                          (ele) => ele == "body.EMP_ID_PK is required"
                        )
                          ? true
                          : false
                      }
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
                    {/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
                  </FormControl>
                )}
              </CCol>
            </CRow>
          </CCarouselItem>
          <CCarouselItem>
            <CRow>
              <CCol md={12}>
                <CFormLabel> {translation("notes")}</CFormLabel>

                {!selectedCriteria ? (
                  <CFormTextarea
                    rows={6}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                  />
                ) : (
                  <p>
                    {selectedCriteria
                      ? selectedCriteria.CON_DESCRIPTION
                      : translation("notFound")}
                  </p>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel> {translation("notesEn")}</CFormLabel>

                {!selectedCriteria ? (
                  <CFormTextarea
                    rows={6}
                    value={briefEn}
                    onChange={(e) => setBriefEn(e.target.value)}
                  />
                ) : (
                  <p>
                    {selectedCriteria
                      ? selectedCriteria.CON_DESCRIPTION_EN
                      : translation("notFound")}
                  </p>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {" "}
                  {translation("subject")}
                </CFormLabel>

                {!selectedCriteria ? (
                  <CFormTextarea
                    rows={6}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                ) : (
                  <p>
                    {selectedCriteria
                      ? selectedCriteria.CON_SUBJECT
                      : translation("notFound")}
                  </p>
                )}
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="inputEmail4">
                  {" "}
                  {translation("subjectEn")}
                </CFormLabel>

                {!selectedCriteria ? (
                  <CFormTextarea
                    rows={6}
                    value={subjectEn}
                    onChange={(e) => setSubjectEn(e.target.value)}
                  />
                ) : (
                  <p>
                    {selectedCriteria
                      ? selectedCriteria.CON_SUBJECT
                      : translation("notFound")}
                  </p>
                )}
              </CCol>
              <CCol md={12}>
                {selectedCriteria || editCriterai ? (
                  <CFormLabel
                    style={{ cursor: "pointer" }}
                    onClick={() => setConstantAdd(2)}
                  >
                    {translation("attachments")}
                    {editCriterai?.CON_ID_PK ? (
                      <CIcon
                        size={"sm"}
                        icon={cilPlus}
                        customClassName="nav-icon"
                        style={{ height: "16px", width: "16px" }}
                        onClick={() =>
                          handelAddAttachment(editCriterai?.CON_ID_PK)
                        }
                      />
                    ) : null}
                  </CFormLabel>
                ) : null}
                {selectedCriteria || editCriterai ? (
                  selectedCriteria?._FILE > 0 || editCriterai?._FILE > 0 ? (
                    <CTable bordered>
                      <AttachedHeadTable />
                      <CTableBody>
                        {attachment?.map((ele, i) => (
                          <CTableRow key={i}>
                            <CTableHeaderCell scope="row">{i}</CTableHeaderCell>
                            <CTableDataCell
                              onClick={() => {
                                dispatch(
                                  getConsultionsAttachmentData({
                                    id:
                                      selectedCriteria?.CON_ID_PK ||
                                      editCriterai?.CON_ID_PK,
                                    attachedId: ele?.ATH_ID_PK,
                                    fileName: ele?.ATH_NAME,
                                  })
                                ).then((res) => {
                                  if (res?.payload.status == 404) {
                                    // console.log(res);
                                    setOpenAttachedSnack(true);
                                  }
                                });
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {ele?.ATH_NAME}
                            </CTableDataCell>
                            <CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
                            <CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
                            <CTableDataCell>
                              {new Date(ele?.ATH_DATE).toLocaleDateString()}
                            </CTableDataCell>
                            <CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
                            {editCriterai?.CON_ID_PK ? (
                              <CTableDataCell>
                                <CButton
                                  color={"danger"}
                                  onClick={() =>
                                    handleDeleteAttachment(
                                      ele?.ATH_ID_PK,
                                      editCriterai?.CON_ID_PK
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
                    <p>{translation("notFound")}</p>
                  )
                ) : null}
              </CCol>
            </CRow>
          </CCarouselItem>
        </CCarousel>
      </CModalBody>
      <CModalFooter>
        {selectedCriteria ? null : editCriterai ? (
          <CButton
            className="btn-modal-save"
            color="primary"
            onClick={() => updateConsult(editCriterai?.CON_ID_PK)}
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
          onClick={() => exitSelectModal()}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );

  const searchByChar = (e) => {
    console.log(e.target.value);
    setSearchVal(e.target.value);
    if (!e.target.value) {
      setSearchedDiv(null);
      setSearchedDiv(allConsultions?.data);
    } else {
      const newClassifiedArr = allConsultions.data?.filter(
        (ele) =>
          ele &&
          Object.values(ele).find((ele2) =>
            typeof ele2 == "string" || typeof ele2 == "object"
              ? ele2?.includes(e.target.value)
              : ele2.toString()?.includes(e.target.value)
          )
      );
      setSearchedDiv(newClassifiedArr);
    }
  };

  const classifiedFun = () => {
    // dispatch(
    // 	getWarningsData({
    // 		theParams: {
    // 			warNumSearch: warNumSearch ? warNumSearch : undefined,
    // 			warSearchDateFrom: warSearchDateFrom ? warSearchDateFrom : undefined,
    // 			warSearchDateTo: warSearchDateTo ? warSearchDateTo : undefined,
    // 			searchVal: searchVal ? searchVal : undefined,
    // 			id: id ? id : undefined,
    // 		},
    // 	})
    // );
  };

  const handelSearchbtn = (e) => {
    if (e.key === "Enter") {
      classifiedFun();
    }
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassifiedName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const consultData = allConsultions.data?.map((ele, i) => ({
    id: <span onClick={() => showData(ele.CON_ID_PK)}>{i + 1}</span>,
    numberConsult: (
      <span onClick={() => showData(ele.CON_ID_PK)}>{ele?.CON_NUMBER} </span>
    ),
    date: (
      <span onClick={() => showData(ele.CON_ID_PK)}>
        {ele?.CON_DATE ? new Date(ele?.CON_DATE).toLocaleDateString() : null}
      </span>
    ),
    type: (
      <span onClick={() => showData(ele.CON_ID_PK)}>
        {document.body.getAttribute("dir") == "ltr" && ele.CON_TYPE_NAME_EN
          ? ele.CON_TYPE_NAME_EN
          : ele.CON_TYPE_NAME}{" "}
      </span>
    ),
    // subject:(<span onClick={()=>showData(ele.CON_ID_PK)}> "tgFGJUKUHUJKIHFUHR"</span>),
    // brief:(<span onClick={()=>showData(ele.CON_ID_PK)}> "gdjnks"</span>),
    // period: <span onClick={()=>showData(ele.CON_ID_PK)}> '40 '</span>,
    theAmount: (
      <span onClick={() => showData(ele.CON_ID_PK)}> {ele.CON_COST} </span>
    ),
    fromWhen: (
      <span onClick={() => showData(ele.CON_ID_PK)}>
        {ele.CON_TIME_FROM
          ? ele.CON_TIME_FROM?.split("T")[1]?.slice(0, 5)
          : null}
      </span>
    ),
    toWhen: (
      <span onClick={() => showData(ele.CON_ID_PK)}>
        {ele.CON_TIME_TO ? ele.CON_TIME_TO?.split("T")[1]?.slice(0, 5) : null}
      </span>
    ),
    contractNum: (
      <span onClick={() => showData(ele.CON_ID_PK)}>{ele.COR_NUMBER}</span>
    ),
    elmoklaf: (
      <span onClick={() => showData(ele.CON_ID_PK)}>
        {document.body.getAttribute("dir") == "ltr" && ele?.EMP_NAME_ENGLISH
          ? ele?.EMP_NAME_ENGLISH
          : ele?.EMP_NAME}{" "}
      </span>
    ),
    // attachment:(<span onClick={()=>showData(ele.CON_ID_PK)}> 0</span>),
    DeletEdit: (
      <p>
        <CButton style={{ background: "#1e42a0 !important" }}>
          <CIcon
            onClick={() => openUpdateModal(ele?.CON_ID_PK)}
            style={{ height: "16px", marginRight: "-3px" }}
            icon={cilPencil}
            customClassName="nav-icon"
          />
        </CButton>
        <CButton color={"danger"}>
          <CIcon
            onClick={() => handledeleteTheConsultion(ele?.CON_ID_PK)}
            style={{ height: "16px", marginRight: "-3px" }}
            icon={cilTrash}
            customClassName="nav-icon"
          />
        </CButton>
      </p>
    ),
  }));
  const datatable = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: formatMessage({ id: "conNum" }),
        field: "numberConsult",
        sort: "asc",
        width: 150,
      },
      {
        label: formatMessage({ id: "theDate" }),
        field: "date",
        sort: "asc",
        width: 200,
      },
      {
        label: formatMessage({ id: "conType" }),
        field: "type",
        sort: "asc",
        width: 150,
      },
      // {
      //     label: ' الموضوع   ',
      //     field: 'subject',
      //     sort: 'asc',
      //     width: 100
      // },
      // {
      //     label: 'الملخص',
      //     field: 'brief',
      //     sort: '',
      //     width: 100
      // },
      {
        label: formatMessage({ id: "amount" }),
        field: "theAmount",
        sort: "asc",
        width: 100,
      },
      {
        label: formatMessage({ id: "from" }),
        field: "fromWhen",
        sort: "asc",
        width: 100,
      },
      {
        label: formatMessage({ id: "to" }),
        field: "toWhen",
        sort: "",
        width: 100,
      },
      {
        label: formatMessage({ id: "contractNum" }),
        field: "contractNum",
        sort: "",
        width: 100,
      },
      {
        label: formatMessage({ id: "theEmployee" }),
        field: "elmoklaf",
        sort: "",
        width: 100,
      },
      // {
      //     label: 'مرفقات',
      //     field: 'attachment',
      //     sort: '',
      //     width: 100
      // }
      {
        label: "",
        field: "DeletEdit",
        sort: "",
        width: 80,
      },
    ],
    rows: consultData,
  };
  return (
    <div className="file-alerts consulting box">
      <div className="headerFiles">
        <div>
          <CButton onClick={openAddPopup} className="add-contact">
            <CIcon
              style={{ height: "25px" }}
              className="icon"
              customClassName="nav-icon"
              icon={cilPlus}
            />
          </CButton>
          {/* <FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
						<Select
							multiple
							displayEmpty
							value={classifiedName}
							onChange={handleChange}
							input={<OutlinedInput />}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return <span>{translation('classification')}</span>;
								}

								return selected.join(', ');
							}}
							MenuProps={MenuProps}
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem disabled value="">
							</MenuItem>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, classifiedName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl> */}
        </div>
        <div className="search">
          <CFormInput
            type="text"
            value={searchVal}
            onChange={(e) => searchByChar(e)}
            placeholder={`${formatMessage({ id: "search" })}...`}
            onKeyDown={(e) => handelSearchbtn(e)}
          />
        </div>
      </div>
      <MDBDataTable
        striped
        // bordered
        responsive
        //   scrollX
        //   scrollY
        small
        data={datatable}
        searching={true}
      />
      {selectedCriteria
        ? ReturnedPopup(selectedCriteria)
        : !selectedCriteria && editCriterai
        ? ReturnedPopup(editCriterai)
        : !editCriterai && !selectedCriteria && visible
        ? ReturnedPopup()
        : null}
      {constantAdd == 1 ? (
        <ConsultionConstantType
          setOpenAddSnack={setOpenAddSnack}
          exitSelectModal={() => setConstantAdd("")}
        />
      ) : constantAdd == 2 ? (
        <AttachedPopup
          exitSelectModal={() => setConstantAdd("")}
          url={`consultation/${attacmentId}/attachment`}
          id={attacmentId}
          setOpenAddSnack={setOpenAddSnack}
          setOpenAttachedSnack={setOpenAttachedSnack}
          setOpenLargeAttachement={setOpenLargeAttachement}
          callback={() =>
            dispatch(getConsultionsAttachment(editCriterai?.CON_ID_PK)).then(
              (res) => setAttachment(res.payload)
            )
          }
        />
      ) : null}
      {visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
        <DeletePopup
          exitSelectModal={() => setVisibleDeleteModal(false)}
          handleDelete={deleteTheAttachment}
        />
      ) : visibleDeleteModal &&
        !criteriaForDeletedAttached &&
        !deleteAttacmentId ? (
        <DeletePopup
          exitSelectModal={() => setVisibleDeleteModal(false)}
          handleDelete={deleteTheConsultion}
        />
      ) : null}
      {openAddSnack ||
      openDelSnack ||
      openDelErrorSnack ||
      openAttachedSnack ||
      openErrorSnack ? (
        <Snackbar
          open={
            openAddSnack ||
            openDelSnack ||
            openDelErrorSnack ||
            openAttachedSnack ||
            openErrorSnack
          }
          autoHideDuration={2000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={`${
              openDelSnack || openDelErrorSnack || openErrorSnack
                ? "error"
                : "success"
            }`}
            sx={{ width: "100%" }}
          >
            {OpenEditSnack
              ? translation("itemUpdated")
              : openDelSnack
              ? translation("itemDeleted")
              : openDelErrorSnack
              ? translation("alreadyUSed")
              : openAttachedSnack
              ? translation("error")
              : openLargeAttachement
              ? formatMessage({ id: "largeAttachment" })
              : openErrorSnack
              ? translation("error")
              : translation("itemAdded")}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default React.memo(FileConsulting);
