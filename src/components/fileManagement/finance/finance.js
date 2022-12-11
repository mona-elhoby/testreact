import React, { useState, useRef, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router-dom';
import {
	CRow,
	CCol,
	CAlert,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CButton,
	CFormInput,
	CFormFeedback,
	CFormTextarea,
	CTable, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell
} from '@coreui/react';
import { cilSpreadsheet, cilPlus, cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, FormHelperText} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useIntl } from 'react-intl';

import { InvoiceCard } from './invoiceCard';
import {
	getAllInvoices,
	getInvoice,
	addInvoice,
	updateInvoice,
	deleteInvoice,
	getInvoiceAttachment,
	getInvoiceAttachmentData,
	deleteAttachment,
} from '../../../store/reducers/invoice';
import { getContracts } from '../../../store/reducers/contract';
import { getInformingsData } from '../../../store/reducers/informings';
import { getAllStages } from '../../../store/reducers/stage';
import { getWarningsData } from '../../../store/reducers/warnings';
import { getAllvouchers, getThevoucher, deletevoucher } from '../../../store/reducers/voucher';
import AttachedHeadTable from '../../../features/attachedFileHaed';
import AttachedPopup from '../../../features/attachment';
import ReceiptVoucher from './receiptVoucher';
import DeletePopup from '../../../features/delete';
import translation from '../../../i18n/translate';


function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

const FileConsulting = () => {
	const [visible, setVisible] = useState(false);
	const [searchVal, setSearchVal] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [searchedDiv2, setSearchedDiv2] = useState(null);
	const [invoiceDate, setInvoiceDate] = useState('');
	const [employee, setEmployee] = useState('');
	const [invoiceNum, setInvoiceNum] = useState('');
	const [selectedCriteria, setSelectedCriteria] = useState(null);
	const [editCriterai, setEditCriterai] = useState(null);
	const [attached, setAttached] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [OpenEditSnack, setOpenEditSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [OpenAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [contractType, setContractType] = useState('');
	const [stageNum, setStageNum] = useState('');
	const [notes, setNotes] = useState('');
	const [allInvoice, setAllInvoice] = useState('');
	const [theTax, setTheTax] = useState('');
	const [thePaid, setThePaid] = useState('');
	const [theRemaining, setTheRemaining] = useState('');
	const [voucherPopupAdd, setVoucherPopupAdd] = useState(false);
	const [selectedVoucher, setSelectedVoucher] = useState(null);
	const [editVoucher, setEditVoucher] = useState(null);
	const [notesEn, setNotesEn] = useState('');
	const ref0 = useRef();
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [divId, setDivId] = useState(Date.now());
	const [VoucherInvoiceAdd, setVoucherInvoiceAdd] = useState(false);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedId, setDeletedId] = useState(null);
	const [visibleDeleteVoucherModal, setVisibleDeleteVoucherModal] = useState(false);
	const [deletedVoucherId, setDeletedVoucherId] = useState(null);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const [attachment, setAttachment] = useState('');
	const [constantAdd, setConstantAdd] = useState('');
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const { id } = useParams();
	const { formatMessage } = useIntl();
	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { allInvoices } = useSelector((state) => state.invoices);
	const { allContrcts } = useSelector((state) => state.contract);
	const { allInformings } = useSelector((state) => state.informing);
	const { allWarnings } = useSelector((state) => state.warning);
	const { theAllStages } = useSelector((state) => state.stage);
	const { allvouchers } = useSelector((state) => state.Voucher);

	const [error, setError] = useState(null);
	const theme = useTheme();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getContracts({ theParams: { limit: '50' } }));
		dispatch(getInformingsData({ theParams: { id: id } }));
		dispatch(getAllStages({ theparams: { id: id, limit: '50' } }));
		dispatch(getAllInvoices({ theParams: { id: id } }));
		dispatch(getAllvouchers({ theParams: { id: id } }));
		dispatch(getWarningsData({ theParams: { id: id } }));
	}, []);

	const searchByChar = (e) => {
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv2(null);
		} else {
			const newClassifiedArr = allvouchers?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr)
			const newClassifiedArr2 = allInvoices?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv2(newClassifiedArr2);
		}
	};

	const classifiedFun = () => {
		// dispatch(
		// 	getWarningsData({
		// 		theParams: {
		// 			warNumSearch: warNumSearch ? warNumSearch : undefined,
		// 			warSearchDateFrom: warSearchDateFrom ? warSearchDateFrom : undefined,
		// 			warSearchDateTo: warSearchDateTo ? warSearchDateTo : undefined,
		// 			searchVal: searchVal ? searchVal : undefined,
		// 			id: id ? id : undefined,
		// 		},
		// 	})
		// );
	};

	const handelSearchbtn = (e) => {
		if (e.key === 'Enter') {
			classifiedFun();
		}
	};
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setClassifiedName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const exitSelectModal = () => {
		setVisible(false);
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVoucherPopupAdd(false);
	};

	const handelChangeProcedureDivs = (e, id) => {
		let newArrOfDivs = arrayOfDivs;
		if (e.target.name == 'inoivceAmount') {
			// console.log(Number(newArrOfDivs.find((item) => item.id === id)?.taxRate) / 100);
			newArrOfDivs.find((item) => item.id === id)['taxValue'] = (
				(Number(e.target.value) * Number(newArrOfDivs.find((item) => item.id === id)?.taxRate)) /
				100
			).toFixed(3);
			newArrOfDivs.find((item) => item.id === id)['theInvoiceAmount'] =
				Number(newArrOfDivs.find((item) => item.id === id)?.taxValue) + Number(e.target.value);
			newArrOfDivs.find((item) => item.id === id)[e.target.name] = e.target.value;
			setArrayOfDivs(newArrOfDivs);
		} else if (e.target.name == 'taxRate') {
			// console.log(Number(e.target.value));
			const rate = Number(e.target.value);
			newArrOfDivs.find((item) => item.id === id)['taxValue'] = (
				Number(newArrOfDivs.find((item) => item.id === id)?.inoivceAmount) *
				(Number(e.target.value) / 100)
			).toFixed(3);
			newArrOfDivs.find((item) => item.id === id)['theInvoiceAmount'] =
				Number(newArrOfDivs.find((item) => item.id === id)?.taxValue) + Number(newArrOfDivs.find((item) => item.id === id)?.inoivceAmount);
			newArrOfDivs.find((item) => item.id === id)[e.target.name] = e.target.value;
			setArrayOfDivs(newArrOfDivs);
		} else {
			newArrOfDivs.find((item) => item.id === id)[e.target.name] = e.target.value;
			setArrayOfDivs(newArrOfDivs);
		}
		setArrayOfDivs([...newArrOfDivs]);
	};
	const handelChangeProcedureStage = (e, value, id) => {
		let newArrOfDivs = arrayOfDivs;
		newArrOfDivs.find((item) => item.id === id)[ref0.current.getAttribute('name')] = value;
		setArrayOfDivs(newArrOfDivs);
	};
	const handelAddMoreInvoice = () => {
		setArrayOfDivs([
			...arrayOfDivs,
			{ id: divId + 1, stageNum: '', inoivceDetail: '', inoivceAmount: '', taxRate: '', taxValue: '', theInvoiceAmount: '' },
		]);
		setDivId(divId + 1);
	};

	//remove selected div
	const removeSelectedDiv = (e, id) => {
		setArrayOfDivs((prevState) => {
			let newArr = prevState?.filter((item) => item.id !== id);
			return newArr;
		});
	};
	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(2);
		setAttacmentId(id);
	};
	const handleDeleteAttachment = (id, criteriaId) => {
		// console.log(id);
		setVisibleDeleteModal(true);
		setDeleteAttacmentId(id);
		setCriteriaForDeletedAttached(criteriaId);
	};

	const deleteTheAttachment = () => {
		dispatch(deleteAttachment({ id: criteriaForDeletedAttached, deletedId: deleteAttacmentId })).then((res) => {
			if (res?.payload?.res?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
				dispatch(getInvoiceAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	//  modal
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className="finance-modal">
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilSpreadsheet} customClassName="nav-icon" />
					{editCriterai || selectedCriteria ? (
						<span>
							{translation('fileNum')} {selectedCriteria?.CAS_NUMBER || editCriterai?.CAS_NUMBER}
						</span>
					) : (
						<span>{translation('add')} </span>
					)}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				{/* {console.log(allAppiontments,sortAppiontment ,)} */}
				<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('invoiceNum')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.INV_NUMBER ? selectedCriteria.INV_NUMBER : translation('notFound')}</p>
						) : (
							<CFormInput
								type="number"
								defaultValue={invoiceNum}
								onChange={(e) => setInvoiceNum(e.target.value)}
								required
								className={`${!invoiceNum ? 'is-invalid' : null}`}
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel>{translation('invoiceDate')} </CFormLabel>
						{selectedCriteria ? (
							<p style={{ width: '45%' }}>
								{selectedCriteria ? new Date(selectedCriteria?.INV_DATE).toLocaleDateString() : translation('notFound')}
							</p>
						) : (
							<FormControl fullWidth>
								<CFormInput
									type="date"
									value={invoiceDate}
									id="inputEmail4"
									required
									className={`${!invoiceDate ? 'is-invalid' : null}`}
									onChange={(e) => setInvoiceDate(e.target.value)}
									style={{ width: '100% !important' }}
								/>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('contractNum')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.COR_ID_PK ? selectedCriteria.COR_ID_PK : translation('notFound')}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									value={contractType}
									onChange={(e) => setContractType(e.target.value)}
									error={error?.args?.filter((ele) => ele == 'body.COR_ID_PK is required') ? true : false}
								>
									{allContrcts?.data?.map((ele) => (
										<MenuItem value={ele.COR_ID_PK} key={Math.random() + ele.COR_ID_PK}>
											{ele.COR_NUMBER}
										</MenuItem>
									))}
								</Select>
								{error?.args?.find((ele) => ele == 'body.COR_ID_PK is required') ? <FormHelperText>Required !</FormHelperText> : null}
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('fileNum')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.CAS_NUM ? selectedCriteria.CAS_NUM : translation('notFound')}</p>
						) : (
							<CFormInput
								disabled
								type="text"
								value={selectedCase?.CAS_NUM}
								onChange={(e) => console.log(e.target.value)}
								required
								// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('principal')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.CLI_NAME ? selectedCriteria.CLI_NAME : translation('notFound')}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setEmployee(e.target.value)}
									value={employee}
									error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
								>
									{selectedCase?.clients?.map((ele, i) => {
										return (
											ele?.CLI_TYPE_ID_PK == 2 && (
												<MenuItem
													key={Math.random() + i}
													value={
														document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISH
															? ele?.CLI_NAME_ENGLISH
															: ele?.CLI_NAME
													}
													style={employee ? getStyles(ele, employee, theme) : null}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISH ? ele?.CLI_NAME_ENGLISH : ele.CLI_NAME}
												</MenuItem>
											)
										);
									})}
								</Select>
								{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.INV_NOTE ? selectedCriteria.INV_NOTE : translation('notFound')}</p>
						) : (
							<CFormTextarea rows={8} value={notes} onChange={(e) => setNotes(e.target.value)} />
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('notesEn')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.INV_NOTE_EN ? selectedCriteria.INV_NOTE_EN : translation('notFound')}</p>
						) : (
							<CFormTextarea rows={8} value={notesEn} onChange={(e) => setNotesEn(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						{editCriterai || selectedCriteria ? (<>
							<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(2)}>
								{translation('attachments')}
								{editCriterai?.INV_ID_PK ? (
									<CIcon
										size={'sm'}
										icon={cilPlus}
										customClassName="nav-icon"
										style={{ height: '16px', width: '16px' }}
										onClick={() => handelAddAttachment(editCriterai?.INV_ID_PK)}
									/>
								) : null}
							</CFormLabel>
						
						{selectedCriteria?._FILE > 0 || editCriterai?._FILE > 0 ? (
							<CTable bordered>
								<AttachedHeadTable />
								<CTableBody>
									{attachment?.map((ele, i) => (
										<CTableRow
											key={i}
										>
											<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
											<CTableDataCell 
											onClick={() => {
												dispatch(
													getInvoiceAttachmentData({
														id: selectedCriteria?.INV_ID_PK || editCriterai?.INV_ID_PK,
														attachedId: ele?.ATH_ID_PK,
														fileName: ele?.ATH_NAME,
													})
												).then((res) => {
													if (res?.payload.status == 404) {
														// console.log(res);
														setOpenAttachedSnack(true);
													}
												});
											}}
											style={{ cursor: 'pointer' }}>{ele?.ATH_NAME}</CTableDataCell>
											<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
											<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
											<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
											<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
											{editCriterai?.INV_ID_PK ? (
												<CTableDataCell>
													<CButton color={'danger'} onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editCriterai?.INV_ID_PK)}>
														<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
													</CButton>
												</CTableDataCell>
											) : null}
										</CTableRow>
									))}
								</CTableBody>
							</CTable>
						) : (
							<p>{translation('notFound')}</p>
						)}</>) : null}
					</CCol>
					<CCol md={12}>
						<form id="form1">
							<div className="divTable">
								<div className="headRow">
									<div className="divCell" align="center">
										{translation('number')}
									</div>
									<div className="divCell" align="center">
										{translation('details')}
									</div>
									<div className="divCell" align="center">
										{translation('amount')}
									</div>
									<div className="divCell" align="center">
										{translation('percentTax')}
									</div>
									<div className="divCell" align="center">
										{translation('tax')}
									</div>
									<div className="divCell" align="center">
										{translation('invoiceAmount')}
									</div>
								</div>
								{arrayOfDivs?.map((ele) => (
									<InvoiceCard
										key={ele.id}
										val1={ele.stageNum}
										onChange1={(e, value) => handelChangeProcedureStage(e, value, ele.id)}
										val2={ele.inoivceDetail}
										onChange2={(e) => handelChangeProcedureDivs(e, ele.id)}
										val3={ele.inoivceAmount}
										onChange3={(e) => handelChangeProcedureDivs(e, ele.id)}
										val4={ele.taxRate}
										onChange4={(e) => handelChangeProcedureDivs(e, ele.id)}
										val5={ele.taxValue}
										// onChange5={e=>handelChangeProcedureDivs(e, ele.id)}
										val6={ele.theInvoiceAmount}
										// onChange6={e=>handelChangeProcedureDivs(e, ele.id)}
										name1="stageNum"
										name6="theInvoiceAmount"
										name5="taxValue"
										name4="taxRate"
										name3="inoivceAmount"
										name2="inoivceDetail"
										data1={theAllStages.data}
										data2={allInformings.data}
										data3={allWarnings.data}
										ref0={ref0}
										handelRemoveDiv={(e) => removeSelectedDiv(e, ele.id)}
									/>
								))}

								<CIcon
									style={{ height: '16px', float: 'left', cursor: 'pointer' }}
									icon={cilPlus}
									customClassName="nav-icon"
									onClick={handelAddMoreInvoice}
								/>
							</div>
						</form>
					</CCol>
					<CCol md={6}>
						<div className="invoiceFooter">
							<CFormLabel htmlFor="inputEmail4"> {translation('total')} : </CFormLabel>
							{selectedCriteria ? (
								<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : translation('notFound')}</p>
							) : (
								<CFormInput
									type="text"
									value={arrayOfDivs?.reduce((acc, curr) => Number(curr['theInvoiceAmount']) + acc, 0).toFixed(3)}
									onChange={(e) => setAllInvoice(e.target.value)}
									readOnly
								/>
							)}
						</div>
						<div className="invoiceFooter">
							<CFormLabel htmlFor="inputEmail4">{translation('taxes')} : </CFormLabel>
							{selectedCriteria ? (
								<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : translation('notFound')}</p>
							) : (
								<CFormInput
									type="text"
									value={arrayOfDivs?.reduce((acc, curr) => Number(curr['taxValue']) + acc, 0).toFixed(3)}
									onChange={(e) => setTheTax(e.target.value)}
									readOnly
								/>
							)}
						</div>
						<div className="invoiceFooter">
							<CFormLabel htmlFor="inputEmail4">{translation('pay')} : </CFormLabel>
							{selectedCriteria ? (
								<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : translation('notFound')}</p>
							) : (
								<CFormInput
									type="text"
									defaultValue={thePaid}
									onChange={(e) => setThePaid(e.target.value)}
									required
									// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
								/>
							)}
						</div>
						<div className="invoiceFooter">
							<CFormLabel htmlFor="inputEmail4"> {translation('remain')} : </CFormLabel>
							{selectedCriteria ? (
								<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : translation('notFound')}</p>
							) : (
								<CFormInput
									type="text"
									defaultValue={theRemaining}
									onChange={(e) => setTheRemaining(e.target.value)}
									required
									// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
								/>
							)}
						</div>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				{selectedCriteria ? null : editCriterai ? (
					<CButton className="btn-modal-save" color="primary" onClick={handelSaveInvoice}>
						{translation('saveChanges')}
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={handelAddNewItem}>
						{translation('add')}
					</CButton>
				)}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const emptyInputsVals = () => {
		setInvoiceDate('');
		setEmployee('');
		setInvoiceNum('');
		setInvoiceDate('');
		setContractType('');
		setEmployee('');
		setAllInvoice('');
		setTheTax('');
		setThePaid('');
		setTheRemaining('');
		setArrayOfDivs([]);
		setNotes('');
		setNotesEn('');
	};
	const claseAllsnacks = () => {
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenAttachedSnack(false);
		setVoucherInvoiceAdd(false);
		emptyInputsVals();
		setSelectedCriteria(null);
		setEditCriterai(null);
	};
	//open get popup by id
	const openAddPopup = () => {
		claseAllsnacks();
		setVisible(true);
	};
	const openAddVoucherPopup = () => {
		claseAllsnacks();
		setVoucherPopupAdd(true);
	};
	const showData = (id) => {
		dispatch(getInvoice(id))
			.then((res) => setSelectedCriteria(res.payload))
			.then(() => {
				dispatch(getInvoiceAttachment(id)).then((res) => setAttachment(res.payload));
			});
	};
	const handelAddNewItem = () => {
		// Number Procedure compo
		const newArr = [
			...theAllStages?.data?.map((ele) => ({ ref: 0, id: ele.STG_ID_PK, number: `قضيه رقم ${ele.STG_NUMBER}` })),
			...allInformings?.data?.map((ele) => ({ ref: 2, id: ele.INR_ID_PK, number: `بلاغ رقم ${ele.WRN_NUMBER}` })),
			...allWarnings?.data?.map((ele) => ({ ref: 1, id: ele.WRN_ID_PK, number: `إنذار رقم ${ele.INR_NUMBER}` })),
		];
		// console.log(newArr);
		dispatch(
			addInvoice({
				INV_NUMBER: Number(invoiceNum),
				INV_DATE: invoiceDate ? invoiceDate : undefined,
				CAS_ID_PK: selectedCase?.CAS_ID_PK,
				CLI_ID_PK: employee
					? selectedCase?.clients?.find((ele) => (ele?.CLI_TYPE_ID_PK == 2 && ele?.CLI_NAME) || ele?.CLI_NAME_ENGLISH == employee)?.CLI_ID_PK
					: undefined,
				COR_ID_PK: contractType ? contractType : undefined,
				INV_NOTE: notes ? notes : undefined,
				INV_NOTE_EN: notesEn ? notesEn : undefined,
				DT_ITEMS: arrayOfDivs?.map((ele) => ({
					ID_PK: newArr.find((ele2) => ele.stageNum == ele2.number)?.id, // why required
					DESCRIPTION: ele.inoivceDetail,
					AMOUNT: Number(ele?.inoivceAmount),
					TAX_PERCENT: Number(ele?.taxRate),
					REFRENCE: newArr.find((ele2) => ele.stageNum == ele2.number)?.ref,
				})),
			})
		).then((res) => {
			if (res.payload?.response?.data?.code == '123' || !invoiceNum || !invoiceDate) {
				setError(res.payload?.response?.data);
			} else {
				setVisible(false);
				setOpenAddSnack(true);
				emptyInputsVals();
			}
		});
	};

	const showEditItem = (id) => {
		setSelectedCriteria(null);
		dispatch(getInvoiceAttachment(id)).then((res) => setAttachment(res.payload));
		dispatch(getInvoice(id))
			.then((res) => {
				// console.log(res.payload?.details)
				setEditCriterai(res.payload);
				setEmployee(
					document.body.getAttribute('dir') == 'ltr' && res.payload.CLI_NAME_ENGLISH
						? res.payload.CLI_NAME_ENGLISH
						: res.payload.CLI_NAME
						? res.payload.CLI_NAME
						: ''
				);
				setInvoiceNum(res.payload.INV_NUMBER ? res.payload.INV_NUMBER : '');
				setInvoiceDate(res.payload.INV_DATE ? new Date(res.payload.INV_DATE).toISOString().split('T')[0] : '');
				setContractType(res.payload.COR_ID_PK ? res.payload.COR_ID_PK : '');
				setAllInvoice('');
				setTheTax('');
				setThePaid('');
				setTheRemaining('');
				setNotes(res.payload.INV_NOTE ? res.payload.INV_NOTE : '');
				setNotesEn(res.payload.INV_NOTE_EN ? res.payload.INV_NOTE_EN : '');
				setArrayOfDivs(
					res.payload?.details?.map((ele) => ({
						id: ele.ID_PK,
						stageNum:
							ele.REFRENCE == 0
								? `قضيه رقم ${ele.ID_PK}`
								: ele.REFRENCE == 1
								? `بلاغ رقم ${ele.ID_PK}`
								: ele.REFRENCE == 2
								? `إنذار رقم ${ele.ID_PK}`
								: '',
						inoivceDetail: ele.DESCRIPTION,
						inoivceAmount: ele.AMOUNT,
						taxRate: ele?.TAX_PERCENT,
						taxValue: ele.TAX_AMOUNT,
						theInvoiceAmount: ele.AMOUNT_NET,
					}))
				);
			})
			.then(() => setVisible(true));
	};
	const handelSaveInvoice = () => {
		
		// Number Procedure compo
		const newArr = [
			...theAllStages?.data?.map((ele) => ({ ref: 0, id: ele.STG_ID_PK, number: `قضيه رقم ${ele.STG_NUMBER}` })),
			...allInformings?.data?.map((ele) => ({ ref: 2, id: ele.INR_ID_PK, number: `بلاغ رقم ${ele.WRN_NUMBER}` })),
			...allWarnings?.data?.map((ele) => ({ ref: 1, id: ele.WRN_ID_PK, number: `إنذار رقم ${ele.INR_NUMBER}` })),
		];
		// console.log(newArr);
		dispatch(
			updateInvoice({
				data: {
					INV_NUMBER: Number(invoiceNum),
					INV_DATE: invoiceDate ? invoiceDate : undefined,
					CAS_ID_PK: selectedCase?.CAS_ID_PK,
					CLI_ID_PK: employee
						? selectedCase?.clients?.find((ele) => (ele?.CLI_TYPE_ID_PK == 2 && ele?.CLI_NAME) || ele?.CLI_NAME_ENGLISH == employee)?.CLI_ID_PK
						: undefined,
					COR_ID_PK: contractType ? contractType : undefined,
					INV_NOTE: notes ? notes : undefined,
					INV_NOTE_EN: notesEn ? notesEn : undefined,
					DT_ITEMS: arrayOfDivs?.map((ele) => ({
						ID_PK: newArr.find((ele2) => ele.stageNum == ele2.number)?.id, // why required
						DESCRIPTION: ele.inoivceDetail,
						AMOUNT: Number(ele?.inoivceAmount),
						TAX_PERCENT: Number(ele?.taxRate),
						REFRENCE: newArr.find((ele2) => ele.stageNum == ele2.number)?.ref,
					})),
				},
				id: editCriterai.INR_ID_PK,
			})
		);
	};
	const handelRemoveInvoice = (id) => {
		setDeletedId(id);
		setVisibleDeleteModal(true);
	};
	const removeSelectedInvoice = () => {
		dispatch(deleteInvoice(deletedId)).then((res) => {
			// console.log("res?.payload: ", res?.payload)
			if (res?.payload?.res?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
	};
	const showDataVoucher = (id) => {
		dispatch(getThevoucher(id))
			.then((res) => setSelectedVoucher(res.payload))
			.then(() => setVoucherPopupAdd(true));
	};
	const showEditVoucher = (id) => {
		dispatch(getThevoucher(id))
			.then((res) => setEditVoucher(res.payload))
			.then(() => setVoucherPopupAdd(true));
	};
	const handelRemoveVoucher = (id) => {
		setDeletedVoucherId(id);
		setVisibleDeleteVoucherModal(true);
	};
	const removeSelectedVoucher = () => {
		dispatch(deletevoucher(deletedVoucherId)).then((res) => {
			console.log('res?.payload: ', res?.payload);
			if (res?.payload?.res?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
	};
	//TODO: in deleting voucher 'params.caseId is required'
	const openVoucherInvoiceAdd = () => {
		VoucherInvoiceAdd ? setVoucherInvoiceAdd(false) : setVoucherInvoiceAdd(true);
	};
	const VoucherData = (data) => data?.map((ele, index) => ({
		id: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}>{index + 1}</span>,
		debtor: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}></span>,
		date: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}>{ele.PAY_DATE ? new Date(ele.PAY_DATE).toLocaleDateString() : ''}</span>,
		cridtor: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}></span>,
		// setNotes:(<span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}> "tgFGJUKUHUJKIHFUHR"</span>),
		// brief:(<span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}> "gdjnks"</span>),
		balance: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}> </span>,
		chequNum: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}>{ele?.PAY_CHEQUE_NUMBER}</span>,
		chequDate: (
			<span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}>{ele?.PAY_CHEQUE_DATE ? new Date(ele?.PAY_CHEQUE_DATE).toLocaleDateString() : null}</span>
		),
		number: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}>{ele.PAY_NUMBER}</span>,
		// attachment:(<span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}> 0</span>),
		type: <span onClick={() => showDataVoucher(ele?.PAY_ID_PK)}>{ele.PAY_KIND == 0 ? 'سند قبض' : 'سند صرف'}</span>,
		DeletEdit: (
			<p>
				<CButton style={{ background: '#1e42a0 !important' }}>
					<CIcon
						onClick={() => showEditVoucher(ele?.PAY_ID_PK)}
						style={{ height: '16px', marginRight: '-3px' }}
						icon={cilPencil}
						customClassName="nav-icon"
					/>
				</CButton>
				<CButton color={'danger'}>
					<CIcon
						onClick={() => handelRemoveVoucher(ele?.PAY_ID_PK)}
						style={{ height: '16px', marginRight: '-3px' }}
						icon={cilTrash}
						customClassName="nav-icon"
					/>
				</CButton>
			</p>
		),
	}));
	const InvoicesData = (data) => data?.map((ele, index) => ({
		id: <span onClick={() => showData(ele?.INV_ID_PK)}>{searchedDiv ? searchedDiv.length + index + 1 : allvouchers?.total + index + 1}</span>,
		debtor: <span onClick={() => showData(ele?.INV_ID_PK)}></span>,
		date: <span onClick={() => showData(ele?.INV_ID_PK)}> </span>,
		cridtor: <span onClick={() => showData(ele?.INV_ID_PK)}></span>,
		// setNotes:(<span onClick={() => showData(ele?.INV_ID_PK)}> "tgFGJUKUHUJKIHFUHR"</span>),
		// brief:(<span onClick={() => showData(ele?.INV_ID_PK)}> "gdjnks"</span>),
		balance: <span onClick={() => showData(ele?.INV_ID_PK)}> </span>,
		chequNum: <span onClick={() => showData(ele?.INV_ID_PK)}> </span>,
		chequDate: <span onClick={() => showData(ele?.INV_ID_PK)}> </span>,
		number: <span onClick={() => showData(ele?.INV_ID_PK)}> </span>,
		// attachment:(<span onClick={() => showData(ele?.INV_ID_PK)}> 0</span>),
		type: <span onClick={() => showData(ele?.INV_ID_PK)}>{translation('invoice')}</span>,
		DeletEdit: (
			<p>
				<CButton style={{ background: '#1e42a0 !important' }}>
					<CIcon
						onClick={() => showEditItem(ele?.INV_ID_PK)}
						style={{ height: '16px', marginRight: '-3px' }}
						icon={cilPencil}
						customClassName="nav-icon"
					/>
				</CButton>
				<CButton color={'danger'}>
					<CIcon
						onClick={() => handelRemoveInvoice(ele?.INV_ID_PK)}
						style={{ height: '16px', marginRight: '-3px' }}
						icon={cilTrash}
						customClassName="nav-icon"
					/>
				</CButton>
			</p>
		),
	}));
	
	const consultData = searchedDiv || searchedDiv2 ? VoucherData(searchedDiv)?.concat(InvoicesData(searchedDiv2)) : VoucherData(allvouchers?.data)?.concat(InvoicesData(allInvoices?.data));

	const datatable = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: formatMessage({ id: 'maduin' }),
				field: 'debtor',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'lonaer' }),
				field: 'cridtor',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'balance' }),
				field: 'balance',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'theDate' }),
				field: 'date',
				sort: 'asc',
			},
			{
				label: formatMessage({ id: 'chequeNum' }),
				field: 'chequNum',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'chequeDate' }),
				field: 'chequDate',
				sort: '',
				width: 100,
			},
			{
				label: formatMessage({ id: 'number' }),
				field: 'number',
				sort: 'asc',
				width: 100,
			},
			// {
			//     label: 'مرفقات',
			//     field: 'attachment',
			//     sort: '',
			//     width: 100
			// },
			{
				label: formatMessage({ id: 'type' }),
				field: 'type',
				sort: '',
				width: 100,
			},
			{
				label: '',
				field: 'DeletEdit',
				sort: '',
				width: 80,
			},
		],
		rows: consultData,
	};

	// close snack alert
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAddSnack(false);
		setOpenEditSnack(false);
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenErrorSnack(false);
	};
	return (
		<div className="file-alerts consulting box finance">
			<div className="headerFiles">
				<div>
					<CButton className="add-contact" onClick={openVoucherInvoiceAdd}>
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton>
					{VoucherInvoiceAdd ? (
						<div className="voucher-invoice box">
							<p onClick={openAddPopup}>{translation('invoice')}</p>
							<p onClick={openAddVoucherPopup}>{translation('payment')}</p>
						</div>
					) : null}
					{/* <FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
						<Select
							multiple
							displayEmpty
							value={classifiedName}
							onChange={handleChange}
							input={<OutlinedInput />}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return <span>{translation('classification')}</span>;
								}

								return selected.join(', ');
							}}
							MenuProps={MenuProps}
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem disabled value=""></MenuItem>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, classifiedName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl> */}
				</div>
				<div className="search">
					<CFormInput
						type="text"
						value={searchVal}
						onChange={(e) => searchByChar(e)}
						placeholder={`${formatMessage({ id: 'search' })}...`}
						onKeyDown={(e) => handelSearchbtn(e)}
					/>
				</div>
			</div>
			<MDBDataTable
				striped
				// bordered
				responsive
				//   scrollX
				//   scrollY
				small
				data={datatable}
				searching={true}
			/>
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={removeSelectedInvoice} />
			) : null}
			{visibleDeleteVoucherModal ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteVoucherModal(false)} handleDelete={removeSelectedVoucher} />
			) : null}
			{selectedCriteria ? ReturnedPopup(selectedCriteria) : !selectedCriteria && editCriterai ? ReturnedPopup(editCriterai) : ReturnedPopup()}
			{voucherPopupAdd ? (
				<ReceiptVoucher
					exitSelectModal={() => setVoucherPopupAdd(false)}
					setOpenEditSnack={setOpenEditSnack}
					setOpenAddSnack={setOpenAddSnack}
					setOpenDelSnack={setOpenDelSnack}
					setOpenAttachedSnack={setOpenAttachedSnack}
					setOpenLargeAttachement={setOpenLargeAttachement}
					selectedCriteria={selectedVoucher}
					editCriterai={editVoucher}
				/>
			) : null}
			{constantAdd == 2 ? (
				<AttachedPopup
					exitSelectModal={() => setConstantAdd('')}
					url={`invoice/${attacmentId}/attachment`}
					id={attacmentId}
					setOpenAddSnack={setOpenAddSnack}
					setOpenAttachedSnack={setOpenAttachedSnack}
					setOpenLargeAttachement={setOpenLargeAttachement}
					callback={() => dispatch(getInvoiceAttachment(editCriterai?.INV_ID_PK)).then((res) => setAttachment(res.payload))}
				/>
			) : null}
			{openAddSnack || openDelSnack || openDelErrorSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack || OpenAttachedSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openDelErrorSnack ? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{OpenEditSnack
							? translation('itemUpdated')
							: openDelSnack
							? translation('itemDeleted')
							: openDelErrorSnack
							? translation('alreadyUSed')
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' })
							: OpenAttachedSnack
							? translation('error')
							: translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileConsulting);
