import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';


import { setTaskType, getTaskType } from '../../../store/reducers/constants/task';
import translation from '../../../i18n/translate'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const TaskConstantType = (props) => {
	const [TypeName, setTypeName] = useState('');
	const [TypeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
    const [taskPrice, setTaskPrice] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddTypes = useCallback(() => {
		dispatch(
			setTaskType({
				TSK_TYPE_NAME: TypeName ? TypeName : undefined,
				TSK_TYPE_NAME_EN: TypeNameEn ? TypeNameEn : undefined,
				TSK_TYPE_STATUS: openType ? openType : undefined,
                TSK_TYPE_PRICE: taskPrice ? taskPrice : undefined
			})
		).then((res) => {
			if(res.payload?.res?.data?.code){
                setError(res.payload.res.data) 
            } else{
                props.exitSelectModal()
                dispatch(getTaskType())
				props.setOpenAddSnack(true);
            }
		});
	}, [dispatch, TypeName, openType, TypeNameEn]);
	return (
		<div>
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('add')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							type="text"
							value={TypeName}
							onChange={(e) => setTypeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!TypeName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')} </CFormLabel>
						<CFormInput type="text" value={TypeNameEn} onChange={(e) => setTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('amount')}</CFormLabel>
						<CFormInput type="number" value={taskPrice} onChange={(e) => setTaskPrice(e.target.value)} id="inputEmail4" />
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
				<CButton className="btn-modal-save" color="primary" onClick={handelAddTypes}>
				{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
				{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
		</div>
	);
};