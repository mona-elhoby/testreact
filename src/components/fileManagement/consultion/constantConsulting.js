import React, {useState, useCallback} from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';

import { setConsultionsType, getConsultionsType } from '../../../store/reducers/constants/consultion';
import translation from '../../../i18n/translate';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const ConsultionConstantType = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
	const [price, setprice] = useState('');
	const [theTypeType, setTheTypeType] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddType = useCallback(() => {
		dispatch(
			setConsultionsType({
				CON_TYPE_NAME: typeName ? typeName : undefined,
				CON_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				CON_TYPE_PRICE: price ? price : undefined,
				CON_TYPE_STATUS: theTypeType ? theTypeType : false,
			})
		).then((res) => {
			console.log(res.payload);
			if (res.payload.data?.code) {
				setError(res.payload.data);
			} else {
				props.exitSelectModal();
				props.setOpenAddSnack(true);
				dispatch(getConsultionsType());
			}
		});
	}, [dispatch, typeName, typeNameEn, theTypeType, price]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> {translation('add')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>{console.log("error: ", error)}
						<CFormInput
							type="text"
							value={typeName}
							onChange={(e) => setTypeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.CON_TYPE_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={typeNameEn} onChange={(e) => setTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('amount')}</CFormLabel>
						<CFormInput type="number" value={price} onChange={(e) => setprice(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={theTypeType}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setTheTypeType(e.target.checked)}
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
