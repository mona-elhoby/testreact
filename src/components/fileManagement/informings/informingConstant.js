import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
	setInformingCategory,
	setInformingPlace,
	setInformingProcedure,
	setInformingStatus,
	setInformingType,
} from '../../../store/reducers/constants/informings';
import translation from '../../../i18n/translate'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const InformingConstantCategory = (props) => {
	const [categoryName, setCategoryName] = useState('');
	const [categoryNameEn, setCategoryNameEn] = useState('');
	const [openCategory, setOpenCategory] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddCategory = useCallback(() => {
		dispatch(
			setInformingCategory({
				INR_CATEGORY_NAME: categoryName ? categoryName : undefined,
				INR_CATEGORY_NAME_EN: categoryNameEn ? categoryNameEn : undefined,
				INR_CATEGORY_STATUS: openCategory ? openCategory : false,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				setError(res.payload.res.data)
				props.setOpenAddSnack(true)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, categoryName, categoryNameEn, openCategory]);
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
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.INR_CATEGORY_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={categoryNameEn} onChange={(e) => setCategoryNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openCategory}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenCategory(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddCategory}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const InformingConstantPlace = (props) => {
	const [placeName, setPlaceName] = useState('');
	const [placeNameEn, setPlaceNameEn] = useState('');
	const [openPlace, setOpenPlace] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddPlaces = useCallback(() => {
		dispatch(
			setInformingPlace({
				INR_PLACE_NAME: placeName ? placeName : undefined,
				INR_PLACE_NAME_EN: placeNameEn ? placeNameEn : undefined,
				INR_PLACE_STATUS: openPlace ? openPlace : undefined,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				setError(res.payload.res.data)
				props.setOpenAddSnack(true)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, placeName, openPlace, placeNameEn]);
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
							value={placeName}
							onChange={(e) => setPlaceName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.INR_PLACE_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={placeNameEn} onChange={(e) => setPlaceNameEn(e.target.value)} id="inputEmail4" />
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
				<CButton className="btn-modal-save" color="primary" onClick={handelAddPlaces}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const InformingConstantStatus = (props) => {
	const [statusName, setStatusName] = useState('');
	const [statusNameEn, setStatusNameEn] = useState('');
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setInformingStatus({
				INR_STATUS_NAME: statusName ? statusName : undefined,
				INR_STATUS_NAME_EN: statusNameEn ? statusNameEn : undefined,
				INR_STATUS_STATUS: openStatus ? openStatus : undefined,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				setError(res.payload.res.data)
				props.setOpenAddSnack(true)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, statusName, statusNameEn, openStatus]);
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
							className={`${error?.args?.filter((ele) => ele == 'body.INR_STATUS_NAME required') ? 'is-invalid' : null}`}
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

export const InformingConstantProcedure = (props) => {
	const [ProcedureName, setProcedureName] = useState('');
	const [ProcedureNameEn, setProcedureNameEn] = useState('');
	const [openProcedure, setOpenProcedure] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddProcedure = useCallback(() => {
		dispatch(
			setInformingProcedure({
				INR_PROCEDURE_NAME: ProcedureName ? ProcedureName : undefined,
				INR_PROCEDURE_NAME_EN: ProcedureNameEn ? ProcedureNameEn : undefined,
				INR_PROCEDURE_STATUS: openProcedure ? openProcedure : undefined,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				setError(res.payload.res.data)
				props.setOpenAddSnack(true)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, ProcedureName, ProcedureNameEn, openProcedure]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('proceding')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							procedure="text"
							value={ProcedureName}
							onChange={(e) => setProcedureName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.INR_PROCEDURE_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput procedure="text" value={ProcedureNameEn} onChange={(e) => setProcedureNameEn(e.target.value)} id="inputEmail4" />
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

export const InformingConstantType = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
	const [theTypeType, setTheTypeType] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { formatMessage } = useIntl();
	const { ingormingCatetegoryList } = useSelector(
		(state) => state.informingConstraint
	);
	const handelAddType = useCallback(() => {
		dispatch(
			setInformingType({
				INR_TYPE_NAME: typeName ? typeName : undefined,
				INR_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				INR_TYPE_STATUS: openType ? openType : undefined,
				INR_CATEGORY_ID_PK: theTypeType ? theTypeType : undefined,
				INR_TYPE_CHEQUE: undefined,
			})
		).then((res) => {
			if(res.payload.res.data?.code){
				setError(res.payload.res.data)
				props.setOpenAddSnack(true)
			}else{
				props.exitSelectModal();
			} 
		});
	}, [dispatch, typeName, typeNameEn, theTypeType, openType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('type')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4">{document.body.getAttribute('dir') == 'ltr' ? `${formatMessage({id: 'informing'})} ${formatMessage({id: 'theType'})}` : ` ${formatMessage({id: 'theType'})} ${formatMessage({id: 'informing'})}`}</CFormLabel>
						<FormControl fullWidth>
							<Select
								value={theTypeType}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								onChange={(e) => setTheTypeType(e.target.value)}
                                error={!theTypeType ? true : false}
							>
								{ingormingCatetegoryList?.map((ele) => (
									<MenuItem value={ele.INR_CATEGORY_ID_PK} key={Math.random() + ele.INR_CATEGORY_ID_PK}>
										{document.body.getAttribute('dir') == 'ltr' && ele.INR_CATEGORY_NAME_EN ? ele.INR_CATEGORY_NAME_EN : ele.INR_CATEGORY_NAME}
									</MenuItem>
								))}
							</Select>
								{!theTypeType && <FormHelperText>This is required!</FormHelperText>}
						</FormControl>
					</CCol>
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
