import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import {
	CButton,
	CModalFooter,
	CModalTitle,
	CModalHeader,
	CModal,
	CModalBody,
	CRow,
	CCol,
	CFormLabel,
	CFormInput,
	CFormTextarea,
	CCarousel,
	CCarouselItem,
	CTable,
	CTableBody,
	CTableRow,
	CTableHeaderCell,
	CTableDataCell
} from '@coreui/react';
import { cilVolumeHigh, cilTrash, cilPencil, cilPlus, cilX } from '@coreui/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { useIntl } from 'react-intl';

import AttachedHeadTable from '../../../features/attachedFileHaed';
import {
	getinformingAttachmentData,
	getinformingAttachment,
	getInformingsData,
	getInformingById,
	addNewInforming,
	updateInforming,
	deleteInforming,
	deleteAttachment,
} from '../../../store/reducers/informings';
import {
	getInformingProcedure,
	getInformingCategory,
	getInformingStatus,
	getInformingPlace,
	getInformingType,
} from '../../../store/reducers/constants/informings';
import { InformingFormAdd } from './informingAdd';
import {
	InformingConstantCategory,
	InformingConstantPlace,
	InformingConstantStatus,
	InformingConstantProcedure,
	InformingConstantType,
} from './informingConstant';
import DeletePopup from '../../../features/delete';
import AttachedPopup from '../../../features/attachment';
import translation from '../../../i18n/translate';

const FileAlerts = () => {
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [stage, setStage] = useState([]);
	const [item, setItem] = useState(null);
	const [editItem, setEditItem] = useState(null);
	const [visible, setVisible] = useState(false);
	const { id } = useParams();
	const dispatch = useDispatch();
	const [InformNum, setInformNum] = useState('');
	const [informDate, setinformDate] = useState('');
	const [InformStatus, setInformStatus] = useState('');
	const [InformPlace, setInformPlace] = useState('');
	const [InformClients, setInformClients] = useState('');
	const [InformAgents, setInformAgents] = useState([]);
	const [InformAnts, setInformAnts] = useState([]);
	const [InformKind, setInformKind] = useState('');
	const [InformNotes, setInformNotes] = useState('');
	const [InformNotesEn, setInformNotesEn] = useState('');
	const [InformAttached, setInformAttached] = useState('');
	const [informClassified, setInformClassified] = useState('');
	const [error, setError] = useState(null);
	const [infNumSearch, setinfNumSearch] = useState('');
	const [infSearchDateFrom, setinfSearchDateFrom] = useState(undefined);
	const [infSearchDateTo, setinfSearchDateTo] = useState(undefined);
	const [searchVal, setSearchVal] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [attachment, setAttachment] = useState([]);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [infAttached, setInfAttached] = useState('');
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [OpenEditSnack, setOpenEditSnack] = useState(false);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const [constantAdd, setConstantAdd] = useState('');
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [classifiedValidation, setClassifiedValidation] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [divId, setDivId] = useState(Date.now());
	const { formatMessage } = useIntl();
	const names = [
		`${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'theNumber' })}`,
		`${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'date' })}`,
	];
	const ref0 = useRef();
	const { allEmployee } = useSelector((state) => state.employee);
	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { allInformings } = useSelector((state) => state.informing);
	const { ingormingCatetegoryList, ingormingPlaceList, ingormingProcedureList, ingormingStatusList, typeInformingList } = useSelector(
		(state) => state.informingConstraint
	);

	//TODO: { "code": "3204771","message": "InformingStatus not found.","args": {}}
	useEffect(() => {
		dispatch(getInformingsData({ theParams: { id: id } }));
		dispatch(getInformingType());
		dispatch(getInformingStatus());
		dispatch(getInformingProcedure());
		dispatch(getInformingPlace());
		dispatch(getInformingCategory());
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

	const fetchItemById = (informingId) => {
		dispatch(getInformingById(informingId))
			.then((res) => setItem(res.payload))
			.then(() => {
				dispatch(getinformingAttachment(informingId)).then((res) => setAttachment(res?.payload));
				setEditItem(null);
				setVisible(!visible);
			});
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
		// console.log(value);
		setInformAgents(typeof value === 'string' ? value.split(',') : value);
	};
	const handleChangeAnts = (event) => {
		const {
			target: { value },
		} = event;
		// console.log(value);
		setInformAnts(typeof value === 'string' ? value.split(',') : value);
	};

	//empty all inputs fields
	const emptyAllInputs = () => {
		setInformNum('');
		setinformDate('');
		setInformStatus('');
		setInformPlace('');
		setInformClients('');
		setInformClients('');
		setInformAgents([]);
		setInformAnts([]);
		setInformKind('');
		setInformNotes('');
		setInformNotesEn('');
		setInformClassified('');
	};
	const onChangeAddMoreProcedures = (e, value, id) => {
		console.log(value);
		let newArrOfDivs = arrayOfDivs;
		newArrOfDivs.find((item) => item.id === id)[ref0.current?.getAttribute('name')] = value;
		setArrayOfDivs(newArrOfDivs);
	};
	const onChangeAddMoreProceduresDiv = (e, id) => {
		let newArrOfDivs = arrayOfDivs;
		if (e.target.name == 'addFollows') {
			newArrOfDivs.find((item) => item.id === id)['addFollows'] = e.target.value;
		} else if (e.target.name == 'addinformingsDate') {
			newArrOfDivs.find((item) => item.id === id)['addinformingsDate'] = e.target.value;
		} else if (e.target.name == 'addinformingsNotes') {
			newArrOfDivs.find((item) => item.id === id)['addinformingsNotes'] = e.target.value;
		}
		setArrayOfDivs(newArrOfDivs);
	};

	const handelInformingResults = useCallback(() => {
		dispatch(getInformingProcedure());
	}, [constantAdd]);
	const handelAddMore = () => {
		setArrayOfDivs([...arrayOfDivs, { id: divId + 1, addFollows: '', addinformingsProcedure: '', addinformingsDate: '', addinformingsNotes: '' }]);
		setDivId(divId + 1);
	};
	const handleRemoveArrayDiv = (id) => {
		setArrayOfDivs(arrayOfDivs.filter((ele) => ele.id != id));
	};
	const selectedCaseAgent = selectedCase?.clients.filter((ele2) => ele2?.CLI_TYPE_ID_PK == 2);
	const selectedCaseAnts = selectedCase?.clients.filter((ele2) => ele2?.CLI_TYPE_ID_PK == 7);
	// post informing
	const addinforming = () => {
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		let newReqsArr = [];
		newReqsArr =
			arrayOfDivs.length > 0
				? arrayOfDivs.map((ele) => ({
						PRO_DATE: ele.addinformingsDate ? ele.addinformingsDate : undefined,
						INR_PROCEDURE_ID_PK: ele.addinformingsProcedure
							? ingormingProcedureList.find((ele1) => ele1?.INR_PROCEDURE_NAME || ele1?.INR_PROCEDURE_NAME_EN == ele.addinformingsProcedure)
									?.INR_PROCEDURE_ID_PK
							: undefined,
						EMP_ID_PK: ele.addFollows
							? allEmployee.find((ele2) => ele2?.EMP_NAME || ele2?.EMP_NAME_ENGLISH == ele.addFollows)?.EMP_ID_PK
							: undefined,
						PRO_NOTE: ele.addinformingsNotes ? ele.addinformingsNotes : undefined,
				  }))
				: [];
		// console.log("newReqsArr: ", newReqsArr)
		const theAgentsIds = InformAgents?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME || ele3.CLI_NAME_ENGLISH == ele)?.CLI_ID_PK);

		const theAntsIds = InformAnts?.map((ele) => selectedCaseAnts.find((ele3) => ele3.CLI_NAME || ele3.CLI_NAME_ENGLISH == ele)?.CLI_ID_PK);

		const theFollowerIds = allEmployee.find((ele2) => InformClients == ele2.EMP_NAME || ele2.EMP_NAME_ENGLISH)?.EMP_ID_PK;

		dispatch(
			addNewInforming({
				CAS_ID_PK: id,
				INR_NUMBER: InformNum ? InformNum : undefined,
				INR_DATE: informDate ? informDate : undefined,
				INR_CATEGORY_ID_PK: informClassified
					? ingormingCatetegoryList?.find((ele) => ele?.INR_CATEGORY_NAME || ele?.INR_CATEGORY_NAME_EN == informClassified)?.INR_CATEGORY_ID_PK
					: undefined,
				INR_TYPE_ID_PK: InformKind
					? typeInformingList?.find((ele) => ele?.INR_TYPE_NAME || ele?.INR_TYPE_NAME_EN == InformKind)?.INR_TYPE_ID_PK
					: undefined,
				INR_STATUS_ID_PK: InformStatus
					? ingormingStatusList.find((ele) => ele?.INR_STATUS_NAME || ele?.INR_STATUS_NAME_EN == InformStatus)?.INR_STATUS_ID_PK
					: undefined,
				INR_PLACE_ID_PK: InformPlace
					? ingormingPlaceList.find((ele) => ele?.INR_PLACE_NAME || ele?.INR_PLACE_NAME_EN == InformPlace)?.INR_PLACE_ID_PK
					: undefined,
				INR_NOTES: InformNotes ? InformNotes : undefined,
				INR_NOTES_EN: InformNotesEn ? InformNotesEn : undefined,
				EMP_ID_PK: theFollowerIds ? theFollowerIds : undefined,
				AGENTS: theAgentsIds ? theAgentsIds : undefined,
				ANTS: theAntsIds ? theAntsIds : undefined,
				DT_PROCEDURES: newReqsArr.length > 0 ? newReqsArr : undefined,
			})
		).then((res) => {
			if (res.payload?.res?.data?.code) {
				// console.log(res?.payload?.res);
				setError(res.payload?.res?.data);
			} else {
				dispatch(getInformingsData({ theParams: { id: id } }));
				setVisible(false);
				setOpenAddSnack(true);
				emptyAllInputs();
			}
		});
	};

	// open edit modal
	const editItemById = (informingId) => {
		dispatch(getInformingCategory());
		dispatch(getInformingCategory());
		dispatch(getInformingCategory());
		dispatch(getInformingStatus());
		dispatch(getInformingById(informingId)).then((res) => {
			setEditItem(res.payload);
			setInformNum(res.payload?.INR_NUMBER ? res.payload?.INR_NUMBER : '');
			setinformDate(res.payload?.INR_DATE ? new Date(res.payload?.INR_DATE).toISOString().split('T')[0] : '');
			setInformStatus(res.payload?.INR_STATUS_NAME ? res.payload?.INR_STATUS_NAME : '');
			setInformPlace(res.payload?.INR_PLACE_NAME ? res.payload?.INR_PLACE_NAME : '');
			setInformClients(res.payload?.EMP_NAME ? res.payload?.EMP_NAME : '');
			setInformAgents(
				res.payload?.AGENTS
					? res.payload?.AGENTS.split('-')?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME.trim() == ele.trim())?.CLI_NAME)
					: []
			);
			setInformAnts(
				res.payload?.ANTS
					? res.payload?.ANTS.split('-')?.map((ele) => selectedCaseAnts?.find((ele3) => ele3.CLI_NAME.trim() == ele.trim())?.CLI_NAME)
					: []
			);
			setInformKind(res.payload?.INR_TYPE_NAME ? res.payload?.INR_TYPE_NAME : '');
			setInformClassified(res.payload?.INR_CATEGORY_NAME ? res.payload?.INR_CATEGORY_NAME : '');
			setInformNotes(res.payload?.INR_NOTES ? res.payload?.INR_NOTES : '');
			setInformNotesEn(res.payload?.INR_NOTES_EN ? res.payload?.INR_NOTES_EN : '');
			setInformAttached(res.payload?._FILE ? res.payload?._FILE : '');
			setArrayOfDivs(
				res.payload.procedure?.map((ele) => ({
					id: ele.PRO_ID_PK,
					addFollows: ele.EMP_NAME,
					addinformingsProcedure: ele.INR_PROCEDURE_NAME,
					addinformingsDate: ele.PRO_DATE ? new Date(ele.PRO_DATE).toISOString().split('T')[0] : '',
					addinformingsNotes: ele.PRO_NOTE,
				}))
			);
			setItem(null);
			setVisible(!visible);
		});
	};

	//put informing
	const saveUpdate = () => {
		let newReqsArr = [];
		newReqsArr =
			arrayOfDivs.length > 0
				? arrayOfDivs.map((ele) => ({
						PRO_DATE: ele.addinformingsDate ? ele.addinformingsDate : undefined,
						INR_PROCEDURE_ID_PK: ele.addinformingsProcedure
							? ingormingProcedureList.find((ele1) => ele1?.INR_PROCEDURE_NAME || ele1?.INR_PROCEDURE_NAME_EN == ele.addinformingsProcedure)
									?.INR_PROCEDURE_ID_PK
							: undefined,
						EMP_ID_PK: ele.addFollows ? allEmployee.find((ele2) => ele2?.EMP_NAME || ele2?.EMP_NAME_EN == ele.addFollows)?.EMP_ID_PK : undefined,
						PRO_NOTE: ele.addinformingsNotes ? ele.addinformingsNotes : undefined,
				  }))
				: [];
		const theAgentsIds = InformAgents?.map((ele) => selectedCaseAgent?.find((ele3) => ele3.CLI_NAME || ele3.CLI_NAME_ENGLISH == ele)?.CLI_ID_PK);

		const theAntsIds = InformAnts?.map((ele) => selectedCaseAnts.find((ele3) => ele3.CLI_NAME || ele3.CLI_NAME_ENGLISH == ele)?.CLI_ID_PK);

		const theFollowerIds = allEmployee.find((ele2) => InformClients == ele2.EMP_NAME || ele2.EMP_NAME_ENGLISH)?.EMP_ID_PK;
		dispatch(
			updateInforming({
				id: editItem?.INR_ID_PK,
				data: {
					CAS_ID_PK: id,
					INR_NUMBER: InformNum ? InformNum : undefined,
					INR_DATE: informDate ? informDate : undefined,
					INR_CATEGORY_ID_PK: informClassified
						? ingormingCatetegoryList?.find((ele) => ele?.INR_CATEGORY_NAME || ele?.INR_CATEGORY_NAME_EN == informClassified)?.INR_CATEGORY_ID_PK
						: undefined,
					INR_TYPE_ID_PK: InformKind
						? typeInformingList?.find((ele) => ele?.INR_TYPE_NAME || ele?.INR_TYPE_NAME_EN == InformKind)?.INR_TYPE_ID_PK
						: undefined,
					INR_STATUS_ID_PK: InformStatus
						? ingormingStatusList.find((ele) => ele?.INR_STATUS_NAME || ele?.INR_STATUS_NAME_EN == InformStatus)?.INR_STATUS_ID_PK
						: undefined,
					INR_PLACE_ID_PK: InformPlace
						? ingormingPlaceList.find((ele) => ele?.INR_PLACE_NAME || ele?.INR_PLACE_NAME_EN == InformPlace)?.INR_PLACE_ID_PK
						: undefined,
					INR_NOTES: InformNotes ? InformNotes : undefined,
					INR_NOTES_EN: InformNotesEn ? InformNotesEn : undefined,
					INR_NOTES_EN: undefined,
					EMP_ID_PK: theFollowerIds ? theFollowerIds : undefined,
					AGENTS: theAgentsIds ? theAgentsIds : undefined,
					ANTS: theAntsIds ? theAntsIds : undefined,
					DT_PROCEDURES: newReqsArr.length > 0 ? newReqsArr : undefined,
				},
			})
		).then((res) => {
			// dispatch(updateInforming(editId))
			if (res?.payload?.res.status == 418) {
				setOpenErrorSnack(true);
				setError(res?.payload?.res?.data);
			} else {
				dispatch(getInformingsData({ theParams: { id: id } }));
				setVisible(false);
				setOpenAddSnack(true);
				setOpenEditSnack(true);
				emptyAllInputs();
			}
		});
	};
	const handledeletetheInforming = (id) => {
		setDeletedItemId(id);
		setVisibleDeleteModal(true);
	};
	//delete informing
	const deletetheInforming = () => {
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		dispatch(deleteInforming({ id: deletedItemId, caseId: id })).then((res) => {
			if (res?.payload?.result?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
	};
	//TODO type informing not add
	const handelInformingStatus = useCallback(() => {
		dispatch(getInformingStatus());
	}, [constantAdd]);
	const handelInformingType = useCallback(() => {
		dispatch(getInformingCategory());
	}, [constantAdd]);
	const handelInformingPlace = useCallback(() => {
		dispatch(getInformingPlace());
	}, [constantAdd]);
	const handelInformingCategory = useCallback(() => {
		dispatch(getInformingCategory());
	}, [constantAdd]);


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
				dispatch(getinformingAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};

	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className="informing-modal">
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilVolumeHigh} customClassName="nav-icon" />

					{editItem
						? `${formatMessage({ id: 'fileNum' })}: ${editItem?.CAS_NUMBER}`
						: item
						? `${formatMessage({ id: 'fileNum' })}: ${item?.CAS_NUMBER}`
						: formatMessage({ id: 'add' })}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
			<CCarousel controls interval={false} wrap={false} onSlide={handelNextSlide}>
					<CCarouselItem>
<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{`${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'theNumber' })}`}</CFormLabel>
						{item ? (
							<p>{item?.INR_NUMBER ? item?.INR_NUMBER : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput
								type="number"
								value={InformNum}
								onChange={(e) => setInformNum(e.target.value)}
								required
								// className={`${error?.args?.includes('body.WRN_DATE is required') ? 'is-invalid' : null}`}
								className={`${!InformNum ? 'is-invalid' : null}`}
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('registerDate')}</CFormLabel>
						{item ? (
							<p>{item?.INR_DATE ? new Date(item?.INR_DATE).toLocaleDateString() : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormInput
								type="date"
								value={informDate}
								onChange={(e) => setinformDate(e.target.value)}
								required
								// className={`${error?.args?.includes('body.WRN_DATE is required') ? 'is-invalid' : null}`}
								className={`${!informDate ? 'is-invalid' : null}`}
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(2)}>
							{translation('place')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.INR_PLACE_NAME_EN
									? item?.INR_PLACE_NAME_EN
									: item?.INR_PLACE_NAME
									? item?.INR_PLACE_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelInformingPlace()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={InformPlace}
									onChange={(e, value) => setInformPlace(value)}
									options={ingormingPlaceList.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.INR_PLACE_NAME_EN
											? option.INR_PLACE_NAME_EN
											: option.INR_PLACE_NAME
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
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(3)}>
							{translation('status')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.INR_STATUS_NAME_EN
									? item?.INR_STATUS_NAME_EN
									: item?.INR_STATUS_NAME
									? item?.INR_STATUS_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelInformingStatus()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={InformStatus}
									onChange={(e, value) => setInformStatus(value)}
									options={ingormingStatusList.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.INR_STATUS_NAME_EN
											? option.INR_STATUS_NAME_EN
											: option.INR_STATUS_NAME
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
						<CFormLabel htmlFor="inputEmail4"> {translation('theEmployee')}</CFormLabel>
						{item ? (
							<p>{item?.EMP_NAME ? item?.EMP_NAME : formatMessage({ id: 'notFound' })}</p>
						) : (
							<FormControl fullWidth>
								<Select
									value={InformClients}
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setInformClients(e.target.value)}
									error={!InformClients ? true : false}
								>
									{allEmployee?.map((ele) => (
										<MenuItem
											value={document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH : ele.EMP_NAME}
											key={Math.random() + ele.EMP_ID_PK}
										>
											{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH : ele.EMP_NAME}
										</MenuItem>
									))}
								</Select>
								{!InformClients && <FormHelperText>This is required!</FormHelperText>}
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
							{formatMessage({ id: 'category' })}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.INR_CATEGORY_NAME_EN
									? item?.INR_CATEGORY_NAME_EN
									: item?.INR_CATEGORY_NAME
									? item?.INR_CATEGORY_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelInformingCategory()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={informClassified}
									onChange={(e, value) => setInformClassified(value)}
									options={ingormingCatetegoryList.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.INR_CATEGORY_NAME_EN
											? option.INR_CATEGORY_NAME_EN
											: option.INR_CATEGORY_NAME
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
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(5)}>
							{translation('type')}
						</CFormLabel>
						{item ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && item?.INR_TYPE_NAME_EN
									? item?.INR_TYPE_NAME_EN
									: item?.INR_TYPE_NAME
									? item?.INR_TYPE_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelInformingType()} sx={{ minWidth: '100%' }}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={InformKind}
									onChange={(e, value) => setInformKind(value)}
									options={typeInformingList.map((option) =>
										document.body.getAttribute('dir') == 'ltr' && option.INR_TYPE_NAME_EN ? option.INR_TYPE_NAME_EN : option.INR_TYPE_NAME
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
									value={InformAgents}
									onChange={handleChangeAgents}
									input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{typeof selected == 'object'
												? selected?.map((value) => (
														<Chip key={Math.random() + value} label={value} onClick={() => console.log('agent')} />
												  ))
												: null}
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
													style={InformAgents ? getStyles(ele, InformAgents, theme) : null}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
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
									value={InformAnts}
									onChange={handleChangeAnts}
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
											ele?.CLI_TYPE_ID_PK == 7 && (
												<MenuItem
													key={Math.random() + i}
													value={ele?.CLI_NAME}
													style={InformAnts ? getStyles(ele, InformAnts, theme) : null}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
												</MenuItem>
											)
										);
									})}
								</Select>
							</FormControl>
						)}
					</CCol></CRow>
					</CCarouselItem>
					<CCarouselItem>
				<CRow>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
						{item ? (
							<p>{item?.INR_NOTES ? item?.INR_NOTES : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea rows="5" value={InformNotes} onChange={(e) => setInformNotes(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('notesEn')}</CFormLabel>
						{item ? (
							<p>{item?.INR_NOTES_EN ? item?.INR_NOTES_EN : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea rows="5" value={InformNotesEn} onChange={(e) => setInformNotesEn(e.target.value)} />
						)}
					</CCol>
					<CCol md={12}>
						{item || editItem ? ( <>
						<CFormLabel style={{ cursor: 'pointer' }}>
							{' '}
							{translation('attachments')}
							{editItem?.INR_ID_PK ? (
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editItem?.INR_ID_PK)}
								/>
							) : null}
						</CFormLabel>
							{item?._FILE > 0 || editItem?._FILE > 0 ? (
								<CTable bordered>
								<AttachedHeadTable editCiteria={editItem}/>
									<CTableBody>
										{attachment?.map((ele, i) => (
											<CTableRow
												key={i}
												onClick={() => {
													dispatch(
														getinformingAttachmentData({
															id: item?.INR_ID_PK,
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
												style={{ cursor: 'pointer' }}
											>
												<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
												<CTableDataCell>{ele?.ATH_NAME}</CTableDataCell>
												<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
												<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
												<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
												<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
														{editItem?.INR_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editItem?.INR_ID_PK)}
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
							)}
							</>) : null}
					</CCol>
					{!item && (
						<CCol md={12}>
							{/* <CFormLabel htmlFor="inputEmail4">تواريخ الدفعات</CFormLabel> */}
							<div className="divTable">
								<div className="headRow">
									<div className="divCell" align="center">
										{translation('theDate')}
									</div>
									<div className="divCell" align="center">
										{translation('follower')}
									</div>
									<div className="divCell" align="center" style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
										{translation('proceding')}
									</div>
									<div className="divCell" align="center">
										{translation('notes')}
									</div>
									{/* {console.log('arrayOfDivs: ', arrayOfDivs)} */}
								</div>
								{/* {addMoreInformings} */}
								{arrayOfDivs?.map((ele) => (
									<InformingFormAdd
										onClickHandel={() => handelInformingResults()}
										id={ele.id}
										key={ele.id}
										val1={ele.addFollows}
										onChange1={(e) => onChangeAddMoreProceduresDiv(e, ele.id)}
										val2={ele.addinformingsProcedure}
										onChange2={(e, value) => onChangeAddMoreProcedures(e, value, ele.id)}
										val3={ele.addinformingsDate}
										onChange3={(e) => onChangeAddMoreProceduresDiv(e, ele.id)}
										val4={ele.addinformingsNotes}
										onChange4={(e) => onChangeAddMoreProceduresDiv(e, ele.id)}
										name1="addFollows"
										name2="addinformingsProcedure"
										name3="addinformingsDate"
										name4="addinformingsNotes"
										deleteInformingProcedure={() => handleRemoveArrayDiv(ele.id)}
										ref0={ref0}
									/>
								))}
								<CIcon
									style={{ height: '16px', float: 'left', cursor: 'pointer' }}
									icon={cilPlus}
									customClassName="nav-icon"
									onClick={handelAddMore}
								/>
							</div>
						</CCol>
					)}
				</CRow></CCarouselItem>
					</CCarousel>
			</CModalBody>
			<CModalFooter>
				{editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={saveUpdate}>
						{translation('saveChanges')}
					</CButton>
				) : !item && !editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={addinforming}>
						{translation('save')}
					</CButton>
				) : null}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const openAddPopup = () => {
		emptyAllInputs();
		setEditItem(null);
		setItem(null);
		setVisible(true);
		// setFileNum(id);
	};

	const theRowTable = (theData) =>
		theData?.map((ele, index) => {
			// console.log(theData)
			return {
				id: (index += 1),
				numOfAlert: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)} key={index}>
						{ele.INR_NUMBER}
					</span>
				),
				registerDate: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>
						{ele.INR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele.INR_DATE)) : null}
					</span>
				),
				calssification: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele.INR_CATEGORY_NAME_EN ? ele.INR_CATEGORY_NAME_EN : ele.INR_CATEGORY_NAME}
					</span>
				),
				type: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele.INR_TYPE_NAME_EN ? ele.INR_TYPE_NAME_EN : ele.INR_TYPE_NAME}
					</span>
				),
				location: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele.INR_PLACE_NAME_EN ? ele.INR_PLACE_NAME_EN : ele.INR_PLACE_NAME}
					</span>
				),
				status: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele.INR_STATUS_NAME_EN ? ele.INR_STATUS_NAME_EN : ele.INR_STATUS_NAME}
					</span>
				),
				elmokalf: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH : ele.EMP_NAME}
					</span>
				),
				notes: (
					<span onClick={() => fetchItemById(ele.INR_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' ? ele.INR_NOTES_EN : ele.INR_NOTES}</span>
				),
				attachment: <span onClick={() => fetchItemById(ele.INR_ID_PK)}>{ele._FILE}</span>,
				DeletEdit: (
					<p>
						<CButton style={{ background: '#1e42a0 !important' }} onClick={() => editItemById(ele.INR_ID_PK)}>
							<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilPencil} customClassName="nav-icon" />
						</CButton>
						<CButton color={'danger'} onClick={() => handledeletetheInforming(ele.INR_ID_PK)}>
							<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
						</CButton>
					</p>
				),
			};
		});

	const datatable = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: `${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'theNumber' })}`,
				field: 'numOfAlert',
				sort: 'asc',
				width: 150,
			},
			{
				label: `${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'date' })}`,
				field: 'registerDate',
				sort: 'asc',
				width: 200,
			},
			{
				label: formatMessage({ id: 'informingCategory' }),
				field: 'calssification',
				sort: 'asc',
				width: 150,
			},
			{
				label: `${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'theType' })}`,
				field: 'type',
				sort: 'asc',
				width: 100,
			},
			{
				label: translation('place'),
				field: 'location',
				sort: 'asc',
				width: 100,
			},
			{
				label: translation('status'),
				field: 'status',
				sort: '',
				width: 100,
			},
			{
				label: translation('theEmployee'),
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
		rows: searchedDiv ? theRowTable(searchedDiv) : theRowTable(allInformings?.data),
	};

	const classifiedFun = React.useCallback(() => {
		if (infSearchDateFrom > infSearchDateTo) {
			setClassifiedValidation(true);
		}
		dispatch(
			getInformingsData({
				theParams: {
					infNumSearch: infNumSearch ? infNumSearch : undefined,
					infSearchDateFrom: infSearchDateFrom ? infSearchDateFrom : undefined,
					infSearchDateTo: infSearchDateTo ? infSearchDateTo : undefined,
					searchVal: searchVal ? searchVal : undefined,
					id: id ? id : undefined,
				},
			})
		);
	}, [classifiedName, infNumSearch, id, searchVal, infSearchDateTo, infSearchDateFrom]);
	// classification and search function
	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[classifiedName, infNumSearch, id, searchVal, infSearchDateTo, infSearchDateFrom]
	);
	const handleChange = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[classifiedName, infNumSearch, id, searchVal, infSearchDateTo, infSearchDateFrom]
	);

	const searchByChar = (e) => {
		console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allInformings?.data);
		} else {
			const newClassifiedArr = allInformings?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};
	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setinfNumSearch('');
		setinfSearchDateFrom(undefined);
		setinfSearchDateTo(undefined);
		getInformingsData({ theParams: null });
	};
	const handelNextSlide = (active, dir) => {
		// console.log(active, dir);
		if (dir == 'next' && active == 0) {
			// document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.setAttribute('id', 'carousel-control-next');
			document.querySelectorAll('.case-modal .carousel-control-next')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.case-modal .carousel-control-prev')[0]?.removeAttribute('disabled');
		} else if (dir == 'prev' && active == 1) {
			document.querySelectorAll('.case-modal .carousel-control-prev')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.case-modal .carousel-control-next')[0]?.removeAttribute('disabled');
		}
	};
	return (
		<div className="file-alerts informings box">
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
							{names.map((name, i) => (
								<MenuItem key={i} value={name} style={getStyles(name, classifiedName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="search">
					<CFormInput type="text" value={searchVal} onChange={(e) => searchByChar(e)} placeholder="بحث..." onKeyDown={(e) => handelSearchbtn(e)} />
				</div>
			</div>
			<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
				{classifiedName?.find((ele) => ele == `${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'theNumber' })}`) && (
					<TextField
						style={{ width: '30%' }}
						label={`${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'theNumber' })}`}
						value={infNumSearch}
						onChange={(e) => setinfNumSearch(e.target.value)}
					/>
				)}
				{classifiedName?.find((ele) => ele == `${formatMessage({ id: 'informing' })} ${formatMessage({ id: 'date' })}`) && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({ id: 'from' })}
								value={infSearchDateFrom}
								onChange={setinfSearchDateFrom}
								renderInput={(params) => (
									<TextField {...params} helperText={classifiedValidation ? formatMessage({ id: 'notCorrect' }) : null} />
								)}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({ id: 'to' })}
								value={infSearchDateTo}
								onChange={setinfSearchDateTo}
								renderInput={(params) => (
									<TextField {...params} helperText={classifiedValidation ? formatMessage({ id: 'notCorrect' }) : null} />
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
			{item ? ReturnedPopup(item) : editItem ? ReturnedPopup(editItem) : !editItem && !item && visible ? ReturnedPopup() : null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deletetheInforming} /> : null}
			{constantAdd == 1 ? (
				<InformingConstantCategory exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 2 ? (
				<InformingConstantPlace exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 3 ? (
				<InformingConstantStatus exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 4 ? (
				<InformingConstantProcedure exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 5 ? (
				<InformingConstantType exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 6 ? (
				<AttachedPopup exitSelectModal={() => setConstantAdd('')} 
				url={`appointment/${attacmentId}/attachment`}
				id={attacmentId}
				setOpenAddSnack={setOpenAddSnack}
				setOpenAttachedSnack={setOpenAttachedSnack}
				setOpenLargeAttachement={setOpenLargeAttachement}
				callback={() => dispatch(getinformingAttachment(editItem?.INR_ID_PK)).then((res) => setAttachment(res.payload))} />
			) : null}
			{openAddSnack || openDelSnack || openDelErrorSnack || openAttachedSnack || openErrorSnack ? (
				<Snackbar
					open={openAddSnack || openDelSnack || openDelErrorSnack || openAttachedSnack || openErrorSnack}
					autoHideDuration={2000}
					onClose={handleCloseSnack}
				>
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
							? formatMessage({ id: 'alreadyUSed' })
							: openAttachedSnack
							? formatMessage({ id: 'error' })
							: openErrorSnack
							? formatMessage({ id: 'error' })
							: formatMessage({ id: 'itemAdded' })}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileAlerts);
