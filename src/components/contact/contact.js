import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';


import { setNationality, setCompanyTypeData } from '../../store/reducers/constants/contact';
import translation from "../../i18n/translate"


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const NationalityConstant = (props) => {
	const [nationalityName, setNationalityName] = useState('');
	const [nationalityNameEn, setNationalityNameEn] = useState('');
	const [openNationality, setOpenNationality] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddNationality = useCallback(() => {
		dispatch(
			setNationality({
				NAT_NAME: nationalityName ? nationalityName : undefined,
				NAT_NAME_EN: nationalityNameEn ? nationalityNameEn : undefined,
				NAT_STATUS: openNationality ? openNationality : undefined,
			})
		).then((res) => {
			res.payload.res.data?.code ? setError(res.payload.res.data) : props.exitSelectModal();
		});
	}, [dispatch, nationalityName, openNationality, nationalityNameEn]);


	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('nationality')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={nationalityName}
							onChange={(e) => setNationalityName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.NAT_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={nationalityNameEn} onChange={(e) => setNationalityNameEn(e.target.value)} />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openNationality}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenNationality(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddNationality}>
				{translation('add')} 
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
				{translation('close')} 
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CompanyTypeConstant = (props) => {
	const [companyTypeName, setCompanyTypeName] = useState('');
	const [companyTypeNameEn, setCompanyTypeNameEn] = useState('');
	const [openCompanyType, setOpenCompanyType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddCompanyType = useCallback(() => {
		dispatch(
			setCompanyTypeData({
				CLI_COMPANYTYPE_NAME: companyTypeName ? companyTypeName : undefined,
				CLI_COMPANYTYPE_NAME_EN: companyTypeNameEn ? companyTypeNameEn : undefined,
				CLI_COMPANYTYPE_STATUS: openCompanyType ? openCompanyType : undefined,
			})
		).then((res) => {
			console.log(res.payload)
			res.payload.res.data?.code ? setError(res.payload.res.data) : props.exitSelectModal();
		});
	}, [dispatch, companyTypeName, companyTypeNameEn, openCompanyType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('companyType')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={companyTypeName}
							onChange={(e) => setCompanyTypeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.CLI_COMPANYTYPE_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={companyTypeNameEn} onChange={(e) => setCompanyTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4">  {translation('active')}  </CFormLabel>
							<Checkbox
								{...label}
								checked={openCompanyType}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenCompanyType(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddCompanyType}>
				{translation('add')} 
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
				{translation('close')} 
				</CButton>
			</CModalFooter>
		</CModal>
	);
};
