import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';


import { setWarnSubjects, setWarnStatus,setWarnResults, setWarnMethods } from '../../../store/reducers/constants/warning';
import translation from '../../../i18n/translate';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const WarningConstantSubject = (props) => {
	const [subjectName, setSubjectName] = useState('');
	const [subjectNameEn, setSubjectNameEn] = useState('');
	const [openSubject, setOpenSubject] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddSubject = useCallback(() => {
		dispatch(
			setWarnSubjects({
				WRN_SUBJECT_NAME: subjectName ? subjectName : undefined,
				WRN_SUBJECT_NAME_EN: subjectNameEn ? subjectNameEn : undefined,
				WRN_SUBJECT_STATUS: openSubject ? openSubject : false,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				props. setOpenAddSnack(true)
				setError(res.payload.res.data)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, subjectName, subjectNameEn, openSubject]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('subject')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={subjectName}
							onChange={(e) => setSubjectName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.WRN_SUBJECT_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={subjectNameEn} onChange={(e) => setSubjectNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openSubject}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenSubject(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddSubject}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const WarningConstantMethod = (props) => {
	const [methodName, setMethodName] = useState('');
	const [methodNameEn, setMethodNameEn] = useState('');
	const [openMethod, setOpenMethod] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddMethods = useCallback(() => {
		dispatch(
			setWarnMethods({
				WRN_METHOD_NAME: methodName ? methodName : undefined,
				WRN_METHOD_NAME_EN: methodNameEn ? methodNameEn : undefined,
				WRN_METHOD_STATUS: openMethod ? openMethod : false,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				props. setOpenAddSnack(true)
				setError(res.payload.res.data)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, methodName, openMethod, methodNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('method')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={methodName}
							onChange={(e) => setMethodName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.WRN_METHOD_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={methodNameEn} onChange={(e) => setMethodNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openMethod}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenMethod(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddMethods}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const WarningConstantStatus = (props) => {
	const [statusName, setStatusName] = useState('');
	const [statusNameEn, setStatusNameEn] = useState('');
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setWarnStatus({
				WRN_STATUS_NAME: statusName ? statusName : undefined,
				WRN_STATUS_NAME_EN: statusNameEn ? statusNameEn : undefined,
				WRN_STATUS_STATUS: openStatus ? openStatus : false,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				props. setOpenAddSnack(true)
				setError(res.payload.res.data)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, statusName, statusNameEn, openStatus]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('status')}  </CModalTitle>
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
							className={`${error?.args?.filter((ele) => ele == 'body.WRN_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={statusNameEn} onChange={(e) => setStatusNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
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

export const WarningConstantResults = (props) => {
	const [ResultName, setResultName] = useState('');
	const [ResultNameEn, setResultNameEn] = useState('');
	const [openResult, setOpenResult] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddResult = useCallback(() => {
		dispatch(
			setWarnResults({
				WRN_RESULT_NAME: ResultName ? ResultName : undefined,
				WRN_RESULT_NAME_EN: ResultNameEn ? ResultNameEn : undefined,
				WRN_RESULT_STATUS: openResult ? openResult : false,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				props. setOpenAddSnack(true)
				setError(res.payload.res.data)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, ResultName, ResultNameEn, openResult]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('result')} </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							procedure="text"
							value={ResultName}
							onChange={(e) => setResultName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.WRN_RESULT_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput procedure="text" value={ResultNameEn} onChange={(e) => setResultNameEn(e.target.value)} id="inputEmail4" />
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