import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
	CButton,
	CCol,
	CRow,
	CTableBody,
	CTableHeaderCell,
	CTableRow,
	CTable,
	CTableDataCell,
	CModalBody,
	CModalHeader,
	CModal,
	CModalTitle,
	CFormLabel,
	CModalFooter,
	CFormInput,
	CFormTextarea,
} from '@coreui/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { cilMinus, cilInstitution, cilPlus, cilX, cilTrash } from '@coreui/icons';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import CIcon from '@coreui/icons-react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useIntl } from 'react-intl';

import { getExecuteProcedure, getExecuteStatus, getExecuteResult, getExecuteType } from '../../../store/reducers/constants/executs';
import { ExecuteConstantStatus, ExecuteConstantResults, ExecuteConstantType, ExecuteConstantProcedure } from './executeConstants';
import AttachedHeadTable from '../../../features/attachedFileHaed';
import { ResultExecute, executeCard } from './executeItemCard';
import { getStageData } from '../../../store/reducers/stage';
import AttachedPopup from '../../../features/attachment';
import DeletePopup from '../../../features/delete';
import translation from '../../../i18n/translate';
import {
	getExecuteData,
	getExecuteById,
	updateExecute,
	addNewExecute,
	deleteExecute,
	getexecuteAttachment,
	getexecuteAttachmentData,
	deleteAttachment,
} from '../../../store/reducers/execute';
import './execute.css';

const FileExecution = () => {
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [editItem, setEditItem] = useState(null);
	const [item, setItem] = useState(null);
	const [allStages, setAllStages] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [error, setError] = useState(null);
	const [theExecute, setTheExecute] = useState('');
	const [theExecuteDate, setTheExecuteDate] = useState('');
	const [theExecuteType, setTheExecuteType] = useState('');
	const [theExecuteStatus, setTheExecuteStatus] = useState('');
	const [theExecutePeriod, setTheExecutePeriod] = useState('');
	const [executeNotes, setExecuteNotes] = useState('');
	const [executeNotesEn, setExecuteNotesEn] = useState('');
	const [resultNotes, setResultsNotes] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [stageNum, setStageNum] = useState('');
	const [theExeResults, settheExeResults] = useState('');
	const [executeDescription, setExecuteDescription] = useState('');
	const [resultDate, setResultDate] = useState('');
	const [theClients, setTheClients] = useState([]);
	const [exeResultsList, setexeResultsList] = useState([]);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [attachment, setAttachment] = useState([]);
	const [activeTab, setActiveTab] = useState('div1');
	const [checked1, setChecked1] = useState('');
	const [checked2, setChecked2] = useState('');
	const [checked3, setChecked3] = useState('');
	const [page, setId] = useState(1);
	const [typeExecuteSearch, setTypeExecuteSearch] = useState('');
	const [exeSearchDateFrom, setExeSearchDateFrom] = useState(undefined);
	const [exeSearchDateTo, setExeSearchDateTo] = useState(undefined);
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [searchVal, setSearchVal] = useState('');
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [contantAdd, setConstantAdd] = useState('');
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [divId, setDivId] = useState(Date.now());
	const [classifiedValidation, setClassifiedValidation] = useState(false);
	const ref0 = useRef();
	const dispatch = useDispatch();
	const { formatMessage } = useIntl();
	const { allEmployee } = useSelector((state) => state.employee);

	const { allExecute } = useSelector((state) => state.execute);
	const { theExecuteProcedure, theExecuteStatusCompo, theExecuteResultsCompo, theExecuteTypeCompo } = useSelector((state) => state.executeConstraint);

	const names = [formatMessage({ id: 'executeType' }), formatMessage({ id: 'executeDate' })];
	const { id, name, speicifiedId } = useParams();
	useEffect(() => {
		dispatch(getExecuteData({ theParams: { id: id, limit: '10' } }));
		dispatch(getStageData(id)).then((res) => setAllStages(res.payload.data));
	}, [dispatch]);

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	// material ui style for dropdown many select
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuPropsForClient = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	const theme = useTheme();
	function getStyles(name, personName, theme) {
		return {
			fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
		};
	}

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

	const exitSelectModal = () => {
		setModalVisible(false);
		setEditItem(null);
	};

	const handleChangeClients = (event) => {
		const {
			target: { value },
		} = event;
		console.log(value);
		setTheClients(typeof value === 'string' ? value.split(',') : value);
	};

	const onChangExeResultIds = (e, value, id) => {
		let newArrOfDivs = arrayOfDivs;
		newArrOfDivs.find((item) => item.id === id)[ref0.current.getAttribute('name')] = value;
		setArrayOfDivs(newArrOfDivs);
	};
	const onChangeExeResultsDiv = (e, id) => {
		let newArrOfDivs = arrayOfDivs;
		if (e.target.name == 'resultNotes') {
			newArrOfDivs.find((item) => item.id === id)['resultNotes'] = e.target.value;
		} else if (e.target.name == 'resultDate') {
			newArrOfDivs.find((item) => item.id === id)['resultDate'] = e.target.value;
		}
		setArrayOfDivs(newArrOfDivs);
	};
	// add more execute result
	const handelResultsList = () => {
		setArrayOfDivs([...arrayOfDivs, { id: divId + 1, resultNotes: '', resultDate: '', theExeResults: '' }]);
		setDivId(divId + 1);
	};

	const handelRemoveExecuteResults = (id) => {
		setArrayOfDivs((prevState) => {
			let newArr = prevState?.filter((item) => item.id !== id);
			return newArr;
		});
	};

	const handelChangeProcedure = (e, value) => {
		setTheExecuteType(value);
		const procedureId = theExecuteTypeCompo.find((ele) => ele?.EXE_TYPE_NAME == value)?.EXE_TYPE_ID_PK;
		dispatch(getExecuteProcedure(procedureId));
	};

	//open add modal execute
	const openAddExecute = () => {
		setModalVisible(true);
		setEditItem(null);
		emptyInputsVals();
	};

	const emptyInputsVals = () => {
		setStageNum('');
		setTheExecute('');
		setTheExecuteDate('');
		setTheExecuteType('');
		setTheExecuteStatus('');
		setexeResultsList([]);
		setTheClients([]);
		setTheExecutePeriod('');
		setExecuteNotes('');
		setExecuteNotesEn('');
		setStageNum('');
		settheExeResults('');
		setResultsNotes('');
		setResultDate('');
	};
	//post new Execute
	const addExecute = () => {
		let newReqsArr = [];
		newReqsArr =
			arrayOfDivs.length > 0 &&
			arrayOfDivs.map((ele) => ({
				RESULT_DATE: ele.resultDate ? ele.resultDate : undefined,
				EXE_RESULT_ID_PK: ele.theExeResults
					? theExecuteResultsCompo?.find((ele1) => ele1?.EXE_RESULT_NAME || ele1?.EXE_RESULT_NAME_EN == ele.theExeResults)?.EXE_RESULT_ID_PK
					: undefined,
				RESULT_NOTE: ele.resultNotes ? ele.resultNotes : undefined,
			}));
		const theClientsIds = theClients
			?.map((ele) => {
				return allEmployee.find((ele2) => ele == ele2.EMP_NAME || ele2.EMP_NAME_ENGLISH);
			})
			.map((finalEle) => finalEle.EMP_ID_PK);
		// console.log('newReqsArr: ', newReqsArr);
		dispatch(
			addNewExecute({
				EXE_DATE: theExecuteDate ? theExecuteDate : undefined,
				EXE_TYPE_ID_PK: theExecuteType
					? theExecuteTypeCompo.find((ele) => ele?.EXE_TYPE_NAME || ele?.EXE_TYPE_NAME_EN == theExecuteType)?.EXE_TYPE_ID_PK
					: undefined,
				EXE_STATUS_ID_PK: theExecuteStatus
					? theExecuteStatusCompo.find((ele) => ele?.EXE_STATUS_NAME || ele?.EXE_STATUS_NAME_EN == theExecuteStatus)?.EXE_STATUS_ID_PK
					: undefined,
				EXE_NOTES: executeNotes ? executeNotes : undefined,
				EXE_NOTES_EN: executeNotesEn ? executeNotesEn : undefined,
				EXE_PROCEDURE_ID_PK: theExecute
					? theExecuteProcedure.find((ele) => ele?.EXE_PROCEDURE_NAME || ele?.EXE_PROCEDURE_NAME_EN == theExecute)?.EXE_PROCEDURE_ID_PK
					: undefined,
				CAS_ID_PK: Number(id),
				EXE_DURATION: theExecutePeriod ? Number(theExecutePeriod) : undefined,
				EXE_DESCRIPTION: executeDescription ? executeDescription : undefined,
				EXE_DESCRIPTION_EN: undefined,
				STG_ID_PK: stageNum ? Number(stageNum) : undefined,
				Employees: theClients ? theClientsIds : undefined,
				ExecuteResult: newReqsArr ? newReqsArr : undefined,
			})
		).then((res) => {
			// console.log(res.payload)
			if (res.payload?.res?.data?.code == '123') {
				// console.log('execute page', res.payload?.res?.data);
				setError(res.payload?.res?.data);
			} else {
				dispatch(getExecuteData({ theParams: { id: id, limit: '10' } })).then(() => {
					setModalVisible(false);
					setOpenAddSnack(true);
					emptyInputsVals();
				});
			}
		});
	};

	// open edit modal
	const editExecut = (id) => {
		console.log(id);
		setModalVisible(true);
		dispatch(getexecuteAttachment(id)).then((res) => setAttachment(res.payload));
		dispatch(getExecuteStatus());
		dispatch(getExecuteResult());
		dispatch(getExecuteType());
		dispatch(getExecuteById(id)).then((res) => {
			setEditItem(res.payload);
			res.payload?.EXE_PROCEDURE_NAME &&
				dispatch(getExecuteProcedure(res.payload?.EXE_TYPE_ID_PK)).then((result) =>
					setTheExecute(
						document.body.getAttribute('dir') == 'ltr' && res.payload?.EXE_PROCEDURE_NAME_EN
							? result.payload?.find((ele) => ele?.EXE_PROCEDURE_NAME_EN == res.payload?.EXE_PROCEDURE_NAME_EN)?.EXE_PROCEDURE_NAME_EN
							: res.payload?.EXE_PROCEDURE_NAME
							? result.payload?.find((ele) => ele?.EXE_PROCEDURE_NAME == res.payload?.EXE_PROCEDURE_NAME)?.EXE_PROCEDURE_NAME
							: ''
					)
				);
			const theEditResults =
				res.payload?.results.length > 0
					? res.payload?.results.map((ele, i) => ({
							id: divId + i,
							theExeResults:
								document.body.getAttribute('dir') == 'ltr' && ele?.EXE_RESULT_NAME_EN
									? ele?.EXE_RESULT_NAME_EN
									: ele?.EXE_RESULT_NAME
									? ele?.EXE_RESULT_NAME
									: '',
							resultDate: ele?.RESULT_DATE ? new Date(ele?.RESULT_DATE).toISOString().split('T')[0] : '',
							resultNotes: ele?.RESULT_NOTE ? ele?.RESULT_NOTE : '',
					  }))
					: [];
			// console.log("theEditResults: ", theEditResults)
			setStageNum(res.payload ? res.payload?.stg_id_pk : '');
			setTheExecuteDate(res.payload ? new Date(res.payload?.EXE_DATE).toISOString().split('T')[0] : '');
			setTheExecuteType(
				document.body.getAttribute('dir') == 'ltr' && res.payload?.EXE_TYPE_NAME_EN
					? res.payload?.EXE_TYPE_NAME_EN
					: res.payload?.EXE_TYPE_NAME
					? res.payload?.EXE_TYPE_NAME
					: ''
			);
			setTheExecuteStatus(
				document.body.getAttribute('dir') == 'ltr' && res.payload?.EXE_STATUS_NAME_EN
					? res.payload?.EXE_STATUS_NAME_EN
					: res.payload?.EXE_STATUS_NAME
					? res.payload?.EXE_STATUS_NAME
					: ''
			);
			setArrayOfDivs(theEditResults);
			setTheClients(
				res.payload
					? res.payload?.employees.map((ele) =>
							document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME
					  )
					: theClients
			);
			setTheExecutePeriod(res.payload ? res.payload?.EXE_DURATION : '');
			setExecuteNotes(res.payload ? res.payload?.EXE_NOTES : '');
			setExecuteNotesEn(res.payload ? res.payload?.EXE_NOTES_EN : '');
		});
	};

	//put execute
	const saveUpdate = () => {
		let newReqsArr = [];
		newReqsArr =
			arrayOfDivs.length > 0 &&
			arrayOfDivs.map((ele) => ({
				RESULT_DATE: ele.resultDate ? ele.resultDate : undefined,
				EXE_RESULT_ID_PK: ele.theExeResults
					? theExecuteResultsCompo?.find((ele1) => ele1?.EXE_RESULT_NAME || ele1?.EXE_RESULT_NAME_EN == ele.theExeResults)?.EXE_RESULT_ID_PK
					: undefined,
				RESULT_NOTE: ele.resultNotes ? ele.resultNotes : undefined,
			}));
		const theClientsIds = theClients
			?.map((ele) => {
				return allEmployee.find((ele2) => ele == ele2.EMP_NAME || ele2.EMP_NAME_ENGLISH);
			})
			.map((finalEle) => finalEle.EMP_ID_PK);
		dispatch(
			updateExecute({
				id: Number(editItem.EXE_ID_PK),
				data: {
					EXE_DATE: theExecuteDate ? theExecuteDate : undefined,
					EXE_TYPE_ID_PK: theExecuteType
						? theExecuteTypeCompo.find((ele) => ele?.EXE_TYPE_NAME || ele?.EXE_TYPE_NAME_EN == theExecuteType)?.EXE_TYPE_ID_PK
						: undefined,
					EXE_STATUS_ID_PK: theExecuteStatus
						? theExecuteStatusCompo.find((ele) => ele?.EXE_STATUS_NAME || ele?.EXE_STATUS_NAME_EN == theExecuteStatus)?.EXE_STATUS_ID_PK
						: undefined,
					EXE_NOTES: executeNotes ? executeNotes : undefined,
					EXE_NOTES_EN: executeNotesEn ? executeNotesEn : undefined,
					EXE_PROCEDURE_ID_PK: theExecute
						? theExecuteProcedure.find((ele) => ele?.EXE_PROCEDURE_NAME || ele?.EXE_PROCEDURE_NAME_EN == theExecute)?.EXE_PROCEDURE_ID_PK
						: undefined,
					CAS_ID_PK: Number(id),
					EXE_DURATION: theExecutePeriod ? Number(theExecutePeriod) : undefined,
					EXE_DESCRIPTION: executeDescription ? executeDescription : undefined,
					EXE_DESCRIPTION_EN: undefined,
					STG_ID_PK: stageNum ? Number(stageNum) : undefined,
					Employees: theClients ? theClientsIds : undefined,
					ExecuteResult: newReqsArr ? newReqsArr : undefined,
				},
			})
		).then((res) => {
			console.log(res?.payload);
			if (res?.payload?.res.status == 418) {
				setOpenErrorSnack(true);
				setError(res?.payload?.res?.data);
			} else {
				getExecuteData({ theParams: { id: id, limit: '10' } });
				setOpenAddSnack(true);
				setModalVisible(false);
				setOpenEditSnack(true);
				emptyInputsVals();
			}
		});
	};

	// delete Execute
	const handledelExecute = (id) => {
		setVisibleDeleteModal(true);
		setDeletedItemId(id);
	};
	const delExecute = () => {
		// console.log('deleteId: ', deleteId);
		dispatch(deleteExecute({ id: deletedItemId, caseId: id })).then((res) => {
			if (res?.payload.res?.status == 200) {
				setVisibleDeleteModal(false);
				setOpenDelSnack(true);
				setId(1);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
	};
	const handelExecuteStatus = useCallback(() => {
		dispatch(getExecuteStatus());
	}, [contantAdd]);
	const handelExecuteResults = useCallback(() => {
		dispatch(getExecuteResult());
	}, [contantAdd]);
	const handelExecuteType = useCallback(() => {
		dispatch(getExecuteType());
	}, [contantAdd]);

	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(5);
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
				dispatch(getexecuteAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};

	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal
			visible={modalVisible}
			onClose={exitSelectModal}
			className={`executePopup ${document.body.getAttribute('dir') == 'ltr' ? 'enTextLeftPopup' : null}`}
		>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilInstitution} customClassName="nav-icon" />
					{editItem ? (
						<span>
							{translation('fileNum')} {editItem?.CAS_NUMBER}
						</span>
					) : (
						<span>{translation('add')} </span>
					)}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<div className="">
					<ul className="tabs">
						<li onClick={() => setActiveTab('div1')} className={`${activeTab == 'div1' ? 'active' : null}`}>
							{translation('executeDetails')}
						</li>
						<li onClick={() => setActiveTab('div2')} className={`${activeTab == 'div2' ? 'active' : null}`}>
							{translation('description')}
						</li>
						<li onClick={() => setActiveTab('div3')} className={`${activeTab == 'div3' ? 'active' : null}`}>
							{translation('attachments')}
						</li>
					</ul>
					<div className="executeRelativeDiv">
						<div className={`absDiv ${activeTab == 'div1' ? 'active' : null}`}>
							<CRow>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(2)}>
										{translation('executeType')}
									</CFormLabel>
									<FormControl fullWidth sx={{ minWidth: '100%' }} onClick={() => handelExecuteType()}>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={theExecuteType}
											onChange={handelChangeProcedure}
											options={theExecuteTypeCompo.map((option) =>
												document.body.getAttribute('dir') == 'ltr' && option.EXE_TYPE_NAME_EN
													? option.EXE_TYPE_NAME_EN
													: option.EXE_TYPE_NAME
											)}
											// getOptionLabel={(option) => option.APP_TYPE_NAME || ""}
											renderInput={(params) => <TextField {...params} />}
										/>
									</FormControl>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4">{translation('executeDate')}</CFormLabel>
									<CFormInput
										type="date"
										defaultValue={theExecuteDate}
										onChange={(e) => setTheExecuteDate(e.target.value)}
										required
										className={`${error?.args?.filter((ele) => ele == 'body.EXE_DATE is required') ? 'is-invalid' : null}`}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
										{translation('proceding')}
									</CFormLabel>
									<FormControl fullWidth>
										<Select
											value={theExecute}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setTheExecute(e.target.value)}
										>
											{theExecuteProcedure?.map((ele) => (
												<MenuItem
													value={
														document.body.getAttribute('dir') == 'ltr' && ele?.EXE_PROCEDURE_NAME_EN
															? ele?.EXE_PROCEDURE_NAME_EN
															: ele?.EXE_PROCEDURE_NAME
													}
													key={Math.random() + ele?.EXE_PROCEDURE_ID_PK}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele?.EXE_PROCEDURE_NAME_EN
														? ele?.EXE_PROCEDURE_NAME_EN
														: ele?.EXE_PROCEDURE_NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('case')}</CFormLabel>
									<FormControl fullWidth>
										<Select
											value={stageNum}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setStageNum(e.target.value)}
											error={error?.args?.includes('body.STG_ID_PK is required') ? true : false}
										>
											{allStages?.map((ele) => (
												<MenuItem value={ele.STG_ID_PK} key={Math.random() + ele.STG_ID_PK}>
													{ele.STG_NUMBER}
												</MenuItem>
											))}
										</Select>
										{error?.args?.includes('body.STG_ID_PK is required') && <FormHelperText>required!</FormHelperText>}
									</FormControl>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
										{translation('status')}
									</CFormLabel>
									<FormControl fullWidth onClick={() => handelExecuteStatus()}>
										<Select
											value={theExecuteStatus}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setTheExecuteStatus(e.target.value)}
										>
											{theExecuteStatusCompo?.map((ele) => (
												<MenuItem
													value={
														document.body.getAttribute('dir') == 'ltr' && ele.EXE_STATUS_NAME_EN
															? ele.EXE_STATUS_NAME_EN
															: ele.EXE_STATUS_NAME
													}
													key={Math.random() + ele.EXE_STATUS_NAME}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele.EXE_STATUS_NAME_EN
														? ele.EXE_STATUS_NAME_EN
														: ele.EXE_STATUS_NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('period')}</CFormLabel>
									<CFormInput type="number" value={theExecutePeriod} min={'0'} onChange={(e) => setTheExecutePeriod(e.target.value)} />
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('theEmployees')}</CFormLabel>
									<FormControl fullWidth>
										<Select
											multiple
											displayEmpty
											value={theClients}
											onChange={handleChangeClients}
											input={<OutlinedInput />}
											renderValue={(selected) => (
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
													{selected ? selected?.map((value) => <Chip key={Math.random() + value} label={value} />) : []}
												</Box>
											)}
											MenuProps={MenuPropsForClient}
											inputProps={{ 'aria-label': 'Without label' }}
										>
											{allEmployee.map((name, i) => (
												<MenuItem
													key={Math.random() + i}
													value={
														document.body.getAttribute('dir') == 'ltr' && name.EMP_NAME_ENGLISH
															? name.EMP_NAME_ENGLISH
															: name.EMP_NAME
													}
													style={theClients ? getStyles(name, theClients, theme) : null}
												>
													{document.body.getAttribute('dir') == 'ltr' && name.EMP_NAME_ENGLISH
														? name.EMP_NAME_ENGLISH
														: name.EMP_NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
									<CFormTextarea rows="5" value={executeNotes} onChange={(e) => setExecuteNotes(e.target.value)}></CFormTextarea>
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {translation('notesEn')}</CFormLabel>
									<CFormTextarea rows="5" value={executeNotesEn} onChange={(e) => setExecuteNotesEn(e.target.value)}></CFormTextarea>
								</CCol>
								<CCol sm={12}>
									<div style={{ marginTop: '15px' }}>
										{translation('results')}
										<CIcon
											style={{
												height: '18px',
												// color: '#fff',
												margin: '5px 2px auto auto',
												cursor: 'pointer',
											}}
											icon={cilPlus}
											customClassName="nav-icon"
											onClick={handelResultsList}
										/>
									</div>
									<hr />
									{arrayOfDivs.map((ele) => (
										<ResultExecute
											key={ele.id}
											id={ele.id}
											onChange1={(e, value) => onChangExeResultIds(e, value, ele.id)}
											value1={ele.theExeResults}
											name1="theExeResults"
											name2="resultDate"
											value2={ele.resultDate}
											onChange2={(e) => onChangeExeResultsDiv(e, ele.id)}
											name3="resultNotes"
											onChange3={(e) => onChangeExeResultsDiv(e, ele.id)}
											onClickAdd={() => setConstantAdd(3)}
											value3={ele.resultNotes}
											icon={cilMinus}
											onClick={(e) => handelRemoveExecuteResults(ele.id)}
											handelExecuteStatus={() => handelExecuteResults()}
											ref0={ref0}
										/>
									))}
								</CCol>
							</CRow>
						</div>
						<div className={`absDiv ${activeTab == 'div2' ? 'active' : null}`}>
							<CFormLabel htmlFor="inputEmail4"> {translation('description')}</CFormLabel>
							{/* <CFormTextarea
							id="exampleFormControlTextarea1"
							rows="7"
							// value={executeDescription}
							dangerouslySetInnerHTML={{ __html: editItem?.EXE_DESCRIPTION }} 
							onChange={(e) => setExecuteDescription(e.target.value)}
						></CFormTextarea> */}
							<p dangerouslySetInnerHTML={{ __html: editItem?.EXE_DESCRIPTION }} style={{ minHeight: '100px', width: 'calc(100% - 20px)' }} />
						</div>
						<div className={`absDiv ${activeTab == 'div3' ? 'active' : null}`}>
							{editItem || item ? (<><CFormLabel style={{ cursor: 'pointer' }}>
								{translation('attachments')}
								{editItem?.EXE_ID_PK ? (
									<CIcon
										size={'sm'}
										icon={cilPlus}
										customClassName="nav-icon"
										style={{ height: '16px', width: '16px' }}
										onClick={() => handelAddAttachment(editItem?.EXE_ID_PK)}
									/>
								) : null}
							</CFormLabel>
							{item?._FILE > 0 || editItem?._FILE > 0 ? (
									<CTable bordered responsive>
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
															getexecuteAttachmentData({
																id: item?.EXE_ID_PK,
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
														{editItem?.APP_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editItem?.EXE_ID_PK)}
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
									<p> {translation('notFound')}</p>
								)}</>) : null }
						</div>
					</div>
				</div>
			</CModalBody>
			<CModalFooter>
				{item ? null : editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={saveUpdate}>
						{translation('saveChanges')}
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={addExecute}>
						{translation('add')}
					</CButton>
				)}
				<CButton color="danger" className="btn-modal-close" onClick={exitSelectModal}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const showResultExecute = (id) => {
		if (checked1) {
			console.log('yes 1', checked1);
			setChecked1('');
		} else {
			setChecked1(id);
			setChecked2('');
			setChecked3('');
		}
	};

	const showAttachments = (id) => {
		if (checked2 == id) {
			setChecked2('');
		} else {
			setChecked1('');
			setChecked2(id);
			setChecked3('');
		}
	};
	const showDiscription = (id) => {
		if (checked3 == id) {
			setChecked3('');
		} else {
			setChecked1('');
			setChecked2('');
			setChecked3(id);
		}
	};
	// classification and search
	const classifiedFun = React.useCallback(() => {
		if (exeSearchDateFrom > exeSearchDateTo) {
			setClassifiedValidation(true);
		}
		dispatch(
			getExecuteData({
				theParams: {
					typeExecuteSearch: typeExecuteSearch ? typeExecuteSearch : undefined,
					exeSearchDateFrom: exeSearchDateFrom ? exeSearchDateFrom : undefined,
					exeSearchDateTo: exeSearchDateTo ? exeSearchDateTo : undefined,
					searchVal: searchVal ? searchVal : undefined,
					id: id ? id : undefined,
					limit: '10',
				},
			})
		);
	}, [classifiedName, typeExecuteSearch, exeSearchDateFrom, exeSearchDateTo, searchVal, id]);

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[classifiedName, typeExecuteSearch, exeSearchDateFrom, exeSearchDateTo, searchVal, id]
	);
	const handleChange = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[classifiedName, typeExecuteSearch, exeSearchDateFrom, exeSearchDateTo, searchVal, id]
	);

	const searchByChar = (e) => {
		// console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allExecute?.data);
		} else {
			const newClassifiedArr = allExecute?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};
	const handelClassificationForm = () => {
		setClassifiedName([]);
		setTypeExecuteSearch('');
		setExeSearchDateFrom(undefined);
		setExeSearchDateTo(undefined);
		dispatch(
			getExecuteData({
				theParams: {
					id: id,
					typeExecuteSearch: undefined,
					exeSearchDateFrom: undefined,
					exeSearchDateTo: undefined,
					searchVal: undefined,
					limit: '10',
				},
			})
		);
	};
	//change page
	const handelChangePgae = React.useCallback(
		(e, val) => {
			setId(val);
			const newVal = val == 0 ? 0 : val - 1;
			dispatch(
				getExecuteData({
					theParams: {
						offset: newVal * 10,
						id: id,
						limit: '10',
					},
				})
			);
		},
		[page]
	);
	return (
		<div className="file-executes box">
			<div className="headerFiles">
				<div className="addSes">
					<CButton onClick={openAddExecute}>
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton>
					<FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
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
							MenuProps={MenuPropsForClient}
							inputProps={{ 'aria-label': 'Without label' }}
						>
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
						placeholder={`${formatMessage({ id: 'search' })}...`}
						onKeyDown={(e) => handelSearchbtn(e)}
					/>
				</div>
			</div>
			<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
				{classifiedName?.find((ele) => ele == formatMessage({ id: 'executeType' })) && (
					<TextField
						style={{ width: '30%' }}
						label={formatMessage({ id: 'executeType' })}
						value={typeExecuteSearch}
						onChange={(e) => setTypeExecuteSearch(e.target.value)}
					/>
				)}
				{classifiedName?.find((ele) => ele == formatMessage({ id: 'executeDate' })) && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({ id: 'from' })}
								value={exeSearchDateFrom}
								onChange={setExeSearchDateFrom}
								renderInput={(params) => (
									<TextField {...params} helperText={classifiedValidation ? formatMessage({ id: 'notCorrect' }) : null} />
								)}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({ id: 'to' })}
								value={exeSearchDateTo}
								onChange={setExeSearchDateTo}
								renderInput={(params) => (
									<TextField {...params} helperText={classifiedValidation ? formatMessage({ id: 'notCorrect' }) : null} />
								)}
							/>
						</LocalizationProvider>
					</>
				)}
				{classifiedName.length > 0 && (
					<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
						<CButton onClick={classifiedFun}>{translation('apply')}</CButton>
						<CIcon
							style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
							icon={cilX}
							customClassName="nav-icon"
							onClick={handelClassificationForm}
						/>
					</div>
				)}
			</div>
			<CRow>
				{searchedDiv
					? executeCard({
							data: searchedDiv,
							attachment,
							selectedCriteria: editItem,
							checked1,
							checked2,
							checked3,
							showResultExecute,
							showAttachments,
							showDiscription,
							editExecut,
							delExecute: handledelExecute,
							setConstantAdd: setConstantAdd,
							setOpenAttachedSnack: setOpenAttachedSnack,
							dispatch: dispatch
					  })
					: executeCard({
							data: allExecute?.data,
							attachment,
							selectedCriteria: editItem,
							checked1,
							checked2,
							checked3,
							showResultExecute,
							showAttachments,
							showDiscription,
							editExecut,
							delExecute: handledelExecute,
							setConstantAdd: setConstantAdd,
							setOpenAttachedSnack: setOpenAttachedSnack,
							dispatch: dispatch
					  })}
			</CRow>

			<Stack spacing={2}>
				<Pagination
					count={allExecute?.total ? Math.ceil(allExecute?.total / 10) : 1}
					page={page}
					defaultPage={currentPage}
					siblingCount={0}
					// variant="outlined"
					shape="rounded"
					color="primary"
					onChange={handelChangePgae}
				/>
			</Stack>
			{editItem ? ReturnedPopup(editItem) : !editItem && modalVisible ? ReturnedPopup() : null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={delExecute} /> : null}
			{openAddSnack || openDelSnack || openDelErrorSnack || openErrorSnack ? (
				<Snackbar
					open={openAddSnack || openDelSnack || openDelErrorSnack || openAttachedSnack || openErrorSnack}
					autoHideDuration={600}
					onClose={handleCloseSnack}
				>
					<Alert
						onClose={handleCloseSnack}
						severity={`${openDelSnack || openDelErrorSnack || openAttachedSnack || openErrorSnack ? 'error' : 'success'}`}
						sx={{ width: '100%' }}
					>
						{openEditSnack
							? translation('itemUpdated')
							: openDelSnack
							? translation('itemDeleted')
							: openDelErrorSnack
							? translation('alreadyUSed')
							: openAttachedSnack
							? translation('error')
							: openErrorSnack
							? translation('error')
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' })
							: translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
			{contantAdd == 1 ? (
				<ExecuteConstantStatus exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : contantAdd == 2 ? (
				<ExecuteConstantType exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : contantAdd == 3 ? (
				<ExecuteConstantResults exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : contantAdd == 4 ? (
				<ExecuteConstantProcedure exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : contantAdd == 5 ? (
				<AttachedPopup exitSelectModal={() => setConstantAdd('')} 
				url={`execute/${attacmentId}/attachment`}
				id={attacmentId}
				setOpenAddSnack={setOpenAddSnack}
				setOpenAttachedSnack={setOpenAttachedSnack}
				setOpenLargeAttachement={setOpenLargeAttachement}
				callback={() => dispatch(getexecuteAttachment(editItem?.EXE_ID_PK)).then((res) => setAttachment(res.payload))}/>
			) : null}
		</div>
	);
};

export default React.memo(FileExecution);
