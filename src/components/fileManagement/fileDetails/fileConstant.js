import React, { useState, useCallback, useEffect } from 'react';
import { CCol, CRow, CModalBody, CModalHeader, CModal, CModalTitle, CFormLabel, CFormInput, CButton, CModalFooter } from '@coreui/react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';

import {
	getCasesType,
	getCasescategory,
	getCasescloseType,
	getCasesMediator,
	getCasesStatus,
	getCasesSource,
	getCasesSubject,
    setCasesSubject,
    setCasesSource,
    setCasesStatus,
    setCasesMediator,
    setCasescloseType,
    setCasescategory,
    setCasesType,
	getCasesCompanyOffice, setCasesCompanyOffice
} from '../../../store/reducers/constants/cases';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const CasesConstantStatus = (props) => {
	const [statusName, setStatusName] = useState('');
	const [statusNameEn, setStatusNameEn] = useState('');
	const [endStatus, setEndStatus] = useState(true);
	const [openStatus, setOpenStatus] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddStatus = useCallback(() => {
		dispatch(
			setCasesStatus({
				FIL_STATUS_NAME: statusName ? statusName : undefined,
				FIL_STATUS_NAME_EN: statusNameEn ? statusNameEn : undefined,
				FIL_STATUS_STATUS: openStatus ? openStatus : false,
				FIL_STATUS_LOCK: endStatus ? endStatus : undefined,
			})
		).then((res) => {
			if(res.payload.data?.code) {
                setError(res.payload.data)
            }  else{
                props.setOpenAddSnack(true);
                 props.exitSelectModal();
                dispatch(getCasesStatus())
            } 
		});
	}, [dispatch, statusName, statusNameEn, openStatus, endStatus]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>حاله الملف</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							type="text"
							value={statusName}
							onChange={(e) => setStatusName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={statusNameEn} onChange={(e) => setStatusNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> إقفال الملف </CFormLabel>
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
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
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
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantCategory = (props) => {
	const [categoryName, setcategoryName] = useState('');
	const [categoryNameEn, setcategoryNameEn] = useState('');
	const [opencategory, setOpencategory] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddCategory = useCallback(() => {
		dispatch(
			setCasescategory({
				FIL_CATEGORY_NAME: categoryName ? categoryName : undefined,
				FIL_CATEGORY_NAME_EN: categoryNameEn ? categoryNameEn : undefined,
				FIL_CATEGORY_STATUS: opencategory ? opencategory : false,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data)
             } else {
                props.setOpenAddSnack(true);
                 props.exitSelectModal();
                 dispatch(getCasescategory())
             } 
		});
	}, [dispatch, categoryName, opencategory, categoryNameEn]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>  تصنيف الملف</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							type="text"
							value={categoryName}
							onChange={(e) => setcategoryName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={categoryNameEn} onChange={(e) => setcategoryNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
							<Checkbox
								{...label}
								checked={opencategory}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpencategory(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddCategory}>
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantType = (props) => {
	const [typeName, setTypeName] = useState('');
	const [typeNameEn, setTypeNameEn] = useState('');
	const [openType, setOpenType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddType = useCallback(() => {
		dispatch(
			setCasesType({
				FIL_TYPE_NAME: typeName ? typeName : undefined,
				FIL_TYPE_NAME_EN: typeNameEn ? typeNameEn : undefined,
				FIL_TYPE_STATUS: openType ? openType : false,
			})
		).then((res) => {
			// console.log(res)
			if(res.payload.data?.code) {
                setError(res.payload.data)
            } else {
                props.setOpenAddSnack(true); props.exitSelectModal();
                dispatch(getCasesType())
            } 
		});
	}, [dispatch, typeName, openType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle> نوع الملف</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
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
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={typeNameEn} onChange={(e) => setTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
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
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantCompanyOffice = (props) => {
	const [CompanyOfficeName, setCompanyOfficeName] = useState('');
	const [CompanyOfficeNameEn, setCompanyOfficeNameEn] = useState('');
	const [openCompanyOffice, setOpenCompanyOffice] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const handelAddCompanyOffice = useCallback(() => {
		dispatch(
			setCasesCompanyOffice({
				OFC_NAME_NAME: CompanyOfficeName ? CompanyOfficeName : undefined,
				OFC_NAME_NAME_EN: CompanyOfficeNameEn ? CompanyOfficeNameEn : undefined,
				OFC_NAME_STATUS: openCompanyOffice ? openCompanyOffice : false,
			})
		).then((res) => {
			// console.log(res)
			if(res.payload.data?.code) {
                setError(res.payload.data)
            } else {
                props.setOpenAddSnack(true); props.exitSelectModal();
                dispatch(getCasesCompanyOffice())
            } 
		});
	}, [dispatch, CompanyOfficeName, openCompanyOffice]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>  المكتب المكلف</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							CompanyOffice="text"
							value={CompanyOfficeName}
							onChange={(e) => setCompanyOfficeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${!CompanyOfficeName ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput CompanyOffice="text" value={CompanyOfficeNameEn} onChange={(e) => setCompanyOfficeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
							<Checkbox
								{...label}
								checked={openCompanyOffice}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenCompanyOffice(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddCompanyOffice}>
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantsource = (props) => {
	const [sourceName, setsourceName] = useState('');
	const [sourceNameEn, setsourceNameEn] = useState('');
	const [opensource, setOpensource] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddsource = useCallback(() => {
		dispatch(
			setCasesSource({
				FIL_SOURCE_NAME: sourceName ? sourceName : undefined,
				FIL_SOURCE_NAME_EN: sourceNameEn ? sourceNameEn : undefined,
				FIL_SOURCE_STATUS: opensource ? opensource : false,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data) 
             }else {
                props.setOpenAddSnack(true); props.exitSelectModal();
                dispatch(getCasesSource())
             }
		});
	}, [dispatch, sourceName, sourceNameEn, opensource]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>مصدر الملف </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							type="text"
							value={sourceName}
							onChange={(e) => setsourceName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={sourceNameEn} onChange={(e) => setsourceNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
							<Checkbox
								{...label}
								checked={opensource}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpensource(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddsource}>
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantsubject = (props) => {
	const [subjectName, setsubjectName] = useState('');
	const [subjectNameEn, setsubjectNameEn] = useState('');
	const [opensubject, setOpensubject] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddsubject = useCallback(() => {
		dispatch(
			setCasesSubject({
				FIL_SUBJECT_NAME: subjectName ? subjectName : undefined,
				FIL_SUBJECT_NAME_EN: subjectNameEn ? subjectNameEn : undefined,
				FIL_SUBJECT_STATUS: opensubject ? opensubject : false,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data) 
             }else {
                props.setOpenAddSnack(true); props.exitSelectModal();
                dispatch(getCasesSubject())
             }
		});
	}, [dispatch, subjectName, subjectNameEn, opensubject]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>مصدر الملف </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							type="text"
							value={subjectName}
							onChange={(e) => setsubjectName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={subjectNameEn} onChange={(e) => setsubjectNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
							<Checkbox
								{...label}
								checked={opensubject}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpensubject(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddsubject}>
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantMediator = (props) => {
	const [meditorName, setmeditorName] = useState('');
	const [meditorNameEn, setmeditorNameEn] = useState('');
	const [openmeditor, setOpenmeditor] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddmeditor = useCallback(() => {
		dispatch(
			setCasesMediator({
				FIL_MEDITOR_NAME: meditorName ? meditorName : undefined,
				FIL_MEDITOR_NAME_EN: meditorNameEn ? meditorNameEn : undefined,
				FIL_MEDITOR_STATUS: openmeditor ? openmeditor : false,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data) 
             }else {
                props.setOpenAddSnack(true); props.exitSelectModal();
                dispatch(getCasesMediator())
             }
		});
	}, [dispatch, meditorName, meditorNameEn, openmeditor]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>وسيط الملف </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							type="text"
							value={meditorName}
							onChange={(e) => setmeditorName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={meditorNameEn} onChange={(e) => setmeditorNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
							<Checkbox
								{...label}
								checked={openmeditor}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpenmeditor(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddmeditor}>
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

export const CasesConstantCloseType = (props) => {
	const [closeTypeName, setcloseTypeName] = useState('');
	const [closeTypeNameEn, setcloseTypeNameEn] = useState('');
	const [opencloseType, setOpencloseType] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const handelAddcloseType = useCallback(() => {
		dispatch(
			setCasescloseType({
				FIL_CLOSE_TYPE_NAME: closeTypeName ? closeTypeName : undefined,
				FIL_CLOSE_TYPE_NAME_EN: closeTypeNameEn ? closeTypeNameEn : undefined,
				FIL_CLOSE_TYPE_STATUS: opencloseType ? opencloseType : false,
			})
		).then((res) => {
			if(res.payload.data?.code){
                setError(res.payload.data) 
             }else {
                props.setOpenAddSnack(true); props.exitSelectModal();
                dispatch(getCasescloseType())
             }
		});
	}, [dispatch, closeTypeName, closeTypeNameEn, opencloseType]);
	return (
		<CModal visible={true} onClose={() => props.exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>مصدر الملف </CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم</CFormLabel>
						<CFormInput
							type="text"
							value={closeTypeName}
							onChange={(e) => setcloseTypeName(e.target.value)}
							id="inputEmail4"
							required
							className={`${error?.args?.filter((ele) => ele == 'body.FIL_STATUS_NAME required') ? 'is-invalid' : null}`}
						/>
					</CCol>
					<CCol sm={12}>
						<CFormLabel htmlFor="inputEmail4"> الإسم بالإنجليزيه</CFormLabel>
						<CFormInput type="text" value={closeTypeNameEn} onChange={(e) => setcloseTypeNameEn(e.target.value)} id="inputEmail4" />
					</CCol>
					<CCol sm={12}>
						<div>
							<CFormLabel htmlFor="inputEmail4"> مفعل </CFormLabel>
							<Checkbox
								{...label}
								checked={opencloseType}
								sx={{
									color: '#4527a0',
									'&.Mui-checked': {
										color: '#5e35b1',
									},
								}}
								onChange={(e) => setOpencloseType(e.target.checked)}
							/>
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton className="btn-modal-save" color="primary" onClick={handelAddcloseType}>
					إضافه
				</CButton>
				<CButton color="danger" className="btn-modal-close" onClick={props.exitSelectModal}>
					إغلاق
				</CButton>
			</CModalFooter>
		</CModal>
	);
};

