import React, { useState, useCallback, useEffect } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import { setExecuteProcedure, setExecuteStatus, setExecuteResult, setExecuteType } from '../../../store/reducers/constants/executs';
import translation from '../../../i18n/translate';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const ExecuteConstantStatus = (props) => {
	const [statusName, setStatusName] = useState('');
	const [statusNameEn, setStatusNameEn] = useState('');
	const [endStatus, setEndStatus] = useState(true);
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setExecuteStatus({
				EXE_STATUS_NAME: statusName ? statusName : undefined,
				EXE_STATUS_NAME_EN: statusNameEn ? statusNameEn : undefined,
				EXE_STATUS_STATUS: openStatus ? openStatus : false,
				EXE_STATUS_LOCK: endStatus ? endStatus : undefined,
			})
		).then((res) => {
			res.payload.data?.code ? setError(res.payload.data) : props.exitSelectModal();
		});
	}, [dispatch, statusName, statusNameEn, openStatus, endStatus]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>حاله الإجراء</CModalTitle>
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
							className={`${error?.args?.filter((ele) => ele == 'body.EXE_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={statusNameEn} onChange={(e) => setStatusNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> منتهي </CFormLabel>
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

export const ExecuteConstantResults = (props) => {
	const [resultName, setResultName] = useState('');
	const [resultNameEn, setResultNameEn] = useState('');
	const [openResult, setOpenResult] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddResults = useCallback(() => {
		dispatch(
			setExecuteResult({
				EXE_RESULT_NAME: resultName ? resultName : undefined,
				EXE_RESULT_NAME_EN: resultNameEn ? resultNameEn : undefined,
				EXE_RESULT_STATUS: openResult ? openResult : false,
			})
		).then((res) => {
			res.payload.data?.code ? setError(res.payload.data) : props.exitSelectModal();
		});
	}, [dispatch, resultName, openResult, resultNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('result')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={resultName}
							onChange={(e) => setResultName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.EXE_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={resultNameEn} onChange={(e) => setResultNameEn(e.target.value)} id="inputEmail4" />
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
				<CButton className="btn-modal-save" color="primary" onClick={handelAddResults}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};


export const ExecuteConstantType = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddType = useCallback(() => {
		dispatch(
			setExecuteType({
				EXE_TYPE_NAME: typeName ? typeName : undefined,
				EXE_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				EXE_TYPE_STATUS: openType ? openType : false,
			})
		).then((res) => {
			// console.log(res)
			res.payload.data?.code ? setError(res.payload.data) : props.exitSelectModal();
		});
	}, [dispatch, typeName, openType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('executeType')}</CModalTitle>
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
							className={`${error?.args?.filter((ele) => ele == 'body.EXE_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={typeNameEn} onChange={(e) => setTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
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

export const ExecuteConstantProcedure = (props) => {
	const [procedureName, setProcedureName] = useState('');
	const [procedureNameEn, setProcedureNameEn] = useState('');
	const [openProcedure, setOpenProcedure] = useState(true);
    const [theExecuteType, setTheExecuteType] = useState('')
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { theExecuteTypeCompo } = useSelector((state) => state.executeConstraint);
	const handelAddProcedure = useCallback(() => {
		dispatch(
			setExecuteProcedure({
				EXE_PROCEDURE_NAME: procedureName ? procedureName : undefined,
				EXE_PROCEDURE_NAME_EN: procedureNameEn ? procedureNameEn : undefined,
				EXE_PROCEDURE_STATUS: openProcedure ? openProcedure : false,
                EXE_TYPE_ID_PK: theExecuteType ? theExecuteType : undefined,
                EXE_DESCRIPTION: undefined,
                EXE_DESCRIPTION_EN: undefined
			})
		).then((res) => {
			res.payload.data?.code ? setError(res.payload.data) : props.exitSelectModal();
		});
	}, [dispatch, procedureName, procedureNameEn,theExecuteType, openProcedure]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>  {translation('proceding')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
                    <CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {translation('executeType')}</CFormLabel>
									<FormControl fullWidth>
										<Select
											value={theExecuteType}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={e => setTheExecuteType(e.target.value)}
										>
											{theExecuteTypeCompo?.map((ele) => (
												<MenuItem value={ele.EXE_TYPE_ID_PK} key={Math.random() + ele.EXE_TYPE_ID_PK}>
													{document.body.getAttribute('dir') == 'ltr' && ele.EXE_TYPE_NAME_EN ? ele.EXE_TYPE_NAME_EN : ele.EXE_TYPE_NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>
                    </CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							procedure="text"
							value={procedureName}
							onChange={(e) => setProcedureName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.EXE_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput procedure="text" value={procedureNameEn} onChange={(e) => setProcedureNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openProcedure}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenProcedure(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddProcedure}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};