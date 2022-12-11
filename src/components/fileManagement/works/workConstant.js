import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';


import { setWorkReasons, setWorkStatusReasons } from '../../../store/reducers/constants/work';
import translation from '../../../i18n/translate';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const WorkConstantReason = (props) => {
	const [reasonName, setReasonsName] = useState('');
	const [reasonNameEn, setReasonsNameEn] = useState('');
	const [openReasons, setOpenReasons] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddReasons = useCallback(() => {
		dispatch(
			setWorkReasons({
				WRK_TYPE_NAME: reasonName ? reasonName : undefined,
				WRK_TYPE_NAME_EN: reasonNameEn ? reasonNameEn : undefined,
				WRK_TYPE_STATUS: openReasons ? openReasons : false,
			})
		).then((res) => {
			if(res.payload?.result?.code){
				setError(res.payload?.result)
			}else{
				props.setOpenAddSnack(true)
				props.exitSelectModal();
			} 
		});
	}, [dispatch, reasonName, openReasons, reasonNameEn]);


	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('wrkReason')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={reasonName}
							onChange={(e) => setReasonsName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.WRK_TYPE_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={reasonNameEn} onChange={(e) => setReasonsNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openReasons}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenReasons(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddReasons}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const WorkConstantStatusReason = (props) => {
	const [statusName, setStatusName] = useState('');
	const [statusNameEn, setStatusNameEn] = useState('');
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setWorkStatusReasons({
				WRK_REASON_NAME: statusName ? statusName : undefined,
				WRK_REASON_NAME_EN: statusNameEn ? statusNameEn : undefined,
				WRK_REASON_STATUS: openStatus ? openStatus : false,
			})
		).then((res) => {
			if(res.payload?.result?.code){
				setError(res.payload?.result)
			}else{
				props.setOpenAddSnack(true)
				props.exitSelectModal();
			} 
		});
	}, [dispatch, statusName, statusNameEn, openStatus]);
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
							value={statusName}
							onChange={(e) => setStatusName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.WRK_REASON_NAME required') ? 'is-invalid' : null}`}
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
