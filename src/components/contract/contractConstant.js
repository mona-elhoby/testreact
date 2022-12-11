import React, { useState, useCallback, useEffect } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import {
	getcontractDuration,
	getcontractItem,
	getcontractStatus,
	getcontractType,
	setcontractDuration,
	setcontractItem,
	setcontractStatus,
	setcontractType,
} from '../../store/reducers/constants/contract';
import translation from '../../i18n/translate'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const ContractDurationConstant = (props) => {
	const [contractDurationName, setcontractDurationName] = useState('');
	const [contractDurationNameEn, setcontractDurationNameEn] = useState('');
	const [opencontractDuration, setOpencontractDuration] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddcontractDuration = useCallback(() => {
		dispatch(
			setcontractDuration({
				COR_DURATION_NAME: contractDurationName ? contractDurationName : undefined,
				COR_DURATION_NAME_EN: contractDurationNameEn ? contractDurationNameEn : undefined,
				COR_DURATION_STATUS: opencontractDuration ? opencontractDuration : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getcontractDuration());
			}
		});
	}, [dispatch, contractDurationName, contractDurationNameEn, opencontractDuration]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('period')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={contractDurationName}
							onChange={(e) => setcontractDurationName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!contractDurationName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={contractDurationNameEn} onChange={(e) => setcontractDurationNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={opencontractDuration}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpencontractDuration(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddcontractDuration}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const ContractItemConstant = (props) => {
	const [contractItemName, setcontractItemName] = useState('');
	const [contractItemNameEn, setcontractItemNameEn] = useState('');
	const [opencontractItem, setOpencontractItem] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddcontractItem = useCallback(() => {
		dispatch(
			setcontractItem({
				COR_ITEM_NAME: contractItemName ? contractItemName : undefined,
				COR_ITEM_NAME_EN: contractItemNameEn ? contractItemNameEn : undefined,
				COR_ITEM_STATUS: opencontractItem ? opencontractItem : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getcontractItem());
			}
		});
	}, [dispatch, contractItemName, opencontractItem, contractItemNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('add')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={contractItemName}
							onChange={(e) => setcontractItemName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={contractItemNameEn} onChange={(e) => setcontractItemNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={opencontractItem}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpencontractItem(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddcontractItem}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const ContractTypeConstant = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddType = useCallback(() => {
		dispatch(
			setcontractType({
				COR_TYPE_NAME: typeName ? typeName : undefined,
				COR_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				COR_TYPE_STATUS: openType ? openType : undefined,
			})
		).then((res) => {
			// console.log(res)
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getcontractType());
			}
		});
	}, [dispatch, typeName, openType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('contractType')}</CModalTitle>
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
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
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

export const ContractStatusConstant = (props) => {
	const [contractStatusName, setcontractStatusName] = useState('');
	const [contractStatusNameEn, setcontractStatusNameEn] = useState('');
	const [opencontractStatus, setOpencontractStatus] = useState(true);
	const [opencontractLock, setOpencontractLock] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddcontractStatus = useCallback(() => {
		dispatch(
			setcontractStatus({
				COR_STATUS_NAME: contractStatusName ? contractStatusName : undefined,
				COR_STATUS_NAME_EN: contractStatusNameEn ? contractStatusNameEn : undefined,
				COR_STATUS_STATUS: opencontractStatus ? opencontractStatus : false,
				COR_STATUS_LOCK: opencontractLock ? opencontractLock : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getcontractStatus());
			}
		});
	}, [dispatch, contractStatusName, contractStatusNameEn, opencontractStatus]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('contractStatus')} </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={contractStatusName}
							onChange={(e) => setcontractStatusName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={contractStatusNameEn} onChange={(e) => setcontractStatusNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={opencontractStatus}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpencontractStatus(e.target.checked)}
							/>
						</div>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مغلق </CFormLabel>
							<Checkbox
								{...label}
								checked={opencontractLock}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpencontractLock(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddcontractStatus}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};
