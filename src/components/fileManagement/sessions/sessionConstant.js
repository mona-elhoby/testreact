import React, { useState, useCallback } from "react";
import {
  CCol,
  CRow,
  CModalBody,
  CModalHeader,
  CModal,
  CModalTitle,
  CFormLabel,
  CFormInput,
  CButton,
  CModalFooter,
} from "@coreui/react";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";

import translation from "../../../i18n/translate";

import {
  setSessionDecision,
  setSessionPlace,
  setSessionRoll,
  setSessionType,
  setSessionRequired,
  setSessionJudgement,
} from "../../../store/reducers/constants/session";
import { getSessionRequired } from "../../../store/reducers/constants/session";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const SessionConstantDesicion = (props) => {
  const [desicionName, setDesicionName] = useState("");
  const [desicionNameEn, setDesicionNameEn] = useState("");
  const [openDesicion, setOpenDesicion] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handelAddDesicion = useCallback(() => {
    dispatch(
      setSessionDecision({
        SES_DECISION_NAME: desicionName ? desicionName : undefined,
        SES_DECISION_NAME_EN: desicionNameEn ? desicionNameEn : undefined,
        SES_DECISION_STATUS: openDesicion ? openDesicion : false,
      })
    ).then((res) => {
      if (res.payload.res.data?.code) {
        setError(res.payload.res.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
      }
    });
  }, [dispatch, desicionName, desicionNameEn, openDesicion]);
  return (
    <CModal visible={true} onClose={() => props.exitSelectModal()}>
      <CModalHeader>
        <CModalTitle> {translation("sessionDecision")} </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("name")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={desicionName}
              onChange={(e) => setDesicionName(e.target.value)}
              id="inputEmail4"
              required
              className={`${
                error?.args?.filter(
                  (ele) => ele == "body.SES_DECISION_NAME required"
                )
                  ? "is-invalid"
                  : null
              }`}
            />
          </CCol>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("nameEn")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={desicionNameEn}
              onChange={(e) => setDesicionNameEn(e.target.value)}
              id="inputEmail4"
            />
          </CCol>
          <CCol sm={12}>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("active")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={openDesicion}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setOpenDesicion(e.target.checked)}
              />
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="btn-modal-save"
          color="primary"
          onClick={handelAddDesicion}
        >
          {translation("add")}
        </CButton>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={props.exitSelectModal}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export const SessionConstantPlace = (props) => {
  const [placeName, setPlaceName] = useState("");
  const [placeNameEn, setPlaceNameEn] = useState("");
  const [openPlace, setOpenPlace] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handelAddPlaces = useCallback(() => {
    dispatch(
      setSessionPlace({
        SES_PLACE_NAME: placeName ? placeName : undefined,
        SES_PLACE_NAME_EN: placeNameEn ? placeNameEn : undefined,
        SES_PLACE_STATUS: openPlace ? openPlace : false,
      })
    ).then((res) => {
      if (res.payload.res.data?.code) {
        setError(res.payload.res.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
      }
    });
  }, [dispatch, placeName, openPlace, placeNameEn]);
  return (
    <CModal visible={true} onClose={() => props.exitSelectModal()}>
      <CModalHeader>
        <CModalTitle> {translation("sesPlace")}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("name")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              id="inputEmail4"
              required
              className={`${
                error?.args?.filter(
                  (ele) => ele == "body.WRN_METHOD_NAME required"
                )
                  ? "is-invalid"
                  : null
              }`}
            />
          </CCol>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("nameEn")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={placeNameEn}
              onChange={(e) => setPlaceNameEn(e.target.value)}
              id="inputEmail4"
            />
          </CCol>
          <CCol sm={12}>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("active")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={openPlace}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setOpenPlace(e.target.checked)}
              />
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="btn-modal-save"
          color="primary"
          onClick={handelAddPlaces}
        >
          {translation("add")}
        </CButton>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={props.exitSelectModal}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export const SessionConstantRoll = (props) => {
  const [rollName, setRollName] = useState("");
  const [rollNameEn, setRollNameEn] = useState("");
  const [openRoll, setOpenRoll] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handelAddRoll = useCallback(() => {
    dispatch(
      setSessionRoll({
        SES_ROLL_NAME: rollName ? rollName : undefined,
        SES_ROLL_NAME_EN: rollNameEn ? rollNameEn : undefined,
        SES_ROLL_STATUS: openRoll ? openRoll : false,
      })
    ).then((res) => {
      if (res.payload.res.data?.code) {
        setError(res.payload.res.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
      }
    });
  }, [dispatch, rollName, rollNameEn, openRoll]);
  return (
    <CModal visible={true} onClose={() => props.exitSelectModal()}>
      <CModalHeader>
        <CModalTitle> {translation("sessionRoll")} </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("name")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={rollName}
              onChange={(e) => setRollName(e.target.value)}
              id="inputEmail4"
              required
              className={`${
                error?.args?.filter(
                  (ele) => ele == "body.WRN_STATUS_NAME required"
                )
                  ? "is-invalid"
                  : null
              }`}
            />
          </CCol>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("nameEn")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={rollNameEn}
              onChange={(e) => setRollNameEn(e.target.value)}
              id="inputEmail4"
            />
          </CCol>
          <CCol sm={12}>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("active")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={openRoll}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setOpenRoll(e.target.checked)}
              />
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="btn-modal-save"
          color="primary"
          onClick={handelAddRoll}
        >
          {translation("add")}
        </CButton>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={props.exitSelectModal}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export const SessionConstantType = (props) => {
  const [TypeName, setTypeName] = useState("");
  const [TypeNameEn, setTypeNameEn] = useState("");
  const [expertMeeting, setexpertMeeting] = useState(false);
  const [openType, setOpenType] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handelAddType = useCallback(() => {
    dispatch(
      setSessionType({
        SES_TYPE_NAME: TypeName ? TypeName : undefined,
        SES_TYPE_NAME_EN: TypeNameEn ? TypeNameEn : undefined,
        SES_TYPE_STATUS: openType ? openType : false,
      })
    ).then((res) => {
      if (res.payload.res.data?.code) {
        setError(res.payload.res.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
      }
    });
  }, [dispatch, TypeName, TypeNameEn, openType]);
  return (
    <CModal visible={true} onClose={() => props.exitSelectModal()}>
      <CModalHeader>
        <CModalTitle> {translation("sessionType")} </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("name")}
            </CFormLabel>
            <CFormInput
              procedure="text"
              value={TypeName}
              onChange={(e) => setTypeName(e.target.value)}
              id="inputEmail4"
              required
              className={`${
                error?.args?.filter(
                  (ele) => ele == "body.WRN_RESULT_NAME required"
                )
                  ? "is-invalid"
                  : null
              }`}
            />
          </CCol>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("nameEn")}
            </CFormLabel>
            <CFormInput
              procedure="text"
              value={TypeNameEn}
              onChange={(e) => setTypeNameEn(e.target.value)}
              id="inputEmail4"
            />
          </CCol>
          <CCol sm={12}>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("expertMeeting")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={expertMeeting}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setexpertMeeting(e.target.checked)}
              />
            </div>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("active")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={openType}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setOpenType(e.target.checked)}
              />
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="btn-modal-save"
          color="primary"
          onClick={handelAddType}
        >
          {translation("add")}
        </CButton>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={props.exitSelectModal}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export const SessionConstantRequirement = (props) => {
  const [requirementName, setRequirementName] = useState("");
  const [requirementNameEn, setRequirementNameEn] = useState("");
  const [openRequirement, setOpenRequirement] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handelAddRequirement = useCallback(() => {
    dispatch(
      setSessionRequired({
        RTYPE_NAME: requirementName ? requirementName : undefined,
        RTYPE_NAME_EN: requirementNameEn ? requirementNameEn : undefined,
        RTYPE_STATUS: openRequirement ? openRequirement : false,
      })
    ).then((res) => {
      if (res.payload.res.data?.code) {
        setError(res.payload.res.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
        dispatch(getSessionRequired());
      }
    });
  }, [dispatch, requirementName, requirementNameEn, openRequirement]);
  return (
    <CModal visible={true} onClose={() => props.exitSelectModal()}>
      <CModalHeader>
        <CModalTitle>{translation("addRequirments")}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("name")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={requirementName}
              onChange={(e) => setRequirementName(e.target.value)}
              id="inputEmail4"
              required
              className={`${
                error?.args?.filter(
                  (ele) => ele == "body.WRN_STATUS_NAME required"
                )
                  ? "is-invalid"
                  : null
              }`}
            />
          </CCol>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("nameEn")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={requirementNameEn}
              onChange={(e) => setRequirementNameEn(e.target.value)}
              id="inputEmail4"
            />
          </CCol>
          <CCol sm={12}>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("active")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={openRequirement}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setOpenRequirement(e.target.checked)}
              />
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="btn-modal-save"
          color="primary"
          onClick={handelAddRequirement}
        >
          {translation("add")}
        </CButton>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={props.exitSelectModal}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export const SessionConstantAdjudgement = (props) => {
  const [adjudgementName, setAdjudgementName] = useState("");
  const [adjudgementNameEn, setAdjudgementNameEn] = useState("");
  const [openAdjudgement, setOpenAdjudgement] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handelAddAdjudgement = useCallback(() => {
    dispatch(
      setSessionJudgement({
        ADJ_TYPE_NAME: adjudgementName ? adjudgementName : undefined,
        ADJ_TYPE_NAME_EN: adjudgementNameEn ? adjudgementNameEn : undefined,
        ADJ_TYPE_STATUS: openAdjudgement ? openAdjudgement : false,
      })
    ).then((res) => {
      if (res.payload.res.data?.code) {
        setError(res.payload.res.data);
      } else {
        props.exitSelectModal();
        props.setOpenAddSnack(true);
      }
    });
  }, [dispatch, adjudgementName, adjudgementNameEn, openAdjudgement]);
  return (
    <CModal visible={true} onClose={() => props.exitSelectModal()}>
      <CModalHeader>
        <CModalTitle>{translation("judgement")}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("name")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={adjudgementName}
              onChange={(e) => setAdjudgementName(e.target.value)}
              id="inputEmail4"
              required
              className={`${
                error?.args?.filter(
                  (ele) => ele == "body.ADJ_TYPE_NAME required"
                )
                  ? "is-invalid"
                  : null
              }`}
            />
          </CCol>
          <CCol sm={12}>
            <CFormLabel htmlFor="inputEmail4">
              {" "}
              {translation("nameEn")}
            </CFormLabel>
            <CFormInput
              type="text"
              value={adjudgementNameEn}
              onChange={(e) => setAdjudgementNameEn(e.target.value)}
              id="inputEmail4"
            />
          </CCol>
          <CCol sm={12}>
            <div>
              <CFormLabel htmlFor="inputEmail4">
                {" "}
                {translation("active")}{" "}
              </CFormLabel>
              <Checkbox
                {...label}
                checked={openAdjudgement}
                sx={{
                  color: "#4527a0",
                  "&.Mui-checked": {
                    color: "#5e35b1",
                  },
                }}
                onChange={(e) => setOpenAdjudgement(e.target.checked)}
              />
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          className="btn-modal-save"
          color="primary"
          onClick={handelAddAdjudgement}
        >
          {translation("add")}
        </CButton>
        <CButton
          color="danger"
          className="btn-modal-close"
          onClick={props.exitSelectModal}
        >
          {translation("close")}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
