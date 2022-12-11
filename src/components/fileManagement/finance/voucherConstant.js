import React, { useState, useCallback } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';


import { setVoucherType, getVoucherType, getVoucherReason, setVoucherReason, getVoucherStatus, setVoucherStatus, getTheBank, setTheBank } from '../../../store/reducers/constants/voucher';
import translation from '../../../i18n/translate';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const VoucherConstantType = (props) => {
	const [TypeName, setTypeName] = useState('');
	const [TypeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
    const [vocherCategory, setVocherCategory] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddTypes = useCallback(() => {
		dispatch(
			setVoucherType({
				PAY_TYPE_NAME: TypeName ? TypeName : undefined,
				PAY_TYPE_NAME_EN: TypeNameEn ? TypeNameEn : undefined,
				PAY_TYPE_STATUS: openType ? openType : undefined,
                PAY_CATEGORY: vocherCategory ? vocherCategory : undefined
			})
		).then((res) => {
			// console.log("res.payload: ", res.payload)
			if(res.payload.data?.code){
                setError(res.payload.data) 
            } else{
                props.exitSelectModal()
				props.setOpenAddSnack(true)
                dispatch(getVoucherType())
            }
		});
	}, [dispatch, TypeName, openType, TypeNameEn, vocherCategory]);
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
							value={TypeName}
							onChange={(e) => setTypeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!TypeName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={TypeNameEn} onChange={(e) => setTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('payMethod')} </CFormLabel>
						<FormControl fullWidth>
							<Select
								value={vocherCategory}
								displayEmpty
								inputProps={{ 'aria-label': 'Without label' }}
								onChange={(e) => setVocherCategory(e.target.value)}
                                error={!vocherCategory ? true : false}
							>
								{[{id:0, name:"نقداً"}, {id:1, name:"شيك"},{id:2, name:"تحويل نقدى"}]?.map((ele) => (
									<MenuItem value={ele.name} key={Math.random() + ele.name}>
										{ele.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
	);
};

export const VoucherConstantReason = (props) => {
	const [ReasonName, setReasonName] = useState('');
	const [ReasonNameEn, setReasonNameEn] = useState('');
	const [openReason, setOpenReason] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddReasons = useCallback(() => {
		dispatch(
			setVoucherReason({
				PAY_REASON_NAME: ReasonName ? ReasonName : undefined,
				PAY_REASON_NAME_EN: ReasonNameEn ? ReasonNameEn : undefined,
				PAY_REASON_STATUS: openReason ? openReason : undefined,
			})
		).then((res) => {
			// console.log("res.payload: ", res.payload)
			if(res.payload.data?.code){
                setError(res.payload.data) 
            } else{
                props.exitSelectModal()
				props.setOpenAddSnack(true)
                dispatch(getVoucherReason())
            }
		});
	}, [dispatch, ReasonName, openReason, ReasonNameEn]);
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
							Reason="text"
							value={ReasonName}
							onChange={(e) => setReasonName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!ReasonName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={ReasonNameEn} onChange={(e) => setReasonNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openReason}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenReason(e.target.checked)}
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

export const VoucherConstantStatus = (props) => {
	const [StatusName, setStatusName] = useState('');
	const [StatusNameEn, setStatusNameEn] = useState('');
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setVoucherStatus({
				PAY_STATUS_NAME: StatusName ? StatusName : undefined,
				PAY_STATUS_NAME_EN: StatusNameEn ? StatusNameEn : undefined,
				PAY_STATUS_STATUS: openStatus ? openStatus : undefined,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data) 
            } else{
                props.exitSelectModal()
				props.setOpenAddSnack(true)
                dispatch(getVoucherStatus())
            }
		});
	}, [dispatch, StatusName, openStatus, StatusNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('voucherStatus')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							Status="text"
							value={StatusName}
							onChange={(e) => setStatusName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!StatusName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={StatusNameEn} onChange={(e) => setStatusNameEn(e.target.value)} id="inputEmail4" />
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

export const AddBank = (props) => {
	const [bankName, setbankName] = useState('');
	const [bankNameEn, setbankNameEn] = useState('');
	const [openbank, setOpenbank] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddbank = useCallback(() => {
		dispatch(
			setTheBank({
				BNK_NAME: bankName ? bankName : undefined,
				BNK_NAME_EN: bankNameEn ? bankNameEn : undefined,
				BNK_STATUS: openbank ? openbank : undefined,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data) 
            } else{
                props.exitSelectModal()
				props.setOpenAddSnack(true)
                dispatch(getTheBank())
            }
		});
	}, [dispatch, bankName, openbank, bankNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>{translation('bank')}</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('name')}</CFormLabel>
						<CFormInput
							bank="text"
							value={bankName}
							onChange={(e) => setbankName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!bankName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('nameEn')}</CFormLabel>
						<CFormInput type="text" value={bankNameEn} onChange={(e) => setbankNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> {translation('active')} </CFormLabel>
							<Checkbox
								{...label}
								checked={openbank}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenbank(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddbank}>
					{translation('add')}
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);
};