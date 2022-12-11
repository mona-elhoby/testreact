import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
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
	CTable,
	CTableHead,
	CTableRow,
	CTableHeaderCell,
	CTableBody,
	CTableDataCell,
	CFormTextarea,
	CCarousel,
	CCarouselItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLayers, cilTrash, cilPencil, cilPlus, cilMinus } from '@coreui/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useIntl } from 'react-intl';

import AttachedHeadTable from '../../../features/attachedFileHaed';
import { ClientDiv, ClientAttrDiv } from './caseClient';
import { getCourtsName } from '../../../store/reducers/theConstants';
import { dataStage } from './stageCard';
import './fileCase.css';
import { StageConstantJudge, StageConstantKind, StageConstantOffice, StageConstantStatus, StageConstantResult, StageConstantType } from './stageConstant';
import { getStageData, getStageById, getAllStages, getStageAttachmentData, getStageAttachment } from '../../../store/reducers/stage';
import { addNewStage, updateStage, deleteStage, deleteAttachment } from '../../../store/reducers/stage';
import { getWarningsData } from '../../../store/reducers/warnings';
import { getEmployeeData } from '../../../store/reducers/emlpoyee';
import DeletePopup from '../../../features/delete';
import { getStageType, getStageStatus, getStageResult, getStageOffice, getStageKind, getStageJudge } from '../../../store/reducers/constants/stage';
import { getAgentAttribute } from '../../../store/reducers/theConstants';
import { HandleAgentAttribute } from './stageConstant';
import { getCaseById } from '../../../store/reducers/file-management';
import AttachedPopup from '../../../features/attachment';
import translation from '../../../i18n/translate';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const FileCases = () => {
	const [stages, setStages] = useState([]);
	const [item, setItem] = useState(null);
	const [editItem, setEditItem] = useState(null);
	const [visible, setVisible] = useState(false);
	const [attachment, setAttachment] = useState([]);
	const [stgAttached, setStgAttached] = useState('');
	const [searchVal, setSearchVal] = useState('');
	const [searchedDiv, setSearchedDiv] = useState(null);
	const dispatch = useDispatch();
	const { theAllStages } = useSelector((state) => state.stage);
	const { theCourtsNames } = useSelector((state) => state.theConstants);
	// const { selectedCase } = useSelector((state) => state.fileManagement);
	const { allEmployee } = useSelector((state) => state.employee);
	const { allWarnings } = useSelector((state) => state.warning);
	const { theStageJudgeCompo, theStageOfficeCompo, theStageKindCompo, theStageResultCompo, theStageStatusCompo, theStageTypeCompo } = useSelector(
		(state) => state.StageConstants
	);
	const { theAttributes } = useSelector((state) => state.theConstants);

	const { formatMessage } = useIntl();
	const { id } = useParams();
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [fileSource, setFileSource] = useState([]);
	const [mainCas, setMainCas] = useState('');
	const [ants, setAnts] = useState(null);
	const [stgLinks, setStgLinks] = useState('');
	const [notes, setNotes] = useState('');
	const [notesEn, setNotesEn] = useState('');
	const [casNum, setCasNum] = useState('');
	const [casYear, setCasYear] = useState('');
	const [regDate, setRegDate] = useState('');
	const [stgKind, setStgKind] = useState('');
	const [ofcName, setOfcName] = useState('');
	const [infNum, setInfNum] = useState(0);
	const [stgType, setStgType] = useState('');
	const [court, setCourt] = useState('');
	const [courtBranch, setCourtBranch] = useState('');
	const [theJUD, setTheJUD] = useState('');
	const [theStgFollower, setTheStgFollower] = useState('');
	const [casStatus, setCasStatus] = useState('');
	const [casResult, setCasResult] = useState('');
	const [linkStage, setLinkStage] = useState([]);
	const [inrNumber, setInrNumber] = useState('');
	const [checkedMainCase, setCheckedMainCase] = useState(false);
	const [checkedLinkStage, setCheckedLinkStage] = useState(false);
	const [theLawerClient, setTheLawerClient] = useState('');
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [OpenAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [OpenEditSnack, setOpenEditSnack] = useState(false);
	const [error, setError] = useState(null);
	const [page, setId] = useState(1);
	const [divId, setDivId] = useState(Date.now());
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [divAntId, setDivAntId] = useState(Date.now());
	const [arrayOfAntsDivs, setArrayOfAntsDivs] = useState([]);
	const [addConstantId, setAddConstantId] = useState('');
	const [selectedCase, setSelectedCase] = useState('');
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const agentRef = useRef();
	const antRef = useRef();

	useEffect(() => {
		dispatch(getAllStages({ theparams: { id: id, limit: '50' } }));
		dispatch(getCourtsName());
		dispatch(getEmployeeData());
		dispatch(getStageType());
		dispatch(getStageStatus());
		dispatch(getStageResult());
		dispatch(getStageOffice());
		dispatch(getStageKind());
		dispatch(getStageJudge());
		dispatch(getWarningsData({ theParams: { id: id } }));
		dispatch(getAgentAttribute());
		dispatch(getCaseById(id)).then((res) => setSelectedCase(res.payload));
	}, []);

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const exitSelectModal = () => {
		setVisible(false);
		setItem(null);
		setEditItem(null);
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
	};

	const handleChangeCaseAttend = (event) => {
		const {
			target: { value },
		} = event;
		setFileSource(typeof value === 'string' ? value.split(',') : value);
	};
	const handleChangeLinkStages = (event) => {
		const {
			target: { value },
		} = event;
		setLinkStage(typeof value === 'string' ? value.split(',') : value);
	};
	// material ui style for dropdown many select
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
	const theme = useTheme();
	function getStyles(name, personName, theme) {
		return {
			fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
		};
	}
	const generatYears = (startYear) => {
		var currentYear = new Date().getFullYear(),
			years = [];
		startYear = startYear || 1980;
		while (startYear <= currentYear) {
			years.push(startYear++);
		}
		return years;
	};
	const selectYears = generatYears(new Date().getFullYear() - 15);

	const onChangeClients = (e, id) => {
		let newArr = arrayOfDivs;
		newArr.find((item) => item.id == id)['clients'] = e.target.value;
		setArrayOfDivs(newArr);
	};

	const onChangeClientsAttr = (value, id) => {
		console.log(agentRef.current);
		let newArr = arrayOfDivs;
		newArr.find((item) => item.id == id)['clientsAttr'] = value;
		setArrayOfDivs(newArr);
	};

	const onChangeSecondParts = (e, id) => {
		console.log(antRef.current);
		let newArr = arrayOfAntsDivs;
		newArr.find((item) => item.id == id)['secondAttr'] = e.target.value;
		setArrayOfAntsDivs(newArr);
	};

	const onChangeSecondPartsAttr = (value, id) => {
		let newArr = arrayOfAntsDivs;
		newArr.find((item) => item.id == id)['secondPartAttr'] = value;
		setArrayOfAntsDivs(newArr);
	};

	const onChangeSecondPartsLawyer = (e, id) => {
		let newArr = arrayOfAntsDivs;
		newArr.find((item) => item.id == id)['theLawerClient'] = e.target.value;
		setArrayOfAntsDivs(newArr);
	};

	//add more agents
	const handelCleintsList = () => {
		setArrayOfDivs([...arrayOfDivs, { id: divId, clients: '', clientsAttr: '' }]);
		setDivId(divId + 1);
	};
	const handelRemoveItem = (id) => {
		setArrayOfDivs(arrayOfDivs.filter((item) => item.id != id));
	};
	//add more second part
	const handelSecondAttrList = () => {
		setArrayOfAntsDivs([...arrayOfAntsDivs, { id: divAntId, secondAttr: '', secondPartAttr: '', theLawerClient: '' }]);
		setDivAntId(divAntId + 1);
	};
	const handelRemoveAntDivItem = (id) => {
		setArrayOfAntsDivs(arrayOfAntsDivs.filter((item) => item.id != id));
	};

	const handleGetCaseById = (caseId) => {
		// console.log(caseId)
		setEditItem(null);
		setVisible(!visible);
		dispatch(getStageById(caseId)).then((res) => setItem(res.payload));
		dispatch(getStageAttachment(caseId)).then((res) => setAttachment(res.payload));
	};
	const emptyInputsVals = () => {
		setEditItem('');
		setMainCas('');
		setFileSource([]);
		setAnts('');
		setStgLinks('');
		setNotes('');
		setNotesEn('')
		setCasNum('');
		setCasYear('');
		setRegDate('');
		setStgKind('');
		setOfcName('');
		setInfNum('');
		setStgType('');
		setCourt('');
		setCourtBranch('');
		setTheJUD('');
		setTheStgFollower('');
		setCasStatus('');
		setCasResult('');
		setInrNumber('');
		setLinkStage([]);
		setCheckedLinkStage(false);
	};
	const addModalOpen = () => {
		emptyInputsVals();
		setItem(null);
		setEditItem(null);
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenAttachedSnack(false);
		setVisible(!visible);
		setArrayOfDivs(
			selectedCase?.clients
				?.filter((ele, i) => ele?.CLI_TYPE_ID_PK == 2)
				.map((ele) => ({ id: ele.CLI_ID_PK + 1, clients: ele?.CLI_NAME, clientsAttr: '' }))
		);
		setArrayOfAntsDivs(
			selectedCase?.clients
				?.filter((ele, i) => ele?.CLI_TYPE_ID_PK == 7)
				.map((ele) => ({ id: ele.CLI_ID_PK + 1, secondAttr: ele?.CLI_NAME, secondPartAttr: '', theLawerClient }))
		);
		console.log(arrayOfDivs, arrayOfAntsDivs, selectedCase);
	};

	const addCase = () => {
		console.log(arrayOfDivs, arrayOfAntsDivs, selectedCase?.clients);
		dispatch(
			addNewStage({
				CAS_ID_PK: Number(id),
				OFC_ID_PK: ofcName ? theStageOfficeCompo?.find((ele) => ele.OFC_NAME || ele.OFC_NAME_EN == ofcName)?.OFC_ID_PK : undefined,
				STG_TYPE_ID_PK: stgKind ? theStageTypeCompo?.find((ele) => ele.STG_TYPE_NAME || ele.STG_TYPE_NAME_EN == stgKind)?.STG_TYPE_ID_PK : undefined,
				STG_NOTES: notes ? notes : undefined,
				STG_NOTES_EN: notesEn ? notesEn : undefined,
				STG_NUMBER: casNum ? casNum : undefined,
				STG_DATE: regDate ? regDate : undefined,
				STG_RESULT_ID_PK: casResult ? theStageResultCompo?.find((ele) => ele.STG_RESULT_NAME || ele.STG_RESULT_NAME_EN == casResult)?.STG_RESULT_ID_PK : undefined,
				STG_JUDGE_ID_PK: theJUD ? theStageJudgeCompo?.find((ele) => ele.STG_JUDGE_NAME || ele.STG_JUDGE_NAME_EN == theJUD)?.STG_JUDGE_ID_PK : undefined,
				STG_YEAR: casYear ? casYear : undefined,
				COU_ID_PK: court ? theCourtsNames?.find((ele) => ele.COU_NAME || ele.COU_NAME_EN == court)?.COU_ID_PK : undefined,
				STG_KIND_ID_PK: stgType ? theStageKindCompo?.find((ele) => ele.STG_KIND_NAME || ele.STG_KIND_NAME_EN == stgType)?.STG_KIND_ID_PK : undefined,
				STG_STATUS_ID_PK: casStatus ? theStageStatusCompo?.find((ele) => ele.STG_STATUS_NAME || ele.STG_STATUS_NAME_EN == casStatus)?.STG_STATUS_ID_PK : undefined,
				EMP_ID_PK: theStgFollower ? theStgFollower : undefined,
				INR_ID_PK: inrNumber ? inrNumber : undefined,
				PARENT_ID: mainCas ? theAllStages.data?.find((ele) => ele.STG_NUMBER == mainCas)?.STG_ID_PK : undefined,
				AGENTS:
					arrayOfDivs?.length > 0
						? arrayOfDivs.map((ele) => ({
								CLI_ID_PK: selectedCase?.clients?.find((ele2) => ele2?.CLI_TYPE_ID_PK == 2 && ele2.CLI_NAME || ele2.CLI_NAME_ENGLISH == ele.clients)?.CLI_ID_PK,
								ATTRBUIT_ID_PK: ele.clientsAttr
									? theAttributes.find((item) => item.AGE_ATTRBUIT_NAME || item.AGE_ATTRBUIT_NAME_EN == ele.clientsAttr)?.AGE_ATTRBUIT_ID_PK
									: undefined,
						  }))
						: undefined,
				ANTS:
					arrayOfAntsDivs?.length > 0
						? arrayOfAntsDivs.map((ele) => ({
								CLI_ID_PK: selectedCase?.clients?.find((ele2) => ele2?.CLI_TYPE_ID_PK == 7 && ele2.CLI_NAME || ele2.CLI_NAME_ENGLISH == ele.secondAttr)?.CLI_ID_PK,
								ATTRBUIT_ID_PK: ele.secondPartAttr
									? theAttributes.find((item) => item.AGE_ATTRBUIT_NAME || item.AGE_ATTRBUIT_NAME_EN == ele.secondPartAttr)?.AGE_ATTRBUIT_ID_PK
									: undefined,
								// ANT_LAWYER: ele.theLawerClient ? ele.theLawerClient : undefined,
						  }))
						: undefined,
				SOURCE: fileSource
					? fileSource.map(
						(item) =>
						selectedCase?.clients?.find((ele) => ele.CLI_TYPE_ID_PK == 1 || (ele.CLI_TYPE_ID_PK == 2 && ele.CLI_NAME == item))
							?.CLI_ID_PK
					 )
					: undefined,
				LINKS: linkStage.length > 0 ? linkStage.map((item) => theAllStages.data?.find((ele) => ele.STG_NUMBER == item)?.STG_ID_PK) : undefined,
			})
		).then((res) => {
			console.log(res?.payload);
			if (res?.payload?.code) {
				setError(res?.payload);
			} else {
				setVisible(false);
				setOpenAddSnack(true);
				emptyInputsVals();
				dispatch(getAllStages({ theparams: { id: id, limit: '50' } }));
			}
		});
	};
 //open update popup
	const editCase = (editId) => {
		console.log('editId: ', editId);
		setItem(null);
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenAttachedSnack(false);
		dispatch(getStageAttachment(editId)).then((res) => setAttachment(res.payload));
		dispatch(getStageById(editId))
			.then((res) => {
				setEditItem(res.payload);
				// setFileSource(res.payload?.FIL_SOURCE_NAME ? res.payload?.FIL_SOURCE_NAME : []);
				setFileSource(res.payload?.stageSource?.map((ele) => document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele.CLI_NAME));
				setArrayOfDivs(
					res.payload?.clients
						?.filter((ele) => ele.CLI_TYPE_ID_PK == 2)
						?.map((ele) => ({ id: ele.CLI_ID_PK, clients: document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH.slice(0, ele.CLI_NAME_ENGLISH.indexOf('\n')) : ele.CLI_NAME.slice(0, ele.CLI_NAME.indexOf('\n')), clientsAttr: ele.AGE_ATTRBUIT_NAME }))
				);
				setArrayOfAntsDivs(
					res.payload?.clients
						?.filter((ele) => ele.CLI_TYPE_ID_PK == 7)
						?.map((ele) => ({
							id: ele.CLI_ID_PK,
							secondAttr: document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH.slice(0, ele.CLI_NAME.indexOf('\n')) : ele.CLI_NAME.slice(0, ele.CLI_NAME.indexOf('\n')),
							secondPartAttr: document.body.getAttribute('dir') == 'ltr' && ele.AGE_ATTRBUIT_NAME_EN ? ele.AGE_ATTRBUIT_NAME_EN : ele.AGE_ATTRBUIT_NAME,
							theLawerClient: ele.ANT_LAWYER,
						}))
				);
				setCheckedLinkStage(res.payload?.linkStages.length > 0 ? true : false);
				setLinkStage(res.payload?.linkStages.length > 0 ? res.payload?.linkStages?.map((ele) => ele.STG_NUMBER.split('/').reverse().join('/')) : []);
				setNotes(res.payload?.STG_NOTES ? res.payload?.STG_NOTES : '');
				setNotesEn(res.payload?.STG_NOTES_EN ? res.payload?.STG_NOTES_EN : '')
				setCasNum(res.payload?.CAS_NUMBER ? res.payload?.CAS_NUMBER : '');
				setCasYear(res.payload?.STG_YEAR ? res.payload?.STG_YEAR : '');
				setRegDate(res.payload?.CAS_OPEN_DATE? new Date(res.payload?.CAS_OPEN_DATE).toISOString().split('T')[0] : '');
				setStgKind(res.payload?.STG_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? res.payload?.STG_TYPE_NAME_EN ? res.payload?.STG_TYPE_NAME : res.payload?.STG_TYPE_NAME : '');
				setOfcName(res.payload?.OFC_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? res.payload?.OFC_NAME_EN : res.payload?.OFC_NAME ? res.payload?.OFC_NAME : '');
				setStgType(res.payload?.STG_KIND_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? res.payload?.STG_KIND_NAME_EN : res.payload?.STG_KIND_NAME ? res.payload?.STG_KIND_NAME : '');
				setCourt(document.body.getAttribute('dir') == 'ltr' && res.payload?.COU_NAME_EN ? res.payload?.COU_NAME_EN : res.payload?.COU_NAME ? res.payload?.COU_NAME : '');
				setCourtBranch(document.body.getAttribute('dir') == 'ltr' && res.payload?.COU_NAME_EN ? res.payload?.COU_NAME_EN : res.payload?.COU_NAME ? res.payload?.COU_NAME : '');
				setTheJUD(document.body.getAttribute('dir') == 'ltr' && res.payload?.STG_JUDGE_NAME_EN ? res.payload?.STG_JUDGE_NAME_EN : res.payload?.STG_JUDGE_NAME ? res.payload?.STG_JUDGE_NAME : '');
				setTheStgFollower(res.payload?.EMP_ID_PK ? res.payload?.EMP_ID_PK : '');
				setCasStatus(document.body.getAttribute('dir') == 'ltr' && res.payload?.FIL_STATUS_NAME_EN ? res.payload?.FIL_STATUS_NAME_EN : res.payload?.FIL_STATUS_NAME ? res.payload?.FIL_STATUS_NAME : '');
				setCasResult(document.body.getAttribute('dir') == 'ltr' && res.payload?.STG_RESULT_NAME_EN ? res.payload?.STG_RESULT_NAME_EN : res.payload?.STG_RESULT_NAME ? res.payload?.STG_RESULT_NAME : '');
				setInrNumber(res.payload?.INR_ID_PK ? res.payload?.INR_ID_PK : '');
				setCasYear(res.payload?.STG_YEAR ? res.payload?.STG_YEAR : '');
				setCheckedMainCase(res.payload?.PARENT_NAME ? true : false);
				setMainCas(res.payload?.PARENT_NAME ? res.payload?.PARENT_NAME : '');
			})
			.then(() => setVisible(!visible));
	};

	//update case
	const saveUpdate = () => {
		dispatch(
			updateStage({
				data: {
					CAS_ID_PK: Number(id),
					OFC_ID_PK: ofcName ? theStageOfficeCompo?.find((ele) => ele.OFC_NAME || ele.OFC_NAME_EN == ofcName)?.OFC_ID_PK : undefined,
					STG_TYPE_ID_PK: stgKind ? theStageTypeCompo?.find((ele) => ele.STG_TYPE_NAME || ele.STG_TYPE_NAME_EN == stgKind)?.STG_TYPE_ID_PK : undefined,
					STG_NOTES: notes ? notes : undefined,
					STG_NOTES_EN: notesEn ? notesEn : undefined,
					STG_NUMBER: casNum ? casNum : undefined,
					STG_DATE: regDate ? regDate : undefined,
					STG_RESULT_ID_PK: casResult ? theStageResultCompo?.find((ele) => ele.STG_RESULT_NAME || ele.STG_RESULT_NAME_EN == casResult)?.STG_RESULT_ID_PK : undefined,
					STG_JUDGE_ID_PK: theJUD ? theStageJudgeCompo?.find((ele) => ele.STG_JUDGE_NAME || ele.STG_JUDGE_NAME_EN == theJUD)?.STG_JUDGE_ID_PK : undefined,
					STG_YEAR: casYear ? casYear : undefined,
					COU_ID_PK: court ? theCourtsNames?.find((ele) => ele.COU_NAME || ele.COU_NAME_EN == court)?.COU_ID_PK : undefined,
					STG_KIND_ID_PK: stgType ? theStageKindCompo?.find((ele) => ele.STG_KIND_NAME || ele.STG_KIND_NAME_EN == stgType)?.STG_KIND_ID_PK : undefined,
					STG_STATUS_ID_PK: casStatus ? theStageStatusCompo?.find((ele) => ele.STG_STATUS_NAME || ele.STG_STATUS_NAME_EN == casStatus)?.STG_STATUS_ID_PK : undefined,
					EMP_ID_PK: theStgFollower ? theStgFollower : undefined,
					INR_ID_PK: inrNumber ? inrNumber : undefined,
					PARENT_ID: mainCas ? theAllStages.data?.find((ele) => ele.STG_NUMBER == mainCas)?.STG_ID_PK : undefined,
					AGENTS:
						arrayOfDivs.length > 0
							? arrayOfDivs.map((ele) => ({
									CLI_ID_PK: selectedCase?.clients?.find((ele2) => ele2?.CLI_TYPE_ID_PK == 2 && ele2.CLI_NAME || ele2.CLI_NAME_ENGLISH == ele.clients)?.CLI_ID_PK,
									ATTRBUIT_ID_PK: ele.clientsAttr
										? theAttributes.find((item) => item.AGE_ATTRBUIT_NAME || item.AGE_ATTRBUIT_NAME_EN  == ele.clientsAttr)?.AGE_ATTRBUIT_ID_PK
										: undefined,
							  }))
							: undefined,
					ANTS:
						arrayOfAntsDivs.length > 0
							? arrayOfAntsDivs.map((ele) => ({
									CLI_ID_PK: selectedCase?.clients?.find((ele2) => ele2?.CLI_TYPE_ID_PK == 7 && ele2.CLI_NAME || ele2.CLI_NAME_ENGLISH == ele.secondAttr)?.CLI_ID_PK,
									ATTRBUIT_ID_PK: ele.secondPartAttr
										? theAttributes.find((item) => item.AGE_ATTRBUIT_NAME || item.AGE_ATTRBUIT_NAME_EN  == ele.secondPartAttr)?.AGE_ATTRBUIT_ID_PK
										: undefined,
									ANT_LAWYER: ele.theLawerClient ? ele.theLawerClient : undefined,
							  }))
							: undefined,
					SOURCE: fileSource
						? fileSource.map(
								(item) =>
									selectedCase?.clients?.find((ele) => ele.CLI_TYPE_ID_PK == 1 || (ele.CLI_TYPE_ID_PK == 2 && ele.CLI_NAME == item))
										?.CLI_ID_PK
						  )
						: undefined,
					LINKS: linkStage.length > 0 ? linkStage.map((item) => theAllStages.data?.find((ele) => ele.STG_NUMBER == item)?.STG_ID_PK) : undefined,
				},
				id: editItem.STG_ID_PK,
			})
		).then((res) => {
			
			console.log(res?.payload);
			if (res?.payload?.code) {
				setError(res?.payload);
			} else {
			setOpenAddSnack(true);
			setVisible(false);
			setOpenEditSnack(true);
			emptyInputsVals();
			dispatch(getAllStages({ theparams: { id: id, limit: '50' } }));
		}});
	};
	const handleDeleteItem = (id) => {
		setDeletedItemId(id);
		setVisibleDeleteModal(true);
	};
	// delete Stage
	const deleteTheStage = () => {
		dispatch(deleteStage({ id: deletedItemId, casId: id })).then((res) => {
			console.log(res.payload);
			if (res?.payload?.res?.status == 200) {
				setVisibleDeleteModal(false);
				setOpenDelSnack(true);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
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
	const handelAddAttachment = (id) => {
		// console.log(id);
		setAddConstantId(8);
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
				dispatch(getStageAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className={`case-modal ${document.body.getAttribute('dir') == 'ltr' ? 'enTextLeftPopup' : null}`}>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilLayers} customClassName="nav-icon" />
					{editItem || item ? <span>{translation('fileNum')} {item?.CAS_NUMBER || editItem?.CAS_NUMBER}</span> : <span>{translation('add')} </span>}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CCarousel controls interval={false} wrap={false} onSlide={handelNextSlide}>
					<CCarouselItem>
						<CRow>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('evaluatorsCase')}</CFormLabel>
								{item ? (
									<p>{item.stageSource.length > 0 ? item.stageSource.map(ele => document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele.CLI_NAME) : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Select
											multiple
											displayEmpty
											value={fileSource}
											onChange={handleChangeCaseAttend}
											input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
											renderValue={(selected) => (
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
													{typeof selected == 'object'
														? selected?.map((value) => <Chip key={Math.random() + value} label={value} />)
														: []}
												</Box>
											)}
											MenuProps={MenuProps}
											inputProps={{ 'aria-label': 'Without label' }}
										>
											{selectedCase?.clients
												?.filter((ele) => ele.CLI_TYPE_ID_PK == 1 || ele.CLI_TYPE_ID_PK == 2)
												.map((ele, i) => {
													return (
														<MenuItem key={Math.random() + i} value={document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele?.CLI_NAME}>
															{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH ? ele.CLI_NAME_ENGLISH : ele?.CLI_NAME}
														</MenuItem>
													);
												})}
										</Select>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('basicCase')}</CFormLabel>
								{item ? (
									<p>{item?.PARENT_NAME ? item?.PARENT_NAME : translation('notFound')}</p>
								) : (
									<div>
										<Checkbox
											{...label}
											checked={checkedMainCase}
											sx={{
												color: '#4527a0',
												'&.Mui-checked': {
													color: '#5e35b1',
												},
											}}
											onChange={(e) => setCheckedMainCase(e.target.checked)}
										/>
										<FormControl sx={{ m: 1, minWidth: `calc(100% - 70px)` }} disabled={!checkedMainCase}>
											<Select
												defaultValue={mainCas}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												onChange={(e) => setMainCas(e.target.value)}
											>
												{theAllStages.data?.map((ele) => (
													<MenuItem value={ele.STG_NUMBER} key={Math.random() + ele.STG_NUMBER}>
														{ele.STG_NUMBER}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('issueOfLiaison')}</CFormLabel>
								{item ? (
									item?.linkStages?.length > 0 ? (
										item?.linkStages?.map((link, index) => {
											return (
												<Link key={index} to="/link.STG_ID_PK_LINK">
													{link.STG_NUMBER ? link.STG_NUMBER : translation('notFound')}
												</Link>
											);
										})
									) : (
										<p> {translation('notFound')} </p>
									)
								) : (
									<div>
										<Checkbox
											{...label}
											checked={checkedLinkStage}
											sx={{
												color: '#4527a0',
												'&.Mui-checked': {
													color: '#5e35b1',
												},
											}}
											onChange={(e) => setCheckedLinkStage(e.target.checked)}
										/>
										<FormControl sx={{ m: 1, minWidth: `calc(100% - 70px)` }} disabled={!checkedLinkStage}>
											<Select
												multiple
												displayEmpty
												value={linkStage}
												onChange={handleChangeLinkStages}
												input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
												renderValue={(selected) => (
													<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
														{typeof selected == 'object'
															? selected?.map((value) => <Chip key={Math.random() + value} label={value} />)
															: []}
													</Box>
												)}
												MenuProps={MenuProps}
												inputProps={{ 'aria-label': 'Without label' }}
											>
												{theAllStages.data?.map((ele) => (
													<MenuItem value={ele.STG_NUMBER} key={Math.random() + ele.STG_NUMBER}>
														{ele.STG_NUMBER}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								)}
							</CCol>
							<CCol md={6}>
								<CRow>
									<CCol xs={6}>
										<CFormLabel htmlFor="inputEmail4">{translation('stageNum')}</CFormLabel>
										{item ? (
											<p>{item?.CAS_NUMBER ? item?.CAS_NUMBER : translation('notFound')}</p>
										) : (
											<CFormInput
												type="text"
												value={casNum}
												onChange={(e) => setCasNum(e.target.value)}
												required
												className={`${!casNum ? 'is-invalid' : null}`}
											/>
										)}
									</CCol>
									<CCol xs={6}>
										<CFormLabel htmlFor="inputEmail4"> {translation('theYear')}</CFormLabel>
										{item ? (
											<p>{item?.STG_YEAR ? item?.STG_YEAR : translation('notFound')}</p>
										) : (
											<FormControl fullWidth>
												<Select
													value={casYear}
													displayEmpty
													inputProps={{ 'aria-label': 'Without label' }}
													onChange={(e) => setCasYear(e.target.value)}
													error={!casYear ? true : false}
												>
													{selectYears?.map((ele) => (
														<MenuItem value={ele} key={Math.random() + ele}>
															{ele}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										)}
									</CCol>
								</CRow>
							</CCol>
							<CCol sm={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('registerDate')}</CFormLabel>
								{item ? (
									<p>{item?.CAS_OPEN_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(item.CAS_OPEN_DATE)) : null}</p>
								) : (
									<CFormInput type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} />
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setAddConstantId(2)}>
									{translation('stage')}
								</CFormLabel>
								{item ? (
									<p>{ document.body.getAttribute('dir') == 'ltr' && item.STG_KIND_NAME_EN ? item.STG_KIND_NAME_EN : item.STG_KIND_NAME ? item.STG_KIND_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={stgType}
											onChange={(e, value) => setStgType(value)}
											options={theStageKindCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.STG_KIND_NAME_EN ? option.STG_KIND_NAME_EN : option.STG_KIND_NAME)}
											renderInput={(params) => <TextField {...params} error={stgType?.length > 0 ? false : true} />}
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
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setAddConstantId(3)}>
									{translation('office')}
								</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item.OFC_NAME_EN ? item.OFC_NAME_EN : item.OFC_NAME ? item.OFC_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={ofcName}
											onChange={(e, value) => setOfcName(value)}
											options={theStageOfficeCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.OFC_NAME_EN ? option.OFC_NAME_EN : option.OFC_NAME)}
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
							<CCol md={6} sm={12}>
								<CFormLabel htmlFor="inputEmail4">{translation('warningNum')}</CFormLabel>
								{item ? (
									<p>{item.INR_NUMBER ? item.INR_NUMBER : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Select
											defaultValue={inrNumber}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setInrNumber(e.target.value)}
										>
											{allWarnings.data?.map((ele) => (
												<MenuItem value={ele.WRN_ID_PK} key={Math.random() + ele.WRN_ID_PK}>
													{ele.WRN_NUMBER}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CCol>
							<CCol md={6} sm={12}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setAddConstantId(6)}>
									{translation('caseType')}
								</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item.STG_TYPE_NAME_EN ? item.STG_TYPE_NAME_EN : item.STG_TYPE_NAME ? item.STG_TYPE_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={stgKind}
											onChange={(e, value) => setStgKind(value)}
											options={theStageTypeCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.STG_TYPE_NAME_EN ? option.STG_TYPE_NAME_EN : option.STG_TYPE_NAME)}
											renderInput={(params) => <TextField {...params} error={stgKind?.length > 0 ? false : true} />}
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
							<CCol md={6} sm={12}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setAddConstantId(4)}>
									{translation('caseStatus')}
								</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item.STG_STATUS_NAME_EN ? item.STG_STATUS_NAME_EN :  item.STG_STATUS_NAME ? item.STG_STATUS_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={casStatus}
											onChange={(e, value) => setCasStatus(value)}
											options={theStageStatusCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.STG_STATUS_NAME_EN ? option.STG_STATUS_NAME_EN :  option.STG_STATUS_NAME)}
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
						</CRow>
					</CCarouselItem>
					<CCarouselItem>
						<CRow>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> {translation('court')}</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item?.COU_NAME_EN ? item?.COU_NAME_EN : item.COU_NAME ? item.COU_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth sx={{ minWidth: '100%' }}>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={court}
											onChange={(e, value) => setCourt(value)}
											options={theCourtsNames?.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.COU_NAME_EN ? option?.COU_NAME_EN : option?.COU_NAME)}
											getOptionLabel={(option) => option}
											renderInput={(params) => <TextField {...params} />}
										/>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('courtBranch')}</CFormLabel>
								{item ? (
									<p>{item.COU_NAME ? item.COU_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Select
											defaultValue={courtBranch}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setCourtBranch(e.target.value)}
										>
											{/* {allStages?.map((ele) => (
												<MenuItem value={ele.CAS_NUMBER} key={Math.random() + ele.CAS_NUMBER}>
													{ele.CAS_NUMBER}
												</MenuItem>
											))} */}
										</Select>
									</FormControl>
								)}
							</CCol>
							<CCol md={6} sm={12}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setAddConstantId(1)}>
									{translation('judg')}
								</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item?.STG_JUDGE_NAME_EN ? item?.STG_JUDGE_NAME_EN : item.STG_JUDGE_NAME ? item.STG_JUDGE_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={theJUD}
											onChange={(e, value) => setTheJUD(value)}
											options={theStageJudgeCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.STG_JUDGE_NAME_EN ? option?.STG_JUDGE_NAME_EN : option.STG_JUDGE_NAME)}
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
							<CCol md={6} sm={12}>
								<CFormLabel htmlFor="inputEmail4"> {translation('caseFollower')}</CFormLabel>
								{item ? (
									<p>{item.EMP_NAME ? item.EMP_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Select
											defaultValue={theStgFollower}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setTheStgFollower(e.target.value)}
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
							<CCol md={6} sm={12}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setAddConstantId(5)}>
									{translation('caseResult')}
								</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item.STG_RESULT_NAME_EN ? item.STG_RESULT_NAME_EN : item.STG_RESULT_NAME ? item.STG_RESULT_NAME : translation('notFound')}</p>
								) : (
									<FormControl fullWidth>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={casResult}
											onChange={(e, value) => setCasResult(value)}
											options={theStageResultCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.STG_RESULT_NAME_EN ? option.STG_RESULT_NAME_EN : option.STG_RESULT_NAME)}
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
								<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
								{item ? (
									<p>{item.STG_NOTES ? item.STG_NOTES : translation('notFound')}</p>
								) : (
									<CFormTextarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
								)}
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> {translation('notesEn')}</CFormLabel>
								{item ? (
									<p>{item.STG_NOTES_EN ? item.STG_NOTES_EN : translation('notFound')}</p>
								) : (
									<CFormTextarea rows={4} value={notesEn} onChange={(e) => setNotesEn(e.target.value)} />
								)}
							</CCol>
							<CCol md={12}>
								{item || editItem ? <CFormLabel style={{cursor: 'pointer'}}> {translation('attachments')} 
							{editItem?.STG_ID_PK ? (
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editItem?.STG_ID_PK)}
								/>
							) : null}</CFormLabel> : null}
								{item?._FILE > 0 || editItem?._FILE > 0 ? (
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
																	getStageAttachmentData({
																		id: item?.STG_ID_PK,
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
														{editItem?.STG_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editItem?.STG_ID_PK)}
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
										) : !item && !editItem ? null : (
											<p>{translation('notFound')}</p>
										) 
									}
							</CCol>
							<CCol sm={12}>
								<hr />
								{item && <CFormLabel htmlFor="inputEmail4">{translation('agents')}</CFormLabel>}
								{item ? (
									item?.clients?.map((client, index) => client.CLI_TYPE_NAME == 'موكل' && <p key={index}>{document.body.getAttribute('dir') == 'ltr' && client.CLI_NAME_ENGLISH ? client.CLI_NAME_ENGLISH : client.CLI_NAME}</p>)
								) : (
									<div>
										<div>
											{translation('addClient')}
											<CIcon
												style={{
													height: '18px',
													color: '#ff3547',
													margin: '5px 2px auto auto',
													cursor: 'pointer',
												}}
												icon={cilPlus}
												customClassName="nav-icon"
												onClick={handelCleintsList}
											/>
										</div>
										{arrayOfDivs?.map((ele) => (
											<div id={ele.id} key={ele.id}>
												<ClientDiv
													defaultValue={ele.clients}
													onChange={(e) => onChangeClients(e, ele.id)}
													defaultValue2={ele.clientsAttr}
													onChange2={(value) => onChangeClientsAttr(value, ele.id)}
													icon={cilMinus}
													onClick={() => handelRemoveItem(ele.id)}
													name1="clients"
													name2="clientsAttr"
													stage={true}
													onClickAdd={() => setAddConstantId(7)}
													agentRef={agentRef}
												/>
											</div>
										))}
									</div>
								)}
							</CCol>
							<CCol sm={12}>
								<hr />
								{item && <CFormLabel htmlFor="inputEmail4">{translation('secondAttr')}</CFormLabel>}
								{item?.clients ? (
									item?.clients?.map((client, index) =>
										client?.CLI_TYPE_NAME == 'خصم' ? (
											<div key={index} style={{ display: 'flex' }}>
												<p style={{ marginLeft: '15px' }}>{document.body.getAttribute('dir') == 'ltr' && client?.CLI_NAME_ENGLISH ? client?.CLI_NAME_ENGLISH : client?.CLI_NAME}</p>
												<p>{client.ANT_LAWYER ? client.ANT_LAWYER : translation('notFound')}</p>
											</div>
										) : null
									)
								) : (
									<div>
										<div>
											{translation('addAnt')}
											<CIcon
												style={{
													height: '18px',
													color: '#ff3547',
													margin: '5px 2px auto auto',
													cursor: 'pointer',
												}}
												icon={cilPlus}
												customClassName="nav-icon"
												onClick={handelSecondAttrList}
											/>
										</div>
										{arrayOfAntsDivs?.map((ele) => (
											<div id={ele.id} key={ele.id}>
												<ClientAttrDiv
													defaultValue1={ele.secondAttr}
													onChange1={(e) => onChangeSecondParts(e, ele.id)}
													defaultValue2={ele.secondPartAttr}
													onChange2={(value) => onChangeSecondPartsAttr(value, ele.id)}
													defaultValue3={ele.theLawerClient}
													onChange3={(e) => onChangeSecondPartsLawyer(e, ele.id)}
													icon={cilMinus}
													onClick={() => handelRemoveAntDivItem(ele.id)}
													name1="secondAttr"
													name2="secondPartAttr"
													name3="theLawerClient"
													stage={true}
													onClickAdd={() => setAddConstantId(7)}
													antRef={antRef}
												/>
											</div>
										))}
									</div>
								)}
							</CCol>
						</CRow>
					</CCarouselItem>
				</CCarousel>
			</CModalBody>
			<CModalFooter>
				{!item & !editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={addCase}>
					{translation('save')}
					</CButton>
				) : editItem ? (
					<CButton className="btn-modal-save" color="primary" onClick={saveUpdate}>
					{translation('saveChanges')}
					</CButton>
				) : null}
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
			setSearchedDiv(theAllStages?.data);
		} else {
			const newClassifiedArr = theAllStages?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele)?.find((ele2) =>
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
			dispatch(
				getAllStages({
					theparams: {
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
		<div className="file-cases box">
			<div className="headerFiles">
				<div className="addSes">
					<CButton onClick={addModalOpen}>
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton>
					<CButton color="#FFF" className="graghCase">
						<Link to={`/file-management/${id}/graph`}>{translation('stagechart')}</Link>
					</CButton>
				</div>
				<div className="search">
					<CFormInput type="text" placeholder={`${formatMessage({id: 'search'})}...`} value={searchVal} onChange={(e) => searchByChar(e)} />
				</div>
			</div>
			<div className="relativeDiv-wrapper">
				<CRow>
					{searchedDiv
						? dataStage({ data: searchedDiv, getCaseById: handleGetCaseById, editCase: editCase, deleteTheStage: handleDeleteItem })
						: dataStage({ data: theAllStages?.data, getCaseById: handleGetCaseById, editCase: editCase, deleteTheStage: handleDeleteItem })}
				</CRow>
				<Stack spacing={2}>
					<Pagination
						count={theAllStages?.total ? Math.ceil(theAllStages?.total / 10) : 1}
						page={page}
						defaultPage={1}
						siblingCount={0}
						// variant="outlined"
						shape="rounded"
						color="primary"
						onChange={handelChangePgae}
					/>
				</Stack>
			</div>
			{item ? ReturnedPopup(item) : !item && editItem ? ReturnedPopup(editItem) : !editItem && !item && visible ? ReturnedPopup() : null}
			{addConstantId == 1 ? (
				<StageConstantJudge exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 2 ? (
				<StageConstantKind exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 3 ? (
				<StageConstantOffice exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 4 ? (
				<StageConstantStatus exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 5 ? (
				<StageConstantResult exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 6 ? (
				<StageConstantType exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 7 ? (
				<HandleAgentAttribute exitSelectModal={() => setAddConstantId('')} setOpenAddSnack={setOpenAddSnack} />
			) : addConstantId == 8 ? (<AttachedPopup exitSelectModal={() => setAddConstantId('')} 
			url={`Stage/${attacmentId}/attachment`}
			id={attacmentId}
			setOpenAddSnack={setOpenAddSnack}
			setOpenAttachedSnack={setOpenAttachedSnack}
			setOpenLargeAttachement={setOpenLargeAttachement}
			callback={() => dispatch(getStageAttachment(editItem?.STG_ID_PK)).then((res) => setAttachment(res.payload))}/>) : null}

			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheStage} /> : null}
			{openAddSnack || openDelSnack || openDelErrorSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack || OpenAttachedSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openDelErrorSnack ? 'error' : 'success'}`}>
						{OpenEditSnack
							? translation('itemUpdated')
							: openDelSnack
							? translation('itemDeleted')
							: openDelErrorSnack
							? translation('alreadyUSed')
								? OpenAttachedSnack
								: translation('error')
							: translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileCases);
