import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
	CTable,
	CTableBody,
	CTableRow,
	CTableDataCell,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CButton,
	CRow,
	CCol,
	CFormLabel,
	CFormInput,
	CFormTextarea,
	CFormCheck,
	CFormFeedback,
	CCarousel,
	CCarouselItem,
	CTableHeaderCell
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilVector, cilTrash, cilX, cilPlus, cilMinus } from '@coreui/icons';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useIntl } from 'react-intl';

import {
	getSessionDecision,
	getSessionPlace,
	getSessionRoll,
	getSessionType,
	getSessionRequired,
	getSessionJudgement,
} from '../../../store/reducers/constants/session';
import { getEmployeeData } from '../../../store/reducers/emlpoyee';
import { getStageData } from '../../../store/reducers/stage';
import {
	getSessionData,
	getSessionById,
	addNewSession,
	updateSession,
	deleteSession,
	deleteAttachment,
	getsessionAttachment,
	getsessionAttachmentData,
} from '../../../store/reducers/session';
import AttachedHeadTable from '../../../features/attachedFileHaed';
import { cardSessions, SessionRequirements } from './sessionCard';
import {
	SessionConstantAdjudgement,
	SessionConstantRequirement,
	SessionConstantType,
	SessionConstantRoll,
	SessionConstantPlace,
	SessionConstantDesicion,
} from './sessionConstant';
import './session.css';
import { convertTime } from '../../../features/convertTime';
import DeletePopup from '../../../features/delete';
import AttachedPopup from '../../../features/attachment';
import translation from '../../../i18n/translate';


const FileSessions = () => {
	const [stage, setStage] = useState([]);
	const [editItem, setEditItem] = useState('');
	const [selectedItem, setSelectedItem] = useState(null);
	const [visible, setVisible] = useState(false);
	const [theClients, setTheClients] = useState([]);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [allStages, setAllStages] = useState([]);
	const [casSub, setCasSub] = useState('');
	const [stgType, setstgType] = useState('');
	const [sesDate, setsesDate] = useState('');
	const [stgDateTime, setstgDateTime] = useState(null);
	const [nextstgDateTime, setNextstgDateTime] = useState(null);
	const [stgDecision, setstgDecision] = useState('');
	const DecDetails = useRef('');
	const [attendence, setattendence] = useState('');
	const [sesplace, setsesplace] = useState('');
	const [sesJud, setsesJud] = useState('');
	const sesJudDetails = useRef('');
	const [rollCOR, setrollCOR] = useState('');
	const [NextSesrollCOR, setNextSesrollCOR] = useState('');
	const SesLink = useRef('');
	const SesNotes = useRef('');
	const SesNotesEn = useRef(''); 
	const AdjCost = useRef('');
	const nextSes = useRef('');
	const [theAttendence, settheAttendence] = useState('');
	const [sesFinal, setSesFinal] = useState(false);
	const [RemindAttach, setRemindAttach] = useState(false);
	const [sesReplayRem, setSesReplayRem] = useState(false);
	const { id, name, speicifiedId } = useParams();
	const [sesRequirementList, setsesRequirementList] = useState([]);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [OpenEditSnack, setOpenEditSnack] = useState(false);
	const [error, setError] = useState([]);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const NextSesNotes = useRef('');
	const NextSesNotesEN = useRef('')
	const [fileNumSearch, setFileNumSearch] = useState('');
	const [stgNumSearch, setStgNumSearch] = useState('');
	const [stgSubjectSearch, setStgSubjectSearch] = useState('');
	const [placeSearch, setPlaceSearch] = useState('');
	const [sesSearchDateFrom, setSesSearchDateFrom] = useState(undefined);
	const [sesSearchDateTo, setSesSearchDateTo] = useState(undefined);
	const [attachment, setAttachment] = useState([]);
	const [searchVal, setSearchVal] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [constantAdd, setConstantAdd] = useState('');
	const [theSesReqs, setTheSesReqs] = useState([]);
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [divId, setDivId] = useState(Date.now());
	const [arrayOfDivsNext, setArrayOfDivsNext] = useState([]);
	const [divIdNext, setDivIdNext] = useState(Date.now());
	const [adjClients, setAdjClients] = useState([]);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [page, setId] = useState(1);
	const ref0 = useRef('');
	const dispatch = useDispatch();
	const { theSessionDecision, theSessionPlace, theSessionRoll, theSessionType, theSessionRequirements, theSessionJudgment } = useSelector(
		(state) => state.sessionConstraint
	);
	const { allEmployee } = useSelector((state) => state.employee);
	const { allSessions, selectedSession, isLoadingSession } = useSelector((state) => state.session);

	const { formatMessage } = useIntl();
	const names = [formatMessage({id: 'place'}), formatMessage({id: 'stageNum'}), formatMessage({id: 'case'}), `${formatMessage({id: 'theSession'})} ${formatMessage({id: 'date'})}`];
	useEffect(() => {
		dispatch(getSessionData({ theParams: { id: id, limit: '10' } }));
		dispatch(getStageData(id)).then((res) => setAllStages(res.payload.data));
		dispatch(getEmployeeData());
		dispatch(getSessionRequired());
		name == 'session' && speicifiedId && showEditSession(speicifiedId);
	}, [dispatch]);

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	// fetch session by id
	const getSession = (sessionId) => {
		setEditItem(null);
		// dispatch(`session/${sessionId}`, setItem);
		dispatch(getSessionById(sessionId))
			.then((data) => setSelectedItem(data.payload))
			.then(() => setVisible(!visible));
		dispatch(getsessionAttachment(sessionId)).then((res) => setAttachment(res.payload));
	};

	const handelAddSessionType = useCallback(() => {
		dispatch(getSessionType());
	}, [constantAdd]);
	const handelAddSessionDescision = useCallback(() => {
		dispatch(getSessionDecision());
	}, [constantAdd]);
	const handelAddSessionPlace = useCallback(() => {
		dispatch(getSessionPlace());
	}, [constantAdd]);
	const handelAddSessionRoll = useCallback(() => {
		dispatch(getSessionRoll());
	}, [constantAdd]);
	const handelAddSessionRequirement = useCallback(() => {
		dispatch(getSessionRequired()).then((res) => setTheSesReqs(res.payload));
	}, [constantAdd]);
	const handelAddSessionJudgment = useCallback(() => {
		dispatch(getSessionJudgement());
	}, [constantAdd]);

	//exit modal
	const exitSelectModal = () => {
		setVisible(false);
		setEditItem(null);
		setSelectedItem(null);
		setArrayOfDivs([]);
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
	const handleChangeClients = (event) => {
		const {
			target: { value },
		} = event;
		setTheClients(typeof value === 'string' ? value.split(',') : value);
	};

	const sesStgTYpe = allStages.map((ses) => ({
		// console.log(ses)
		id: ses?.STG_ID_PK,
		arName: ses?.FULL_STAGE_NAME,
	}));

	const uniqueIdsStg = new Set();
	const removedDuplicteStg = sesStgTYpe.filter((element) => {
		const isDuplicate = uniqueIdsStg.has(element.id);
		uniqueIdsStg.add(element.id);
		if (!isDuplicate) {
			return true;
		}
		return false;
	});

	const onChangeRequirNotes = (e, id) => {
		let newArrOfDivs = arrayOfDivs;
		if (e.target.name == 'SesRequirmentNotes') {
			newArrOfDivs.find((item) => item.id === id)['SesRequirmentNotes'] = e.target.value;
		}
		setArrayOfDivs(newArrOfDivs);
	};

	const onChangeRequirIds = (e, value, id) => {
		// console.log('value: ', value);
		let newArrOfDivs = arrayOfDivs;
		newArrOfDivs.find((item) => item.id === id)[ref0.current?.getAttribute('name')] = value;
		setArrayOfDivs(newArrOfDivs);
	};

	// add more requirements
	const handelReuirmentsList = () => {
		setArrayOfDivs([...arrayOfDivs, { id: divId + 1, requirementID: '', SesRequirmentNotes: '' }]);
		setDivId(divId + 1);
	};

	//remove reqs Div
	const handleRemoveSesReqs = (id) => {
		setArrayOfDivs(arrayOfDivs.filter((ele) => ele.id != id));
	};

	const onChangeRequirIdsNextSes = (e, value, id) => {
		// console.log('value: ', value);
		let newArrOfDivs = arrayOfDivsNext;
		newArrOfDivs.find((item) => item.id === id)[ref0.current?.getAttribute('name')] = value;
		setArrayOfDivsNext(newArrOfDivs);
	};

	const onChangeNextSesRequirNotes = (e, id) => {
		let newArrOfDivs = arrayOfDivsNext;
		if (e.target.name == 'SesRequirmentNotes') {
			newArrOfDivs.find((item) => item.id === id)['SesRequirmentNotes'] = e.target.value;
		}
		setArrayOfDivsNext(newArrOfDivs);
	};
	// add more requirements for next session
	const handelNextReuirmentsList = () => {
		setArrayOfDivsNext([...arrayOfDivsNext, { id: divIdNext + 1, requirementID: '', SesRequirmentNotes: '' }]);
		setDivIdNext(divIdNext + 1);
	};

	// remove next reqs
	const handleRemoveNextReqs = (id) => {
		setArrayOfDivsNext(arrayOfDivsNext.filter((ele) => ele.id != id));
	};

	// open add session modal
	const showAddSession = () => {
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setEditItem(null);
		setSelectedItem(null);
		setVisible(!visible);
		setOpenErrorSnack(false);
	};

	//empty all inputes value
	const emptyInputsVals = () => {
		setsesDate('');
		setstgDateTime(null);
		setsesRequirementList('');
		setCasSub('');
		setTheClients([]);
		setstgType('');
		setstgDecision('');
		setattendence('');
		settheAttendence('');
		setsesplace('');
		setsesJud('');
		setrollCOR('');
		setError(null);
		setstgDateTime('') 
		setsesDate('')
	};
	const handelChangeStage = (e) => {
		setCasSub(e.target.value);
		const selectedStage = allStages.find((ele) => ele.STG_ID_PK == e.target.value);
		setAdjClients(selectedStage);
	};

	let clientStage = [];
	const contactSession = allStages
		?.filter((contact) => contact?.clients.length > 0)
		.map((ele) => {
			return ele?.clients.map((ele) =>
				clientStage.push({
					id: ele?.CLI_ID_PK,
					arName: ele?.CLI_NAME,
					enName: ele?.CLI_NAME_ENGLISH,
					type: ele?.CLI_TYPE_NAME,
				})
			);
		});

	// filtter duplicates agents and ants
	const filtercontactSession = Array.from(new Set(clientStage?.map((a) => a.id))).map((id) => {
		return clientStage?.find((a) => a.id == id);
	});
	
	// add new session
	const addsession = () => {
		emptyInputsVals();
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		let newReqsArr = [];
		newReqsArr =
			arrayOfDivs.length > 0
				? arrayOfDivs.map((ele) => ({
						RTYPE_ID_PK: ele.requirementID ? theSessionRequirements.find((ele1) => ele1.RTYPE_NAME || ele1.RTYPE_NAME_EN == ele.requirementID)?.RTYPE_ID_PK : undefined,
						REQ_NOTES: ele.SesRequirmentNotes ? ele.SesRequirmentNotes : undefined,
				  }))
				: [];

		const theClientsIds = theClients
			.map((ele) => {
				return filtercontactSession.find((ele2) => ele == ele2.arName || ele2.enName);
			})
			.map((finalEle) => finalEle.id);

		let theTime = stgDateTime && new Date(stgDateTime).toLocaleTimeString();
		if (theTime) {
			if (theTime.slice(0, 2).includes(':')) {
				theTime = `0${theTime}`;
			}
		}
		// console.log("theTime: ", theTime);
		const sesTypeId = theSessionType?.find((ele) => ele?.SES_TYPE_NAME || ele?.SES_TYPE_NAME_EN == stgType)?.SES_TYPE_ID_PK;
		const sesRollId = theSessionRoll?.find((ele) => ele.SES_ROLL_NAME || ele.SES_ROLL_NAME_EN == rollCOR)?.SES_ROLL_ID_PK;
		const sesPlaceId = theSessionPlace?.find((ele) => ele?.SES_PLACE_NAME || ele?.SES_PLACE_NAME_EN == sesplace)?.SES_PLACE_ID_PK;
		const sesDescionId = theSessionDecision?.find((ele) => ele.SES_DECISION_NAME || ele.SES_DECISION_NAME_EN == stgDecision)?.SES_DECISION_ID_PK;
		const sesAdgId = theSessionJudgment?.find((ele) => ele.ADJ_TYPE_NAME || ele.ADJ_TYPE_NAME_EN == sesJud)?.ADJ_TYPE_ID_PK;

		// console.log(newReqsArr)
		dispatch(
			addNewSession({
				STG_ID_PK: casSub ? casSub : undefined,
				SES_TYPE_ID_PK: stgType ? sesTypeId : undefined,
				SES_TIME: stgDateTime ? theTime.slice(0, 5).concat(' ').concat(theTime.slice(9)) : undefined,
				SES_DECISION_ID_PK: stgDecision ? sesDescionId : undefined,
				SES_DECISION: DecDetails?.current?.value ? DecDetails?.current?.value : undefined,
				EMP_ID_PK: attendence ? attendence : undefined,
				SES_PLACE_ID_PK: sesplace ? sesPlaceId : undefined,
				ADJ_TYPE_ID_PK: sesJud ? sesAdgId : undefined,
				ADJ_DETAILS: sesJudDetails?.current?.value ? sesJudDetails?.current?.value : undefined,
				SES_ROLL_ID_PK: rollCOR ? sesRollId : undefined,
				SES_LINK: SesLink?.current?.value ? SesLink?.current?.value : undefined,
				SES_NOTES: SesNotes?.current?.value ? SesNotes?.current?.value : undefined,
				SES_NOTES_EN: SesNotesEn?.current?.value ? SesNotesEn?.current?.value : undefined,
				ADJ_AMOUNT: AdjCost ? Number(AdjCost?.current.value) : undefined,
				ses_replay_date: undefined,
				EMP2_ID_PK: theAttendence ? theAttendence : undefined,
				SES_DATE: sesDate ? sesDate : undefined,
				SES_FINAL: sesFinal,
				SES_ATTACHEMNT_REMINDER: RemindAttach,
				CLIENTS: theClients ? theClientsIds : undefined,
				SES_REPLAY_REMINDER: sesReplayRem,
				REQUIRMENT: newReqsArr,
			})
		).then((res) => {
			// console.log(res.payload);
			if (res.payload?.res?.data?.code == '123') {
				setError(res.payload?.res?.data);
			} else {
				dispatch(getSessionData({ theParams: { id: id, limit: '10' } })).then(() => {
					setVisible(false);
					setOpenAddSnack(true);
					emptyInputsVals();
				});
			}
		});
	};

	// open edit session modal
	const showEditSession = (editId) => {
		setError(null);
		console.log(editId);
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setSelectedItem(null);
		dispatch(getSessionDecision());
		dispatch(getSessionPlace());
		dispatch(getSessionRoll());
		dispatch(getSessionType());
		dispatch(getSessionRequired());
		dispatch(getSessionJudgement());
		dispatch(getSessionById(editId))
			.then((data) => {
				const selectedStage = allStages.find((ele) => ele.STG_ID_PK == data.payload?.STG_ID_PK);
				setAdjClients(selectedStage);
				setEditItem(data.payload);
				// const theEditAttendence = document.body.getAttribute('dir') == 'ltr' ? allEmployee?.find((ele) => data.payload?.EMP_NAME_ENGLISH == ele.EMP_NAME_ENGLISH) : allEmployee?.find((ele) => data.payload?.EMP_NAME == ele.EMP_NAME);
				// const theEditTheAttendence = document.body.getAttribute('dir') == 'ltr' ? allEmployee?.find((ele) => data.payload?.EMP_NAME2_ENGLISH == ele.EMP_NAME_ENGLISH) : allEmployee?.find((ele) => data.payload?.EMP_NAME2 == ele.EMP_NAME);
				const theEditRequirements =
					data.payload?.requirement?.length > 0
						? data.payload?.requirement.map((ele, index) => ({
								id: index + divId,
								requirementID: ele.RTYPE_NAME,
								SesRequirmentNotes: ele?.REQ_NOTES,
						  }))
						: [];
						
				// console.log(data.payload?.requirement, theEditRequirements);
				setSesReplayRem(data.payload?.SES_REPLAY_REMINDER);
				setRemindAttach(data.payload?.SES_ATTACHEMNT_REMINDER);
				setSesFinal(data.payload?.SES_FINAL);
				setsesDate(data.payload?.SES_DATE ? new Date(data.payload?.SES_DATE).toISOString().split('T')[0] : '');
				setstgDateTime(data.payload?.SES_TIME ?  `2014-08-18T${data.payload?.SES_TIME.split("T")[1].slice(0,5)}:00`: null);
				setArrayOfDivs(theEditRequirements);
				setCasSub(data.payload?.STG_ID_PK ? data.payload?.STG_ID_PK : '');
				setTheClients(
					data.payload?.clientsAdj
						? data.payload?.clientsAdj?.map((ele) => selectedStage.clients?.find((ele2) => ele2.CLI_ID_PK == ele.CLI_ID_PK)?.CLI_NAME)
						: []
				);
				setstgType(document.body.getAttribute('dir') == 'ltr' && data.payload?.SES_TYPE_NAME_EN ? data.payload?.SES_TYPE_NAME_EN : data.payload?.SES_TYPE_NAME ? data.payload?.SES_TYPE_NAME : '');
				setstgDecision(document.body.getAttribute('dir') == 'ltr' && data.payload?.SES_DECISION_NAME_EN ? data.payload?.SES_DECISION_NAME_EN : data.payload?.SES_DECISION_NAME ? data.payload?.SES_DECISION_NAME : '');
				setattendence(data.payload?.EMP_ID_PK ? data.payload?.EMP_ID_PK : '');
				settheAttendence(data.payload?.EMP2_ID_PK ? data.payload?.EMP2_ID_PK : '');
				setsesplace(document.body.getAttribute('dir') == 'ltr' && data.payload?.SES_PLACE_NAME_EN ? data.payload?.SES_PLACE_NAME_EN : data.payload?.SES_PLACE_NAME ? data.payload?.SES_PLACE_NAME : '');
				setsesJud(document.body.getAttribute('dir') == 'ltr' && data.payload?.ADJ_TYPE_NAME_EN ? data.payload?.ADJ_TYPE_NAME_EN : data.payload?.ADJ_TYPE_NAME ? data.payload?.ADJ_TYPE_NAME : '');
				setrollCOR(document.body.getAttribute('dir') == 'ltr' && data.payload?.SES_ROLL_NAME_EN ? data.payload?.SES_ROLL_NAME_EN : data.payload?.SES_ROLL_NAME ? data.payload?.SES_ROLL_NAME : '');
			})
			.then(() => setVisible(!visible));
	};

	// dispatch update session function
	const editSession = () => {
		let newReqsArr = [];
		newReqsArr =
			arrayOfDivs.length > 0
				? arrayOfDivs.map((ele) => ({
						RTYPE_ID_PK: ele.requirementID ? theSessionRequirements.find((ele1) => ele1.RTYPE_NAME == ele.requirementID)?.RTYPE_ID_PK : undefined,
						REQ_NOTES: ele.SesRequirmentNotes ? ele.SesRequirmentNotes : undefined,
				  }))
				: [];
		// convert clients name to id
		const theClientsIds = theClients.map((ele) => {
			return filtercontactSession.find((ele2) => ele == ele2.arName || ele2.enName)?.id;
		});
		// console.log('stgDateTime: ', stgDateTime);
		let theTime = stgDateTime && new Date(stgDateTime).toLocaleTimeString();
		if (theTime) {
			if (theTime.slice(0, 2).includes(':')) {
				theTime = `0${theTime}`;
			}
		}
		// console.log("theClients: ", theClientsIds)
		const sesTypeId = theSessionType?.find((ele) => ele?.SES_TYPE_NAME || ele?.SES_TYPE_NAME_EN == stgType)?.SES_TYPE_ID_PK;
		const sesRollId = theSessionRoll?.find((ele) => ele.SES_ROLL_NAME || ele.SES_ROLL_NAME_EN == rollCOR)?.SES_ROLL_ID_PK;
		const sesPlaceId = theSessionPlace?.find((ele) => ele?.SES_PLACE_NAME || ele?.SES_PLACE_NAME_EN == sesplace)?.SES_PLACE_ID_PK;
		const sesDescionId = theSessionDecision?.find((ele) => ele.SES_DECISION_NAME || ele.SES_DECISION_NAME_EN == stgDecision)?.SES_DECISION_ID_PK;
		const sesAdgId = theSessionJudgment?.find((ele) => ele.ADJ_TYPE_NAME || ele.ADJ_TYPE_NAME_EN == sesJud)?.ADJ_TYPE_ID_PK;
		dispatch(
			updateSession({
				id: editItem.SES_ID_PK,
				data: {
					STG_ID_PK: casSub ? casSub : undefined,
					SES_TYPE_ID_PK: stgType ? sesTypeId : undefined,
					SES_TIME: stgDateTime ? theTime : undefined,
					SES_DECISION_ID_PK: stgDecision ? sesDescionId : undefined,
					SES_DECISION: DecDetails?.current?.value ? DecDetails?.current?.value : undefined,
					EMP_ID_PK: attendence ? attendence : undefined,
					SES_PLACE_ID_PK: sesplace ? sesPlaceId : undefined,
					ADJ_TYPE_ID_PK: sesJud ? sesAdgId : undefined,
					ADJ_DETAILS: sesJudDetails?.current?.value ? sesJudDetails?.current?.value : undefined,
					SES_ROLL_ID_PK: rollCOR ? sesRollId : undefined,
					SES_LINK: SesLink?.current?.value ? SesLink?.current?.value : undefined,
					SES_NOTES: SesNotes?.current?.value ? SesNotes?.current?.value : undefined,
					SES_NOTES_EN: SesNotesEn?.current?.value ? SesNotesEn?.current?.value : undefined,
					ADJ_AMOUNT: AdjCost ? Number(AdjCost?.current.value) : undefined,
					ses_replay_date: undefined,
					EMP2_ID_PK: theAttendence ? theAttendence : undefined,
					SES_DATE: editItem ? editItem?.SES_DATE : sesDate?.current.value ? sesDate?.current.value : undefined,
					SES_FINAL: sesFinal,
					SES_ATTACHEMNT_REMINDER: RemindAttach,
					CLIENTS: theClients ? theClientsIds : undefined,
					SES_REPLAY_REMINDER: sesReplayRem,
					REQUIRMENT: newReqsArr.length > 0 ? newReqsArr.filter((ele) => ele?.REQ_NOTES != '') : undefined,
				},
			})
		).then((res) => {
			console.log('res?.payload: ', res?.payload?.res);
			if (res?.payload?.res?.data?.code) {
				// console.log(res?.payload?.result);
				setOpenErrorSnack(true);
			} else {
				dispatch(getSessionData({ theParams: { id: id, limit: '10' } })).then(() => {
					setOpenAddSnack(true);
					setVisible(false);
					setOpenEditSnack(true);
					emptyInputsVals();
				});
			}
		});

		if (nextSes?.current?.value) {
			let newReqsArrNexSes = [];
			newReqsArrNexSes =
				arrayOfDivsNext.length > 0
					? arrayOfDivsNext.map((ele) => ({
							RTYPE_ID_PK: ele.requirementID
								? theSessionRequirements.find((ele1) => ele1.RTYPE_NAME == ele.requirementID)?.RTYPE_ID_PK
								: undefined,
							REQ_NOTES: ele.SesRequirmentNotes ? ele.SesRequirmentNotes : undefined,
					  }))
					: [];
			//add next session when updating

			// console.log('nextstgDateTime: ', nextstgDateTime);
			let theNextSesTime = nextstgDateTime && new Date(nextstgDateTime).toLocaleTimeString();
			if (theNextSesTime) {
				if (theNextSesTime.slice(0, 2).includes(':')) {
					theNextSesTime = `0${theNextSesTime}`;
				}
			}
			console.log('theNextSesTime: ', theNextSesTime);
			dispatch(
				addNewSession({
					STG_ID_PK: casSub ? casSub : undefined,
					SES_TYPE_ID_PK: stgType ? stgType : undefined,
					SES_TIME: nextstgDateTime ? theNextSesTime : undefined,
					SES_DECISION_ID_PK: undefined,
					SES_DECISION: undefined,
					EMP_ID_PK: attendence ? attendence : undefined,
					SES_PLACE_ID_PK: sesplace ? sesplace : undefined,
					ADJ_TYPE_ID_PK: undefined,
					ADJ_DETAILS: undefined,
					SES_ROLL_ID_PK: NextSesrollCOR ? NextSesrollCOR : undefined,
					SES_LINK: undefined,
					SES_NOTES: NextSesNotes?.current?.value ? NextSesNotes?.current?.value : undefined,
					SES_NOTES_EN: NextSesNotesEN?.current?.value ? NextSesNotesEN?.current?.value : undefined,
					ADJ_AMOUNT: undefined,
					ses_replay_date: undefined,
					EMP2_ID_PK: undefined,
					SES_DATE: nextSes?.current.value ? nextSes?.current.value : undefined,
					SES_FINAL: sesFinal,
					SES_ATTACHEMNT_REMINDER: RemindAttach,
					CLIENTS: undefined,
					SES_REPLAY_REMINDER: sesReplayRem,
					REQUIRMENT: newReqsArrNexSes.length > 0 ? newReqsArrNexSes.filter((ele) => ele?.REQ_NOTES != '') : undefined,
				})
			).then((res) => {
				if (res.payload?.res?.data?.code) {
					console.log(res.payload?.res?.data);
					setError(res.payload?.res?.data);
				} else {
					dispatch(getSessionData({ theParams: { id: id, limit: '10' } })).then(() => {
						setVisible(false);
						setOpenAddSnack(true);
						emptyInputsVals();
					});
				}
			});
		}
		setOpenAddSnack(true);
		setVisible(false);
		setOpenEditSnack(true);
	};

	const handledeleteTheSession = (id) => {
		setDeletedItemId(id);
		setVisibleDeleteModal(true);
	};
	// delete Session
	const deleteTheSession = () => {
		dispatch(deleteSession(deletedItemId)).then((res) => {
			if (res?.payload?.result?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
	};
	const handelNextSlide = (active, dir) => {
		if (dir == 'next' && active == 0) {
			// document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.setAttribute('id', 'carousel-control-next');
			document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.modal-sessions .carousel-control-prev')[0]?.removeAttribute('disabled');
		} else if (dir == 'prev' && active == 1 && !editItem) {
			document.querySelectorAll('.modal-sessions .carousel-control-prev')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.removeAttribute('disabled');
		} else if (dir == 'prev' && active == 1 && editItem) {
			document.querySelectorAll('.modal-sessions .carousel-control-prev')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.removeAttribute('disabled');
		}
	};
	
	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(7);
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
				dispatch(getsessionAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className={`modal-sessions ${document.body.getAttribute('dir') == 'ltr' ? 'enTextLeftPopup' : null}`}>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilVector} customClassName="nav-icon" />
					{selectedItem || editItem ? <span>{translation('theSession')}  {selectedItem?.STG_NUMBER || editItem?.STG_NUMBER}</span> : <span>{translation('add')}</span>}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				{editItem ? (
					<CCarousel controls interval={false} wrap={false} onSlide={handelNextSlide}>
						<CCarouselItem>
							<CRow>
								<CCol md={8}>
									{/* {console.log(editItem)} */}
									<CFormLabel htmlFor="inputEmail4">{translation('sessionDate')}</CFormLabel>
									<CRow className="sesTime">
										<CCol md={6}>
											{selectedItem ? (
												<p>
													{selectedItem?.SES_DATE
														? new Intl.DateTimeFormat('en-US').format(new Date(selectedItem?.SES_DATE))
														: translation('notFound')}
												</p>
											) : (
												<>
													<CFormInput
														type="date"
														value={sesDate}
														id="inputEmail4"
														required
														className={`${error?.args?.filter((ele) => ele == 'body.SES_DATE is required') ? 'is-invalid' : null}`}
														onChange={(e) => setsesDate(e.target.value)}
													/>
													<CFormFeedback invalid={error?.message ? true : false} valid={error?.message ? false : true}>
														{translation('notCorrect')}
													</CFormFeedback>
												</>
											)}
										</CCol>

										<CCol md={6} className="sessionDate">
											{selectedItem ? (
												<p>{editItem ? editItem?.SES_TIME : translation('notFound')}</p>
											) : (
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<TimePicker
														onChange={setstgDateTime}
														value={stgDateTime}
														renderInput={(params) => <TextField {...params} />}
														// error={`${error?.message ? true : false}`}
														// helperText={`${
														//   error?.message ? "موعد الجلسه غير صحيح" : null
														// }`}
													/>
												</LocalizationProvider>
											)}
										</CCol>
									</CRow>
								</CCol>
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('case')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.FULL_STAGE_NAME ? selectedItem?.FULL_STAGE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={casSub}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												// value={ele.id}
												onChange={(e) => handelChangeStage(e)}
												error={error?.args?.find((ele) => (ele = 'body.STG_ID_PK is required')) ? true : false}
											>
												{removedDuplicteStg.map((ele) => (
													<MenuItem value={ele.id} key={Math.random() + ele.id}>
														{ele.arName}
													</MenuItem>
												))}
											</Select>
											{error?.args?.find((ele) => (ele = 'body.STG_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>}
										</FormControl>
									)}
								</CCol>
								<CCol md={4}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(3)}>
										{' '}
										{translation('sessionType')}{' '}
									</CFormLabel>
									{selectedItem ? (
									<p>{document.body.getAttribute('dir') == 'ltr'  && selectedItem?.SES_TYPE_NAME_EN ? selectedItem?.SES_TYPE_NAME_EN : selectedItem?.SES_TYPE_NAME ? selectedItem?.SES_TYPE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionType()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={stgType}
												onChange={(e, value) => setstgType(value)}
												options={theSessionType?.map((option) => document.body.getAttribute('dir') == 'ltr' && option.SES_TYPE_NAME_EN ? option.SES_TYPE_NAME_EN : option.SES_TYPE_NAME)}
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
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4"> المكلف بالحضور</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.EMP_NAME ? selectedItem?.EMP_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={attendence}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												onChange={(e) => setattendence(e.target.value)}
											>
												{allEmployee?.map((ele) => (
													<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
															{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH : ele.EMP_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</CCol>
								<CCol md={4}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(5)}>
										{' '}
										{translation('sesPlace')}
									</CFormLabel>
									{selectedItem ? (
										<p>{document.body.getAttribute('dir') == 'ltr' && selectedItem?.SES_PLACE_NAME_EN ? selectedItem?.SES_PLACE_NAME_EN : selectedItem?.SES_PLACE_NAME ? selectedItem?.SES_PLACE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionPlace()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={sesplace}
												onChange={(e, value) => setsesplace(value)}
												options={theSessionPlace.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.SES_PLACE_NAME_EN ? option?.SES_PLACE_NAME_EN : option.SES_PLACE_NAME)}
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
								<CCol md={4}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
										{' '}
										{translation('sessionRoll')}
									</CFormLabel>
									{selectedItem ? (
										<p>{document.body.getAttribute('dir') == 'ltr' && selectedItem?.SES_ROLL_NAME_EN ? selectedItem?.SES_ROLL_NAME_EN : selectedItem?.SES_ROLL_NAME ? selectedItem?.SES_ROLL_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionRoll()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={rollCOR}
												onChange={(e, value) => setrollCOR(value)}
												options={theSessionRoll.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.SES_ROLL_NAME_EN ? option?.SES_ROLL_NAME_EN : option.SES_ROLL_NAME)}
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
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('attended')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.EMP_NAME2 ? selectedItem?.EMP_NAME2 : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={theAttendence}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												onChange={(e) => settheAttendence(e.target.value)}
											>
												{allEmployee?.map((ele) => (
													<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
														{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH: ele.EMP_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</CCol>
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4"> {translation('link')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_LINK ? selectedItem?.SES_LINK : translation('notFound')}</p>
									) : (
										<CFormInput type="text" defaultValue={editItem ? editItem?.SES_LINK : ''} id="inputEmail4" ref={SesLink} />
									)}
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4">{translation('notes')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_NOTES ? selectedItem?.SES_NOTES : translation('notFound')}</p>
									) : (
										<CFormTextarea
											id="exampleFormControlTextarea1"
											rows="4"
											ref={SesNotes}
											defaultValue={editItem ? editItem?.SES_NOTES : null}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4">{translation('notesEn')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_NOTES_EN ? selectedItem?.SES_NOTES_EN : translation('notFound')}</p>
									) : (
										<CFormTextarea
											id="exampleFormControlTextarea1"
											rows="4"
											ref={SesNotesEn}
											defaultValue={editItem ? editItem?.SES_NOTES_EN : null}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={12}>
							{ editItem || selectedItem ? (<>
									<CFormLabel style={{cursor:'pointer'}}> {translation('attachments')} 
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editItem?.SES_ID_PK)}
								/></CFormLabel>
										{selectedItem?._FILE > 0 || editItem?._FILE? (
											<CTable bordered>
												<AttachedHeadTable />
												<CTableBody>
													{attachment?.map((ele, i) => (
														<CTableRow
															key={i}
															onClick={() => {
																dispatch(
																	getsessionAttachmentData({
																		id: selectedItem?.SES_ID_PK,
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
														{editItem?.SES_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editItem?.SES_ID_PK)}
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
											<p> {translation('notFound')} </p>
										)}</>) : null }
								</CCol>
							</CRow>
						</CCarouselItem>

						<CCarouselItem>
							<h6>{translation('nextSess')}</h6>
							<CRow>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('nextSesDate')} </CFormLabel>
									<CRow className="sesTime">
										<CCol md={6}>
											{selectedItem ? (
												<p>
													{selectedItem?.SES_DATE
														? new Intl.DateTimeFormat('en-US').format(new Date(selectedItem?.SES_NEXT))
														: translation('notFound')}
												</p>
											) : (
												<>
													<CFormInput
														type="date"
														defaultValue={editItem?.ses_replay_date ? new Date(editItem?.ses_replay_date) : null}
														id="inputEmail4"
														ref={nextSes}
													/>
												</>
											)}
										</CCol>
										<CCol md={6}>
											{editItem && (
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<TimePicker
														value={nextstgDateTime}
														onChange={setNextstgDateTime}
														renderInput={(params) => <TextField {...params} />}
													/>
												</LocalizationProvider>
											)}
										</CCol>
									</CRow>
								</CCol>
								<CCol xs={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('sessionRoll')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_ROLL_NAME ? selectedItem?.SES_ROLL_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={NextSesrollCOR}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												onChange={(e) => setNextSesrollCOR(e.target.value)}
											>
												{theSessionRoll.map((ele) => (
													<MenuItem value={ele.SES_ROLL_ID_PK} key={Math.random() + ele.SES_ROLL_ID_PK}>
														{ele.SES_ROLL_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4">{translation('notes')}</CFormLabel>
									{selectedItem ? (
										null
									) : (
										<CFormTextarea id="exampleFormControlTextarea1" rows="4" ref={NextSesNotes}></CFormTextarea>
									)}
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4">{translation('notesEn')}</CFormLabel>
									{selectedItem ? (
										null
									) : (
										<CFormTextarea
											id="exampleFormControlTextarea1"
											rows="4"
											ref={NextSesNotesEN}
											// defaultValue={editItem ? editItem?.SES_NOTES_EN : null}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={12}>
									<CButton onClick={handelNextReuirmentsList} className="sesREquirement">
										{' '}
										<CIcon
											style={{
												height: '18px',
												color: '#fff',
												margin: '5px 2px auto auto',
												cursor: 'pointer',
											}}
											icon={cilPlus}
											customClassName="nav-icon"
										/>
										{translation('addnextSesReq')}
									</CButton>
									{/* {NextsesRequirementList} */}
									{arrayOfDivsNext?.map((ele) => (
										<SessionRequirements
											id={ele.id}
											key={ele.id}
											onChange1={(e, vlaue) => onChangeRequirIdsNextSes(e, vlaue, ele.id)}
											value1={ele.NextSesrequirementID}
											name1="NextSesrequirementID"
											theSessionRequirements={theSessionRequirements}
											name2="NextSesSesRequirmentNotes"
											onChange2={(e) => onChangeNextSesRequirNotes(e, ele.id)}
											value2={ele.NextSesSesRequirmentNotes}
											icon={cilMinus}
											onClick1={() => handleRemoveNextReqs(ele.id)}
											onClickAddNewRequirement={() => setConstantAdd(2)}
											onClickAddRequirList={() => handelAddSessionRequirement()}
										/>
									))}
								</CCol>
							</CRow>
						</CCarouselItem>
						<CCarouselItem>
							<CRow>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(6)}>
										{translation('sessionDecision')}
									</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_DECISION_NAME ? selectedItem?.SES_DECISION_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionDescision()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={stgDecision}
												onChange={(e, value) => setstgDecision(value)}
												options={theSessionDecision.map((option) => document.body.getAttribute('dir') == 'ltr' && option.SES_DECISION_NAME_EN ? option.SES_DECISION_NAME_EN : option.SES_DECISION_NAME)}
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
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
									{translation('judgement')}
									</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.ADJ_TYPE_NAME ? selectedItem?.ADJ_TYPE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionJudgment()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={sesJud}
												onChange={(e, value) => setsesJud(value)}
												options={theSessionJudgment.map((option) => document.body.getAttribute('dir') == 'ltr' && option.ADJ_TYPE_NAME_EN ? option.ADJ_TYPE_NAME_EN : option.ADJ_TYPE_NAME)}
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
									<CFormLabel htmlFor="inputEmail4"> {translation('decisionDetail')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_DECISION ? selectedItem?.SES_DECISION : translation('notFound')}</p>
									) : (
										<CFormTextarea
											type="text"
											defaultValue={editItem ? editItem?.SES_DECISION : ''}
											id="inputEmail4"
											ref={DecDetails}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('judgDetails')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.ADJ_DETAILS ? selectedItem?.ADJ_DETAILS : translation('notFound')}</p>
									) : (
										<CFormTextarea
											type="text"
											defaultValue={editItem ? editItem?.ADJ_DETAILS : ''}
											id="inputEmail4"
											ref={sesJudDetails}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('judgAmount')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.ADJ_AMOUNT ? selectedItem?.ADJ_AMOUNT : translation('notFound')}</p>
									) : (
										<CFormInput type="text" defaultValue={editItem ? editItem?.ADJ_AMOUNT : ''} id="inputEmail4" ref={AdjCost} />
									)}
								</CCol>
								{selectedItem ? null : (
									<>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4">{translation('parties')}</CFormLabel>
											<FormControl fullWidth>
												<Select
													multiple
													displayEmpty
													value={theClients}
													onChange={handleChangeClients}
													input={<OutlinedInput />}
													renderValue={(selected) => (
														<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
															{selected && selected.map((value) => <Chip key={Math.random() + value} label={value} />)}
														</Box>
													)}
													//TODOL ال{translation('parties')} مش موجوده فى التعديل
													MenuProps={MenuPropsForClient}
													inputProps={{ 'aria-label': 'Without label' }}
												>
													{adjClients?.clients?.map((ele) => (
														<MenuItem value={ele.CLI_NAME} key={Math.random() + ele.CLI_NAME}>
															{ele.CLI_NAME}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</CCol>
										<CCol
											md={6}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: '15px',
												marginBottom: '10px',
											}}
										>
											<CFormCheck
												id="flexCheckDefault"
												name="finalSes"
												label={formatMessage({id: 'finalSession'})}
												value={sesFinal}
												onChange={(e) => setSesFinal(e.target.checked)}
												defaultChecked={editItem?.SES_FINAL ? true : false}
											/>
											<CFormCheck
												id="flexCheckDefault"
												name="attachReminder"
												label={formatMessage({id: 'attachmentReminder'})}
												value={RemindAttach}
												onChange={(e) => setRemindAttach(e.target.checked)}
												defaultChecked={editItem?.SES_ATTACHEMNT_REMINDER ? true : false}
											/>
											<CFormCheck
												id="flexCheckDefault"
												name="attachReminder"
												label={formatMessage({id: 'replyReminder'})}
												value={sesReplayRem}
												onChange={(e) => setSesReplayRem(e.target.value)}
												defaultChecked={editItem?.SES_REPLAY_REMINDER ? true : false}
											/>
										</CCol>
									</>
								)}
								{selectedItem ? null : (
									<CCol md={12}>
										<CButton onClick={handelReuirmentsList} className="sesREquirement">
											{' '}
											<CIcon
												style={{
													height: '18px',
													color: '#fff',
													margin: '5px 2px auto auto',
													cursor: 'pointer',
												}}
												icon={cilPlus}
												customClassName="nav-icon"
											/>
											إضافه طلبات
										</CButton>
										{/* {console.log(arrayOfDivs)} */}
										{arrayOfDivs.map((ele) => (
											<SessionRequirements
												id={ele.id}
												key={ele.id}
												onChange1={(e, value) => onChangeRequirIds(e, value, ele.id)}
												value1={ele.requirementID}
												name1="requirementID"
												theSessionRequirements={theSessionRequirements}
												name2="SesRequirmentNotes"
												onChange2={(e) => onChangeRequirNotes(e, ele.id)}
												value2={ele.SesRequirmentNotes}
												icon={cilMinus}
												onClick1={() => handleRemoveSesReqs(ele.id)}
												onClickAddNewRequirement={() => setConstantAdd(2)}
												onClickAddRequirList={() => handelAddSessionRequirement()}
												ref0={ref0}
											/>
										))}
									</CCol>
								)}
							</CRow>
						</CCarouselItem>
					</CCarousel>
				) : (
					<CCarousel controls interval={false} wrap={false} onSlide={handelNextSlide}>
						<CCarouselItem>
							<CRow>
								<CCol md={8}>
									{/* {console.log(editItem)} */}
									<CFormLabel htmlFor="inputEmail4"> {translation('sessionDate')} </CFormLabel>
									<CRow className="sesTime">
										<CCol md={6}>
											{selectedItem ? (
												<p>
													{selectedItem?.SES_DATE
														? new Intl.DateTimeFormat('en-US').format(new Date(selectedItem?.SES_DATE))
														: translation('notFound')}
												</p>
											) : (
												<>
													<CFormInput
														type="date"
														value={sesDate}
														id="inputEmail4"
														required
														className={`${error?.args?.filter((ele) => ele == 'body.SES_DATE is required') ? 'is-invalid' : null}`}
														onChange={(e) => setsesDate(e.target.value)}
													/>
													<CFormFeedback invalid={error?.message ? true : false} valid={error?.message ? false : true}>
														{translation('notCorrect')}
													</CFormFeedback>
												</>
											)}
										</CCol>

										<CCol md={6} className="sessionDate">
											{selectedItem ? (
												<p>{editItem ? editItem?.SES_TIME : translation('notFound')}</p>
											) : (
												<LocalizationProvider dateAdapter={AdapterDateFns}>
													<TimePicker
														onChange={setstgDateTime}
														value={stgDateTime}
														renderInput={(params) => <TextField {...params} />}
														// error={`${error?.message ? true : false}`}
														// helperText={`${
														//   error?.message ? "موعد الجلسه غير صحيح" : null
														// }`}
													/>
												</LocalizationProvider>
											)}
										</CCol>
									</CRow>
								</CCol>
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('case')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.FULL_STAGE_NAME ? selectedItem?.FULL_STAGE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={casSub}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												// value={ele.id}
												onChange={handelChangeStage}
												error={error?.args?.find((ele) => (ele = 'body.STG_ID_PK is required')) ? true : false}
											>
												{removedDuplicteStg.map((ele) => (
													<MenuItem value={ele.id} key={Math.random() + ele.id}>
														{ele.arName}
													</MenuItem>
												))}
											</Select>
											{error?.args?.find((ele) => (ele = 'body.STG_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>}
										</FormControl>
									)}
								</CCol>
								<CCol md={4}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(3)}>
										{' '}
										{translation('sessionType')}
									</CFormLabel>
									{selectedItem ? (
										<p>{document.body.getAttribute('dir') == 'ltr'  && selectedItem?.SES_TYPE_NAME_EN ? selectedItem?.SES_TYPE_NAME_EN : selectedItem?.SES_TYPE_NAME ? selectedItem?.SES_TYPE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionType()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={stgType}
												onChange={(e, value) => setstgType(value)}
												options={theSessionType?.map((option) => document.body.getAttribute('dir') == 'ltr' && option.SES_TYPE_NAME_EN ? option.SES_TYPE_NAME_EN : option.SES_TYPE_NAME)}
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
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4"> المكلف بالحضور</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.EMP_NAME ? selectedItem?.EMP_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={attendence}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												onChange={(e) => setattendence(e.target.value)}
											>
												{allEmployee?.map((ele) => (
													<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
														{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH : ele.EMP_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</CCol>
								<CCol md={4}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(5)}>
										{' '}
										{translation('sesPlace')}
									</CFormLabel>
									{selectedItem ? (
										<p>{document.body.getAttribute('dir') == 'ltr' && selectedItem?.SES_PLACE_NAME_EN ? selectedItem?.SES_PLACE_NAME_EN : selectedItem?.SES_PLACE_NAME ? selectedItem?.SES_PLACE_NAME : translation('notFound')}</p>
										) : (
										<FormControl fullWidth onClick={() => handelAddSessionPlace()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={sesplace}
												onChange={(e, value) => setsesplace(value)}
												options={theSessionPlace.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.SES_PLACE_NAME_EN ? option?.SES_PLACE_NAME_EN : option.SES_PLACE_NAME)}
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
								<CCol md={4}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
										{' '}
										{translation('sessionRoll')}
									</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_ROLL_NAME ? selectedItem?.SES_ROLL_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionRoll()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={rollCOR}
												onChange={(e, value) => setrollCOR(value)}
												options={theSessionRoll.map((option) => option.SES_ROLL_NAME)}
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
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4"> {translation('attended')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.EMP_NAME2 ? selectedItem?.EMP_NAME2 : translation('notFound')}</p>
									) : (
										<FormControl fullWidth>
											<Select
												value={theAttendence}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												onChange={(e) => settheAttendence(e.target.value)}
											>
												{allEmployee?.map((ele) => (
													<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
														{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH ? ele.EMP_NAME_ENGLISH: ele.EMP_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									)}
								</CCol>
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4"> {translation('link')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_LINK ? selectedItem?.SES_LINK : translation('notFound')}</p>
									) : (
										<CFormInput type="text" defaultValue={editItem ? editItem?.SES_LINK : ''} id="inputEmail4" ref={SesLink} />
									)}
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4">{translation('notes')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_NOTES ? selectedItem?.SES_NOTES : translation('notFound')}</p>
									) : (
										<CFormTextarea
											id="exampleFormControlTextarea1"
											rows="4"
											ref={SesNotes}
											defaultValue={editItem ? editItem?.SES_NOTES : null}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4">{translation('notesEn')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_NOTES_EN ? selectedItem?.SES_NOTES_EN : translation('notFound')}</p>
									) : (
										<CFormTextarea
											id="exampleFormControlTextarea1"
											rows="4"
											ref={SesNotesEn}
											defaultValue={editItem ? editItem?.SES_NOTES_EN : null}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={12}>
								{ editItem || selectedItem ? (<><CFormLabel style={{cursor:'pointer'}}>
										 {translation('attachments')} {editItem?.SES_ID_PK ? (
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editItem?.SES_ID_PK)}
								/>
							) : null}</CFormLabel>
									{selectedItem?._FILE > 0 || editItem._FILE? (
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
																	getsessionAttachmentData({
																		id: selectedItem?.SES_ID_PK,
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
														{editItem?.SES_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editItem?.SES_ID_PK)}
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
											)}</>) : null }
								</CCol>
							</CRow>
						</CCarouselItem>
						<CCarouselItem>
							<CRow>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(6)}>
										{translation('sessionDecision')}
									</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_DECISION_NAME ? selectedItem?.SES_DECISION_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionDescision()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={stgDecision}
												onChange={(e, value) => setstgDecision(value)}
												options={theSessionDecision.map((option) => document.body.getAttribute('dir') == 'ltr' && option.SES_DECISION_NAME_EN ? option.SES_DECISION_NAME_EN : option.SES_DECISION_NAME)}
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
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
										{translation('judgement')}
									</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.ADJ_TYPE_NAME ? selectedItem?.ADJ_TYPE_NAME : translation('notFound')}</p>
									) : (
										<FormControl fullWidth onClick={() => handelAddSessionJudgment()} sx={{ minWidth: '100%' }}>
											<Autocomplete
												id="free-solo-demo"
												freeSolo
												value={sesJud}
												onChange={(e, value) => setsesJud(value)}
												options={theSessionJudgment.map((option) => document.body.getAttribute('dir') == 'ltr' && option.ADJ_TYPE_NAME_EN ? option.ADJ_TYPE_NAME_EN : option.ADJ_TYPE_NAME)}
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
									<CFormLabel htmlFor="inputEmail4"> {translation('decisionDetail')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.SES_DECISION ? selectedItem?.SES_DECISION : translation('notFound')}</p>
									) : (
										<CFormTextarea
											type="text"
											defaultValue={editItem ? editItem?.SES_DECISION : ''}
											id="inputEmail4"
											ref={DecDetails}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('judgDetails')}</CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.ADJ_DETAILS ? selectedItem?.ADJ_DETAILS : translation('notFound')}</p>
									) : (
										<CFormTextarea
											type="text"
											defaultValue={editItem ? editItem?.ADJ_DETAILS : ''}
											id="inputEmail4"
											ref={sesJudDetails}
										></CFormTextarea>
									)}
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('judgAmount')} </CFormLabel>
									{selectedItem ? (
										<p>{selectedItem?.ADJ_AMOUNT ? selectedItem?.ADJ_AMOUNT : translation('notFound')}</p>
									) : (
										<CFormInput type="number" defaultValue={editItem ? editItem?.ADJ_AMOUNT : ''} id="inputEmail4" ref={AdjCost} />
									)}
								</CCol>
								{selectedItem ? null : (
									<>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4">{translation('parties')}</CFormLabel>
											<FormControl fullWidth>
												<Select
													multiple
													displayEmpty
													value={theClients}
													onChange={handleChangeClients}
													input={<OutlinedInput />}
													renderValue={(selected) => (
														<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
															{selected && selected.map((value) => <Chip key={Math.random() + value} label={value} />)}
														</Box>
													)}
													//TODOL ال{translation('parties')} مش موجوده فى التعديل
													MenuProps={MenuPropsForClient}
													inputProps={{ 'aria-label': 'Without label' }}
												>
												{adjClients?.clients?.map((ele) => (
													<MenuItem value={document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele.CLI_NAME} key={Math.random() + ele.CLI_NAME}>
														{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
													</MenuItem>
												))}
												</Select>
											</FormControl>
										</CCol>
										<CCol
											md={6}
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginTop: '15px',
												marginBottom: '10px',
											}}
										>
											<CFormCheck
												id="flexCheckDefault"
												name="finalSes"
												label={formatMessage({id: 'finalSession'})}
												value={sesFinal}
												onChange={(e) => setSesFinal(e.target.checked)}
												defaultChecked={editItem?.SES_FINAL ? true : false}
											/>
											<CFormCheck
												id="flexCheckDefault"
												name="attachReminder"
												label={formatMessage({id: 'attachmentReminder'})}
												value={RemindAttach}
												onChange={(e) => setRemindAttach(e.target.checked)}
												defaultChecked={editItem?.SES_ATTACHEMNT_REMINDER ? true : false}
											/>
											<CFormCheck
												id="flexCheckDefault"
												name="attachReminder"
												label={formatMessage({id: 'replyReminder'})}
												value={sesReplayRem}
												onChange={(e) => setSesReplayRem(e.target.value)}
												defaultChecked={editItem?.SES_REPLAY_REMINDER ? true : false}
											/>
										</CCol>
									</>
								)}
								{selectedItem ? null : (
									<CCol md={12}>
										<CButton onClick={handelReuirmentsList} className="sesREquirement">
											{' '}
											<CIcon
												style={{
													height: '18px',
													color: '#fff',
													margin: '5px 2px auto auto',
													cursor: 'pointer',
												}}
												icon={cilPlus}
												customClassName="nav-icon"
											/>
										{translation('addRequirments')}
										</CButton>
										{/* {console.log(arrayOfDivs)} */}
										{arrayOfDivs.map((ele) => (
											<SessionRequirements
												id={ele.id}
												key={ele.id}
												onChange1={(e, value) => onChangeRequirIds(e, value, ele.id)}
												value1={ele.requirementID}
												name1="requirementID"
												theSessionRequirements={theSessionRequirements}
												name2="SesRequirmentNotes"
												onChange2={(e) => onChangeRequirNotes(e, ele.id)}
												value2={ele.SesRequirmentNotes}
												icon={cilMinus}
												onClick1={() => handleRemoveSesReqs(ele.id)}
												onClickAddNewRequirement={() => setConstantAdd(2)}
												onClickAddRequirList={() => handelAddSessionRequirement()}
												ref0={ref0}
											/>
										))}
									</CCol>
								)}
							</CRow>
						</CCarouselItem>
					</CCarousel>
				)}
			</CModalBody>
			<CModalFooter>
				{editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={editSession}>
					{translation('saveChanges')}
					</CButton>
				) : !selectedItem && !editItem ? (
					<CButton onClick={addsession} className="btn-modal-save">
						{translation('add')}
					</CButton>
				) : null}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	// classification
	const classifiedFun = React.useCallback(() => {
		console.log('searchVal', searchVal);
		dispatch(
			getSessionData({
				theParams: {
					fileNumSearch: fileNumSearch ? fileNumSearch : undefined,
					stgNumSearch: stgNumSearch ? stgNumSearch : undefined,
					stgSubjectSearch: stgSubjectSearch ? stgSubjectSearch : undefined,
					placeSearch: placeSearch ? placeSearch : undefined,
					sesSearchDateFrom: sesSearchDateFrom ? sesSearchDateFrom : undefined,
					sesSearchDateTo: sesSearchDateTo ? sesSearchDateTo : undefined,
					searchVal: searchVal ? searchVal : undefined,
					id: id,
					limit: '10',
				},
			})
		);
	}, [classifiedName, fileNumSearch, stgNumSearch, stgSubjectSearch, placeSearch, sesSearchDateFrom, sesSearchDateTo, searchVal, id]);

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				if (!e.target.value) {
					setSearchedDiv(null);
				}
				classifiedFun();
			}
		},
		[classifiedName, fileNumSearch, stgNumSearch, stgSubjectSearch, placeSearch, sesSearchDateFrom, sesSearchDateTo, searchVal, id]
	);
	const handleChange = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(
				// On autofill we get a stringified value.
				typeof value === 'string' ? value.split(',') : value
			);
		},
		[classifiedName, fileNumSearch, stgNumSearch, stgSubjectSearch, placeSearch, sesSearchDateFrom, sesSearchDateTo, searchVal, id]
	);

	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setFileNumSearch('');
		setStgNumSearch('');
		setStgSubjectSearch('');
		setPlaceSearch('');
		setSesSearchDateFrom(undefined);
		setSesSearchDateTo(undefined);
		dispatch(getSessionData({ theParams: { id: id, limit: '10' } }));
	};

	const searchByChar = (e) => {
		// console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allSessions?.data);
		} else {
			const newClassifiedArr = allSessions?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};
	//change page
	const handelChangePgae = React.useCallback(
		(e, val) => {
			setId(val);
			const newVal = val == 0 ? 0 : Number(val - 1);
			// console.log("newVal: ", newVal)
			dispatch(
				getSessionData({
					theParams: {
						id: id,
						offset: newVal * 10,
						limit: '10',
					},
				})
			);
		},
		[page]
	);
	return (
		<div className="file-sessions box">
			<div className="headerFiles">
				<div className="addSes">
					<CButton onClick={showAddSession}>
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
					<CFormInput type="text" value={searchVal} onChange={(e) => searchByChar(e)} placeholder="بحث..." onKeyDown={(e) => handelSearchbtn(e)} />
				</div>
			</div>
			<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
				{classifiedName?.find((ele) => ele == translation('fileNum')) && (
					<TextField style={{ width: '30%' }} label={translation('fileNum')} value={fileNumSearch} onChange={(e) => setFileNumSearch(e.target.value)} />
				)}
				{classifiedName?.find((ele) => ele == formatMessage({id: 'stageNum'})) && (
					<TextField style={{ width: '30%' }} label={formatMessage({id: 'stageNum'})} value={stgNumSearch} onChange={(e) => setStgNumSearch(e.target.value)} />
				)}
				{classifiedName?.find((ele) => ele == formatMessage({id: 'case'})) && (
					<TextField style={{ width: '30%' }} label={formatMessage({id: 'case'})} value={stgSubjectSearch} onChange={(e) => setStgSubjectSearch(e.target.value)} />
				)}
				{classifiedName?.find((ele) => ele == formatMessage({id: 'place'})) && (
					<TextField style={{ width: '30%' }} label={formatMessage({id: 'place'})} value={placeSearch} onChange={(e) => setPlaceSearch(e.target.value)} />
				)}
				{classifiedName?.find((ele) => ele == `${formatMessage({id: 'theSession'})} ${formatMessage({id: 'date'})}`) && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({id: 'from'})}
								value={sesSearchDateFrom}
								onChange={setSesSearchDateFrom}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({id: 'to'})}
								value={sesSearchDateTo}
								onChange={setSesSearchDateTo}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
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
			{searchedDiv
				? cardSessions({ data: searchedDiv, getSession: getSession, showEditSession: showEditSession, deleteTheSession: handledeleteTheSession })
				: cardSessions({ data: allSessions?.data, getSession: getSession, showEditSession: showEditSession, deleteTheSession: handledeleteTheSession })}

			<Stack spacing={2}>
				<Pagination
					count={allSessions?.total ? Math.ceil(allSessions?.total / 10) : 1}
					page={page}
					defaultPage={1}
					siblingCount={0}
					// variant="outlined"
					shape="rounded"
					color="primary"
					onChange={handelChangePgae}
				/>
			</Stack>
			{selectedItem
				? ReturnedPopup(selectedItem)
				: !selectedItem && editItem
				? ReturnedPopup(editItem)
				: !selectedItem && !editItem && visible
				? ReturnedPopup()
				: null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheSession} /> : null}
			{constantAdd == 1 ? (
				<SessionConstantAdjudgement exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 2 ? (
				<SessionConstantRequirement exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 3 ? (
				<SessionConstantType exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 4 ? (
				<SessionConstantRoll exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 5 ? (
				<SessionConstantPlace exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 6 ? (
				<SessionConstantDesicion exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 6 ? (<AttachedPopup exitSelectModal={() => setConstantAdd('')} 
			url={`session/${attacmentId}/attachment`}
			id={attacmentId}
			setOpenAddSnack={setOpenAddSnack}
			setOpenAttachedSnack={setOpenAttachedSnack}
			setOpenLargeAttachement={setOpenLargeAttachement}
			callback={() => dispatch(getsessionAttachment(editItem?.SES_ID_PK)).then((res) => setAttachment(res.payload))} />) : null}
			{openAddSnack || openDelSnack || openDelErrorSnack || openErrorSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack || openErrorSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert
						onClose={handleCloseSnack}
						severity={`${openDelSnack || openDelErrorSnack || openErrorSnack ? 'error' : 'success'}`}
						sx={{ width: '100%' }}
					>
						{OpenEditSnack
							? translation('itemUpdated')
							: openDelSnack
							? translation('itemDeleted')
							: openDelErrorSnack
							? translation('alreadyUSed')
							: openAttachedSnack
							? formatMessage({ id: 'error' })
							: openErrorSnack
							? translation('error')
							: translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileSessions);
