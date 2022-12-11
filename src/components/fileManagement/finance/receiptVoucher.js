import React, { useState, useRef, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import {
  CRow,
  CCol,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CButton,
  CFormInput,
  CTable,CTableBody,CTableRow,
  CFormTextarea,
  CTableDataCell,
  CTableHeaderCell,
  CCarousel,
  CCarouselItem,
} from "@coreui/react";
import { useParams } from "react-router-dom";
import { cilSpreadsheet, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useIntl } from "react-intl";

import { getAllStages } from "../../../store/reducers/stage";
import {
  getVoucherType,
  getVoucherReason,
  getVoucherStatus,
  getTheBank,
} from "../../../store/reducers/constants/voucher";
import {
  VoucherConstantType,
  VoucherConstantReason,
  VoucherConstantStatus,
  AddBank,
} from "./voucherConstant";
import { getAllInvoices } from "../../../store/reducers/invoice";
import {
  addvoucher,
  updatevoucher,
  getvoucherAttachment,
  getvoucherAttachmentData,
  deleteAttachment,
} from "../../../store/reducers/voucher";
import AttachedHeadTable from "../../../features/attachedFileHaed";
import AttachedPopup from "../../../features/attachment";
import translation from "../../../i18n/translate";
import DeletePopup from "../../../features/delete";

// for snack alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ReceiptVoucher = (props) => {
  const [voucherType, setVoucherType] = useState("");
  const [voucherNumber, setVoucherNumber] = useState("");
  const [voucherDate, setVoucherDate] = useState("");
  const [voucherAmount, setVoucherAmount] = useState("");
  const [voucherStatus, setVoucherStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [remittanceNumber, setRemittanceNumber] = useState("");
  const [remittanceDate, setRemittanceDate] = useState("");
  const [bank, setBank] = useState("");
  const [paymentReason, setPaymentReason] = useState("");
  const [stageNumber, setStageNumber] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [settelmentNumber, setSettelmentNumber] = useState("");
  const [constantAdd, setConstantAdd] = useState("");
  const [notes, setNotes] = useState("");
  const [notesEn, setNotesEn] = useState("");
  const [allInvoices, setAllInvoices] = useState([]);
  const [attachment, setAttachment] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [openAddSnack, setOpenAddSnack] = useState(false);
  const [cliName, setCliName] = useState("");
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
  const [deleteAttacmentId, setDeleteAttacmentId] = useState("");
  const [attacmentId, setAttacmentId] = useState("");
  const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] =
    useState(false);
  const { formatMessage } = useIntl();
  const [error, setError] = useState(null);
  const { selectedCase } = useSelector((state) => state.fileManagement);
  const { allContrcts } = useSelector((state) => state.contract);
  const { theAllStages } = useSelector((state) => state.stage);
  const {
    theVoucherTypeCompo,
    theVoucherReasonCompo,
    theVoucherStatusCompo,
    theBanksArr,
  } = useSelector((state) => state.VoucherConstants);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllStages({ theparams: { id: id } }));
    dispatch(getVoucherType());
    dispatch(getAllInvoices({ theParams: { id: id } })).then((res) =>
      setAllInvoices(res.payload.data)
    );
    dispatch(getVoucherReason());
    dispatch(getVoucherStatus());
    dispatch(getTheBank());
    setCliName(selectedCase?.CLI_NAME);
    console.log("id: ", id);
    if (props.selectedCriteria) {
      dispatch(getvoucherAttachment(props.selectedCriteria.PAY_ID_PK)).then(
        (res) => setAttachment(res.payload)
      );
    }
    if (props.editCriterai) {
      dispatch(getvoucherAttachment(props.editCriterai.PAY_ID_PK)).then((res) =>
        setAttachment(res.payload)
      );
      setVoucherType(
        props.editCriterai.PAY_KIND || props.editCriterai.PAY_KIND == 0
          ? props.editCriterai.PAY_KIND
          : ""
      );
      setVoucherNumber(props.editCriterai?.PAY_NUMBER);
      setVoucherDate(
        props.editCriterai?.PAY_DATE
          ? new Date(props.editCriterai?.PAY_DATE)?.toISOString().split("T")[0]
          : ""
      );
      setVoucherAmount(
        props.editCriterai.PAY_AMOUNT ? props.editCriterai.PAY_AMOUNT : ""
      );
      setVoucherStatus(
        props.editCriterai.PAY_STATUS_ID_PK
          ? props.editCriterai.PAY_STATUS_ID_PK
          : ""
      );
      setPaymentType(props.editCriterai?.PAY_TYPE_ID_PK);
      setRemittanceNumber("");
      setRemittanceDate("");
      setBank(props.editCriterai.BNK_ID_PK ? props.editCriterai.BNK_ID_PK : "");
      setPaymentReason(
        props.editCriterai.PAY_REASON_ID_PK
          ? props.editCriterai.PAY_REASON_ID_PK
          : ""
      );
      setStageNumber(
        props.editCriterai.STG_ID_PK ? props.editCriterai.STG_ID_PK : ""
      );
      setContractNumber(
        props.editCriterai.COR_ID_PK ? props.editCriterai.COR_ID_PK : ""
      );
      setPaymentNumber("");
      setInvoiceNumber(
        props.editCriterai.INV_ID_PK ? props.editCriterai.INV_ID_PK : ""
      );
      setSettelmentNumber("");
      setNotes(
        props.editCriterai?.PAY_NOTES ? props.editCriterai?.PAY_NOTES : ""
      );
      setNotesEn(
        props.editCriterai?.PAY_NOTES_EN ? props.editCriterai?.PAY_NOTES_EN : ""
      );
      setChequeNumber(
        props.editCriterai.PAY_CHEQUE_NUMBER
          ? props.editCriterai.PAY_CHEQUE_NUMBER
          : ""
      );
      setChequeDate(
        props.editCriterai.PAY_CHEQUE_DATE
          ? props.editCriterai.PAY_CHEQUE_DATE
          : ""
      );
    } else if (!id) {
      // console.log('no id contract');
      setCliName(props?.editContract?.CLI_NAME);
      setContractNumber(props?.editContract?.COR_ID_PK);
    }
  }, [dispatch]);
  const emptyInputsVals = () => {
    setVoucherType("");
    setVoucherNumber("");
    setVoucherDate("");
    setVoucherAmount("");
    setVoucherStatus("");
    setPaymentType("");
    setRemittanceNumber("");
    setRemittanceDate("");
    setBank("");
    setPaymentReason("");
    setStageNumber("");
    setContractNumber("");
    setPaymentNumber("");
    setInvoiceNumber("");
    setSettelmentNumber("");
    setNotes("");
    setChequeNumber("");
    setChequeDate("");
  };
  const handelAddNewItem = () => {
    dispatch(
      addvoucher({
        PAY_KIND: voucherType ? voucherType : undefined,
        PAY_NUMBER: voucherNumber ? voucherNumber : undefined,
        PAY_DATE: voucherDate ? voucherDate : undefined,
        CAS_ID_PK: id,
        STG_ID_PK: stageNumber ? stageNumber : undefined,
        COR_ID_PK: contractNumber ? contractNumber : undefined,
        INV_ID_PK: invoiceNumber ? invoiceNumber : undefined,
        PAY_AMOUNT: voucherAmount ? voucherAmount : undefined,
        PAY_TYPE_ID_PK: paymentType ? paymentType : undefined,
        PAY_STATUS_ID_PK: voucherStatus ? voucherStatus : undefined,
        PAY_REASON_ID_PK: paymentReason ? paymentReason : undefined,
        BNK_ID_PK: bank ? bank : undefined,
        PAY_CHEQUE_NUMBER: chequeNumber ? chequeNumber : undefined,
        PAY_CHEQUE_DATE: chequeDate ? chequeDate : undefined,
        PAY_NOTES: notes ? notes : undefined,
        PAY_NOTES_EN: notesEn ? notesEn : undefined,
        ID_PK: paymentNumber ? paymentNumber : undefined,
      })
    ).then((res) => {
      // console.log(res.payload.code);
      if (res.payload?.code == "123") {
        setError(res.payload);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
        emptyInputsVals();
      }
    });
  };
  //TODO: in updating return internal server error
  const handelSaveVoucher = () => {
    dispatch(
      updatevoucher({
        id: props.editCriterai.PAY_ID_PK,
        data: {
          PAY_KIND: voucherType ? voucherType : undefined,
          PAY_NUMBER: voucherNumber ? voucherNumber : undefined,
          PAY_DATE: voucherDate ? voucherDate : undefined,
          CAS_ID_PK: id,
          STG_ID_PK: stageNumber ? stageNumber : undefined,
          INV_ID_PK: invoiceNumber ? invoiceNumber : undefined,
          PAY_AMOUNT: voucherAmount ? voucherAmount : undefined,
          PAY_TYPE_ID_PK: 2,
          // PAY_TYPE_ID_PK: paymentType ? paymentType : undefined,
          PAY_STATUS_ID_PK: voucherStatus ? voucherStatus : undefined,
          PAY_REASON_ID_PK: paymentReason ? paymentReason : undefined,
          BNK_ID_PK: bank ? bank : undefined,
          PAY_CHEQUE_NUMBER: chequeNumber ? chequeNumber : undefined,
          PAY_CHEQUE_DATE: chequeDate ? chequeDate : undefined,
          PAY_NOTES: notes ? notes : undefined,
          PAY_NOTES_EN: notesEn ? notesEn : undefined,
        },
      })
    ).then((res) => {
      console.log(res.payload);
      if (res.payload?.data?.code == "123") {
        setError(res.payload?.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
        emptyInputsVals();
      }
    });
  };
  const handelNextSlide = (active, dir) => {
    if (dir == "next" && active == 0) {
      document
        .querySelectorAll(".finance-modal .carousel-control-next")[0]
        ?.setAttribute("disabled", true);
      document
        .querySelectorAll(".finance-modal .carousel-control-prev")[0]
        ?.removeAttribute("disabled");
    } else if (dir == "prev" && active == 1) {
      document
        .querySelectorAll(".finance-modal .carousel-control-prev")[0]
        ?.setAttribute("disabled", true);
      document
        .querySelectorAll(".finance-modal .carousel-control-next")[0]
        ?.removeAttribute("disabled");
    } else if (dir == "prev" && active == 1) {
      document
        .querySelectorAll(".finance-modal .carousel-control-prev")[0]
        ?.setAttribute("disabled", true);
      document
        .querySelectorAll(".finance-modal .carousel-control-next")[0]
        ?.removeAttribute("disabled");
    }
  };
  const handelAddAttachment = (id) => {
    // console.log(id);
    setConstantAdd(6);
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
        dispatch(getvoucherAttachment(criteriaForDeletedAttached)).then((res) =>
          setAttachment(res.payload)
        );
        setAttacmentId("");
      } else {
        props.setOpenAttachedSnack(true);
      }
    });
  };
  // close snack alert
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAddSnack(false);
  };

  return (
    <div>
      <CModal
        visible={true}
        onClose={() => props.exitSelectModal()}
        className="finance-modal"
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
                    {translation("voucherType")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.PAY_KIND == 0
                        ? "سند قبض"
                        : "سند صرف"}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => setVoucherType(e.target.value)}
                        value={voucherType}
                      >
                        {[
                          { id: 0, name: "قبض" },
                          { id: 1, name: "صرف" },
                        ].map((ele, i) => {
                          return (
                            <MenuItem key={Math.random() + i} value={ele?.id}>
                              {ele.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("clientName")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {document.body.getAttribute("dir") == "ltr" &&
                      props.selectedCriteria.CLI_NAME_ENGLISH
                        ? props.selectedCriteria.CLI_NAME_ENGLISH
                        : props.selectedCriteria.CLI_NAME
                        ? props.selectedCriteria.CLI_NAME
                        : translation("notFound")}
                    </p>
                  ) : (
                    <CFormInput
                      disabled
                      type="text"
                      value={cliName}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("voucherNum")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.PAY_NUMBER
                        ? props.selectedCriteria.PAY_NUMBER
                        : translation("notFound")}
                    </p>
                  ) : (
                    <CFormInput
                      type="number"
                      defaultValue={voucherNumber}
                      onChange={(e) => setVoucherNumber(e.target.value)}
                      required
                      className={`${!voucherNumber ? "is-invalid" : null}`}
                    />
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {translation("fileNum")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.CAS_NUMBER
                        ? props.selectedCriteria.CAS_NUMBER
                        : translation("notFound")}
                    </p>
                  ) : (
                    <CFormInput
                      disabled
                      type="text"
                      value={
                        props.selectedCriteria?.CAS_NUMBER ||
                        props.editCriterai?.CAS_NUMBER ||
                        selectedCase?.CAS_NUMBER
                      }
                      onChange={(e) => console.log(e.target.value)}
                    />
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel>{translation("vocherDate")} </CFormLabel>
                  {props.selectedCriteria ? (
                    <p style={{ width: "45%" }}>
                      {props.selectedCriteria?.INV_DATE
                        ? new Date(
                            props.selectedCriteria?.INV_DATE
                          )?.toLocaleDateString()
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <CFormInput
                        type="date"
                        value={voucherDate}
                        id="inputEmail4"
                        required
                        className={`${!voucherDate ? "is-invalid" : null}`}
                        onChange={(e) => setVoucherDate(e.target.value)}
                      />
                    </FormControl>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {translation("amount")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.PAY_AMOUNT
                        ? props.selectedCriteria.PAY_AMOUNT
                        : translation("notFound")}
                    </p>
                  ) : (
                    <CFormInput
                      type="number"
                      defaultValue={voucherAmount}
                      onChange={(e) => setVoucherAmount(e.target.value)}
                      required
                      className={!voucherAmount ? "is-invalid" : null}
                    />
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel
                    style={{ cursor: "pointer" }}
                    onClick={() => setConstantAdd(1)}
                  >
                    {translation("payType")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.PAY_TYPE_ID_PK
                        ? props.selectedCriteria.PAY_TYPE_ID_PK
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => setPaymentType(e.target.value)}
                        value={paymentType}
                        error={!paymentType ? true : false}
                      >
                        {theVoucherTypeCompo?.map((ele, i) => {
                          return (
                            <MenuItem
                              key={Math.random() + i}
                              value={ele?.PAY_TYPE_ID_PK}
                            >
                              {document.body.getAttribute("dir") == "ltr" &&
                              ele.PAY_TYPE_NAME_EN
                                ? ele.PAY_TYPE_NAME_EN
                                : ele.PAY_TYPE_NAME}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                  {constantAdd == 1 ? (
                    <VoucherConstantType
                      exitSelectModal={() => setConstantAdd("")}
                      setOpenAddSnack={props.setOpenAddSnack}
                    />
                  ) : constantAdd == 2 ? (
                    <VoucherConstantReason
                      exitSelectModal={() => setConstantAdd("")}
                      setOpenAddSnack={props.setOpenAddSnack}
                    />
                  ) : constantAdd == 3 ? (
                    <VoucherConstantStatus
                      exitSelectModal={() => setConstantAdd("")}
                      setOpenAddSnack={props.setOpenAddSnack}
                    />
                  ) : constantAdd == 6 ? (
                    <AttachedPopup
                      exitSelectModal={() => setConstantAdd("")}
                      url={`voucher/${attacmentId}/attachment`}
                      id={attacmentId}
                      setOpenAddSnack={props.setOpenAddSnack}
                      setOpenAttachedSnack={props.setOpenAttachedSnack}
                      setOpenLargeAttachement={props.setOpenLargeAttachement}
                      callback={() =>
                        dispatch(
                          getvoucherAttachment(props.selectedCriteria.PAY_ID_PK)
                        ).then((res) => setAttachment(res.payload))
                      }
                    />
                  ) : constantAdd == 7 ? (
                    <AddBank
                      exitSelectModal={() => setConstantAdd("")}
                      setOpenAddSnack={props.setOpenAddSnack}
                    />
                  ) : null}
                </CCol>
                <CCol md={12}>
                  {theVoucherTypeCompo?.find(
                    (ele) => ele.PAY_TYPE_ID_PK == paymentType
                  )?.PAY_CATEGORY == "شيك" ? (
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">
                          {" "}
                          {translation("chequeNum")}
                        </CFormLabel>
                        {props.selectedCriteria ? (
                          <p>
                            {props.selectedCriteria.PAY_CHEQUE_NUMBER
                              ? props.selectedCriteria.PAY_CHEQUE_NUMBER
                              : translation("notFound")}
                          </p>
                        ) : (
                          <CFormInput
                            type="number"
                            defaultValue={chequeNumber}
                            onChange={(e) => setChequeNumber(e.target.value)}
                          />
                        )}
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel> {translation("chequeDate")}</CFormLabel>
                        {props.selectedCriteria ? (
                          <p style={{ width: "45%" }}>
                            {props.selectedCriteria.PAY_CHEQUE_DATE
                              ? new Date(
                                  props.selectedCriteria?.PAY_CHEQUE_DATE
                                ).toLocaleDateString()
                              : translation("notFound")}
                          </p>
                        ) : (
                          <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                defaultValue={chequeDate}
                                onChange={(e) => setChequeDate(e)}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                required
                                // className={`${!remittanceDate ? 'is-invalid' : null}`}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        )}
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel
                          onClick={() => setConstantAdd(7)}
                          style={{ cursor: "pointer" }}
                        >
                          {translation("bank")}
                        </CFormLabel>
                        {props.selectedCriteria ? (
                          <p>
                            {props.selectedCriteria.INV_NUMBER
                              ? props.selectedCriteria.INV_NUMBER
                              : translation("notFound")}
                          </p>
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              onChange={(e) => setBank(e.target.value)}
                              value={bank}
                            >
                              {theBanksArr?.map((ele, i) => {
                                return (
                                  <MenuItem
                                    key={Math.random() + i}
                                    value={ele?.BNK_ID_PK}
                                  >
                                    {ele.BNK_NAME}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        )}
                      </CCol>
                    </CRow>
                  ) : theVoucherTypeCompo?.find(
                      (ele) => ele.PAY_TYPE_ID_PK == paymentType
                    )?.PAY_CATEGORY == "تحويل بنكي" ? (
                    <CRow>
                      <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">
                          {" "}
                          {translation("transferNum")}
                        </CFormLabel>
                        {props.selectedCriteria ? (
                          <p>
                            {props.selectedCriteria.INV_NUMBER
                              ? props.selectedCriteria.INV_NUMBER
                              : translation("notFound")}
                          </p>
                        ) : (
                          <CFormInput
                            type="number"
                            defaultValue={remittanceNumber}
                            onChange={(e) =>
                              setRemittanceNumber(e.target.value)
                            }
                          />
                        )}
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel> {translation("transferDate")} </CFormLabel>
                        {props.selectedCriteria ? (
                          <p style={{ width: "45%" }}>
                            {props.selectedCriteria
                              ? new Date(
                                  props.selectedCriteria?.INV_DATE
                                ).toLocaleDateString()
                              : translation("notFound")}
                          </p>
                        ) : (
                          <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                defaultValue={remittanceDate}
                                onChange={(e) => setRemittanceDate(e)}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                required
                                className={`${
                                  !remittanceDate ? "is-invalid" : null
                                }`}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        )}
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel
                          onClick={() => setConstantAdd(7)}
                          style={{ cursor: "pointer" }}
                        >
                          {translation("bank")}
                        </CFormLabel>
                        {props.selectedCriteria ? (
                          <p>
                            {props.selectedCriteria.INV_NUMBER
                              ? props.selectedCriteria.INV_NUMBER
                              : translation("notFound")}
                          </p>
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              onChange={(e) => setBank(e.target.value)}
                              value={bank}
                            >
                              {theBanksArr?.map((ele, i) => {
                                return (
                                  <MenuItem
                                    key={Math.random() + i}
                                    value={ele?.BNK_ID_PK}
                                  >
                                    {ele.BNK_NAME}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        )}
                      </CCol>
                    </CRow>
                  ) : null}
                </CCol>
              </CRow>
            </CCarouselItem>
            <CCarouselItem>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("stageNum")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.COR_ID_PK
                        ? props.selectedCriteria.COR_ID_PK
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={stageNumber}
                        onChange={(e) => setStageNumber(e.target.value)}
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
                    </FormControl>
                  )}
                </CCol>
                {!id && (
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputEmail4">
                      {" "}
                      {translation("contractNum")}
                    </CFormLabel>
                    {props.selectedCriteria ? (
                      <p>
                        {props.selectedCriteria.COR_ID_PK
                          ? props.selectedCriteria.COR_ID_PK
                          : translation("notFound")}
                      </p>
                    ) : (
                      <CFormInput
                        type="text"
                        defaultValue={contractNumber}
                        readOnly
                        onChange={(e) => setContractNumber(e.target.value)}
                      />
                    )}
                  </CCol>
                )}
                {!id ? (
                  <CCol md={6}>
                    <CFormLabel htmlFor="inputEmail4">
                      {" "}
                      {translation("paymentNumber")}
                    </CFormLabel>
                    {props.selectedCriteria ? (
                      <p>
                        {props.selectedCriteria.COR_ID_PK
                          ? props.selectedCriteria.COR_ID_PK
                          : translation("notFound")}
                      </p>
                    ) : (
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={paymentNumber}
                          onChange={(e) => setPaymentNumber(e.target.value)}
                        >
                          {props.arrayOfDivs?.map((ele) => (
                            <MenuItem
                              value={ele.id}
                              key={Math.random() + ele.id}
                            >
                              {ele.contractPaidNumber}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </CCol>
                ) : null}

                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("invoiceNum")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.COR_ID_PK
                        ? props.selectedCriteria.COR_ID_PK
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                      >
                        {allInvoices?.map((ele) => (
                          <MenuItem
                            value={ele.INV_ID_PK}
                            key={Math.random() + ele.INV_ID_PK}
                          >
                            {ele.INV_NUMBER}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("settlementNum")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.COR_ID_PK
                        ? props.selectedCriteria.COR_ID_PK
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={settelmentNumber}
                        onChange={(e) => setSettelmentNumber(e.target.value)}
                      >
                        {/* {allContrcts?.data?.map((ele) => (
										<MenuItem value={ele.COR_ID_PK} key={Math.random() + ele.COR_ID_PK}>
											{ele.COR_NUMBER}
										</MenuItem>
									))} */}
                      </Select>
                    </FormControl>
                  )}
                </CCol>

                <CCol md={6}>
                  <CFormLabel
                    style={{ cursor: "pointer" }}
                    onClick={() => setConstantAdd(3)}
                  >
                    {translation("voucherStatus")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.INV_NUMBER
                        ? props.selectedCriteria.INV_NUMBER
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => setVoucherStatus(e.target.value)}
                        value={voucherStatus}
                      >
                        {theVoucherStatusCompo?.map((ele, i) => {
                          return (
                            <MenuItem
                              key={Math.random() + i}
                              value={ele?.PAY_STATUS_ID_PK}
                            >
                              {document.body.getAttribute("dir") == "ltr" &&
                              ele.PAY_STATUS_NAME_EN
                                ? ele.PAY_STATUS_NAME_EN
                                : ele.PAY_STATUS_NAME}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </CCol>
                <CCol md={6}>
                  <CFormLabel
                    style={{ cursor: "pointer" }}
                    onClick={() => setConstantAdd(2)}
                  >
                    {translation("payReason")}
                  </CFormLabel>
                  {props.selectedCriteria ? (
                    <p>
                      {props.selectedCriteria.INV_NUMBER
                        ? props.selectedCriteria.INV_NUMBER
                        : translation("notFound")}
                    </p>
                  ) : (
                    <FormControl fullWidth>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={(e) => setPaymentReason(e.target.value)}
                        value={paymentReason}
                      >
                        {theVoucherReasonCompo?.map((ele, i) => {
                          return (
                            <MenuItem
                              key={Math.random() + i}
                              value={ele?.PAY_REASON_ID_PK}
                            >
                              {document.body.getAttribute("dir") == "ltr" &&
                              ele.PAY_REASON_NAME_EN
                                ? ele.PAY_REASON_NAME_EN
                                : ele.PAY_REASON_NAME}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("notes")}
                  </CFormLabel>
                  <CFormTextarea
                    rows={8}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="inputEmail4">
                    {" "}
                    {translation("notesEn")}
                  </CFormLabel>
                  <CFormTextarea
                    rows={8}
                    value={notesEn}
                    onChange={(e) => setNotesEn(e.target.value)}
                  />
                </CCol>
                <CCol md={12}>
                  {console.log(props.editCriterai)}
                  {props.editCriterai || props.selectedCriteria ? (
                    <CFormLabel style={{ cursor: "pointer" }}>
                      {" "}
                      {translation("attachments")}
                      {props.editCriterai ? (
                        <CIcon
                          size={"sm"}
                          icon={cilPlus}
                          customClassName="nav-icon"
                          style={{ height: "16px", width: "16px" }}
                          onClick={() =>
                            handelAddAttachment(props.editCriterai?.PAY_ID_PK)
                          }
                        />
                      ) : null}
                    </CFormLabel>
                  ) : null}
                  {props.selectedCriteria || props.editCriteria ? (
                    props.selectedCriteria?._FILE > 0 ||
                    props.editCriteria?._FILE > 0 ? (
                      <CTable bordered>
                        <AttachedHeadTable />
                        <CTableBody>
                          {attachment?.map((ele, i) => (
                            <CTableRow
                              key={i}
                              onClick={() => {
                                dispatch(
                                  getvoucherAttachmentData({
                                    id: props.editCriteria?.PAY_ID_PK,
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
                              <CTableHeaderCell scope="row">
                                {i}
                              </CTableHeaderCell>
                              <CTableDataCell>{ele?.ATH_NAME}</CTableDataCell>
                              <CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
                              <CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
                              <CTableDataCell>
                                {new Date(ele?.ATH_DATE).toLocaleDateString()}
                              </CTableDataCell>
                              <CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
                              {props.editCriterai?.PAY_ID_PK ? (
                                <CTableDataCell>
                                  <CButton
                                    color={"danger"}
                                    onClick={() =>
                                      handleDeleteAttachment(
                                        ele?.ATH_ID_PK,
                                        props.editCriterai?.PAY_ID_PK
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
          {props.selectedCriteria ? null : props.editCriterai ? (
            <CButton
              className="btn-modal-save"
              color="primary"
              onClick={handelSaveVoucher}
            >
              {translation("saveChanges")}
            </CButton>
          ) : (
            <CButton
              className="btn-modal-save"
              color="primary"
              onClick={handelAddNewItem}
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

      {openAddSnack ? (
        <Snackbar
          open={openAddSnack}
          autoHideDuration={2000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            {translation("itemAdded")}
          </Alert>
        </Snackbar>
      ) : null}
      {visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
        <DeletePopup
          exitSelectModal={() => setVisibleDeleteModal(false)}
          handleDelete={deleteTheAttachment}
        />
      ) : null}
    </div>
  );
};

export default ReceiptVoucher;
