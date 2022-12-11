import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
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
	CFormTextarea,
	CTable,
	CTableBody,
	CTableCaption,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning, cilTrash, cilPencil, cilPlus, cilX } from '@coreui/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import {
	getWarningsData,
	getWarningById,
	addNewWarning,
	updateWarning,
	deleteWarning,
	getwarningAttachment,
	getwarningAttachmentData,
	deleteAttachment,
} from '../../../store/reducers/warnings';
import AttachedHeadTable from '../../../features/attachedFileHaed';
import { getWarnResults, getWarnStatus, getWarnSubjects, getWarnMethods } from '../../../store/reducers/constants/warning';
import { WarningConstantResults, WarningConstantStatus, WarningConstantMethod, WarningConstantSubject } from './warningConstant';
import { getEmployeeData } from '../../../store/reducers/emlpoyee';
import DeletePopup from '../../../features/delete';
import AttachedPopup from '../../../features/attachment'
import translation from '../../../i18n/translate';

const FileAlerts = () => {
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [item, setItem] = useState('');
	const [editItem, setEditItem] = useState('');
	const [visible, setVisible] = useState(false);
	const [warNum, setwarNum] = useState('');
	const [WarDate, setWarDate] = useState('');
	const [WarAdv, setWarAdv] = useState('');
	const [warPeriod, setwarPeriod] = useState('');
	const [warStatus, setwarStatus] = useState('');
	const [warMethod, setwarMethod] = useState('');
	const [warClients, setwarClients] = useState('');
	const [warAgents, setwarAgents] = useState([]);
	const [warAnts, setwarAnts] = useState([]);
	const [warSub, setwarSub] = useState('');
	const [warResult, setwarResult] = useState('');
	const [warNotes, setwarNotes] = useState('');
	const [warAttached, setwarAttached] = useState('');
	const [attachment, setAttachment] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [OpenEditSnack, setOpenEditSnack] = useState(false);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [error, setError] = useState(null);
	const [warNumSearch, setWarNumSearch] = useState('');
	const [warSearchDateFrom, setWarSearchDateFrom] = useState(undefined);
	const [warSearchDateTo, setWarSearchDateTo] = useState(undefined);
	const [searchVal, setSearchVal] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [constantAdd, setConstantAdd] = useState('');
	const [classifiedValidation, setClassifiedValidation] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [warNotesEN, setwarNotesEN] = useState('');
	const { formatMessage } = useIntl();
	const names = [
		`${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'theNumber' })}`,
		`${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'date' })}`,
	];

	const { allEmployee } = useSelector((state) => state.employee);

	const { id, name, speicifiedId } = useParams();
	const dispatch = useDispatch();

	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { allWarnings } = useSelector((state) => state.warning);
	const { theWarningResults, theWarningStatus, theWarningSubjects, theWarningMethods } = useSelector((state) => state.warningConstant);

	useEffect(() => {
		dispatch(getEmployeeData());
		// get all warning
		dispatch(getWarningsData({ theParams: { id: id } }));
		name == 'warning' && speicifiedId && editItemById(speicifiedId);
	}, [dispatch]);
	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
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
		setVisible(false);
		setItem(null);
		setEditItem(null);
	};
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
	const handleChangeAgents = (event) => {
		const {
			target: { value },
		} = event;
		setwarAgents(typeof value === 'string' ? value.split(',') : value);
	};

	const handleChangeAnts = (event) => {
		const {
			target: { value },
		} = event;
		setwarAnts(typeof value === 'string' ? value.split(',') : value);
	};

	// get warning by id
	const fetchItemById = (warningId) => {
		dispatch(getWarningById(warningId))
			.then((res) => setItem(res.payload))
			.then(() => {
				dispatch(getwarningAttachment(id)).then((res) => setAttachment(res.payload));
				setEditItem(null);
				setVisible(!visible);
			});
	};

	//empty all inputs fields
	const emptyAllInputs = () => {
		setwarNum('');
		setWarDate('');
		setWarAdv('');
		setwarPeriod('');
		setwarStatus('');
		setwarMethod('');
		setwarClients('');
		setwarAgents([]);
		setwarAnts([]);
		setwarSub('');
		setwarResult('');
		setwarNotes('');
		setwarAttached('');
	};

	const openAddPopup = () => {
		emptyAllInputs();
		setEditItem(null);
		setItem(null);
		setVisible(true);
	};
	//TODO: { "code": "3204771","message": "WarningSubject not found.","args": {}}
	// post warning
	const addWarning = () => {
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		const theAgentsIds = selectedCase?.clients
			?.filter((ele) => ele?.CLI_TYPE_ID_PK == 2)
			?.filter((ele) => {
				return warAgents.find((ele2) => ele?.CLI_NAME || ele?.CLI_NAME_ENGLISH == ele2);
			})
			.map((finalEle) => finalEle.CLI_ID_PK);
		const theAntsIds = selectedCase?.clients
			?.filter((ele) => ele?.CLI_TYPE_ID_PK == 7)
			?.filter((ele) => {
				return warAnts.find((ele2) => ele?.CLI_NAME || ele?.CLI_NAME_ENGLISH == ele2);
			})
			.map((finalEle) => finalEle.CLI_ID_PK);

		const theFollowerIds = allEmployee?.find((ele) => ele?.EMP_NAME || ele?.EMP_NAME_EN == warClients)?.EMP_ID_PK;
		// console.log(warSub)
		dispatch(
			addNewWarning({
				WRN_NUMBER: warNum ? warNum : undefined,
				WRN_DATE: WarDate ? WarDate : undefined,
				WRN_ADV_DATE: WarAdv ? WarAdv : undefined,
				WRN_SUBJECT_ID_PK: warSub
					? theWarningSubjects.find((option) => option.WRN_SUBJECT_NAME || option.WRN_SUBJECT_NAME_EN == warSub)?.WRN_SUBJECT_ID_PK
					: undefined,
				WRN_STATUS_ID_PK: warStatus
					? theWarningStatus.find((ele) => ele?.WRN_STATUS_NAME || ele?.WRN_STATUS_NAME_EN == warStatus)?.WRN_STATUS_ID_PK
					: undefined,
				WRN_METHOD_ID_PK: warMethod
					? theWarningMethods?.find((ele) => ele?.WRN_METHOD_NAME || ele?.WRN_METHOD_NAME_EN == warMethod)?.WRN_METHOD_ID_PK
					: undefined,
				EMP_ID_PK: theFollowerIds ? theFollowerIds : undefined,
				WRN_DURATION: warPeriod ? warPeriod : undefined,
				WRN_NOTES: warNotes ? warNotes : undefined,
				WRN_NOTES_EN: warNotesEN ? warNotesEN : undefined,
				WRN_RESULT_ID_PK: warResult
					? theWarningResults.find((option) => option.WRN_RESULT_NAME || option.WRN_RESULT_NAME_EN == warResult)?.WRN_RESULT_ID_PK
					: undefined,
				AGENTS: theAgentsIds ? theAgentsIds : undefined,
				ANTS: theAntsIds ? theAntsIds : undefined,
				CAS_ID_PK: id,
			})
		)
			.then((res) => {
				// console.log(res?.payload?.res);
				if (res.payload?.res?.data?.code == '123') {
					setError(res.payload?.res?.data);
					console.log('yes');
				} else if (res.payload?.res?.data?.code == '3034771') {
					setOpenErrorSnack(false);
				} else {
					// console.log('no');
					setVisible(false);
					setOpenAddSnack(true);
					emptyAllInputs();
				}
			})
			.then(() => dispatch(getWarningsData({ theParams: { id: id } })));
	};

	// open edit modal
	const editItemById = (warningId) => {
		// console.log(allEmployee);
		const selectedCaseAgent = selectedCase?.clients.filter((ele2) => ele2?.CLI_TYPE_ID_PK == 2);
		const selectedCaseAnts = selectedCase?.clients.filter((ele2) => ele2?.CLI_TYPE_ID_PK == 7);
		setItem(null);
		setVisible(!visible);
		dispatch(getWarnStatus());
		dispatch(getWarnResults());
		dispatch(getWarnSubjects());
		dispatch(getWarnMethods());
		dispatch(getwarningAttachment(warningId)).then((res) => setAttachment(res.payload))
		dispatch(getWarningById(warningId)).then((res) => {
			setEditItem(res.payload);
			setwarNum(res.payload?.WRN_NUMBER ? res.payload?.WRN_NUMBER : '');
			setWarDate(res.payload?.WRN_DATE ? new Date(res.payload?.WRN_DATE).toISOString().split('T')[0] : '');
			setWarAdv(res.payload?.WRN_ADV_DATE ? new Date(res.payload?.WRN_ADV_DATE).toISOString().split('T')[0] : '');
			setwarPeriod(res.payload?.WRN_DURATION ? res.payload?.WRN_DURATION : '');
			setwarStatus(
				document.body.getAttribute('dir') == 'ltr' && res.payload?.WRN_STATUS_NAME_EN ? res.payload?.WRN_STATUS_NAME_EN : res.payload?.WRN_STATUS_NAME
			);
			setwarMethod(
				document.body.getAttribute('dir') == 'ltr' && res.payload?.WRN_METHOD_NAME_EN ? res.payload?.WRN_METHOD_NAME_EN : res.payload?.WRN_METHOD_NAME
			);
			setwarClients(
				document.body.getAttribute('dir') == 'ltr' && res.payload?.EMP_NAME_ENGLISH
					? res.payload?.EMP_NAME_ENGLISH
					: res.payload?.EMP_NAME
					? res.payload?.EMP_NAME
					: ''
			);
			setwarAgents(
				document.body.getAttribute('dir') == 'ltr' && res.payload?.AGENTS_EN?.length > 1
					? res.payload?.AGENTS_EN.split('-')?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME.trim() == ele?.trim())?.CLI_NAME_ENGLISH)
					: res.payload?.AGENTS
					? res.payload?.AGENTS.split('-')?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME.trim() == ele?.trim())?.CLI_NAME)
					: []
			);
			setwarAnts(
					document.body.getAttribute('dir') == 'ltr' && res.payload?.ANTS_EN?.length > 1
						? res.payload?.ANTS_EN.split('-')?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME.trim() == ele?.trim())?.CLI_NAME_ENGLISH)
						: res.payload?.ANTS
						? res.payload?.ANTS.split('-')?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME.trim() == ele?.trim())?.CLI_NAME)
						: []
			);
			setwarSub(document.body.getAttribute('dir') == 'ltr' && res.payload?.WRN_SUBJECT_NAME_EN ? res.payload?.WRN_SUBJECT_NAME_EN : res.payload?.WRN_SUBJECT_NAME);
			setwarResult(document.body.getAttribute('dir') == 'ltr' && res.payload?.WRN_RESULT_NAME_EN ? res.payload?.WRN_RESULT_NAME_EN : res.payload?.WRN_RESULT_NAME);
			setwarNotes(res.payload?.WRN_NOTES ? res.payload?.WRN_NOTES : '');
			setwarAttached(res.payload?._FILE ? res.payload?._FILE : '');
		});
	};
	//TODO: subject dropdown has aproblem
	//put warning
	const saveUpdate = (editId) => {
		const theAgentsIds = selectedCase?.clients
			?.filter((ele) => ele?.CLI_TYPE_ID_PK == 2)
			?.filter((ele) => {
				return warAgents.find((ele2) => ele?.CLI_NAME || ele?.CLI_NAME_ENGLISH == ele2);
			})
			.map((finalEle) => finalEle.CLI_ID_PK);
		const theAntsIds = selectedCase?.clients
			?.filter((ele) => ele?.CLI_TYPE_ID_PK == 7)
			?.filter((ele) => {
				return warAnts.find((ele2) => ele?.CLI_NAME || ele?.CLI_NAME_ENGLISH == ele2);
			})
			.map((finalEle) => finalEle.CLI_ID_PK);

		const theFollowerIds = allEmployee?.find((ele) => ele?.EMP_NAME || ele?.EMP_NAME_ENGLISH == warClients)?.EMP_ID_PK;
		dispatch(
			updateWarning({
				warId: editId,
				data: {
					WRN_NUMBER: warNum ? warNum : undefined,
					WRN_DATE: WarDate ? WarDate : undefined,
					WRN_ADV_DATE: WarAdv ? WarAdv : undefined,
					WRN_SUBJECT_ID_PK: warSub
						? theWarningSubjects.find((option) => option.WRN_SUBJECT_NAME || option.WRN_SUBJECT_NAME_EN == warSub)?.WRN_SUBJECT_ID_PK
						: undefined,
					WRN_STATUS_ID_PK: warStatus
						? theWarningStatus.find((ele) => ele?.WRN_STATUS_NAME || ele?.WRN_STATUS_NAME_EN == warStatus)?.WRN_STATUS_ID_PK
						: undefined,
					WRN_METHOD_ID_PK: warMethod
						? theWarningMethods?.find((ele) => ele?.WRN_METHOD_NAME || ele?.WRN_METHOD_NAME_EN == warMethod)?.WRN_METHOD_ID_PK
						: undefined,
					EMP_ID_PK: theFollowerIds ? theFollowerIds : undefined,
					WRN_DURATION: warPeriod ? warPeriod : undefined,
					WRN_NOTES: warNotes ? warNotes : undefined,
					WRN_NOTES_EN: warNotesEN ? warNotesEN : undefined,
					WRN_RESULT_ID_PK: warResult
						? theWarningResults.find((option) => option.WRN_RESULT_NAME || option.WRN_RESULT_NAME_EN == warResult)?.WRN_RESULT_ID_PK
						: undefined,
					AGENTS: theAgentsIds ? theAgentsIds : undefined,
					ANTS: theAntsIds ? theAntsIds : undefined,
					CAS_ID_PK: Number(id),
				},
			})
		)
			.then((res) => {
				// console.log(res, editId, res.payload?.res.data.code)
				if (res?.payload?.res.status == 418) {
					// console.log(res?.payload?.result);
					setOpenErrorSnack(true);
				} else {
					setVisible(false);
					setOpenAddSnack(true);
					setOpenEditSnack(true);
					emptyAllInputs();
				}
			})
			.then(() => dispatch(getWarningsData({ theParams: { id: id } })));
	};
	const handledeletetheWarning = (id) => {
		setVisibleDeleteModal(true);
		setDeletedItemId(id);
	};
	//delete Warning
	const deletetheWarning = () => {
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		dispatch(deleteWarning({ id: deletedItemId, caseId: id }))
			.then((res) => {
				if (res?.payload?.result?.status == 200) {
					setOpenDelSnack(true);
					setVisibleDeleteModal(false);
				} else {
					setOpenDelErrorSnack(true);
				}
			})
			.then(() => dispatch(getWarningsData({ theParams: { id: id } })));
	};
	const handelWarningStatus = useCallback(() => {
		dispatch(getWarnStatus());
	}, [constantAdd]);
	const handelWarningResults = useCallback(() => {
		dispatch(getWarnResults());
	}, [constantAdd]);
	const handelWarningSubjects = useCallback(() => {
		dispatch(getWarnSubjects());
	}, [constantAdd]);
	const handelWarningMethods = useCallback(() => {
		dispatch(getWarnMethods());
	}, [constantAdd]);

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
				dispatch(getwarningAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};

	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilWarning} customClassName="nav-icon" />
					{editItem
						? `${formatMessage({ id: 'fileNum' })}: ${editItem?.CAS_NUMBER}` 
						: item
						? `${formatMessage({ id: 'fileNum' })}: ${item?.CAS_NUMBER}` 
						: formatMessage({ id: 'add' })}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{`${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'theNumber' })}`}</CFormLabel>
						{item ? (
							<p>{item?.WRN_NUMBER ? item?.WRN_NUMBER : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput
								type="number"
								value={warNum}
								onChange={(e) => setwarNum(e.target.value)}
								required
								min="0"
								className={`${error?.args?.includes('body.WRN_NUMBER is required') ? 'is-invalid' : null}`}
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('period')}</CFormLabel>
						{item ? (
							<p>{item?.WRN_DURATION ? item?.WRN_DURATION : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput type="number" value={warPeriod} onChange={(e) => setwarPeriod(e.target.value)} min="0" />
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('registerDate')}</CFormLabel>
						{item ? (
							<p>{item?.WRN_DATE ? new Date(item?.WRN_DATE).toLocaleDateString() : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput
								type="date"
								value={WarDate}
								onChange={(e) => setWarDate(e.target.value)}
								required
								className={`${error?.args?.includes('body.WRN_DATE is required') ? 'is-invalid' : null}`}
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{document.body.getAttribute('dir') == 'ltr' ? `${formatMessage({id: 'advertise'})} ${formatMessage({id: 'date'})}` : `${formatMessage({id: 'date'})} ${formatMessage({id: 'advertise'})} `}</CFormLabel>
						{item ? (
							<p>{item?.WRN_ADV_DATE ? new Date(item?.WRN_ADV_DATE).toLocaleDateString() : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput type="date" value={WarAdv} onChange={(e) => setWarAdv(e.target.value)} />
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel style={{ cursor: ' pointer' }} onClick={() => setConstantAdd(2)}>
							{translation('status')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.WRN_STATUS_NAME_EN
									? item?.WRN_STATUS_NAME_EN
									: item?.WRN_STATUS_NAME
									? item?.WRN_STATUS_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelWarningStatus()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={warStatus}
									onChange={(e, value) => setwarStatus(value)}
									options={theWarningStatus.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.WRN_STATUS_NAME_EN
											? option.WRN_STATUS_NAME_EN
											: option.WRN_STATUS_NAME
									)}
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
						<CFormLabel style={{ cursor: ' pointer' }} onClick={() => setConstantAdd(3)}>
							{translation('method')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.WRN_METHOD_NAME_EN
									? item?.WRN_METHOD_NAME_EN
									: item?.WRN_METHOD_NAME
									? item?.WRN_METHOD_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelWarningMethods()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={warMethod}
									onChange={(e, value) => setwarMethod(value)}
									options={theWarningMethods.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.WRN_METHOD_NAME_EN
											? option.WRN_METHOD_NAME_EN
											: option.WRN_METHOD_NAME
									)}
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
						<CFormLabel htmlFor="inputEmail4"> {translation('follower')}</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.EMP_NAME_ENGLISH
									? item?.EMP_NAME_ENGLISH
									: item?.EMP_NAME
									? item?.EMP_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth>
								<Select
									value={warClients}
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setwarClients(e.target.value)}
								>
									{allEmployee?.map((ele) => (
										<MenuItem value={ele?.EMP_NAME} key={Math.random() + ele?.EMP_NAME}>
											{document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('agents')}</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.AGENTS_EN
									? item?.AGENTS_EN
									: item?.AGENTS
									? item?.AGENTS
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth>
								<Select
									multiple
									displayEmpty
									value={warAgents}
									onChange={handleChangeAgents}
									input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{typeof selected == 'object' ? selected?.map((value) => <Chip key={Math.random() + value} label={value} />) : null}
										</Box>
									)}
									MenuProps={MenuPropsForClient}
									inputProps={{ 'aria-label': 'Without label' }}
								>
									{selectedCase?.clients?.map((ele, i) => {
										return (
											ele?.CLI_TYPE_ID_PK == 2 && (
												<MenuItem
													key={Math.random() + i}
													value={ele?.CLI_NAME}
													style={warAgents ? getStyles(ele, warAgents, theme) : null}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISH
														? ele?.CLI_NAME_ENGLISH
														: ele?.CLI_NAME}
												</MenuItem>
											)
										);
									})}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('ants')}</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.ANTS_EN
									? item?.ANTS_EN
									: item?.ANTS
									? item?.ANTS
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth>
								<Select
									multiple
									displayEmpty
									value={warAnts}
									onChange={handleChangeAnts}
									input={<OutlinedInput />}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{typeof selected == 'object' ? selected?.map((value) => <Chip key={Math.random() + value} label={value} />) : null}
										</Box>
									)}
									MenuProps={MenuPropsForClient}
									inputProps={{ 'aria-label': 'Without label' }}
								>
									{selectedCase?.clients?.map((ele, i) => {
										return (
											ele?.CLI_TYPE_ID_PK == 7 && (
												<MenuItem key={Math.random() + i} value={ele?.CLI_NAME} style={warAnts ? getStyles(ele, warAnts, theme) : null}>
													{document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISH
														? ele?.CLI_NAME_ENGLISH
														: ele?.CLI_NAME}
												</MenuItem>
											)
										);
									})}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel style={{ cursor: ' pointer' }} onClick={() => setConstantAdd(4)}>
							{translation('subject')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.WRN_SUBJECT_NAME_EN
									? item?.WRN_SUBJECT_NAME_EN
									: item?.WRN_SUBJECT_NAME
									? item?.WRN_SUBJECT_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelWarningSubjects()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={warSub}
									onChange={(e, value) => setwarSub(value)}
									options={theWarningSubjects.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.WRN_SUBJECT_NAME_EN
											? option.WRN_SUBJECT_NAME_EN
											: option.WRN_SUBJECT_NAME
									)}
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
						<CFormLabel style={{ cursor: ' pointer' }} onClick={() => setConstantAdd(1)}>
							{translation('result')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.WRN_RESULT_NAME_EN
									? item?.WRN_RESULT_NAME_EN
									: item?.WRN_RESULT_NAME
									? item?.WRN_RESULT_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelWarningResults()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={warResult}
									onChange={(e, value) => setwarResult(value)}
									options={theWarningResults.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.WRN_RESULT_NAME_EN
											? option.WRN_RESULT_NAME_EN
											: option.WRN_RESULT_NAME
									)}
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
						<CFormLabel htmlFor="inputEmail4">{translation('notes')}</CFormLabel>
						{item ? (
							<p>{item?.WRN_NOTES ? item?.WRN_NOTES : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea rows="5" value={warNotes} onChange={(e) => setwarNotes(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4">{translation('notesEn')}</CFormLabel>
						{item ? (
							<p>{item?.WRN_NOTES_EN ? item?.WRN_NOTES_EN : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea rows="5" value={warNotesEN} onChange={(e) => setwarNotesEN(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						{editItem || item ? (<><CFormLabel style={{cursor: 'pointer'}}> {translation('attachments')} 
							{editItem?.WRN_ID_PK ? (
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editItem?.WRN_ID_PK)}
								/>
							) : null}</CFormLabel>
						{editItem?._FILE > 0 || item?._FILE > 0 ? (
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
														getwarningAttachmentData({
															id: item?.WRN_ID_PK || editItem?.WRN_ID_PK,
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
														{editItem?.WRN_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editItem?.WRN_ID_PK)}
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
								<p>{translation('notFound')}</p>
							)}</>) : null}
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				{item ? null : editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={() => saveUpdate(editItem?.WRN_ID_PK)}>
						{translation('saveChanges')}
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={addWarning}>
					{translation('add')}
					</CButton>
				)}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
						{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const searchByChar = (e) => {
		console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allWarnings?.data);
		} else {
			const newClassifiedArr = allWarnings?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};

	const theRowTable = (theData) =>
		theData?.map((ele, index) => {
			return {
				id: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{(index += 1)}</span>,
				numOfAlert: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{ele?.WRN_NUMBER}</span>,
				registerDate: (
					<span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>
						{ele?.WRN_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRN_DATE)) : null}
					</span>
				),
				endAlert: (
					<span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>
						{ele?.WRN_ENDDATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRN_ENDDATE)) : null}
					</span>
				),
				theWay: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_METHOD_NAME_EN: ele?.WRN_METHOD_NAME}</span>,
				status: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_STATUS_NAME_EN : ele?.WRN_STATUS_NAME}</span>,
				subject: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_SUBJECT_NAME_EN : ele?.WRN_SUBJECT_NAME}</span>,
				period: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{ele?.WRN_DURATION}</span>,
				elmokalf: <span onClick={() => fetchItemById(ele?.WRN_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}</span>,
				// notes: (<span onClick={() =>fetchItemById(ele?.WRN_ID_PK)}>{ele?.WRN_NOTES}</span>),
				// attachment: (<span onClick={() =>fetchItemById(ele?.WRN_ID_PK)}>{ele?._FILE}</span>),
				DeletEdit: (
					<p>
						<CButton style={{ background: '#1e42a0 !important' }} onClick={() => editItemById(ele?.WRN_ID_PK)}>
							<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilPencil} customClassName="nav-icon" />
						</CButton>
						<CButton color={'danger'} onClick={() => handledeletetheWarning(ele?.WRN_ID_PK)}>
							<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
						</CButton>
					</p>
				),
			};
		});
	const data = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: `${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'theNumber' })}`,
				field: 'numOfAlert',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({ id: 'registerDate' }),
				field: 'registerDate',
				sort: 'asc',
				width: 200,
			},
			{
				label: formatMessage({ id: 'epiryDate' }),
				field: 'endAlert',
				sort: '',
				width: 100,
			},
			{
				label: formatMessage({ id: 'method' }),
				field: 'theWay',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({ id: 'status' }),
				field: 'status',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'subject' }),
				field: 'subject',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'period' }),
				field: 'period',
				sort: '',
				width: 100,
			},
			{
				label: formatMessage({ id: 'theEmployee' }),
				field: 'elmokalf',
				sort: '',
				width: 100,
			},
			// {
			//     label: 'ملاحظات',
			//     field: 'notes',
			//     sort: '',
			//     width: 100
			// },
			// {
			//     label: 'مرفقات',
			//     field: 'attachment',
			//     sort: '',
			//     width: 100
			// },
			{
				label: '',
				field: 'DeletEdit',
				sort: '',
				width: 100,
			},
		],
		rows: searchedDiv ? theRowTable(searchedDiv) : theRowTable(allWarnings?.data),
	};

	const classifiedFun = React.useCallback(() => {
		if (warSearchDateFrom > warSearchDateTo) {
			setClassifiedValidation(true);
		}
		dispatch(
			getWarningsData({
				theParams: {
					warNumSearch: warNumSearch ? warNumSearch : undefined,
					warSearchDateFrom: warSearchDateFrom ? warSearchDateFrom : undefined,
					warSearchDateTo: warSearchDateTo ? warSearchDateTo : undefined,
					searchVal: searchVal ? searchVal : undefined,
					id: id ? id : undefined,
				},
			})
		);
	}, [classifiedName, warNumSearch, warSearchDateFrom, warSearchDateTo, searchVal, id]);

	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setWarNumSearch('');
		setWarSearchDateFrom(undefined);
		setWarSearchDateTo(undefined);
		getWarningsData({ theParams: null });
	};

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[classifiedName, warNumSearch, warSearchDateFrom, warSearchDateTo, searchVal, id]
	);
	const handleChange = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[classifiedName, warNumSearch, warSearchDateFrom, warSearchDateTo, searchVal, id]
	);
	return (
		<div className="alarms box">
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
							<MenuItem disabled value=""></MenuItem>
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
				{classifiedName?.find((ele) => ele == `${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'theNumber' })}`) && (
					<TextField
						style={{ width: '30%' }}
						label={`${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'theNumber' })}`}
						value={warNumSearch}
						onChange={(e) => setWarNumSearch(e.target.value)}
					/>
				)}
				{classifiedName?.find((ele) => ele == `${formatMessage({ id: 'warning' })} ${formatMessage({ id: 'date' })}`) && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({ id: 'from' })}
								value={warSearchDateFrom}
								onChange={setWarSearchDateFrom}
								renderInput={(params) => (
									<TextField {...params} helperText={classifiedValidation ? formatMessage | { id: 'notCorrect' } : null} />
								)}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({ id: 'to' })}
								value={warSearchDateTo}
								onChange={setWarSearchDateTo}
								renderInput={(params) => (
									<TextField {...params} helperText={classifiedValidation ? formatMessage | { id: 'notCorrect' } : null} />
								)}
							/>
						</LocalizationProvider>
					</>
				)}
				{classifiedName.length > 0 && (
					<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
						<CButton onClick={classifiedFun}>{formatMessage({ id: 'apply' })}</CButton>
						<CIcon
							style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
							icon={cilX}
							customClassName="nav-icon"
							onClick={closeClassificationCriteria}
						/>
					</div>
				)}
			</div>
			<div className="file-alerts">
				<MDBDataTable
					striped
					// bordered
					responsive
					//   scrollX
					//   scrollY
					small
					data={data}
					searching={true}
				/>
			</div>
			{item ? ReturnedPopup(item) : editItem ? ReturnedPopup(editItem) : !item && !editItem && visible ? ReturnedPopup() : null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deletetheWarning} /> : null}
			{openAddSnack || openDelSnack || openDelErrorSnack || openAttachedSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack || openAttachedSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert
						onClose={handleCloseSnack}
						severity={`${openDelSnack || openDelErrorSnack || openAttachedSnack || openErrorSnack ? 'error' : 'success'}`}
						sx={{ width: '100%' }}
					>
						{OpenEditSnack
							? formatMessage({ id: 'itemUpdated' })
							: openDelSnack
							? formatMessage({ id: 'itemDeleted' })
							: openDelErrorSnack
							? translation('alreadyUSed')
							: openAttachedSnack
							? formatMessage({ id: 'error' })
							: openErrorSnack
							? formatMessage({ id: 'error' })
							: formatMessage({ id: 'itemAdded' })}
					</Alert>
				</Snackbar>
			) : null}
			{constantAdd == 1 ? (
				<WarningConstantResults exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 2 ? (
				<WarningConstantStatus exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 3 ? (
				<WarningConstantMethod exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 4 ? (
				<WarningConstantSubject exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 5 ? (<AttachedPopup exitSelectModal={() => setConstantAdd('')} 
			url={`warning/${attacmentId}/attachment`}
			id={attacmentId}
			setOpenAddSnack={setOpenAddSnack}
			setOpenAttachedSnack={setOpenAttachedSnack}
			setOpenLargeAttachement={setOpenLargeAttachement}
			callback={() => dispatch(getwarningAttachment(editItem?.INR_ID_PK)).then((res) => setAttachment(res.payload))} />) : null}
		</div>
	);
};

export default React.memo(FileAlerts);
