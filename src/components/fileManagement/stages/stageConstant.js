import React, { useState, useCallback, useEffect } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import {
	getStageType,
	setStageType,
	getStageStatus,
	setStageStatus,
	getStageResult,
	setStageResult,
	getStageOffice,
	setStageOffice,
	getStageKind,
	setStageKind,
	getStageJudge,
	setStageJudge,
} from '../../../store/reducers/constants/stage';
import {getAgentAttribute, setAgentAttribute} from "../../../store/reducers/theConstants"
import translation from '../../../i18n/translate'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const StageConstantStatus = (props) => {
	const [statusName, setStatusName] = useState('');
	const [statusNameEn, setStatusNameEn] = useState('');
	const [endStatus, setEndStatus] = useState(true);
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setStageStatus({
				STG_STATUS_NAME: statusName ? statusName : undefined,
				STG_STATUS_NAME_EN: statusNameEn ? statusNameEn : undefined,
				STG_STATUS_STATUS: openStatus ? openStatus : false,
				STG_IS_FINISHED: endStatus ? endStatus : undefined,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getStageStatus());
			}
		});
	}, [dispatch, statusName, statusNameEn, openStatus, endStatus]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('status')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={statusName}
							onChange={(e) => setStatusName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={statusNameEn} onChange={(e) => setStatusNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('expired') }</CFormLabel>
							<Checkbox
								{...label}
								checked={endStatus}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setEndStatus(e.target.checked)}
							/>
						</div>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openStatus}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenStatus(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddStatus}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const StageConstantResult = (props) => {
	const [ResultName, setResultName] = useState('');
	const [ResultNameEn, setResultNameEn] = useState('');
	const [openResult, setOpenResult] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddResult = useCallback(() => {
		dispatch(
			setStageResult({
				STG_RESULT_NAME: ResultName ? ResultName : undefined,
				STG_RESULT_NAME_EN: ResultNameEn ? ResultNameEn : undefined,
				STG_RESULT_STATUS: openResult ? openResult : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getStageResult());
			}
		});
	}, [dispatch, ResultName, openResult, ResultNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('category')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={ResultName}
							onChange={(e) => setResultName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={ResultNameEn} onChange={(e) => setResultNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openResult}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenResult(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddResult}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const StageConstantType = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
    const [typeCheque, setTypeCheque] = useState('');
	const [openType, setOpenType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddType = useCallback(() => {
		dispatch(
			setStageType({
				STG_TYPE_NAME: typeName ? typeName : undefined,
				STG_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				STG_TYPE_STATUS: openType ? openType : false,
			})
		).then((res) => {
			// console.log(res)
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getStageType());
			}
		});
	}, [dispatch, typeName, openType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('type')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={typeName}
							onChange={(e) => setTypeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={typeNameEn} onChange={(e) => setTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={6}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={typeCheque}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setTypeCheque(e.target.checked)}
							/>
						</div>
					</CCol>
					<CCol sm={6}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openType}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenType(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddType}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};
//TODO 'body.OFC_STATUS must be a string'
export const StageConstantOffice = (props) => {
	const [OfficeName, setOfficeName] = useState('');
	const [OfficeNameEn, setOfficeNameEn] = useState('');
	const [openOffice, setOpenOffice] = useState(true);
	const [mobileOffice, setmobileOffice] = useState('');
	const [specialityOffice, setspecialityOffice] = useState('');
	const [judgeOffice, setjudgeOffice] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddOffice = useCallback(() => {
		dispatch(
			setStageOffice({
				OFC_NAME: OfficeName ? OfficeName : undefined,
				OFC_NAME_EN: OfficeNameEn ? OfficeNameEn : undefined,
				OFC_SPECIATLY: specialityOffice? specialityOffice : undefined,
				OFC_JUDGE: judgeOffice ? judgeOffice : undefined,
				OFC_MOBILE: mobileOffice ? mobileOffice : undefined,
				OFC_STATUS: openOffice ? openOffice : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getStageOffice());
			}
		});
	}, [dispatch, OfficeName, OfficeNameEn, openOffice]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('office')} </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12} md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={OfficeName}
							onChange={(e) => setOfficeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12} md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={OfficeNameEn} onChange={(e) => setOfficeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12} md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('telephone')}</CFormLabel>
						<CFormInput type="text" value={mobileOffice} onChange={(e) => setmobileOffice(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12} md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('specialization')}</CFormLabel>
						<CFormInput type="text" value={specialityOffice} onChange={(e) => setspecialityOffice(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12} md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('judg')}</CFormLabel>
						<CFormInput type="text" value={judgeOffice} onChange={(e) => setjudgeOffice(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12} md={6}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openOffice}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenOffice(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddOffice}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const StageConstantKind = (props) => {
	const [KindName, setKindName] = useState('');
	const [KindNameEn, setKindNameEn] = useState('');
	const [openKind, setOpenKind] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddKind = useCallback(() => {
		dispatch(
			setStageKind({
				STG_KIND_NAME: KindName ? KindName : undefined,
				STG_KIND_NAME_EN: KindNameEn ? KindNameEn : undefined,
				STG_KIND_STATUS: openKind ? openKind : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getStageKind());
			}
		});
	}, [dispatch, KindName, KindNameEn, openKind]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('stage')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={KindName}
							onChange={(e) => setKindName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={KindNameEn} onChange={(e) => setKindNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openKind}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenKind(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddKind}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const StageConstantJudge = (props) => {
	const [JudgeName, setJudgeName] = useState('');
	const [JudgeNameEn, setJudgeNameEn] = useState('');
	const [openJudge, setOpenJudge] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddJudge = useCallback(() => {
		dispatch(
			setStageJudge({
				STG_JUDGE_NAME: JudgeName ? JudgeName : undefined,
				STG_JUDGE_NAME_EN: JudgeNameEn ? JudgeNameEn : undefined,
				STG_JUDGE_STATUS: openJudge ? openJudge : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getStageJudge());
			}
		});
	}, [dispatch, JudgeName, JudgeNameEn, openJudge]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('judg')} </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={JudgeName}
							onChange={(e) => setJudgeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={JudgeNameEn} onChange={(e) => setJudgeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openJudge}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenJudge(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddJudge}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};


export const HandleAgentAttribute = props => {
	const [AgentAttributeName, setAgentAttributeName] = useState('');
	const [AgentAttributeNameEn, setAgentAttributeNameEn] = useState('');
	const [openAgentAttribute, setOpenAgentAttribute] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddAgentAttribute = useCallback(() => {
		dispatch(
			setAgentAttribute({
				AGE_ATTRBUIT_NAME: AgentAttributeName ? AgentAttributeName : undefined,
				AGE_ATTRBUIT_NAME_EN: AgentAttributeNameEn ? AgentAttributeNameEn : undefined,
				AGE_ATTRBUIT_STATUS: openAgentAttribute ? openAgentAttribute : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getAgentAttribute());
			}
		});
	}, [dispatch, AgentAttributeName, openAgentAttribute, AgentAttributeNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>  {translation('add')} صفه</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={AgentAttributeName}
							onChange={(e) => setAgentAttributeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.STG_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={AgentAttributeNameEn} onChange={(e) => setAgentAttributeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openAgentAttribute}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenAgentAttribute(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddAgentAttribute}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
}
