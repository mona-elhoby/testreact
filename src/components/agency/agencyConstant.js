import React, { useState, useCallback, useEffect } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import {
	getAgent,
	setAgent,
	getAgentAttr,
	setAgentAttr,
	getAgentPlace,
	setAgentPlace,
	getAgentType,
	setAgentType,
} from '../../store/reducers/constants/agency';
import translation from '../../i18n/translate'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const AgencyConstant = (props) => {
	const [AgencyName, setAgencyName] = useState('');
	const [AgencyNameEn, setAgencyNameEn] = useState('');
	const [endAgency, setEndAgency] = useState(true);
	const [openAgency, setOpenAgency] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddAgency = useCallback(() => {
		dispatch(
			setAgent({
				AGE_AGENT_NAME: AgencyName ? AgencyName : undefined,
				AGE_AGENT_NAME_EN: AgencyNameEn ? AgencyNameEn : undefined,
				AGE_AGENT_STATUS: openAgency ? openAgency : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getAgent());
			}
		});
	}, [dispatch, AgencyName, AgencyNameEn, openAgency]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('attorny')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={AgencyName}
							onChange={(e) => setAgencyName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!AgencyName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={AgencyNameEn} onChange={(e) => setAgencyNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openAgency}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenAgency(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddAgency}>
				{translation('add')} 
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
				{translation('close')} 
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const AgencyConstantAttribute = (props) => {
	const [AttributeName, setAttributeName] = useState('');
	const [AttributeNameEn, setAttributeNameEn] = useState('');
	const [openAttribute, setOpenAttribute] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddAttribute = useCallback(() => {
		dispatch(
			setAgentAttr({
				AGE_ATTRBUIT_NAME: AttributeName ? AttributeName : undefined,
				AGE_ATTRBUIT_NAME_EN: AttributeNameEn ? AttributeNameEn : undefined,
				AGE_ATTRBUIT_STATUS: openAttribute ? openAttribute : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getAgentAttr());
			}
		});
	}, [dispatch, AttributeName, openAttribute, AttributeNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>  {translation('attribute')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={AttributeName}
							onChange={(e) => setAttributeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={AttributeNameEn} onChange={(e) => setAttributeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openAttribute}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenAttribute(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddAttribute}>
					{translation('add')} 
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')} 
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const AgencyConstantType = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddType = useCallback(() => {
		dispatch(
			setAgentType({
				AGE_TYPE_NAME: typeName ? typeName : undefined,
				AGE_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				AGE_TYPE_STATUS: openType ? openType : false,
			})
		).then((res) => {
			// console.log(res)
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getAgentType());
			}
		});
	}, [dispatch, typeName, openType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('agentType')}</CModalTitle>
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

export const AgencyConstantPlace = (props) => {
	const [PlaceName, setPlaceName] = useState('');
	const [PlaceNameEn, setPlaceNameEn] = useState('');
	const [openPlace, setOpenPlace] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddPlace = useCallback(() => {
		dispatch(
			setAgentPlace({
				FIL_Place_NAME: PlaceName ? PlaceName : undefined,
				FIL_Place_NAME_EN: PlaceNameEn ? PlaceNameEn : undefined,
				FIL_Place_STATUS: openPlace ? openPlace : false,
			})
		).then((res) => {
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				dispatch(getAgentPlace());
			}
		});
	}, [dispatch, PlaceName, PlaceNameEn, openPlace]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('authenticationPlace')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={PlaceName}
							onChange={(e) => setPlaceName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={PlaceNameEn} onChange={(e) => setPlaceNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openPlace}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenPlace(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddPlace}>
					{translation('add')} 
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')} 
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

