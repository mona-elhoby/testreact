import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
	CHeaderDivider,
	CNav,
	CTooltip,
	CButton,
	CRow,
	CCol,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CFormInput,
	CFormTextarea,
	CCard,
	CCardBody,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import TextField from '@mui/material/TextField';
import CIcon from '@coreui/icons-react';
import { cilFindInPage, cilPrint, cilAt, cilCursor, cilShareBoxed, cilSave, cilPlus, cilTrash, cilPencil, cilDiamond, cilX } from '@coreui/icons';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useIntl } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


import {
	getAgencyData,
	getAgencyById,
	addNewAgency,
	UpdateAgency,
	deleteAgency,
	getAgencyEndInMonth,
	getAgencyWithClosedFile,
	getAgencyWithOpenFile,
	getAgencyUnAttached,
	getAgencyAttachment,
	getAgencyAttachmentData,
	deleteAttachment,
} from '../store/reducers/agency';
import AttachedHeadTable from '../features/attachedFileHaed';
import '../components/agency/agency.css';
import { AgencyConstantPlace, AgencyConstantType, AgencyConstantAttribute, AgencyConstant } from '../components/agency/agencyConstant';
import { getAgent, getAgentAttr, getAgentPlace, getAgentType } from '../store/reducers/constants/agency';
import { getContacts } from '../store/reducers/contacts';
import DeletePopup from '../features/delete';
import AttachedPopup from '../features/attachment';
import translation from '../i18n/translate';

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
const Agences = () => {
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [allCritaria, setAllCritaria] = useState([]);
	const [selectedCriteria, setSelectedCriteria] = useState(null);
	const [visible, setVisible] = useState(false);
	const [editCriterai, setEditCriterai] = useState(null);
	const [chartVisible, setChartVisible] = useState(false);
	const [attachment, setAttachment] = useState(null);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [OpenAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [selectedVal, setSelctedVal] = useState('1');
	const [theClients, setTheClients] = useState([]);
	const [thePlace, setThePlace] = useState('');
	const [clientAttr, setClientAttr] = useState('');
	const [branch, setBranch] = useState('');
	const [AGtype, setAGtype] = useState('');
	const [printDate, setPrintDate] = useState('');
	const [startDate, setStartDate] = useState(undefined);
	const [endDate, setEndDate] = useState(undefined);
	const [ageNum, setAgeNum] = useState('');
	const [ageCode, setAgeCode] = useState('');
	const [ageNotes, setAgeNotes] = useState('');
	const [ageNotesEn, setAgeNotesEn] = useState('');
	const [attached, setAttached] = useState(undefined);
	const [theAgent, setTheAgent] = useState('');
	const [agentPlace, setAgentPlace] = useState('');
	const [allClients, setAllClients] = useState([]);
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const { id } = useParams();
	const [error, setError] = useState(null);
	const [constantAdd, setConstantAdd] = useState('');
	const [classifiedName, setClassifiedName] = React.useState([]);
	const [searchVal, setSearchVal] = React.useState('');
	const [barCodeSearch, setBarCodeSearch] = React.useState('');
	const [ageNumSearch, setAgeNumSearch] = React.useState('');
	const [agePlace, setAgePlace] = React.useState('');
	const [ageType, setAgeType] = React.useState('');
	const [ageStartDateFrom, setAgeStartDateFrom] = React.useState(undefined);
	const [ageStartDateTo, setAgeStartDateTo] = React.useState(undefined);
	const [ageEndDateFrom, setAgeEndDateFrom] = React.useState(undefined);
	const [ageEndDateTo, setAgeEndDateTo] = React.useState(undefined);
	const [theAttr, setTheAttr] = React.useState('');
	const [agents, setAgents] = React.useState('');
	const [notesSearch, setNotesSearch] = React.useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [page, setId] = useState(1);
	const [pageSearch, setPageSearch] = useState(null);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [ageForDeletedAttached, setAgeForDeletedAttached] = useState('');
	const [classifiedValidation, setClassifiedValidation] = useState(false);
	const [classifiedValidation2, setClassifiedValidation2] = useState(false);
	const { formatMessage } = useIntl();
	const { allAgency, agencyById, agencyEndInMonth, agencyWithOpenFiles, agencyUnAttached, agencyWithClosedFiles, isLoadingAgency } = useSelector(
		(state) => state.agency
	);
	const { agentsCompo, agentsAttrsCompo, agentsPlaceCompo, agentsTypeCompo } = useSelector((state) => state.AgencyConstant);

	const theme = useTheme();

	const names = [
		formatMessage({ id: 'authenticationNumber' }),
		formatMessage({ id: 'authenticationDate' }),
		formatMessage({ id: 'epiryDate' }),
		formatMessage({ id: 'agentPlace' }),
		formatMessage({ id: 'agentType' }),
		formatMessage({ id: 'attribute' }),
		formatMessage({ id: 'agents' }),
		formatMessage({ id: 'notes' }),
		formatMessage({ id: 'barCode' }),
	];
	const dateAfterMonth = Date.now() + 2592000000;
	const date = new Date(dateAfterMonth).toLocaleString();

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
		setOpenAddSnack(false);
		setOpenEditSnack(false);
		setOpenDelSnack(false);
	};

	useEffect(() => {
		//get all agency
		dispatch(getAgencyData({ theParams: null })).then((data) => setAllCritaria(data?.payload.data));

		// get agecny end in month
		dispatch(getAgencyEndInMonth(date));

		// get agency with open file
		dispatch(getAgencyWithOpenFile());

		// get agency with closed file
		dispatch(getAgencyWithClosedFile());

		dispatch(getAgent());
		dispatch(getAgentAttr());
		dispatch(getAgentPlace());
		dispatch(getAgentType());
		dispatch(getContacts({ theParams: { classification0: 2 } })).then((res) => setAllClients(res.payload.data));
		// get agency with un attached
		dispatch(getAgencyUnAttached());
		id && getCriteriaById(id);
	}, [dispatch]);

	// return classified data
	const fetchDataSelectedByAttached = (e) => {
		if (e.target.value == 1) {
			setSelctedVal('1');
			setAllCritaria(allAgency?.data);
		}
		if (e.target.value == 2) {
			setSelctedVal('2');
			setAllCritaria(agencyEndInMonth);
		}
		if (e.target.value == 3) {
			setSelctedVal('3');
			setAllCritaria(agencyWithOpenFiles);
		}
		if (e.target.value == 4) {
			setSelctedVal('4');
			setAllCritaria(agencyWithClosedFiles);
		}
		if (e.target.value == 5) {
			setSelctedVal('5');
			setAllCritaria(agencyUnAttached);
		}
	};

	const emptyInputVals = () => {
		setTheClients([]);
		setThePlace('');
		setClientAttr('');
		setBranch('');
		setAGtype('');
		setPrintDate(undefined);
		setStartDate(undefined);
		setEndDate(undefined);
		setAgeNum('');
		setAgeCode('');
		setAgeNotes('');
		setAttached('');
		setAgeNotesEn('');
	};

	// get agency by id
	const getCriteriaById = (id) => {
		dispatch(getAgencyById(id)).then((res) => setSelectedCriteria(res.payload));
		dispatch(getAgencyAttachment(id)).then((res) => setAttachment(res.payload));
		setVisible(!visible);
	};
	const handleChangeClients = (event) => {
		const {
			target: { value },
		} = event;
		setTheClients(
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const exitSelectModal = () => {
		setVisible(false);
		setSelectedCriteria(null);
		setEditCriterai(null);
	};

	const handleAddNewAgency = () => {
		console.log('theAgent: ', theAgent, 'agentsCompo: ', agentsCompo);
		dispatch(
			addNewAgency({
				AGE_TYPE_ID_PK: agentsTypeCompo?.find((option) => option.AGE_TYPE_NAME == AGtype || option.AGE_TYPE_NAME_EN == AGtype)?.AGE_TYPE_ID_PK,
				AGE_NUMBER: ageNum ? ageNum : undefined,
				AGE_START_DATE: startDate ? startDate : undefined,
				AGE_END_DATE: endDate ? endDate : undefined,
				AGE_ATTRBUIT_ID_PK: agentsAttrsCompo?.find((option) => option.AGE_ATTRBUIT_NAME == clientAttr || option.AGE_ATTRBUIT_NAME_EN == clientAttr)
					?.AGE_ATTRBUIT_ID_PK,
				//AGE_PRINT_DATE: Joi.number().integer(),
				AGE_NOTES: ageNotes ? ageNotes : undefined,
				AGE_NOTES_EN: undefined,
				AGE_CODE: ageCode ? ageCode : undefined,
				AGE_PLACE_ID_PK: agentsPlaceCompo?.find((option) => option.AGE_PLACE_NAME == agentPlace || option.AGE_PLACE_NAME_EN == agentPlace)
					?.AGE_PLACE_ID_PK,
				AGE_AGENT_ID_PK: agentsCompo?.map((option) => option.AGE_AGENT_NAME == theAgent || option.AGE_AGENT_NAME_EN == theAgent)?.AGE_AGENT_ID_PK,
				DT_AGENTS: theClients?.map((client) => allClients.find((ele) => ele.CLI_NAME_ENGLISH == client || ele.CLI_NAME == client)?.CLI_ID_PK),
				AGE_NOTES_EN: ageNotesEn ? ageNotesEn : undefined,
			})
		).then((res) => {
			// console.log("res.payload: ", res.payload)
			if (res.payload?.res?.data?.code) {
				setError(res.payload.res.data);
			} else {
				setOpenAddSnack(true);
				setVisible(false);
				dispatch(getAgencyData({ theParams: null })).then((data) => setAllCritaria(data?.payload.data));
			}
		});
	};

	const editSelectedAGE = (id) => {
		setVisible(!visible);
		const editableData = allCritaria.find((data) => data?.AGE_ID_PK === id);
		setEditCriterai(editableData);
		setTheClients(
			document.body.getAttribute('dir') == 'ltr'
				? editableData?.clients?.map((ele) => ele.CLI_NAME_ENGLISH)
				: editableData?.clients?.map((ele) => ele.CLI_NAME)
		);
		setAgentPlace(editableData?.AGE_PLACE_NAME);
		setClientAttr(
			document.body.getAttribute('dir') == 'ltr' && editableData?.AGE_ATTRBUIT_NAME_EN
				? editableData?.AGE_ATTRBUIT_NAME_EN
				: editableData?.AGE_ATTRBUIT_NAME
		);
		setBranch(editableData?.DEP_NAME);
		setAGtype(document.body.getAttribute('dir') == 'ltr' && editableData?.AGE_TYPE_NAME_EN ? editableData?.AGE_TYPE_NAME_EN : editableData?.AGE_TYPE_NAME);
		setPrintDate(editableData?.AGE_PRINT_DATE ? new Date(editableData?.AGE_PRINT_DATE).toISOString().split('T')[0] : undefined);
		setStartDate(editableData?.AGE_START_DATE ? new Date(editableData?.AGE_START_DATE).toISOString().split('T')[0] : undefined);
		setEndDate(editableData?.AGE_END_DATE ? new Date().toISOString(editableData?.AGE_END_DATE).split('T')[0] : undefined);
		setAgeNum(editableData?.AGE_NUMBER);
		setAgeCode(editableData?.AGE_CODE);
		setAgeNotes(editableData?.AGE_NOTES);
		setAttached(editableData?._FILE);
		setAgeNotesEn(editableData?.AGE_NOTES_EN);
		setTheAgent(
			document.body.getAttribute('dir') == 'ltr' && editableData?.AGE_AGENT_NAME_EN ? editableData?.AGE_AGENT_NAME_EN : editableData?.AGE_AGENT_NAME
		);
		dispatch(getAgencyAttachment(id)).then((res) => setAttachment(res.payload));
	};

	const handleUpdateAgency = () => {
		dispatch(
			UpdateAgency({
				data: {
					AGE_TYPE_ID_PK: agentsTypeCompo?.find((option) => option.AGE_TYPE_NAME == AGtype || option.AGE_TYPE_NAME_EN == AGtype)?.AGE_TYPE_ID_PK,
					AGE_NUMBER: ageNum ? ageNum : undefined,
					AGE_START_DATE: startDate ? startDate : undefined,
					AGE_END_DATE: endDate ? endDate : undefined,
					AGE_ATTRBUIT_ID_PK: agentsAttrsCompo?.find((option) => option.AGE_ATTRBUIT_NAME == clientAttr || option.AGE_ATTRBUIT_NAME_EN == clientAttr)
						?.AGE_ATTRBUIT_ID_PK,
					//AGE_PRINT_DATE: Joi.number().integer(),
					AGE_NOTES: ageNotes ? ageNotes : undefined,
					AGE_NOTES_EN: undefined,
					AGE_CODE: ageCode ? ageCode : undefined,
					AGE_PLACE_ID_PK: agentsPlaceCompo?.find((option) => option.AGE_PLACE_NAME == agentPlace || option.AGE_PLACE_NAME_EN == agentPlace)
						?.AGE_PLACE_ID_PK,
					AGE_AGENT_ID_PK: agentsCompo?.map((option) => option.AGE_AGENT_NAME == theAgent || option.AGE_AGENT_NAME_EN == theAgent)?.AGE_AGENT_ID_PK,
					DT_AGENTS: theClients?.map((client) => allClients.find((ele) => ele.CLI_NAME_ENGLISH == client || ele.CLI_NAME == client)?.CLI_ID_PK),
					AGE_NOTES_EN: ageNotesEn ? ageNotesEn : undefined,
				},
				id: editCriterai.AGE_ID_PK,
			})
		).then((res) => {
			console.log('res.payload: ', res.payload);
			if (res.payload.res?.data?.code) {
				setError(res.payload.res.data);
			} else {
				setOpenEditSnack(true);
				setVisible(false);
				dispatch(getAgencyData({ theParams: null })).then((data) => setAllCritaria(data?.payload.data));
			}
		});
	};

	const handleSeleteAgenct = (id) => {
		setDeletedItemId(id);
		setVisibleDeleteModal(true);
	};
	const deleteTheAgency = () => {
		dispatch(deleteAgency(deletedItemId)).then((res) => {
			if (res?.payload?.result?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
				dispatch(getAgencyData({ theParams: null })).then((data) => setAllCritaria(data?.payload.data));
			}
		});
	};

	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(5);
		setAttacmentId(id);
	};

	const handleDeleteAttachment = (id, agencyId) => {
		// console.log(id);
		setVisibleDeleteModal(true);
		setDeleteAttacmentId(id);
		setAgeForDeletedAttached(agencyId);
	};

	const deleteTheAttachment = () => {
		dispatch(deleteAttachment({ id: ageForDeletedAttached, deletedId: deleteAttacmentId })).then((res) => {
			if (res?.payload?.res?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
				dispatch(getAgencyAttachment(ageForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};

	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal
			visible={visible}
			onClose={() => exitSelectModal()}
			className={`agency-modal ${document.body.getAttribute('dir') == 'ltr' ? 'enTextLeftPopup' : null}`}
		>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilDiamond} customClassName="nav-icon" />
					{selectedCriteria || editCriterai ? formatMessage({ id: 'theAgency' }) : formatMessage({ id: 'add' })}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{formatMessage({ id: 'agents' })}</CFormLabel>
						{selectedCriteria ? (
							<p>
								{selectedCriteria.clients.length > 0
									? selectedCriteria.clients.reduce(
											(acc, curr) =>
												document.body.getAttribute('dir') == 'ltr' && curr.CLI_NAME_ENGLISH
													? curr.CLI_NAME_ENGLISH
													: curr.CLI_NAME + ' , ' + acc,
											''
									  )
									: null}
							</p>
						) : (
							<FormControl fullWidth>
								<Select
									multiple
									displayEmpty
									value={theClients}
									onChange={handleChangeClients}
									input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{typeof selected == 'object' ? selected?.map((value) => <Chip key={Math.random() + value} label={value} />) : []}
										</Box>
									)}
									MenuProps={MenuProps}
									inputProps={{ 'aria-label': 'Without label' }}
									error={theClients.length <= 0 ? true : false}
								>
									{allClients?.map((name) => (
										<MenuItem
											key={name.CLI_NAME}
											value={document.body.getAttribute('dir') == 'ltr' && name.CLI_NAME_ENGLISH ? name.CLI_NAME_ENGLISH : name.CLI_NAME}
										>
											{document.body.getAttribute('dir') == 'ltr' && name.CLI_NAME_ENGLISH ? name.CLI_NAME_ENGLISH : name.CLI_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
							{formatMessage({ id: 'attorny' })}
						</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.AGE_TYPE_NAME ? selectedCriteria.AGE_TYPE_NAME : null}</p>
						) : (
							<FormControl fullWidth>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={theAgent}
									onChange={(e, value) => setTheAgent(value)}
									options={agentsCompo?.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.AGE_AGENT_NAME_EN
											? option.AGE_AGENT_NAME_EN
											: option.AGE_AGENT_NAME
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
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
							{formatMessage({ id: 'agentType' })}
						</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.AGE_TYPE_NAME ? selectedCriteria.AGE_TYPE_NAME : formatMessage({ id: 'notFound' })}</p>
						) : (
							<FormControl fullWidth>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={AGtype}
									onChange={(e, value) => setAGtype(value)}
									options={agentsTypeCompo?.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.AGE_TYPE_NAME_EN ? option.AGE_TYPE_NAME_EN : option.AGE_TYPE_NAME
									)}
									renderInput={(params) => <TextField {...params} error={!AGtype ? true : false} />}
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
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
							{formatMessage({ id: 'attribute' })}
						</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.AGE_ATTRBUIT_NAME ? selectedCriteria.AGE_ATTRBUIT_NAME : formatMessage({ id: 'notFound' })}</p>
						) : (
							<FormControl fullWidth>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={clientAttr}
									onChange={(e, value) => setClientAttr(value)}
									options={agentsAttrsCompo?.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.AGE_ATTRBUIT_NAME_EN
											? option.AGE_ATTRBUIT_NAME_EN
											: option.AGE_ATTRBUIT_NAME
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
						<CFormLabel htmlFor="inputEmail4">{translation('place')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.AGE_PLACE_NAME ? selectedCriteria.AGE_PLACE_NAME : formatMessage({ id: 'notFound' })}</p>
						) : (
							<Autocomplete
								id="free-solo-demo"
								freeSolo
								value={agentPlace}
								onChange={(e, value) => setAgentPlace(value)}
								options={agentsPlaceCompo?.map((option) =>
									document.body.getAttribute('dir') == 'ltr' && option.AGE_PLACE_NAME_EN ? option.AGE_PLACE_NAME_EN : option.AGE_PLACE_NAME
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
						)}
					</CCol>
					{/* <CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> الفرع</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.DEP_NAME ? selectedCriteria.DEP_NAME : formatMessage({id: 'notFound'})}</p>
						) : (
							<CFormInput type="text" defaultValue={editCriterai ? editCriterai.DEP_NAME : ''} onChange={(e) => console.log()} />
						)}
					</CCol> */}
					{/* <CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> تاريخ الطباعه</CFormLabel>
						{selectedCriteria ? (
							<p>
								{selectedCriteria.AGE_PRINT_DATE
									? new Intl.DateTimeFormat('en-US').format(new Date(selectedCriteria.AGE_PRINT_DATE))
									: formatMessage({id: 'notFound'})}
							</p>
						) : (
							<CFormInput
								type="date"
								defaultValue={editCriterai ? new Date(editCriterai.AGE_PRINT_DATE).toISOString().split('T')[0] : ''}
								onChange={(e) => console.log()}
							/>
						)}
					</CCol> */}
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('startDate')}</CFormLabel>
						{selectedCriteria ? (
							<p>
								{selectedCriteria?.AGE_START_DATE
									? new Date(selectedCriteria?.AGE_START_DATE).toISOString().split('T')[0]
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<CFormInput type="date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} />
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('epiryDate')}</CFormLabel>
						{selectedCriteria ? (
							<p>
								{selectedCriteria.AGE_END_DATE
									? new Intl.DateTimeFormat('en-US').format(new Date(selectedCriteria.AGE_END_DATE))
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<CFormInput type="date" defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)} />
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('authenticationNumber')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria?.AGE_NUMBER ? selectedCriteria?.AGE_NUMBER : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput type="number" defaultValue={ageNum} min={0} onChange={(e) => setAgeNum(e.target.value)} />
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> {translation('barCode')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria?.AGE_CODE ? selectedCriteria?.AGE_CODE : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput type="number" defaultValue={ageCode} onChange={(e) => setAgeCode(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria?.AGE_NOTES ? selectedCriteria?.AGE_NOTES : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea rows="3" defaultValue={ageNotes} onChange={(e) => setAgeNotes(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('notesEn')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria?.AGE_NOTES_EN ? selectedCriteria?.AGE_NOTES_EN : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea rows="3" defaultValue={ageNotesEn} onChange={(e) => setAgeNotesEn(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel style={{ cursor: 'pointer' }} >
							{' '}
							{translation('attachments')}
							{editCriterai?.AGE_ID_PK ? <CIcon size={'sm'} icon={cilPlus} customClassName="nav-icon" style={{ height: '16px', width: '16px' }} onClick={() => handelAddAttachment(editCriterai?.AGE_ID_PK)}/> : null}
						</CFormLabel>
						{selectedCriteria?._FILE || editCriterai?._FILE ? (
							<CTable bordered responsive>
								<AttachedHeadTable editCiteria={editCriterai}/>
								<CTableBody>
									{attachment?.map((ele, i) => (
										<CTableRow key={i}>
											<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
											<CTableDataCell
												onClick={() => {
													dispatch(
														getAgencyAttachmentData({
															id: selectedCriteria?.AGE_ID_PK,
															attachedId: ele?.ATH_ID_PK,
															fileName: ele?.ATH_NAME,
														})
													).then((res) => {
														if (res?.payload?.status == 404) {
															// console.log(res);
															setOpenAttachedSnack(true);
														}
													});
												}}
												style={{ cursor: 'pointer' }}
											>
												{ele?.ATH_NAME}
											</CTableDataCell>
											<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
											<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
											<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
											<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
											{editCriterai?.AGE_ID_PK ? <CTableDataCell>
											<CButton color={'danger'} onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editCriterai?.AGE_ID_PK)}>
													<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
												</CButton>
											</CTableDataCell> : null }
										</CTableRow>
									))}
								</CTableBody>
							</CTable>
						) : (
							<p> {translation('notFound')}</p>
						)}
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				{selectedCriteria ? null : editCriterai ? (
					<CButton className="btn-modal-save" color="primary" onClick={handleUpdateAgency}>
						{translation('saveChanges')}
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={handleAddNewAgency}>
						{translation('add')}
					</CButton>
				)}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					{translation('close')}
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
				label: formatMessage({ id: 'barCode' }),
				field: 'barcode',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({ id: 'agents' }),
				field: 'clients',
				sort: 'asc',
				width: 200,
			},
			{
				label: formatMessage({ id: 'place' }),
				field: 'place',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({ id: 'startDate' }),
				field: 'startDate',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({ id: 'epiryDate' }),
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
							barcode: <a onClick={() => getCriteriaById(data?.AGE_ID_PK)}>{data?.AGE_CODE}</a>,
							clients: (
								<a onClick={() => getCriteriaById(data?.AGE_ID_PK)}>
									{data?.clients.reduce(
										(acc, curr) =>
											document.body.getAttribute('dir') == 'ltr' && curr.CLI_NAME_ENGLISH
												? curr.CLI_NAME_ENGLISH
												: curr.CLI_NAME + ' , ' + acc,
										''
									)}
								</a>
							),
							place: (
								<a onClick={() => getCriteriaById(data?.AGE_ID_PK)}>
									{document.body.getAttribute('dir') == 'rtl' ? data?.AGE_PLACE_NAME : data?.AGE_PLACE_NAME_EN}
								</a>
							),
							startDate: (
								<a onClick={() => getCriteriaById(data?.AGE_ID_PK)}>
									{data?.AGE_START_DATE ? new Date(data?.AGE_START_DATE).toLocaleDateString() : null}
								</a>
							),
							endDate: (
								<a onClick={() => getCriteriaById(data?.AGE_ID_PK)}>
									{data?.AGE_END_DATE ? new Date(data?.AGE_END_DATE).toLocaleDateString() : null}
								</a>
							),
							DeletEdit: (
								<p>
									<CButton style={{ background: '#1e42a0 !important' }}>
										<CIcon
											onClick={() => editSelectedAGE(data?.AGE_ID_PK)}
											style={{ height: '16px', marginRight: '-3px' }}
											icon={cilPencil}
											customClassName="nav-icon"
										/>
									</CButton>
									<CButton color={'danger'} onClick={() => handleSeleteAgenct(data?.AGE_ID_PK)}>
										<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
									</CButton>
								</p>
							),
						};
				  })
				: [],
	};

	const openAddPopup = () => {
		emptyInputVals();
		setEditCriterai(null);
		setSelectedCriteria(null);
		setVisible(true);
	};
	// classification function

	const handleChange = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(
				typeof value === 'string' ? value.split(',') : value
			);
		},
		[
			classifiedName,
			searchVal,
			barCodeSearch,
			ageNumSearch,
			ageType,
			ageStartDateTo,
			ageStartDateFrom,
			ageEndDateFrom,
			ageEndDateTo,
			theAttr,
			agents,
			notesSearch,
			selectedVal,
		]
	);
	const classifiedFun = React.useCallback(() => {
		if (ageEndDateFrom?.getTime() > ageStartDateTo?.getTime()) {
			setClassifiedValidation2(true);
		}
		if (ageStartDateFrom?.getTime() > ageStartDateTo?.getTime()) {
			setClassifiedValidation(true);
		}
		dispatch(
			getAgencyData({
				theParams: {
					barCodeSearch: barCodeSearch ? barCodeSearch : undefined,
					ageNumSearch: ageNumSearch ? ageNumSearch : undefined,
					ageType: ageType ? ageType : undefined,
					agePlace: agePlace ? agePlace : undefined,
					ageStartDateFrom: ageStartDateFrom ? ageStartDateFrom : undefined,
					ageStartDateTo: ageStartDateTo ? ageStartDateTo : undefined,
					ageEndDateFrom: ageEndDateFrom ? ageEndDateFrom : undefined,
					ageEndDateTo: ageEndDateTo ? ageEndDateTo : undefined,
					theAttr: theAttr ? theAttr : undefined,
					agents: agents ? agents : undefined,
					notesSearch: notesSearch ? notesSearch : undefined,
					searchVal: searchVal ? searchVal : undefined,
					selctedVal:
						selectedVal == '2'
							? 'agencyEndInMonth'
							: selectedVal == '3'
							? 'agencyWithOpenFiles'
							: selectedVal == '4'
							? 'agencyWithClosedFiles'
							: selectedVal == '5'
							? 'agencyUnAttached'
							: undefined,
				},
			})
		).then((res) => setAllCritaria(res?.payload.data));
	}, [
		classifiedName,
		searchVal,
		barCodeSearch,
		ageNumSearch,
		ageType,
		ageStartDateTo,
		ageStartDateFrom,
		ageEndDateFrom,
		ageEndDateTo,
		theAttr,
		agents,
		notesSearch,
		selectedVal,
	]);

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[
			classifiedName,
			searchVal,
			barCodeSearch,
			ageNumSearch,
			ageType,
			ageStartDateTo,
			ageStartDateFrom,
			ageEndDateFrom,
			ageEndDateTo,
			theAttr,
			agents,
			notesSearch,
			selectedVal,
		]
	);
	//close classification form
	const handelClassificationForm = () => {
		setClassifiedName([]);
		setBarCodeSearch('');
		setAgeNumSearch('');
		setAgePlace('');
		setAgeType('');
		setAgeStartDateFrom(undefined);
		setAgeStartDateTo(undefined);
		setAgeEndDateFrom(undefined);
		setAgeEndDateTo(undefined);
		setTheAttr('');
		setAgents('');
		setNotesSearch('');
		dispatch(
			getAgencyData({
				theParams: null,
			})
		).then((res) => setAllCritaria(res?.payload.data));
	};
	// search button function
	const searchByChar = (e) => {
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setAllCritaria(allAgency?.data);
		} else {
			const newClassifiedArr = allAgency.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setAllCritaria(newClassifiedArr);
		}
	};
	// handel pagination
	const handelChangePgae = React.useCallback(
		(e, val) => {
			// console.log(val)
			setId(val);
			dispatch(
				getAgencyData({
					theParams: {
						offset: (val - 1) * 10,
					},
				})
			).then((data) => setAllCritaria(data?.payload.data));
		},
		[page]
	);
	const pagesNum = allAgency.total ? Math.ceil(allAgency.total / 10) : 1;

	return (
		<div className="agency">
			<CRow>
				<CCol>
					{}
					<div className="agency-navs card-inputs-flex mb-2">
						<div className=" ">
							<div className="classification">
								<FormControl>
									<Select
										labelId="demo-customized-select-label"
										id="demo-customized-select"
										value={selectedVal}
										onChange={(e) => fetchDataSelectedByAttached(e)}
									>
										<MenuItem value={'1'}>{translation('theAll')}</MenuItem>
										<MenuItem value={'2'}>{translation('endInMonth')}</MenuItem>
										<MenuItem value={'3'}> {translation('expirenInClosedFile')}</MenuItem>
										<MenuItem value={'4'}>{translation('expirenInOpenFile')}</MenuItem>
										<MenuItem value={'5'}>{translation('notAttached')}</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
						<CNav className="">
							<p>
								<CTooltip content={formatMessage({ id: 'preview' })} placement="bottom">
									<CIcon size={'sm'} icon={cilFindInPage} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content={formatMessage({ id: 'print' })} placement="bottom">
									<CIcon size={'sm'} icon={cilPrint} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content=" pdf" placement="bottom">
									<CIcon size={'xl'} icon={cilSave} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content={formatMessage({ id: 'printLater' })} placement="bottom">
									<CIcon size={'sm'} icon={cilShareBoxed} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content={formatMessage({ id: 'send' })} placement="bottom">
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
					className={document.body.getAttribute('dir') == 'ltr' ? 'spanChartEn' : null}
				>
					{' '}
					{formatMessage({ id: 'charts' })}
				</span>
			</div>
			<CHeaderDivider className="mb-3 mt-2" />
			<CRow className={`${chartVisible ? 'showChart' : 'hideChart'}`}>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							
						<Doughnut
                data={{
					labels: [formatMessage({ id: 'endInMonth' }), formatMessage({ id: 'theAll' })],
					datasets: [{
                    //   label: "# of Votes",
											data: [allAgency?.total, agencyEndInMonth?.length],
						backgroundColor: ['#FF6384','#36A2EB', ],
						hoverBackgroundColor: ['#FF6384','#36A2EB',],
					}]
                }}
				options={{
					plugins: {
						legend: {
							display: false,
						},
						labels: {
							render: 'percentage',
							fontColor: ['green', 'white'],
							precision: 2,
							arc: true,
						},
					},
					maintainAspectRatio: true,
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
									<span>{formatMessage({ id: 'theAll' })}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{translation('endInMonth')}</span>
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
									labels: [formatMessage({ id: 'theAll' }), formatMessage({ id: 'expirenInClosedFile' })],
									datasets: [{
									data: [allAgency?.total, agencyWithClosedFiles?.length],
									backgroundColor: ['#36A2EB', '#FFCE56'],
									hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
									}]
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
									<span>{formatMessage({ id: 'theAll' })}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span>{formatMessage({ id: 'expirenInClosedFile' })}</span>
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
									labels: [formatMessage({ id: 'theAll' }), translation('expirenInOpenFile')],
									datasets: [{
									data: [allAgency?.total, agencyWithOpenFiles?.length],
									backgroundColor: ['#36A2EB', '#FF6384'],
									hoverBackgroundColor: ['#36A2EB', '#FF6384'],
									}]
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
									<span>{formatMessage({ id: 'theAll' })}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{translation('expirenInOpenFile')} </span>
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
									labels: [formatMessage({ id: 'theAll' }), formatMessage({ id: 'notAttached' })],
									datasets: [{
									data: [allAgency?.total, agencyUnAttached?.length],
									backgroundColor: ['#36A2EB', '#FFCE56'],
									hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
									}]
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
									<span>{formatMessage({ id: 'theAll' })}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span>{formatMessage({ id: 'notAttached' })}</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<CRow>
				<CCol md={'12'}>
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
											return <span> {formatMessage({ id: 'classification' })}</span>;
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
						<CRow>
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'barCode' })) && (
								<CCol md={3}>
									<TextField
										label={formatMessage({ id: 'barCode' })}
										value={barCodeSearch}
										onChange={(e) => setBarCodeSearch(e.target.value)}
									/>
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'authenticationNumber' })) && (
								<CCol md={3}>
									<TextField
										label={formatMessage({ id: 'authenticationNumber' })}
										value={ageNumSearch}
										onChange={(e) => setAgeNumSearch(e.target.value)}
									/>
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'agentPlace' })) && (
								<CCol md={3}>
									<TextField label={formatMessage({ id: 'agentPlace' })} value={agePlace} onChange={(e) => setAgePlace(e.target.value)} />
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'agentType' })) && (
								<CCol md={3}>
									<TextField label={formatMessage({ id: 'agentType' })} value={ageType} onChange={(e) => setAgeType(e.target.value)} />
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'authenticationDate' })) && (
								<CCol md={3}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label={formatMessage({ id: 'from' })}
											value={ageStartDateFrom}
											onChange={setAgeStartDateFrom}
											renderInput={(params) => (
												<TextField {...params} helperText={classifiedValidation ? formatMessage({ id: 'notCorrect' }) : null} />
											)}
										/>
									</LocalizationProvider>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label={formatMessage({ id: 'to' })}
											value={ageStartDateTo}
											onChange={setAgeStartDateTo}
											renderInput={(params) => (
												<TextField {...params} helperText={classifiedValidation ? formatMessage({ id: 'notCorrect' }) : null} />
											)}
										/>
									</LocalizationProvider>
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'epiryDate' })) && (
								<CCol md={3}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label={formatMessage({ id: 'from' })}
											value={ageEndDateFrom}
											onChange={setAgeEndDateFrom}
											renderInput={(params) => (
												<TextField {...params} helperText={classifiedValidation2 ? formatMessage({ id: 'notCorrect' }) : null} />
											)}
										/>
									</LocalizationProvider>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label={formatMessage({ id: 'to' })}
											value={ageEndDateTo}
											onChange={setAgeEndDateTo}
											renderInput={(params) => (
												<TextField {...params} helperText={classifiedValidation2 ? formatMessage({ id: 'notCorrect' }) : null} />
											)}
										/>
									</LocalizationProvider>
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'attribute' })) && (
								<CCol md={3}>
									<TextField label={formatMessage({ id: 'attribute' })} value={theAttr} onChange={(e) => setTheAttr(e.target.value)} />
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'agents' })) && (
								<CCol md={3}>
									<TextField label={formatMessage({ id: 'agents' })} value={agents} onChange={(e) => setAgents(e.target.value)} />
								</CCol>
							)}
							{classifiedName?.find((ele) => ele == formatMessage({ id: 'notes' })) && (
								<CCol md={3}>
									<TextField label={formatMessage({ id: 'notes' })} value={notesSearch} onChange={(e) => setNotesSearch(e.target.value)} />
								</CCol>
							)}
							{classifiedName.length > 0 && (
								<CCol md={12}>
									<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
										<CButton onClick={classifiedFun}>{formatMessage({ id: 'apply' })}</CButton>
										<CIcon
											style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
											icon={cilX}
											customClassName="nav-icon"
											onClick={handelClassificationForm}
										/>
									</div>
								</CCol>
							)}
						</CRow>
					</div>
					<MDBDataTable
						striped
						responsive
						limit={10}
						small
						data={data}
					/>
				</CCol>
				<CCol md={12}>
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
			{selectedCriteria
				? ReturnedPopup(selectedCriteria)
				: editCriterai
				? ReturnedPopup(editCriterai)
				: !editCriterai && !selectedCriteria && visible
				? ReturnedPopup()
				: null}
			{constantAdd == 1 ? (
				<AgencyConstant exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 2 ? (
				<AgencyConstantAttribute exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 3 ? (
				<AgencyConstantPlace exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 4 ? (
				<AgencyConstantType exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 5 ? (
				<AttachedPopup
					exitSelectModal={() => setConstantAdd('')}
					url={`agency/${attacmentId}/attachment`}
					id={attacmentId}
					setOpenAddSnack={setOpenAddSnack}
					setOpenAttachedSnack={setOpenAttachedSnack}
					setOpenLargeAttachement= {setOpenLargeAttachement}
					callback={() => dispatch(getAgencyAttachment(editCriterai?.AGE_ID_PK)).then((res) => setAttachment(res.payload))}
				/>
			) : null}

			{visibleDeleteModal && ageForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !ageForDeletedAttached ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAgency} />
			) : null}
			{OpenAttachedSnack || openAddSnack || openEditSnack || openDelSnack || openLargeAttachement? (
				<Snackbar open={OpenAttachedSnack || openAddSnack || openEditSnack || openDelSnack ||openLargeAttachement} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${OpenAttachedSnack || openDelSnack || openLargeAttachement? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{OpenAttachedSnack
							? formatMessage({ id: 'error' })
							: openAddSnack
							? formatMessage({ id: 'itemAdded' })
							: openEditSnack
							? formatMessage({ id: 'itemUpdated' })
							: openDelSnack
							? formatMessage({ id: 'itemDeleted' })
							: openLargeAttachement
							? formatMessage({id: 'largeAttachment'})
							: null}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(Agences);
