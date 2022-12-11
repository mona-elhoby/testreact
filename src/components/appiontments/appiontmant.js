import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';


import { setApionType } from '../../store/reducers/theConstants';
import translation from '../../i18n/translate'


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const AppiontmentConstant = (props) => {
	const [appiontmentName, setAppiontmentName] = useState('');
	const [appiontmentNameEn, setAppiontmentNameEn] = useState('');
	const [openAppiontment, setOpenAppiontment] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddAppiontment = useCallback(() => {
		dispatch(
			setApionType({
				APP_TYPE_NAME: appiontmentName ? appiontmentName : undefined,
				APP_TYPE_NAME_EN: appiontmentNameEn ? appiontmentNameEn : undefined,
				APP_TYPE_STATUS: openAppiontment ? openAppiontment : undefined,
			})
		).then((res) => {
			// console.log(res.payload.res.data.code)
			if(res.payload.res.data?.code){
				setError(res.payload.res.data)
			}else{
				props.setOpenAddSnack(true)
				props.exitSelectModal();
			}  
		});
	}, [dispatch, appiontmentName, openAppiontment, appiontmentNameEn]);


	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('reason')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={appiontmentName}
							onChange={(e) => setAppiontmentName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.APP_TYPE_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={appiontmentNameEn} onChange={(e) => setAppiontmentNameEn(e.target.value)} />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openAppiontment}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenAppiontment(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddAppiontment}>
				{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
				{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

