import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
	CHeaderDivider,
	CNav,
	CTooltip,
	CButton,
	CRow,
	CCol,
	CCard,
	CCardBody,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CFormInput,
	CFormTextarea,
	CTableHeaderCell,
	CTableRow,
	CTableHead,
	CTable,
	CTableBody,
	CTableDataCell,
} from '@coreui/react';
import { cilFindInPage, cilPrint, cilAt, cilCursor, cilShareBoxed, cilSave, cilPlus, cilTrash, cilPencil, cilNotes, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import {  useIntl } from "react-intl";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// import {Default} from '../components/editShowWord'
import {
	getContracts,
	getContractById,
	getConsultContracts,
	getConsultStgContracts,
	getStgContracts,
	getContractUnAttached,
	getcontractAttachment,
	getcontractAttachmentData,
	addNewContract,
	updateContract,
	deleteContract,
	deleteAttachment
} from '../store/reducers/contract';
import { getCases } from '../store/reducers/file-management';
import { getStageKind } from '../store/reducers/constants/stage';
import { getcontractDuration, getcontractItem, getcontractStatus, getcontractType } from '../store/reducers/constants/contract';
import { getContacts } from '../store/reducers/contacts';
import AttachedHeadTable from '../features/attachedFileHaed';
import { ContractCard, paidDetail } from '../components/contract/contract';
import DeletePopup from '../features/delete';
import { StageConstantKind } from '../components/fileManagement/stages/stageConstant';
import { ContractDurationConstant, ContractItemConstant, ContractTypeConstant, ContractStatusConstant } from '../components/contract/contractConstant';
import ReceiptVoucher from '../components/fileManagement/finance/receiptVoucher';
import {getAllvouchers, getThevoucher} from "../store/reducers/voucher"
import '../components/contract/contract.css';
import AttachedPopup from "../features/attachment"
import translation from "../i18n/translate"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

ChartJS.register(ArcElement, Tooltip, Legend);
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Contracts = () => {
	const [allCritaria, setAllCritaria] = useState([]);
	const [selectedCriteria, setSelectedCriteria] = useState(null);
	const [editCriterai, setEditCriterai] = useState(null);
	const [visible, setVisible] = useState(false);
	const [divActive, setDivActive] = useState('info');
	const [chartVisible, setChartVisible] = useState(false);
	const [OpenAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [attachment, setAttachment] = useState(null);
	const [selectedVal, setSelctedVal] = useState('1');
	const [CorNumSearch, setCorNumSearch] = useState('');
	const [corDateFrom, setcorDateFrom] = useState(undefined);
	const [corDateTo, setcorDateTo] = useState(undefined);
	const [corAmountFrom, setcorAmountFrom] = useState(undefined);
	const [coreAmountTo, setcoreAmountTo] = useState(undefined);
	const [client, setclient] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchVal, setSearchVal] = useState('');
	const [nameSearch, setNameSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [page, setId] = useState(1);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const theme = useTheme();
	const [clientName, setClientName] = useState('');
	const [contractKind, setContractKind] = useState('');
	const [contractNumber, setContractNumber] = useState(0);
	const [contractDate, setContractDate] = useState('');
	const [contractAmount, setContractAmount] = useState('');
	const [contractDuration, setContractDuration] = useState('');
	const [contractStartFrom, setContractStartFrom] = useState('');
	const [contractStartTo, setContractStartTo] = useState('');
	const [contractAttachment, setContractAttachment] = useState(null);
	const [contractNotes, setContractNotes] = useState('');
	const [checkedStageContarct, setCheckedStageContarct] = useState(false);
	const [checkConultContract, setCheckConultContract] = useState(false);
	const [contractStatus, setContractStatus] = useState([]);
	const [consultCheck, setConsultCheck] = useState('file');
	const [hoursNum, setHoursNum] = useState(0);
	const [fileNum, setFileNum] = useState('');
	const [divId, setDivId] = useState(Date.now());
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [theContractStatus, setTheContractStatus] = useState('');
	const [theClients, setTheClients] = useState([]);
	const [contractTypeChecked, setContractTypeChecked] = useState(false);
	const [voucherPopupAdd, setVoucherPopupAdd] = useState(false);
	const [constantAdd, setConstantAdd] = useState('');
	const [voucherDetails, setVoucherDetails] = useState('');
	const [classifiedValidator1, setclassifiedValidator1 ] = useState(false);
	const [classifiedValidator2, setclassifiedValidator2 ] = useState(false);
	const [contractNotesEN, setContractNotesEN] = useState('');
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const { formatMessage } = useIntl();
	const {allvouchers} =  useSelector((state) => state.Voucher);

	const names = [formatMessage({id: 'client'}),formatMessage({id: 'contractVal'}),formatMessage({id: 'contractDate'}), formatMessage({id: 'contractNum'})];
	const dispatch = useDispatch();
	const { id } = useParams();
	const { allContrcts, isLoadingContract, contractById, stagesContract, consultingContract, stgConsultContract, contractUnAttached } = useSelector(
		(state) => state.contract
	);

	useEffect(() => {
		dispatch(getStageKind())
		dispatch(getcontractDuration());
		dispatch(getcontractItem());
		dispatch(getcontractStatus());
		dispatch(getcontractType());
		dispatch(getContacts({ theParams: { classification0: 1 } })).then((res) => setTheClients(res.payload.data));
		dispatch(getContracts({ theParams: null })).then((data) => setAllCritaria(data.payload?.data));
		dispatch(getConsultContracts());
		dispatch(getConsultContracts());
		dispatch(getConsultStgContracts());
		dispatch(getStgContracts());
		dispatch(getContractUnAttached());
		dispatch(getCases({ theParams: null }));
		id && getCriteriaById(id);
	}, [dispatch]);

	const { contractDurationCompo, contractItemCompo, contractStatusCompo, contractTypeCompo } = useSelector((state) => state.ContractConstant);
	const { theStageKindCompo } = useSelector((state) => state.StageConstants);

	useMemo(() => {
		setAllCritaria(allContrcts?.data);
	}, [contractById]);

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	//close snack
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAttachedSnack(false);
		setContractTypeChecked(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenDelSnack(false);
	};
	// get selected contract
	const getCriteriaById = (id) => {
		setEditCriterai(null);
		dispatch(getContractById(id))
			.then((res) => setSelectedCriteria(res.payload))
			.then(() => dispatch(getcontractAttachment(id)).then((res) => setAttachment(res.payload)))
			.then(() => setVisible(!visible));
	};

	const fetchDataSelectedByAttached = (e) => {
		if (e.target.value == 1) {
			setSelctedVal('1');
			setAllCritaria(allContrcts?.data);
		}
		if (e.target.value == 2) {
			setSelctedVal('2');
			setAllCritaria(stagesContract);
		}
		if (e.target.value == 3) {
			setSelctedVal('3');
			setAllCritaria(consultingContract);
		}
		if (e.target.value == 4) {
			setSelctedVal('4');
			setAllCritaria(stgConsultContract);
		}
		if (e.target.value == 5) {
			setSelctedVal('5');
			setAllCritaria(contractUnAttached);
		}
	};

	const exitSelectModal = () => {
		setVisible(false);
		setSelectedCriteria(null);
		setEditCriterai(null);
	};

	const handelChangePaidDate = (e, id) => {
		let newArr = arrayOfDivs;
		if (e.target.name == 'contractPaidType') {
			newArr.find((item) => item.id == id)['contractPaidType'] = e.target.value;
		} else if (e.target.name == 'contractPaidDate') {
			newArr.find((item) => item.id == id)['contractPaidDate'] = e.target.value;
		} else if (e.target.name == 'contractPaidAmount') {
			newArr.find((item) => item.id == id)['contractPaidAmount'] = e.target.value;
		}else if (e.target.name == 'contractPaidNumber') {
			newArr.find((item) => item.id == id)['contractPaidNumber'] = e.target.value;
			// allvouchers?.data?.find(ele => ele?.) 
		}else if(e.target.name == 'contractVoucherNumber'){
			// newArr.find((item) => item.id == id)['contractVoucherNumber'] = e.target.value;
		}
		setArrayOfDivs(newArr);
	};

	const handelChangePaidStage = (e, value, id) => {
		let newArr = arrayOfDivs;
			newArr.find((item) => item.id == id)['contractPaidJudge'] = value;
			setArrayOfDivs(newArr);
	}

	const handelAddMorePaidDate = () => {
		setArrayOfDivs([...arrayOfDivs, { id: divId, contractPaidType: '', contractPaidJudge: '', contractPaidDate: '', contractPaidAmount: '',contractPaidNumber: '', contractVoucherNumber: ""}]);
		setDivId(divId + 1);
	};
	const openReceiptVoucher = (id) => {
		dispatch(getThevoucher(id)).then(res => {
			setVoucherPopupAdd(true)
			setVoucherDetails(res.payload)
		})
	};

	const emptyInputVals = () => {
		setDivActive('info')
		setEditCriterai('');
		setClientName('');
		setContractKind('');
		setContractNumber('');
		setContractDate(undefined);
		setContractAmount('');
		setContractDuration('');
		setContractStartFrom(undefined);
		setContractStartTo(undefined);
		setContractAttachment('');
		setContractNotes('');
		setContractNotesEN('')
	};

	// open add modal
	const openAddPopup = () => {
		setEditCriterai(null);
		setSelectedCriteria(null);
		emptyInputVals();
		setVisible(true);
	};
//TODO: paymentDates not added
	const handleAddNewContract = () => {
		console.log({
			COR_NUMBER: contractNumber ? contractNumber : undefined,
			COR_DATE: contractDate ? contractDate : undefined,
			CLI_ID_PK: clientName ? clientName : undefined,
			COR_AMOUNT: contractAmount ? contractAmount : undefined,
			COR_TYPE_ID_PK: contractKind ? contractTypeCompo?.find((option) => option.COR_TYPE_NAME == contractKind || option.COR_TYPE_NAME_EN == contractKind)?.COR_TYPE_ID_PK : undefined,
			COR_DURATION_ID_PK: contractDuration
				? contractDurationCompo?.find((option) => option.COR_DURATION_NAME == contractDuration || option.COR_DURATION_NAME_EN == contractDuration)?.COR_DURATION_ID_PK
				: undefined,
			COR_FROM_DATE: contractStartFrom ? contractStartFrom : undefined,
			COR_TO_DATE: contractStartTo ? contractStartTo : undefined,
			COR_NOTES: contractNotes ? contractNotes : undefined,
			COR_NOTES_EN: contractNotesEN ? contractNotesEN :undefined,
			// COR_KIND: checkedStageContarct ? 0 : checkConultContract ? 1 : checkConultContract && checkedStageContarct ? 2 : undefined,
			COR_WITH_STAGE: checkedStageContarct ? 1 : 0,
			COR_WITH_HOURS: consultCheck != 'file' ? 1 : 0,
			COR_HOURS_COUNT: hoursNum ? Number(hoursNum) : undefined,
			COR_STATUS_ID_PK: theContractStatus
				? contractStatusCompo?.find((option) => option.COR_STATUS_NAME == theContractStatus || option.COR_STATUS_NAME_EN == theContractStatus)?.COR_STATUS_ID_PK
				: undefined,
			DT_STAGE:
				contractStatus.length > 0
					? contractStatus.map((ele) => theStageKindCompo?.find((option) => option.STG_KIND_NAME == ele || option.STG_KIND_NAME_EN == ele)?.STG_KIND_ID_PK)
					: undefined,
		})
		dispatch(
			addNewContract({
				COR_NUMBER: contractNumber ? contractNumber : undefined,
				COR_DATE: contractDate ? contractDate : undefined,
				CLI_ID_PK: clientName ? clientName : undefined,
				COR_AMOUNT: contractAmount ? contractAmount : undefined,
				COR_TYPE_ID_PK: contractKind ? contractTypeCompo?.find((option) => option.COR_TYPE_NAME == contractKind || option.COR_TYPE_NAME_EN == contractKind)?.COR_TYPE_ID_PK : undefined,
				COR_DURATION_ID_PK: contractDuration
					? contractDurationCompo?.find((option) => option.COR_DURATION_NAME == contractDuration || option.COR_DURATION_NAME_EN == contractDuration)?.COR_DURATION_ID_PK
					: undefined,
				COR_FROM_DATE: contractStartFrom ? contractStartFrom : undefined,
				COR_TO_DATE: contractStartTo ? contractStartTo : undefined,
				COR_NOTES: contractNotes ? contractNotes : undefined,
				COR_NOTES_EN: contractNotesEN ? contractNotesEN :undefined,
				// COR_KIND: checkedStageContarct ? 0 : checkConultContract ? 1 : checkConultContract && checkedStageContarct ? 2 : undefined,
				COR_WITH_STAGE: checkedStageContarct ? 1 : 0,
				COR_WITH_HOURS: consultCheck != 'file' ? 1 : 0,
				COR_HOURS_COUNT: hoursNum ? Number(hoursNum) : undefined,
				COR_STATUS_ID_PK: theContractStatus
					? contractStatusCompo?.find((option) => option.COR_STATUS_NAME == theContractStatus || option.COR_STATUS_NAME_EN == theContractStatus)?.COR_STATUS_ID_PK
					: undefined,
				DT_STAGE:
					contractStatus.length > 0
						? contractStatus.map((ele) => theStageKindCompo?.find((option) => option.STG_KIND_NAME == ele || option.STG_KIND_NAME_EN == ele)?.STG_KIND_ID_PK)
						: undefined,
			})
		).then((res) => {
			// console.log(res.payload)
			if (res.payload?.code) {
				setVisible(true);
				if (!checkedStageContarct && !checkConultContract) {
					setContractTypeChecked(true);
				}
			} else {
				setOpenAddSnack(true);
				setVisible(false);
				// dispatch(getAgencyData({ theParams: null })).then((data) => setAllCritaria(data?.payload.data));
			}
		});
	};
	// open contract edit modal
	const editSelectedContract = (id) => {
		setDivActive('info')
		setSelectedCriteria(null);
		setVisible(!visible);
		// const editableData = allCritaria.find((data) => data.COR_ID_PK === id);
		dispatch(getcontractAttachment(id)).then((res) => setAttachment(res.payload))
		dispatch(getAllvouchers({theParams: {contractId: id}}))
		dispatch(getContractById(id)).then(res => {
			setEditCriterai(res.payload);
			setClientName(res.payload.CLI_ID_PK);
			setContractKind(res.payload.COR_KIND_NAME);
			setContractNumber(res.payload.COR_NUMBER);
			setContractDate(res.payload.COR_DATE ? new Date(res.payload.COR_DATE).toISOString().split('T')[0] : undefined);
			setContractAmount(res.payload.COR_AMOUNT);
			setContractDuration(res.payload.COR_DURATION_NAME);
			setContractStartFrom(res.payload.COR_FROM_DATE ? new Date(res.payload.COR_FROM_DATE).toISOString().split('T')[0] : undefined);
			setContractStartTo(res.payload.COR_TO_DATE ? new Date(res.payload.COR_TO_DATE).toISOString().split('T')[0] : undefined);
			setContractAttachment(res.payload._FILE);
			setContractNotes(res.payload.COR_NOTES);
			setCheckedStageContarct(res.payload.COR_KIND == 0 || res.payload.COR_KIND == 2 ? true : false);
			setCheckConultContract(res.payload.COR_KIND == 1 || res.payload.COR_KIND == 2 ? true : false);
			setContractStatus(res.payload.stages?.length > 0 ? res.payload.stages?.map((ele) => ele.STG_KIND_NAME) : []);
			setConsultCheck(res.payload?.COR_WITH_STAGE ? 'file' : 'hour');
			setArrayOfDivs(
				res.payload?.paymentDates.map((ele) => ({
					id: ele.ID_PK,
					contractPaidType: ele.PAY_TYPE ? ele.PAY_TYPE : '',
					contractPaidJudge: ele?.STG_KIND_NAME ? ele.STG_KIND_NAME : '',
					contractPaidDate: ele.PAY_DATE ? new Date(ele.PAY_DATE).toISOString().split('T')[0] : '',
					contractPaidAmount: ele.PAY_AMOUNT ? ele.PAY_AMOUNT : '',
					contractPaidNumber: ele?.PAY_NUMBER ? ele.PAY_NUMBER : '',
					contractVoucherNumber: undefined
				}))
			);
			// console.log(res.payload)
		})
	};

	const handleUpdateContract = () => {
		dispatch(
			updateContract({
				data: {
					COR_NUMBER: contractNumber ? contractNumber : undefined,
					COR_DATE: contractDate ? contractDate : undefined,
					CLI_ID_PK: clientName ? clientName : undefined,
					COR_AMOUNT: contractAmount ? contractAmount : undefined,
					COR_TYPE_ID_PK: contractKind ? contractTypeCompo?.find((option) => option.COR_TYPE_NAME == contractKind || option.COR_TYPE_NAME_EN == contractKind)?.COR_TYPE_ID_PK : undefined,
					COR_DURATION_ID_PK: contractDuration
						? contractDurationCompo?.find((option) => option.COR_DURATION_NAME == contractDuration || option.COR_DURATION_NAME_EN == contractDuration)?.COR_DURATION_ID_PK
						: undefined,
					COR_FROM_DATE: contractStartFrom ? contractStartFrom : undefined,
					COR_TO_DATE: contractStartTo ? contractStartTo : undefined,
					COR_NOTES: contractNotes ? contractNotes : undefined,
					COR_NOTES_EN: contractNotesEN ? contractNotesEN :undefined,
					// COR_KIND: checkedStageContarct ? 0 : checkConultContract ? 1 : checkConultContract && checkedStageContarct ? 2 : undefined,
					COR_WITH_STAGE: checkedStageContarct ? 1 : 0,
					COR_WITH_HOURS: consultCheck != 'file' ? 1 : 0,
					COR_HOURS_COUNT: hoursNum ? Number(hoursNum) : undefined,
					COR_STATUS_ID_PK: theContractStatus
						? contractStatusCompo?.find((option) => option.COR_STATUS_NAME == theContractStatus || option.COR_STATUS_NAME_EN == theContractStatus)?.COR_STATUS_ID_PK
						: undefined,
					DT_STAGE:
						contractStatus.length > 0
							? contractStatus.map((ele) => theStageKindCompo?.find((option) => option.STG_KIND_NAME == ele || option.STG_KIND_NAME_EN == ele)?.STG_KIND_ID_PK)
							: undefined,
				},
				id: editCriterai.COR_ID_PK,
			})
		).then((res) => {
			// console.log(res);
			if (res.payload?.code) {
				setVisible(true);
				if (!checkedStageContarct && !checkConultContract) {
					setContractTypeChecked(true);
				}
			} else {
				dispatch(getContracts({ theParams: null })).then((res) => {
					setAllCritaria(res.payload.data);
					setOpenEditSnack(true);
					setVisible(false);
					emptyInputVals();
				});
			}
		});
	};
	const handleOpenDeleteModal = (id) => {
		setDeletedItemId(id);
		setVisibleDeleteModal(true);
	};
	const handleDeleteContract = () => {
		dispatch(deleteContract(deletedItemId))
			.then((res) => {
				console.log(res?.payload);
				if (res?.payload?.res?.status == 200) {
					setVisibleDeleteModal(false);
					setOpenDelSnack(true);
				}
			})
			.then(() => {
				dispatch(getContracts({ theParams: null })).then((res) => {
					setAllCritaria(res.payload.data);
				});
			});
	};

	const handelAddVoucher = () => {
		setVoucherPopupAdd(true)
	}
	const handleCloseVoucherModal = () => {
		setVoucherPopupAdd(false)
		setVoucherDetails(null)
	}
	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(6);
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
				dispatch(getcontractAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	// modal popup
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal className={`contract-modal ${document.body.getAttribute("dir") == 'ltr' ? 'enTextLeftPopup' : null}`} visible={visible} onClose={() => exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilNotes} customClassName="nav-icon" />{' '}
					{selectedCriteria || editCriterai ? <span>  {translation('contract')} {editCriterai?.COR_NUMBER || selectedCriteria?.COR_NUMBER}</span> : translation('add')}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<div className="contract-tabs">
					<h6 className={divActive == 'info' ? 'activeTabs' : null} onClick={() => setDivActive('info')}>
					{translation('contractDetail')}
					</h6>
					<h6 className={divActive == 'payments' ? 'activeTabs' : null} onClick={() => setDivActive('payments')}>
					{translation('contractPays')}
					</h6>
						{selectedCriteria || editCriterai ? (<h6 className={divActive == 'attachments' ? 'activeTabs' : null} onClick={() => setDivActive('attachments')}>
							{translation('attachments')}
						</h6>) : null}
				</div>
				<div className="containerDivTabs">
					<div className={`info ${divActive == 'info' ? 'active' : null}`}>
						<CRow>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('paymentDate')}</CFormLabel>
								{selectedCriteria ? (
									<p>
										{selectedCriteria?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(selectedCriteria?.COR_DATE)) : formatMessage({id: 'notFound'})}
									</p>
								) : (
									<CFormInput
										type="date"
										defaultValue={contractDate}
										onChange={(e) => setContractDate(e.target.value)}
										required
										className={`${!contractDate ? 'is-invalid' : null}`}
									/>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('client')}</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.CLI_NAME ? selectedCriteria.CLI_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setClientName(e.target.value)}
											value={clientName}
											error={clientName.length <= 0 ? true : false}
										>
											{theClients.map((name, i) => (
												<MenuItem key={name.CLI_ID_PK} value={name.CLI_ID_PK}>
													{document.body.getAttribute("dir") == 'ltr' && name.CLI_NAME_ENGLISH ? name.CLI_NAME_ENGLISH :  name.CLI_NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(3)}>
								{translation('type')}
								</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.COR_KIND_NAME ? selectedCriteria.COR_KIND_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={contractKind}
											onChange={(e, value) => setContractKind(value)}
											options={contractTypeCompo?.map((option) => document.body.getAttribute("dir") == 'ltr' && option.COR_TYPE_NAME_EN ? option.COR_TYPE_NAME_EN : option.COR_TYPE_NAME)}
											renderInput={(params) => <TextField {...params} />}
											getOptionLabel={(option) => option}
											renderOption={(props, option) => {
												return (
													<li {...props} key={option + Math.random()}>
														{option}
													</li>
												);
											}}
										/>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('paymentNum')}</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.COR_NUMBER ? selectedCriteria.COR_NUMBER : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput type="number" defaultValue={contractNumber} min="1" onChange={(e) => setContractNumber(e.target.value)} />
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('paymentVal')} </CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.COR_AMOUNT ? selectedCriteria.COR_AMOUNT : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput defaultValue={contractAmount} onChange={(e) => setContractAmount(e.target.value)} type="number" />
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
								{translation('paymentperiod')}
								</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.COR_DURATION_NAME ? selectedCriteria.COR_DURATION_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={contractDuration}
											onChange={(e, value) => setContractDuration(value)}
											options={contractDurationCompo?.map((option) => option.COR_DURATION_NAME)}
											renderInput={(params) => <TextField {...params} />}
											getOptionLabel={(option) => option}
											renderOption={(props, option) => {
												return (
													<li {...props} key={option + Math.random()}>
														{option}
													</li>
												);
											}}
										/>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'from'}) + ' ' + formatMessage({id: 'date'})}</CFormLabel>
								{selectedCriteria ? (
									<p>
										{selectedCriteria.COR_FROM_DATE
											? new Intl.DateTimeFormat('en-US').format(new Date(selectedCriteria.COR_FROM_DATE))
											: formatMessage({id: 'notFound'})}
									</p>
								) : (
									<CFormInput type="date" defaultValue={contractStartFrom} onChange={(e) => setContractStartFrom(e.target.value)} />
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'to'}) + ' ' + formatMessage({id: 'date'})} </CFormLabel>
								{selectedCriteria ? (
									<p>
										{selectedCriteria?.COR_TO_DATE
											? new Intl.DateTimeFormat('en-US').format(new Date(selectedCriteria?.COR_TO_DATE))
											: formatMessage({id: 'notFound'})}
									</p>
								) : (
									<CFormInput type="date" defaultValue={contractStartTo} onChange={(e) => setContractStartTo(e.target.value)} />
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
								{formatMessage({id: 'status'})}
								</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.COR_STATUS_NAME ? selectedCriteria.COR_STATUS_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={theContractStatus}
											onChange={(e, value) => setTheContractStatus(value)}
											options={contractStatusCompo?.map((option) => document.body.getAttribute("dir") == 'ltr' && option.COR_STATUS_NAME_EN ? option.COR_STATUS_NAME_EN : option.COR_STATUS_NAME)}
											renderInput={(params) => <TextField {...params} />}
											getOptionLabel={(option) => option}
											renderOption={(props, option) => {
												return (
													<li {...props} key={option + Math.random()}>
														{option}
													</li>
												);
											}}
										/>
									</FormControl>
								)}
							</CCol>
							<CCol md={12}>
								<hr />
								<CRow>
									<CCol md={6}>
										<div>
											{selectedCriteria && selectedCriteria.COR_KIND == 1 ? null : (
												<CFormLabel htmlFor="inputEmail4">{formatMessage({id: 'stgContract'})}</CFormLabel>
											)}
											{selectedCriteria ? (
												!selectedCriteria.COR_KIND == 1 && (
													<p>
														{selectedCriteria?.stage?.length > 0 ? selectedCriteria?.stage?.map((ele) => ele.STG_KIND_NAME) : null}
													</p>
												)
											) : (
												<>
													<Checkbox
														{...label}
														checked={checkedStageContarct}
														sx={{
															color: '#4527a0',
															'&.Mui-checked': {
																color: '#5e35b1',
															},
														}}
														onChange={(e) => setCheckedStageContarct(e.target.checked)}
													/>
													<div>
														<CFormLabel style={{ display: 'block', cursor: 'pointer' }} onClick={() => setConstantAdd(5)}>
															{formatMessage({id: 'theStages'})}
														</CFormLabel>
														<FormControl fullWidth>
															<Autocomplete
																disabled={!checkedStageContarct}
																multiple={true}
																id="free-solo-demo"
																freeSolo
																value={contractStatus}
																onChange={(e, value) => setContractStatus(value)}
																options={theStageKindCompo?.map((option) => document.body.getAttribute("dir") == 'ltr' && option.STG_KIND_NAME_EN ? option.STG_KIND_NAME_EN :  option.STG_KIND_NAME)}
																renderInput={(params) => <TextField {...params} />}
																getOptionLabel={(option) => option}
																renderOption={(props, option) => {
																	return (
																		<li {...props} key={option + Math.random()}>
																			{option}
																		</li>
																	);
																}}
																style={{ marginBottom: '20px' }}
															/>
														</FormControl>
													</div>
												</>
											)}
										</div>
									</CCol>
									<CCol md={6}>
										<div>
											{selectedCriteria && selectedCriteria.COR_KIND == 0 ? null : (
												<CFormLabel style={{ marginTop: '5px' }}>{formatMessage({id: 'consultionContract'})}</CFormLabel>
											)}
											{selectedCriteria ? (
												!selectedCriteria.COR_KIND == 0 && (
													<p>
														{selectedCriteria?.COR_WITH_STAGE
															? formatMessage({id: 'withFile'})
															: selectedCriteria?.COR_WITH_HOURS
															? formatMessage({id: 'hour'}) + selectedCriteria?.COR_HOURS_COUNT
															: null}
													</p>
												)
											) : (
												<>
													<Checkbox
														{...label}
														checked={checkConultContract}
														sx={{
															color: '#4527a0',
															'&.Mui-checked': {
																color: '#5e35b1',
															},
														}}
														onChange={(e) => setCheckConultContract(e.target.checked)}
													/>
													<div>
														<FormControl>
															<RadioGroup value={consultCheck} onChange={(event) => setConsultCheck(event.target.value)}>
																<div>
																	<FormControlLabel value="file" control={<Radio />} disabled={!checkConultContract} />
																	<CFormLabel style={{ display: 'inline-block' }}> {formatMessage({id: 'withFile'})}</CFormLabel>
																</div>
																<div>
																	<FormControlLabel value="hour" control={<Radio />} disabled={!checkConultContract} />
																	<CFormLabel>{formatMessage({id: 'hour'})} {document.body.getAttribute("dir") == 'ltr'? 'or' :' أو'} {formatMessage({id: 'visit'})}</CFormLabel>
																	<CFormInput
																		type="number"
																		value={hoursNum}
																		onChange={(e) => setHoursNum(e.target.value)}
																		disabled={consultCheck != 'hour'}
																		className="hourNum"
																	/>
																</div>
															</RadioGroup>
														</FormControl>
													</div>
												</>
											)}
										</div>
									</CCol>
								</CRow>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'notes'})}</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria?.COR_NOTES ? selectedCriteria?.COR_NOTES : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormTextarea rows="5" onChange={(e) => setContractNotes(e.target.value)} defaultValue={contractNotes} />
								)}
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'notesEn'})}</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria?.COR_NOTES_EN ? selectedCriteria?.COR_NOTES_EN : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormTextarea rows="5" onChange={(e) => setContractNotesEN(e.target.value)} defaultValue={contractNotesEN} />
								)}
							</CCol>
						</CRow>
					</div>
					<div className={`payments ${divActive == 'payments' ? 'active' : null}`}>
						<CRow>
							{selectedCriteria || editCriterai ? (
								<CCol md={12}>
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
									<CFormLabel htmlFor="inputEmail4">{formatMessage({id: 'paymentDetails'})}</CFormLabel>
									{!selectedCriteria && (<button className='addVoucher' onClick={handelAddVoucher}>  {formatMessage({id: 'addPayment'})}</button>)}
									</div>
									<CTable className="text-center bordered" responsive>
										<CTableHead>
											<CTableRow>
												<CTableHeaderCell scope="col">#</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'type'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'voucherNum'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'amount'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'paymentType'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'paymentStatus'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col"> {formatMessage({id: 'chequeNum'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'chequeDate'})}</CTableHeaderCell>
												<CTableHeaderCell scope="col">{formatMessage({id: 'bank'})}</CTableHeaderCell>
											</CTableRow>
										</CTableHead>
										<CTableBody>
											{selectedCriteria
												? paidDetail({ data: allvouchers.data, openReceiptVoucher })
												: paidDetail({ data: allvouchers.data, openReceiptVoucher })}
										</CTableBody>
									</CTable>
								</CCol>
							) : null}
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'paymentsDates'})}</CFormLabel>
									<div className="divTable">
										<div className="headRow">
											<div className="divCell" align="center">
											{formatMessage({id: 'number'})}
											</div>
											<div className="divCell" align="center">
											{formatMessage({id: 'type'})}
											</div>
											<div className="divCell" align="center">
											{formatMessage({id: 'date'})}
											</div>
											<div className="divCell" align="center" style={{cursor: 'pointer'}} onClick={()=>setConstantAdd(5)}>
											{formatMessage({id: 'stage'})}
											</div>
											<div className="divCell" align="center">
											{formatMessage({id: 'theValue'})}
											</div>
											<div className="divCell" align="center">
											{formatMessage({id: 'voucherNum'})}
											</div>
										</div>
										{arrayOfDivs?.map((ele) => (
											<ContractCard
												key={ele.id}
												val1={ele.contractPaidType}
												onChange1={(e) => handelChangePaidDate(e, ele.id)}
												val2={ele.contractPaidJudge}
												onChange2={(e, value) => handelChangePaidStage(e,value, ele.id)}
												val3={ele.contractPaidDate}
												onChange3={(e) => handelChangePaidDate(e, ele.id)}
												val4={ele.contractPaidAmount}
												onChange4={(e) => handelChangePaidDate(e, ele.id)}
												val5={ele.contractPaidNumber}
												onChange5={(e) => handelChangePaidDate(e, ele.id)}
												val6={ele.contractVoucherNumber}
												onChange6={(e) => handelChangePaidDate(e, ele.id)}
												name1={`contractPaidType`}
												name4={`contractPaidAmount`}
												name3={`contractPaidDate`}
												name2={`contractPaidJudge`}
												name5={`contractPaidNumber`}
												name6={'contractVoucherNumber'}
												theStageKindCompo = {theStageKindCompo}
											/>
										))}
										{!selectedCriteria && (
										<CIcon
											style={{ height: '16px', float: 'left', cursor: 'pointer' }}
											icon={cilPlus}
											customClassName="nav-icon"
											onClick={handelAddMorePaidDate}
										/>
										)}
									</div>
								</CCol>
						</CRow>
					</div>
					<div className={`payments ${divActive == 'attachments' ? 'active' : null}`}>
							<CButton className="add-contact" onClick={() => handelAddAttachment(editCriterai?.COR_ID_PK)}>
								<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
							</CButton>
						<CRow>
							<CCol md={12}>
								{
									selectedCriteria || editCriterai ? (
										editCriterai?._FILE > 0 || selectedCriteria?._FILE > 0 ? (
											<CTable bordered responsive>
											<AttachedHeadTable editCiteria={editCriterai}/>
												<CTableBody>
													{attachment?.map((ele, i) => (
														<CTableRow
															key={i}
														>
															<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
															<CTableDataCell 
															onClick={() => {
																dispatch(
																	getcontractAttachmentData({
																		id: selectedCriteria?.COR_ID_PK || editCriterai?.COR_ID_PK,
																		attachedId: ele?.ATH_ID_PK,
																		fileName: ele?.ATH_NAME,
																	})
																).then((res) => {
																	console.log('res: ', res);
																	if (res?.payload?.status == 404) {
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
														{editCriterai?.COR_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editCriterai?.COR_ID_PK)}
																>
																	<CIcon
																		style={{ height: '16px', marginRight: '-3px' }}
																		icon={cilTrash}
																		customClassName="nav-icon"
																	/>
																</CButton>
															</CTableDataCell>
														) : null}
														</CTableRow>
													))}
												</CTableBody>
											</CTable>
										) : (
											<p>{formatMessage({id: 'notFound'})}</p>
										)
									) : null}
							</CCol>
						</CRow>
					</div>
				</div>
			</CModalBody>
			<CModalFooter>
				{selectedCriteria ? null : editCriterai ? (
					<CButton className="btn-modal-save" color="primary" onClick={handleUpdateContract}>
						{formatMessage({id: 'saveChanges'})}
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={handleAddNewContract}>
					{formatMessage({id: 'add'})}
					</CButton>
				)}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					{formatMessage({id: 'close'})}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const data = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: formatMessage({id: 'contractNum'}),
				field: 'contractNum',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({id: 'type'}),
				field: 'contractType',
				sort: 'asc',
				width: 200,
			},
			{
				label: formatMessage({id: 'contractDate'}),
				field: 'contractDate',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({id: 'client'}),
				field: 'client',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({id: 'startDate'}),
				field: 'startDate',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({id: 'epiryDate'}),
				field: 'endDate',
				sort: 'asc',
				width: 100,
			},
			{
				label: '    ',
				field: 'DeletEdit',
				sort: '',
				width: 100,
			},
		],
		rows:
			allCritaria?.length > 0
				? allCritaria?.map((data, index) => {
						return {
							id: (index += 1),
							contractNum: <a onClick={() => getCriteriaById(data.COR_ID_PK)}>{data.COR_NUMBER}</a>,
							contractType: <a onClick={() => getCriteriaById(data.COR_ID_PK)}>{document.body.getAttribute("dir") == 'rtl' ? data.COR_KIND_NAME : data.COR_KIND_NAME_EN}</a>,
							client: <a onClick={() => getCriteriaById(data.COR_ID_PK)}>{document.body.getAttribute("dir") == 'ltr' && data.CLI_NAME_ENGLISH ? data.CLI_NAME_ENGLISH :  data.CLI_NAME}</a>,
							contractDate: (
								<a onClick={() => getCriteriaById(data.COR_ID_PK)}>
									{data.COR_DATE && new Intl.DateTimeFormat('en-US').format(new Date(data.COR_DATE))}
								</a>
							),
							startDate: (
								<a onClick={() => getCriteriaById(data.COR_ID_PK)}>
									{data.COR_FROM_DATE && new Intl.DateTimeFormat('en-US').format(new Date(data.COR_FROM_DATE))}
								</a>
							),
							endDate: (
								<a onClick={() => getCriteriaById(data.COR_ID_PK)}>
									{data.COR_TO_DATE && new Intl.DateTimeFormat('en-US').format(new Date(data.COR_TO_DATE))}
								</a>
							),
							DeletEdit: (
								<p>
									<CButton style={{ background: '#1e42a0 !important' }}>
										<CIcon
											onClick={() => editSelectedContract(data.COR_ID_PK)}
											style={{ height: '16px', marginRight: '-3px' }}
											icon={cilPencil}
											customClassName="nav-icon"
										/>
									</CButton>
									<CButton color={'danger'} onClick={() => handleOpenDeleteModal(data.COR_ID_PK)}>
										<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
									</CButton>
								</p>
							),
						};
				  })
				: [],
	};

	// classification and search
	const handleChangeClassification = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[CorNumSearch, corDateFrom, corDateTo, corAmountFrom, coreAmountTo, nameSearch, searchVal, selectedVal, classifiedName]
	);
	const classifiedFun = React.useCallback(() => {
		if(corDateFrom?.getTime() > corDateTo?.getTime()){
			setclassifiedValidator1(true)
		}
		if(corAmountFrom > coreAmountTo){
			setclassifiedValidator2(true)
		}
		dispatch(
			getContracts({
				theParams: {
					CorNumSearch: CorNumSearch ? CorNumSearch : undefined,
					corDateFrom: corDateFrom ? corDateFrom : undefined,
					corDateTo: corDateTo ? corDateTo : undefined,
					corAmountFrom: corAmountFrom ? corAmountFrom : undefined,
					coreAmountTo: coreAmountTo ? coreAmountTo : undefined,
					nameSearch: nameSearch ? nameSearch : undefined,
					searchVal: searchVal ? searchVal : undefined,
					selctedVal: selectedVal == '2' ? 2 : selectedVal == '3' ? 3 : selectedVal == '4' ? 4 : selectedVal == '5' ? 5 : undefined,
				},
			})
		).then((data) => setAllCritaria(data.payload.data));
	}, [CorNumSearch, corDateFrom, corDateTo, corAmountFrom, coreAmountTo, nameSearch, searchVal, selectedVal, classifiedName]);

	const closeClassificationCriteria = () => {
		setNameSearch('');
		setCorNumSearch('');
		setcorDateFrom('');
		setcorDateTo('');
		setcorAmountFrom('');
		setcoreAmountTo('');
		setClassifiedName([]);
		dispatch(
			getContracts({
				theParams: null,
			})
		).then((data) => setAllCritaria(data.payload.data));
	};
	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[CorNumSearch, corDateFrom, corDateTo, corAmountFrom, coreAmountTo, nameSearch, searchVal, selectedVal, classifiedName]
	);

	const searchByChar = (e) => {
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setAllCritaria(allContrcts.data);
		} else {
			const newClassifiedArr = allCritaria?.filter((ele) =>
				Object.values(ele).find((ele2) =>
					typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
				)
			);
			setAllCritaria(newClassifiedArr);
		}
	};

	const handelChangePgae = React.useCallback(
		(e, val) => {
			setId(val);
			dispatch(
				getContracts({
					theParams: {
						offset: (val - 1) * 10,
					},
				})
			).then((data) => setAllCritaria(data.payload?.data));
		},
		[page]
	);

	const pagesNum = allContrcts?.total ? parseInt(Math.ceil(allContrcts?.total / 10)) : 1;
	return (
		<div className="contracts">
			<CRow>
				<CCol md={3}>
					<div className=" card-inputs-flex mb-2">
						<div className="classification">
							<FormControl>
								<Select
									labelId="demo-customized-select-label"
									id="demo-customized-select"
									value={selectedVal}
									onChange={(e) => fetchDataSelectedByAttached(e)}
									// input={<BootstrapInput />}
								>
									<MenuItem value={'1'}>{formatMessage({id: 'theAll'})}</MenuItem>
									<MenuItem value={'2'}>{formatMessage({id: 'stageContract'})}</MenuItem>
									<MenuItem value={'3'}>{formatMessage({id: 'consultContract'})}</MenuItem>
									<MenuItem value={'4'}>{formatMessage({id: 'consultStgContract'})}</MenuItem>
									<MenuItem value={'5'}>{formatMessage({id: 'notAttachedContract'})}</MenuItem>
								</Select>
							</FormControl>
						</div>
					</div>
				</CCol>
				<CCol md={9}>
					<div className="agency-navs">
						<CNav className="">
							<p>
								<CTooltip content={formatMessage({id: 'preview'})} placement="bottom">
									<CIcon size={'sm'} icon={cilFindInPage} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content={formatMessage({id: 'print'})} placement="bottom">
									<CIcon size={'sm'} icon={cilPrint} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content=" pdf" placement="bottom">
									<CIcon size={'xl'} icon={cilSave} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content={formatMessage({id: 'printLater'})} placement="bottom">
									<CIcon size={'sm'} icon={cilShareBoxed} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content={formatMessage({id: 'send'})} placement="bottom">
									<CIcon size={'sm'} icon={cilCursor} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content="outlook" placement="bottom">
									<CIcon size={'sm'} icon={cilAt} customClassName="nav-icon" />
								</CTooltip>
							</p>
						</CNav>
					</div>
				</CCol>
			</CRow>
			<div className="checkboxBtn">
				<label className="switch" onClick={(e) => setChartVisible(e.target.checked)}>
					<input type="checkbox" />
					<span className="slider round"></span>
				</label>
				<span
					style={{
						marginRight: '10px',
						display: 'inline-block',
						marginTop: '-5px',
					}}
				>
					{formatMessage({id: 'charts'})}
				</span>
			</div>
			<CHeaderDivider className="mb-3 mt-2" />
			<CRow className={`${chartVisible ? 'showChart' : 'hideChart'}`}>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: [formatMessage({id: 'theAll'}), formatMessage({id: 'cases'}), formatMessage({id: 'consultions'})],
									datasets: [
										{
											data: [allContrcts?.total, stagesContract?.length, consultingContract?.length],
											backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
											hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>{formatMessage({id: 'theAll'})}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span> {formatMessage({id: 'cases'})}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span> {formatMessage({id: 'consultions'})}</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: [formatMessage({id: 'theAll'}), formatMessage({id: 'consultStgContract'})],
									datasets: [
										{
											data: [allContrcts?.total, stgConsultContract?.length],
											backgroundColor: ['#36A2EB', '#FF6384'],
											hoverBackgroundColor: ['#36A2EB', '#FF6384'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>{formatMessage({id: 'theAll'})}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{formatMessage({id: 'consultStgContract'})}</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: [formatMessage({id: 'theAll'}), formatMessage({id: 'expired'}), formatMessage({id: 'notAttached'})],
									datasets: [
										{
											data: [
												allContrcts?.total,
												allContrcts.data?.filter((ele) => new Date(Date.now()).getTime() > new Date(ele.COR_TO_DATE).getTime())?.length,
												contractUnAttached?.length,
											],
											backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
											hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>{formatMessage({id: 'theAll'})}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span> {formatMessage({id: 'expired'})} </span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{formatMessage({id: 'notAttached'})}</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: [formatMessage({id: 'theAll'}), formatMessage({id: 'withoutFile'})],
									datasets: [
										{
											data: [allContrcts?.total, 1],
											backgroundColor: ['#36A2EB', '#FF6384'],
											hoverBackgroundColor: ['#36A2EB', '#FF6384'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>{formatMessage({id: 'theAll'})}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{formatMessage({id: 'withoutFile'})}</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<CRow>
				<CCol>
					<div className="headerFiles">
						<div>
							<CButton className="add-contact" onClick={openAddPopup}>
								<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
							</CButton>
							<FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
								<Select
									multiple
									displayEmpty
									value={classifiedName}
									onChange={handleChangeClassification}
									input={<OutlinedInput />}
									renderValue={(selected) => {
										if (selected.length === 0) {
											return <span>{formatMessage({id: 'classification'})}</span>;
										}

										return selected.join(', ');
									}}
									MenuProps={MenuProps}
									inputProps={{ 'aria-label': 'Without label' }}
								>
									<MenuItem disabled value="">
									</MenuItem>
									{names.map((name) => (
										<MenuItem key={name} value={name} style={getStyles(name, classifiedName, theme)}>
											{name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className="search">
							<CFormInput
								type="text"
								value={searchVal}
								onChange={(e) => searchByChar(e)}
								placeholder={`${formatMessage({id: 'search'})}...`}
								onKeyDown={(e) => handelSearchbtn(e)}
							/>
						</div>
					</div>
					<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
						{classifiedName?.find((ele) => ele == formatMessage({id: 'client'})) && (
							<TextField style={{ width: '30%' }} label={formatMessage({id: 'client'})} value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
						)}
						{classifiedName?.find((ele) => ele ==formatMessage({id: 'contractNum'})) && (
							<TextField style={{ width: '30%' }} label={formatMessage({id: 'contractNum'})} value={CorNumSearch} onChange={(e) => setCorNumSearch(e.target.value)} />
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'contractDate'})) && (
							<>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label={formatMessage({id: 'from'})}
										value={corDateFrom}
										onChange={(e) => setcorDateFrom(e)}
										renderInput={(params) => <TextField {...params} helperText={classifiedValidator1 ? formatMessage({id: 'notCorrect'}) : null}/>}
									/>
								</LocalizationProvider>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label={formatMessage({id: 'to'})}
										value={corDateTo}
										onChange={(e) => setcorDateTo(e)}
										renderInput={(params) => <TextField {...params} helperText={classifiedValidator1 ? formatMessage({id: 'notCorrect'}) : null}/>}
									/>
								</LocalizationProvider>
							</>
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'contractVal'})) && (
							<>
								<TextField
									style={{ width: '30%' }}
									label={formatMessage({id: 'valGT'})}
									value={corAmountFrom}
									onChange={(e) => setcorAmountFrom(e.target.value)}
									helperText={classifiedValidator2 ? formatMessage({id: 'notCorrect'}) : null}
								/>
								<TextField
									style={{ width: '30%' }}
									label={formatMessage({id: 'valLT'})}
									value={coreAmountTo}
									onChange={(e) => setcoreAmountTo(e.target.value)}
									helperText={classifiedValidator2 ? formatMessage({id: 'notCorrect'}) : null}
								/>
							</>
						)}
						{classifiedName.length > 0 && (
							<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
								<CButton onClick={classifiedFun}>{formatMessage({id: 'apply'})}</CButton>
								<CIcon
									style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
									icon={cilX}
									customClassName="nav-icon"
									onClick={closeClassificationCriteria}
								/>
							</div>
						)}
					</div>
					<MDBDataTable
						striped
						responsive
						small
						data={data}
						searching={true}
					/>
					<Stack spacing={2}>
						<Pagination
							count={pagesNum == 0 ? 1 : pagesNum}
							page={page}
							defaultPage={currentPage}
							siblingCount={0}
							shape="rounded"
							color="primary"
							onChange={handelChangePgae}
						/>
					</Stack>
				</CCol>
			</CRow>
			{selectedCriteria && !editCriterai
				? ReturnedPopup(selectedCriteria)
				: !selectedCriteria && editCriterai
				? ReturnedPopup(editCriterai)
				: !selectedCriteria && !editCriterai && visible
				? ReturnedPopup()
				: null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={handleDeleteContract} /> : null}
			{constantAdd == 1 ? (
				<ContractDurationConstant setOpenAddSnack={setOpenAddSnack} exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 2 ? (
				<ContractItemConstant setOpenAddSnack={setOpenAddSnack} exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 3 ? (
				<ContractTypeConstant setOpenAddSnack={setOpenAddSnack} exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 4 ? (
				<ContractStatusConstant setOpenAddSnack={setOpenAddSnack} exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 5 ? (
				<StageConstantKind setOpenAddSnack={setOpenAddSnack} exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 6 ? (<AttachedPopup exitSelectModal={() => setConstantAdd('')} 
			url={`contract/${attacmentId}/attachment`}
			id={attacmentId}
			setOpenAddSnack={setOpenAddSnack}
			setOpenAttachedSnack={setOpenAttachedSnack}
			setOpenLargeAttachement={setOpenLargeAttachement}
			callback={() => dispatch(getcontractAttachment(editCriterai?.COR_ID_PK)).then((res) => setAttachment(res.payload))}/>) :null}
			
			{voucherPopupAdd ? (
				<ReceiptVoucher
					exitSelectModal={handleCloseVoucherModal}
					setOpenEditSnack={setOpenEditSnack}
					setOpenAddSnack={setOpenAddSnack}
					selectedCriteria={null}
					editCriterai={voucherDetails} 
					editContract={editCriterai}
					arrayOfDivs={arrayOfDivs}
				/>
			) : null}
			{contractTypeChecked || OpenAttachedSnack || openAddSnack || openEditSnack || openDelSnack || openLargeAttachement? (
				<Snackbar open={true} autoHideDuration={900} onClose={handleCloseSnack}>
					<Alert
						onClose={handleCloseSnack}
						severity={`${OpenAttachedSnack || openDelSnack || contractTypeChecked || openLargeAttachement? 'error' : 'success'}`}
						sx={{ width: '100%' }}
					>
						{OpenAttachedSnack
							?formatMessage({id: 'error'})
							: openAddSnack
							? formatMessage({id: 'itemAdded'})
							: openEditSnack
							? formatMessage({id: 'itemUpdated'})
							: openDelSnack
							? formatMessage({id: 'itemDeleted'})
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' })
							: formatMessage({id: 'contractType'})}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(Contracts);
